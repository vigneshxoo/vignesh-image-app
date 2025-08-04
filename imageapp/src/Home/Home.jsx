import React from 'react';
import { FaRegImages } from "react-icons/fa6";
import { SiMagento } from "react-icons/si";
import { FaUserSecret, FaUserCircle } from "react-icons/fa";
import { ImageUpload } from './ImageUpload';
import { Link, useNavigate } from 'react-router-dom';
import { BsCloudUpload } from "react-icons/bs";

export const Home = ({ onLogout }) => {
  const navigate = useNavigate();

  const data = [
    {
      icon: <FaRegImages size={30} />,
      text: "Your Images",
      smalltext: "PNG JPEG GIF",
      to:"/profile"
    },
    {
      icon: <SiMagento size={30} />,
      text: "GIF Size",
      smalltext: "800x800",
    },
    {
      icon: <FaUserSecret size={30} />,
      text: "All user img",
      smalltext: "User",
      to: "/all"
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    if (onLogout) onLogout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="flex items-center justify-between py-3 px-4 sm:px-8 bg-white shadow-md w-full mb-6">
        <Link to="/home" className="flex items-center gap-2 font-bold text-xl text-pink-600">
          {/* Brand Logo/Icon */}
          <span><BsCloudUpload />
          </span>
          <span>Upload Hub</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/home" className="text-gray-700 hover:text-pink-600 font-medium hidden sm:inline">Home</Link>
          <Link to="/profile" className="text-gray-700  hover:text-pink-600 font-medium  hidden  sm:inline">
            <span className='flex items-center gap-3'> <FaUserCircle size={18} /> Profile</span>
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded transition text-sm ml-2"
          >Logout</button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col items-center w-full px-2">
        <div className="w-full max-w-3xl bg-white p-4 sm:p-8 rounded-xl shadow-xl flex flex-col items-center">
          {/* Data Cards */}
          <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-6 mb-10">
            {data.map((item, index) => (
            
                <div
                  key={index}
                  className="flex flex-row sm:flex-col items-center sm:items-start bg-gray-50 px-4 py-3 rounded-md shadow transition duration-200 hover:scale-105 hover:shadow-pink-300 focus-within:ring-2 focus-within:ring-pink-400 min-w-[170px] w-full sm:w-auto cursor-pointer"
                  tabIndex={0}
                >
                  <span className="text-pink-600 mr-4 sm:mr-0 sm:mb-2">
                    {item.icon}
                  </span>
                  <Link to={item.to} className="flex flex-col">
                    <p  className="text-base font-semibold">{item.text}</p>
                    <p className="text-sm font-medium text-gray-500">{item.smalltext}</p>
                  </Link>
                </div>
             
            ))}
          </div>

          {/* Upload Area */}
          <div className="w-full flex justify-center">
            <div className="w-full max-w-md">
              <ImageUpload />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
