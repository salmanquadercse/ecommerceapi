// src/pages/LoginPage.jsx
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoginForm from '../features/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: '400px' }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Login</Card.Title>
          <LoginForm />
          <div className="mt-3 text-center">
            Don't have an account? <Link to="/register">Register</Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}