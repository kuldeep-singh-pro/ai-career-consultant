import { Resume, ResumeAnalysis } from "../types";
export declare const resumeService: {
    uploadResume(file: File): Promise<Resume>;
    analyzeResume(): Promise<ResumeAnalysis>;
    getAnalysis(): Promise<ResumeAnalysis>;
};
//# sourceMappingURL=resume.service.d.ts.map