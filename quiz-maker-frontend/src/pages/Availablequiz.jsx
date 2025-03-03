import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AvailableQuizzes = () => {
    const navigate = useNavigate();
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await fetch("https://quiz-maker-website.onrender.com/api/quiz/all");
                const data = await response.json();
                setQuizzes(data);
            } catch (error) {
                console.error("Error fetching quizzes:", error);
            }
        };
        fetchQuizzes();
    }, []);

    // Function to delete a quiz
    const handleDelete = async (quizId) => {
        try {
            const response = await fetch(`https://quiz-maker-website.onrender.com/api/quiz/delete/${quizId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setQuizzes(quizzes.filter((quiz) => quiz._id !== quizId));
                alert("Quiz deleted successfully!");
            } else {
                console.error("Failed to delete quiz");
            }
        } catch (error) {
            console.error("Error deleting quiz:", error);
        }
    };

    return (
        <div className="min-h-screen bg-slate flex flex-col items-center p-8"
            style={{
                backgroundImage:
                    "url('https://images.pexels.com/photos/5485173/pexels-photo-5485173.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <button
                className="bg-red-700 text-white px-1 py-1 rounded-md hover:bg-red-800 absolute right-1"
                onClick={() => navigate("/dashboard")}
            >
                Dashboard
            </button>
            {/* Top Section with "Available Quizzes" Heading & Dashboard Button */}
            <div className="w-full max-w-3xl flex flex justify-center w-full mb-6">
                <div className="text-3xl text-yellow-900 font-bold px-2 py-0 rounded-md shadow-md">
                    Available Quizzes
                </div>

            </div>

            {/* Quiz List */}
            <div className="w-full max-w-3xl bg-slate shadow-lg rounded-lg p-6">
                {quizzes.length === 0 ? (
                    <p className="text-gray-600 text-center">No quizzes available.</p>
                ) : (
                    quizzes.map((quiz) => (
                        <div key={quiz._id} className="p-4 border-b border-gray-300">
                            {/* Quiz Title and Type */}
                            <h2 className="text-lg font-semibold">{quiz.title}</h2>
                            <p className="text-gray-600">Type: {quiz.type}</p>

                            {/* Edit and Delete Buttons (below the title) */}
                            <div className="mt-2 flex gap-2">
                                <button
                                    className="bg-green-500 text-white text-xs px-3 py-1 rounded hover:bg-green-600"
                                    onClick={() => navigate(`/edit-${quiz.type.toLowerCase()}/${quiz._id}`)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600"
                                    onClick={() => handleDelete(quiz._id)}
                                >
                                    Delete
                                </button>
                            </div>

                            {/* Take Quiz Button (aligned right) */}
                            <div className="mt-2 flex justify-end">
                                <button
                                    className="bg-blue-500 text-white text-sm px-4 py-2 rounded hover:bg-blue-600"
                                    onClick={() => {
                                        console.log("Navigating to TakeQuiz with ID:", quiz._id);
                                        navigate(`/take-quiz/${quiz._id}`);
                                    }}
                                >
                                    Take Quiz
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AvailableQuizzes;
