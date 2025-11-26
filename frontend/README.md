# CareerLytics 🚀

**AI-Powered Career Growth Platform**

CareerLytics is a comprehensive web application designed to empower users in their career journey. It combines AI-driven insights with practical tools to help users build professional resumes, discover career paths, and find relevant job opportunities.

![CareerLytics Banner](https://via.placeholder.com/1200x400?text=CareerLytics+Dashboard) *<!-- Replace with actual screenshot -->*

## ✨ Key Features

### 📄 AI Resume Builder
- **ATS-Friendly**: Generates resumes optimized for Applicant Tracking Systems.
- **Real-time Preview**: See changes instantly as you type.
- **PDF Download**: Native, high-quality PDF export using browser print functionality.
- **Smart Suggestions**: AI-driven tips to improve your resume content (planned).

### 🗺️ Career Path Analysis
- **Personalized Roadmap**: Visualizes potential career progressions based on your skills and interests.
- **Skill Gap Analysis**: Identifies missing skills for your target role.
- **Learning Resources**: Suggests courses and materials to bridge skill gaps.

### 💼 Job Recommendations
- **Smart Matching**: Matches your profile with relevant job openings.
- **Market Insights**: Provides salary trends and demand analysis for various roles.

### 📊 Interactive Dashboard
- **Analytics**: Visualizes your application progress and skill growth.
- **Goal Tracking**: Set and monitor your career goals.

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React](https://react.dev/) (v19) with [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Chart.js](https://www.chartjs.org/) & [Recharts](https://recharts.org/)
- **PDF Generation**: Native `window.print()` with custom print styles

### Backend
- **Language**: Java
- **Framework**: Spring Boot
- **Database**: MySQL
- **Security**: JWT Authentication

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Java JDK (v17+)
- MySQL Server

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/careerlytics.git
    cd careerlytics
    ```

2.  **Frontend Setup**
    ```bash
    cd frontend
    npm install
    # Create .env file
    echo "VITE_API_URL=http://localhost:8080" > .env
    npm run dev
    ```

3.  **Backend Setup**
    - Configure your MySQL database in `application.properties`.
    - Run the Spring Boot application.

## 🌍 Deployment

### Frontend (Netlify)
The frontend is configured for easy deployment on Netlify.

1.  **Build the project**: `npm run build`
2.  **Deploy**: Drag and drop the `dist` folder to Netlify Drop.
3.  **Configuration**:
    - Ensure `netlify.toml` is present (handles SPA redirects).
    - Set `VITE_API_URL` in Netlify Site Settings to your deployed backend URL.

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License
This project is licensed under the MIT License.
