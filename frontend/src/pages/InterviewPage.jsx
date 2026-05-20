import React from 'react';
import { motion } from 'framer-motion';
import { FaJava, FaDatabase, FaServer, FaNetworkWired, FaUserTie } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const InterviewPage = () => {
    const navigate = useNavigate();

    const categories = [
        { id: 'Java', name: 'Java Technical', icon: <FaJava />, desc: 'Core Java, Spring Boot, Multithreading' },
        { id: 'DBMS', name: 'DBMS & SQL', icon: <FaDatabase />, desc: 'Normalization, ACID, Transactions' },
        { id: 'OS', name: 'Operating Systems', icon: <FaServer />, desc: 'Processes, Memory, Deadlocks' },
        { id: 'CN', name: 'Computer Networks', icon: <FaNetworkWired />, desc: 'OSI Model, TCP/IP, Routing' },
        { id: 'HR', name: 'HR / Behavioral', icon: <FaUserTie />, desc: 'Leadership, Conflict, Weaknesses' },
    ];

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 neon-text">AI Interview Practice</h1>
            
            <p className="text-gray-400 mb-8 text-lg">Select a category to start practicing technical and behavioral questions.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((cat, i) => (
                    <motion.div 
                        key={cat.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        onClick={() => navigate(`/interview/${cat.id}`)}
                        className="glass-card hover:border-neonBlue cursor-pointer group flex flex-col items-center text-center p-8 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,240,255,0.2)]"
                    >
                        <div className="text-5xl mb-4 text-gray-500 group-hover:text-neonBlue transition-colors drop-shadow-[0_0_8px_currentColor]">
                            {cat.icon}
                        </div>
                        <h3 className="text-xl font-bold mb-2">{cat.name}</h3>
                        <p className="text-gray-400 text-sm">{cat.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default InterviewPage;
