import { useState, useEffect, useRef } from 'react';
import api from '../api';
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
        const response = await api.get('/api/dashboard/stats', {
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
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    let yPos = margin;
    
    // Colors
    const primaryColor = [0, 243, 255]; // neonBlue
    const secondaryColor = [188, 19, 254]; // neonPurple
    const darkText = [30, 30, 30];
    const grayText = [100, 100, 100];
    
    // Helper function to add text
    const addText = (text, x, y, options = {}) => {
      const { fontSize = 12, color = darkText, fontStyle = 'normal', align = 'left' } = options;
      pdf.setFontSize(fontSize);
      pdf.setTextColor(...color);
      pdf.setFont('helvetica', fontStyle);
      pdf.text(text, x, y, { align });
      return y + (fontSize * 0.4);
    };
    
    // Header with gradient-like effect
    pdf.setFillColor(20, 20, 30);
    pdf.rect(0, 0, pageWidth, 45, 'F');
    
    // Load and add logo
    try {
      const logoImg = new Image();
      logoImg.crossOrigin = 'anonymous';
      logoImg.src = '/logo.png';
      await new Promise((resolve) => {
        logoImg.onload = resolve;
        logoImg.onerror = resolve;
      });
      
      // Create canvas to get base64
      const canvas = document.createElement('canvas');
      canvas.width = logoImg.width;
      canvas.height = logoImg.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(logoImg, 0, 0);
      const logoBase64 = canvas.toDataURL('image/png');
      
      // Add logo to PDF
      pdf.addImage(logoBase64, 'PNG', margin, 8, 28, 28);
    } catch (e) {
      console.log('Logo not loaded, using text fallback');
    }
    
    // Logo/Title
    pdf.setFontSize(24);
    pdf.setTextColor(...primaryColor);
    pdf.setFont('helvetica', 'bold');
    pdf.text('CareerLytics', margin + 32, 22);
    
    // Subtitle
    pdf.setFontSize(10);
    pdf.setTextColor(200, 200, 200);
    pdf.setFont('helvetica', 'normal');
    pdf.text('AI-Driven Insights', margin + 32, 30);
    
    // Date
    pdf.setFontSize(10);
    pdf.setTextColor(150, 150, 150);
    const date = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', month: 'long', day: 'numeric' 
    });
    pdf.text(date, pageWidth - margin, 35, { align: 'right' });
    
    yPos = 60;
    
    // Summary Section
    pdf.setFillColor(245, 247, 250);
    pdf.roundedRect(margin, yPos - 5, pageWidth - (margin * 2), 40, 3, 3, 'F');
    
    yPos = addText('Performance Summary', margin + 5, yPos + 5, { 
      fontSize: 16, fontStyle: 'bold', color: darkText 
    });
    yPos += 8;
    
    // Stats in a row
    const statsWidth = (pageWidth - (margin * 2) - 20) / 3;
    const statsData = [
      { label: 'Resumes Analyzed', value: stats?.totalResumesAnalyzed || 0, color: primaryColor },
      { label: 'Average ATS Score', value: stats?.averageAtsScore || 0, color: secondaryColor },
      { label: 'Jobs Recommended', value: stats?.jobsRecommended || 0, color: [34, 197, 94] }
    ];
    
    statsData.forEach((stat, index) => {
      const xPos = margin + 5 + (statsWidth * index) + (index * 10);
      pdf.setFontSize(24);
      pdf.setTextColor(...stat.color);
      pdf.setFont('helvetica', 'bold');
      pdf.text(String(stat.value), xPos + statsWidth / 2, yPos + 8, { align: 'center' });
      
      pdf.setFontSize(9);
      pdf.setTextColor(...grayText);
      pdf.setFont('helvetica', 'normal');
      pdf.text(stat.label, xPos + statsWidth / 2, yPos + 16, { align: 'center' });
    });
    
    yPos += 45;
    
    // ATS Score History Section
    yPos = addText('ATS Score History', margin, yPos, { 
      fontSize: 14, fontStyle: 'bold', color: darkText 
    });
    yPos += 5;
    
    // Draw score chart
    const scores = stats?.recentScores || [];
    if (scores.length > 0) {
      const chartHeight = 40;
      const chartWidth = pageWidth - (margin * 2);
      const barWidth = Math.min(30, chartWidth / scores.length - 5);
      
      scores.forEach((score, index) => {
        const barHeight = (score / 100) * chartHeight;
        const xPos = margin + (index * (barWidth + 10)) + 10;
        
        // Bar
        pdf.setFillColor(...primaryColor);
        pdf.roundedRect(xPos, yPos + chartHeight - barHeight, barWidth, barHeight, 2, 2, 'F');
        
        // Score label
        pdf.setFontSize(8);
        pdf.setTextColor(...darkText);
        pdf.text(String(score), xPos + barWidth / 2, yPos + chartHeight - barHeight - 3, { align: 'center' });
        
        // Resume label
        pdf.setFontSize(7);
        pdf.setTextColor(...grayText);
        pdf.text(`R${index + 1}`, xPos + barWidth / 2, yPos + chartHeight + 6, { align: 'center' });
      });
      yPos += chartHeight + 15;
    } else {
      yPos = addText('No resume data available yet.', margin, yPos + 5, { 
        fontSize: 10, color: grayText 
      });
      yPos += 10;
    }
    
    yPos += 10;
    
    // Skills Section
    yPos = addText('Top Skills Identified', margin, yPos, { 
      fontSize: 14, fontStyle: 'bold', color: darkText 
    });
    yPos += 8;
    
    const skills = Object.entries(stats?.skillDistribution || {});
    if (skills.length > 0) {
      skills.slice(0, 8).forEach(([skill, count], index) => {
        const barMaxWidth = 80;
        const barWidth = (count / Math.max(...Object.values(stats?.skillDistribution || {}))) * barMaxWidth;
        
        pdf.setFontSize(9);
        pdf.setTextColor(...darkText);
        pdf.text(skill, margin, yPos + 3);
        
        // Progress bar background
        pdf.setFillColor(230, 230, 230);
        pdf.roundedRect(margin + 50, yPos - 2, barMaxWidth, 6, 2, 2, 'F');
        
        // Progress bar fill
        pdf.setFillColor(...secondaryColor);
        pdf.roundedRect(margin + 50, yPos - 2, barWidth, 6, 2, 2, 'F');
        
        pdf.setFontSize(8);
        pdf.setTextColor(...grayText);
        pdf.text(String(count), margin + 55 + barMaxWidth, yPos + 3);
        
        yPos += 10;
      });
    } else {
      yPos = addText('No skills data available yet.', margin, yPos, { 
        fontSize: 10, color: grayText 
      });
    }
    
    yPos += 15;
    
    // Improvement Checklist
    yPos = addText('Improvement Checklist', margin, yPos, { 
      fontSize: 14, fontStyle: 'bold', color: darkText 
    });
    yPos += 8;
    
    const checklistItems = [
      { text: 'Add more keywords to your resume', completed: (stats?.averageAtsScore || 0) > 70 },
      { text: 'Quantify your achievements', completed: (stats?.averageAtsScore || 0) > 80 },
      { text: 'Include a summary section', completed: true },
      { text: 'Check for formatting errors', completed: (stats?.averageAtsScore || 0) > 60 }
    ];
    
    checklistItems.forEach((item) => {
      // Checkbox
      if (item.completed) {
        pdf.setFillColor(34, 197, 94);
        pdf.circle(margin + 3, yPos, 3, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(7);
        pdf.text('✓', margin + 1.5, yPos + 1.5);
      } else {
        pdf.setDrawColor(200, 200, 200);
        pdf.circle(margin + 3, yPos, 3, 'S');
      }
      
      pdf.setFontSize(10);
      pdf.setTextColor(...(item.completed ? darkText : grayText));
      pdf.text(item.text, margin + 10, yPos + 2);
      yPos += 10;
    });
    
    // Footer
    pdf.setFillColor(245, 247, 250);
    pdf.rect(0, pageHeight - 20, pageWidth, 20, 'F');
    pdf.setFontSize(8);
    pdf.setTextColor(...grayText);
    pdf.text('Generated by CareerLytics - Your Career Analytics Platform', pageWidth / 2, pageHeight - 10, { align: 'center' });
    
    pdf.save('CareerLytics_Report.pdf');
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
      className="space-y-6 sm:space-y-8 p-2 sm:p-4"
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neonBlue to-neonPurple">
            Dashboard Overview
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1 sm:mt-2">Track your progress and career growth</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: '#22d3ee' }}
          whileTap={{ scale: 0.95 }}
          onClick={downloadReport}
          className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-neonBlue text-black font-bold rounded-xl transition-all shadow-lg shadow-neonBlue/20 text-sm sm:text-base w-full sm:w-auto"
        >
          <Download size={18} /> Download Report
        </motion.button>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
        <motion.div 
          whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0, 243, 255, 0.1)" }}
          className="bg-lightCardBg dark:bg-cardBg p-4 sm:p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm transition-all duration-300"
        >
          <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
            <Award className="text-neonBlue" size={20} /> Performance Trend
          </h3>
          <Line data={scoreData} options={chartOptions} />
        </motion.div>

        <motion.div 
          whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(188, 19, 254, 0.1)" }}
          className="bg-lightCardBg dark:bg-cardBg p-4 sm:p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm transition-all duration-300"
        >
          <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
            <BookOpen className="text-neonPurple" size={20} /> Top Skills
          </h3>
          <Bar data={skillData} options={chartOptions} />
        </motion.div>
      </div>

      {/* Improvement Checklist */}
      <div className="bg-lightCardBg dark:bg-cardBg p-4 sm:p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
        <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Improvement Checklist</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
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
    className="bg-lightCardBg dark:bg-cardBg p-4 sm:p-6 rounded-2xl border border-gray-200 dark:border-gray-800 flex items-center gap-3 sm:gap-4 shadow-sm transition-all duration-300 group"
  >
    <div className={`p-3 sm:p-4 ${bgColor} rounded-xl ${color} group-hover:scale-110 transition-transform duration-300`}>
      {icon}
    </div>
    <div>
      <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 font-medium">{title}</p>
      <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
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
