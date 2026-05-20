import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import api from '../services/api';
import toast from 'react-hot-toast';

const InterviewCategoryPage = () => {
    const { category } = useParams();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await api.get(`/interview/${category}`);
                setQuestions(response.data);
            } catch (error) {
                toast.error("Failed to load interview questions");
            } finally {
                setLoading(false);
            }
        };
        fetchQuestions();
    }, [category]);

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    if (loading) {
        return <div className="p-8 text-center"><div className="animate-pulse space-y-4 max-w-4xl mx-auto"><div className="h-16 bg-gray-700 w-full rounded"></div><div className="h-16 bg-gray-700 w-full rounded"></div></div></div>;
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 max-w-4xl mx-auto"
        >
            <div className="flex items-center mb-8">
                <button onClick={() => navigate('/interview')} className="text-gray-400 hover:text-white mr-4 transition-colors">
                    <FaArrowLeft className="text-xl" />
                </button>
                <h1 className="text-3xl font-bold neon-text capitalize">{category} Interview Questions</h1>
            </div>

            <div className="space-y-4">
                {questions.length === 0 ? (
                    <div className="text-center text-gray-400">No questions found for this category.</div>
                ) : (
                    questions.map((q) => (
                        <div key={q.id} className="glass-card overflow-hidden transition-all duration-300">
                            <div 
                                className="flex justify-between items-center cursor-pointer"
                                onClick={() => toggleExpand(q.id)}
                            >
                                <div className="flex-1">
                                    <span className={`inline-block px-2 py-1 text-xs rounded mb-2 ${q.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' : q.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                                        {q.difficulty}
                                    </span>
                                    <h3 className="text-lg font-bold text-white">{q.question}</h3>
                                </div>
                                <div className="ml-4 text-neonBlue">
                                    {expandedId === q.id ? <FaChevronUp /> : <FaChevronDown />}
                                </div>
                            </div>

                            <AnimatePresence>
                                {expandedId === q.id && (
                                    <motion.div 
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="mt-4 pt-4 border-t border-white/10"
                                    >
                                        <div className="mb-4">
                                            <h4 className="text-sm text-gray-400 mb-1">Answer</h4>
                                            <p className="text-gray-200 whitespace-pre-wrap leading-relaxed">{q.answer}</p>
                                        </div>
                                        {q.explanation && (
                                            <div className="bg-neonBlue/10 p-4 rounded border border-neonBlue/20">
                                                <h4 className="text-sm font-bold text-neonBlue mb-1">Deep Dive / Explanation</h4>
                                                <p className="text-sm text-blue-100">{q.explanation}</p>
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))
                )}
            </div>
        </motion.div>
    );
};

export default InterviewCategoryPage;
