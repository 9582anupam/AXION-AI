import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNotes, getSummary, getFlashes, ask } from "../../../services/learn/learnService";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';

export const LearnContent = () => {
  const { learnId, inputType,} = useParams();

  console.log(learnId, inputType )
  const [summary, setSummary] = useState(null);
  const [flashes, setFlashes] = useState([]);
  const [notes, setNotes] = useState(null);
  const [originalContent, setOriginalContent] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("summary");
  const [flashIndex, setFlashIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  

  useEffect(() => {
    const fetchLearnData = async () => {
      try {
        const [summaryResponse, flashesResponse, notesResponse] = await Promise.all([
          getSummary(learnId),
          getFlashes(learnId),
          getNotes(learnId)
        ]);

        setSummary(summaryResponse.data);
        setFlashes(flashesResponse.data);
        setNotes(notesResponse.data);
        setOriginalContent(summaryResponse.originalContent || "Original content not available");
      } catch (error) {
        console.error("Error fetching learn data:", error);
      }
    };

    fetchLearnData();
  }, [learnId]);

  const handleAskQuestion = async () => {
    if (!question.trim()) return;
    
    // Create new message with user question
    const userMessage = { role: 'user', content: question };
    
    // Add user message to chat history
    setChatHistory(prev => [...prev, userMessage]);
    
    // Clear input field and set loading state
    setQuestion("");
    setLoading(true);
    
    try {
      // Prepare messages in the format expected by the API
      const newMessages = [userMessage]; // Current question
      
      // Call API with current chat history as oldMessages and new question as newMessages
      const response = await ask(learnId, newMessages, chatHistory);
      console.log(response)
      
      // Create bot message from response
      const botMessage = { role: 'assistant', content: response.data };
      
      // Update chat history with bot response
      setChatHistory(prev => [...prev, botMessage]);
      
      // Store latest answer separately if needed elsewhere
      setAnswer(response.answer);
    } catch (error) {
      // Handle error with a message in the chat
      const errorMessage = { role: 'assistant', content: "Sorry, I couldn't process your request. Please try again." };
      setChatHistory(prev => [...prev, errorMessage]);
      console.error("Error asking question:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setFlashIndex(prev => Math.min(flashes.length - 1, prev + 1));
    }, 150); // Small delay to allow flip animation to complete
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setFlashIndex(prev => Math.max(0, prev - 1));
    }, 150);
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAskQuestion();
    }
  };

  const TabButton = ({ id, label, isActive }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-4 py-2 font-medium rounded-t-lg transition-colors ${
        isActive 
          ? "bg-slate-800 text-white border-b-2 border-cyan-500" 
          : "text-slate-400 hover:text-white hover:bg-slate-800/50"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-800 transition-all duration-300 hover:shadow-cyan-900/20">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 border-b border-slate-700 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-indigo-600/10 opacity-50"></div>
            <div className="relative">
              <h2 className="text-3xl font-bold text-slate-100 mb-1">Learn Content</h2>
              <p className="text-slate-400 text-sm">Explore your content with AI-generated insights.</p>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="flex flex-col md:flex-row">
            {/* Left Column - Original Content */}
            <div className="md:w-1/2 p-6 border-r border-slate-700">
              <h3 className="text-xl font-semibold text-slate-100 mb-4">Original Content</h3>
              <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700 h-[calc(100vh-250px)] overflow-y-auto">
                <div className="prose prose-invert prose-sm max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {originalContent || "Loading original content..."}
                  </ReactMarkdown>
                </div>
              </div>
            </div>

            {/* Right Column - Tabbed Interface */}
            <div className="md:w-1/2 p-6">
              {/* Tab Navigation */}
              <div className="flex border-b border-slate-700 mb-4 overflow-x-auto">
                <TabButton id="summary" label="Summary" isActive={activeTab === "summary"} />
                <TabButton id="flashcards" label="Flashcards" isActive={activeTab === "flashcards"} />
                <TabButton id="notes" label="Notes" isActive={activeTab === "notes"} />
                <TabButton id="askQuestion" label="Ask Question" isActive={activeTab === "askQuestion"} />
              </div>

              {/* Tab Panels */}
              <div className="h-[calc(100vh-250px)] overflow-y-auto">
                {/* Summary Tab */}
                {activeTab === "summary" && (
                  <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                    <h3 className="text-xl font-semibold text-slate-100 mb-4">Summary</h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {summary}
                          </ReactMarkdown>
                    </p>
                  </div>
                )}

                {/* Flashcards Tab */}
                {activeTab === "flashcards" && (
                  <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                    <h3 className="text-xl font-semibold text-slate-100 mb-4">Flashcards</h3>
                    
                    {flashes.length > 0 ? (
                      <div className="space-y-6">
                        {/* Card counter */}
                        <div className="text-center text-slate-400 text-sm">
                          Card {flashIndex + 1} of {flashes.length}
                        </div>
                        
                        {/* Flipable Flashcard - Fixed Implementation */}
                        <div className="relative h-64 w-full" style={{ perspective: "1000px" }}>
                          <div 
                            className={`absolute w-full h-full transition-all duration-500 ease-in-out cursor-pointer`}
                            onClick={flipCard}
                            style={{ 
                              transformStyle: "preserve-3d",
                              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
                            }}
                          >
                            {/* Front side (Question) */}
                            <div 
                              className="absolute w-full h-full bg-slate-700/50 p-5 rounded-lg border border-slate-600 flex flex-col justify-center"
                              style={{ backfaceVisibility: "hidden" }}
                            >
                              <span className="text-cyan-400 font-medium mb-2">Question:</span>
                              <p className="text-slate-200">{flashes[flashIndex].question}</p>
                              <div className="text-slate-400 text-xs mt-4 text-center absolute bottom-2 w-full left-0">
                                Click to reveal answer
                              </div>
                            </div>
                            
                            {/* Back side (Answer) */}
                            <div 
                              className="absolute w-full h-full bg-slate-700/70 p-5 rounded-lg border border-cyan-600/30 flex flex-col justify-center"
                              style={{ 
                                backfaceVisibility: "hidden",
                                transform: "rotateY(180deg)"
                              }}
                            >
                              <span className="text-cyan-400 font-medium mb-2">Answer:</span>
                              <p className="text-slate-200">{flashes[flashIndex].answer}</p>
                              <div className="text-slate-400 text-xs mt-4 text-center absolute bottom-2 w-full left-0">
                                Click to see question
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Navigation buttons */}
                        <div className="flex justify-between mt-4">
                          <button 
                            onClick={handlePrevCard}
                            disabled={flashIndex === 0}
                            className="bg-slate-700 text-slate-200 px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-slate-600 transition-colors"
                          >
                            Previous
                          </button>
                          <button 
                            onClick={handleNextCard}
                            disabled={flashIndex === flashes.length - 1}
                            className="bg-slate-700 text-slate-200 px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-slate-600 transition-colors"
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-slate-300 text-center py-8">Loading flashcards...</p>
                    )}
                  </div>
                )}

                {/* Notes Tab */}
                {activeTab === "notes" && (
                  <div className="rounded-xl p-6 border border-slate-700">
                    <h3 className="text-xl font-semibold text-slate-100 mb-4">Notes</h3>
                    <div className="text-slate-300 text-sm leading-relaxed">
                      <div className="prose max-w-full prose-invert">
                        <div className="overflow-x-auto">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {notes}
                          </ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Ask Question Tab */}
                {activeTab === "askQuestion" && (
                  <div className="flex flex-col h-full">
                    <div className="flex-1 overflow-y-auto mb-4">
                      <div className="space-y-4">
                        {chatHistory.length > 0 ? (
                          chatHistory.map((message, index) => (
                            <div 
                              key={index} 
                              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                              <div 
                                className={`max-w-[80%] rounded-lg p-3 ${
                                  message.sender === 'user' 
                                    ? 'bg-cyan-600/30 text-slate-100' 
                                    : 'bg-slate-700/50 text-slate-200'
                                }`}
                              >
                                <p className="text-sm">{message.content}</p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="h-full flex items-center justify-center">
                            <div className="text-center p-6 text-slate-400">
                              <p>Ask questions about this content and get AI-powered answers.</p>
                              <p className="mt-2 text-xs">Try questions like:</p>
                              <ul className="text-xs mt-1 space-y-1">
                                <li>"Can you summarize the key points?"</li>
                                <li>"Explain this concept in simpler terms"</li>
                                <li>"What are the main arguments presented?"</li>
                              </ul>
                            </div>
                          </div>
                        )}
                        {loading && (
                          <div className="flex justify-start">
                            <div className="bg-slate-700/50 text-slate-200 rounded-lg p-3 max-w-[80%]">
                              <div className="flex space-x-2">
                                <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"></div>
                                <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="border-t border-slate-700 pt-4">
                      <div className="relative">
                        <textarea
                          className="w-full bg-slate-700/50 text-slate-200 p-3 rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none pr-12"
                          rows={3}
                          placeholder="Type your question here..."
                          value={question}
                          onChange={(e) => setQuestion(e.target.value)}
                          onKeyDown={handleKeyDown}
                          disabled={loading}
                        ></textarea>
                        <button
                          onClick={handleAskQuestion}
                          disabled={loading || !question.trim()}
                          className="absolute right-2 bottom-2 bg-cyan-600 text-white p-1 rounded-md disabled:opacity-50 hover:bg-cyan-500 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnContent;