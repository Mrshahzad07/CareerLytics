import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Upload,
  BarChart,
  Briefcase,
  Map,
  Star,
  Users,
  Zap,
  Play,
  FileText,
  BookOpen,
  Mail,
  MapPin,
  Instagram,
  Twitter,
  Linkedin,
  Check,
  Menu,
  X,
} from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";
import AnimatedBackground from "../components/AnimatedBackground";

const LandingPage = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle, submitting, success
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("submitting");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setFormState({ name: "", email: "", message: "" });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-lightBg dark:bg-darkBg text-gray-900 dark:text-white transition-colors duration-300 overflow-x-hidden relative">
      <AnimatedBackground />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-lightBg/80 dark:bg-darkBg/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 md:px-8 py-3 sm:py-4 flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-lg sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neonBlue to-neonPurple cursor-pointer flex-shrink-0"
          >
            CareerLytics
          </motion.div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4 items-center">
            <ThemeToggle />
            <Link to="/login">
              <motion.span
                whileHover={{ color: "#00f3ff", scale: 1.05 }}
                className="px-4 py-2 font-medium transition-colors inline-block"
              >
                Login
              </motion.span>
            </Link>
            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#22d3ee" }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-neonBlue text-black font-bold rounded-lg transition-colors shadow-lg shadow-neonBlue/20"
              >
                Get Started
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white p-1.5 rounded-lg"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-lightBg dark:bg-darkBg overflow-hidden"
            >
              <div className="px-4 py-4 space-y-3">
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center px-4 py-3 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center px-4 py-3 bg-neonBlue text-black font-bold rounded-lg shadow-lg shadow-neonBlue/20"
                >
                  Get Started
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-24 sm:pt-32 pb-16 sm:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05, rotate: -1 }}
            className="inline-block px-4 py-1 mb-6 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-300 cursor-default"
          >
            🚀 AI-Powered Career Growth Platform
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-7xl font-bold mb-6 sm:mb-8 leading-tight"
          >
            Supercharge Your <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-neonBlue via-purple-500 to-neonPurple">
              Career Trajectory
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-xl text-gray-600 dark:text-gray-400 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed px-2"
          >
            Unlock your potential with AI-driven resume analysis, personalized
            job recommendations, and a dynamic career roadmap designed just for
            you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-neonBlue to-neonPurple text-white font-bold rounded-xl shadow-lg shadow-neonBlue/20 flex items-center justify-center gap-2 text-base sm:text-lg group"
              >
                Start Your Journey{" "}
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </motion.button>
            </Link>
            <Link to="/login">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  borderColor: "#00f3ff",
                  color: "#00f3ff",
                }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-lightCardBg dark:bg-cardBg border border-gray-200 dark:border-gray-700 rounded-xl text-base sm:text-lg font-medium transition-colors"
              >
                Existing User? Login
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </header>

      {/* Video Intro Section */}
      <section className="py-12 sm:py-24 relative overflow-hidden backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              See CareerLytics in Action
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Watch how our platform transforms your job search experience in
              under 2 minutes.
            </p>
          </div>

          <motion.div
            whileHover={{
              scale: 1.02,
              boxShadow: "0 20px 50px -12px rgba(0, 243, 255, 0.25)",
            }}
            transition={{ duration: 0.3 }}
            className="relative max-w-4xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 group bg-black/5 dark:bg-white/5 backdrop-blur-md"
          >
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/VBD4CEO1XY4?si=v4uhnbmmiqWO4dFc"
              title="CareerLytics Intro"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 sm:py-24 relative backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our comprehensive suite of tools ensures you're always one step
              ahead in your career.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <FeatureCard
              icon={<Upload className="text-neonBlue" size={32} />}
              title="Smart Resume Analysis"
              description="Get instant, detailed feedback on your resume with our advanced ATS scoring engine."
              delay={0.1}
            />
            <FeatureCard
              icon={<FileText className="text-pink-500" size={32} />}
              title="Pro Resume Builder"
              description="Create stunning, ATS-friendly resumes in minutes with our professional templates."
              delay={0.15}
            />
            <FeatureCard
              icon={<Briefcase className="text-neonPurple" size={32} />}
              title="Curated Job Matches"
              description="Stop searching endlessly. We bring jobs that perfectly match your skills and experience."
              delay={0.2}
            />
            <FeatureCard
              icon={<Map className="text-green-400" size={32} />}
              title="Dynamic Career Path"
              description="Visualize your future. See exactly what skills you need to reach the next level."
              delay={0.25}
            />
            <FeatureCard
              icon={<Users className="text-yellow-400" size={32} />}
              title="Interview Prep Hub"
              description="Master your interviews with curated questions, tips, and mock scenarios."
              delay={0.3}
            />
            <FeatureCard
              icon={<BookOpen className="text-red-400" size={32} />}
              title="Learning Resources"
              description="Access top-tier courses, tutorials, and guides to upskill and stay competitive."
              delay={0.35}
            />
          </div>
        </div>
      </section>

      {/* User Stories Video Section */}
      <section className="py-12 sm:py-24 relative backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Success Stories
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Hear directly from professionals who landed their dream jobs using
              CareerLytics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {/* YouTube Shorts Embeds */}
            <motion.div
              whileHover={{ y: -10, scale: 1.02 }}
              className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800 h-[350px] sm:h-[450px] md:h-[500px] bg-black/5 dark:bg-white/5 backdrop-blur-md"
            >
              <iframe
                className="w-full h-full"
                src="" //short 1
                title="User Story 1"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
            <motion.div
              whileHover={{ y: -10, scale: 1.02 }}
              className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800 h-[350px] sm:h-[450px] md:h-[500px] bg-black/5 dark:bg-white/5 backdrop-blur-md"
            >
              <iframe
                className="w-full h-full"
                src="" //short 2
                title="User Story 2"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
            <motion.div
              whileHover={{ y: -10, scale: 1.02 }}
              className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800 h-[350px] sm:h-[450px] md:h-[500px] bg-black/5 dark:bg-white/5 backdrop-blur-md"
            >
              <iframe
                className="w-full h-full"
                src="" //short 3
                title="User Story 3"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-12 sm:py-24 relative backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
                How It Works
              </h2>
              <div className="space-y-8">
                <WorkflowStep
                  number="01"
                  title="Upload Your Resume"
                  description="Simply drag and drop your PDF resume. Our secure parser extracts all key details in seconds."
                />
                <WorkflowStep
                  number="02"
                  title="Get Instant Analysis"
                  description="Receive a comprehensive report with your ATS score, missing keywords, and improvement tips."
                />
                <WorkflowStep
                  number="03"
                  title="Explore Opportunities"
                  description="Browse tailored job recommendations and follow a personalized roadmap to your dream role."
                />
              </div>
            </div>

            {/* Dashboard Graphic */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative perspective-1000"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-neonBlue to-neonPurple rounded-2xl blur-3xl opacity-20 animate-pulse"></div>

              <motion.div
                whileHover={{ scale: 1.02, rotateY: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative bg-white dark:bg-cardBg rounded-2xl p-2 shadow-2xl border border-gray-200 dark:border-gray-800 transform-style-3d"
              >
                {/* Browser Window Header */}
                <div className="bg-gray-100 dark:bg-gray-800 rounded-t-xl px-4 py-3 flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>

                {/* Dashboard Content */}
                <div className="bg-blue-50/50 dark:bg-gray-900/50 p-6 rounded-b-xl">
                  <div className="flex gap-6 mb-6">
                    {/* Resume Icon */}
                    <motion.div
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="bg-white dark:bg-cardBg p-4 rounded-xl shadow-sm border border-blue-100 dark:border-gray-700 w-1/3 flex items-center justify-center relative overflow-hidden group"
                    >
                      <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 group-hover:h-full group-hover:opacity-10 transition-all duration-300"></div>
                      <FileText
                        size={48}
                        className="text-blue-500 relative z-10"
                      />
                      <div className="absolute bottom-4 w-12 h-1 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                      <div className="absolute bottom-2 w-8 h-1 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    </motion.div>

                    {/* Analysis Panel */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-white dark:bg-cardBg p-4 rounded-xl shadow-sm border border-blue-100 dark:border-gray-700 flex-1"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        {/* Gauge Chart */}
                        <div className="relative w-20 h-20 flex items-center justify-center">
                          <svg className="w-full h-full transform -rotate-90">
                            <circle
                              cx="40"
                              cy="40"
                              r="36"
                              stroke="currentColor"
                              strokeWidth="8"
                              fill="transparent"
                              className="text-gray-200 dark:text-gray-700"
                            />
                            <motion.circle
                              initial={{ strokeDashoffset: 226.2 }}
                              whileInView={{ strokeDashoffset: 45.24 }}
                              transition={{ duration: 1.5, delay: 0.5 }}
                              cx="40"
                              cy="40"
                              r="36"
                              stroke="currentColor"
                              strokeWidth="8"
                              fill="transparent"
                              strokeDasharray="226.2"
                              className="text-green-500"
                            />
                          </svg>
                          <div className="absolute text-center">
                            <motion.span
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 1 }}
                              transition={{ delay: 1 }}
                              className="text-lg font-bold text-gray-800 dark:text-white"
                            >
                              85
                            </motion.span>
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-800 dark:text-white">
                            ATS Score
                          </div>
                          <div className="text-xs text-green-500 font-medium">
                            Excellent
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="text-xs font-semibold text-gray-500 mb-1">
                            Missing Keywords:
                          </div>
                          <div className="flex flex-wrap gap-1">
                            <motion.span
                              whileHover={{ scale: 1.1 }}
                              className="px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-[10px] rounded-full font-medium cursor-default"
                            >
                              Python
                            </motion.span>
                            <motion.span
                              whileHover={{ scale: 1.1 }}
                              className="px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-[10px] rounded-full font-medium cursor-default"
                            >
                              SQL
                            </motion.span>
                          </div>
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-gray-500 mb-1">
                            Improvement Tips:
                          </div>
                          <div className="space-y-1">
                            <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full w-full"></div>
                            <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full w-3/4"></div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Bottom Bars */}
                  <div className="space-y-3">
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="bg-cyan-100 dark:bg-cyan-900/30 p-3 rounded-lg flex items-center justify-between cursor-default"
                    >
                      <span className="text-sm font-medium text-cyan-800 dark:text-cyan-300">
                        Skills Analysis
                      </span>
                      <div className="w-24 h-2 bg-cyan-200 dark:bg-cyan-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: "80%" }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full bg-cyan-500"
                        ></motion.div>
                      </div>
                    </motion.div>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg flex items-center justify-between cursor-default"
                    >
                      <span className="text-sm font-medium text-purple-800 dark:text-purple-300">
                        Keyword Match
                      </span>
                      <div className="w-24 h-2 bg-purple-200 dark:bg-purple-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: "65%" }}
                          transition={{ duration: 1, delay: 0.7 }}
                          className="h-full bg-purple-500"
                        ></motion.div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Meet the Developers Section */}
      <section className="py-12 sm:py-24 relative backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
            >
              Meet the{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-neonBlue to-neonPurple">
                Developers
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              The creative minds behind CareerLytics — passionate about building
              innovative solutions that transform careers.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Developer 1 - Md Shahzad */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{
                y: -10,
                boxShadow: "0 25px 50px -12px rgba(0, 243, 255, 0.25)",
              }}
              className="bg-lightCardBg dark:bg-cardBg p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-800 hover:border-neonBlue transition-all duration-300 text-center group relative overflow-hidden"
            >
              {/* Glow Effect */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neonBlue to-neonPurple transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

              {/* Profile Image with Gradient Ring Frame */}
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto mb-8">
                {/* Outer Gradient Ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neonBlue via-purple-500 to-neonPurple p-1 animate-pulse group-hover:animate-none">
                  <div className="w-full h-full rounded-full bg-lightCardBg dark:bg-cardBg"></div>
                </div>
                {/* Inner Image Container */}
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  className="absolute inset-2 rounded-full overflow-hidden border-4 border-neonBlue/50 group-hover:border-neonBlue shadow-2xl shadow-neonBlue/30 transition-all duration-300"
                >
                  <img
                    src="/shahzad.png"
                    alt="Md Shahzad"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold mb-2 group-hover:text-neonBlue transition-colors">
                Md Shahzad
              </h3>
              <p className="text-sm sm:text-base text-neonPurple font-semibold mb-3">
                Agentic Full Stack Developer
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Passionate about building AI-powered solutions that empower careers
                and transform the job search experience.
              </p>

              {/* Social Links */}
              <div className="flex justify-center gap-3 mt-6">
                <a
                  href="https://www.linkedin.com/in/md-shahzad-663b98292/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:bg-[#0077b5] hover:text-white transition-all duration-300"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="https://www.instagram.com/mr_shazzu_04"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-red-500 hover:to-purple-500 hover:text-white transition-all duration-300"
                >
                  <Instagram size={18} />
                </a>
              </div>
            </motion.div>

            {/* Developer 2 - Bishal Kumar Patel */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{
                y: -10,
                boxShadow: "0 25px 50px -12px rgba(168, 85, 247, 0.25)",
              }}
              className="bg-lightCardBg dark:bg-cardBg p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-800 hover:border-neonPurple transition-all duration-300 text-center group relative overflow-hidden"
            >
              {/* Glow Effect */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neonPurple to-neonBlue transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

              {/* Profile Image with Gradient Ring Frame */}
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto mb-8">
                {/* Outer Gradient Ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neonPurple via-pink-500 to-neonBlue p-1 animate-pulse group-hover:animate-none">
                  <div className="w-full h-full rounded-full bg-lightCardBg dark:bg-cardBg"></div>
                </div>
                {/* Inner Image Container */}
                <motion.div
                  whileHover={{ scale: 1.05, rotate: -2 }}
                  className="absolute inset-2 rounded-full overflow-hidden border-4 border-neonPurple/50 group-hover:border-neonPurple shadow-2xl shadow-neonPurple/30 transition-all duration-300"
                >
                  <img
                    src="/bishal.png"
                    alt="Bishal Kumar Patel"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold mb-2 group-hover:text-neonPurple transition-colors">
                Bishal Kumar Patel
              </h3>
              <p className="text-sm sm:text-base text-neonBlue font-semibold mb-3">
                Agentic Full Stack Developer
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Dedicated to crafting intuitive user experiences and robust
                backend systems that drive career success.
              </p>

              {/* Social Links */}
              <div className="flex justify-center gap-3 mt-6">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:bg-[#0077b5] hover:text-white transition-all duration-300"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-red-500 hover:to-purple-500 hover:text-white transition-all duration-300"
                >
                  <Instagram size={18} />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact & Footer Section */}
      <section className="py-12 sm:py-24 relative overflow-hidden backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-16">
          <div>
            <h2 className="text-2xl sm:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-neonBlue to-neonPurple">
              Get in Touch
            </h2>
            <p className="text-base sm:text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              Have questions or feedback? We'd love to hear from you. Fill out
              the form and we'll get back to you shortly.
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 group cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-neonBlue/10 flex items-center justify-center text-neonBlue group-hover:bg-neonBlue group-hover:text-white transition-all duration-300">
                  <Mail size={24} />
                </div>
                <span className="text-lg group-hover:text-neonBlue transition-colors">
                  mrshahzad1011@gmail.com
                </span>
              </div>
              <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 group cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-neonPurple/10 flex items-center justify-center text-neonPurple group-hover:bg-neonPurple group-hover:text-white transition-all duration-300">
                  <MapPin size={24} />
                </div>
                <span className="text-lg group-hover:text-neonPurple transition-colors">
                  Hebbal, Bengaluru, 560024
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6">Connect with us</h3>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/mr_shazzu_04?igsh=OHowdjJ5OGxyMmc3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-red-500 hover:to-purple-500 hover:text-white transition-all duration-300 transform hover:scale-110"
                >
                  <Instagram size={24} />
                </a>
                <a
                  href="https://x.com/MdShahzad078?s=09"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-110"
                >
                  <Twitter size={24} />
                </a>
                <a
                  href="https://www.linkedin.com/in/md-shahzad-663b98292/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-[#0077b5] hover:text-white transition-all duration-300 transform hover:scale-110"
                >
                  <Linkedin size={24} />
                </a>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="bg-white/80 dark:bg-cardBg/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 relative overflow-hidden group min-h-[500px] flex items-center justify-center"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-neonBlue/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all duration-500 group-hover:bg-neonBlue/20 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-neonPurple/10 rounded-full blur-3xl -ml-16 -mb-16 transition-all duration-500 group-hover:bg-neonPurple/20 animate-pulse"></div>

            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-center relative z-10"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30"
                  >
                    <Check size={40} className="text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Thanks for reaching out. We'll get back to you shortly.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setStatus("idle")}
                    className="mt-8 px-6 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
                  >
                    Send another message
                  </motion.button>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6 relative z-10 w-full"
                >
                  <motion.div
                    whileFocusWithin={{ scale: 1.02 }}
                    className="relative"
                  >
                    <input
                      type="text"
                      id="name"
                      required
                      value={formState.name}
                      onChange={(e) =>
                        setFormState({ ...formState, name: e.target.value })
                      }
                      className="peer w-full px-4 py-3 rounded-xl bg-gray-50/50 dark:bg-gray-900/50 border-2 border-gray-100 dark:border-gray-800 focus:border-neonBlue focus:ring-0 outline-none transition-all placeholder-transparent"
                      placeholder="Name"
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-4 -top-2.5 bg-transparent px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-neonBlue peer-focus:text-sm"
                    >
                      Name
                    </label>
                  </motion.div>

                  <motion.div
                    whileFocusWithin={{ scale: 1.02 }}
                    className="relative"
                  >
                    <input
                      type="email"
                      id="email"
                      required
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({ ...formState, email: e.target.value })
                      }
                      className="peer w-full px-4 py-3 rounded-xl bg-gray-50/50 dark:bg-gray-900/50 border-2 border-gray-100 dark:border-gray-800 focus:border-neonBlue focus:ring-0 outline-none transition-all placeholder-transparent"
                      placeholder="Email"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-4 -top-2.5 bg-transparent px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-neonBlue peer-focus:text-sm"
                    >
                      Email
                    </label>
                  </motion.div>

                  <motion.div
                    whileFocusWithin={{ scale: 1.02 }}
                    className="relative"
                  >
                    <textarea
                      id="message"
                      rows="4"
                      required
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                      className="peer w-full px-4 py-3 rounded-xl bg-gray-50/50 dark:bg-gray-900/50 border-2 border-gray-100 dark:border-gray-800 focus:border-neonBlue focus:ring-0 outline-none transition-all placeholder-transparent"
                      placeholder="Message"
                    ></textarea>
                    <label
                      htmlFor="message"
                      className="absolute left-4 -top-2.5 bg-transparent px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-neonBlue peer-focus:text-sm"
                    >
                      Message
                    </label>
                  </motion.div>

                  <motion.button
                    whileHover={{ scale: 1.02, translateY: -2 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full py-4 bg-gradient-to-r from-neonBlue to-neonPurple text-white font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-neonBlue/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {status === "submitting" ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800 bg-lightBg dark:bg-darkBg">
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-6 px-4">
          <motion.a
            whileHover={{ scale: 1.1, color: "#00f3ff" }}
            href="#"
            className="transition-colors font-medium"
          >
            Privacy Policy
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1, color: "#00f3ff" }}
            href="#"
            className="transition-colors font-medium"
          >
            Terms of Service
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1, color: "#00f3ff" }}
            href="#"
            className="transition-colors font-medium"
          >
            Contact
          </motion.a>
        </div>
        <p>© 2025 CareerLytics. All rights reserved.</p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{
      y: -10,
      boxShadow: "0 20px 40px -10px rgba(0, 243, 255, 0.15)",
    }}
    className="bg-lightCardBg dark:bg-cardBg p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 hover:border-neonBlue transition-all duration-300 group"
  >
    <div className="mb-6 w-16 h-16 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:bg-neonBlue/10">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-4 group-hover:text-neonBlue transition-colors">
      {title}
    </h3>
    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
      {description}
    </p>
  </motion.div>
);

const WorkflowStep = ({ number, title, description }) => (
  <motion.div
    whileHover={{ x: 10 }}
    className="flex gap-6 group cursor-default"
  >
    <div className="text-4xl font-bold text-gray-200 dark:text-gray-800 group-hover:text-neonBlue/20 transition-colors duration-300">
      {number}
    </div>
    <div>
      <h3 className="text-xl font-bold mb-2 group-hover:text-neonBlue transition-colors duration-300">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  </motion.div>
);

export default LandingPage;
