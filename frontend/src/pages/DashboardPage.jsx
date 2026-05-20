import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FaTrophy, FaChartLine, FaFire } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import api from '../services/api';

const DashboardPage = () => {
    const { user } = useContext(AuthContext);
    const [dsaCount, setDsaCount] = useState(0);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get('/problems');
                const solvedCount = res.data.filter(p => p.solved).length;
                setDsaCount(solvedCount);
            } catch (err) {
                console.error("Failed to load stats", err);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="p-8">
            <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-3xl font-bold mb-8"
            >
                Welcome back, <span className="neon-text">{user?.name}</span> 👋
            </motion.h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Link to="/analytics">
                    <motion.div whileHover={{ y: -5 }} className="glass-card flex items-center gap-4 border-l-4 border-neonBlue cursor-pointer h-full">
                        <div className="p-4 bg-neonBlue/20 rounded-full text-neonBlue text-2xl">
                            <FaChartLine />
                        </div>
                        <div>
                            <h3 className="text-gray-400">Readiness Score</h3>
                            <p className="text-3xl font-bold text-white">0%</p>
                        </div>
                    </motion.div>
                </Link>
                
                <Link to="/dsa">
                    <motion.div whileHover={{ y: -5 }} className="glass-card flex items-center gap-4 border-l-4 border-neonPurple cursor-pointer h-full">
                        <div className="p-4 bg-neonPurple/20 rounded-full text-neonPurple text-2xl">
                            <FaTrophy />
                        </div>
                        <div>
                            <h3 className="text-gray-400">Problems Solved</h3>
                            <p className="text-3xl font-bold text-white">{dsaCount}</p>
                        </div>
                    </motion.div>
                </Link>
                
                <Link to="/profile">
                    <motion.div whileHover={{ y: -5 }} className="glass-card flex items-center gap-4 border-l-4 border-orange-500 cursor-pointer h-full">
                        <div className="p-4 bg-orange-500/20 rounded-full text-orange-500 text-2xl">
                            <FaFire />
                        </div>
                        <div>
                            <h3 className="text-gray-400">Daily Streak</h3>
                            <p className="text-3xl font-bold text-white">0 Days</p>
                        </div>
                    </motion.div>
                </Link>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="glass-card lg:col-span-2 flex flex-col items-center justify-center text-gray-400 h-72">
                    <FaChartLine className="text-5xl mb-4 opacity-50" />
                    <p className="text-lg">Activity Data Unavailable</p>
                    <p className="text-sm">Complete more quizzes and tasks to generate your activity chart.</p>
                </div>

                <div className="glass-card flex flex-col gap-4">
                    <h3 className="text-xl font-bold mb-2">Quick Links</h3>
                    <Link to="/dsa" className="block p-3 bg-white/5 rounded-lg border border-white/10 hover:border-neonBlue/50 transition-colors cursor-pointer">
                        <p className="font-semibold">Solve DSA Problems</p>
                        <p className="text-sm text-gray-400">DSA Tracker</p>
                    </Link>
                    <Link to="/interview" className="block p-3 bg-white/5 rounded-lg border border-white/10 hover:border-neonBlue/50 transition-colors cursor-pointer">
                        <p className="font-semibold">Take Mock Interview</p>
                        <p className="text-sm text-gray-400">AI Interview</p>
                    </Link>
                    <Link to="/resume" className="block p-3 bg-white/5 rounded-lg border border-white/10 hover:border-neonBlue/50 transition-colors cursor-pointer">
                        <p className="font-semibold">Update Resume</p>
                        <p className="text-sm text-gray-400">Resume Analyzer</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
