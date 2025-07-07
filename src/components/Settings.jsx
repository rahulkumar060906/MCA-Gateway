// Settings.jsx
import React, { useState, useEffect } from 'react';

export default function Settings({ setNotificationsEnabled }) {
  const [enabled, setEnabled] = useState(() => {
    return localStorage.getItem('notify') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('notify', enabled);
    setNotificationsEnabled(enabled);
  }, [enabled, setNotificationsEnabled]);

  return (
    <label className="flex items-center gap-4 cursor-pointer">
      <span className="text-sm font-medium dark:text-gray-200 text-gray-700">Push Notifications</span>
      <div
        className={`w-11 h-6 flex items-center  rounded-full p-1 duration-300 ease-in-out ${enabled ? 'bg-blue-500' : 'bg-gray-300 '
          }`}
        onClick={() => setEnabled((v) => !v)}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${enabled ? 'translate-x-5' : ''
            }`}
        ></div>
      </div>
    </label>

  );
}
