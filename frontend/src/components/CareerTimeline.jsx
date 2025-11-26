import { CheckCircle, Circle, ArrowRight } from 'lucide-react';

const CareerTimeline = ({ paths }) => {
  if (!paths || paths.length === 0) return null;

  return (
    <div className="space-y-8">
      {paths.map((path, index) => (
        <div key={index} className="relative pl-8 border-l-2 border-gray-200 dark:border-gray-800 last:border-0 pb-8 last:pb-0">
          <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-lightBg dark:bg-darkBg border-2 border-neonBlue shadow-[0_0_10px_rgba(0,243,255,0.5)]"></div>
          
          <div className="bg-lightCardBg dark:bg-cardBg p-6 rounded-xl border border-gray-200 dark:border-gray-800 relative group hover:border-neonPurple dark:hover:border-neonPurple transition-colors shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <h3 className="text-xl font-bold text-neonBlue">{path.currentLevel}</h3>
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mt-1">
                  <ArrowRight size={16} />
                  <span className="text-gray-900 dark:text-white font-medium">{path.nextLevel}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">Est. Time</p>
                <p className="font-bold text-gray-900 dark:text-white">{path.estimatedTimeMonths} Months</p>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-6">{path.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-neonPurple mb-3">Required Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {path.requiredSkills.map((skill, i) => (
                    <span key={i} className="px-2 py-1 bg-neonPurple/10 text-neonPurple rounded text-sm border border-neonPurple/20">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-blue-500 dark:text-blue-400 mb-3">Recommended Courses</h4>
                <ul className="space-y-2">
                  {path.recommendedCourses.map((course, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <CheckCircle size={14} className="text-blue-500 dark:text-blue-400" />
                      {course}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center">
               <span className="text-sm text-gray-500 dark:text-gray-400">Potential Salary</span>
               <span className="text-lg font-bold text-green-600 dark:text-green-400">{path.estimatedSalary}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CareerTimeline;
