import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

const QuizResultPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { score = 0, total = 0, questions = [] } = location.state || {};

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 max-w-4xl mx-auto"
        >
            <div className="glass-card text-center mb-8">
                <h1 className="text-4xl font-bold mb-4 neon-text">Quiz Completed!</h1>
                <p className="text-2xl mb-2">You scored</p>
                <div className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-6">
                    {score} / {total}
                </div>
                <button onClick={() => navigate('/dashboard')} className="glass-button">Back to Dashboard</button>
            </div>

            {questions.length > 0 && (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold mb-4">Detailed Analysis</h2>
                    {questions.map((q, index) => (
                        <div key={q.id || index} className="glass-card text-left">
                            <p className="font-semibold text-lg mb-2">Q{index + 1}: {q.title}</p>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className={`p-2 rounded ${q.correctAnswer === 'A' ? 'bg-green-500/20 border border-green-500' : 'bg-white/5'}`}>A: {q.optionA}</div>
                                <div className={`p-2 rounded ${q.correctAnswer === 'B' ? 'bg-green-500/20 border border-green-500' : 'bg-white/5'}`}>B: {q.optionB}</div>
                                <div className={`p-2 rounded ${q.correctAnswer === 'C' ? 'bg-green-500/20 border border-green-500' : 'bg-white/5'}`}>C: {q.optionC}</div>
                                <div className={`p-2 rounded ${q.correctAnswer === 'D' ? 'bg-green-500/20 border border-green-500' : 'bg-white/5'}`}>D: {q.optionD}</div>
                            </div>
                            <div className="bg-neonBlue/10 p-4 rounded-lg border border-neonBlue/30">
                                <span className="font-bold text-neonBlue">Explanation: </span>
                                {q.explanation || "No explanation provided for this question."}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </motion.div>
    );
};

export default QuizResultPage;
