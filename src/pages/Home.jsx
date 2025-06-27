import React from 'react';
import { FaTrophy, FaBook, FaYoutube, FaTasks } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full min-h-[80vh] flex flex-col items-center justify-center py-25 px-2 md:px-0 dark:bg-blue-950 ">
      <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-800 dark:text-white  text-center">
        Welcome to <span className="text-blue-600 dark:text-blue-400">MCA Gateway</span>
      </h1>
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 text-center">
        Your gamified NIMCET preparation platform.
      </p>
      <div className="features grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl">
        <div className="feature-card flex flex-col items-center bg-gray-100 dark:bg-blue-900 dark:text-gray-200 rounded-lg p-6 shadow hover:scale-105 transition">
          <FaTrophy className="text-3xl text-yellow-500 mb-2" />
          <span className="font-semibold">Levels & XP</span>
        </div>
        <div className="feature-card flex flex-col items-center bg-gray-100 dark:bg-blue-900 dark:text-gray-200 rounded-lg p-6 shadow hover:scale-105 transition">
          <FaTasks className="text-3xl text-green-500 mb-2" />
          <span className="font-semibold">Daily Challenges</span>
        </div>
        <div className="feature-card flex flex-col items-center bg-gray-100 dark:bg-blue-900 dark:text-gray-200 rounded-lg p-6 shadow hover:scale-105 transition">
          <FaYoutube className="text-3xl text-red-500 mb-2" />
          <span className="font-semibold">Video Lectures</span>
        </div>
        <div className="feature-card flex flex-col items-center bg-gray-100 dark:bg-blue-900 dark:text-gray-200 rounded-lg p-6 shadow hover:scale-105 transition">
          <FaBook className="text-3xl text-blue-500 mb-2" />
          <span className="font-semibold">Notes & Tests</span>
        </div>
      </div>
      <button
        className="mt-8 px-8 py-3 bg-blue-600 text-white font-semibold rounded-4xl hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
        // onClick={() =>  navigate('/login')}
        onClick={() =>  navigate('/levels')}
      >
        Get Started
      </button>
    </div>
  );
};

export default Home;
