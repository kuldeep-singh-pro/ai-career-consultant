import { ResumeAnalysis } from "../types";
export declare const useUploadResume: () => import("@tanstack/react-query").UseMutationResult<import("../types").Resume, Error, File, unknown>;
export declare const useAnalyzeResume: () => import("@tanstack/react-query").UseMutationResult<ResumeAnalysis, Error, void, unknown>;
export declare const useResumeAnalysis: (enabled?: boolean) => import("@tanstack/react-query").UseQueryResult<ResumeAnalysis, Error>;
//# sourceMappingURL=useResume.d.ts.map