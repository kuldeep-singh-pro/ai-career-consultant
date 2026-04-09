import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { careerService } from '../services/career.service';

export const useGenerateCareerPath = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => careerService.generateCareerPath(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['career', 'paths'] });
    },
  });
};

export const useCareerPaths = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ['career', 'paths'],
    queryFn: () => careerService.getCareerPaths(),
    enabled,
  });
};

export const useCareerPath = (pathId: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['career', 'path', pathId],
    queryFn: () => careerService.getCareerPath(pathId),
    enabled: enabled && !!pathId,
  });
};

export const useUpdateCareerPath = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ pathId, data }: { pathId: string; data: any }) => careerService.updateCareerPath(pathId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['career', 'paths'] });
    },
  });
};

export const useDeleteCareerPath = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (pathId: string) => careerService.deleteCareerPath(pathId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['career', 'paths'] });
    },
  });
};

export const useGenerateRoadmap = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (careerPathId: string) => careerService.generateRoadmap(careerPathId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roadmap'] });
    },
  });
};

export const useRoadmaps = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ['roadmap'],
    queryFn: () => careerService.getRoadmaps(),
    enabled,
  });
};

export const useRoadmap = (roadmapId: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['roadmap', roadmapId],
    queryFn: () => careerService.getRoadmap(roadmapId),
    enabled: enabled && !!roadmapId,
  });
};

export const useUpdateMilestone = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ roadmapId, milestoneId, status }: { roadmapId: string; milestoneId: string; status: string }) =>
      careerService.updateMilestone(roadmapId, milestoneId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roadmap'] });
    },
  });
};
