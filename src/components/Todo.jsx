import React, { useState, useEffect } from "react";
import { FaPlus, FaTimes, FaBell, } from "react-icons/fa";
import { FaRepeat } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

const getStoredTasks = () =>
  JSON.parse(localStorage.getItem("todo_tasks")) || [];

export default function TodoWidget() {
  const [tasks, setTasks] = useState(getStoredTasks);
  const [input, setInput] = useState("");
  const [showWidget, setShowWidget] = useState(false);
  const [enableNotifications, setEnableNotifications] = useState(true);

  useEffect(() => {
    localStorage.setItem("todo_tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (!input.trim()) return;
    const newTask = {
      id: Date.now(),
      text: input,
      done: false,
      date: new Date().toISOString(),
      recurring: false,
    };
    setTasks([...tasks, newTask]);
    setInput("");
    if (enableNotifications && Notification.permission === "granted") {
      new Notification("📝 New Task Added", { body: input });
    }
  };

  const handleToggleTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleToggleRecurring = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, recurring: !t.recurring } : t
      )
    );
  };

  const aiSuggestedTasks = ["Review notes", "Practice coding", "Take a 10-min walk"];

  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  return (
    <>
      <button
        className="fixed z-50 bottom-5 left-5 p-3 rounded-full bg-purple-600 text-white shadow-lg hover:bg-purple-700"
        onClick={() => setShowWidget(!showWidget)}
      >
        {showWidget ? <FaTimes /> : <FaPlus />}
      </button>

      <AnimatePresence>
        {showWidget && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="fixed z-40 bottom-20 left-5 w-[90vw] sm:w-96 bg-white/30 dark:bg-white/10 backdrop-blur-md rounded-xl shadow-2xl p-4 text-gray-900 dark:text-white"
          >
            <h2 className="text-lg font-bold mb-2">📑 To-Do</h2>
            <div className="flex gap-2 mb-4">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter task..."
                className="flex-1 px-3 py-2 rounded-lg bg-white/50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none"
              />
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg"
                onClick={handleAddTask}
              >
                Add
              </button>
            </div>

            {tasks.length > 0 ? (
              <ul className="space-y-2 max-h-60 overflow-y-auto">
                {tasks.map((task) => (
                  <li
                    key={task.id}
                    className={`flex items-center justify-between bg-white/60 dark:bg-gray-700 px-3 py-2 rounded-lg ${
                      task.done ? "line-through opacity-60" : ""
                    }`}
                  >
                    <span
                      className="flex-1 cursor-pointer"
                      onClick={() => handleToggleTask(task.id)}
                    >
                      {task.text}
                    </span>
                    <div className="flex items-center gap-2 ml-3">
                      <FaRepeat
                        className={`cursor-pointer ${
                          task.recurring ? "text-green-500" : "text-gray-400"
                        }`}
                        onClick={() => handleToggleRecurring(task.id)}
                      />
                      <FaTimes
                        className="text-red-500 cursor-pointer"
                        onClick={() => handleDeleteTask(task.id)}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-600 dark:text-gray-300">No tasks yet</p>
            )}

            {/* AI Suggestions */}
            <div className="mt-4">
              <p className="text-sm text-purple-600 dark:text-purple-300 mb-1">AI Suggestions:</p>
              <ul className="text-sm list-disc list-inside">
                {aiSuggestedTasks.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>

            {/* Settings */}
            <div className="mt-4 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={enableNotifications}
                  onChange={() => setEnableNotifications(!enableNotifications)}
                  className="accent-purple-600"
                />
                Enable Notifications
              </label>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}