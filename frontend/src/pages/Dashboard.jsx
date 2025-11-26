import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { FileText, Briefcase, Award, Download, CheckCircle, BookOpen } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const dashboardRef = useRef(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/api/dashboard/stats', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const downloadReport = async () => {
    const element = dashboardRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('careerlytics_report.pdf');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin w-12 h-12 border-4 border-neonBlue border-t-transparent rounded-full"></div>
      </div>
    );
  }

  const scoreData = {
    labels: stats?.recentScores?.map((_, i) => `Resume ${i + 1}`) || [],
    datasets: [
      {
        label: 'ATS Score History',
        data: stats?.recentScores || [],
        borderColor: '#00f3ff',
        backgroundColor: 'rgba(0, 243, 255, 0.2)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const skillData = {
    labels: Object.keys(stats?.skillDistribution || {}),
    datasets: [
      {
        label: 'Skill Frequency',
        data: Object.values(stats?.skillDistribution || {}),
        backgroundColor: '#bc13fe',
        borderRadius: 5,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: '#888' }
      },
    },
    scales: {
      y: {
        ticks: { color: '#888' },
        grid: { color: 'rgba(128, 128, 128, 0.1)' }
      },
      x: {
        ticks: { color: '#888' },
        grid: { color: 'rgba(128, 128, 128, 0.1)' }
      }
    }
  };

  return (
    <motion.div
      ref={dashboardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 p-4"
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neonBlue to-neonPurple">
            Dashboard Overview
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Track your progress and career growth</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: '#22d3ee' }}
          whileTap={{ scale: 0.95 }}
          onClick={downloadReport}
          className="flex items-center gap-2 px-6 py-3 bg-neonBlue text-black font-bold rounded-xl transition-all shadow-lg shadow-neonBlue/20"
        >
          <Download size={20} /> Download Report
        </motion.button>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard 
          icon={<FileText size={32} />} 
          title="Resumes Analyzed" 
          value={stats?.totalResumesAnalyzed || 0} 
          color="text-neonBlue" 
          bgColor="bg-neonBlue/10" 
        />
        <StatsCard 
          icon={<Award size={32} />} 
          title="Average ATS Score" 
          value={stats?.averageAtsScore || 0} 
          color="text-neonPurple" 
          bgColor="bg-neonPurple/10" 
        />
        <StatsCard 
          icon={<Briefcase size={32} />} 
          title="Jobs Recommended" 
          value={stats?.jobsRecommended || 0} 
          color="text-green-500" 
          bgColor="bg-green-500/10" 
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div 
          whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0, 243, 255, 0.1)" }}
          className="bg-lightCardBg dark:bg-cardBg p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm transition-all duration-300"
        >
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Award className="text-neonBlue" size={20} /> Performance Trend
          </h3>
          <Line data={scoreData} options={chartOptions} />
        </motion.div>

        <motion.div 
          whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(188, 19, 254, 0.1)" }}
          className="bg-lightCardBg dark:bg-cardBg p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm transition-all duration-300"
        >
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <BookOpen className="text-neonPurple" size={20} /> Top Skills
          </h3>
          <Bar data={skillData} options={chartOptions} />
        </motion.div>
      </div>

      {/* Improvement Checklist */}
      <div className="bg-lightCardBg dark:bg-cardBg p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
        <h3 className="text-xl font-bold mb-6">Improvement Checklist</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CheckItem text="Add more keywords to your resume" completed={stats?.averageAtsScore > 70} />
          <CheckItem text="Quantify your achievements" completed={stats?.averageAtsScore > 80} />
          <CheckItem text="Include a summary section" completed={true} />
          <CheckItem text="Check for formatting errors" completed={stats?.averageAtsScore > 60} />
        </div>
      </div>
    </motion.div>
  );
};

const StatsCard = ({ icon, title, value, color, bgColor }) => (
  <motion.div 
    whileHover={{ scale: 1.02, y: -5, borderColor: color === 'text-neonBlue' ? '#00f3ff' : color === 'text-neonPurple' ? '#bc13fe' : '#22c55e' }}
    className="bg-lightCardBg dark:bg-cardBg p-6 rounded-2xl border border-gray-200 dark:border-gray-800 flex items-center gap-4 shadow-sm transition-all duration-300 group"
  >
    <div className={`p-4 ${bgColor} rounded-xl ${color} group-hover:scale-110 transition-transform duration-300`}>
      {icon}
    </div>
    <div>
      <p className="text-gray-500 dark:text-gray-400 font-medium">{title}</p>
      <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
    </div>
  </motion.div>
);

const CheckItem = ({ text, completed }) => (
  <motion.div 
    whileHover={{ scale: 1.02, x: 5 }}
    className="flex items-center gap-3 p-4 bg-lightBg dark:bg-darkBg rounded-xl border border-gray-200 dark:border-gray-700 hover:border-neonBlue/50 transition-colors cursor-default"
  >
    <div className={`p-1 rounded-full ${completed ? 'bg-green-500 text-white' : 'bg-gray-300 dark:bg-gray-600 text-gray-500'}`}>
      <CheckCircle size={16} />
    </div>
    <span className={completed ? 'text-gray-900 dark:text-white' : 'text-gray-500'}>{text}</span>
  </motion.div>
);

export default Dashboard;
