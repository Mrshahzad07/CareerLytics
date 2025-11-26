import { Check, X, AlertTriangle, User, Mail, Phone, Code, AlertCircle } from 'lucide-react';

const ResumeDetails = ({ resume }) => {
  if (!resume) return null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Info */}
        <div className="bg-lightCardBg dark:bg-cardBg p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm transition-colors duration-300">
          <h3 className="text-lg font-bold mb-4 text-neonBlue flex items-center gap-2">
            <User size={20} /> Contact Information
          </h3>
          <div className="space-y-2 text-gray-600 dark:text-gray-300">
            <p className="flex items-center gap-2">
              <Mail size={16} className="text-gray-400" />
              <span className="font-medium text-gray-500 dark:text-gray-400">Email:</span> {resume.email || 'Not found'}
            </p>
            <p className="flex items-center gap-2">
              <Phone size={16} className="text-gray-400" />
              <span className="font-medium text-gray-500 dark:text-gray-400">Phone:</span> {resume.phone || 'Not found'}
            </p>
          </div>
        </div>

        {/* Skills */}
        <div className="bg-lightCardBg dark:bg-cardBg p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm transition-colors duration-300">
          <h3 className="text-lg font-bold mb-4 text-neonPurple flex items-center gap-2">
            <Code size={20} /> Skills Detected
          </h3>
          <div className="flex flex-wrap gap-2">
            {resume.skills && resume.skills.length > 0 ? (
              resume.skills.map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-neonPurple/10 text-neonPurple rounded-full text-sm border border-neonPurple/20">
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No skills detected</p>
            )}
          </div>
        </div>
      </div>

      {/* Analysis */}
      <div className="bg-lightCardBg dark:bg-cardBg p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm transition-colors duration-300">
        <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
          <AlertCircle size={20} className="text-yellow-500" /> ATS Analysis
        </h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-500 dark:text-gray-400 mb-2">Improvement Suggestions</h4>
            <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-600 dark:text-blue-200">
              {resume.improvementSuggestions || "No specific suggestions available."}
            </div>
          </div>

          {resume.missingKeywords && resume.missingKeywords.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-500 dark:text-gray-400 mb-2">Missing Keywords</h4>
              <div className="flex flex-wrap gap-2">
                {resume.missingKeywords.map((keyword, index) => (
                  <span key={index} className="px-3 py-1 bg-red-500/10 text-red-500 dark:text-red-400 rounded-full text-sm border border-red-500/30 flex items-center gap-1">
                    <X size={12} /> {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeDetails;
