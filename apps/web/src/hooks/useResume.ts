import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { resumeService } from '../services/resume.service';

export const useUploadResume = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => resumeService.uploadResume(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resumes'] });
    },
  });
};

export const useAnalyzeResume = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (resumeId: string) => resumeService.analyzeResume(resumeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resume', 'analysis'] });
    },
  });
};

export const useResumeAnalysis = (analysisId: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['resume', 'analysis', analysisId],
    queryFn: () => resumeService.getAnalysis(analysisId),
    enabled: enabled && !!analysisId,
  });
};
