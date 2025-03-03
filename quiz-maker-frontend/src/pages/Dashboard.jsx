import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <div
            className="relative min-h-screen bg-gray-200 flex items-center justify-center px-4"
            style={{
                backgroundImage:
                    "url('https://images.pexels.com/photos/5088017/pexels-photo-5088017.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Profile Button (Top Left) */}
            <button
                className="absolute top-4 left-4 flex items-center gap-2 bg-slate text-black font-bold py-1 px-1 rounded-lg shadow-md hover:bg-stone-500 transition"
                onClick={() => navigate("/profile")}
            >
                <img
                    src="https://i.postimg.cc/zv0ZYBHf/sanjithlinkedin.jpg"
                    alt="Profile"
                    className="w-10 h-10 mx-auto rounded-full mb-4 object-cover"
                />
                Meenakshi Sundaram D
            </button>

            {/* Logout Button (Top Right) */}
            <button
                className="absolute top-4 right-4 bg-red-800 text-white font-bold py-1 px-1 rounded-full shadow-md hover:bg-red-900"
                onClick={() => navigate("/logout")}
            >
                Logout
            </button>

            {/* Centered Quiz Container */}
            <div className="bg-slate w-full max-w-4xl p-8 rounded-xl shadow-lg">
                {/* Title - Centered Above the Boxes */}
                <h1>
                    <span className="text-2xl font-bold italic text-black-900 text-center mb-6">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;QuizHub: </span><span className="text-2xl font-semibold italic text-gray-800 text-center mb-6">The ultimate hub for quiz lovers!</span>
                </h1>

                {/* Two Separate Boxes (Left: Create Quiz, Right: Take Quiz) */}
                <div className="flex justify-between">
                    {/* Left Box - Create Quiz */}
                    <div className="w-[48%] bg-slate shadow-md rounded-lg p-6">
                        <h2 className="text-3xl font-bold text-black mb-4 text-center">Create Your Quiz</h2>

                        <div className="flex flex-col gap-4">
                            <button
                                className="bg-yellow-700 text-black font-bold py-3 rounded-lg shadow-md border border-gray-500 hover:bg-stone-500"
                                onClick={() => navigate("/create-mcq")}
                            >
                                Multiple Choice
                            </button>
                            <button
                                className="bg-yellow-700 text-black font-bold py-3 rounded-lg shadow-md border border-gray-500 hover:bg-stone-500"
                                onClick={() => navigate("/create-truefalse")}
                            >
                                True / False
                            </button>
                            <button
                                className="bg-yellow-700 text-black font-bold py-3 rounded-lg shadow-md border border-gray-500 hover:bg-stone-500"
                                onClick={() => navigate("/create-fillintheblank")}
                            >
                                Fill in the Blanks
                            </button>
                        </div>
                    </div>

                    {/* Right Box - Take Quiz */}
                    <div className="w-[48%] bg-slate shadow-md rounded-lg p-6">
                        <h2 className="text-3xl font-bold text-black mb-4 text-center">Attempt a Quiz</h2>

                        <div className="flex flex-col gap-4">
                            <button
                                className="bg-yellow-700 text-black font-bold py-3 rounded-lg shadow-md border border-gray-500 hover:bg-stone-500"
                                onClick={() => navigate("/available-quizzes")}
                            >
                                Multiple Choice
                            </button>
                            <button
                                className="bg-yellow-700 text-black font-bold py-3 rounded-lg shadow-md border border-gray-500 hover:bg-stone-500"
                                onClick={() => navigate("/available-quizzes")}
                            >
                                True / False
                            </button>
                            <button
                                className="bg-yellow-700 text-black font-bold py-3 rounded-lg shadow-md border border-gray-500 hover:bg-stone-500"
                                onClick={() => navigate("/available-quizzes")}
                            >
                                Fill in the Blanks
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
