import React, { useEffect, useState } from "react";
import { Pencil, MoveRight, Upload } from "lucide-react";

const API_URL = "http://127.0.0.1:8000/api/profiles/company/myprofile/";

const CompanyProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState("");
  const [uploading, setUploading] = useState(false);

  // Fetch profile on load
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await fetch(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

  // Handle Edit Click
  const handleEdit = (field) => {
    setEditingField(field);
    setTempValue(profile?.[field] || "");
  };

  // Handle Text Save
  const handleSave = async (field) => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(API_URL, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ [field]: tempValue }),
      });

      if (!res.ok) throw new Error("Failed to update field");

      const updated = await res.json();
      setProfile(updated);
      setEditingField(null);
    } catch (error) {
      console.error("Error saving field:", error);
    }
  };

  // Handle File Upload (Cover or Logo)
  const handleFileChange = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const token = localStorage.getItem("accessToken");
      const formData = new FormData();
      formData.append(field, file);

      const res = await fetch(API_URL, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to upload file");

      const updated = await res.json();
      setProfile(updated);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading profile...</p>
      </div>
    );
  }

  const defaultText = (value, fallback) => value || fallback;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-2">
      <div className="w-full sm:w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col justify-between">
        {/* Banner */}
        <div className="relative">
          <img
            src={
              profile?.company_cover ||
              "https://mn.gov/mnit/assets/Nodes_tcm38-639178.png"
            }
            alt="cover image"
            className="w-full h-48 object-cover"
          />
          {/* Upload cover image */}
          <div className="absolute top-2 right-8 flex gap-2">
            <label className="flex items-center justify-center w-9 h-9 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors cursor-pointer">
              <Upload className="w-5 h-5 text-gray-700" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileChange(e, "company_cover")}
              />
            </label>
            <button
              onClick={() => handleEdit("company_cover")}
              className="flex items-center justify-center w-9 h-9 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              <Pencil className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          {/* Profile Picture */}
          <div className="absolute -bottom-16 left-8">
            <div className="relative w-32 h-32 rounded-full border-4 border-white overflow-hidden">
              <img
                src={
                  profile?.company_logo ||
                  "https://static.vecteezy.com/system/resources/previews/024/766/958/large_2x/default-male-avatar-profile-icon-social-media-user-free-vector.jpg"
                }
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <label className="absolute bottom-0 right-0 w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer border-2 border-white">
                <Upload className="w-5 h-5 text-gray-700" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, "company_logo")}
                />
              </label>
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="pt-20 px-6 flex-grow pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              {editingField === "company_name" ? (
                <div className="flex items-center gap-2">
                  <input
                    className="border border-gray-300 rounded px-2 py-1"
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                  />
                  <button
                    onClick={() => handleSave("company_name")}
                    className="px-2 py-1 bg-blue-600 text-white rounded"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {defaultText(profile?.company_name, "Zecser Business LLP")}
                  </h2>
                  <button
                    onClick={() => handleEdit("company_name")}
                    className="flex items-center justify-center w-9 h-9 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <Pencil className="w-5 h-5 text-gray-700" />
                  </button>
                </>
              )}
            </div>

            <p className="text-blue-800 font-bold text-base break-all">
              <a href={`mailto:${profile?.email || "noemail@company.com"}`}>
                {profile?.email ? profile.email : "No email provided"}
              </a>
            </p>
          </div>

          {/* Description */}
          {editingField === "company_description" ? (
            <div className="mt-2 flex flex-col gap-2">
              <textarea
                rows="3"
                className="border border-gray-300 rounded px-2 py-1"
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
              />
              <button
                onClick={() => handleSave("company_description")}
                className="self-start px-2 py-1 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          ) : (
            <p className="text-gray-800 mt-2 text-base flex items-center gap-2">
              {defaultText(
                profile?.company_description,
                "No description provided."
              )}
              <button
                onClick={() => handleEdit("company_description")}
                className="flex items-center justify-center w-9 h-9 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <Pencil className="w-4 h-4 text-gray-700" />
              </button>
            </p>
          )}

          {/* Action Buttons */}
          <div className="mt-5 grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
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

          {/* Overview Section */}
          <div className="mt-6 bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Overview
              </h3>

              {editingField === "company_overview" ? (
                <div className="flex flex-col gap-2">
                  <textarea
                    rows="4"
                    className="border border-gray-300 rounded px-2 py-1"
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                  />
                  <button
                    onClick={() => handleSave("company_overview")}
                    className="self-start px-2 py-1 bg-blue-600 text-white rounded"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  {defaultText(
                    profile?.company_overview,
                    "Add a company overview to help people learn more about your business..."
                  )}
                </p>
              )}
            </div>

            <button
              onClick={() => handleEdit("company_overview")}
              className="w-full flex items-center justify-center gap-2 py-3 bg-gray-100 text-blue-600 font-medium hover:bg-gray-200 transition-colors border-t border-gray-200"
            >
              Add overview
              <MoveRight className="w-4 h-4" />
            </button>
          </div>

          {/* Services Section */}
          <div className="mt-6 bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Services
              </h3>

              {editingField === "company_services" ? (
                <div className="flex flex-col gap-2">
                  <textarea
                    rows="3"
                    className="border border-gray-300 rounded px-2 py-1"
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                  />
                  <button
                    onClick={() => handleSave("company_services")}
                    className="self-start px-2 py-1 bg-blue-600 text-white rounded"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  {defaultText(
                    profile?.company_services,
                    "Add services your company provides to let people know how you can help them."
                  )}
                </p>
              )}
            </div>

            <button
              onClick={() => handleEdit("company_services")}
              className="w-full flex items-center justify-center gap-2 py-3 bg-gray-100 text-blue-600 font-medium hover:bg-gray-200 transition-colors border-t border-gray-200"
            >
              Add Services You Provide
              <MoveRight className="w-4 h-4" />
            </button>
          </div>

          {/* Posts */}
          <div className="mt-8 bg-white rounded-2xl shadow border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 px-6 pt-4">
              Page posts
            </h3>

            <div className="flex overflow-x-auto gap-4 px-6 py-4 scrollbar-hide">
              <p>nothing to show...</p>
            </div>

            <button className="w-full flex items-center justify-center gap-2 py-3 bg-gray-100 text-blue-600 font-medium hover:bg-gray-200 transition-colors border-t border-gray-200">
              Create a posts →
            </button>
          </div>

          {uploading && (
            <p className="mt-4 text-sm text-gray-600 italic">
              Uploading image...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
