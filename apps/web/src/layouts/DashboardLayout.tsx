import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useAuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navigationItems = [
    { href: '/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/resume-analyzer', label: 'Resume Analyzer', icon: '📄' },
    { href: '/skill-gap', label: 'Skill Gap', icon: '📈' },
    { href: '/career-paths', label: 'Career Paths', icon: '🎯' },
    { href: '/roadmap', label: 'Roadmap', icon: '🗺️' },
    { href: '/mentor-chat', label: 'AI Mentor', icon: '🤖' },
    { href: '/profile', label: 'Profile', icon: '👤' },
    { href: '/settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900">
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-slate-900 text-white transition-all duration-300 fixed h-full z-40`}
      >
        <div className="p-4 border-b border-slate-700">
          <h1 className={`font-bold text-xl ${!sidebarOpen && 'hidden'}`}>Career AI</h1>
        </div>
        <nav className="mt-6">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="flex items-center gap-4 px-4 py-3 hover:bg-slate-800 transition-colors"
            >
              <span className="text-xl">{item.icon}</span>
              {sidebarOpen && <span className="text-sm">{item.label}</span>}
            </Link>
          ))}
        </nav>
      </aside>

      <div className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-20'} flex flex-col transition-all duration-300`}>
        <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4 flex justify-between items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-sm text-slate-600 dark:text-slate-300">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
};
