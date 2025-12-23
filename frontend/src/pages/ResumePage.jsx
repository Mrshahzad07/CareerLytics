import { useResume } from '../context/ResumeContext';
import ResumeUpload from '../components/ResumeUpload';
import AtsScoreGauge from '../components/AtsScoreGauge';
import ResumeDetails from '../components/ResumeDetails';
import { motion } from 'framer-motion';
import { RefreshCw, FileText, Sparkles, Target, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';

const ResumePage = () => {
  const { resumeData, setResume } = useResume();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-5xl mx-auto space-y-12 pb-12 relative"
    >
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-neonBlue/5 rounded-full blur-3xl -z-10" />
      <div className="absolute top-40 left-0 w-72 h-72 bg-neonPurple/5 rounded-full blur-3xl -z-10" />

      {/* Hero Section */}
      <motion.div variants={itemVariants} className="text-center space-y-4">
        <motion.div 
          className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-neonBlue to-neonPurple rounded-2xl mb-4 shadow-xl shadow-neonPurple/30"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200 }}
          whileHover={{ rotate: 10, scale: 1.1 }}
        >
          <FileText size={36} className="text-white" />
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neonBlue to-neonPurple inline-block">
          Resume Analysis
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          Get AI-powered insights and actionable tips to improve your ATS score and land more interviews.
        </p>

        {/* Feature badges */}
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          <motion.div 
            className="flex items-center gap-2 px-4 py-2 bg-neonBlue/10 rounded-full text-neonBlue text-sm"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(0, 243, 255, 0.2)" }}
          >
            <Target size={16} />
            <span>ATS Optimized</span>
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
            <span>Instant Results</span>
          </motion.div>
        </div>
      </motion.div>

      {!resumeData ? (
        <motion.div variants={itemVariants}>
          <ResumeUpload onUploadSuccess={setResume} />
        </motion.div>
      ) : (
        <motion.div variants={itemVariants} className="space-y-12">
          {/* Score Section */}
          <div className="flex justify-center">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-lightCardBg dark:bg-cardBg p-8 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-2xl relative overflow-hidden w-full max-w-2xl text-center group hover:border-neonBlue/50 transition-all duration-500"
              whileHover={{ y: -5 }}
            >
              {/* Gradient top bar */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-neonBlue via-purple-500 to-neonPurple opacity-50 group-hover:opacity-100 transition-opacity"></div>
              
              {/* Decorative circles */}
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br from-neonBlue/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-gradient-to-br from-neonPurple/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              
              <motion.h2 
                className="text-2xl font-bold mb-6 text-gray-900 dark:text-white"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Your ATS Score
              </motion.h2>
              
              <motion.div 
                className="flex justify-center mb-8"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
              >
                <AtsScoreGauge score={resumeData.atsScore} />
              </motion.div>

              {/* Score interpretation */}
              <motion.div 
                className="flex justify-center gap-4 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {resumeData.atsScore >= 80 ? (
                  <div className="flex items-center gap-2 text-green-500 bg-green-500/10 px-4 py-2 rounded-full">
                    <CheckCircle size={18} />
                    <span className="font-medium">Excellent! Your resume is ATS-ready</span>
                  </div>
                ) : resumeData.atsScore >= 60 ? (
                  <div className="flex items-center gap-2 text-yellow-500 bg-yellow-500/10 px-4 py-2 rounded-full">
                    <AlertCircle size={18} />
                    <span className="font-medium">Good, but room for improvement</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-red-500 bg-red-500/10 px-4 py-2 rounded-full">
                    <AlertCircle size={18} />
                    <span className="font-medium">Needs improvement for better results</span>
                  </div>
                )}
              </motion.div>

              {/* Quick Feedback Summary */}
              <motion.div 
                className="mb-8 p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-white/5 dark:to-white/10 rounded-2xl border border-gray-200 dark:border-gray-700 text-left"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2 text-lg">
                  <span className="text-2xl">💡</span> Key Improvement
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {resumeData.improvementSuggestions 
                    ? resumeData.improvementSuggestions.split('.')[0] + '.' 
                    : "Great job! Your resume looks strong. Check the details below for minor tweaks."}
                </p>
              </motion.div>
              
              <motion.button 
                onClick={() => setResume(null)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gradient-to-r hover:from-neonBlue hover:to-neonPurple hover:text-white transition-all text-sm font-medium group/btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RefreshCw size={16} className="group-hover/btn:rotate-180 transition-transform duration-500" />
                Analyze Another Resume
              </motion.button>
            </motion.div>
          </div>

          {/* Details Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <ResumeDetails resume={resumeData} />
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ResumePage;
