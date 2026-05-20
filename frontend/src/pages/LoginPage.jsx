import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center relative px-4">
            <div className="absolute w-96 h-96 bg-neonBlue opacity-20 blur-[100px] rounded-full top-1/4 left-1/4"></div>
            
            <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="glass-card w-full max-w-md relative z-10 p-8"
            >
                <h2 className="text-3xl font-bold mb-6 text-center neon-text">Welcome Back</h2>
                
                {error && <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-2 rounded mb-4">{error}</div>}
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                        <input 
                            type="email" 
                            className="glass-input w-full" 
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
                        <input 
                            type="password" 
                            className="glass-input w-full" 
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                            <input type="checkbox" className="rounded bg-white/10 border-white/20 text-neonBlue focus:ring-neonBlue" />
                            Remember me
                        </label>
                        <a href="#" className="text-neonBlue hover:text-cyan-300">Forgot password?</a>
                    </div>
                    <button type="submit" className="glass-button w-full mt-4 py-3">Sign In</button>
                </form>
                
                <p className="mt-6 text-center text-gray-400 text-sm">
                    Don't have an account? <Link to="/register" className="text-neonPurple hover:text-purple-300 font-medium">Create one</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default LoginPage;
