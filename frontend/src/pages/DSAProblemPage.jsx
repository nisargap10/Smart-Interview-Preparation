import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaCheckCircle, FaRegCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';

const DSAProblemPage = () => {
    const navigate = useNavigate();
    const [problems, setProblems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const res = await api.get('/problems');
                setProblems(res.data);
            } catch (error) {
                toast.error("Failed to load problems");
            } finally {
                setLoading(false);
            }
        };
        fetchProblems();
    }, []);

    const toggleSolve = async (e, id, currentSolved) => {
        e.stopPropagation();
        try {
            const problem = problems.find(p => p.id === id);
            await api.put(`/problems/${id}`, { ...problem, solved: !currentSolved });
            setProblems(problems.map(p => p.id === id ? { ...p, solved: !p.solved } : p));
            toast.success(!currentSolved ? "Marked as solved!" : "Marked as unsolved");
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    const filtered = problems.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold neon-text">DSA Tracker</h1>
                <button className="glass-button">Add Problem</button>
            </div>
            
            <div className="glass-card mb-8">
                <div className="flex gap-4 mb-6">
                    <div className="flex-1 relative">
                        <FaSearch className="absolute left-4 top-3.5 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Search problems..." 
                            className="glass-input w-full pl-10 py-3"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="space-y-4">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="animate-pulse h-12 bg-gray-700/50 rounded w-full"></div>
                            ))}
                        </div>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/10 text-gray-400 text-sm tracking-wider uppercase">
                                    <th className="py-4 px-4 font-semibold">Status</th>
                                    <th className="py-4 px-4 font-semibold">Title</th>
                                    <th className="py-4 px-4 font-semibold">Difficulty</th>
                                    <th className="py-4 px-4 font-semibold">Topic</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((prob, idx) => (
                                    <motion.tr 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        key={prob.id} 
                                        onClick={() => navigate(`/dsa/${prob.id}`)}
                                        className="border-b border-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                                    >
                                        <td className="py-4 px-4">
                                            <button 
                                                onClick={(e) => toggleSolve(e, prob.id, prob.solved)} 
                                                className="text-xl transition-transform hover:scale-110 cursor-pointer"
                                            >
                                                {prob.solved ? <FaCheckCircle className="text-neonBlue drop-shadow-[0_0_5px_rgba(0,240,255,0.8)]" /> : <FaRegCircle className="text-gray-500" />}
                                            </button>
                                        </td>
                                        <td className={`py-4 px-4 font-medium ${prob.solved ? 'text-gray-300 line-through' : 'text-white'}`}>
                                            {prob.title}
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                                prob.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 
                                                prob.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' : 
                                                'bg-red-500/20 text-red-400 border border-red-500/30'
                                            }`}>
                                                {prob.difficulty}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-gray-400 text-sm">{prob.topic}</td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DSAProblemPage;
