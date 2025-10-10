import React from "react";
import { Github, Pencil, Plus } from "lucide-react";

const UserProfile = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-2">
      <div className="w-full sm:w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col justify-between">
        {/* Banner */}
        <div className="relative">
          <img
            src="https://mn.gov/mnit/assets/Nodes_tcm38-639178.png"
            alt="cover image"
            className="w-full h-48 object-cover"
          />
          {/* Edit button for banner */}
          <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition">
            <Pencil className="w-4 h-4 text-gray-700" />
          </button>

          {/* Profile Picture */}
          <div className="absolute -bottom-16 left-8">
            <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden">
              <img
                src="https://www.theitagency.com.au/wp-content/uploads/2024/12/Insert-Image-Here-2.png"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 bg-green-600 text-white text-xs font-semibold px-4 py-1 rounded-full border-2 border-white">
              #OPENTOWORK
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="pt-20 px-6 flex-grow pb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-gray-900">User Profile</h2>
            {/* Edit button for name */}
            <button className="p-1 rounded-full hover:bg-gray-100 transition">
              <Pencil className="w-4 h-4 text-gray-700" />
            </button>
          </div>

          <p className="text-gray-600 text-sm">He/Him</p>
          <p className="text-gray-800 mt-2 text-base">
            Django Stack Developer | Intern at Zecser Business LLP
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
          <div className="mt-5 grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
            <button className="flex-1 min-w-[140px] py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors">
              Open to
            </button>
            <button className="flex-1 min-w-[140px] py-2 bg-gray-100 text-gray-700 font-semibold rounded-full hover:bg-gray-200 transition-colors">
              Add profile section
            </button>
            <button className="flex-1 min-w-[140px] py-2 bg-gray-100 text-gray-700 font-semibold rounded-full hover:bg-gray-200 transition-colors">
              Enhance profile
            </button>
            <button className="flex-1 min-w-[140px] py-2 bg-gray-100 text-gray-700 font-semibold rounded-full hover:bg-gray-200 transition-colors">
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
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Suggested for you
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-xl p-4 text-gray-700">
                Enhance your profile with personalized AI tips and stand out.
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-gray-700">
                Connect with a Python Developer to achieve your career goals.
              </div>
            </div>
          </div>

          {/* Experience Section */}
          <div className="mt-6 bg-gray-50 rounded-xl p-4">
            <div className="flex justify-between items-center mb-3  border-b border-gray-200 pt-3">
              <h3 className="text-lg font-semibold text-gray-800">Experience</h3>
              <div className="flex items-center gap-2">
                <button className="p-1 hover:bg-gray-100 rounded-full">
                  <Plus className="w-4 h-4 text-gray-700" />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded-full">
                  <Pencil className="w-4 h-4 text-gray-700" />
                </button>
              </div>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Django intern</p>
              <p className="text-sm text-gray-600">Zecser Business LLP • Internship</p>
              <p className="text-sm text-gray-500">Apr 2023 – Oct 2023 • 7 mos</p>
              <p className="text-sm text-gray-600 mt-1">
               ◈ Full-Stack Development, Django and +2 skills
              </p>
            </div>
          </div>

          {/* Education Section */}
          <div className="mt-6 bg-gray-50 rounded-xl p-4">
            <div className="flex justify-between items-center mb-3 border-b border-gray-200 pt-3">
              <h3 className="text-lg font-semibold text-gray-800">Education</h3>
              <div className="flex items-center gap-2">
                <button className="p-1 hover:bg-gray-100 rounded-full">
                  <Plus className="w-4 h-4 text-gray-700" />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded-full">
                  <Pencil className="w-4 h-4 text-gray-700" />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-3">
                  <img
                    src="https://logodix.com/logo/868248.jpg"
                    alt="KTU Logo"
                    className="w-10 h-10"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">
                      APJ Abdul Kalam Technological University
                    </p>
                    <p className="text-sm text-gray-600">
                      Bachelor of Technology - BTech, Computer Science
                    </p>
                    <p className="text-sm text-gray-500">Oct 2022 – Nov 2026</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-3">
                <div className="flex items-center gap-3">
                  <img
                    src="https://tse4.mm.bing.net/th/id/OIP.1TmrDcaMog551B_saUdGOQHaHa?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3"
                    alt="IES Logo"
                    className="w-10 h-10"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">
                      IES College of Engineering – India
                    </p>
                    <p className="text-sm text-gray-600">
                      Bachelor of Technology - BTech, Computer Science
                    </p>
                    <p className="text-sm text-gray-500">Oct 2022 – Nov 2026</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserProfile;
