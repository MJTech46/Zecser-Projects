// src/pages/Login.jsx
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const activeTab = location.pathname === "/login" ? "login" : "signup";

const handleLogin = async () => {
  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }

  try {
    setLoading(true);
    const response = await fetch("http://127.0.0.1:8000/api/accounts/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      // Correct way to store the access token
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh); // optional

      alert("Login successful!");
      navigate("/CompanyProfile"); // Redirect to company profile
    } else {
      const errorData = await response.json();
      alert(`Login failed: ${JSON.stringify(errorData)}`);
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("Something went wrong! Please try again.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-2">
      <div className="w-full sm:w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col justify-between h-[100vh] max-h-[800px]">
        {/* Logo */}
        <div className="text-center py-6 mt-2">
          <h1 className="text-3xl font-bold text-gray-900">Logo</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 px-6 mb-2">
          <Link
            to="/login"
            className={`flex-1 text-center py-2 text-lg font-semibold rounded-lg transition-colors ${
              activeTab === "login"
                ? "bg-blue-50 text-blue-500"
                : "bg-transparent text-gray-400"
            }`}
          >
            Login
          </Link>

          <Link
            to="/signup"
            className={`flex-1 text-center py-2 text-lg font-semibold rounded-lg transition-colors ${
              activeTab === "signup"
                ? "bg-blue-50 text-blue-500"
                : "bg-transparent text-gray-400"
            }`}
          >
            Sign Up
          </Link>
        </div>

        {/* Form */}
        <div className="px-6 flex-grow overflow-y-auto pb-4 scrollbar-hide">
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            Welcome back!
          </h2>
          <p className="text-gray-600 mb-4 text-sm">
            Login to your account to connect with professionals and explore opportunities
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

          {/* Password */}
          <div className="mb-3">
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm text-gray-400">Password</label>
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <a
              href="#"
              className="text-blue-600 text-sm underline float-right p-2"
            >
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className={`w-full py-3 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition-colors mb-4 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging In..." : "Login"}
          </button>

          {/* Social Login */}
          <div className="text-center">
            <p className="text-gray-600 mb-6">Or Continue With</p>
            <div className="flex justify-center gap-8">
              {/* Google */}
              <button className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-8 h-8">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                </div>
                <span className="text-sm text-gray-700">Google</span>
              </button>

              {/* Facebook */}
              <button className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-8 h-8">
                    <path
                      fill="#1877F2"
                      d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                    />
                  </svg>
                </div>
                <span className="text-sm text-gray-700">Facebook</span>
              </button>

              {/* Apple */}
              <button className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-8 h-8">
                    <path
                      fill="#000000"
                      d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"
                    />
                  </svg>
                </div>
                <span className="text-sm text-gray-700">Apple ID</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
