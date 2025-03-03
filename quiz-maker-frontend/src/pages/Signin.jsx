import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/Api";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await loginUser({ email, password });
      localStorage.setItem("token", data.token); // Store token
      localStorage.setItem("userId", data.userId); // Store userId
      navigate("/dashboard"); // Redirect to dashboard
    } catch (err) {
      setError(err.message || "Invalid credentials");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-100"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/5088017/pexels-photo-5088017.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <div className="flex justify-center mb-4">
          <img
            src="https://img.icons8.com/?size=100&id=ie6nIMVxKs0a&format=png&color=000000"
            alt="GitHub Logo"
            className="w-20 h-20 mx-auto"
          />
        </div>
        <h2 className="text-center text-xl font-semibold mb-4">Sign in to QuizHub</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Sign In
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm">
            New to QuizHub?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Create an account.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
