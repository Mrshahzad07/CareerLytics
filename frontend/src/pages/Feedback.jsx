import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Star, Send, Heart, Sparkles, CheckCircle } from 'lucide-react';
import api from '../api';

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const token = localStorage.getItem('token');
      // Mock endpoint for now, or real if backend is ready
      // await api.post('/api/feedback', formData, { headers: { Authorization: `Bearer ${token}` } });
      
      // Simulate network delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatus('success');
      setFormData({ name: '', email: '', rating: 5, message: '' });
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

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
      className="max-w-2xl mx-auto px-2 sm:px-0 relative"
    >
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-neonBlue/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-neonPurple/5 rounded-full blur-3xl -z-10" />

      {/* Hero Section */}
      <motion.div variants={itemVariants} className="text-center mb-6 sm:mb-10">
        <motion.div 
          className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-neonBlue to-neonPurple rounded-2xl mb-4 sm:mb-6 shadow-xl shadow-neonPurple/30"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200 }}
          whileHover={{ rotate: 10, scale: 1.1 }}
        >
          <Heart size={32} className="text-white" />
        </motion.div>
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-neonBlue to-neonPurple">
          We Value Your Feedback
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-lg px-2">
          Help us improve CareerLytics by sharing your thoughts and suggestions.
        </p>
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="bg-lightCardBg dark:bg-cardBg p-4 sm:p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl relative overflow-hidden"
      >
        {/* Decorative gradient */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-neonBlue to-neonPurple" />
        
        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center py-10"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30">
                  <CheckCircle size={40} />
                </div>
              </motion.div>
              <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">Your feedback has been submitted successfully.</p>
              <motion.button
                onClick={() => setStatus('idle')}
                className="px-6 py-3 bg-gradient-to-r from-neonBlue to-neonPurple text-white font-bold rounded-xl hover:opacity-90 transition-all shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Submit Another
              </motion.button>
            </motion.div>
          ) : (
            <motion.form 
              key="form"
              onSubmit={handleSubmit} 
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
                <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-lightBg dark:bg-darkBg border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:border-neonBlue focus:ring-2 focus:ring-neonBlue/20 outline-none transition-all"
                    placeholder="Your Name"
                  />
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-lightBg dark:bg-darkBg border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:border-neonBlue focus:ring-2 focus:ring-neonBlue/20 outline-none transition-all"
                    placeholder="your@email.com"
                  />
                </motion.div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Rating</label>
                <div className="flex gap-1 sm:gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(0)}
                      className={`p-2 rounded-xl transition-all ${
                        (hoveredStar || formData.rating) >= star 
                          ? 'text-yellow-400 bg-yellow-400/10' 
                          : 'text-gray-400 dark:text-gray-600'
                      }`}
                      whileHover={{ scale: 1.2, rotate: 15 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Star 
                        size={32} 
                        fill={(hoveredStar || formData.rating) >= star ? "currentColor" : "none"} 
                      />
                    </motion.button>
                  ))}
                  <span className="ml-3 text-sm text-gray-500 self-center">
                    {formData.rating === 5 ? "Excellent!" : formData.rating === 4 ? "Great!" : formData.rating === 3 ? "Good" : formData.rating === 2 ? "Fair" : "Poor"}
                  </span>
                </div>
              </div>

              <motion.div whileHover={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 300 }}>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Feedback</label>
                <textarea
                  required
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-lightBg dark:bg-darkBg border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:border-neonBlue focus:ring-2 focus:ring-neonBlue/20 outline-none transition-all resize-none"
                  placeholder="Tell us what you think about CareerLytics..."
                ></textarea>
              </motion.div>

              <motion.button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-3 sm:py-4 bg-gradient-to-r from-neonBlue to-neonPurple text-white font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-neonBlue/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base group"
                whileHover={{ scale: 1.02, boxShadow: "0 10px 40px -10px rgba(0, 243, 255, 0.4)" }}
                whileTap={{ scale: 0.98 }}
              >
                {status === 'submitting' ? (
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                ) : (
                  <>
                    Submit Feedback 
                    <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Trust badges */}
      <motion.div 
        variants={itemVariants}
        className="flex justify-center gap-6 mt-8 text-gray-500 dark:text-gray-400 text-sm"
      >
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-neonBlue" />
          <span>100% Anonymous</span>
        </div>
        <div className="flex items-center gap-2">
          <Heart size={16} className="text-neonPurple" />
          <span>We appreciate you</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Feedback;
