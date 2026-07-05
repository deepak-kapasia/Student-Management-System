import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, UserPlus, Settings } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        Dashboard
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              end
            >
              <LayoutDashboard size={20} />
              Overview
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/students" 
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <Users size={20} />
              All Students
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/add-student" 
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <UserPlus size={20} />
              Add Student
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/profile" 
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <Settings size={20} />
              My Profile
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
