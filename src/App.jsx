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
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};


function App() {
  const location = useLocation();
  const hideNavFooter =
    location.pathname === '/login' ||
    location.pathname === '/signup' ||
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
            <Route path="/login/success" element={<LoginSuccess />} />
          </Routes>
        </main>
        {!hideNavFooter && <Footer />}
      </div>
    </AuthProvider>
  );
}

export default App;