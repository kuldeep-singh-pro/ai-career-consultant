export declare const useGenerateCareerPath: () => import("@tanstack/react-query").UseMutationResult<any, Error, void, unknown>;
export declare const useGenerateQuickCareerPath: () => import("@tanstack/react-query").UseMutationResult<any, Error, string, unknown>;
export declare const useGenerateRoadmap: () => import("@tanstack/react-query").UseMutationResult<any, Error, void, unknown>;
export declare const useLatestCareerPath: (enabled?: boolean) => import("@tanstack/react-query").UseQueryResult<any, Error>;
export declare const useCareerPaths: (enabled?: boolean) => import("@tanstack/react-query").UseQueryResult<any, Error>;
export declare const useCareerPathDetail: (id: string, enabled?: boolean) => import("@tanstack/react-query").UseQueryResult<any, Error>;
export declare const useDeleteCareerPath: () => import("@tanstack/react-query").UseMutationResult<any, Error, string, unknown>;
export declare const useUpdateMilestone: () => import("@tanstack/react-query").UseMutationResult<any, Error, {
    careerPathId: string;
    milestoneIndex: number;
    completed: boolean;
}, unknown>;
export declare const useUpdateStatus: () => import("@tanstack/react-query").UseMutationResult<any, Error, {
    careerPathId: string;
    status: string;
}, unknown>;
export declare const useRefreshProgress: () => import("@tanstack/react-query").UseMutationResult<any, Error, {
    careerPathId: string;
    progress: number;
}, unknown>;
//# sourceMappingURL=useCareer.d.ts.map