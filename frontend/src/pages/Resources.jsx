import { motion } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  FileText,
  ExternalLink,
  Download,
  Sparkles,
  TrendingUp,
  BookOpen,
  Award,
} from "lucide-react";

const Resources = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-7xl mx-auto space-y-16 pb-12"
    >
      {/* Hero Header */}
      <motion.div variants={itemVariants} className="text-center relative">
        <div className="absolute inset-0 flex items-center justify-center -z-10 opacity-30">
          <div className="w-64 h-64 bg-gradient-to-r from-neonBlue/20 to-neonPurple/20 rounded-full blur-3xl" />
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-neonBlue/20 to-neonPurple/20 rounded-2xl mb-6"
        >
          <Sparkles className="text-neonBlue" size={32} />
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-neonBlue to-neonPurple">
          Career Resources
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          Curated tools and platforms to accelerate your career journey and land your dream job.
        </p>
      </motion.div>

      {/* Job Portals */}
      <motion.section variants={itemVariants}>
        <SectionHeader 
          icon={<Briefcase className="text-neonBlue" size={28} />}
          title="Job Opportunities"
          subtitle="Explore top job portals"
          gradient="from-neonBlue"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ResourceCard
            title="Naukri.com"
            description="India's No.1 Job Portal. Explore thousands of job opportunities across industries."
            link="https://www.naukri.com"
            icon={<Briefcase size={24} />}
            gradient="from-blue-500 to-blue-700"
            delay={0}
          />
          <ResourceCard
            title="LinkedIn Jobs"
            description="Leverage your professional network to discover and apply for your dream job."
            link="https://www.linkedin.com/jobs"
            icon={<TrendingUp size={24} />}
            gradient="from-blue-600 to-blue-800"
            delay={0.1}
          />
          <ResourceCard
            title="Indeed"
            description="Search millions of jobs from thousands of company career pages and job boards."
            link="https://in.indeed.com"
            icon={<Award size={24} />}
            gradient="from-indigo-500 to-indigo-700"
            delay={0.2}
          />
        </div>
      </motion.section>

      {/* Skill Development */}
      <motion.section variants={itemVariants}>
        <SectionHeader 
          icon={<GraduationCap className="text-neonPurple" size={28} />}
          title="Skill Development Zone"
          subtitle="Level up your skills"
          gradient="from-neonPurple"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ResourceCard
            title="Tap Academy"
            description="Master coding with expert-led courses. Gamify Learning! Simplify Employment!"
            link="https://thetapacademy.com/"
            icon={<BookOpen size={24} />}
            gradient="from-purple-500 to-pink-500"
            cta="Explore Courses"
            delay={0}
          />
          <ResourceCard
            title="Coursera"
            description="Build in-demand skills with courses from top universities worldwide."
            link="https://www.coursera.org"
            icon={<GraduationCap size={24} />}
            gradient="from-blue-500 to-cyan-500"
            cta="Start Learning"
            delay={0.1}
          />
          <ResourceCard
            title="Great Learning"
            description="Post-graduate programs and free courses in AI, ML, Data Science and more."
            link="https://www.mygreatlearning.com"
            icon={<Award size={24} />}
            gradient="from-orange-500 to-red-500"
            cta="View Programs"
            delay={0.2}
          />
          <ResourceCard
            title="Udemy"
            description="Choose from 213,000+ online video courses with lifetime access."
            link="https://www.udemy.com"
            icon={<Sparkles size={24} />}
            gradient="from-violet-500 to-purple-600"
            cta="Find Courses"
            delay={0.3}
          />
        </div>
      </motion.section>

      {/* Resume Templates */}
      <motion.section variants={itemVariants}>
        <SectionHeader 
          icon={<FileText className="text-green-500" size={28} />}
          title="Resume Templates"
          subtitle="Professional templates to stand out"
          gradient="from-green-500"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <TemplateCard
            title="Free Resume Templates"
            description="Access our curated collection of professional resume templates on Google Drive."
            link="https://drive.google.com/drive/folders/1I_DDHfvEBDeSY3PzXtD-W0kUr_8HMVYS"
            icon={<Download size={24} />}
            buttonText="Access Drive Folder"
            gradient="from-green-500 to-emerald-600"
            bgGradient="from-green-500/10 to-emerald-500/10"
          />
          <TemplateCard
            title="JobScan Templates"
            description="ATS-friendly templates designed to get your resume past the automated screening."
            link="https://www.jobscan.co/resume-templates"
            icon={<ExternalLink size={24} />}
            buttonText="View Templates"
            gradient="from-blue-500 to-indigo-600"
            bgGradient="from-blue-500/10 to-indigo-500/10"
          />
        </div>
      </motion.section>
    </motion.div>
  );
};

