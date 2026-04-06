# Career Module - API Documentation

## 🌐 Base Path
```
/api/career
```

## Authentication
All endpoints require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

---

## 📌 API Endpoints

### 1. Generate Career Path (Custom Input)
**POST** `/career/generate`

Generate a career path with custom current role, target role, and skills.

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
    "_id": "507f1f77bcf86cd799439011",
    "userId": "507f1f77bcf86cd799439010",
    "currentRole": "Junior Developer",
    "targetRole": "Staff Engineer",
    "currentSkills": ["JavaScript", "React", "Node.js"],
    "requiredSkills": ["System Design", "Leadership", "Cloud Architecture"],
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
        "_id": "...",
        "title": "Master System Design",
        "duration": 12,
        "skills": ["Distributed Systems", "Database Design"],
        "description": "Deep dive into system design patterns...",
        "completed": false
      }
    ],
    "learningResources": [
      {
        "_id": "...",
        "name": "System Design Interview Course",
        "type": "course",
        "duration": 8,
        "difficulty": "Advanced",
        "completed": false
      }
    ],
    "createdAt": "2026-04-06T14:05:00Z",
    "updatedAt": "2026-04-06T14:05:00Z"
  }
}
```

---

### 2. Generate Quick Career Path (From Resume)
**POST** `/career/generate-quick`

Generate career path using skills from existing resume analysis.

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
  "data": { ...same as above }
}
```

---

### 3. Generate Roadmap
**POST** `/career/roadmap/generate`

Generate a detailed learning roadmap with phases and action items.

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
    "title": "Your Path to Staff Engineer",
    "description": "A 24-month transformation roadmap...",
    "phases": [
      {
        "phase": 1,
        "title": "Foundation & Fundamentals",
        "duration": 8,
        "focus": "Master core concepts in system design",
        "actionItems": [
          {
            "title": "Learn distributed systems basics",
            "description": "Study CAP theorem, consistency models...",
            "priority": "High"
          },
          {
            "title": "Complete system design course",
            "description": "Enroll in comprehensive SD course",
            "priority": "High"
          }
        ],
        "resources": [
          "System Design Interview book",
          "Grokking System Design course"
        ]
      },
      {
        "phase": 2,
        "title": "Advanced Topics & Practice",
        "duration": 8,
        "focus": "Apply knowledge to real projects",
        "actionItems": [...],
        "resources": [...]
      }
    ],
    "keyMetrics": [
      {
        "metric": "System Design Knowledge",
        "target": "Expert Level",
        "timeline": 8
      }
    ]
  }
}
```

---

### 4. Get All Career Paths
**GET** `/career/all`

Get all career paths created by the user.

**Response (200):**
```json
{
  "success": true,
  "message": "Career paths retrieved successfully",
  "data": [
    { ...career path 1 },
    { ...career path 2 }
  ]
}
```

---

### 5. Get All Career Paths With Progress
**GET** `/career/all-with-progress`

Get all career paths with calculated progress metrics.

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

---

### 6. Get Latest Career Path
**GET** `/career/latest`

Get the most recently created career path.

**Response (200):**
```json
{
  "success": true,
  "message": "Latest career path retrieved successfully",
  "data": { ...career path }
}
```

---

### 7. Get Career Path Details
**GET** `/career/:id`

Get specific career path by ID.

**Path Parameters:**
- `id` (string) - Career path ID

**Response (200):**
```json
{
  "success": true,
  "message": "Career path details retrieved successfully",
  "data": { ...career path }
}
```

---

### 8. Update Progress
**PATCH** `/career/:id/progress`

Update overall progress percentage for a career path.

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
  "data": { ...updated career path }
}
```

---

### 9. Update Milestone Completion
**PATCH** `/career/:id/milestone`

Mark a milestone as completed or incomplete.

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
  "data": { ...updated career path }
}
```

---

### 10. Update Resource Completion
**PATCH** `/career/:id/resource`

Mark a learning resource as completed or incomplete.

**Request Body:**
```json
{
  "resourceIndex": 2,
  "completed": true
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Resource completion updated successfully",
  "data": { ...updated career path }
}
```

---

### 11. Update Career Path Status
**PATCH** `/career/:id/status`

Change the status of a career path.

**Request Body:**
```json
{
  "status": "paused"
}
```

**Status Options:** `active`, `completed`, `paused`

**Response (200):**
```json
{
  "success": true,
  "message": "Career path status updated successfully",
  "data": { ...updated career path }
}
```

---

### 12. Delete Career Path
**DELETE** `/career/:id`

Delete a career path.

**Response (200):**
```json
{
  "success": true,
  "message": "Career path deleted successfully"
}
```

---

## ✅ Validation Rules

### Generate Career Path
- `currentRole`: String, minimum 2 characters (required)
- `targetRole`: String, minimum 2 characters (required)
- `skills`: Array of strings, minimum 1 item (required)

### Generate Roadmap
- `currentRole`: String, minimum 2 characters (required)
- `targetRole`: String, minimum 2 characters (required)
- `timeframe`: Number between 1-60 months (required)

### Update Progress
- `progress`: Number between 0-100

### Update Milestone/Resource
- `milestoneIndex` or `resourceIndex`: Valid array index
- `completed`: Boolean

### Update Status
- `status`: One of `active`, `completed`, `paused`

---

## ⚠️ Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Invalid request body",
  "errors": {...}
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Authentication required"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Career path not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## 📋 Request Examples

### Using cURL

```bash
# Generate career path
curl -X POST http://localhost:5000/api/career/generate \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "currentRole": "Junior Developer",
    "targetRole": "Staff Engineer",
    "skills": ["JavaScript", "React", "Node.js"]
  }'

# Get all paths with progress
curl -X GET http://localhost:5000/api/career/all-with-progress \
  -H "Authorization: Bearer <token>"

# Update milestone
curl -X PATCH http://localhost:5000/api/career/507f1f77bcf86cd799439011/milestone \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "milestoneIndex": 0,
    "completed": true
  }'
```

---

## 🔗 Integration Notes

1. **Resume Integration**
   - Quick path generation automatically extracts skills from latest resume analysis
   - Job title from resume sets the current role

2. **Database**
   - All paths stored in `careerpath` MongoDB collection
   - Indexed by `userId` and `createdAt` for efficient queries

3. **AI Integration**
   - Uses Google Gemini AI model for intelligent path generation
   - Responses are validated and formatted before storage

4. **Progress Calculation**
   - Manual progress updates stored directly
   - Automatic progress can be calculated from milestone/resource completion
