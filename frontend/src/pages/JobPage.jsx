import { useState, useEffect } from 'react';
import api from '../api';
import { Briefcase, FileText, Sparkles, Target, TrendingUp, Search, MapPin, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import JobCard from '../components/JobCard';
import { useResume } from '../context/ResumeContext';

const JobPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { resumeData } = useResume();

  useEffect(() => {
    const fetchJobs = async () => {
      if (!resumeData) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/api/jobs/recommend', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setJobs(response.data);
      } catch (err) {
        console.error(err);
        if (!err.response) {
          setError('Network Error: Cannot connect to server. Is the backend running?');
        } else {
          setError('Failed to load job recommendations.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [resumeData]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (!resumeData) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 px-4 relative"
      >
        {/* Background */}
        <div className="absolute inset-0 flex items-center justify-center -z-10 opacity-20">
          <div className="w-96 h-96 bg-gradient-to-r from-neonBlue/30 to-neonPurple/30 rounded-full blur-3xl animate-pulse" />
        </div>
        
        <motion.div 
          className="p-6 bg-gradient-to-br from-neonBlue/20 to-neonPurple/20 rounded-full"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <FileText size={48} className="text-neonBlue" />
        </motion.div>
        <h2 className="text-2xl font-bold">Resume Required</h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-md">
          To get personalized job recommendations, please upload your resume first. We analyze your skills to find the perfect match.
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link 
            to="/resume" 
            className="px-8 py-4 bg-gradient-to-r from-neonBlue to-neonPurple text-white font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-neonBlue/30 inline-flex items-center gap-2"
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
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6 sm:space-y-8 px-1 sm:px-0 relative"
    >
      {/* Background decorations */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-neonBlue/5 rounded-full blur-3xl -z-10" />
      <div className="absolute top-40 right-0 w-96 h-96 bg-neonPurple/5 rounded-full blur-3xl -z-10" />

      {/* Hero Header */}
      <motion.div variants={itemVariants} className="text-center mb-8">
        <motion.div 
          className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-neonBlue to-neonPurple rounded-2xl mb-6 shadow-xl shadow-neonBlue/30"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200 }}
          whileHover={{ rotate: 10, scale: 1.1 }}
        >
          <Briefcase size={36} className="text-white" />
        </motion.div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-neonBlue to-neonPurple">
          Job Recommendations
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          Curated opportunities tailored to your unique skills and experience.
        </p>

        {/* Feature badges */}
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <motion.div 
            className="flex items-center gap-2 px-4 py-2 bg-neonBlue/10 rounded-full text-neonBlue text-sm"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(0, 243, 255, 0.2)" }}
          >
            <Target size={16} />
            <span>Skills Matched</span>
          </motion.div>
          <motion.div 
            className="flex items-center gap-2 px-4 py-2 bg-neonPurple/10 rounded-full text-neonPurple text-sm"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(188, 19, 254, 0.2)" }}
          >
            <Sparkles size={16} />
            <span>AI-Powered</span>
          </motion.div>
          <motion.div 
            className="flex items-center gap-2 px-4 py-2 bg-green-500/10 rounded-full text-green-500 text-sm"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(34, 197, 94, 0.2)" }}
          >
            <TrendingUp size={16} />
            <span>Latest Openings</span>
          </motion.div>
        </div>
      </motion.div>

      {loading ? (
        <motion.div 
          variants={itemVariants}
          className="text-center py-20"
        >
          <div className="relative inline-block">
            <div className="animate-spin w-16 h-16 border-4 border-neonBlue/30 border-t-neonBlue rounded-full mx-auto mb-4"></div>
            <Search size={24} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-neonBlue animate-pulse" />
          </div>
          <p className="text-gray-400 mt-4">Finding the best jobs for you...</p>
        </motion.div>
      ) : error ? (
        <motion.div 
          variants={itemVariants}
          className="text-center py-20"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/10 rounded-full mb-4">
            <Briefcase size={32} className="text-red-500" />
          </div>
          <p className="text-red-500">{error}</p>
        </motion.div>
      ) : jobs.length === 0 ? (
        <motion.div 
          variants={itemVariants}
          className="text-center py-20"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-500/10 rounded-full mb-4">
            <Search size={32} className="text-gray-500" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-gray-700 dark:text-gray-300">No Matches Found</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            No jobs found matching your skills. Try updating your resume with more keywords.
          </p>
          <Link 
            to="/resume"
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-gradient-to-r from-neonBlue to-neonPurple text-white font-bold rounded-xl hover:opacity-90 transition-all"
          >
            Update Resume
          </Link>
        </motion.div>
      ) : (
        <>
          <motion.div variants={itemVariants} className="flex items-center justify-between mb-4">
            <p className="text-gray-500 dark:text-gray-400">
              Found <span className="text-neonBlue font-bold">{jobs.length}</span> jobs matching your profile
            </p>
          </motion.div>
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <JobCard job={job} />
              </motion.div>
            ))}
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default JobPage;
