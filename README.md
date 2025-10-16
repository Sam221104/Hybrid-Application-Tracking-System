# TrackFlow – Hybrid Application Tracking System

## Overview

TrackFlow is a modern, full-stack Hybrid Application Tracking System (ATS) designed to streamline job application management for both applicants and organizations. It provides centralized tracking, instant status updates, resume previews, and actionable insights through interactive dashboards.

---

## Architecture

**Monorepo Structure:**
```
HybridATS/
├── backend/      # Node.js + Express REST API
│   ├── .env
│   ├── .gitignore
│   ├── createUser.js
│   ├── package.json
│   ├── server.js
│   ├── vite.config.js
│   ├── controllers/
│   │   ├── applicationsController.js
│   │   ├── authController.js
│   │   ├── botController.js
│   │   ├── jobsController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Application.js
│   │   ├── Jobs.js
│   │   ├── Logs.js
│   │   └── User.js
│   ├── routes/
│   │   ├── applications.js
│   │   ├── auth.js
│   │   ├── bot.js
│   │   └── jobs.js
│   └── uploads/
│       └── resumes/
├── client/
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── README.md
│   ├── tailwind.config.js
│   ├── vite.config copy.js
│   ├── vite.config.js
│   ├── public/
│   └── src/
│       ├── .env
│       ├── App.css
│       ├── App.jsx
│       ├── AuthContext.jsx
│       ├── index.css
│       ├── main.jsx
│       ├── api/
│       │   └── index.js
│       ├── assets/
│       ├── components/
│       │   ├── LandingPage.jsx
│       │   ├── SignIn.jsx
│       │   ├── SignUp.jsx
│       │   └── TypeWriterText.jsx
│       └── dashboards/
│           ├── Admin.jsx
│           ├── Applicant.jsx
│           └── BotDashboard.jsx
```

- **Backend:**  
  - Node.js, Express, MongoDB  
  - RESTful APIs for jobs, applications, authentication  
  - File uploads for resumes  
  - Role-based access and audit logging
  - **Automated Bot System:** For technical job roles, an intelligent bot automatically tracks application status, updates progress, and manages workflow steps, reducing manual effort and increasing efficiency.

- **Frontend:**  
  - React (Vite) + Tailwind CSS  
  - Dashboards for applicants, admins  
  - Real-time status updates, resume preview  
  - Insights & analytics with charts and stats

---

## Setup Instructions

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB (local or cloud)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/HybridATS.git
cd HybridATS
```

### 2. Backend Setup

```bash
cd backend
npm install
# Configure your MongoDB URI and other secrets in .env
cp .env.example .env
npm start
```
- The backend runs on `http://localhost:4000` by default.

### 3. Frontend Setup

```bash
cd ../client
npm install
npm run dev
```
- The frontend runs on `http://localhost:5173` by default.

---

## Workflow Instructions

### Applicant Workflow

1. **Sign Up / Sign In:**  
   Create an account or log in.

2. **Browse Jobs:**  
   View available jobs with details.

3. **Apply:**  
   Submit applications with cover letter and resume upload.

4. **Track Progress:**  
   View status updates, interview invites, and feedback.

5. **Insights:**  
   Visualize your application stats, interview rates, and success metrics.

### Admin Workflow

1. **Sign In:**  
   Access the admin dashboard.

2. **Manage Jobs:**  
   Post new jobs, edit, or remove listings.

3. **Review Applications:**  
   View applicant details, resumes, and update statuses.

4. **Audit & Logs:**  
   Monitor all actions and maintain transparency.

### Automated Bot Workflow

- For technical job postings, TrackFlow’s automated bot system monitors applications, updates statuses, and manages interview scheduling automatically.  
- The bot reduces manual intervention, ensures timely updates, and improves accuracy for technical hiring processes.

---

## Features

- Centralized application management
- Transparent status updates
- Resume preview and download
- Performance insights and analytics
- Secure file uploads
- Role-based dashboards
- Full audit trail
- **Automated bot for technical roles**

---

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB, Multer
- **Icons & Charts:** Lucide-react, Chart.js (or similar)

---

## Contributing

1. Fork the repo
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push and create a pull request

---

## License

MIT

---

## Contact

For support or questions, open an issue or contact [your-email@example.com](mailto:your-email@example.com).