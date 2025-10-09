import React from "react";
import { Github } from "lucide-react";

const UserProfile = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-2">
      <div className="w-full sm:w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col justify-between h-[95vh] max-h-[780px]">
        {/* Banner */}
        <div className="relative">
          <div className="h-40 bg-gray-900 flex items-center justify-center">
            <h1 className="text-white text-2xl font-bold">Keep it simple.</h1>
          </div>

          {/* Profile Picture */}
          <div className="absolute -bottom-16 left-8">
            <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden">
              <img
                src="/profile.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full border-2 border-white">
              #OPENTOWORK
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="pt-20 px-6 flex-grow overflow-y-auto pb-4 scrollbar-hide">
          <h2 className="text-2xl font-bold text-gray-900">Abin Santhosh</h2>
          <p className="text-gray-600 text-sm">He/Him</p>
          <p className="text-gray-800 mt-2 text-base">
            Django Stack Developer | Student at IES College of Engineering - India
          </p>
          <p className="text-gray-500 text-sm mt-1">
            Thrissur, Kerala, India • Contact info
          </p>

          <div className="flex items-center gap-2 mt-3 text-blue-600 font-medium">
            <Github className="w-4 h-4" />
            <a href="#">GitHub</a>
          </div>

          <p className="text-sm text-gray-500 mt-1">500+ connections</p>

          {/* Buttons */}
          <div className="mt-5 flex flex-wrap gap-2">
            <button className="flex-1 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors">
              Open to
            </button>
            <button className="flex-1 py-2 bg-gray-100 text-gray-700 font-semibold rounded-full hover:bg-gray-200 transition-colors">
              Add profile section
            </button>
            <button className="flex-1 py-2 bg-gray-100 text-gray-700 font-semibold rounded-full hover:bg-gray-200 transition-colors">
              Enhance profile
            </button>
            <button className="flex-1 py-2 bg-gray-100 text-gray-700 font-semibold rounded-full hover:bg-gray-200 transition-colors">
              Resources
            </button>
          </div>

          {/* Work Info */}
          <div className="mt-6 bg-gray-50 rounded-xl p-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <p className="font-medium text-gray-800">Open to work</p>
                <p className="text-sm text-gray-600">
                  Python Developer, Django Developer, Web Application Developer
                </p>
              </div>
              <button className="text-blue-600 font-medium text-sm hover:underline mt-2 sm:mt-0">
                Show details
              </button>
            </div>
          </div>

          <div className="mt-4 bg-gray-50 rounded-xl p-4 flex justify-between items-center">
            <p className="text-gray-700 text-sm">
              Share that you're hiring and attract qualified candidates.
            </p>
            <button className="text-blue-600 font-medium text-sm hover:underline">
              Get started
            </button>
          </div>

          {/* Suggested Section */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Suggested for you</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-xl p-4 text-gray-700">
                Enhance your profile with personalized AI tips and stand out.
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-gray-700">
                Connect with a Python Developer to achieve your career goals.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;