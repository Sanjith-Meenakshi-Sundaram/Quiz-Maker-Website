import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateMCQ = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [questions, setQuestions] = useState([{ questionText: "", options: ["", "", "", ""], correctAnswer: "" }]);

    const handleQuestionChange = (index, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].questionText = value;
        setQuestions(updatedQuestions);
    };

    const handleOptionChange = (qIndex, oIndex, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[qIndex].options[oIndex] = value;
        setQuestions(updatedQuestions);
    };

    const handleCorrectAnswerChange = (index, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].correctAnswer = value;
        setQuestions(updatedQuestions);
    };

    const addQuestion = () => {
        if (questions.length < 10) {
            setQuestions([...questions, { questionText: "", options: ["", "", "", ""], correctAnswer: "" }]);
        }
    };

    const removeQuestion = (index) => {
        if (questions.length > 1) {
            setQuestions(questions.filter((_, i) => i !== index));
        }
    };

    // const handleSubmit = async (e) => {
    //     console.log("Submitting Data:", { title, questions });
    //     e.preventDefault();
    //     try {
    //         await axios.post("http://localhost:5000/api/quiz/create", { title, type: "mcq", questions });
    //         navigate("/dashboard");
    //     } catch (error) {
    //         console.error("Error creating quiz:", error);
    //     }
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const loggedInUserId = localStorage.getItem("userId"); // Retrieve the stored user ID

        if (!loggedInUserId) {
            alert("User not logged in!");
            return;
        }

        const quizData = {
            title,
            type: "mcq",  // Change for other types accordingly
            questions: questions.map(q => ({
                questionText: q.questionText,
                options: q.options,
                correctAnswer: q.correctAnswer
            })),
            creatorId: loggedInUserId  // Dynamic creatorId
        };

        try {
            const response = await axios.post("https://quiz-maker-website.onrender.com/api/quiz/create", quizData);
            console.log("Quiz created:", response.data);
            alert("Quiz created successfully!");
            navigate("/dashboard");
        } catch (error) {
            console.error("Error creating quiz:", error);
            alert("Failed to create quiz.");
        }
    };


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100"
            style={{
                backgroundImage:
                    "url('https://images.pexels.com/photos/5088017/pexels-photo-5088017.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <h1 className="text-2xl font-bold mb-4">Create Multiple Choice Quiz</h1>
            <form onSubmit={handleSubmit} className="bg-slate p-6 rounded-lg shadow-md w-1/2">

                <input type="text" placeholder="Quiz Title" value={title} onChange={(e) => setTitle(e.target.value)}
                    className="w-full border p-2 rounded mb-4" required />

                {questions.map((q, qIndex) => (
                    <div key={qIndex} className="mb-4 border p-4 rounded bg-gray-50">
                        <input type="text" placeholder={`Question ${qIndex + 1}`} value={q.questionText}
                            onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                            className="w-full border p-2 rounded mb-2" required />

                        {q.options.map((option, oIndex) => (
                            <input key={oIndex} type="text" placeholder={`Option ${oIndex + 1}`}
                                value={option} onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                                className="w-full border p-2 rounded mb-1" required />
                        ))}

                        <input type="text" placeholder="Correct Answer" value={q.correctAnswer}
                            onChange={(e) => handleCorrectAnswerChange(qIndex, e.target.value)}
                            className="w-full border p-2 rounded mb-2" required />

                        {questions.length > 1 && (
                            <button type="button" onClick={() => removeQuestion(qIndex)}
                                className="bg-red-500 text-white px-3 py-1 rounded">
                                Remove Question
                            </button>
                        )}
                    </div>
                ))}

                {questions.length < 10 && (
                    <button type="button" onClick={addQuestion}
                        className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
                        Add Another Question
                    </button>
                )}

                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                    Submit Quiz
                </button>
            </form>
        </div>
    );
};

export default CreateMCQ;
