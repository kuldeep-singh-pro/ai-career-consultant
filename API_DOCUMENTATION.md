# AI Career Consultant - Complete API Documentation

**Last Updated:** April 9, 2026  
**API Version:** v1  
**Backend Port:** 5000 (default)

---

## 📋 Table of Contents

1. [Base Configuration](#base-configuration)
2. [Authentication](#authentication)
3. [Global Response Format](#global-response-format)
4. [Error Handling](#error-handling)
5. [Auth Endpoints](#auth-endpoints)
6. [Resume Endpoints](#resume-endpoints)
7. [Skill Gap Endpoints](#skill-gap-endpoints)
8. [Career Path Endpoints](#career-path-endpoints)
9. [Mentor/Chat Endpoints](#mentorchat-endpoints)
10. [Dashboard Endpoints](#dashboard-endpoints)
11. [Settings Endpoints](#settings-endpoints)
12. [Database Models](#database-models)

---

## Base Configuration

### Server Setup
- **Host:** `http://localhost:5000` (development)
- **Base API Path:** `/api`
- **Protocol:** HTTP/HTTPS
- **Rate Limiting:** 100 requests per 15 minutes
- **CORS:** Enabled
- **Security Headers:** Helmet.js enabled
- **Body Parser:** JSON with max size 100kb

### Database
- **Type:** MongoDB
- **Connection:** Via Mongoose ODM
- **Connection String:** `MONGO_URI` environment variable

### Environment Variables Required
```
PORT=5000
MONGO_URI=mongodb://...
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
GEMINI_API_KEY=your-gemini-key
GEMINI_MODEL=gemini-pro
```

---

## Authentication

### Method: JWT Bearer Token

**Header Format:**
```
Authorization: Bearer <token>
```

**Token Details:**
- **Algorithm:** HS256
- **Expiration:** 7 days (default, configurable via JWT_EXPIRE)
- **Payload:**
  ```json
  {
    "id": "user-object-id"
  }
  ```

**Protected Endpoints:**
- All endpoints except `/auth/*` require valid JWT token
- Token validation happens in `protect` middleware
- Invalid or missing tokens return `401 Unauthorized`

**Token Storage (Frontend Recommendation):**
- Store in memory or sessionStorage for security
- Include in all requests requiring authentication

---

## Global Response Format

### Success Response (2xx)
```json
{
  "success": true,
  "message": "operation description",
  "data": {}
}
```

### Status Codes by Operation
- **200 OK:** GET requests, PATCH updates
- **201 Created:** POST creation endpoints
- **204 No Content:** DELETE operations (optional)

### Error Response (4xx, 5xx)
```json
{
  "success": false,
  "message": "error description"
}
```

---

## Error Handling

### HTTP Status Codes

| Code | Error Class | Scenario |
|------|-------------|----------|
| 400 | BadRequest | Invalid input, missing required fields, validation errors |
| 401 | Unauthorized | Missing/invalid token, token expired |
| 403 | Forbidden | User doesn't have permission |
| 404 | NotFound | Resource not found |
| 409 | Conflict | Duplicate entry, resource already exists |
| 500 | InternalServerError | Server error |

### Common Error Messages

**Authentication Errors:**
- `"Token missing or malformed"` - Bearer token not provided correctly
- `"Invalid or expired token"` - Token validation failed
- `"User not found"` - User doesn't exist in database

**Validation Errors:**
- `"Bad Request"` - Generic validation failure
- `"Only PDF files are allowed"` - Non-PDF file uploaded
- Zod validation errors include specific field errors

**Business Logic Errors:**
- `"User already exists"` - Email already registered
- `"Invalid OTP"` - Incorrect or expired OTP
- `"Invalid credentials"` - Wrong email/password combination

---

## Auth Endpoints

### Base Path: `/api/auth`

#### 1. Register User
**POST** `/api/auth/register`

**Request Body:**
```json
{
  "name": "string (min 2 chars)",
  "email": "valid-email@example.com",
  "password": "string (min 6 chars)"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "OTP sent successfully"
}
```

**Validation Rules:**
- Name: minimum 2 characters
- Email: valid email format, must be unique
- Password: minimum 6 characters

**Process:**
1. User data validated with Zod schema
2. User created in database
3. OTP generated and sent to email
4. User marked as unverified until OTP verification

**Database Collection:** `users`

---

#### 2. Verify OTP (Registration)
**POST** `/api/auth/verify-otp`

**Request Body:**
```json
{
  "email": "user@example.com",
  "otp": "string (exactly 6 digits)"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Account verified successfully"
}
```

**Process:**
1. OTP retrieved from database
2. OTP compared with provided OTP
3. User status updated to verified
4. OTP record deleted

**Database Collections:** `otps`, `users`

---

#### 3. Resend OTP (Registration)
**POST** `/api/auth/resend-otp`

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "OTP resent successfully"
}
```

**Validation:**
- User must exist in database
- User must not already be verified

---

#### 4. Login
**POST** `/api/auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "userpassword123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "isVerified": true,
      "role": "user",
      "createdAt": "2026-04-06T14:05:00Z",
      "updatedAt": "2026-04-06T14:05:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Validation:**
- Email must be registered
- Password must match stored password
- User must be verified

**Token Details:**
- Valid for 7 days
- Stored in JWT format with HS256 encryption

---

#### 5. Forgot Password
**POST** `/api/auth/forgot-password`

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Reset OTP sent successfully"
}
```

**Process:**
1. OTP generated with type "reset"
2. Email sent with reset OTP
3. OTP expires in 10 minutes

---

#### 6. Verify Reset OTP
**POST** `/api/auth/verify-reset-otp`

**Request Body:**
```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "OTP verified"
}
```

---

#### 7. Reset Password
**POST** `/api/auth/reset-password`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "newpassword123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Password reset successfully"
}
```

**Process:**
1. User password updated in database
2. Password hashed before storage
3. All OTP records deleted

---

#### 8. Get Current User
**GET** `/api/auth/me`

**Authorization:** Required (Bearer token)

**Response (200):**
```json
{
  "success": true,
  "message": "User retrieved successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "isVerified": true,
    "role": "user",
    "createdAt": "2026-04-06T14:05:00Z",
    "updatedAt": "2026-04-06T14:05:00Z"
  }
}
```

**Database Collection:** `users`

---

## Resume Endpoints

### Base Path: `/api/resume`

#### 1. Upload and Analyze Resume
**POST** `/api/resume/upload`

**Authorization:** Required (Bearer token)

**Content-Type:** `multipart/form-data`

**Request Body:**
```
- Field name: "resume"
- File type: PDF only
- Max size: 5MB
```

**Response (200):**
```json
{
  "success": true,
  "message": "Resume uploaded and analyzed successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439015",
    "userId": "507f1f77bcf86cd799439011",
    "resumeId": "507f1f77bcf86cd799439014",
    "score": 78,
    "skills": [
      "JavaScript",
      "React",
      "Node.js",
      "TypeScript",
      "MongoDB",
      "Express.js",
      "REST APIs",
      "Git"
    ],
    "missingSkills": [
      "System Design",
      "Kubernetes",
      "AWS",
      "DevOps",
      "Microservices"
    ],
    "suggestions": [
      "Add system design knowledge to increase seniority prospects",
      "Learn cloud platforms (AWS/GCP) for modern roles",
      "Consider DevOps skills for career growth"
    ],
    "recommendedRoles": [
      "Senior Frontend Developer",
      "Full Stack Engineer",
      "Tech Lead"
    ],
    "strengths": [
      "Strong frontend skills",
      "Good backend fundamentals",
      "Solid portfolio of projects"
    ],
    "weaknesses": [
      "Limited system design experience",
      "No cloud platform certifications",
      "Missing DevOps knowledge"
    ],
    "experienceLevel": "Intermediate",
    "careerRoadmap": [
      "Master system design in 6 months",
      "Learn AWS/Cloud in 3 months",
      "Pursue DevOps certification"
    ],
    "createdAt": "2026-04-06T14:05:00Z",
    "updatedAt": "2026-04-06T14:05:00Z"
  }
}
```

**File Upload Details:**
- **Storage:** In-memory (multer memoryStorage)
- **Validation:** Only PDF files accepted
- **Size Limit:** 5MB
- **Processing:** PDF parsed, text extracted, AI analysis performed

**Process:**
1. File received and validated as PDF
2. PDF text extracted using pdfparser
3. Text sent to Gemini AI for analysis
4. Analysis results stored in database
5. Resume and analysis linked to user

**Database Collections:** 
- `resumes` - stores file URL and extracted text
- `resumeanalysis` - stores AI analysis results

---

#### 2. Get Latest Resume Analysis
**GET** `/api/resume/analysis`

**Authorization:** Required (Bearer token)

**Response (200):**
```json
{
  "success": true,
  "message": "Resume analysis retrieved successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439015",
    "userId": "507f1f77bcf86cd799439011",
    ...
    // Same structure as upload response
  }
}
```

**Query Parameters:** None

**Database Collection:** `resumeanalysis`

---

## Skill Gap Endpoints

### Base Path: `/api/skillgap`

#### 1. Generate Skill Gap Analysis
**POST** `/api/skillgap/analyze`

**Authorization:** Required (Bearer token)

**Request Body:**
```json
{
  "targetRole": "Senior Developer"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Skill gap analysis created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439020",
    "userId": "507f1f77bcf86cd799439011",
    "targetRole": "Senior Developer",
    "currentSkills": [
      "JavaScript",
      "React",
      "Node.js",
      "MongoDB",
      "REST APIs"
    ],
    "missingSkills": [
      "System Design",
      "Microservices",
      "Cloud Architecture",
      "Leadership",
      "Enterprise Patterns"
    ],
    "matchPercentage": 45,
    "learningPlan": [
      {
        "skill": "System Design",
        "priority": "High",
        "weeks": 12
      },
      {
        "skill": "Microservices Architecture",
        "priority": "High",
        "weeks": 10
      },
      {
        "skill": "Cloud Services (AWS/GCP)",
        "priority": "High",
        "weeks": 8
      },
      {
        "skill": "Leadership & Mentoring",
        "priority": "Medium",
        "weeks": 8
      },
      {
        "skill": "Enterprise Design Patterns",
        "priority": "Medium",
        "weeks": 6
      }
    ],
    "createdAt": "2026-04-06T14:05:00Z",
    "updatedAt": "2026-04-06T14:05:00Z"
  }
}
```

**Validation:**
- targetRole: minimum 2 characters

**Process:**
1. Current user's latest resume analysis retrieved
2. AI generates skill gap analysis comparing target role
3. Missing skills identified
4. Learning plan created with prioritized skills
5. Results stored in database

**Database Collection:** `skillgaps`

---

#### 2. Get Latest Skill Gap Analysis
**GET** `/api/skillgap/analysis`

**Authorization:** Required (Bearer token)

**Response (200):**
```json
{
  "success": true,
  "message": "Skill gap analysis retrieved successfully",
  "data": {
    ... // Same structure as generate response
  }
}
```

**Database Collection:** `skillgaps`

---

## Career Path Endpoints

### Base Path: `/api/career`

#### 1. Generate Career Path (Custom Input)
**POST** `/api/career/generate`

**Authorization:** Required (Bearer token)

**Request Body:**
```json
{
  "currentRole": "Junior Developer",
  "targetRole": "Staff Engineer",
  "skills": ["JavaScript", "React", "Node.js", "TypeScript", "MongoDB"]
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Career path generated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439025",
    "userId": "507f1f77bcf86cd799439011",
    "currentRole": "Junior Developer",
    "targetRole": "Staff Engineer",
    "currentSkills": [
      "JavaScript",
      "React",
      "Node.js",
      "TypeScript",
      "MongoDB"
    ],
    "requiredSkills": [
      "System Design",
      "Architecture",
      "Leadership",
      "Cloud Infrastructure",
      "Team Management"
    ],
    "matchPercentage": 45,
    "estimatedDuration": 24,
    "salaryRange": {
      "current": 80000,
      "target": 200000
    },
    "progress": 0,
    "status": "active",
    "milestones": [
      {
        "_id": "507f1f77bcf86cd799439026",
        "title": "Master System Design",
        "duration": 12,
        "skills": [
          "Distributed Systems",
          "Database Design",
          "Load Balancing"
        ],
        "description": "Deep dive into system design patterns, scalability, and real-world architecture decisions",
        "completed": false
      },
      {
        "_id": "507f1f77bcf86cd799439027",
        "title": "Advanced Architecture & Cloud",
        "duration": 8,
        "skills": [
          "Microservices",
          "AWS/GCP",
          "Kubernetes"
        ],
        "description": "Learn cloud platforms and containerization",
        "completed": false
      }
    ],
    "learningResources": [
      {
        "_id": "507f1f77bcf86cd799439028",
        "name": "System Design Interview Course",
        "type": "course",
        "duration": 8,
        "difficulty": "Advanced",
        "url": "https://example.com/course",
        "completed": false
      },
      {
        "_id": "507f1f77bcf86cd799439029",
        "name": "Designing Data-Intensive Applications",
        "type": "book",
        "duration": 12,
        "difficulty": "Advanced",
        "url": "https://example.com/book",
        "completed": false
      }
    ],
    "startDate": "2026-04-06T14:05:00Z",
    "targetDate": "2028-04-06T14:05:00Z",
    "createdAt": "2026-04-06T14:05:00Z",
    "updatedAt": "2026-04-06T14:05:00Z"
  }
}
```

**Validation:**
- currentRole: minimum 2 characters
- targetRole: minimum 2 characters
- skills: array with minimum 1 skill

**Process:**
1. Input validated using Zod schema
2. AI agent generates comprehensive career path
3. Milestones and learning resources created
4. Salary range estimated based on roles
5. Data stored in database

**Database Collection:** `careerpaths`

---

#### 2. Generate Quick Career Path (From Resume)
**POST** `/api/career/generate-quick`

**Authorization:** Required (Bearer token)

**Request Body:**
```json
{
  "targetRole": "Cloud Architect"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Quick career path generated from resume successfully",
  "data": {
    ... // Same structure as generate, but uses resume skills
  }
}
```

**Process:**
1. Latest resume analysis retrieved for user
2. Skills from resume used as currentSkills
3. Experience level from resume used
4. Career path generated automatically
5. No manual skill input needed

**Database Collections:** 
- `resumeanalysis` - to fetch current skills
- `careerpaths` - to store generated path

---

#### 3. Generate Learning Roadmap
**POST** `/api/career/roadmap/generate`

**Authorization:** Required (Bearer token)

**Request Body:**
```json
{
  "currentRole": "Junior Developer",
  "targetRole": "Staff Engineer",
  "timeframe": 24
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Roadmap generated successfully",
  "data": {
    "title": "Your 24-Month Path to Staff Engineer",
    "description": "A comprehensive 24-month transformation roadmap from Junior Developer to Staff Engineer, focusing on system design, architecture, and leadership skills",
    "phases": [
      {
        "phase": 1,
        "title": "Foundation & Fundamentals",
        "duration": 8,
        "focus": "Master core concepts in system design and architecture",
        "actionItems": [
          {
            "title": "Learn distributed systems basics",
            "description": "Study CAP theorem, consistency models, eventual consistency",
            "priority": "High"
          },
          {
            "title": "Complete system design course",
            "description": "Enroll in comprehensive system design course covering real-world scenarios",
            "priority": "High"
          },
          {
            "title": "Design practice projects",
            "description": "Build 2-3 systems from scratch: Twitter, Instagram, Uber",
            "priority": "High"
          }
        ],
        "resources": [
          "System Design Interview Book",
          "Grokking System Design Course",
          "ByteByteGo Newsletter"
        ]
      },
      {
        "phase": 2,
        "title": "Advanced Topics & Practice",
        "duration": 8,
        "focus": "Apply knowledge to real-world projects",
        "actionItems": [
          {
            "title": "Deploy systems to cloud",
            "description": "Use AWS/GCP to deploy designed systems",
            "priority": "High"
          },
          {
            "title": "Learn microservices",
            "description": "Study microservices architecture patterns and implementation",
            "priority": "Medium"
          }
        ],
        "resources": [
          "AWS Architect Associate Certification",
          "Microservices Patterns Book"
        ]
      },
      {
        "phase": 3,
        "title": "Leadership & Mentoring",
        "duration": 8,
        "focus": "Develop soft skills and leadership capabilities",
        "actionItems": [
          {
            "title": "Lead a project",
            "description": "Take lead role in a significant project at work",
            "priority": "Medium"
          },
          {
            "title": "Mentor junior developers",
            "description": "Help 2-3 junior developers grow and develop",
            "priority": "Medium"
          }
        ],
        "resources": [
          "Leadership in Engineering Book",
          "Coaching Skills Workshop"
        ]
      }
    ],
    "keyMetrics": [
      {
        "metric": "System Design Knowledge",
        "target": "Expert Level",
        "timeline": 8
      },
      {
        "metric": "Architecture Experience",
        "target": "Design 5+ systems",
        "timeline": 16
      },
      {
        "metric": "Leadership Skills",
        "target": "Lead team project",
        "timeline": 24
      }
    ]
  }
}
```

**Validation:**
- currentRole: minimum 2 characters
- targetRole: minimum 2 characters
- timeframe: 1-60 months

**Note:** Roadmap is NOT stored in database, returned directly as transient data

---

#### 4. Get All Career Paths
**GET** `/api/career/all`

**Authorization:** Required (Bearer token)

**Response (200):**
```json
{
  "success": true,
  "message": "Career paths retrieved successfully",
  "data": [
    { ... career path 1 ... },
    { ... career path 2 ... },
    { ... career path 3 ... }
  ]
}
```

**Database Collection:** `careerpaths`

---

#### 5. Get All Career Paths With Progress
**GET** `/api/career/all-with-progress`

**Authorization:** Required (Bearer token)

**Response (200):**
```json
{
  "success": true,
  "message": "Career paths with progress retrieved successfully",
  "data": [
    {
      ...career path,
      "milestonesProgress": 33,
      "resourcesProgress": 50,
      "totalProgress": 41.5
    }
  ]
}
```

**Additional Fields:**
- `milestonesProgress`: Percentage of completed milestones
- `resourcesProgress`: Percentage of completed resources
- `totalProgress`: Overall progress average

---

#### 6. Get Latest Career Path
**GET** `/api/career/latest`

**Authorization:** Required (Bearer token)

**Response (200):**
```json
{
  "success": true,
  "message": "Latest career path retrieved successfully",
  "data": { ... career path ... }
}
```

---

#### 7. Get Career Path Details
**GET** `/api/career/:id`

**Authorization:** Required (Bearer token)

**Path Parameters:**
- `id` - Career path MongoDB ObjectId

**Response (200):**
```json
{
  "success": true,
  "message": "Career path details retrieved successfully",
  "data": { ... career path ... }
}
```

---

#### 8. Update Career Path Progress
**PATCH** `/api/career/:id/progress`

**Authorization:** Required (Bearer token)

**Request Body:**
```json
{
  "progress": 25
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Career path progress updated successfully",
  "data": { ...updated career path... }
}
```

**Validation:**
- progress: 0-100 (percentage)

---

#### 9. Update Milestone Completion
**PATCH** `/api/career/:id/milestone`

**Authorization:** Required (Bearer token)

**Request Body:**
```json
{
  "milestoneIndex": 0,
  "completed": true
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Milestone status updated successfully",
  "data": { ...updated career path... }
}
```

**Path Parameters:**
- `id` - Career path ObjectId

**Body Parameters:**
- `milestoneIndex`: Array index of milestone (0-based)
- `completed`: Boolean flag

---

#### 10. Update Learning Resource Completion
**PATCH** `/api/career/:id/resource`

**Authorization:** Required (Bearer token)

**Request Body:**
```json
{
  "resourceIndex": 0,
  "completed": true
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Resource completion updated successfully",
  "data": { ...updated career path... }
}
```

---

#### 11. Update Career Path Status
**PATCH** `/api/career/:id/status`

**Authorization:** Required (Bearer token)

**Request Body:**
```json
{
  "status": "paused"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Career path status updated successfully",
  "data": { ...updated career path... }
}
```

**Valid Status Values:**
- `"active"` - Currently pursuing
- `"paused"` - Temporarily stopped
- `"completed"` - Path completed

---

#### 12. Delete Career Path
**DELETE** `/api/career/:id`

**Authorization:** Required (Bearer token)

**Response (200):**
```json
{
  "success": true,
  "message": "Career path deleted successfully"
}
```

**Database Collection:** `careerpaths`

---

## Mentor/Chat Endpoints

### Base Path: `/api/mentor`

#### 1. Send Message to Mentor
**POST** `/api/mentor/send`

**Authorization:** Required (Bearer token)

**Request Body:**
```json
{
  "message": "How do I prepare for system design interviews?",
  "sessionId": "optional-session-id",
  "context": {
    "currentModule": "Career Path Module",
    "userSkills": ["JavaScript", "React", "Node.js"],
    "careerGoals": "Become a Staff Engineer"
  }
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Message sent successfully",
  "data": {
    "userMessage": {
      "_id": "507f1f77bcf86cd799439040",
      "userId": "507f1f77bcf86cd799439011",
      "message": "How do I prepare for system design interviews?",
      "response": "System design interviews require deep understanding of...",
      "sessionId": "session_1712425500000_507f1f77bcf86cd799439011",
      "messageType": "user",
      "context": {
        "currentModule": "Career Path Module",
        "userSkills": ["JavaScript", "React", "Node.js"],
        "careerGoals": "Become a Staff Engineer"
      },
      "createdAt": "2026-04-06T14:05:00Z",
      "updatedAt": "2026-04-06T14:05:00Z"
    },
    "assistantMessage": {
      "_id": "507f1f77bcf86cd799439041",
      "userId": "507f1f77bcf86cd799439011",
      "message": "How do I prepare for system design interviews?",
      "response": "System design interviews require deep understanding of distributed systems, scalability patterns, and architectural principles...",
      "sessionId": "session_1712425500000_507f1f77bcf86cd799439011",
      "messageType": "assistant",
      "context": {
        "currentModule": "Career Path Module",
        "userSkills": ["JavaScript", "React", "Node.js"],
        "careerGoals": "Become a Staff Engineer"
      },
      "createdAt": "2026-04-06T14:05:00Z",
      "updatedAt": "2026-04-06T14:05:00Z"
    },
    "sessionId": "session_1712425500000_507f1f77bcf86cd799439011"
  }
}
```

**Validation:**
- message: 1-1000 characters
- If sessionId not provided, new session created automatically

**Session Management:**
- Format: `session_<timestamp>_<userId>`
- Used to group related conversations
- Optional parameter - auto-generated if omitted

**Process:**
1. Message validated
2. AI generates response using Gemini API
3. Both user message and assistant response saved
4. Session ID returned for future reference

**Database Collection:** `chatmessages`

---

#### 2. Get Chat History
**GET** `/api/mentor/history`

**Authorization:** Required (Bearer token)

**Query Parameters:**
```
?sessionId=optional-session-id&limit=50
```

**Response (200):**
```json
{
  "success": true,
  "message": "Chat history retrieved successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439040",
      "userId": "507f1f77bcf86cd799439011",
      "message": "How do I prepare for system design interviews?",
      "response": "System design interviews require...",
      "timestamp": "2026-04-06T14:05:00Z",
      "messageType": "user",
      "sessionId": "session_1712425500000_507f1f77bcf86cd799439011"
    },
    {
      "_id": "507f1f77bcf86cd799439041",
      "userId": "507f1f77bcf86cd799439011",
      "message": "How do I prepare for system design interviews?",
      "response": "System design interviews require deep understanding of distributed systems...",
      "timestamp": "2026-04-06T14:05:00Z",
      "messageType": "assistant",
      "sessionId": "session_1712425500000_507f1f77bcf86cd799439011"
    }
  ]
}
```

**Query Parameters:**
- `sessionId` (optional): Filter by session ID
- `limit` (optional): Max messages to return (1-100, default 50)

**Pagination:** No pagination, uses limit parameter

---

#### 3. Get Chat Sessions
**GET** `/api/mentor/sessions`

**Authorization:** Required (Bearer token)

**Response (200):**
```json
{
  "success": true,
  "message": "Chat sessions retrieved successfully",
  "data": [
    {
      "sessionId": "session_1712425500000_507f1f77bcf86cd799439011",
      "lastMessage": "How do I prepare...",
      "messageCount": 5,
      "createdAt": "2026-04-06T14:05:00Z"
    },
    {
      "sessionId": "session_1712425600000_507f1f77bcf86cd799439011",
      "lastMessage": "Tell me about...",
      "messageCount": 3,
      "createdAt": "2026-04-05T10:00:00Z"
    }
  ]
}
```

---

#### 4. Get Chat Context
**GET** `/api/mentor/context`

**Authorization:** Required (Bearer token)

**Response (200):**
```json
{
  "success": true,
  "message": "Chat context retrieved successfully",
  "data": {
    "hasHistory": true,
    "lastMessage": {
      "_id": "507f1f77bcf86cd799439041",
      "message": "How do I prepare for system design interviews?",
      "response": "System design interviews require...",
      "timestamp": "2026-04-06T14:05:00Z",
      "messageType": "assistant"
    }
  }
}
```

---

#### 5. Clear Chat History
**DELETE** `/api/mentor/clear`

**Authorization:** Required (Bearer token)

**Request Body:**
```json
{
  "sessionId": "session_1712425500000_507f1f77bcf86cd799439011"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Chat history cleared successfully"
}
```

**Validation:**
- sessionId: required string

**Database Collection:** `chatmessages`

---

## Dashboard Endpoints

### Base Path: `/api/dashboard`

#### 1. Get Dashboard Stats
**GET** `/api/dashboard/stats`

**Authorization:** Required (Bearer token)

**Response (200):**
```json
{
  "success": true,
  "message": "Dashboard stats retrieved successfully",
  "data": {
    "totalCareerPaths": 3,
    "activeCareerPaths": 2,
    "completedCareerPaths": 1,
    "totalMilestones": 12,
    "completedMilestones": 4,
    "overallProgress": 33,
    "resumeScore": 78,
    "totalChatSessions": 15,
    "lastActivityDate": "2026-04-06T14:05:00Z"
  }
}
```

**Calculated Metrics:**
- totalCareerPaths: Count of all user's career paths
- activeCareerPaths: Count with status "active"
- completedCareerPaths: Count with status "completed"
- totalMilestones: Sum of all milestones across all paths
- completedMilestones: Sum of completed milestones
- overallProgress: Average progress across all paths
- resumeScore: Latest resume analysis score

---

#### 2. Get Dashboard Overview
**GET** `/api/dashboard/overview`

**Authorization:** Required (Bearer token)

**Response (200):**
```json
{
  "success": true,
  "message": "Dashboard overview retrieved successfully",
  "data": {
    "currentPath": {
      "_id": "507f1f77bcf86cd799439025",
      "currentRole": "Junior Developer",
      "targetRole": "Staff Engineer",
      "progress": 35,
      "milestones": 12,
      "completedMilestones": 4
    },
    "skillGap": {
      "matchPercentage": 45,
      "topMissingSkills": [
        "System Design",
        "Microservices",
        "Cloud Architecture"
      ]
    },
    "nextMilestone": {
      "title": "Master System Design",
      "duration": 12,
      "completedDuration": 3
    },
    "chatSessions": 15
  }
}
```

---

#### 3. Get Progress Analytics
**GET** `/api/dashboard/progress`

**Authorization:** Required (Bearer token)

**Response (200):**
```json
{
  "success": true,
  "message": "Progress analytics retrieved successfully",
  "data": {
    "thisMonth": 5,
    "lastMonth": 8,
    "averageMonthly": 6.5,
    "trendsPositive": true,
    "milestoneCompletionRate": 33,
    "resourceCompletionRate": 25,
    "estimatedCompletionDate": "2028-04-06",
    "weeklyProgress": [
      { "week": "W1", "progress": 5 },
      { "week": "W2", "progress": 8 },
      { "week": "W3", "progress": 6 },
      { "week": "W4", "progress": 7 }
    ]
  }
}
```

---

#### 4. Get Skill Analytics
**GET** `/api/dashboard/skills`

**Authorization:** Required (Bearer token)

**Response (200):**
```json
{
  "success": true,
  "message": "Skill analytics retrieved successfully",
  "data": {
    "currentSkills": {
      "count": 8,
      "skills": [
        "JavaScript",
        "React",
        "Node.js",
        "TypeScript",
        "MongoDB",
        "Express.js",
        "REST APIs",
        "Git"
      ]
    },
    "targetSkills": {
      "count": 5,
      "skills": [
        "System Design",
        "Architecture",
        "Leadership",
        "Cloud Infrastructure",
        "Team Management"
      ]
    },
    "learningInProgress": [
      "System Design",
      "Kubernetes",
      "AWS"
    ],
    "skillCompletionRate": [
      { "skill": "System Design", "progress": 40 },
      { "skill": "Cloud Services", "progress": 30 },
      { "skill": "Leadership", "progress": 20 }
    ]
  }
}
```

**Database Collections:**
- `careerpaths`
- `resumeanalysis`
- `skillgaps`
- `chatmessages`

---

## Settings Endpoints

### Base Path: `/api/settings`

#### 1. Get User Settings
**GET** `/api/settings`

**Authorization:** Required (Bearer token)

**Response (200):**
```json
{
  "success": true,
  "message": "Settings retrieved successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439050",
    "userId": "507f1f77bcf86cd799439011",
    "notifications": {
      "email": true,
      "push": true,
      "careerUpdates": true,
      "skillReminders": true,
      "mentorMessages": true
    },
    "privacy": {
      "profileVisibility": "public",
      "dataSharing": false,
      "analytics": true
    },
    "preferences": {
      "language": "en",
      "timezone": "UTC",
      "theme": "auto",
      "emailFrequency": "weekly"
    },
    "career": {
      "targetRoles": ["Senior Developer", "Tech Lead"],
      "industries": ["Technology", "FinTech"],
      "salaryRange": {
        "min": 100000,
        "max": 200000,
        "currency": "USD"
      },
      "workPreferences": {
        "remote": true,
        "hybrid": true,
        "onsite": false,
        "travel": false
      }
    },
    "skills": {
      "focusAreas": ["System Design", "Cloud Architecture"],
      "learningStyle": "visual",
      "timeCommitment": "medium"
    },
    "createdAt": "2026-04-06T14:05:00Z",
    "updatedAt": "2026-04-06T14:05:00Z"
  }
}
```

---

#### 2. Update Settings
**PATCH** `/api/settings`

**Authorization:** Required (Bearer token)

**Request Body (any combination of)::**
```json
{
  "notifications": {
    "email": false,
    "push": true,
    "careerUpdates": true,
    "skillReminders": false,
    "mentorMessages": true
  },
  "privacy": {
    "profileVisibility": "private",
    "dataSharing": true,
    "analytics": false
  },
  "preferences": {
    "language": "en",
    "timezone": "America/New_York",
    "theme": "dark",
    "emailFrequency": "daily"
  },
  "career": {
    "targetRoles": ["Senior Developer", "Staff Engineer"],
    "industries": ["Technology", "FinTech", "Remote"],
    "salaryRange": {
      "min": 120000,
      "max": 250000,
      "currency": "USD"
    },
    "workPreferences": {
      "remote": true,
      "hybrid": false,
      "onsite": false,
      "travel": true
    }
  },
  "skills": {
    "focusAreas": ["System Design", "Leadership"],
    "learningStyle": "kinesthetic",
    "timeCommitment": "high"
  }
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Settings updated successfully",
  "data": { ...updated settings... }
}
```

**Notes:**
- All fields are optional
- Only provided fields are updated
- Partial updates supported

---

#### 3. Get Settings Summary
**GET** `/api/settings/summary`

**Authorization:** Required (Bearer token)

**Response (200):**
```json
{
  "success": true,
  "message": "Settings summary retrieved successfully",
  "data": {
    "notificationsEnabled": 4,
    "privacyLevel": "public",
    "targetRoles": 2,
    "learningStyle": "visual",
    "timeCommitment": "medium"
  }
}
```

---

#### 4. Reset Settings (Specific Section)
**POST** `/api/settings/reset`

**Authorization:** Required (Bearer token)

**Request Body:**
```json
{
  "section": "notifications"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Settings reset successfully",
  "data": { ...reset settings... }
}
```

**Valid Sections:**
- `"notifications"` - Reset to default notifications
- `"privacy"` - Reset to default privacy
- `"preferences"` - Reset to default preferences
- `"career"` - Reset to default career settings
- `"skills"` - Reset to default skills settings
- `"all"` - Reset all settings to defaults

---

#### 5. Delete User Settings
**DELETE** `/api/settings`

**Authorization:** Required (Bearer token)

**Response (200):**
```json
{
  "success": true,
  "message": "Settings deleted successfully"
}
```

**Note:** This permanently deletes user settings. Defaults applied after deletion.

**Database Collection:** `settings`

---

## Database Models

### User Model
**Collection:** `users`

```typescript
{
  _id: ObjectId,
  name: string,
  email: string,
  password: string (hashed),
  isVerified: boolean,
  role: "user" | "admin",
  createdAt: Date,
  updatedAt: Date
}
```

### OTP Model
**Collection:** `otps`

```typescript
{
  _id: ObjectId,
  email: string,
  otp: string (6 digits),
  type: "verify" | "reset",
  expiresAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Resume Model
**Collection:** `resumes`

```typescript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  fileUrl: string,
  extractedText: string,
  createdAt: Date,
  updatedAt: Date
}
```

### Resume Analysis Model
**Collection:** `resumeanalysis`

```typescript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  resumeId: ObjectId (ref: Resume),
  score: number (0-100),
  skills: string[],
  missingSkills: string[],
  suggestions: string[],
  recommendedRoles: string[],
  strengths: string[],
  weaknesses: string[],
  experienceLevel: "Beginner" | "Intermediate" | "Advanced",
  createdAt: Date,
  updatedAt: Date
}
```

### Career Path Model
**Collection:** `careerpaths`

```typescript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  currentRole: string,
  targetRole: string,
  currentSkills: string[],
  requiredSkills: string[],
  matchPercentage: number,
  estimatedDuration: number (months),
  salaryRange: {
    current: number,
    target: number
  },
  milestones: [{
    _id: ObjectId,
    title: string,
    duration: number (weeks),
    skills: string[],
    description: string,
    completed: boolean
  }],
  learningResources: [{
    _id: ObjectId,
    name: string,
    type: "course" | "book" | "project" | "certification",
    duration: number (weeks),
    difficulty: "Beginner" | "Intermediate" | "Advanced",
    url: string,
    completed: boolean
  }],
  status: "active" | "completed" | "paused",
  startDate: Date,
  targetDate: Date,
  progress: number (0-100),
  createdAt: Date,
  updatedAt: Date
}
```

### Skill Gap Model
**Collection:** `skillgaps`

```typescript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  targetRole: string,
  currentSkills: string[],
  missingSkills: string[],
  matchPercentage: number,
  learningPlan: [{
    skill: string,
    priority: "High" | "Medium" | "Low",
    weeks: number
  }],
  createdAt: Date,
  updatedAt: Date
}
```

### Chat Message Model
**Collection:** `chatmessages`

```typescript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  message: string,
  response: string,
  timestamp: Date,
  sessionId: string,
  messageType: "user" | "assistant",
  context: {
    currentModule: string,
    userSkills: string[],
    careerGoals: string
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Settings Model
**Collection:** `settings`

```typescript
{
  _id: ObjectId,
  userId: ObjectId (ref: User, unique),
  notifications: {
    email: boolean,
    push: boolean,
    careerUpdates: boolean,
    skillReminders: boolean,
    mentorMessages: boolean
  },
  privacy: {
    profileVisibility: "public" | "private" | "connections",
    dataSharing: boolean,
    analytics: boolean
  },
  preferences: {
    language: string,
    timezone: string,
    theme: "light" | "dark" | "auto",
    emailFrequency: "daily" | "weekly" | "monthly" | "never"
  },
  career: {
    targetRoles: string[],
    industries: string[],
    salaryRange: {
      min: number,
      max: number,
      currency: string
    },
    workPreferences: {
      remote: boolean,
      hybrid: boolean,
      onsite: boolean,
      travel: boolean
    }
  },
  skills: {
    focusAreas: string[],
    learningStyle: "visual" | "auditory" | "kinesthetic" | "reading",
    timeCommitment: "low" | "medium" | "high"
  },
  createdAt: Date,
  updatedAt: Date
}
```

---

## Route File Organization

```
src/routes/
├── index.ts           # Main router, aggregates all routes
├── auth.routes.ts     # Authentication endpoints
├── resume.routes.ts   # Resume upload & analysis
├── skillgap.routes.ts # Skill gap analysis
├── career.routes.ts   # Career path management
├── mentor.routes.ts   # Chat/mentor endpoints
├── dashboard.routes.ts # Dashboard analytics
└── setting.routes.ts  # User settings
```

### Route Registration
All routes are registered in `src/routes/index.ts` under `/api`:
```typescript
router.use("/auth", authRoutes);
router.use("/resume", resumeRoutes);
router.use("/skillgap", skillgapRoutes);
router.use("/career", careerRoutes);
router.use("/mentor", mentorRoutes);
router.use("/settings", settingRoutes);
router.use("/dashboard", dashboardRoutes);
```

---

## File Upload Specifications

### Resume Upload

**Endpoint:** `POST /api/resume/upload`

**Specifications:**
- **Format:** multipart/form-data
- **Field Name:** "resume"
- **Accepted File Types:** PDF only
- **Max File Size:** 5MB
- **Storage:** In-memory (multer memoryStorage)
- **Processing:** 
  1. PDF validated
  2. Text extracted using pdfparser
  3. Extracted text sent to Gemini AI
  4. AI analysis results stored in database
  5. File URL and metadata stored in Resume model

**Example cURL:**
```bash
curl -X POST http://localhost:5000/api/resume/upload \
  -H "Authorization: Bearer your-token" \
  -F "resume=@/path/to/resume.pdf"
```

---

## Rate Limiting

**Configuration:**
- **Window:** 15 minutes
- **Max Requests:** 100 per window
- **Header:** Applied globally to `/api` routes

**Behavior:**
- Applies to all requests (authenticated and unauthenticated)
- Resets every 15 minutes
- Returns 429 Too Many Requests when exceeded

---

## CORS Configuration

**Enabled:** Yes
**Headers Allowed:**
- Content-Type
- Authorization
- All standard headers

**Methods Allowed:**
- GET
- POST
- PATCH
- DELETE
- PUT
- OPTIONS

---

## Summary of All Endpoints

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| POST | /api/auth/register | No | Register new user |
| POST | /api/auth/verify-otp | No | Verify registration OTP |
| POST | /api/auth/resend-otp | No | Resend OTP |
| POST | /api/auth/login | No | User login |
| POST | /api/auth/forgot-password | No | Request password reset |
| POST | /api/auth/verify-reset-otp | No | Verify reset OTP |
| POST | /api/auth/reset-password | No | Reset password |
| GET | /api/auth/me | Yes | Get current user |
| POST | /api/resume/upload | Yes | Upload & analyze resume |
| GET | /api/resume/analysis | Yes | Get latest analysis |
| POST | /api/skillgap/analyze | Yes | Generate skill gap |
| GET | /api/skillgap/analysis | Yes | Get latest analysis |
| POST | /api/career/generate | Yes | Generate career path |
| POST | /api/career/generate-quick | Yes | Quick path from resume |
| POST | /api/career/roadmap/generate | Yes | Generate roadmap |
| GET | /api/career/all | Yes | Get all paths |
| GET | /api/career/all-with-progress | Yes | Get paths with progress |
| GET | /api/career/latest | Yes | Get latest path |
| GET | /api/career/:id | Yes | Get path details |
| PATCH | /api/career/:id/progress | Yes | Update progress |
| PATCH | /api/career/:id/milestone | Yes | Update milestone |
| PATCH | /api/career/:id/resource | Yes | Update resource |
| PATCH | /api/career/:id/status | Yes | Update status |
| DELETE | /api/career/:id | Yes | Delete path |
| POST | /api/mentor/send | Yes | Send message |
| GET | /api/mentor/history | Yes | Get chat history |
| GET | /api/mentor/sessions | Yes | Get sessions |
| GET | /api/mentor/context | Yes | Get context |
| DELETE | /api/mentor/clear | Yes | Clear history |
| GET | /api/dashboard/stats | Yes | Get stats |
| GET | /api/dashboard/overview | Yes | Get overview |
| GET | /api/dashboard/progress | Yes | Get progress |
| GET | /api/dashboard/skills | Yes | Get skills analytics |
| GET | /api/settings | Yes | Get settings |
| PATCH | /api/settings | Yes | Update settings |
| GET | /api/settings/summary | Yes | Get summary |
| POST | /api/settings/reset | Yes | Reset settings |
| DELETE | /api/settings | Yes | Delete settings |

---

## Testing Examples

### 1. Register and Login Flow
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'

# Verify OTP (check email for code)
curl -X POST http://localhost:5000/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "otp": "123456"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
# Response contains token - save it for authenticated requests
```

### 2. Upload Resume
```bash
curl -X POST http://localhost:5000/api/resume/upload \
  -H "Authorization: Bearer your-token" \
  -F "resume=@/path/to/resume.pdf"
```

### 3. Generate Career Path
```bash
curl -X POST http://localhost:5000/api/career/generate \
  -H "Authorization: Bearer your-token" \
  -H "Content-Type: application/json" \
  -d '{
    "currentRole": "Junior Developer",
    "targetRole": "Staff Engineer",
    "skills": ["JavaScript", "React", "Node.js"]
  }'
```

### 4. Send Message to Mentor
```bash
curl -X POST http://localhost:5000/api/mentor/send \
  -H "Authorization: Bearer your-token" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "How do I master system design?",
    "context": {
      "currentModule": "Career Path",
      "userSkills": ["JavaScript", "React"],
      "careerGoals": "Senior Engineer"
    }
  }'
```

---

## Notes for Frontend Integration

1. **Axios Interceptor:** Add token to all authenticated requests automatically
2. **Session Management:** Store JWT token securely after login
3. **Error Handling:** Catch 401 errors and redirect to login
4. **Pagination:** Resume/Career endpoints don't use pagination format; use `limit` param in mentor history
5. **Async Operations:** Skill gap and career path generation use Gemini AI (may take 2-5 seconds)
6. **File Uploads:** Only PDF files accepted; validate before sending
7. **Real-time Chat:** Consider WebSocket upgrade for real-time mentor responses
8. **Session Persistence:** Save sessionId for ongoing mentor conversations

---

**End of API Documentation**
