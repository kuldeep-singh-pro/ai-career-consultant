import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { careerService } from "../services/career.service";

export const useGenerateCareerPath = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: careerService.generateCareerPath,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["career", "latest"] });
      queryClient.invalidateQueries({ queryKey: ["career", "paths"] });
    },
  });
};

export const useGenerateQuickCareerPath = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (role: string) => careerService.generateQuickCareerPath(role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["career", "latest"] });
      queryClient.invalidateQueries({ queryKey: ["career", "paths"] });
    },
  });
};

export const useGenerateRoadmap = () => {
  return useMutation({
    mutationFn: careerService.generateRoadmap,
  });
};

export const useLatestCareerPath = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ["career", "latest"],
    queryFn: careerService.getLatestCareerPath,
    enabled,
  });
};

export const useCareerPaths = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ["career", "paths"],
    queryFn: careerService.getCareerPathsWithProgress,
    enabled,
  });
};

export const useCareerPathDetail = (id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ["career", "detail", id],
    queryFn: () => careerService.getCareerPath(id),
    enabled: enabled && !!id,
  });
};

export const useDeleteCareerPath = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: careerService.deleteCareerPath,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["career", "paths"] });
      queryClient.invalidateQueries({ queryKey: ["career", "latest"] });
    },
  });
};

export const useUpdateMilestone = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      careerPathId,
      milestoneIndex,
      completed,
    }: {
      careerPathId: string;
      milestoneIndex: number;
      completed: boolean;
    }) => careerService.updateMilestone(careerPathId, milestoneIndex, completed),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["career", "paths"] });
      queryClient.invalidateQueries({ queryKey: ["career", "latest"] });
      queryClient.invalidateQueries({ queryKey: ["career", "detail", variables.careerPathId] });
    },
  });
};

export const useUpdateStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      careerPathId,
      status,
    }: {
      careerPathId: string;
      status: string;
    }) => careerService.updateStatus(careerPathId, status),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["career", "paths"] });
      queryClient.invalidateQueries({ queryKey: ["career", "latest"] });
      queryClient.invalidateQueries({ queryKey: ["career", "detail", variables.careerPathId] });
    },
  });
};

export const useRefreshProgress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      careerPathId,
      progress,
    }: {
      careerPathId: string;
      progress: number;
    }) => careerService.refreshProgress(careerPathId, progress),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["career", "paths"] });
      queryClient.invalidateQueries({ queryKey: ["career", "latest"] });
      queryClient.invalidateQueries({ queryKey: ["career", "detail", variables.careerPathId] });
    },
  });
};