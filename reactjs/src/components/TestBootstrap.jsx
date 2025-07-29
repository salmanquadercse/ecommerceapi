import React from 'react';
import { Button, Alert } from 'react-bootstrap';

export default function TestBootstrap() {
  return (
    <div className="p-4">
      <h1>Bootstrap Test</h1>
      <Button variant="primary" className="me-2">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Alert variant="success" className="mt-3">
        Bootstrap is working!
      </Alert>
    </div>
  );
}