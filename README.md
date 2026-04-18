AI Career Consultant Platform

AI Career Consultant Platform is a full-stack intelligent career guidance web application that analyzes user resumes, detects skill gaps, generates personalized career paths, and creates structured learning roadmaps using LLM-powered AI workflows.

The platform integrates Google Gemini AI with a modular backend architecture to dynamically generate actionable career strategies based on a user’s current skills and selected target role.

🌐 Live Deployment

Frontend
https://ai-career-consultant.netlify.app/

Backend API
https://ai-career-consultant-botp.onrender.com

GitHub Repository
https://github.com/kuldeep-singh-pro/ai-career-consultant

🎯 Platform Objective

The system helps users:

analyze their resume automatically
detect missing skills
evaluate match percentage with a target role
generate structured career paths
follow milestone-based roadmaps
track learning progress over time

It acts as a personalized AI-powered career strategy assistant.

🧠 Core Features
🔐 Authentication System

Secure user authentication with:

JWT-based login system
protected API routes
middleware-level access control
user-specific analysis isolation
persistent session handling

Each user's career analysis remains private and scoped to their account.

📄 Resume-Based Skill Extraction

Supports intelligent parsing of resumes using:

Gemini AI processing pipeline
structured skill extraction logic
experience detection
education metadata parsing
semantic content understanding

Transforms unstructured resume text into structured skill datasets.

📊 Skill Gap Analysis Engine

Compares extracted resume skills against selected target roles.

Provides:

missing skill detection
match percentage calculation
categorized improvement areas
readiness evaluation for selected role

Example:

Frontend Developer Readiness: 68%
Missing Skills: Redux, Testing, Performance Optimization
🛤 Career Path Generator

Generates structured milestone-based career progression plans using AI.

Includes:

ordered learning sequence
role-specific progression logic
prerequisite skill grouping
career stage mapping

Example structure:

Phase 1 → Core Fundamentals
Phase 2 → Intermediate Tools
Phase 3 → Advanced Production Skills
Phase 4 → Industry Readiness
🗺 Roadmap Generator

Produces actionable learning roadmaps tailored to user profiles.

Each roadmap contains:

phase-based milestones
estimated completion timelines
skill acquisition sequence
recommended learning order

This converts abstract career advice into executable steps.

📈 Progress Tracking System

Tracks user improvement across milestones.

Supports:

milestone completion toggling
progress percentage updates
career status tracking
roadmap completion visibility

Example:

Roadmap Completion: 42%
Milestones Completed: 5 / 12
⚙️ Technology Stack
Frontend

Built using a modern scalable React architecture:

React.js
TypeScript
Tailwind CSS
React Router
TanStack React Query
Axios
modular service-layer API integration

Supports responsive UI and dynamic AI-driven rendering.

Backend

Designed with layered production-ready architecture:

Node.js
Express.js
TypeScript
MongoDB
Mongoose
Google Gemini AI
Zod DTO validation

Includes structured AI-agent service layer integration.

🏗 Backend Architecture

The backend follows a layered scalable pattern:

Controller → Service → Model → Database

Additional architecture layers:

Routes
DTO Validation Layer
Authentication Middleware
AI Integration Layer
Error Handling Middleware

This ensures:

maintainability
scalability
testability
separation of concerns
🤖 AI Processing Pipeline

The AI workflow executes the following steps:

Step 1 — Resume Upload

User uploads resume file

↓

Step 2 — Resume Parsing

Gemini extracts:

skills
experience
education
keywords

↓

Step 3 — Skill Comparison

System compares extracted skills against role dataset

↓

Step 4 — Gap Detection

Missing competencies identified

↓

Step 5 — Career Path Generation

AI generates milestone-based learning strategy

↓

Step 6 — Roadmap Creation

Phase-structured improvement plan returned

↓

Step 7 — Progress Tracking

User tracks completion status dynamically

📡 API Endpoints
Authentication
POST /auth/register
POST /auth/login
GET  /auth/profile
Skill Gap Analysis
POST /skillgap/analyze
GET  /skillgap/latest

Returns:

extracted skills
missing skills
match percentage
Career Path Generation
POST /career/generate
GET  /career/latest
GET  /career/all

Returns milestone-based progression structure.

Roadmap Generation
POST /career/roadmap/generate

Returns structured learning phases.

Progress Tracking
PATCH /career/:id/milestone
PATCH /career/:id/progress

Updates roadmap completion status.

🔐 Security Implementation

Includes:

JWT authentication middleware
protected route access
DTO validation using Zod
centralized error handling
Helmet security headers
rate-limiting protection
environment-based configuration isolation
📊 Database Design

MongoDB stores:

Users
profile data
credentials
analysis references
Skill Gap Reports
extracted skills
missing skills
match percentage
target role
Career Paths
milestones
timeline
learning phases
completion status
🚀 Deployment Architecture

Production deployment configured with environment isolation:

Frontend:

Netlify

Backend:

Render

Database:

MongoDB Atlas

Supports scalable cloud deployment workflows.

📂 Project Structure Overview

Backend structure:

controllers/
services/
models/
routes/
middlewares/
validators/
utils/

Frontend structure:

components/
pages/
services/
hooks/
types/
utils/

Ensures maintainable modular architecture.

🔮 Planned Future Enhancements

Upcoming improvements:

AI-powered course recommendation engine
job-role prediction assistant
interview preparation module
resume ATS scoring system
notification system for milestone reminders
semantic vector skill matching
personalized learning resource suggestions
👨‍💻 Author

Kuldeep Singh
Full Stack Developer | MERN Stack | AI Integration

GitHub
https://github.com/kuldeep-singh-pro

LinkedIn
https://www.linkedin.com/in/kuldeep-singh-506b27381