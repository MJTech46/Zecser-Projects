import React, { useEffect, useState } from "react";
import { MoveRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://127.0.0.1:8000/api/profiles/company/myprofile/";

const CompanyProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await fetch(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        setProfile(data);
      } catch (error) {
        console.error("Error loading profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading profile...</p>
      </div>
    );

  const defaultText = (value, fallback) => value || fallback;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-2">
      <div className="w-full sm:w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col">
        {/* Banner */}
        <div className="relative">
          <img
            src={
              profile?.company_cover ||
              "https://mn.gov/mnit/assets/Nodes_tcm38-639178.png"
            }
            alt="cover"
            className="w-full h-48 object-cover"
          />

          {/* Profile Picture */}
          <div className="absolute -bottom-16 left-8">
            <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden">
              <img
                src={
                  profile?.company_logo ||
                  "https://static.vecteezy.com/system/resources/previews/024/766/958/large_2x/default-male-avatar-profile-icon-social-media-user-free-vector.jpg"
                }
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="pt-20 px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              {defaultText(profile?.company_name, "Zecser Business LLP")}
            </h2>
            <p className="text-blue-800 font-bold">
              {profile?.email || "No email provided"}
            </p>
          </div>

          <p className="text-gray-800 mt-2">
            {defaultText(
              profile?.company_description,
              "No description provided."
            )}
          </p>



            {/* Action Buttons */}
          <div className="mt-5 grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
            <button
              onClick={() => navigate("/EditCompanyProfile")}
              className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
            >
              Edit Profile
            </button>
            <button className="flex-1 min-w-[140px] py-2 bg-gray-100 text-gray-700 font-semibold rounded-full hover:bg-gray-200 transition-colors">
              Add profile section
            </button>
            <button className="flex-1 min-w-[140px] py-2 bg-gray-100 text-gray-700 font-semibold rounded-full hover:bg-gray-200 transition-colors">
              Enhance profile
            </button>
          </div>


          {/* Overview */}
          <div className="mt-6 bg-gray-50 rounded-xl border border-gray-200 p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Overview
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {defaultText(
                profile?.company_overview,
                "Add a company overview to help people learn more about your business..."
              )}
            </p>
          </div>

          {/* Services */}
          <div className="mt-6 bg-gray-50 rounded-xl border border-gray-200 p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Services
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {defaultText(
                profile?.company_services,
                "Add services your company provides to let people know how you can help them."
              )}
            </p>
          </div>

          {/* Posts */}
          <div className="mt-8 bg-white rounded-2xl shadow border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 px-6 pt-4">
              Page posts
            </h3>
            <div className="flex overflow-x-auto gap-4 px-6 py-4 scrollbar-hide">
              <p>nothing to show...</p>
            </div>
            <button className="w-full flex items-center justify-center gap-2 py-3 bg-gray-100 text-blue-600 font-medium hover:bg-gray-200 border-t border-gray-200">
              Create a post →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
