import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FaUserCircle, FaSignOutAlt, FaBrain } from 'react-icons/fa';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <motion.nav 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="glass sticky top-0 z-50 px-6 py-4 flex justify-between items-center"
        >
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold neon-text">
                <FaBrain className="text-neonBlue" />
                SmartPrep
            </Link>

            <div className="flex items-center gap-6">
                {user ? (
                    <>
                        <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors">Dashboard</Link>
                        <div className="flex items-center gap-4 border-l border-white/20 pl-6">
                            <div className="flex items-center gap-2">
                                <FaUserCircle className="text-xl text-neonPurple" />
                                <span className="font-medium">{user.name}</span>
                            </div>
                            <button 
                                onClick={handleLogout}
                                className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
                            >
                                <FaSignOutAlt /> Logout
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="text-gray-300 hover:text-white font-medium transition-colors">Login</Link>
                        <Link to="/register" className="glass-button">Get Started</Link>
                    </>
                )}
            </div>
        </motion.nav>
    );
};

export default Navbar;
