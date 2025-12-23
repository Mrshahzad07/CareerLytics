import { MapPin, Briefcase, DollarSign, Calendar, ExternalLink } from 'lucide-react';

const JobCard = ({ job }) => {
  return (
    <div className="bg-lightCardBg dark:bg-cardBg p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-neonBlue dark:hover:border-neonBlue transition-all group relative overflow-hidden shadow-sm hover:shadow-md">
      <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
        <Briefcase size={48} className="text-gray-900 dark:text-white sm:w-16 sm:h-16" />
      </div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex justify-between items-start gap-2 mb-3 sm:mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-xl font-bold text-gray-900 dark:text-white group-hover:text-neonBlue dark:group-hover:text-neonBlue transition-colors truncate">
              {job.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 font-medium text-sm truncate">{job.company}</p>
          </div>
          <span className="flex-shrink-0 px-2 sm:px-3 py-1 bg-gray-100 dark:bg-white/5 rounded-full text-xs border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300">
            {job.platform}
          </span>
        </div>

        {/* Job Details */}
        <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            <MapPin size={14} className="text-neonPurple flex-shrink-0 sm:w-4 sm:h-4" />
            <span className="truncate">{job.location}</span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            <DollarSign size={14} className="text-green-600 dark:text-green-400 flex-shrink-0 sm:w-4 sm:h-4" />
            <span className="truncate">{job.salaryRange}</span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            <Calendar size={14} className="text-blue-500 dark:text-blue-400 flex-shrink-0 sm:w-4 sm:h-4" />
            <span>{job.postedDate}</span>
          </div>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
          {job.requiredSkills.slice(0, 3).map((skill, index) => (
            <span key={index} className="px-2 py-0.5 sm:py-1 bg-gray-100 dark:bg-white/5 rounded text-xs text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-transparent">
              {skill}
            </span>
          ))}
          {job.requiredSkills.length > 3 && (
            <span className="px-2 py-0.5 sm:py-1 bg-gray-100 dark:bg-white/5 rounded text-xs text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-transparent">
              +{job.requiredSkills.length - 3}
            </span>
          )}
        </div>

        {/* Apply Button */}
        <a
          href={job.applyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 sm:py-2 bg-gray-100 dark:bg-white/5 hover:bg-neonBlue/10 dark:hover:bg-neonBlue/20 text-gray-900 dark:text-white hover:text-neonBlue dark:hover:text-neonBlue border border-gray-200 dark:border-gray-700 hover:border-neonBlue dark:hover:border-neonBlue rounded-lg transition-all text-sm font-medium min-h-[44px]"
        >
          <span>Apply Now</span>
          <ExternalLink size={16} />
        </a>
      </div>
    </div>
  );
};

export default JobCard;
