import { motion } from 'framer-motion';

const AtsScoreGauge = ({ score }) => {
  const radius = 85;
  const strokeWidth = 20;
  const center = radius + strokeWidth;
  const circumference = Math.PI * radius; // Semi-circle
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center justify-center pt-4">
      <div className="relative w-64 h-36 flex items-end justify-center overflow-hidden">
        <svg 
          className="w-full h-full" 
          viewBox={`0 0 ${center * 2} ${center + strokeWidth}`}
          style={{ overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" /> {/* Red */}
              <stop offset="40%" stopColor="#fbbf24" /> {/* Amber */}
              <stop offset="100%" stopColor="#22c55e" /> {/* Green */}
            </linearGradient>
          </defs>

          {/* Background Track */}
          <path
            d={`M ${strokeWidth} ${center} A ${radius} ${radius} 0 0 1 ${center * 2 - strokeWidth} ${center}`}
            fill="none"
            stroke="#e5e7eb" // Light gray for light mode
            className="dark:stroke-gray-700" // Dark gray for dark mode
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          
          {/* Progress Arc */}
          <motion.path
            d={`M ${strokeWidth} ${center} A ${radius} ${radius} 0 0 1 ${center * 2 - strokeWidth} ${center}`}
            fill="none"
            stroke="url(#scoreGradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>

        {/* Center Text */}
        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-end mb-2">
          <span className="text-gray-500 dark:text-gray-400 font-medium text-lg mb-1">Score</span>
          <motion.span 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-6xl font-bold text-gray-900 dark:text-white leading-none"
          >
            {score}%
          </motion.span>
        </div>
      </div>
    </div>
  );
};

export default AtsScoreGauge;
