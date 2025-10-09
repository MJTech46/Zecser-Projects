// src/pages/Login.jsx
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useLocation } from 'react-router-dom';

const ForgotPass = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = () => {
    alert("Sending Link... (frontend only)");
  };

  const location = useLocation();
  const activeTab = location.pathname === "/login" ? "login" : "signup";
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-2">
      <div className="w-full sm:w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col justify-between h-[90vh] max-h-[750px]">

        {/* Form */}
        <div className="px-6 flex-grow overflow-y-auto pb-4 scrollbar-hide mt-20">
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            Forgot Your Password?
          </h2>
          <p className="text-gray-600 mb-4 text-sm">
            Enter your email address and we'll send you a link to reset your password.
          </p>

          {/* Email */}
          <div className="mb-3">
            <label className="block text-sm text-gray-400 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSignUp}
            disabled={loading}
            className={`w-full py-3 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition-colors mb-4 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Sending Link..." : "Send Reset Link"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPass;
