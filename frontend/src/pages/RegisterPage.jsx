import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

const RegisterPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await register(fullName, email, password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-lightBg dark:bg-darkBg relative overflow-hidden transition-colors duration-300">
      {/* Navigation & Theme Toggle */}
      <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-20">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-neonBlue transition-colors font-medium"
        >
          <ArrowLeft size={20} /> Back to Home
        </Link>
        <ThemeToggle />
      </div>

      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-neonBlue/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-neonPurple/20 rounded-full blur-[100px]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-lightCardBg dark:bg-cardBg p-8 rounded-2xl border border-gray-200 dark:border-gray-800 w-full max-w-md z-10 shadow-2xl transition-colors duration-300"
      >
        <h2 className="text-3xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-neonBlue to-neonPurple">
          Create Account
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-8">Join CareerLytics today</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-gray-50 dark:bg-darkBg border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-gray-900 dark:text-white focus:border-neonBlue focus:outline-none transition-colors"
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 dark:bg-darkBg border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-gray-900 dark:text-white focus:border-neonBlue focus:outline-none transition-colors"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50 dark:bg-darkBg border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-gray-900 dark:text-white focus:border-neonPurple focus:outline-none transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-neonBlue to-neonPurple text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-neonBlue/20"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-neonBlue hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
