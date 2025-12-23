import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Eye, EyeOff, CheckCircle } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await login(email, password);
    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-lightBg dark:bg-darkBg relative overflow-hidden transition-colors duration-300">
      {/* Navigation & Theme Toggle */}
      <div className="absolute top-0 left-0 w-full px-3 sm:px-6 py-4 sm:py-6 flex justify-between items-center z-20">
        <Link 
          to="/" 
          className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base text-gray-600 dark:text-gray-400 hover:text-neonBlue transition-colors font-medium"
        >
          <ArrowLeft size={18} className="sm:hidden" />
          <ArrowLeft size={20} className="hidden sm:block" />
          <span className="hidden sm:inline">Back to Home</span>
          <span className="sm:hidden">Back</span>
        </Link>
        <ThemeToggle />
      </div>

      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-neonBlue/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-neonPurple/20 rounded-full blur-[100px]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-lightCardBg dark:bg-cardBg p-5 sm:p-8 rounded-2xl border border-gray-200 dark:border-gray-800 w-full max-w-md mx-3 sm:mx-0 z-10 shadow-2xl transition-colors duration-300"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-neonBlue to-neonPurple">
          Welcome Back
        </h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 text-center mb-6 sm:mb-8">Login to access your career dashboard</p>

        {/* Success Message */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-green-500/10 border border-green-500/50 text-green-500 p-4 rounded-lg mb-6 text-center flex items-center justify-center gap-2"
            >
              <CheckCircle size={20} />
              <span className="font-medium">Login Successful! Redirecting...</span>
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 dark:bg-darkBg border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-gray-900 dark:text-white focus:border-neonBlue focus:outline-none transition-colors"
              placeholder="you@example.com"
              required
              disabled={success}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 dark:bg-darkBg border border-gray-300 dark:border-gray-700 rounded-lg p-3 pr-12 text-gray-900 dark:text-white focus:border-neonPurple focus:outline-none transition-colors"
                placeholder="••••••••"
                required
                disabled={success}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={success}
            className="w-full bg-gradient-to-r from-neonBlue to-neonPurple text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-neonBlue/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {success ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
          Don't have an account?{' '}
          <Link to="/register" className="text-neonBlue hover:underline">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
