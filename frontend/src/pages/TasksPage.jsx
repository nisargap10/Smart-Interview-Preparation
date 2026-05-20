import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaRegCircle } from 'react-icons/fa';

const TasksPage = () => {
    // Currently no backend API for tasks, so starting with an empty real state.
    const [tasks, setTasks] = useState([]);

    const toggleTask = (id) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 max-w-4xl mx-auto"
        >
            <h1 className="text-3xl font-bold mb-8 neon-text">Upcoming Tasks</h1>
            
            {tasks.length === 0 ? (
                <div className="glass-card p-8 text-center text-gray-400">
                    <p className="text-xl mb-2">🎉 You're all caught up!</p>
                    <p className="text-sm">No pending tasks for today. Start practicing DSA or take a Quiz!</p>
                </div>
            ) : (
                <div className="glass-card space-y-4">
                    {tasks.map(task => (
                        <div 
                            key={task.id} 
                            className="flex items-center justify-between p-4 bg-white bg-opacity-5 rounded-lg cursor-pointer hover:bg-opacity-10 transition-colors"
                            onClick={() => toggleTask(task.id)}
                        >
                            <span className={`text-lg ${task.completed ? 'line-through text-gray-400' : 'text-white'}`}>
                                {task.title}
                            </span>
                            {task.completed ? <FaCheckCircle className="text-green-400 text-xl" /> : <FaRegCircle className="text-gray-400 text-xl" />}
                        </div>
                    ))}
                </div>
            )}
        </motion.div>
    );
};

export default TasksPage;
