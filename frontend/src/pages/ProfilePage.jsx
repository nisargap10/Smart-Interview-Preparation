import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';

const ProfilePage = () => {
    const { user } = useContext(AuthContext);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 max-w-2xl mx-auto"
        >
            <h1 className="text-3xl font-bold mb-8 neon-text">My Profile</h1>
            <div className="glass-card flex flex-col items-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-neonBlue to-neonPurple flex items-center justify-center text-4xl font-bold mb-6 shadow-lg shadow-neonBlue/20">
                    {user?.name?.charAt(0) || 'U'}
                </div>
                <h2 className="text-2xl font-bold mb-2">{user?.name || 'SmartPrep User'}</h2>
                <p className="text-gray-300 mb-6">{user?.email || 'user@example.com'}</p>
                
                <div className="w-full grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-white bg-opacity-5 p-4 rounded-lg text-center">
                        <p className="text-gray-400 text-sm">Account Type</p>
                        <p className="text-lg font-bold text-neonBlue">Premium Student</p>
                    </div>
                    <div className="bg-white bg-opacity-5 p-4 rounded-lg text-center">
                        <p className="text-gray-400 text-sm">Joined Date</p>
                        <p className="text-lg font-bold">Oct 12, 2026</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProfilePage;
