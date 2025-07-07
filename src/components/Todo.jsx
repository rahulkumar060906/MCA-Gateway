import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { FiPlus, FiX } from 'react-icons/fi';
import { MdOutlineChecklist } from 'react-icons/md';
import Settings from './Settings';

const initialTasks = JSON.parse(localStorage.getItem('tasks')) || [];

const TodoWidget = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    localStorage.getItem('notify') === 'true'
  );
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  // Ask permission once
  useEffect(() => {
    if (notificationsEnabled && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, [notificationsEnabled]);
  const handleAdd = () => {
    if (!newTask) return;
    const task = {
      id: Date.now().toString(),
      text: newTask,
      done: false,
      dueDate,
    };
    setTasks((prev) => [...prev, task]);
    setNewTask('');
    setDueDate('');

    if (notificationsEnabled && dueDate) {
      const timeLeft = new Date(dueDate).getTime() - Date.now();
      if (timeLeft > 0) {
        setTimeout(() => {
          new Notification('⏰ Task Due!', { body: task.text });
        }, timeLeft);
      }
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = [...tasks];
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setTasks(reordered);
  };

  const toggleDone = (id) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const removeTask = (id) => setTasks((prev) => prev.filter((t) => t.id !== id));

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortBy === 'status') return a.done - b.done;
    return new Date(a.dueDate || 0) - new Date(b.dueDate || 0);
  });

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 left-6 z-50 bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 focus:outline-none"
      >
        {open ? <FiX size={20} /> : <MdOutlineChecklist size={22} />}
      </button>

      {/* Widget */}
      {open && (
        <div className="fixed bottom-20 left-6 z-40 w-full max-w-sm">
          <div className="backdrop-blur-[15px] bg-[rgba(255,255,255,0.4)] dark:bg-[rgba(30,30,30,0.5)] border border-white/30 dark:border-white/20 rounded-2xl shadow-xl p-4">
            <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-blue-600 dark:text-purple-400 mb-3">📝 My To-Do List</h2>
              <Settings setNotificationsEnabled={setNotificationsEnabled} />
            </div>
            {/* Add Task */}
            <div className="flex flex-col gap-2 mb-4">
              <input
                type="text"
                placeholder="New task..."
                className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white/60 dark:bg-gray-800/60 text-gray-900 dark:text-white placeholder:text-gray-400"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
              <input
                type="datetime-local"
                className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white/60 dark:bg-gray-800/60 text-gray-900 dark:text-white"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
              <button
                onClick={handleAdd}
                className="bg-purple-600 hover:bg-purple-700 text-white py-2 rounded font-semibold"
              >
                Add Task
              </button>
            </div>

            {/* Sort By */}
            <div className="flex justify-between items-center text-sm mb-2">
              <span className="text-gray-700 dark:text-gray-300">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
              >
                <option value="date">Due Date</option>
                <option value="status">Status</option>
              </select>
            </div>

            {/* Task List */}
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="tasks">
                {(provided) => (
                  <ul
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="max-h-64 overflow-y-auto space-y-2 pr-1"
                  >
                    {sortedTasks.map((task, i) => (
                      <Draggable draggableId={task.id} index={i} key={task.id}>
                        {(prov) => (
                          <li
                            ref={prov.innerRef}
                            {...prov.draggableProps}
                            {...prov.dragHandleProps}
                            className="flex justify-between items-start gap-2 bg-white/60 dark:bg-gray-800/60 border border-gray-300 dark:border-gray-700 p-3 rounded-lg"
                          >
                            <label className="flex items-start gap-2 text-gray-800 dark:text-gray-200">
                              <input
                                type="checkbox"
                                checked={task.done}
                                onChange={() => toggleDone(task.id)}
                              />
                              <span className={`${task.done ? 'line-through text-gray-400' : ''}`}>
                                {task.text}
                              </span>
                            </label>
                            <div className="text-right text-xs text-gray-500 dark:text-gray-400">
                              {task.dueDate && (
                                <div>{new Date(task.dueDate).toLocaleString()}</div>
                              )}
                              <button onClick={() => removeTask(task.id)} className="text-red-500 mt-1 text-sm">
                                ❌
                              </button>
                            </div>
                          </li>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      )}
    </>
  );
};

export default TodoWidget;
