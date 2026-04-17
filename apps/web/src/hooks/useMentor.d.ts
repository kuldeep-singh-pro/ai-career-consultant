export declare const useSendMessage: () => import("@tanstack/react-query").UseMutationResult<any, Error, {
    sessionId: string;
    message: string;
}, unknown>;
export declare const useMentorHistory: (sessionId: string, limit?: number, enabled?: boolean) => import("@tanstack/react-query").UseQueryResult<any, Error>;
export declare const useMentorSessions: (enabled?: boolean) => import("@tanstack/react-query").UseQueryResult<any, Error>;
export declare const useClearMentorSession: () => import("@tanstack/react-query").UseMutationResult<any, Error, string, unknown>;
//# sourceMappingURL=useMentor.d.ts.map