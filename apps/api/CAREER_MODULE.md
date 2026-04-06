# Career Module - Complete Backend Implementation

## 📋 Overview
The Career Module provides AI-powered career path generation, roadmap creation, and progress tracking. It follows the same architectural pattern as the SkillGap module.

## 📁 Files Created

### 1. **agents/career.agent.ts**
AI agent for generating career paths and learning roadmaps using Gemini AI.

**Functions:**
- `generateCareerPathWithAi(currentRole, targetRole, skills)` - Generates detailed career path with milestones, resources, and salary info
- `generateRoadmapWithAi(currentRole, targetRole, timeframe)` - Generates phase-based learning roadmap with action items

### 2. **models/careerpath.model.ts**
MongoDB schema for career paths with complete tracking capabilities.

**Fields:**
- `userId` - Reference to User
- `currentRole` - User's current job title
- `targetRole` - Target career role
- `currentSkills` - Array of existing skills
- `requiredSkills` - Array of required skills for target role
- `matchPercentage` - Career match percentage
- `estimatedDuration` - Duration in months
- `salaryRange` - Current and target salary
- `milestones` - Array of career milestones with completion status
- `learningResources` - Courses, books, projects with completion tracking
- `status` - active | completed | paused
- `progress` - Overall progress percentage 0-100
- `timestamps` - createdAt, updatedAt

### 3. **dto/career.dto.ts**
Zod validation schemas for API requests and responses.

**Schemas:**
- `GenerateCareerPathRequestDto` - Validates currentRole, targetRole, skills
- `GenerateRoadmapRequestDto` - Validates currentRole, targetRole, timeframe (1-60 months)
- `CareerPathResponseDto` - Validates complete career path response
- `RoadmapResponseDto` - Validates roadmap generation response
- `GetCareerPathRequestDto` - Optional path ID validation

### 4. **services/career.service.ts**
Business logic for career path operations.

**Functions:**
- `createCareerPath(data)` - Save generated career path to DB
- `getCareerPathsByUserId(userId)` - Get all paths for user
- `getLatestCareerPath(userId)` - Get most recent path
- `getCareerPathById(id)` - Get specific path details
- `updateCareerPathProgress(id, progress)` - Update progress percentage
- `updateMilestoneCompletion(id, index, completed)` - Mark milestone as done
- `updateResourceCompletion(id, index, completed)` - Mark resource as done
- `updateCareerPathStatus(id, status)` - Change path status
- `deleteCareerPath(id)` - Delete a path
- `getUserCareerPathsWithProgress(userId)` - Get paths with calculated progress metrics

### 5. **controller/career.controller.ts**
API endpoint handlers for career operations.

**Endpoints:**
- `generateCareerPathController` - POST /career/generate
- `generateQuickCareerPathController` - POST /career/generate-quick (uses resume data)
- `generateRoadmapController` - POST /career/roadmap/generate
- `getCareerPathsController` - GET /career/all
- `getCareerPathsWithProgressController` - GET /career/all-with-progress
- `getLatestCareerPathController` - GET /career/latest
- `getCareerPathDetailController` - GET /career/:id
- `updateProgressController` - PATCH /career/:id/progress
- `updateMilestoneController` - PATCH /career/:id/milestone
- `updateResourceController` - PATCH /career/:id/resource
- `updateStatusController` - PATCH /career/:id/status
- `deleteCareerPathController` - DELETE /career/:id

### 6. **routes/career.routes.ts**
Express router with all career endpoints and middleware.

**Routes:**
```
POST   /career/generate                  - Generate career path (with validation)
POST   /career/generate-quick           - Quick generation from resume
POST   /career/roadmap/generate         - Generate roadmap (with validation)
GET    /career/all                      - Get all career paths
GET    /career/all-with-progress        - Get paths with progress metrics
GET    /career/latest                   - Get latest career path
GET    /career/:id                      - Get specific path details
PATCH  /career/:id/progress             - Update progress
PATCH  /career/:id/milestone            - Update milestone status
PATCH  /career/:id/resource             - Update resource status
PATCH  /career/:id/status               - Update path status
DELETE /career/:id                      - Delete career path
```

### 7. **Updated routes/index.ts**
Added career routes to main router:
```typescript
router.use("/career", careerRoutes);
```

## 🔑 Key Features

### 1. **AI-Powered Career Path Generation**
- Analyzes current role, target role, and existing skills
- Generates structured career path with milestones and resources
- Provides salary range estimates
- Calculates skill match percentages

### 2. **Learning Roadmap Generation**
- Creates phase-based learning plan
- Includes action items with priorities
- Specifies resource recommendations
- Tracks key metrics for progression

### 3. **Progress Tracking**
- Overall progress percentage (0-100)
- Milestone completion tracking
- Learning resource completion tracking
- Automatic progress calculation from completed items

### 4. **Quick Career Path**
- Integrates with existing resume analysis data
- Auto-extracts skills and current role from resume
- One-click career path generation

### 5. **Flexible Status Management**
- Active, Completed, or Paused states
- Ability to update and modify paths
- Full CRUD operations

## 📊 Data Structure Examples

### Career Path Response
```json
{
  "_id": "...",
  "userId": "...",
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
  "milestones": [...],
  "learningResources": [...],
  "createdAt": "2026-04-06T...",
  "updatedAt": "2026-04-06T..."
}
```

### Roadmap Response
```json
{
  "title": "...",
  "description": "...",
  "phases": [
    {
      "phase": 1,
      "title": "...",
      "duration": 8,
      "focus": "...",
      "actionItems": [...],
      "resources": [...]
    }
  ],
  "keyMetrics": [...]
}
```

## 🔐 Authentication
All endpoints require `protect` middleware - JWT authentication required.

## 📝 Validation
All POST/PATCH requests with body data are validated using Zod schemas via `validate` middleware.

## 🚀 Success Response Format
```json
{
  "success": true,
  "message": "...",
  "data": {...}
}
```

## 🛠️ Integration with Existing Modules
- **Resume Data**: Quick path generation pulls skills from resume analysis
- **Authentication**: Uses existing auth middleware
- **Error Handling**: Uses existing error handler utilities
- **Response Format**: Matches existing ApiResponse pattern

## 📦 Database Collections
- `careerpath` - Stores all career paths with full tracking data

## 🔄 Data Flow
1. User requests career path generation
2. AI Agent analyzes input and generates structured path
3. Service creates DB entry with milestones and resources
4. User can update progress, mark items complete, or change status
5. Frontend displays path with real-time progress tracking

## Consistency with SkillGap Module
✅ Same folder structure
✅ Same naming conventions
✅ Same error handling approach
✅ Same validation pattern (Zod)
✅ Same authentication middleware
✅ Same response format
✅ Same async handler pattern
