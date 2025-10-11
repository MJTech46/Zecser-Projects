import React from "react";
import {
  Send,
  Check,
  Ellipsis,
  Bell,
  MoveRight,
  ThumbsUp,
  MessageCircle,
  Repeat2,
  Share2,
} from "lucide-react";

const CompanyProfile = () => {
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

          {/* Profile Picture */}
          <div className="absolute -bottom-16 left-8">
            <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden">
              <img
                src="https://media.licdn.com/dms/image/v2/D560BAQGpTZhHofFaiQ/company-logo_200_200/B56ZbrfWzCG4AI-/0/1747707588267?e=1762992000&v=beta&t=7OzIVkhyU3x03BMrbHjreyxLESqP5FaxJoGvYN8b9vc"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="pt-20 px-6 flex-grow pb-4">
          <div className="flex items-center gap-2 justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              Zecser Business LLP
            </h2>
            {/* Notification Bell */}
            <button className="flex items-center justify-center w-9 h-9 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
              <Bell className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          <p className="text-gray-800 mt-2 text-base">
            IT Services and IT Consulting · 268 followers · 2–10 employees
          </p>
          <p className="text-gray-500 text-sm mt-1">
            Sangeeth & 2 other connections work here
          </p>

          {/* Action Buttons */}
          <div className="mt-5 flex flex-wrap justify-center sm:justify-start gap-2">
            <button className="flex items-center justify-center gap-2 flex-1 min-w-[140px] sm:flex-none sm:w-auto px-4 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors">
              <Send className="w-4 h-4" /> Message
            </button>

            <button className="flex items-center justify-center gap-2 flex-1 min-w-[140px] sm:flex-none sm:w-auto px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-full hover:bg-gray-200 transition-colors">
              <Check className="w-4 h-4" /> Following
            </button>

            <button className="flex items-center justify-center gap-2 flex-1 min-w-[60px] sm:flex-none sm:w-auto px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-full hover:bg-gray-200 transition-colors">
              <Ellipsis className="w-4 h-4" /> More
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-8 border-t border-b border-gray-200">
            <div className="flex justify-around text-gray-600 font-medium text-sm sm:text-base">
              {["Home", "About", "Services", "Posts", "Jobs", "People"].map(
                (tab) => (
                  <button
                    key={tab}
                    className={`px-3 py-3 border-b-2 transition-colors ${
                      tab === "Home"
                        ? "border-blue-600 text-blue-600 font-semibold"
                        : "border-transparent hover:text-blue-500"
                    }`}
                  >
                    {tab}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Overview Section */}
          <div className="mt-6 bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Overview
              </h3>

              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                At Zecser Business LLP, we are passionate about building the
                future of digital innovation and professional skill development.
                🌐 Website Development: We specialize in crafting modern,
                responsive, and user-centric websites tailored to your business
                needs. From startups to enterprises, we help brands grow and
                thrive in the digital landscape ...
              </p>
            </div>

            {/* Full-width bottom button */}
            <button className="w-full flex items-center justify-center gap-2 py-3 bg-gray-100 text-blue-600 font-medium hover:bg-gray-200 transition-colors border-t border-gray-200">
              Show all details
              <MoveRight className="w-4 h-4" />
            </button>
          </div>

          {/* Services Section */}
          <div className="mt-6 bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Services
              </h3>

              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                At Zecser Business LLP, we are committed to driving growth and
                success for businesses through a comprehensive suite of
                services: 🌐 Website Development We build responsive, modern,
                and scalable websites tailored to your brand's needs — whether
                it's a landing page, eCommerce platform, or a custom web
                application. 🧠 HR Training We offer professional HR training
                programs that enhance organizational development, employee
                efficiency, and workplace culture.
              </p>

              <div className="mt-8">
                <h4 className="text-m font-semibold text-gray-900 mb-2">
                  Services provided
                </h4>

                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  IT Consulting • Digital Marketing • Email Marketing • Lead
                  Generation • Human Resources (HR) • Android Development •
                  Mobile Application Development • Web Development • Web Design
                </p>
                <button className="border mt-6 flex items-center justify-center gap-2 flex-1 min-w-[140px] sm:flex-none sm:w-auto px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-full hover:bg-gray-200 transition-colors">
                  Request services
                </button>
              </div>
            </div>

            {/* Full-width bottom button */}
            <button className="w-full flex items-center justify-center gap-2 py-3 bg-gray-100 text-blue-600 font-medium hover:bg-gray-200 transition-colors border-t border-gray-200">
              Show all services
              <MoveRight className="w-4 h-4" />
            </button>
          </div>

          {/* Page Posts Section */}
          <div className="mt-8 bg-white rounded-2xl shadow border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 px-6 pt-4">
              Page posts
            </h3>

            {/* Scrollable post cards */}
            <div className="flex overflow-x-auto gap-4 px-6 py-4 scrollbar-hide">
              {/* Post 1 */}
              <div className="w-75 sm:min-w-[320px] bg-gray-50 rounded-xl shadow-sm border border-gray-200 flex-shrink-0">
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src="https://media.licdn.com/dms/image/v2/D560BAQGpTZhHofFaiQ/company-logo_200_200/B56ZbrfWzCG4AI-/0/1747707588267?e=1762992000&v=beta&t=7OzIVkhyU3x03BMrbHjreyxLESqP5FaxJoGvYN8b9vc"
                      alt="Company logo"
                      className="w-8 h-8 rounded"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">
                        Zecser Business LLP
                      </h4>
                      <p className="text-xs text-gray-500">
                        268 followers • 4w
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-700 mb-3">
                    Huge congrats,Ajil V Sajith K T on completing the 2 month
                    MERN Stack Internship and securing a position as a MERN
                    Stack Developer..{" "}
                    <span className="text-gray-500">...more</span>
                  </p>

                  {/* Centered Post Image */}
                  <div className="flex justify-center my-3">
                    <img
                      src="https://media.licdn.com/dms/image/v2/D5622AQFBY_Vcxj6E1w/feedshare-shrink_800/B56Zk3aKTzKAAk-/0/1757571231061?e=1762992000&v=beta&t=PopQTHcpNB2fBWeQ_H36HCfKCySVhREe8aRIjNynozs"
                      alt="Post"
                      className="w-full max-w-[450px] rounded-lg object-cover"
                    />
                  </div>

                  {/* Reactions */}
                  <div className="flex justify-between items-center text-gray-500 text-sm mt-3 px-2">
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      <span>15</span>
                    </div>
                    <div className="flex gap-4">
                      <button className="hover:text-blue-600 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                      </button>
                      <button className="hover:text-blue-600 transition-colors">
                        <Repeat2 className="w-4 h-4" />
                      </button>
                      <button className="hover:text-blue-600 transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Post 2 */}
              <div className="w-75 sm:min-w-[320px] bg-gray-50 rounded-xl shadow-sm border border-gray-200 flex-shrink-0">
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src="https://media.licdn.com/dms/image/v2/D560BAQGpTZhHofFaiQ/company-logo_200_200/B56ZbrfWzCG4AI-/0/1747707588267?e=1762992000&v=beta&t=7OzIVkhyU3x03BMrbHjreyxLESqP5FaxJoGvYN8b9vc"
                      alt="Company logo"
                      className="w-8 h-8 rounded"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">
                        Zecser Business LLP
                      </h4>
                      <p className="text-xs text-gray-500">
                        268 followers • 4w
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-700 mb-3">
                    Huge congrats, Muhammad Suhail K T on completing the 2 month
                    MERN Stack Internship and securing a position as a MERN
                    Stack Developer..{" "}
                    <span className="text-gray-500">...more</span>
                  </p>

                  {/* Centered Post Image */}
                  <div className="flex justify-center my-3">
                    <img
                      src="https://media.licdn.com/dms/image/v2/D5622AQEJHJODNOiCrw/feedshare-shrink_800/B56Zk3X2.CG4Ag-/0/1757570627549?e=1762992000&v=beta&t=TSMsNPPUHZiOFwB6qhLkupyOtZLY2QyTxvELHMilPrg"
                      alt="Post"
                      className="w-full max-w-[450px] rounded-lg object-cover"
                    />
                  </div>

                  {/* Reactions */}
                  <div className="flex justify-between items-center text-gray-500 text-sm mt-3 px-2">
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      <span>15</span>
                    </div>
                    <div className="flex gap-4">
                      <button className="hover:text-blue-600 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                      </button>
                      <button className="hover:text-blue-600 transition-colors">
                        <Repeat2 className="w-4 h-4" />
                      </button>
                      <button className="hover:text-blue-600 transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              

              {/* Post 3 */}
              <div className="w-75 sm:min-w-[320px] bg-gray-50 rounded-xl shadow-sm border border-gray-200 flex-shrink-0">
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src="https://media.licdn.com/dms/image/v2/D560BAQGpTZhHofFaiQ/company-logo_200_200/B56ZbrfWzCG4AI-/0/1747707588267?e=1762992000&v=beta&t=7OzIVkhyU3x03BMrbHjreyxLESqP5FaxJoGvYN8b9vc"
                      alt="Company logo"
                      className="w-8 h-8 rounded"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">
                        Zecser Business LLP
                      </h4>
                      <p className="text-xs text-gray-500">
                        268 followers • 4w
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-700 mb-3">
                    Huge congrats, Saranya S Kumar on completing the 2 month
                    MERN Stack Internship and securing a position as a MERN
                    Stack Developer..{" "}
                    <span className="text-gray-500">...more</span>
                  </p>

                  {/* Centered Post Image */}
                  <div className="flex justify-center my-3">
                    <img
                      src="https://media.licdn.com/dms/image/v2/D5622AQEg5hr_-8YWwg/feedshare-shrink_800/B56Zk3U9kQKEAg-/0/1757569868167?e=1762992000&v=beta&t=QT4rw5lccTs_KuuLOKLEyoSDHB67amT_vqPOigYLT_8"
                      alt="Post"
                      className="w-full max-w-[450px] rounded-lg object-cover"
                    />
                  </div>

                  {/* Reactions */}
                  <div className="flex justify-between items-center text-gray-500 text-sm mt-3 px-2">
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      <span>15</span>
                    </div>
                    <div className="flex gap-4">
                      <button className="hover:text-blue-600 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                      </button>
                      <button className="hover:text-blue-600 transition-colors">
                        <Repeat2 className="w-4 h-4" />
                      </button>
                      <button className="hover:text-blue-600 transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Show all posts button */}
            <button className="w-full flex items-center justify-center gap-2 py-3 bg-gray-100 text-blue-600 font-medium hover:bg-gray-200 transition-colors border-t border-gray-200">
              Show all posts →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
