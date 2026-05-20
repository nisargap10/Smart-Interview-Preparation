import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const QuizPage = () => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                // Fetch first 20 questions for the quiz
                const res = await api.get('/questions');
                setQuestions(res.data.slice(0, 20));
            } catch (err) {
                toast.error("Failed to load questions");
            } finally {
                setLoading(false);
            }
        };
        fetchQuestions();
    }, []);

    useEffect(() => {
        if (loading || questions.length === 0) return;
        if (timeLeft <= 0) {
            submitQuiz();
            return;
        }
        const timerId = setInterval(() => setTimeLeft(t => t - 1), 1000);
        return () => clearInterval(timerId);
    }, [timeLeft, loading, questions]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const handleSelectOption = (option) => {
        setAnswers({ ...answers, [currentIdx]: option });
    };

    const submitQuiz = () => {
        let score = 0;
        questions.forEach((q, idx) => {
            if (answers[idx] === q.correctAnswer) score++;
        });
        navigate('/quiz/result', { state: { score, total: questions.length, questions } });
    };

    if (loading) {
        return (
            <div className="p-8 text-center min-h-[60vh] flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-8 bg-gray-700 w-64 rounded mb-4"></div>
                    <div className="h-64 bg-gray-700 w-full max-w-3xl rounded"></div>
                </div>
            </div>
        );
    }

    if (questions.length === 0) {
        return <div className="p-8 text-center text-red-400">No questions found.</div>;
    }

    const currentQ = questions[currentIdx];

    return (
        <div className="p-8 max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold neon-text">Aptitude Quiz</h1>
                    <div className="text-xl font-mono font-bold text-red-400 bg-red-500/10 px-4 py-2 rounded-lg border border-red-500/20">
                        {formatTime(timeLeft)}
                    </div>
                </div>

                <div className="flex justify-between mb-2 text-gray-400 font-medium">
                    <span>Question {currentIdx + 1} of {questions.length}</span>
                    <span className="text-neonBlue">{currentQ.category} | {currentQ.difficulty}</span>
                </div>
                
                <motion.div 
                    key={currentIdx}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="glass-card p-8 mb-6 min-h-[400px] flex flex-col"
                >
                    <h2 className="text-xl lg:text-2xl font-semibold mb-8 text-white">{currentQ.title}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                        {['A', 'B', 'C', 'D'].map((opt) => (
                            <button 
                                key={opt}
                                onClick={() => handleSelectOption(opt)}
                                className={`p-4 text-left border rounded-lg font-medium text-lg transition-all ${
                                    answers[currentIdx] === opt 
                                    ? 'bg-neonBlue/20 border-neonBlue text-neonBlue drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]' 
                                    : 'glass hover:border-white/30 border-white/10 hover:bg-white/5'
                                }`}
                            >
                                <span className="font-bold mr-2">{opt}.</span> {currentQ[`option${opt}`]}
                            </button>
                        ))}
                    </div>
                </motion.div>

                <div className="flex justify-between">
                    <button 
                        disabled={currentIdx === 0}
                        onClick={() => setCurrentIdx(currentIdx - 1)}
                        className={`flex items-center px-6 py-3 rounded-lg font-bold transition-all ${currentIdx === 0 ? 'opacity-50 cursor-not-allowed bg-gray-800' : 'glass hover:bg-white/10'}`}
                    >
                        <FaChevronLeft className="mr-2" /> Previous
                    </button>
                    
                    {currentIdx === questions.length - 1 ? (
                        <button 
                            onClick={submitQuiz}
                            className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-green-400/50 transition-all transform hover:-translate-y-1"
                        >
                            Submit Quiz
                        </button>
                    ) : (
                        <button 
                            onClick={() => setCurrentIdx(currentIdx + 1)}
                            className="flex items-center px-6 py-3 rounded-lg font-bold glass hover:bg-white/10 transition-all"
                        >
                            Next <FaChevronRight className="ml-2" />
                        </button>
                    )}
                </div>
            </div>

            <div className="w-full lg:w-80 shrink-0">
                <div className="glass-card sticky top-8">
                    <h3 className="text-xl font-bold mb-4">Question Palette</h3>
                    <div className="grid grid-cols-5 gap-2 mb-8">
                        {questions.map((_, idx) => {
                            const isAnswered = !!answers[idx];
                            const isCurrent = currentIdx === idx;
                            return (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentIdx(idx)}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                                        isCurrent ? 'ring-2 ring-white ring-offset-2 ring-offset-primary scale-110' : ''
                                    } ${
                                        isAnswered ? 'bg-neonBlue text-black shadow-[0_0_10px_rgba(0,240,255,0.6)]' : 'bg-white/10 text-gray-300 hover:bg-white/20'
                                    }`}
                                >
                                    {idx + 1}
                                </button>
                            );
                        })}
                    </div>

                    <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-neonBlue shadow-[0_0_8px_rgba(0,240,255,0.8)]"></div>
                            <span className="text-gray-300">Answered</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-white/10"></div>
                            <span className="text-gray-300">Not Answered</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizPage;
