// src/features/auth/LoginForm.jsx
import { useForm } from 'react-hook-form';
import { Button, Form, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './authSlice';

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);

  const onSubmit = (data) => {
    dispatch(login(data));
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          {...register('email', { required: 'Email is required' })}
          isInvalid={!!errors.email}
        />
        <Form.Control.Feedback type="invalid">
          {errors.email?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          {...register('password', { required: 'Password is required' })}
          isInvalid={!!errors.password}
        />
        <Form.Control.Feedback type="invalid">
          {errors.password?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Button 
        type="submit" 
        variant="primary" 
        disabled={status === 'loading'}
      >
        {status === 'loading' ? 'Logging in...' : 'Login'}
      </Button>
    </Form>
  );
}