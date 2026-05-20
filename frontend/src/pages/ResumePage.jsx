import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCloudUploadAlt, FaFilePdf, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const ResumePage = () => {
    const [file, setFile] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState(null);

    const handleUpload = (e) => {
        const uploadedFile = e.target.files[0];
        if (uploadedFile) {
            setFile(uploadedFile);
            setAnalyzing(true);
            
            // Simulate API call
            setTimeout(() => {
                setAnalyzing(false);
                setResult({
                    score: 82,
                    keywordsFound: ['Java', 'React', 'Spring Boot', 'REST APIs', 'SQL'],
                    missingKeywords: ['Docker', 'AWS', 'Microservices'],
                    suggestions: [
                        "Quantify your achievements with numbers (e.g., 'Improved performance by 20%').",
                        "Include links to your GitHub and LinkedIn profiles.",
                        "Add more action verbs to start your bullet points."
                    ]
                });
            }, 3000);
        }
    };

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 neon-text">Resume Analyzer</h1>
            <p className="text-gray-400 mb-8">Upload your resume to get an instant ATS score and AI-driven feedback.</p>

            {!result ? (
                <div className="glass-card flex flex-col items-center justify-center p-16 border-dashed border-2 border-neonBlue/30 hover:border-neonBlue transition-colors bg-gradient-to-b from-transparent to-neonBlue/5 relative">
                    <input 
                        type="file" 
                        accept=".pdf" 
                        onChange={handleUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                        disabled={analyzing}
                    />
                    
                    {analyzing ? (
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 border-4 border-neonBlue border-t-transparent rounded-full animate-spin mb-4"></div>
                            <h3 className="text-xl font-bold text-neonBlue animate-pulse">Analyzing Resume with AI...</h3>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center text-center">
                            <FaCloudUploadAlt className="text-6xl text-neonBlue mb-4 drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]" />
                            <h3 className="text-2xl font-bold mb-2">Drag & Drop your PDF</h3>
                            <p className="text-gray-400">or click to browse from your computer</p>
                        </div>
                    )}
                </div>
            ) : (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass-card md:col-span-1 flex flex-col items-center text-center">
                        <FaFilePdf className="text-5xl text-red-500 mb-4" />
                        <h3 className="font-bold mb-6 text-lg">{file?.name}</h3>
                        
                        <div className="relative w-40 h-40 flex items-center justify-center mb-4">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-700" />
                                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={440} strokeDashoffset={440 - (440 * result.score) / 100} className="text-neonBlue transition-all duration-1000 ease-out" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-4xl font-bold neon-text">{result.score}</span>
                                <span className="text-xs text-gray-400">ATS Score</span>
                            </div>
                        </div>
                        <p className="text-green-400 font-medium">Good fit for Junior Developer</p>
                    </div>

                    <div className="md:col-span-2 flex flex-col gap-6">
                        <div className="glass-card">
                            <h3 className="text-xl font-bold mb-4 border-b border-white/10 pb-2">Analysis Breakdown</h3>
                            
                            <div className="mb-4">
                                <h4 className="text-gray-400 mb-2 font-medium">Keywords Found</h4>
                                <div className="flex flex-wrap gap-2">
                                    {result.keywordsFound.map((k, i) => (
                                        <span key={i} className="px-3 py-1 bg-green-500/20 text-green-400 rounded border border-green-500/30 flex items-center gap-1 text-sm">
                                            <FaCheckCircle /> {k}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            
                            <div>
                                <h4 className="text-gray-400 mb-2 font-medium">Missing Keywords (Suggested)</h4>
                                <div className="flex flex-wrap gap-2">
                                    {result.missingKeywords.map((k, i) => (
                                        <span key={i} className="px-3 py-1 bg-red-500/20 text-red-400 rounded border border-red-500/30 flex items-center gap-1 text-sm">
                                            <FaExclamationTriangle /> {k}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="glass-card">
                            <h3 className="text-xl font-bold mb-4 border-b border-white/10 pb-2">Actionable Suggestions</h3>
                            <ul className="space-y-3">
                                {result.suggestions.map((s, i) => (
                                    <li key={i} className="flex gap-3 text-gray-300">
                                        <div className="mt-1 w-2 h-2 bg-neonPurple rounded-full shadow-[0_0_8px_#8A2BE2] shrink-0"></div>
                                        <p>{s}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        <button onClick={() => {setResult(null); setFile(null);}} className="glass-button self-start">Analyze Another Resume</button>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default ResumePage;
