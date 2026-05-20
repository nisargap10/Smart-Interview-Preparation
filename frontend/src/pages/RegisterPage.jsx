import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(name, email, password);
            navigate('/dashboard');
        } catch (err) {
            setError('Registration failed. Email might already exist.');
        }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center relative px-4">
            <div className="absolute w-96 h-96 bg-neonPurple opacity-20 blur-[100px] rounded-full bottom-1/4 right-1/4"></div>
            
            <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="glass-card w-full max-w-md relative z-10 p-8"
            >
                <h2 className="text-3xl font-bold mb-6 text-center neon-text">Create Account</h2>
                
                {error && <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-2 rounded mb-4">{error}</div>}
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                        <input 
                            type="text" 
                            className="glass-input w-full" 
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
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
                            minLength="6"
                        />
                    </div>
                    <button type="submit" className="glass-button w-full mt-4 py-3">Sign Up</button>
                </form>
                
                <p className="mt-6 text-center text-gray-400 text-sm">
                    Already have an account? <Link to="/login" className="text-neonBlue hover:text-cyan-300 font-medium">Sign in</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default RegisterPage;
