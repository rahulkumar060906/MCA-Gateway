import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import PageContainer from './components/PageContainer';
import LoginSignup from './pages/LoginSignup';
import Study from './pages/Study';
import Levels from './pages/Levels';
import About from './pages/About';
import ContactPage from './pages/Contact';
import NoticeBoard from './pages/Notice';

function App() {
  const location = useLocation();
  const hideNavFooter = location.pathname === '/login';

  return (
    <div className="app-container min-h-screen flex flex-col bg-white dark:bg-blue-950 transition-colors ">
      {!hideNavFooter && <Navbar />}
      <main className="flex-1 flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/notice" element={<NoticeBoard />} />
          <Route path="/levels" element={<Levels />} />
          <Route path="/study" element={<Study />} />
          <Route path="/login" element={<LoginSignup />} />
        </Routes>
      </main>
      {!hideNavFooter && <Footer />}
    </div>
  );
}

export default App;
