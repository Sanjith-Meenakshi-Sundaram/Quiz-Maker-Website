import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    options: { 
        type: [String], 
        required: function () { return this.type === "mcq"; } 
    }, // Only for MCQ
    correctAnswer: { type: String, required: true }
});

const QuizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, required: true, enum: ["mcq", "truefalse", "fillintheblank"] },
    questions: [QuestionSchema],
    creatorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now }
});

const Quiz = mongoose.model("Quiz", QuizSchema);
export default Quiz;
