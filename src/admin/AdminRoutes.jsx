import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const res = await axios.get('/api/admin/verify', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setIsAdmin(res.data?.isAdmin);
      } catch {
        setIsAdmin(false);
      }
      setLoading(false);
    };
    verifyAdmin();
  }, []);

  if (loading) return <div className="p-10 text-center">Checking Admin Access...</div>;
  if (!isAdmin) return <Navigate to="/" replace />;
  return children;
}
