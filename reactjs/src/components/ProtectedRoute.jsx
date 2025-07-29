// src/components/ProtectedRoute.jsx
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ roles }) {
  const { user, token } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles && !roles.some(role => user?.roles?.includes(role))) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}