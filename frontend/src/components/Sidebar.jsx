import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaTasks, FaClipboardList, FaFileAlt, FaRobot } from 'react-icons/fa';

const Sidebar = () => {
    const links = [
        { name: 'Overview', path: '/dashboard', icon: <FaHome /> },
        { name: 'Aptitude Quiz', path: '/quiz', icon: <FaClipboardList /> },
        { name: 'DSA Tracker', path: '/dsa', icon: <FaTasks /> },
        { name: 'Resume Analyzer', path: '/resume', icon: <FaFileAlt /> },
        { name: 'AI Interview', path: '/interview', icon: <FaRobot /> },
    ];

    return (
        <motion.div 
            initial={{ x: -200 }}
            animate={{ x: 0 }}
            className="w-64 glass min-h-[calc(100vh-80px)] p-6 m-4 rounded-2xl flex flex-col gap-4"
        >
            <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2">Menu</h3>
            {links.map((link) => (
                <NavLink
                    key={link.name}
                    to={link.path}
                    end={link.path === '/dashboard'}
                    className={({ isActive }) => 
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                            isActive 
                            ? 'bg-gradient-to-r from-neonBlue/20 to-neonPurple/20 text-white border border-neonBlue/30 shadow-[0_0_10px_rgba(0,240,255,0.2)]' 
                            : 'text-gray-400 hover:bg-white/5 hover:text-white'
                        }`
                    }
                >
                    <span className="text-xl">{link.icon}</span>
                    <span className="font-medium">{link.name}</span>
                </NavLink>
            ))}
        </motion.div>
    );
};

export default Sidebar;
