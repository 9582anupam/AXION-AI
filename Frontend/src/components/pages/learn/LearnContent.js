import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNotes, getSummary, getFlashes, ask } from "../../../services/learn/learnService";

export const LearnContent = () => {
  const { learnId } = useParams();
  const [summary, setSummary] = useState(null);
  const [flashes, setFlashes] = useState([]);
  const [notes, setNotes] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(false);
  console.log(summary);
  console.log(flashes);
  console.log(notes);

  useEffect(() => {
    const fetchLearnData = async () => {
      try {
        const summaryData = await getSummary(learnId);
        const flashesData = await getFlashes(learnId);
        const notesData = await getNotes(learnId);

        setSummary(summaryData);
        setFlashes(flashesData);
        setNotes(notesData);
      } catch (error) {
        console.error("Error fetching learn data:", error);
      }
    };

    fetchLearnData();
  }, [learnId]);

  const handleAskQuestion = async () => {
    if (!question.trim()) return;
    setLoading(true);
    try {
      const response = await ask(learnId, question);
      setAnswer(response.answer);
    } catch (error) {
      console.error("Error asking question:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-800 transition-all duration-300 hover:shadow-cyan-900/20">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 border-b border-slate-700 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-indigo-600/10 opacity-50"></div>
            <div className="relative">
              <h2 className="text-3xl font-bold text-slate-100 mb-1">Learn Content</h2>
              <p className="text-slate-400 text-sm">Explore summaries, flashes, and notes for your content.</p>
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-8">
            {/* Summary Section */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <h3 className="text-xl font-semibold text-slate-100 mb-4">Summary</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {summary?.data || "Loading summary..."}
              </p>
            </div>

            {/* Flashes Section */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <h3 className="text-xl font-semibold text-slate-100 mb-4">Flashes</h3>
              <ul className="list-disc list-inside text-slate-300 text-sm space-y-2">
                {flashes?.data.length > 0
                  ? flashes?.data.map((flash, index) => <li key={index}>{flash.question}</li>)
                  : "Loading flashes..."}
              </ul>
            </div>

            {/* Notes Section */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <h3 className="text-xl font-semibold text-slate-100 mb-4">Notes</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {notes || "Loading notes..."}
              </p>
            </div>

            {/* Ask a Question Section */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <h3 className="text-xl font-semibold text-slate-100 mb-4">Ask a Question</h3>
              <div className="space-y-4">
                <textarea
                  className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  rows="4"
                  placeholder="Type your question here..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                ></textarea>
                <button
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-600 hover:to-indigo-700 text-white font-medium rounded-lg shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-300"
                  onClick={handleAskQuestion}
                  disabled={loading}
                >
                  {loading ? "Asking..." : "Ask Question"}
                </button>
                {answer && (
                  <div className="mt-4 bg-slate-700/30 p-4 rounded-lg border border-slate-700/50">
                    <h4 className="text-sm font-medium text-cyan-400 mb-2">Answer:</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">{answer}</p>
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

