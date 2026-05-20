import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaCheckCircle, FaYoutube, FaCode } from 'react-icons/fa';
import api from '../services/api';
import toast from 'react-hot-toast';

const DSAProblemDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [problem, setProblem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const response = await api.get(`/problems/${id}`);
                setProblem(response.data);
            } catch (error) {
                toast.error("Failed to load problem details");
            } finally {
                setLoading(false);
            }
        };
        fetchProblem();
    }, [id]);

    const handleMarkSolved = async () => {
        try {
            await api.put(`/problems/${id}`, { ...problem, solved: !problem.solved });
            setProblem({ ...problem, solved: !problem.solved });
            toast.success(problem.solved ? "Marked as unsolved" : "Marked as solved!");
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    if (loading) {
        return <div className="p-8 text-center"><div className="animate-pulse flex flex-col items-center"><div className="h-8 bg-gray-700 w-1/3 rounded mb-4"></div><div className="h-32 bg-gray-700 w-full rounded"></div></div></div>;
    }

    if (!problem) return <div className="p-8 text-center text-red-400">Problem not found.</div>;

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 max-w-5xl mx-auto"
        >
            <button onClick={() => navigate('/dsa')} className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors">
                <FaArrowLeft className="mr-2" /> Back to Tracker
            </button>

            <div className="flex justify-between items-start mb-6">
                <div>
                    <h1 className="text-3xl font-bold mb-2 neon-text">{problem.title}</h1>
                    <div className="flex gap-2 text-sm">
                        <span className={`px-2 py-1 rounded ${problem.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400 border border-green-500/50' : problem.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50' : 'bg-red-500/20 text-red-400 border border-red-500/50'}`}>
                            {problem.difficulty}
                        </span>
                        <span className="px-2 py-1 rounded bg-blue-500/20 text-blue-400 border border-blue-500/50">{problem.topic}</span>
                    </div>
                </div>
                <button 
                    onClick={handleMarkSolved}
                    className={`flex items-center px-4 py-2 rounded-lg font-bold transition-all ${problem.solved ? 'bg-green-500/20 text-green-400 border border-green-500' : 'glass hover:bg-white/10'}`}
                >
                    <FaCheckCircle className="mr-2" /> {problem.solved ? 'Solved' : 'Mark as Solved'}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="glass-card">
                        <h2 className="text-xl font-bold mb-4">Description</h2>
                        <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{problem.description}</p>
                    </div>

                    <div className="glass-card">
                        <h2 className="text-xl font-bold mb-4">Examples</h2>
                        <pre className="bg-primary/50 p-4 rounded text-gray-300 whitespace-pre-wrap font-mono text-sm border border-white/10">
                            {problem.examples}
                        </pre>
                    </div>

                    <div className="glass-card">
                        <h2 className="text-xl font-bold mb-4">Constraints</h2>
                        <pre className="bg-primary/50 p-4 rounded text-gray-300 whitespace-pre-wrap font-mono text-sm border border-white/10">
                            {problem.constraints}
                        </pre>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="glass-card">
                        <h2 className="text-xl font-bold mb-4">Resources</h2>
                        <a href={problem.youtubeLink} target="_blank" rel="noreferrer" className="flex items-center w-full p-3 mb-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded transition-colors">
                            <FaYoutube className="mr-3 text-xl" /> Watch Tutorial
                        </a>
                        <a href={problem.leetcodeLink} target="_blank" rel="noreferrer" className="flex items-center w-full p-3 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded transition-colors">
                            <FaCode className="mr-3 text-xl" /> Solve on LeetCode
                        </a>
                    </div>
                    
                    <div className="glass-card">
                        <h2 className="text-xl font-bold mb-4">Tags</h2>
                        <div className="flex flex-wrap gap-2">
                            {problem.tags?.split(',').map((tag, i) => (
                                <span key={i} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-400">#{tag.trim()}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default DSAProblemDetail;
