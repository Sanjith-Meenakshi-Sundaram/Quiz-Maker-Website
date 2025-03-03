import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditMCQ = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState(["", "", "", ""]);
    const [correctAnswer, setCorrectAnswer] = useState("");

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await axios.get(`https://quiz-maker-website.onrender.com/api/quiz/${id}`);
                const quiz = response.data;

                setTitle(quiz.title);
                setQuestion(quiz.questions[0].question);
                setOptions(quiz.questions[0].options);
                setCorrectAnswer(quiz.questions[0].correctAnswer);
            } catch (error) {
                console.error("Error fetching quiz:", error);
            }
        };

        fetchQuiz();
    }, [id]);

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://quiz-maker-website.onrender.com/api/quiz/update/${id}`, {
                title,
                type: "mcq",
                questions: [{ question, options, correctAnswer }],
            });

            alert("Quiz updated successfully!");
            navigate("/available-quizzes");
        } catch (error) {
            console.error("Error updating quiz:", error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100"
        style={{
            backgroundImage:
                "url('https://images.pexels.com/photos/5088017/pexels-photo-5088017.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}
        >
            <h2 className="text-2xl font-bold mb-4">Edit MCQ Quiz</h2>
            <form
                onSubmit={handleUpdate}
                className="bg-slate p-6 rounded shadow-md w-96"
            >
                <div className="mb-4">
                    <label className="block font-medium">Title:</label>
                    <input
                        type="text"
                        className="w-full border px-2 py-1 rounded"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block font-medium">Question:</label>
                    <input
                        type="text"
                        className="w-full border px-2 py-1 rounded"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        required
                    />
                </div>

                {options.map((option, index) => (
                    <div className="mb-2" key={index}>
                        <label className="block font-medium">Option {index + 1}:</label>
                        <input
                            type="text"
                            className="w-full border px-2 py-1 rounded"
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            required
                        />
                    </div>
                ))}

                <div className="mb-4">
                    <label className="block font-medium">Correct Answer:</label>
                    <input
                        type="text"
                        className="w-full border px-2 py-1 rounded"
                        value={correctAnswer}
                        onChange={(e) => setCorrectAnswer(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Update Quiz
                </button>
            </form>
        </div>
    );
};

export default EditMCQ;
