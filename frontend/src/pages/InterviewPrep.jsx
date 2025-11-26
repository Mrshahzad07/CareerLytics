import { motion } from 'framer-motion';
import { BookOpen, Brain, MessageSquare, Code, Users } from 'lucide-react';

const InterviewPrep = () => {
  const sections = [
    {
      title: 'Aptitude',
      icon: <Brain size={32} />,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      description: 'Master quantitative aptitude with practice questions and formulas.',
      link: 'https://www.indiabix.com/aptitude/questions-and-answers/'
    },
    {
      title: 'Logical Reasoning',
      icon: <BookOpen size={32} />,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      description: 'Enhance your logical thinking and problem-solving skills.',
      link: 'https://www.indiabix.com/logical-reasoning/questions-and-answers/'
    },
    {
      title: 'Verbal Ability',
      icon: <MessageSquare size={32} />,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      description: 'Improve your English grammar and verbal communication.',
      link: 'https://www.indiabix.com/verbal-ability/questions-and-answers/'
    },
    {
      title: 'Technical MCQs',
      icon: <Code size={32} />,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      description: 'Test your technical knowledge in C, C++, Java, Python, and more.',
      link: 'https://www.indiabix.com/online-test/categories/'
    },
    {
      title: 'HR Interview',
      icon: <Users size={32} />,
      color: 'text-pink-500',
      bgColor: 'bg-pink-500/10',
      description: 'Prepare for common HR interview questions and answers.',
      link: 'https://www.indiabix.com/hr-interview/questions-and-answers/'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto space-y-8"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Interview Preparation Hub</h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Ace your interviews with our curated collection of resources from IndiaBix.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section, index) => (
          <motion.a
            key={index}
            href={section.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            className="bg-lightCardBg dark:bg-cardBg p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-neonBlue transition-all shadow-sm hover:shadow-md group"
          >
            <div className={`p-4 rounded-lg w-fit mb-4 ${section.bgColor} ${section.color}`}>
              {section.icon}
            </div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-neonBlue transition-colors">
              {section.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {section.description}
            </p>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
};

export default InterviewPrep;
