import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Star, Send } from 'lucide-react';
import api from '../api';

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-neonBlue to-neonPurple rounded-2xl mb-6 shadow-lg shadow-neonPurple/20">
          <MessageSquare size={32} className="text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-4">We Value Your Feedback</h1>
        <p className="text-gray-400 text-lg">
          Help us improve CareerLytics by sharing your thoughts and suggestions.
        </p>
      </div>

      <div className="bg-lightCardBg dark:bg-cardBg p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl">
        {status === 'success' ? (
          <div className="text-center py-10">
            <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
            <p className="text-gray-400 mb-6">Your feedback has been submitted successfully.</p>
            <button
              onClick={() => setStatus('idle')}
              className="px-6 py-2 bg-neonBlue text-black font-bold rounded-lg hover:bg-cyan-400 transition-colors"
            >
              Submit Another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-lightBg dark:bg-darkBg border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 focus:border-neonBlue focus:ring-1 focus:ring-neonBlue outline-none transition-all"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-lightBg dark:bg-darkBg border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 focus:border-neonBlue focus:ring-1 focus:ring-neonBlue outline-none transition-all"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className={`p-2 rounded-lg transition-colors ${
                      formData.rating >= star ? 'text-yellow-400' : 'text-gray-600'
                    }`}
                  >
                    <Star size={32} fill={formData.rating >= star ? "currentColor" : "none"} />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Feedback</label>
              <textarea
                required
                rows="4"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-lightBg dark:bg-darkBg border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 focus:border-neonBlue focus:ring-1 focus:ring-neonBlue outline-none transition-all resize-none"
                placeholder="Tell us what you think..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full py-4 bg-gradient-to-r from-neonBlue to-neonPurple text-white font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-neonBlue/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {status === 'submitting' ? (
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
              ) : (
                <>
                  Submit Feedback <Send size={20} />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </motion.div>
  );
};

export default Feedback;
