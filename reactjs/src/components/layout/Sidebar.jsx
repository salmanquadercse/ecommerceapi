import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  FaHome, 
  FaUsers, 
  FaChartBar, 
  FaCog, 
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';
import { useTheme } from '../../hooks/useTheme'; // Updated import path
import { logout } from '../../features/auth/authSlice';
import { useDispatch } from 'react-redux';

export default function Sidebar({ collapsed, onToggle }) {
  const { pathname } = useLocation();
  const { mode } = useTheme(); // Now using our custom hook
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const navItems = [
    { path: '/', label: 'Dashboard', icon: <FaHome />, roles: ['admin', 'user'] },
    { path: '/users', label: 'Users', icon: <FaUsers />, roles: ['admin'] },
    { path: '/analytics', label: 'Analytics', icon: <FaChartBar />, roles: ['admin', 'analyst'] },
    { path: '/settings', label: 'Settings', icon: <FaCog />, roles: ['admin'] },
  ];

  const filteredNavItems = navItems.filter(item => 
    item.roles.some(role => user?.roles?.includes(role))
  );
  console.log('Filtered Nav Items:', navItems);

  return (
    <div 
      className={`d-flex flex-column ${mode === 'dark' ? 'bg-dark' : 'bg-light'} 
      ${collapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`}
      style={{
        height: '100vh',
        width: collapsed ? '80px' : '250px',
        transition: 'width 0.3s ease',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}
    >
      <div className="p-3 d-flex justify-content-between align-items-center">
        {!collapsed && (
          <h5 className={`m-0 ${mode === 'dark' ? 'text-light' : 'text-dark'}`}>
            Admin Panel
          </h5>
        )}
        <button 
          className={`btn btn-link p-0 text-decoration-none ${mode === 'dark' ? 'text-light' : 'text-dark'}`}
          onClick={onToggle}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>

      <Nav className="flex-column px-2 flex-grow-1">
        {filteredNavItems.map((item) => (
          <Nav.Item key={item.path}>
            <Nav.Link 
              as={Link} 
              to={item.path}
              active={pathname === item.path}
              className={`d-flex align-items-center py-3 px-3 rounded 
                ${mode === 'dark' ? 'text-light' : 'text-dark'}
                ${pathname === item.path ? (mode === 'dark' ? 'bg-primary' : 'bg-light') : ''}`}
            >
              <span className="me-3">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>

      <div className={`p-3 border-top ${mode === 'dark' ? 'border-secondary' : ''}`}>
        <button 
          onClick={() => dispatch(logout())}
          className={`btn btn-link d-flex align-items-center w-100 text-decoration-none 
            ${mode === 'dark' ? 'text-light' : 'text-dark'}`}
        >
          <span className="me-3"><FaSignOutAlt /></span>
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}