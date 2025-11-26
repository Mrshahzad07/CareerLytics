import { useState } from 'react';
import axios from 'axios';
import { FileText, Upload, AlertCircle } from 'lucide-react';
import { useResume } from '../context/ResumeContext';

const ResumeUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const { setResume } = useResume();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Check file type
      if (selectedFile.type === 'application/pdf' || 
          selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setFile(selectedFile);
        setError('');
      } else {
        setFile(null);
        setError('Please upload a PDF or DOCX file');
      }
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8080/api/resume/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      
      setResume(response.data); // Update global context
      
      if (onUploadSuccess) {
        onUploadSuccess(response.data);
      }
      setFile(null);
    } catch (err) {
      console.error(err);
      if (!err.response) {
        setError('Network Error: Cannot connect to server. Is the backend running?');
      } else {
        setError(err.response?.data?.message || 'Upload failed. Please try again.');
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-lightCardBg dark:bg-cardBg p-8 rounded-xl border border-gray-200 dark:border-gray-800 text-center shadow-sm transition-colors duration-300">
      <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 mb-6 hover:border-neonBlue dark:hover:border-neonBlue transition-colors relative">
        <input
          type="file"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          accept=".pdf,.docx"
        />
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-neonBlue">
            {file ? <FileText size={32} /> : <Upload size={32} />}
          </div>
          <div>
            <p className="text-lg font-medium text-gray-900 dark:text-white">
              {file ? file.name : 'Drag & Drop or Click to Upload'}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Supports PDF & DOCX (Max 5MB)
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="flex items-center justify-center gap-2 text-red-500 mb-4">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className={`w-full py-3 rounded-lg font-bold transition-all ${
          !file || uploading
            ? 'bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-neonBlue to-neonPurple text-white hover:opacity-90 shadow-lg shadow-neonBlue/20'
        }`}
      >
        {uploading ? 'Analyzing...' : 'Analyze Resume'}
      </button>
    </div>
  );
};

export default ResumeUpload;
