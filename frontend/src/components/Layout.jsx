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
  PenTool,
  Sparkles
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('resumeData');
    navigate('/');
  };

  const navItems = [
    { path: '/dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard', color: 'from-cyan-400 to-blue-500' },
    { path: '/resume', icon: <FileText size={18} />, label: 'Analysis', color: 'from-purple-400 to-pink-500' },
    { path: '/resume-builder', icon: <PenTool size={18} />, label: 'Builder', color: 'from-green-400 to-emerald-500' },
    { path: '/jobs', icon: <Briefcase size={18} />, label: 'Jobs', color: 'from-orange-400 to-red-500' },
    { path: '/career-path', icon: <Compass size={18} />, label: 'Path', color: 'from-indigo-400 to-purple-500' },
    { path: '/interview-prep', icon: <BookOpen size={18} />, label: 'Prep', color: 'from-pink-400 to-rose-500' },
    { path: '/resources', icon: <Layers size={18} />, label: 'Resources', color: 'from-teal-400 to-cyan-500' },
    { path: '/feedback', icon: <MessageSquare size={18} />, label: 'Feedback', color: 'from-yellow-400 to-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-lightBg dark:bg-darkBg text-gray-900 dark:text-white transition-colors duration-300 flex flex-col">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-lightCardBg/90 dark:bg-cardBg/90 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-2">
              <Link to="/dashboard">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2"
                >
                  <motion.img
                    src="/logo.png"
                    alt="CareerLytics"
                    className="w-10 h-10 rounded-xl object-contain"
                    whileHover={{ rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neonBlue to-neonPurple hidden sm:block">
                    CareerLytics
                  </span>
                </motion.div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1 bg-gray-100/50 dark:bg-white/5 rounded-2xl p-1.5">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const isHovered = hoveredItem === item.path;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onMouseEnter={() => setHoveredItem(item.path)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className="relative px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300"
                  >
                    {/* Active/Hover Background */}
                    {isActive && (
                      <motion.div
                        layoutId="nav-active-pill"
                        className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-xl shadow-lg`}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    
                    {/* Hover glow effect (only when not active) */}
                    {isHovered && !isActive && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute inset-0 bg-gray-200/50 dark:bg-white/10 rounded-xl"
                      />
                    )}
                    
                    <motion.div 
                      className={`relative flex items-center gap-2 z-10 ${
                        isActive
                          ? 'text-white'
                          : 'text-gray-600 dark:text-gray-400'
                      }`}
                      whileHover={{ scale: isActive ? 1 : 1.05 }}
                      animate={{ 
                        y: isHovered && !isActive ? -2 : 0 
                      }}
                    >
                      <motion.span
                        animate={{ 
                          rotate: isHovered ? [0, -10, 10, 0] : 0 
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {item.icon}
                      </motion.span>
                      <span className="font-medium">{item.label}</span>
                    </motion.div>
                  </Link>
                );
              })}
            </div>

            {/* Right Side Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <ThemeToggle />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-red-500 bg-red-500/10 hover:bg-red-500/20 transition-all duration-300 border border-red-500/20"
              >
                <motion.span
                  whileHover={{ rotate: -15 }}
                >
                  <LogOut size={16} />
                </motion.span>
                <span>Logout</span>
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-4">
              <ThemeToggle />
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.div>
              </motion.button>
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
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden border-t border-gray-200/50 dark:border-gray-800/50 bg-lightCardBg/95 dark:bg-cardBg/95 backdrop-blur-xl overflow-hidden"
            >
              <div className="px-3 pt-3 pb-4 space-y-1">
                {navItems.map((item, index) => {
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                          isActive
                            ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'
                        }`}
                      >
                        <motion.span
                          whileHover={{ rotate: 15 }}
                          className={isActive ? 'text-white' : ''}
                        >
                          {item.icon}
                        </motion.span>
                        <span>{item.label}</span>
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="ml-auto w-2 h-2 rounded-full bg-white"
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
                
                {/* Logout button */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.05 }}
                >
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-red-500 bg-red-500/10 hover:bg-red-500/20 transition-all duration-300 mt-2"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </motion.div>
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
