import express from "express";
import { uploadLearn, generateNotes, generateSummary, generateFlashcards, askContent } from "../../controllers/assessmentLearn/assessmentLearn.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";

const router = express.Router();

// upload the content
router.post("/upload", verifyJWT, uploadLearn); 

// generate notes
router.post("/generateNotes", verifyJWT, generateNotes);

// generate summary
router.post("/generateSummary", verifyJWT, generateSummary);

// generate flashcards
router.post("/generateFlashcards", verifyJWT, generateFlashcards);

// talk to the content
router.post("/ask", verifyJWT, askContent);



export default router;