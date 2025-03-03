import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("Logging out..."); // Replace with actual logout logic
    navigate("/login"); // Redirect to login page (change as needed)
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/5088017/pexels-photo-5088017.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-slate shadow-lg rounded-lg p-6 w-96 text-center">
        <img src="https://i.postimg.cc/zv0ZYBHf/sanjithlinkedin.jpg" alt="Profile" className="w-32 h-32 mx-auto rounded-full border-4 border-gray-300 mb-4 object-cover" />
        <h2 className="text-2xl font-semibold text-gray-700">Meenakshi Sundaram D</h2>
        <p className="text-gray-500">Full Stack Developer | Passionate about Quizzes</p>
        <a
          href="https://www.linkedin.com/in/meenakshi-sundaram-d"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline text-lg italic"
        >
        👉Connect on LinkedIn
        </a>
        <br />
        {/* Logout Button in Profile Page */}
        <button
          onClick={handleLogout}
          className="mt-4 px-1 py-1 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition"
        >
          Logout
        </button>
        &nbsp;
        &nbsp;
        {/* Back to Dashboard Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="mt-2 px-1 py-1 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Profile;
