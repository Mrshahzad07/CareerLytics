import { useState, useEffect } from 'react';
import api from '../api';
import { Briefcase, FileText } from 'lucide-react';
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

  if (!resumeData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4 sm:space-y-6 px-4">
        <div className="p-4 sm:p-6 bg-neonBlue/10 rounded-full">
          <FileText size={36} className="text-neonBlue sm:w-12 sm:h-12" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold">Resume Required</h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-md text-sm sm:text-base">
          To get personalized job recommendations, please upload your resume first. We analyze your skills to find the perfect match.
        </p>
        <Link 
          to="/resume" 
          className="px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-neonBlue to-neonPurple text-white font-bold rounded-xl hover:opacity-90 transition-opacity text-sm sm:text-base"
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
      className="space-y-6 sm:space-y-8 px-1 sm:px-0"
    >
      {/* Header - Responsive layout */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="p-2.5 sm:p-3 bg-neonBlue/10 rounded-xl text-neonBlue">
          <Briefcase size={28} className="sm:w-8 sm:h-8" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Job Recommendations</h1>
          <p className="text-gray-400 text-sm sm:text-base">Curated opportunities based on your skills</p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 sm:py-20">
          <div className="animate-spin w-10 h-10 sm:w-12 sm:h-12 border-4 border-neonBlue border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400 text-sm sm:text-base">Finding the best jobs for you...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12 sm:py-20 text-red-500 text-sm sm:text-base px-4">
          {error}
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-12 sm:py-20 text-gray-400 text-sm sm:text-base px-4">
          No jobs found matching your skills. Try updating your resume.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default JobPage;
