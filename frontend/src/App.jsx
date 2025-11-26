import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ResumeProvider } from './context/ResumeContext';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import ResumePage from './pages/ResumePage';
import JobPage from './pages/JobPage';
import CareerPathPage from './pages/CareerPathPage';
import InterviewPrep from './pages/InterviewPrep';
import Resources from './pages/Resources';
import Feedback from './pages/Feedback';
import ResumeBuilder from './pages/ResumeBuilder';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ResumeProvider>
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/resume" element={<ResumePage />} />
                <Route path="/resume-builder" element={<ResumeBuilder />} />
                <Route path="/jobs" element={<JobPage />} />
                <Route path="/career-path" element={<CareerPathPage />} />
                <Route path="/interview-prep" element={<InterviewPrep />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/feedback" element={<Feedback />} />
              </Route>

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </ResumeProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
