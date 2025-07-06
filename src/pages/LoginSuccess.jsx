import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../App';

const LoginSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        const user = {
            fullName: params.get('fullName'),
            userName: params.get('userName'),
            email: params.get('email'),
            phone: params.get('phone'),
        };
        if (token) {
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            login(user, token); // <-- update context immediately
            navigate('/dashboard');
        } else {
            navigate('/');
        }
    }, [location, navigate, login]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-lg text-blue-600 font-semibold">Logging you in with Google...</div>
        </div>
    );
};

export default LoginSuccess;
