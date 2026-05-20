import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const data = [
  { name: 'Mon', score: 65, solved: 2 },
  { name: 'Tue', score: 70, solved: 5 },
  { name: 'Wed', score: 68, solved: 3 },
  { name: 'Thu', score: 85, solved: 8 },
  { name: 'Fri', score: 90, solved: 12 },
  { name: 'Sat', score: 88, solved: 4 },
  { name: 'Sun', score: 95, solved: 15 },
];

const AnalyticsPage = () => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 max-w-6xl mx-auto"
        >
            <h1 className="text-3xl font-bold mb-8 neon-text">Your Performance Analytics</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Readiness Trend */}
                <div className="glass-card">
                    <h2 className="text-xl font-bold mb-4">Readiness Trend</h2>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#00F0FF" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#00F0FF" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" stroke="#cbd5e1" />
                                <YAxis stroke="#cbd5e1" />
                                <Tooltip contentStyle={{ backgroundColor: '#1A1A2E', borderColor: '#00F0FF' }} />
                                <Area type="monotone" dataKey="score" stroke="#00F0FF" fillOpacity={1} fill="url(#colorScore)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Problems Solved */}
                <div className="glass-card">
                    <h2 className="text-xl font-bold mb-4">Problems Solved (This Week)</h2>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="name" stroke="#cbd5e1" />
                                <YAxis stroke="#cbd5e1" />
                                <Tooltip contentStyle={{ backgroundColor: '#1A1A2E', borderColor: '#8A2BE2' }} />
                                <Bar dataKey="solved" fill="#8A2BE2" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default AnalyticsPage;
