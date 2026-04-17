import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { resumeService } from '../services/resume.service';
export const useUploadResume = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (file) => resumeService.uploadResume(file),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['resumes'] });
        },
    });
};
export const useAnalyzeResume = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (resumeId) => resumeService.analyzeResume(resumeId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['resume', 'analysis'] });
        },
    });
};
export const useResumeAnalysis = (analysisId, enabled = true) => {
    return useQuery({
        queryKey: ['resume', 'analysis', analysisId],
        queryFn: () => resumeService.getAnalysis(analysisId),
        enabled: enabled && !!analysisId,
    });
};
