// src/components/layout/MainLayout.jsx
import { useState } from 'react';
import { Container, Navbar, Offcanvas, Button } from 'react-bootstrap';
//import { List, FaTimes } from 'react-icons/fa';
import Sidebar from './Sidebar';
import { useTheme } from '../../hooks/useTheme';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';

export default function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { mode } = useTheme();

  return (
    <div className="d-flex vh-100" data-bs-theme={mode}>
      {/* Desktop Sidebar */}
      <div className={`d-none d-lg-block ${sidebarCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`}>
        <Sidebar 
          collapsed={sidebarCollapsed} 
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      <div className="flex-grow-1 overflow-auto">
        <Navbar bg={mode === 'dark' ? 'dark' : 'light'} expand="lg" className="shadow-sm">
          <Container fluid>
            <Button 
              variant={mode === 'dark' ? 'outline-light' : 'outline-dark'} 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="me-2 d-lg-none"
            >
              {/* {sidebarOpen ? <FaTimes /> : <List />} */}
            </Button>
            <Navbar.Brand className={mode === 'dark' ? 'text-light' : 'text-dark'}>
              Admin Panel
            </Navbar.Brand>
            <div className="ms-auto d-flex align-items-center">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </Container>
        </Navbar>

        <main className="p-3">
          {children}
        </main>
      </div>

      {/* Mobile Sidebar */}
      <Offcanvas 
        show={sidebarOpen} 
        onHide={() => setSidebarOpen(false)} 
        className="d-lg-none"
        data-bs-theme={mode}
      >
        <Offcanvas.Header closeButton className={mode === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'}>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-0">
          <Sidebar collapsed={false} />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}