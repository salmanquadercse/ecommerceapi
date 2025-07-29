// src/features/auth/RegisterForm.jsx
import { useForm } from 'react-hook-form';
import { Button, Form, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { register } from './authSlice';

export default function RegisterForm() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);

  const onSubmit = (data) => {
    dispatch(register(data));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          {...register('name', { required: 'Name is required' })}
          isInvalid={!!errors.name}
        />
        <Form.Control.Feedback type="invalid">
          {errors.name?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          {...register('email', { 
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
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
          {...register('password', { 
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters'
            }
          })}
          isInvalid={!!errors.password}
        />
        <Form.Control.Feedback type="invalid">
          {errors.password?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          {...register('confirmPassword', {
            validate: value => 
              value === watch('password') || 'Passwords do not match'
          })}
          isInvalid={!!errors.confirmPassword}
        />
        <Form.Control.Feedback type="invalid">
          {errors.confirmPassword?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Button 
        type="submit" 
        variant="primary" 
        disabled={status === 'loading'}
      >
        {status === 'loading' ? 'Registering...' : 'Register'}
      </Button>
    </Form>
  );
}