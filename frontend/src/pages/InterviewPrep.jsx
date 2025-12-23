import { motion } from 'framer-motion';
import { BookOpen, Brain, MessageSquare, Code, Users, ExternalLink, Sparkles, Target } from 'lucide-react';

const InterviewPrep = () => {
  const sections = [
    {
      title: 'Aptitude',
      icon: <Brain size={28} />,
      gradient: 'from-orange-500 to-amber-500',
      description: 'Master quantitative aptitude with practice questions and formulas.',
      link: 'https://www.indiabix.com/aptitude/questions-and-answers/',
      stats: '500+ Questions'
    },
    {
      title: 'Logical Reasoning',
      icon: <BookOpen size={28} />,
      gradient: 'from-blue-500 to-cyan-500',
      description: 'Enhance your logical thinking and problem-solving skills.',
      link: 'https://www.indiabix.com/logical-reasoning/questions-and-answers/',
      stats: '400+ Problems'
    },
    {
      title: 'Verbal Ability',
      icon: <MessageSquare size={28} />,
      gradient: 'from-green-500 to-emerald-500',
      description: 'Improve your English grammar and verbal communication.',
      link: 'https://www.indiabix.com/verbal-ability/questions-and-answers/',
      stats: '300+ Exercises'
    },
    {
      title: 'Technical MCQs',
      icon: <Code size={28} />,
      gradient: 'from-purple-500 to-violet-500',
      description: 'Test your technical knowledge in C, C++, Java, Python, and more.',
      link: 'https://www.indiabix.com/online-test/categories/',
      stats: '1000+ MCQs'
    },
    {
      title: 'HR Interview',
      icon: <Users size={28} />,
      gradient: 'from-pink-500 to-rose-500',
      description: 'Prepare for common HR interview questions and answers.',
      link: 'https://www.indiabix.com/hr-interview/questions-and-answers/',
      stats: '200+ Q&A'
    }
  ];

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

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-7xl mx-auto space-y-8 relative"
    >
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-neonBlue/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-neonPurple/5 rounded-full blur-3xl -z-10" />

      {/* Hero Section */}
      <motion.div variants={itemVariants} className="text-center mb-12 relative">
        <motion.div 
          className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-neonBlue to-neonPurple rounded-2xl mb-6 shadow-xl shadow-neonBlue/30"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          whileHover={{ rotate: 10, scale: 1.1 }}
        >
          <Target size={36} className="text-white" />
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-neonBlue to-neonPurple">
          Interview Preparation Hub
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          Ace your interviews with our curated collection of resources. Practice makes perfect!
        </p>
        
        {/* Feature badges */}
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <motion.div 
            className="flex items-center gap-2 px-4 py-2 bg-green-500/10 rounded-full text-green-500 text-sm"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles size={14} />
            Free Resources
          </motion.div>
          <motion.div 
            className="flex items-center gap-2 px-4 py-2 bg-neonBlue/10 rounded-full text-neonBlue text-sm"
            whileHover={{ scale: 1.05 }}
          >
            <BookOpen size={14} />
            Comprehensive
          </motion.div>
        </div>
      </motion.div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section, index) => (
          <motion.a
            key={index}
            href={section.link}
            target="_blank"
            rel="noopener noreferrer"
            variants={itemVariants}
            className="group relative bg-lightCardBg dark:bg-cardBg p-6 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden"
            whileHover={{ 
              y: -8, 
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
              borderColor: "rgba(0, 243, 255, 0.5)"
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Gradient overlay on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${section.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
            
            {/* Shine effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
            </div>
            
            {/* Icon */}
            <motion.div 
              className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${section.gradient} text-white mb-4 shadow-lg`}
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {section.icon}
            </motion.div>
            
            {/* Stats badge */}
            <span className="absolute top-4 right-4 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs font-medium text-gray-600 dark:text-gray-400">
              {section.stats}
            </span>
            
            {/* Content */}
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-neonBlue transition-colors">
              {section.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              {section.description}
            </p>
            
            {/* CTA */}
            <div className="flex items-center gap-2 text-neonBlue font-medium text-sm">
              <span className="group-hover:underline">Start Practicing</span>
              <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.a>
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div 
        variants={itemVariants}
        className="text-center mt-12 p-8 bg-gradient-to-r from-neonBlue/10 to-neonPurple/10 rounded-2xl border border-gray-200 dark:border-gray-800"
      >
        <h3 className="text-xl font-bold mb-2">Ready to ace your interview?</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          Consistent practice is the key to success. Start with any topic above!
        </p>
        <motion.a
          href="https://www.indiabix.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-neonBlue to-neonPurple text-white font-bold rounded-xl shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <BookOpen size={20} />
          Explore All Resources
          <ExternalLink size={16} />
        </motion.a>
      </motion.div>
    </motion.div>
  );
};

export default InterviewPrep;
