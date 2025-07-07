import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import LoginSuccess from './pages/LoginSuccess';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import Study from './pages/Study';
import Levels from './pages/Levels';
import About from './pages/About';
import ContactPage from './pages/Contact';
import NoticeBoard from './pages/Notice';
import Dashboard from './pages/Dashboard';
import LectureViewPage from './pages/LectureViewPage';
import NotesPage from './pages/NotesPage';
import NimcetTestPage from './pages/NimcetTestPage';
import LeaderboardPage from './pages/LeaderboardPage';
import AdminLayout from './admin/components/AdminLayout';
import AdminRoute from './admin/components/AdminRoute';
import AdminDashboard from './admin/pages/AdminDashboard';
import UserManagement from './admin/pages/UserManagement';
import TestManagement from './admin/pages/TestManagement';
import LeaderboardAnalytics from './admin/pages/LeaderboardAnalytics';
import FeedbackPage from './admin/pages/FeedbackPage';
import AdminSettings from './admin/pages/AdminSettings';
import TodoWidget from './components/Todo';

// AuthContext for global authentication state
const AuthContext = React.createContext();

const getToken = () => localStorage.getItem('token');

export const useAuth = () => React.useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsLoggedIn(true);
      // Optionally fetch user profile here
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// PrivateRoute component for protecting routes
const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/" replace />;
};


function App() {
  const location = useLocation();
  const hideNavFooter =
    location.pathname === '/test';
  

  
  return (
    <AuthProvider>
      <div className="app-container min-h-screen flex flex-col bg-white dark:bg-blue-950 transition-colors ">
        {!hideNavFooter && <Navbar />}
        <main className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/notice" element={<NoticeBoard />} />
            <Route
              path="/levels"
              element={
                <PrivateRoute>
                  <Levels />
                </PrivateRoute>
              }
            />
            <Route
              path="/study"
              element={
                <PrivateRoute>
                  <Study />
                </PrivateRoute>
              }
            />
            <Route
              path="/lecture"
              element={
                <PrivateRoute>
                  <LectureViewPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/notes"
              element={
                <PrivateRoute>
                  <NotesPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/test"
              element={
                <PrivateRoute>
                  <NimcetTestPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/leaderboard"
              element={
                <PrivateRoute>
                  <LeaderboardPage />
                </PrivateRoute>
              }
            />
            <Route path="/login/success" element={<LoginSuccess />} />

            {/* Admin panel routes - nested under /admin/* */}
            <Route
              path="/admin/*"
              element={
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="tests" element={<TestManagement />} />
              <Route path="leaderboard" element={<LeaderboardAnalytics />} />
              <Route path="feedback" element={<FeedbackPage />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Routes>
        </main>
        {!hideNavFooter && (
          <>
            
            <TodoWidget />
          </>
        )}
        {!hideNavFooter && <Footer />}
      </div>
    </AuthProvider>
  );
}

export default App;