import { useState, useEffect } from 'react';
import api from '../api';
import { Compass, FileText, Sparkles, Target, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import CareerTimeline from '../components/CareerTimeline';
import { useResume } from '../context/ResumeContext';

const CareerPathPage = () => {
  const [paths, setPaths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { resumeData } = useResume();

  useEffect(() => {
    const fetchPath = async () => {
      if (!resumeData) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/api/career/path', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPaths(response.data);
      } catch (err) {
        console.error(err);
        if (!err.response) {
          setError('Network Error: Cannot connect to server. Is the backend running?');
        } else {
          setError('Failed to load career path.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPath();
  }, [resumeData]);

  if (!resumeData) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6"
      >
        {/* Animated background */}
        <div className="absolute inset-0 flex items-center justify-center -z-10 opacity-20">
          <div className="w-96 h-96 bg-gradient-to-r from-neonPurple/30 to-neonBlue/30 rounded-full blur-3xl animate-pulse" />
        </div>
        
        <motion.div 
          className="p-6 bg-gradient-to-br from-neonPurple/20 to-neonBlue/20 rounded-full"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <FileText size={48} className="text-neonPurple" />
        </motion.div>
        <h2 className="text-2xl font-bold">Resume Required</h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-md">
          To generate your personalized career roadmap, please upload your resume first. We need to understand your current skills to guide your future.
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link 
            to="/resume" 
            className="px-8 py-4 bg-gradient-to-r from-neonBlue to-neonPurple text-white font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-neonPurple/30 inline-flex items-center gap-2"
          >
            <FileText size={20} />
            Upload Resume
          </Link>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-8 relative"
    >
      {/* Background decorations */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-neonPurple/5 rounded-full blur-3xl -z-10" />
      <div className="absolute top-40 right-0 w-96 h-96 bg-neonBlue/5 rounded-full blur-3xl -z-10" />
      
      {/* Hero Section */}
      <div className="text-center mb-12">
        <motion.div 
          className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-neonBlue to-neonPurple rounded-2xl mb-6 shadow-xl shadow-neonPurple/30"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200 }}
          whileHover={{ rotate: 10, scale: 1.1 }}
        >
          <Compass size={36} className="text-white" />
        </motion.div>
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-neonBlue to-neonPurple"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Your Career Roadmap
        </motion.h1>
        <motion.p 
          className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Based on your current skills, here is a personalized progression path to reach your potential.
        </motion.p>
        
        {/* Stats badges */}
        <motion.div 
          className="flex justify-center gap-4 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.div 
            className="flex items-center gap-2 px-4 py-2 bg-neonBlue/10 rounded-full text-neonBlue text-sm"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(0, 243, 255, 0.2)" }}
          >
            <Target size={16} />
            <span>Personalized</span>
          </motion.div>
          <motion.div 
            className="flex items-center gap-2 px-4 py-2 bg-neonPurple/10 rounded-full text-neonPurple text-sm"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(188, 19, 254, 0.2)" }}
          >
            <TrendingUp size={16} />
            <span>Growth-focused</span>
          </motion.div>
          <motion.div 
            className="flex items-center gap-2 px-4 py-2 bg-green-500/10 rounded-full text-green-500 text-sm"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(34, 197, 94, 0.2)" }}
          >
            <Sparkles size={16} />
            <span>AI-Powered</span>
          </motion.div>
        </motion.div>
      </div>

      {loading ? (
        <motion.div 
          className="text-center py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="relative inline-block">
            <div className="animate-spin w-16 h-16 border-4 border-neonPurple/30 border-t-neonPurple rounded-full mx-auto mb-4"></div>
            <Compass size={24} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-neonPurple animate-pulse" />
          </div>
          <p className="text-gray-400 mt-4">Analyzing career trajectory...</p>
        </motion.div>
      ) : error ? (
        <motion.div 
          className="text-center py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/10 rounded-full mb-4">
            <Compass size={32} className="text-red-500" />
          </div>
          <p className="text-red-500">{error}</p>
        </motion.div>
      ) : (
        <CareerTimeline paths={paths} />
      )}
    </motion.div>
  );
};

export default CareerPathPage;
