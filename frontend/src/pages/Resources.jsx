import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, FileText, ExternalLink, Download } from 'lucide-react';

const Resources = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto space-y-16"
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Career Resources</h1>
        <p className="text-gray-400 text-lg">Curated tools and platforms to boost your career journey.</p>
      </div>

      {/* Job Portals */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <Briefcase className="text-neonBlue" size={28} />
          <h2 className="text-2xl font-bold">Job Opportunities</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ResourceCard
            title="Naukri.com"
            description="India's No.1 Job Portal. Explore thousands of job opportunities."
            link="https://www.naukri.com"
            color="text-blue-600"
          />
          <ResourceCard
            title="LinkedIn Jobs"
            description="Leverage your professional network to find your dream job."
            link="https://www.linkedin.com/jobs"
            color="text-blue-700"
          />
          <ResourceCard
            title="Indeed"
            description="Search millions of jobs from thousands of job boards."
            link="https://in.indeed.com"
            color="text-blue-500"
          />
        </div>
      </section>

      {/* Skill Development */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <GraduationCap className="text-neonPurple" size={28} />
          <h2 className="text-2xl font-bold">Skill Development Zone</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ResourceCard
            title="Tap Academy"
            description="Master coding and development with expert-led courses."
            link="https://thetapacademy.com/"
            cta="Explore Courses"
          />
          <ResourceCard
            title="Coursera"
            description="Build skills with courses from top universities."
            link="https://www.coursera.org"
            cta="Start Learning"
          />
          <ResourceCard
            title="Great Learning"
            description="Post-graduate programs and free courses in AI, ML, and more."
            link="https://www.mygreatlearning.com"
            cta="View Programs"
          />
          <ResourceCard
            title="Udemy"
            description="Choose from 213,000 online video courses."
            link="https://www.udemy.com"
            cta="Find Courses"
          />
        </div>
      </section>

      {/* Resume Templates */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <FileText className="text-green-500" size={28} />
          <h2 className="text-2xl font-bold">Resume Templates</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-lightCardBg dark:bg-cardBg p-8 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-neonBlue transition-all text-center">
            <h3 className="text-xl font-bold mb-4">Free Resume Templates</h3>
            <p className="text-gray-400 mb-6">Access our curated collection of professional resume templates on Google Drive.</p>
            <a
              href="#" // Replace with actual Google Drive link
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-bold"
            >
              <Download size={20} /> Access Drive Folder
            </a>
          </div>

          <div className="bg-lightCardBg dark:bg-cardBg p-8 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-neonBlue transition-all text-center">
            <h3 className="text-xl font-bold mb-4">JobScan Templates</h3>
            <p className="text-gray-400 mb-6">ATS-friendly templates designed to get you past the bots.</p>
            <a
              href="https://www.jobscan.co/resume-templates"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-bold"
            >
              <ExternalLink size={20} /> View Templates
            </a>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

const ResourceCard = ({ title, description, link, color, cta = "Visit Website" }) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="block bg-lightCardBg dark:bg-cardBg p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-neonBlue transition-all shadow-sm hover:shadow-md h-full flex flex-col"
  >
    <h3 className={`text-xl font-bold mb-3 ${color || 'text-gray-900 dark:text-white'}`}>{title}</h3>
    <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow">{description}</p>
    <div className="flex items-center gap-2 text-neonBlue font-medium group">
      {cta} <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
    </div>
  </a>
);

export default Resources;
