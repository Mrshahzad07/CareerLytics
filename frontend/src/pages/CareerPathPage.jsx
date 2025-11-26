import { useState, useEffect } from 'react';
import axios from 'axios';
import { Compass, FileText } from 'lucide-react';
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
        const response = await axios.get('http://localhost:8080/api/career/path', {
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
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
        <div className="p-6 bg-neonPurple/10 rounded-full">
          <FileText size={48} className="text-neonPurple" />
        </div>
        <h2 className="text-2xl font-bold">Resume Required</h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-md">
          To generate your personalized career roadmap, please upload your resume first. We need to understand your current skills to guide your future.
        </p>
        <Link 
          to="/resume" 
          className="px-6 py-3 bg-gradient-to-r from-neonBlue to-neonPurple text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
        >
          Upload Resume
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-neonBlue to-neonPurple rounded-2xl mb-6 shadow-lg shadow-neonPurple/20">
          <Compass size={32} className="text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Your Career Roadmap</h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Based on your current skills, here is a personalized progression path to reach your potential.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <div className="animate-spin w-12 h-12 border-4 border-neonPurple border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Analyzing career trajectory...</p>
        </div>
      ) : error ? (
        <div className="text-center py-20 text-red-500">
          {error}
        </div>
      ) : (
        <CareerTimeline paths={paths} />
      )}
    </motion.div>
  );
};

export default CareerPathPage;
