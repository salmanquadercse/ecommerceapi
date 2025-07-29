import { useForm } from 'react-hook-form';
import { Button, Form } from 'react-bootstrap';

export default function UserForm({ onSubmit, initialData }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || {}
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
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

      <Button type="submit" variant="primary">
        Save
      </Button>
    </Form>
  );
}