export const ROUTES = {
    PUBLIC: {
        HOME: '/',
        LOGIN: '/login',
        REGISTER: '/register',
    },
    PROTECTED: {
        DASHBOARD: '/dashboard',
        RESUME_ANALYZER: '/resume-analyzer',
        SKILL_GAP: '/skill-gap',
        CAREER_PATHS: '/career-paths',
        ROADMAP: '/roadmap',
        MENTOR_CHAT: '/mentor-chat',
        PROFILE: '/profile',
        SETTINGS: '/settings',
    },
};
export const API_ENDPOINTS = {
    AUTH: {
        REGISTER: '/auth/register',
        LOGIN: '/auth/login',
        VERIFY_OTP: '/auth/verify-otp',
        RESET_PASSWORD: '/auth/reset-password',
    },
    DASHBOARD: {
        STATS: '/dashboard/stats',
        OVERVIEW: '/dashboard/overview',
        PROGRESS: '/dashboard/progress',
        SKILLS_ANALYTICS: '/dashboard/skills-analytics',
    },
    RESUME: {
        UPLOAD: '/resume/upload',
        // fixed endpoint (matches backend)
        ANALYZE: (resumeId) => `/resume/analysis/${resumeId}`,
        ANALYSIS: (analysisId) => `/resume/analysis/${analysisId}`,
    },
    SKILLGAP: {
        GENERATE: '/skillgap/generate',
        LATEST: '/skillgap/latest',
    },
    CAREER: {
        GENERATE: '/career/generate',
        PATHS: '/career/paths',
        ROADMAP_GENERATE: '/roadmap/generate',
        ROADMAP: '/roadmap',
    },
    MENTOR: {
        SEND: '/mentor/send',
        HISTORY: '/mentor/history',
        SESSIONS: '/mentor/sessions',
        SESSION: '/mentor/session',
    },
    PROFILE: {
        GET: '/profile',
        UPDATE: '/profile',
        UPLOAD_PICTURE: '/profile/upload-picture',
    },
    SETTINGS: {
        GET: '/settings',
        UPDATE: '/settings',
        RESET: '/settings/reset',
        SUMMARY: '/settings/summary',
        DELETE: '/settings/account',
    },
};
