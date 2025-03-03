import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const TakeQuiz = () => {
    const { id } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [userAnswers, setUserAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [wrongAnswers, setWrongAnswers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch quiz data
    const fetchQuiz = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:5000/api/quiz/quiz/${id}`);
            if (!response.ok) throw new Error("Failed to fetch quiz.");
            const data = await response.json();

            console.log("Fetched Quiz Data:", data);

            if (!data || !data.data || !data.data.questions) {
                throw new Error("No questions found.");
            }

            setQuiz(data.data);
        } catch (err) {
            console.error("Error fetching quiz:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchQuiz();
    }, [fetchQuiz]);

    // Handle answer selection
    const handleAnswerChange = (questionId, answer) => {
        setUserAnswers((prev) => ({
            ...prev,
            [questionId]: answer,
        }));
    };

    // Handle form submission
    const handleSubmit = () => {
        let correctCount = 0;
        let wrong = [];

        quiz?.questions?.forEach((q) => {
            if (userAnswers[q._id] === q.correctAnswer) {
                correctCount++;
            } else {
                wrong.push({
                    question: q.questionText || "Question not provided",
                    yourAnswer: userAnswers[q._id] || "Not answered",
                    correctAnswer: q.correctAnswer,
                });
            }
        });

        setScore(correctCount);
        setWrongAnswers(wrong);
        setSubmitted(true);
    };

    if (loading) return <p className="text-center text-xl mt-10">Loading Quiz...</p>;
    if (error) return <p className="text-center text-xl text-red-600 mt-10">{error}</p>;
    if (!quiz || !Array.isArray(quiz.questions)) return <p className="text-center text-xl mt-10">No quiz data found.</p>;

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8"
            style={{
                backgroundImage:
                    "url('https://images.pexels.com/photos/5485173/pexels-photo-5485173.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <h1 className="text-2xl font-bold mb-6">{quiz.title}</h1>

            {submitted ? (
                <div className="bg-white shadow-md p-6 rounded-lg w-full max-w-2xl">
                    <h2 className="text-xl font-bold">🥇Your Score: {score}/{quiz?.questions?.length}  🥳🎊 </h2>
                    {wrongAnswers.length > 0 && (
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold">Incorrect Answers:</h3>
                            <ul className="list-disc pl-5">
                                {wrongAnswers.map((item, index) => (
                                    <li key={index} className="text-red-600 mb-2">
                                        <strong>Q:</strong> {item.question} <br />
                                        <strong>Your Answer:</strong> {item.yourAnswer} <br />
                                        <strong>Correct Answer:</strong> {item.correctAnswer}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <br />
                    <br />
                    <span className="text-green-900 font-semibold">Explore More  👉<Link to="/available-quizzes" className="text-green-600 text-xl font-bold">Quizzes</Link></span>
                </div>
            ) : (
                <div className="bg-slate shadow-md p-6 rounded-lg w-full max-w-2xl">
                    {quiz.questions.map((q) => (
                        <div key={q._id} className="mb-6">
                            <p className="font-semibold">{q.questionText || "Question not provided"}</p>

                            {/* Multiple Choice Questions (MCQ) */}
                            {q.options.length > 0 ? (
                                q.options.map((option, index) => (
                                    <label key={index} className="block mt-2">
                                        <input
                                            type="radio"
                                            name={`question-${q._id}`}
                                            value={option}
                                            checked={userAnswers[q._id] === option}
                                            onChange={() => handleAnswerChange(q._id, option)}
                                        />
                                        <span className="ml-2">{option}</span>
                                    </label>
                                ))
                            ) : (
                                // Fill in the Blank Question
                                <input
                                    type="text"
                                    placeholder="Type your answer..."
                                    className="border rounded p-2 mt-2 w-full"
                                    value={userAnswers[q._id] || ""}
                                    onChange={(e) => handleAnswerChange(q._id, e.target.value)}
                                />
                            )}
                        </div>
                    ))}

                    <button
                        className="mt-4 bg-blue-500 text-white px-1 py-1 rounded hover:bg-blue-600"
                        onClick={handleSubmit}
                    >
                        Submit Quiz
                    </button>
                    &nbsp;
                    &nbsp;
                    
                    <button className="mt-4 bg-red-500 text-white px-1 py-1 rounded hover:bg-red-800">
                    <Link to="/available-quizzes">Back</Link>
                    </button>
                </div>
            )}
        </div>
    );
};

export default TakeQuiz;
