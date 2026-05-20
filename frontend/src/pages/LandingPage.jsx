import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCode, FaBrain, FaFileAlt, FaChartLine } from 'react-icons/fa';

const LandingPage = () => {
    const features = [
        { title: "AI Interview Prep", desc: "Practice with AI-generated questions tailored to your tech stack.", icon: <FaBrain /> },
        { title: "DSA Tracker", desc: "Track your problem-solving progress with difficulty tags and heatmaps.", icon: <FaCode /> },
        { title: "Resume Analyzer", desc: "Get an instant ATS score and keyword matching for your resume.", icon: <FaFileAlt /> },
        { title: "Aptitude Tests", desc: "Sharpen your cognitive skills with timed aptitude and logical reasoning quizzes.", icon: <FaChartLine /> }
    ];

    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden">
            {/* Background Blob Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-neonPurple opacity-20 blur-[120px] animate-blob"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-neonBlue opacity-20 blur-[120px] animate-blob" style={{ animationDelay: '2s' }}></div>
            
            <main className="flex-1 flex flex-col items-center justify-center text-center px-4 relative z-10 pt-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl"
                >
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
                        Master Your Next Interview with <br />
                        <span className="neon-text">AI-Powered Precision</span>
                    </h1>
                    <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                        An ultra-modern, all-in-one platform to track your DSA progress, test your aptitude, analyze your resume, and simulate technical interviews.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Link to="/register" className="glass-button text-lg px-8 py-3">Start Free Trial</Link>
                        <Link to="/login" className="glass px-8 py-3 rounded-lg font-bold hover:bg-white/10 transition-all">Login</Link>
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl w-full"
                >
                    {features.map((f, i) => (
                        <motion.div 
                            key={i}
                            whileHover={{ y: -10 }}
                            className="glass-card flex flex-col items-center text-center"
                        >
                            <div className="text-4xl mb-4 text-neonBlue drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]">
                                {f.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                            <p className="text-gray-400">{f.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </main>
        </div>
    );
};

export default LandingPage;
