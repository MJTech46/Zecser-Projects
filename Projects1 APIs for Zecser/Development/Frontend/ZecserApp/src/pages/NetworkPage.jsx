import React from "react";
import {
  AiOutlineHome,
  AiOutlineMessage,
  AiOutlineSearch,
} from "react-icons/ai";
import { MdPeopleOutline, MdWorkOutline, MdAddBox , MdOutlinePeopleAlt, MdPeopleAlt} from "react-icons/md";
import { IoNotificationsOutline } from "react-icons/io5";
import {
  MdGroups,
  MdEvent,
  MdInsertDriveFile,
  MdOutlineNewspaper,
} from "react-icons/md";

const NetworkPage = () => {
  const people = [
    {
      id: 1,
      name: "Aafrin Fasal",
      title:
        "Electronics & Communication Engineer | Internship Experience | Eager to Learn & Grow in Tech",
      mutual: "Abilash and 30 other mutual connections",
      avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    },
    {
      id: 2,
      name: "Safa Akbar",
      title: "Student at IES College of Engineering - India",
      mutual: "Sreelakshmi and 23 other mutual connections",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      id: 3,
      name: "Seshma M S",
      title:
        "Quality Assurance Engineer | AI model Testing | Manual Testing | Automation Testing",
      mutual: "Charles and 61 other mutual connections",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    },
    {
      id: 4,
      name: "Vishnu Sathyan",
      title:
        "Emission Reporting Engineer | MSc in Mechanical Engineering | Maritime Systems",
      mutual: "Govind and 12 other mutual connections",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
  ];

  const pages = [
    {
      id: 1,
      name: "Tata Consultancy Services",
      connections: "8 connections work here",
      logo: "https://media.licdn.com/dms/image/v2/D4D0BAQEN2LLKnux86A/company-logo_200_200/company-logo_200_200/0/1719771663741/tata_technologies_logo?e=1762992000&v=beta&t=t3F8THE0rGqaTZ_3I23s0vOC-j240LtAxib-PUjFMO8",
    },
    {
      id: 2,
      name: "Zoho",
      connections: "118 connections follow this page",
      logo: "https://media.licdn.com/dms/image/v2/D4E0BAQEygLYzCX_Eyw/company-logo_200_200/B4EZokv4W0HcAI-/0/1761553123167/capgemini_logo?e=1762992000&v=beta&t=z9UinP0p9gitC02eBbwsYsuGR7ZR3ZrKMwfTmiuVEOY",
    },
    {
      id: 3,
      name: "NPTEL",
      connections: "34 connections follow this page",
      logo: "https://media.licdn.com/dms/image/v2/D4D0BAQEgtOEcxlXMog/company-logo_200_200/B4DZfqEQWkHAAQ-/0/1751978673981/accenture_logo?e=1762992000&v=beta&t=SpVaRJKt08wY-ihomVD6gdKuPSxaVqzETcb5MykhCAI",
    },
    {
      id: 4,
      name: "Tech Mahindra",
      connections: "2 connections work here",
      logo: "https://media.licdn.com/dms/image/v2/D560BAQH0Xr3LneldUg/company-logo_100_100/B56ZoVFi4_I8AU-/0/1761290370872/tech_mahindra_logo?e=1762992000&v=beta&t=Tb8IlGBo0bnfneVi4e7k9fZvr4bicPhYYPC2YUNA0mU",
    },
    {
      id: 5,
      name: "HackerRank",
      connections: "74 connections follow this page",
      logo: "https://upload.wikimedia.org/wikipedia/commons/6/65/HackerRank_logo.png",
    },
    {
      id: 6,
      name: "JavaScript Developer",
      connections: "77 connections follow this page",
      logo: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
    },
    {
      id: 7,
      name: "freeCodeCamp",
      connections: "72 connections follow this page",
      logo: "https://upload.wikimedia.org/wikipedia/commons/3/39/FreeCodeCamp_logo.png",
    },
    {
      id: 8,
      name: "Adani Group",
      connections: "49 connections follow this page",
      logo: "https://media.licdn.com/dms/image/v2/C560BAQHkw3-_Vbmv_w/company-logo_100_100/company-logo_100_100/0/1630592177979/adani_group_logo?e=1762992000&v=beta&t=fNa_RkQr4VcPVabUMGW6MgYyumG4R02MTsmO71bXDZ0",
    },
  ];

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen">
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

        {/* Right - Icons */}
        <div className="flex items-center gap-5 text-gray-600 text-sm">
          <button className="flex flex-col items-center">
            <AiOutlineHome className="text-2xl" />
            <span>Home</span>
          </button>
          <button className="flex flex-col items-center text-blue-600">
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

      {/* ===== Page Layout (Left + Main) ===== */}
      <div className="flex justify-center gap-6 px-4 mt-6">
        {/* ===== Left Sidebar (Fixed) ===== */}
        <div className="hidden lg:block w-64 h-fit sticky top-20">
          <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
            <h2 className="text-lg font-semibold mb-4">Manage my network</h2>
            <ul className="space-y-3 text-gray-700 text-lg">
              <li className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <MdPeopleOutline className="text-lg" />
                  <span>Connections</span>
                </div>
                <span className="text-gray-500">660</span>
              </li>
              <li className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <MdOutlinePeopleAlt className="text-lg" />
                  <span>Following</span>
                </div>
                <span className="text-gray-500">330</span>
              </li>
              <li className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <MdPeopleAlt className="text-lg" />
                  <span>Followers</span>
                </div>
                <span className="text-gray-500">330</span>
              </li>
              <li className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <MdGroups className="text-lg" />
                  <span>Groups</span>
                </div>
                <span className="text-gray-500">4</span>
              </li>
              <li className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <MdEvent className="text-lg" />
                  <span>Events</span>
                </div>
                <span className="text-gray-500">6</span>
              </li>
              <li className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <MdInsertDriveFile className="text-lg" />
                  <span>Pages</span>
                </div>
                <span className="text-gray-500">15</span>
              </li>
              <li className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <MdOutlineNewspaper className="text-lg" />
                  <span>Newsletters</span>
                </div>
                <span className="text-gray-500">3</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ===== Main Content ===== */}
        <div className="flex-1 max-w-3xl space-y-6">
          {/* People You May Know */}
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <div className="flex justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                People you may know from IES College of Engineering - India
              </h2>
              <p className="text-blue-600 text-sm cursor-pointer">Show all</p>
            </div>

            {people.map((person) => (
              <div
                key={person.id}
                className="flex items-center justify-between py-3 border-b last:border-none"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={person.avatar}
                    alt={person.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">{person.name}</h3>
                    <p className="text-sm text-gray-600">{person.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{person.mutual}</p>
                  </div>
                </div>
                <button className="border border-blue-600 text-blue-600 rounded-full px-4 py-1 text-sm font-medium hover:bg-blue-50 transition">
                  Connect
                </button>
              </div>
            ))}
          </div>

          {/* Pages You May Like */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Based on your recent activity
            </h2>
            <p className="text-blue-600 text-sm cursor-pointer">Show all</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {pages.map((page) => (
              <div
                key={page.id}
                className="border rounded-xl p-3 flex flex-col items-center text-center hover:shadow-md transition"
              >
                <img
                  src={page.logo}
                  alt={page.name}
                  className="w-12 h-12 object-contain mb-2"
                />
                <h3 className="font-semibold text-gray-800 text-sm">
                  {page.name}
                </h3>
                <p className="text-xs text-gray-500 mb-2">{page.connections}</p>
                <button className="border border-blue-600 text-blue-600 rounded-full px-3 py-1 text-xs hover:bg-blue-50 transition">
                  + Follow
                </button>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkPage;
