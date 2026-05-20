import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import PrivateRoute from './components/PrivateRoute';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import QuizPage from './pages/QuizPage';
import QuizResultPage from './pages/QuizResultPage';
import DSAProblemPage from './pages/DSAProblemPage';
import DSAProblemDetail from './pages/DSAProblemDetail';
import ResumePage from './pages/ResumePage';
import InterviewPage from './pages/InterviewPage';
import InterviewCategoryPage from './pages/InterviewCategoryPage';
import AnalyticsPage from './pages/AnalyticsPage';
import TasksPage from './pages/TasksPage';
import ProfilePage from './pages/ProfilePage';
import { Toaster } from 'react-hot-toast';

const DashboardLayout = () => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 overflow-y-auto min-h-[calc(100vh-80px)]">
                <Outlet />
            </div>
        </div>
    );
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="min-h-screen flex flex-col bg-primary text-white">
                    <Navbar />
                    <Toaster position="top-right" />
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />

                        {/* Protected Dashboard Routes */}
                        <Route path="/" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
                            <Route path="dashboard" element={<DashboardPage />} />
                            <Route path="quiz" element={<QuizPage />} />
                            <Route path="quiz/result" element={<QuizResultPage />} />
                            <Route path="dsa" element={<DSAProblemPage />} />
                            <Route path="dsa/:id" element={<DSAProblemDetail />} />
                            <Route path="resume" element={<ResumePage />} />
                            <Route path="interview" element={<InterviewPage />} />
                            <Route path="interview/:category" element={<InterviewCategoryPage />} />
                            <Route path="analytics" element={<AnalyticsPage />} />
                            <Route path="tasks" element={<TasksPage />} />
                            <Route path="profile" element={<ProfilePage />} />
                        </Route>
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
