# 🎯 Career Module - Quick Reference Guide

## ✅ What Was Created

Complete **Career Module** for your backend with 6 core files:

| File | Purpose | Lines |
|------|---------|-------|
| `ai/agents/career.agent.ts` | AI path & roadmap generation | 167 |
| `models/careerpath.model.ts` | MongoDB schema & interface | 103 |
| `dto/career.dto.ts` | Zod validation schemas | 72 |
| `services/career.service.ts` | Business logic & DB ops | 158 |
| `controller/career.controller.ts` | API endpoint handlers | 198 |
| `routes/career.routes.ts` | Express routes & middleware | 71 |

**Plus:**
- Updated `routes/index.ts` to register career routes
- 3 comprehensive documentation files

---

## 🚀 Quick Start - Test the API

### 1. Generate Career Path (Custom)
```bash
curl -X POST http://localhost:5000/api/career/generate \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "currentRole": "Junior Developer",
    "targetRole": "Staff Engineer",
    "skills": ["JavaScript", "React", "Node.js"]
  }'
```

### 2. Generate Quick Path (From Resume)
```bash
curl -X POST http://localhost:5000/api/career/generate-quick \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "targetRole": "Cloud Architect"
  }'
```

### 3. Get All Paths with Progress
```bash
curl -X GET http://localhost:5000/api/career/all-with-progress \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 4. Mark Milestone as Complete
```bash
curl -X PATCH http://localhost:5000/api/career/PATH_ID/milestone \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "milestoneIndex": 0,
    "completed": true
  }'
