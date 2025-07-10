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
import AdminRoutes from './admin/AdminRoutes';
import TodoWidget from './components/Todo';
import StudyLecturePlayer from './components/StudyPage';

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
            <Route path='/lecture' element={<StudyLecturePlayer videoId={"yGH8k5iCoaw"} />} />
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

            {/* Admin panel routes */}
            <Route
              path="/admin/*"
              element={
                <AdminRoute>
                  <AdminLayout>
                    <AdminRoutes />
                  </AdminLayout>
                </AdminRoute>
              }
            />
          </Routes>
        </main>
        {!hideNavFooter && (
          <>
            <TodoWidget />
            <Footer />
          </>
        )}
      </div>
    </AuthProvider>
  );
}

export default App;