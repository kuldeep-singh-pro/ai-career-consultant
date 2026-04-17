import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { resumeService } from "../services/resume.service";
import { ResumeAnalysis } from "../types";

export const useUploadResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) =>
      resumeService.uploadResume(file),

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
    mutationFn:
      resumeService.analyzeResume,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["resume", "analysis"],
      });
    },
  });
};

export const useResumeAnalysis = (
  enabled: boolean = true
) => {
  return useQuery<ResumeAnalysis>({
    queryKey: ["resume", "analysis"],
    queryFn:
      resumeService.getAnalysis,
    enabled,
  });
};