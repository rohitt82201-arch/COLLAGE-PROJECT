// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    // Agar token nahi hai, toh home page par bhej do
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;

// ye check karega ki user ke paas login token hai ya nahi.