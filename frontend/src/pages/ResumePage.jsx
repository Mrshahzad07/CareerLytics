import { useResume } from '../context/ResumeContext';
import ResumeUpload from '../components/ResumeUpload';
import AtsScoreGauge from '../components/AtsScoreGauge';
import ResumeDetails from '../components/ResumeDetails';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

const ResumePage = () => {
  const { resumeData, setResume } = useResume();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto space-y-12 pb-12"
    >
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neonBlue to-neonPurple inline-block">
          Resume Analysis
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Get detailed insights into your resume's performance and actionable tips to improve your ATS score.
        </p>
      </div>

      {!resumeData ? (
        <ResumeUpload onUploadSuccess={setResume} />
      ) : (
        <div className="space-y-12">
          {/* Score Section */}
          <div className="flex justify-center">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-lightCardBg dark:bg-cardBg p-8 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-2xl relative overflow-hidden w-full max-w-2xl text-center group hover:border-neonBlue/50 transition-all duration-500"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neonBlue via-purple-500 to-neonPurple opacity-50 group-hover:opacity-100 transition-opacity"></div>
              
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Your ATS Score</h2>
              
              <div className="flex justify-center mb-8">
                <AtsScoreGauge score={resumeData.atsScore} />
              </div>

              {/* Quick Feedback Summary */}
              <div className="mb-8 p-6 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-gray-700 text-left">
                <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2 text-lg">
                  <span className="text-2xl">💡</span> Key Improvement
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {resumeData.improvementSuggestions 
                    ? resumeData.improvementSuggestions.split('.')[0] + '.' 
                    : "Great job! Your resume looks strong. Check the details below for minor tweaks."}
                </p>
              </div>
              
              <button 
                onClick={() => setResume(null)}
                className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white transition-all text-sm font-medium"
              >
                <RefreshCw size={16} /> Analyze Another Resume
              </button>
            </motion.div>
          </div>

          {/* Details Section */}
          <ResumeDetails resume={resumeData} />
        </div>
      )}
    </motion.div>
  );
};

export default ResumePage;
