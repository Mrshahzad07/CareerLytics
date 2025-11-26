import { MapPin, Briefcase, DollarSign, Calendar, ExternalLink } from 'lucide-react';

const JobCard = ({ job }) => {
  return (
    <div className="bg-lightCardBg dark:bg-cardBg p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-neonBlue dark:hover:border-neonBlue transition-all group relative overflow-hidden shadow-sm hover:shadow-md">
      <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
        <Briefcase size={64} className="text-gray-900 dark:text-white" />
      </div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-neonBlue dark:group-hover:text-neonBlue transition-colors">{job.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 font-medium">{job.company}</p>
          </div>
          <span className="px-3 py-1 bg-gray-100 dark:bg-white/5 rounded-full text-xs border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300">
            {job.platform}
          </span>
        </div>

        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <MapPin size={16} className="text-neonPurple" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <DollarSign size={16} className="text-green-600 dark:text-green-400" />
            <span>{job.salaryRange}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Calendar size={16} className="text-blue-500 dark:text-blue-400" />
            <span>{job.postedDate}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {job.requiredSkills.slice(0, 4).map((skill, index) => (
            <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-white/5 rounded text-xs text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-transparent">
              {skill}
            </span>
          ))}
          {job.requiredSkills.length > 4 && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-white/5 rounded text-xs text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-transparent">
              +{job.requiredSkills.length - 4}
            </span>
          )}
        </div>

        <a
          href={job.applyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2 bg-gray-100 dark:bg-white/5 hover:bg-neonBlue/10 dark:hover:bg-neonBlue/20 text-gray-900 dark:text-white hover:text-neonBlue dark:hover:text-neonBlue border border-gray-200 dark:border-gray-700 hover:border-neonBlue dark:hover:border-neonBlue rounded-lg transition-all"
        >
          <span>Apply Now</span>
          <ExternalLink size={16} />
        </a>
      </div>
    </div>
  );
};

export default JobCard;
