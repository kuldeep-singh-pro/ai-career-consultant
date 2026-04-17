export declare const ROUTES: {
    PUBLIC: {
        HOME: string;
        LOGIN: string;
        REGISTER: string;
    };
    PROTECTED: {
        DASHBOARD: string;
        RESUME_ANALYZER: string;
        SKILL_GAP: string;
        CAREER_PATHS: string;
        ROADMAP: string;
        MENTOR_CHAT: string;
        PROFILE: string;
        SETTINGS: string;
    };
};
export declare const API_ENDPOINTS: {
    AUTH: {
        REGISTER: string;
        LOGIN: string;
        VERIFY_OTP: string;
        RESET_PASSWORD: string;
    };
    DASHBOARD: {
        STATS: string;
        OVERVIEW: string;
        PROGRESS: string;
        SKILLS_ANALYTICS: string;
    };
    RESUME: {
        UPLOAD: string;
        ANALYZE: (resumeId: string) => string;
        ANALYSIS: (analysisId: string) => string;
    };
    SKILLGAP: {
        GENERATE: string;
        LATEST: string;
    };
    CAREER: {
        GENERATE: string;
        PATHS: string;
        ROADMAP_GENERATE: string;
        ROADMAP: string;
    };
    MENTOR: {
        SEND: string;
        HISTORY: string;
        SESSIONS: string;
        SESSION: string;
    };
    PROFILE: {
        GET: string;
        UPDATE: string;
        UPLOAD_PICTURE: string;
    };
    SETTINGS: {
        GET: string;
        UPDATE: string;
        RESET: string;
        SUMMARY: string;
        DELETE: string;
    };
};
//# sourceMappingURL=constants.d.ts.map