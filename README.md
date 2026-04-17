# AI Career Consultant Platform

AI Career Consultant Platform is a full-stack intelligent career
guidance web application that helps users analyze their skills, identify
gaps, generate personalized career paths, and follow structured learning
roadmaps using AI assistance.

The platform integrates Gemini AI to dynamically generate career
strategies based on a user's skill profile and target role.

------------------------------------------------------------------------

## How to Use the Platform

1.  Register an account
2.  Upload resume or provide skills
3.  Select target role
4.  Perform skill gap analysis
5.  Generate career path
6.  View roadmap
7.  Track milestone progress

------------------------------------------------------------------------

## Key Features

### Authentication

-   JWT-based authentication
-   Secure protected routes
-   Profile-based data isolation

### Skill Gap Analysis

-   Resume-based skill extraction
-   Missing skill detection
-   Match percentage calculation

### Career Path Generation

-   AI-generated milestones
-   Structured progression plan
-   Skill-learning timeline

### Roadmap Generator

-   Phase-based learning roadmap
-   Actionable improvement steps
-   Timeline estimation

### Progress Tracking

-   Milestone completion tracking
-   Overall progress calculation
-   Career path status updates

------------------------------------------------------------------------

## Technology Stack

### Frontend

-   React.js
-   TypeScript
-   Tailwind CSS
-   React Router
-   TanStack React Query
-   Axios

### Backend

-   Node.js
-   Express.js
-   TypeScript
-   MongoDB
-   Mongoose
-   Gemini AI
-   Zod validation

------------------------------------------------------------------------

## Backend Architecture

Controller → Service → Model → Database

Includes:

-   DTO validation layer
-   Authentication middleware
-   Error handling middleware
-   AI agent integration layer

------------------------------------------------------------------------

## Backend Setup

Create `.env`

PORT=5000 MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key JWT_EXPIRE=7d GEMINI_API_KEY=your_api_key

Run:

pnpm install pnpm dev

------------------------------------------------------------------------

## Frontend Setup

Create `.env`

VITE_API_URL=http://localhost:5000

Run:

pnpm install pnpm dev

------------------------------------------------------------------------

## API Endpoints

Authentication

POST /auth/register POST /auth/login GET /auth/profile

Skill Gap

POST /skillgap/analyze GET /skillgap/latest

Career Path

POST /career/generate GET /career/latest GET /career/all

Roadmap

POST /career/roadmap/generate

Progress

PATCH /career/:id/milestone PATCH /career/:id/progress

------------------------------------------------------------------------

## Future Improvements

-   Course recommendation engine
-   Job-role prediction AI
-   Interview preparation assistant
-   Real-time notifications

------------------------------------------------------------------------

## Author

Kuldeep Singh Frontend Developer \| MERN Stack \| AI Projects