```

---

## 📊 Data Returned

### Career Path Response
```json
{
  "_id": "...",
  "userId": "...",
  "currentRole": "Junior Developer",
  "targetRole": "Staff Engineer",
  "currentSkills": ["JavaScript", "React", "Node.js"],
  "requiredSkills": ["System Design", "Leadership"],
  "matchPercentage": 45,
  "estimatedDuration": 24,          // months
  "salaryRange": {
    "current": 80000,
    "target": 200000
  },
  "progress": 0,
  "status": "active",               // or "paused", "completed"
  "milestones": [
    {
      "title": "Master System Design",
      "duration": 12,               // weeks
      "skills": ["Distributed Systems"],
      "description": "...",
      "completed": false
    }
  ],
  "learningResources": [
    {
      "name": "System Design Course",
      "type": "course",             // or "book", "project", "certification"
      "duration": 8,                // weeks
      "difficulty": "Advanced",     // or "Beginner", "Intermediate"
      "completed": false
    }
  ],
  "startDate": "2026-04-06T...",
  "createdAt": "2026-04-06T...",
  "updatedAt": "2026-04-06T..."
}
```

### Roadmap Response
```json
{
  "title": "Your Path to Staff Engineer",
  "description": "24-month career transformation...",
  "phases": [
    {
      "phase": 1,
      "title": "Foundation & Fundamentals",
      "duration": 8,
      "focus": "Learn system design basics",
      "actionItems": [
        {
          "title": "Learn distributed systems",
          "description": "Study CAP theorem...",
          "priority": "High"
        }
      ],
      "resources": ["System Design Interview"]
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
```

---

## 🔌 12 API Endpoints

### Generate Paths
- `POST /career/generate` - Custom path with your inputs
- `POST /career/generate-quick` - Path from resume data
- `POST /career/roadmap/generate` - Learning roadmap

### Retrieve Paths
- `GET /career/all` - All your career paths
- `GET /career/all-with-progress` - With progress metrics
- `GET /career/latest` - Most recent path
- `GET /career/:id` - Specific path details

### Update Paths
- `PATCH /career/:id/progress` - Update progress %
- `PATCH /career/:id/milestone` - Mark milestone done
- `PATCH /career/:id/resource` - Mark resource done
- `PATCH /career/:id/status` - Change status

### Delete
- `DELETE /career/:id` - Delete career path

---

## 🎯 API Usage Examples

### Scenario 1: New User Creates Career Path
```javascript
// User specifies target role
POST /career/generate-quick
{ "targetRole": "Senior Level" }

// Returns career path with:
// - Current skills from resume
// - Required new skills
// - Learning milestones
// - Resource recommendations
// - Estimated duration & salary
```

### Scenario 2: Track Progress
```javascript
// Get all paths with progress
GET /career/all-with-progress

// Returns:
// - milestonesProgress: 33%
// - resourcesProgress: 50%
// - totalProgress: 41.5%

// Mark milestone 1 complete
PATCH /career/PATH_ID/milestone
{ "milestoneIndex": 0, "completed": true }

// Mark resource 2 complete
PATCH /career/PATH_ID/resource
{ "resourceIndex": 1, "completed": true }
```

### Scenario 3: Pause Career Path
```javascript
// Change status to paused
PATCH /career/PATH_ID/status
{ "status": "paused" }

// Later resume
PATCH /career/PATH_ID/status
{ "status": "active" }

// Or mark complete
PATCH /career/PATH_ID/status
{ "status": "completed" }
```

---

## 📖 Full Documentation

| Document | Content |
|----------|---------|
| `CAREER_MODULE.md` | Architecture, features, data structures |
| `CAREER_API.md` | Complete API reference with examples |
| `IMPLEMENTATION_SUMMARY.md` | Overview & integration guide |

---

## 🧪 Testing with Postman/Insomnia

1. **Create Collection**: Career Module
2. **Set Variable**: `token` = your JWT token
3. **Add Requests**: (see CAREER_API.md for full list)

```
Headers:
- Authorization: Bearer {{token}}
- Content-Type: application/json

Body (JSON):
{
  "currentRole": "...",
  "targetRole": "...",
  "skills": [...]
}
```

---

## 🔍 Features at a Glance

✅ **AI-Powered**
- Uses Google Gemini for intelligent recommendations
- Generates structured career paths
- Creates phase-based learning roadmaps

✅ **Progress Tracking**
- Overall progress percentage
- Milestone completion tracking
- Learning resource tracking
- Auto-calculated metrics

✅ **Flexible Management**
- Create, read, update, delete career paths
- Multiple status states (active/paused/completed)
- Update progress and completion
- Track milestones and resources

✅ **Resume Integration**
- Quick path generation from resume skills
- Auto-extracts job title as current role
- No manual skill entry needed

✅ **Type-Safe**
- Full TypeScript support
- Zod validation schemas
- Clear interfaces

✅ **Production Ready**
- Error handling
- Authentication (JWT)
- Input validation
- Consistent response format

---

## 📱 Frontend Integration

### Display Career Paths
```javascript
// Get all paths with progress
GET /career/all-with-progress
```

### Create New Path
```javascript
// Option 1: Quick from resume
POST /career/generate-quick
{ targetRole: "..." }

// Option 2: Custom inputs
POST /career/generate
{ currentRole: "...", targetRole: "...", skills: [...] }
```

### Show Details & Progress
```javascript
// Get specific path
GET /career/:id

// Update progress
PATCH /career/:id/progress
{ progress: 50 }

// Mark items done
PATCH /career/:id/milestone
{ milestoneIndex: 0, completed: true }
```

---

## 🎓 Architecture Pattern

The Career Module follows the exact same architecture as your existing SkillGap module:

```
Route → Controller → Service → Model
  ↓         ↓          ↓         ↓
(URL)    (Handler)  (Logic)   (DB)

With middleware:
- Authentication (JWT)
- Request Validation (Zod DTOs)
- Error Handling
```

---

## 💾 Database Collection

Collection: `careerpath`
Indexed by: `userId`, `createdAt`

---

## ✨ Next Steps

1. ✅ Test endpoints with provided cURL examples
2. ✅ Wire up frontend career path pages
3. ✅ Implement progress visualization
4. ✅ Add milestone/resource completion UI
5. ✅ Create career path comparison feature

---

## 📞 Questions?

- **How to use endpoints?** → See CAREER_API.md
- **How does it work?** → See CAREER_MODULE.md
- **Integration help?** → Check skillgap module (same pattern)

**Everything is ready to integrate with your frontend!** 🚀