// Section Header Component
const SectionHeader = ({ icon, title, subtitle, gradient }) => (
  <motion.div 
    className="flex items-center gap-4 mb-8"
    whileHover={{ x: 5 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <motion.div 
      className={`p-3 rounded-xl bg-gradient-to-br ${gradient}/10 to-transparent`}
      whileHover={{ rotate: 5, scale: 1.1 }}
    >
      {icon}
    </motion.div>
    <div>
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-gray-500 dark:text-gray-400 text-sm">{subtitle}</p>
    </div>
  </motion.div>
);

// Enhanced Resource Card Component
const ResourceCard = ({
  title,
  description,
  link,
  icon,
  gradient,
  cta = "Visit Website",
  delay = 0,
}) => (
  <motion.a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="group block bg-lightCardBg dark:bg-cardBg p-6 rounded-2xl border border-gray-200 dark:border-gray-800 h-full relative overflow-hidden"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    whileHover={{ 
      y: -8, 
      boxShadow: "0 20px 40px -15px rgba(0, 243, 255, 0.15)",
      borderColor: "rgba(0, 243, 255, 0.5)"
    }}
  >
    {/* Background Gradient Effect */}
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
    
    {/* Icon */}
    <motion.div 
      className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} text-white mb-4`}
      whileHover={{ rotate: 5, scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      {icon}
    </motion.div>
    
    {/* Content */}
    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-neonBlue transition-colors">
      {title}
    </h3>
    <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm leading-relaxed">
      {description}
    </p>
    
    {/* CTA */}
    <div className="flex items-center gap-2 text-neonBlue font-medium">
      <span className="group-hover:underline">{cta}</span>
      <motion.span
        className="inline-block"
        initial={{ x: 0 }}
        whileHover={{ x: 5 }}
      >
        <ExternalLink
          size={16}
          className="group-hover:translate-x-1 transition-transform"
        />
      </motion.span>
    </div>
    
    {/* Shine effect on hover */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
    </div>
  </motion.a>
);

// Template Card Component
const TemplateCard = ({
  title,
  description,
  link,
  icon,
  buttonText,
  gradient,
  bgGradient,
}) => (
  <motion.div 
    className={`relative bg-gradient-to-br ${bgGradient} p-8 rounded-2xl border border-gray-200 dark:border-gray-800 text-center overflow-hidden group`}
    whileHover={{ 
      y: -5, 
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
      borderColor: "rgba(0, 243, 255, 0.3)"
    }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    {/* Animated background circles */}
    <div className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br from-neonBlue/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
    <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-gradient-to-br from-neonPurple/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
    
    {/* Icon */}
    <motion.div 
      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} text-white mb-6 mx-auto`}
      whileHover={{ rotate: 10, scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      {icon}
    </motion.div>
    
    <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400 mb-6">{description}</p>
    
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${gradient} text-white rounded-xl font-bold shadow-lg`}
      whileHover={{ scale: 1.05, boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.3)" }}
      whileTap={{ scale: 0.95 }}
    >
      {icon}
      {buttonText}
    </motion.a>
  </motion.div>
);

export default Resources;
