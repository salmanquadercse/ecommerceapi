// src/pages/RegisterPage.jsx
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import RegisterForm from '../features/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: '400px' }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Register</Card.Title>
          <RegisterForm />
          <div className="mt-3 text-center">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}