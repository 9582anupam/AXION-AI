import Learn from "../../models/learn.model.js";
import { uploadLearnHelper } from "../../helper/learn/uploadLearnHelper.js";
import { generateSummaryHelper } from "../../helper/learn/generateSummaryHelper.js";
import { generateNotesHelper } from "../../helper/learn/generateNotesHelper.js";
import { generateFlashCardsHelper } from "../../helper/learn/generateFlashCardsHelper.js";
import { talkToContent } from "../../helper/learn/talkToContent.js";

const uploadLearn = async (req, res) => {
    try {
        // extract form data
        console.log(req.body);
        const { title, cloudinaryContentUrl, contentType } = req.body;
        const userId = req.user._id;

        const { transcript } = await uploadLearnHelper({ title, cloudinaryContentUrl, contentType });

        const learnMaterial = new Learn({
            title,
            transcript,
            cloudinaryContentUrl,
            contentType,
            userId,
        });
        await learnMaterial.save();

        // Create a response object with the ID as string
        const responseData = learnMaterial.toObject();
        responseData._id = responseData._id.toString();

        console.log("Learn material uploaded successfully:", responseData);
        res.status(201).json({
            message: "Learn material uploaded successfully",
            data: responseData,
            status: 201,
            success: true,
        });

    } catch (error) {
        console.error("Error uploading learn material:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const generateNotes = async (req, res) => {
    try {
        const { learnId } = req.body;
        // Find the learn material by ID
        const learnMaterialDb = await Learn.findById(learnId);
        if (!learnMaterialDb) {
            return res.status(404).json({ message: "Learn material not found" });
        }
        const content = learnMaterialDb.transcript;

        const notes = await generateNotesHelper(content);
        if (!notes) {
            return res.status(500).json({ message: "Failed to generate notes" });
        }

        // Send the generated notes as a response
        console.log("Notes generated successfully:", notes);

        // Update existing document instead of creating a new one
        await Learn.findByIdAndUpdate(learnId, { notes });

        res.status(200).json({
            message: "Notes generated successfully",
            data: notes,
            status: 200,
            success: true,
        });
    } catch (error) {
        console.error("Error generating notes:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


const generateSummary = async (req, res) => {
    try {
        const { learnId } = req.body;
        // Find the learn material by ID
        const learnMaterialDb = await Learn.findById(learnId);
        if (!learnMaterialDb) {
            return res.status(404).json({ message: "Learn material not found" });
        }
        const content = learnMaterialDb.transcript;

        const summary = await generateSummaryHelper(content);
        if (!summary) {
            return res.status(500).json({ message: "Failed to generate summary" });
        }

        // Send the generated summary as a response
        console.log("Summary generated successfully:", summary);

        // Update existing document instead of creating a new one
        await Learn.findByIdAndUpdate(learnId, { summary });

        res.status(200).json({
            message: "Summary generated successfully",
            data: summary,
            status: 200,
            success: true,
        });
    } catch (error) {
        console.error("Error generating summary:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


const generateFlashcards = async (req, res) => {
    try {
        const { learnId } = req.body;
        // Find the learn material by ID
        const learnMaterialDb = await Learn.findById(learnId);
        if (!learnMaterialDb) {
            return res.status(404).json({ message: "Learn material not found" });
        }
        const content = learnMaterialDb.transcript;

        try {
            const flashCards = await generateFlashCardsHelper(content);
            if (!flashCards || !Array.isArray(flashCards)) {
                return res.status(500).json({ 
                    message: "Failed to generate Flash Cards or invalid format returned", 
                    success: false 
                });
            }

            // Send the generated Flash Cards as a response
            console.log("Flash Cards generated successfully:", flashCards);

            // Update existing document instead of creating a new one
            await Learn.findByIdAndUpdate(learnId, { flashCards });

            res.status(200).json({
                message: "Flash Cards generated successfully",
                data: flashCards,
                status: 200,
                success: true,
            });
        } catch (aiError) {
            console.error("AI processing error:", aiError);
            return res.status(500).json({ 
                message: "Error processing Flash Cards with AI", 
                error: aiError.message,
                success: false 
            });
        }
    } catch (error) {
        console.error("Error generating Flash Cards:", error);
        res.status(500).json({ 
            message: "Internal server error", 
            error: error.message,
            success: false 
        });
    }
};


const askContent = async (req, res) => {
    try {
        const { learnId, newMessages, oldMessages } = req.body;

        // validate above
        if (!learnId) {
            return res.status(400).json({ message: "Learn ID is required" });
        }
        if (!newMessages || !newMessages) {
            return res.status(400).json({ message: "New or Old message is missing" });
        }

        // Find the learn material by ID
        const learnMaterialDb = await Learn.findById(learnId);
        if (!learnMaterialDb) {
            return res.status(404).json({ message: "Learn material not found" });
        }

        // Extract transcript from the learn material
        const content = learnMaterialDb.transcript;

        if (!content) {
            return res.status(404).json({ message: "Transcript not found" });
        }

        // Call the talkToContent function with the content and messages
        const response = await talkToContent(content, newMessages, oldMessages);
        if (!response) {
            return res.status(500).json({ message: "Failed to generate response" });
        }

        // Send the generated response as a response
        console.log("Response generated successfully:", response);

        res.status(200).json({
            message: "Response generated successfully",
            data: response,
            status: 200,
            success: true,
        });
    } catch (error) {
        console.error("Error generating response:", error);
        res.status(500).json({ message: "Internal server error" });
    }




};



export { uploadLearn, generateNotes, generateSummary, generateFlashcards, askContent };