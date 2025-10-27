import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://127.0.0.1:8000/api/profiles/company/myprofile/";

const EditCompanyProfile = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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
      } catch (err) {
        console.error("Error loading profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      setProfile({
        ...profile,
        [name]: file,
        [`${name}Preview`]: URL.createObjectURL(file),
      });
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setSaving(true);

  const token = localStorage.getItem("accessToken");
  const formData = new FormData();

  const allowedFields = [
    "company_name",
    "company_website",
    "company_description",
    "company_overview",
    "company_services",
    "company_logo",
    "company_cover",
    "location",
    "founded_year",
    "employee_count",
  ];

  for (const key of allowedFields) {
    // Skip previews
    if (key.endsWith("Preview")) continue;

    // ✅ If it's a file input, only append if the user actually selected a new file
    if ((key === "company_logo" || key === "company_cover")) {
      if (profile[key] instanceof File) {
        formData.append(key, profile[key]);
      }
      continue;
    }

    // ✅ Otherwise append normally
    if (profile[key] !== null && profile[key] !== undefined) {
      formData.append(key, profile[key]);
    }
  }

  try {
    const res = await fetch(API_URL, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData, // don't stringify FormData
    });

    const data = await res.json().catch(() => ({}));
    console.log("Response:", res.status, data);

    if (!res.ok) {
      throw new Error(data.detail || data.message || "Failed to update profile");
    }

    alert("Profile updated successfully!");
    navigate("/CompanyProfile");
  } catch (err) {
    console.error("Error saving profile:", err);
    alert("Failed to update profile");
  } finally {
    setSaving(false);
  }
};



  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading profile...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-500 text-white py-5 px-8">
          <h2 className="text-xl sm:text-2xl font-semibold">
            Edit Company Profile
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Cover Image */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Company Cover
            </label>
            <div className="relative w-full h-48 sm:h-56 bg-gray-100 rounded-xl overflow-hidden">
              <img
                src={
                  profile.company_coverPreview ||
                  profile.company_cover ||
                  "https://mn.gov/mnit/assets/Nodes_tcm38-639178.png"
                }
                alt="Cover"
                className="w-full h-full object-cover"
              />
              <input
                type="file"
                name="company_cover"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {/* Logo */}
          <div className="flex flex-col items-center">
            <label className="block text-gray-700 font-medium mb-2">
              Company Logo
            </label>
            <div className="relative w-36 h-36 rounded-full border-4 border-gray-200 overflow-hidden">
              <img
                src={
                  profile.company_logoPreview ||
                  profile.company_logo ||
                  "https://static.vecteezy.com/system/resources/previews/024/766/958/large_2x/default-male-avatar-profile-icon-social-media-user-free-vector.jpg"
                }
                alt="Logo"
                className="w-full h-full object-cover"
              />
              <input
                type="file"
                name="company_logo"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {/* Input Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-1">Company Name</label>
              <input
                type="text"
                name="company_name"
                value={profile.company_name || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Enter company name"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={profile.email || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Enter company email"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Description</label>
            <textarea
              name="company_description"
              value={profile.company_description || ""}
              onChange={handleChange}
              rows="3"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter short company description"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Overview</label>
            <textarea
              name="company_overview"
              value={profile.company_overview || ""}
              onChange={handleChange}
              rows="4"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Write about your company..."
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Services</label>
            <textarea
              name="company_services"
              value={profile.company_services || ""}
              onChange={handleChange}
              rows="3"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="List your services..."
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate("/CompanyProfile")}
              className="px-6 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCompanyProfile;
