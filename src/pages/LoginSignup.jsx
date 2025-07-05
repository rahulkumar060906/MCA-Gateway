import React, { useState, useEffect, useRef } from 'react';
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import examImg from '../assets/loginPage.png';
import { signupUser, loginUser, resetPassword } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const LoginSignup = ({ onClose }) => {
  const [view, setView] = useState('login');
  const [loginTab, setLoginTab] = useState('username');
  const [form, setForm] = useState({
    identifier: '',
    password: '',
    fullName: '',
    userName: '',
    phone: '',
    email: '',
    passwordSignup: '',
    confirmPassword: '',
    resetEmail: '',
  });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showSignupConfirm, setShowSignupConfirm] = useState(false);
  const navigate = useNavigate();
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose?.();
      }
    };
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      if (view === 'login') {
        const res = await loginUser({
          identifier: form.identifier,
          password: form.password,
        });
        if (res.token) {
          localStorage.setItem('token', res.token);
          navigate('/dashboard');
          onClose?.();
        } else {
          setError(res.message || 'Login failed');
        }
      } else if (view === 'signup') {
        const res = await signupUser({
          fullName: form.fullName,
          userName: form.userName,
          phone: form.phone,
          email: form.email,
          password: form.passwordSignup,
          confirmPassword: form.confirmPassword,
        });
        if (res.success || res.message?.includes('success')) {
          setSuccess('Signup successful! You can now login.');
          setView('login');
        } else {
          setError(res.message || 'Signup failed');
        }
      } else if (view === 'reset') {
        const res = await resetPassword(form.resetEmail);
        if (res.success) {
          setSuccess('Password reset link sent to your email.');
          setView('login');
        } else {
          setError(res.message || 'Failed to send reset link');
        }
      }
    } catch (err) {
      setError('Something went wrong.');
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      window.location.href = `${import.meta.env.VITE_API_URl}/auth/google`;
    } catch (error) {
      setError('Google login failed.');
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <AnimatePresence>
        <motion.div
          ref={modalRef}
          key="modal"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-5xl bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden"
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-2xl z-10"
          >
            ×
          </button>

          <div className="flex flex-col md:flex-row h-full">
            <div className="hidden md:block w-1/2 h-full">
              <motion.img
                src={examImg}
                alt="Exam"
                className="w-full h-full object-cover rounded-l-2xl"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              />
            </div>

            <div className="w-full md:w-1/2 p-6 overflow-y-auto max-h-[90vh] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.form
                  key={view}
                  onSubmit={handleSubmit}
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -100, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {(view === 'login' || view === 'signup') && (
                    <button
                      type="button"
                      onClick={handleGoogleLogin}
                      disabled={googleLoading}
                      className="w-full flex items-center justify-center gap-2 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium text-gray-700 dark:text-gray-200 shadow-sm disabled:opacity-50"
                    >
                      {googleLoading ? (
                        <svg className="animate-spin h-5 w-5 text-gray-500" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                      ) : (
                        <><FaGoogle className="text-lg" /> Continue with Google</>
                      )}
                    </button>
                  )}

                  {view === 'login' && (
                    <>
                      <div className="flex gap-2 mb-2">
                        {['username', 'email', 'phone'].map((tab) => (
                          <button
                            key={tab}
                            onClick={() => setLoginTab(tab)}
                            type="button"
                            className={`flex-1 py-1.5 rounded-md text-sm font-medium ${
                              loginTab === tab
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                          </button>
                        ))}
                      </div>
                      <input
                        type={loginTab === 'email' ? 'email' : 'text'}
                        name="identifier"
                        value={form.identifier}
                        onChange={handleChange}
                        placeholder={`Enter your ${loginTab}`}
                        className="w-full px-4 py-2 border rounded-lg dark:border-gray-700 dark:bg-gray-400"
                      />
                      <div className="relative">
                        <input
                          type={showLoginPassword ? 'text' : 'password'}
                          name="password"
                          value={form.password}
                          onChange={handleChange}
                          placeholder="Password"
                          className="w-full px-4 py-2 border rounded-lg pr-10 dark:border-gray-700 dark:bg-gray-400"
                        />
                        <span
                          onClick={() => setShowLoginPassword((v) => !v)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                        >
                          {showLoginPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      </div>
                      <p
                        onClick={() => setView('reset')}
                        className="text-sm text-blue-600 hover:underline cursor-pointer text-right"
                      >
                        Forgot password?
                      </p>
                    </>
                  )}

                  {view === 'signup' && (
                    <>
                      {['fullName', 'userName', 'phone', 'email'].map((field) => (
                        <input
                          key={field}
                          type={field === 'email' ? 'email' : 'text'}
                          name={field}
                          value={form[field]}
                          onChange={handleChange}
                          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                          className="w-full px-4 py-2 border dark:border-gray-700 dark:bg-gray-400 rounded-lg"
                        />
                      ))}
                      {['passwordSignup', 'confirmPassword'].map((field, idx) => (
                        <div key={field} className="relative">
                          <input
                            type={(field === 'passwordSignup' ? showSignupPassword : showSignupConfirm) ? 'text' : 'password'}
                            name={field}
                            value={form[field]}
                            onChange={handleChange}
                            placeholder={idx === 0 ? 'Password' : 'Confirm Password'}
                            className="w-full px-4 py-2 border rounded-lg pr-10 dark:border-gray-700 dark:bg-gray-400"
                          />
                          <span
                            onClick={() => field === 'passwordSignup' ? setShowSignupPassword((v) => !v) : setShowSignupConfirm((v) => !v)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                          >
                            {(field === 'passwordSignup' ? showSignupPassword : showSignupConfirm) ? <FaEyeSlash /> : <FaEye />}
                          </span>
                        </div>
                      ))}
                    </>
                  )}

                  {view === 'reset' && (
                    <>
                      <input
                        type="email"
                        name="resetEmail"
                        value={form.resetEmail}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                      <p
                        onClick={() => setView('login')}
                        className="text-sm text-blue-600 hover:underline cursor-pointer"
                      >
                        Remembered? Go back to login
                      </p>
                    </>
                  )}

                  {error && <div className="text-red-500 text-sm">{error}</div>}
                  {success && <div className="text-green-500 text-sm">{success}</div>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                  >
                    {loading ? 'Please wait...' : view === 'login' ? 'Login' : view === 'signup' ? 'Sign Up' : 'Send Reset Link'}
                  </button>

                  <p className="text-sm text-center mt-3 dark:text-blue-300">
                    {view === 'login' && (
                      <>Don’t have an account? <span onClick={() => setView('signup')} className="text-blue-600 hover:underline cursor-pointer dark:text-cyan-500">Sign up</span></>
                    )}
                    {view === 'signup' && (
                      <>Already have an account? <span onClick={() => setView('login')} className="text-blue-600 hover:underline cursor-pointer dark:text-cyan-500">Login</span></>
                    )}
                  </p>
                </motion.form>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default LoginSignup;
