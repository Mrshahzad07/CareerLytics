import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  Compass, 
  LogOut, 
  Menu, 
  X,
  BookOpen,
  Layers,
  MessageSquare,
  PenTool
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('resumeData');
    navigate('/');
  };

  const navItems = [
    { path: '/dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
    { path: '/resume', icon: <FileText size={18} />, label: 'Analysis' },
    { path: '/resume-builder', icon: <PenTool size={18} />, label: 'Builder' },
    { path: '/jobs', icon: <Briefcase size={18} />, label: 'Jobs' },
    { path: '/career-path', icon: <Compass size={18} />, label: 'Path' },
    { path: '/interview-prep', icon: <BookOpen size={18} />, label: 'Prep' },
    { path: '/resources', icon: <Layers size={18} />, label: 'Resources' },
    { path: '/feedback', icon: <MessageSquare size={18} />, label: 'Feedback' },
  ];

  return (
    <div className="min-h-screen bg-lightBg dark:bg-darkBg text-gray-900 dark:text-white transition-colors duration-300 flex flex-col">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-lightCardBg/80 dark:bg-cardBg/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-2">
              <Link to="/dashboard">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neonBlue to-neonPurple"
                >
                  CareerLytics
                </motion.div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 group"
                >
                  {location.pathname === item.path && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-neonBlue/10 rounded-lg"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <motion.div 
                    className={`relative flex items-center gap-2 ${
                      location.pathname === item.path
                        ? 'text-neonBlue'
                        : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </motion.div>
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <ThemeToggle />
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-red-500 transition-colors"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-4">
              <ThemeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white p-2"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-gray-200 dark:border-gray-800 bg-lightCardBg dark:bg-cardBg overflow-hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium ${
                      location.pathname === item.path
                        ? 'bg-neonBlue/10 text-neonBlue'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                ))}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-red-500 hover:bg-red-500/10"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
