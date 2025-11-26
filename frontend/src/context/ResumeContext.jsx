import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const ResumeContext = createContext();

export const useResume = () => useContext(ResumeContext);

export const ResumeProvider = ({ children }) => {
  const { user } = useAuth();
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load resume from local storage or fetch from backend on mount
  useEffect(() => {
    const loadResume = async () => {
      if (user?.token) {
        try {
          // Try to get from local storage first for speed
          const storedResume = localStorage.getItem('resumeData');
          if (storedResume) {
            setResumeData(JSON.parse(storedResume));
          }

          // Optionally fetch latest from backend
          // const response = await axios.get('http://localhost:8080/api/resume/user', ...);
        } catch (error) {
          console.error("Failed to load resume data", error);
        }
      } else {
        setResumeData(null);
      }
    };
    loadResume();
  }, [user]);

  const setResume = (data) => {
    setResumeData(data);
    localStorage.setItem('resumeData', JSON.stringify(data));
  };

  return (
    <ResumeContext.Provider value={{ resumeData, setResume, loading }}>
      {children}
    </ResumeContext.Provider>
  );
};
