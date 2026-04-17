import { useMutation, useQuery, useQueryClient, } from "@tanstack/react-query";
import { resumeService } from "../services/resume.service";
export const useUploadResume = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (file) => resumeService.uploadResume(file),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["resume", "analysis"],
            });
        },
    });
};
export const useAnalyzeResume = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: resumeService.analyzeResume,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["resume", "analysis"],
            });
        },
    });
};
export const useResumeAnalysis = (enabled = true) => {
    return useQuery({
        queryKey: ["resume", "analysis"],
        queryFn: resumeService.getAnalysis,
        enabled,
    });
};
