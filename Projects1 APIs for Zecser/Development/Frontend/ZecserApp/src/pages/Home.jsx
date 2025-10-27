import React from "react";
import {
  AiOutlineSearch,
  AiOutlineHome,
  AiOutlineLike,
  AiOutlineMessage,
} from "react-icons/ai";
import {
  MdPeopleOutline,
  MdWorkOutline,
  MdAddBox,
  MdInsertPhoto,
  MdArticle,
} from "react-icons/md";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaRegCommentDots, FaShare } from "react-icons/fa";

const HomeFeed = () => {
  const posts = [
    {
      id: 1,
      companyLogo:
        "https://media.licdn.com/dms/image/v2/D560BAQGpTZhHofFaiQ/company-logo_200_200/B56ZbrfWzCG4AI-/0/1747707588267?e=1762992000&v=beta&t=7OzIVkhyU3x03BMrbHjreyxLESqP5FaxJoGvYN8b9vc",
      companyName: "Zecser Business LLP",
      followers: "268 followers",
      time: "4w",
      text: "Huge congrats, Ajil V Sajith K T on completing the 2 month MERN Stack Internship and securing a position as a MERN Stack Developer.",
      postImage:
        "https://media.licdn.com/dms/image/v2/D5622AQFBY_Vcxj6E1w/feedshare-shrink_800/B56Zk3aKTzKAAk-/0/1757571231061?e=1762992000&v=beta&t=PopQTHcpNB2fBWeQ_H36HCfKCySVhREe8aRIjNynozs",
      likes: 15,
    },
    {
      id: 2,
      companyLogo:
        "https://media.licdn.com/dms/image/v2/D560BAQGpTZhHofFaiQ/company-logo_200_200/B56ZbrfWzCG4AI-/0/1747707588267?e=1762992000&v=beta&t=7OzIVkhyU3x03BMrbHjreyxLESqP5FaxJoGvYN8b9vc",
      companyName: "Zecser Business LLP",
      followers: "268 followers",
      time: "4w",
      text: "Huge congrats, Muhammad Suhail K T on completing the 2 month MERN Stack Internship and securing a position as a MERN Stack Developer.",
      postImage:
        "https://media.licdn.com/dms/image/v2/D5622AQEJHJODNOiCrw/feedshare-shrink_800/B56Zk3X2.CG4Ag-/0/1757570627549?e=1762992000&v=beta&t=TSMsNPPUHZiOFwB6qhLkupyOtZLY2QyTxvELHMilPrg",
      likes: 15,
    },
    {
      id: 3,
      companyLogo:
        "https://media.licdn.com/dms/image/v2/D560BAQGpTZhHofFaiQ/company-logo_200_200/B56ZbrfWzCG4AI-/0/1747707588267?e=1762992000&v=beta&t=7OzIVkhyU3x03BMrbHjreyxLESqP5FaxJoGvYN8b9vc",
      companyName: "Zecser Business LLP",
      followers: "268 followers",
      time: "4w",
      text: "Huge congrats, Saranya S Kumar on completing the 2 month MERN Stack Internship and securing a position as a MERN Stack Developer.",
      postImage:
        "https://media.licdn.com/dms/image/v2/D5622AQEg5hr_-8YWwg/feedshare-shrink_800/B56Zk3U9kQKEAg-/0/1757569868167?e=1762992000&v=beta&t=QT4rw5lccTs_KuuLOKLEyoSDHB67amT_vqPOigYLT_8",
      likes: 15,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pb-6">
      {/* ===== Top Navbar ===== */}
      <div className="w-full bg-white shadow-sm sticky top-0 z-10 px-4 py-2 flex items-center justify-around">
        {/* Left - Search and Profile */}
        <div className="flex items-center gap-2">
          <img
            src="https://media.licdn.com/dms/image/v2/D5635AQHp_KlaFRex7A/profile-framedphoto-shrink_100_100/profile-framedphoto-shrink_100_100/0/1722405785838?e=1762149600&v=beta&t=cEL16Lfr2qIQFYl6vkgFDP-IYMkWMHbcMBOJdc7I6r0"
            alt="profile"
            className="w-9 h-9 rounded-full border"
          />
          <div className="bg-gray-100 rounded-full flex items-center px-3 py-1">
            <AiOutlineSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none text-sm w-32 sm:w-64"
            />
          </div>
        </div>

        {/* Right - Icons with labels */}
        <div className="flex items-center gap-5 text-gray-600 text-sm">
          <button className="flex flex-col items-center">
            <AiOutlineHome className="text-2xl text-blue-600" />
            <span>Home</span>
          </button>
          <button className="flex flex-col items-center">
            <MdPeopleOutline className="text-2xl" />
            <span>Network</span>
          </button>
          <button className="flex flex-col items-center">
            <MdAddBox className="text-2xl" />
            <span>Post</span>
          </button>
          <button className="flex flex-col items-center">
            <IoNotificationsOutline className="text-2xl" />
            <span>Alerts</span>
          </button>
          <button className="flex flex-col items-center">
            <MdWorkOutline className="text-2xl" />
            <span>Jobs</span>
          </button>
        </div>
      </div>

      {/* ===== "Start a Post" Section ===== */}
      <div className="bg-white rounded-xl shadow-sm p-4 mt-4 w-full max-w-xl">
        <div className="flex items-center gap-3 mb-3">
          <img
            src="https://media.licdn.com/dms/image/v2/D5635AQHp_KlaFRex7A/profile-framedphoto-shrink_100_100/profile-framedphoto-shrink_100_100/0/1722405785838?e=1762149600&v=beta&t=cEL16Lfr2qIQFYl6vkgFDP-IYMkWMHbcMBOJdc7I6r0"
            alt="profile"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1 bg-gray-100 rounded-full py-2 px-4 text-gray-500 cursor-pointer hover:bg-gray-200">
            Start a post
          </div>
        </div>
        <div className="flex justify-around text-gray-600 text-sm">
          <button className="flex items-center gap-1 hover:text-blue-600">
            <MdInsertPhoto className="text-blue-500 text-xl" /> Photo
          </button>
          <button className="flex items-center gap-1 hover:text-green-600">
            <AiOutlineMessage className="text-green-600 text-xl" /> Video
          </button>
          <button className="flex items-center gap-1 hover:text-orange-600">
            <MdArticle className="text-orange-500 text-xl" /> Write article
          </button>
        </div>
      </div>

      {/* ===== Posts Feed ===== */}
      <div className="w-full max-w-xl mt-4 space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-xl shadow-sm p-4">
            {/* Post Header */}
            <div className="flex items-center gap-3 mb-2">
              <img
                src={post.companyLogo}
                alt={post.companyName}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h2 className="font-semibold text-gray-800">{post.companyName}</h2>
                <p className="text-xs text-gray-500">{post.followers}</p>
                <p className="text-xs text-gray-400">{post.time}</p>
              </div>
            </div>

            {/* Post Content */}
            <p className="text-gray-800 text-sm mb-3">{post.text}</p>
            {post.postImage && (
              <img
                src={post.postImage}
                alt="post"
                className="w-full rounded-lg border mb-3"
              />
            )}

            {/* Post Actions */}
            <div className="flex justify-around text-gray-500 text-sm border-t pt-2">
              <button className="flex items-center gap-1 hover:text-blue-600">
                <AiOutlineLike /> Like
              </button>
              <button className="flex items-center gap-1 hover:text-blue-600">
                <FaRegCommentDots /> Comment
              </button>
              <button className="flex items-center gap-1 hover:text-blue-600">
                <FaShare /> Share
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeFeed;
