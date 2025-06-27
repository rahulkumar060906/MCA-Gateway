import React, { useState } from 'react';
import examImg from '../assets/loginPage.png'; // <-- Add your image to /assets and import it

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen w-full h-100vh flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="flex flex-col md:flex-row items-center bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden w-full max-w-5xl">
        
        {/* Illustration Section */}
        <div className="hidden md:block w-full md:w-1/2 bg-purple-100 dark:bg-gray-700 p-6">
          <img
            src={examImg}
            alt="Exam Illustration"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8">
          {/* Tabs */}
          <div className="flex mb-6">
            <button
              className={`flex-1 py-2 font-medium rounded-t-md ${
                isLogin ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-300'
              }`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`flex-1 py-2 font-medium rounded-t-md ${
                !isLogin ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-300'
              }`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form className="space-y-5">
            {!isLogin && (
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your name"
                />
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>

          {isLogin && (
            <p className="text-right text-sm mt-2 text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
              Forgot password?
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
