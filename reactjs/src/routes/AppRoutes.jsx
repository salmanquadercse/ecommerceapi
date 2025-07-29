// src/routes/AppRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import DashboardPage from '../pages/DashboardPage';
import ProtectedRoute from '../components/ProtectedRoute';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<DashboardPage />} />
      
      {/* <Route element={<ProtectedRoute />}>
        <Route path="/" element={<DashboardPage />} />
      </Route> */}
      
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}