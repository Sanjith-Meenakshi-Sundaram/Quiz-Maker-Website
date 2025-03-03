import express from "express";
import Quiz from "../models/Quiz.js";

const router = express.Router();

/**
 * @route   POST /api/quiz/create
 * @desc    Create a new quiz
 */
router.post("/create", async (req, res) => {
    console.log(req.body)
    try {
        const { title, type, questions, creatorId } = req.body;

        // Ensure all required fields exist
        if (!title || !type || !questions || !Array.isArray(questions) || questions.length === 0 || !creatorId) {
            return res.status(400).json({ message: "All fields are required, and questions must be an array." });
        }

        // Create a new quiz document
        const newQuiz = new Quiz({
            title,
            type,
            questions,  // Ensure questions is an array
            creatorId
        });

        await newQuiz.save();
        res.status(201).json({ message: "Quiz created successfully!", quiz: newQuiz });
    } catch (error) {
        console.error("Error creating quiz:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});

/**
 * @route   GET /api/quiz/all
 * @desc    Fetch all quizzes
 */
router.get("/all", async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.status(200).json(quizzes);
    } catch (error) {
        console.error("Error fetching quizzes:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});

/**
 * @route   GET /api/quiz/type/:quizType
 * @desc    Fetch all quizzes of a specific type (MCQ, True/False, Fill in the Blanks)
 */
// router.get("/type/:quizType", async (req, res) => {
//     try {
//         const { quizType } = req.params;
//         const quizzes = await Quiz.find({ type: quizType });

//         if (!quizzes.length) {
//             return res.status(404).json({ message: "No quizzes found for this type." });
//         }

//         res.status(200).json(quizzes);
//     } catch (error) {
//         console.error("Error fetching quizzes:", error);
//         res.status(500).json({ message: "Internal server error." });
//     }
// });
router.get("/quiz/:id", async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        console.log("Fetched Quiz from DB:", quiz); // Debugging

        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }

        // Wrap quiz inside "data"
        res.json({ data: quiz }); 
    } catch (error) {
        console.error("Error fetching quiz:", error);
        res.status(500).json({ message: "Server error" });
    }
});

/**
 * @route   GET /api/quiz/:id
 * @desc    Fetch a specific quiz by ID
 */
// router.get("/:id", async (req, res) => {
//     try {
//         const quiz = await Quiz.findById(req.params.id);
//         if (!quiz) {
//             return res.status(404).json({ message: "Quiz not found." });
//         }
//         res.status(200).json(quiz);
//     } catch (error) {
//         console.error("Error fetching quiz:", error);
//         res.status(500).json({ message: "Internal server error." });
//     }
// });

/**
 * @route   POST /api/quiz/take/:id
 * @desc    Take a quiz, submit answers, and get a score
 */
router.post("/take/:id", async (req, res) => {
    try {
        const { answers } = req.body;
        const quiz = await Quiz.findById(req.params.id);

        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found." });
        }

        let score = 0;
        let results = [];

        quiz.questions.forEach((question) => {
            const userAnswer = answers.find((a) => a.questionId === question._id.toString());
            if (userAnswer) {
                const isCorrect = userAnswer.answer.trim().toLowerCase() === question.correctAnswer.trim().toLowerCase();
                if (isCorrect) score++;
                results.push({
                    question: question.questionText,
                    userAnswer: userAnswer.answer,
                    correctAnswer: question.correctAnswer,
                    isCorrect
                });
            }
        });

        res.status(200).json({ message: "Quiz completed!", score, totalQuestions: quiz.questions.length, results });
    } catch (error) {
        console.error("Error taking quiz:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});

/**
 * @route   PUT /api/quiz/:id
 * @desc    Update an existing quiz
 */
router.put("/update/:id", async (req, res) => {
    try {
        const { title, type, questions } = req.body;
        const updatedQuiz = await Quiz.findByIdAndUpdate(
            req.params.id,
            { title, type, questions },
            { new: true }
        );

        if (!updatedQuiz) {
            return res.status(404).json({ message: "Quiz not found." });
        }

        res.status(200).json({ message: "Quiz updated successfully!", quiz: updatedQuiz });
    } catch (error) {
        console.error("Error updating quiz:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});

/**
 * @route   DELETE /api/quiz/:id
 * @desc    Delete a quiz by ID
 */
router.delete("/delete/:id", async (req, res) => {
    try {
        const deletedQuiz = await Quiz.findByIdAndDelete(req.params.id);
        if (!deletedQuiz) {
            return res.status(404).json({ message: "Quiz not found." });
        }
        res.status(200).json({ message: "Quiz deleted successfully!" });
    } catch (error) {
        console.error("Error deleting quiz:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});

export default router;
