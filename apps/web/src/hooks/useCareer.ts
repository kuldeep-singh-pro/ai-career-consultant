import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { careerService } from "../services/career.service";

export const useGenerateCareerPath =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        careerService.generateQuickCareerPath,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["career", "paths"],
        });
      },
    });
  };

export const useCareerPaths = (
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: ["career", "paths"],
    queryFn:
      careerService.getCareerPathsWithProgress,
    enabled,
  });
};

export const useDeleteCareerPath =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        careerService.deleteCareerPath,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["career", "paths"],
        });
      },
    });
  };

export const useUpdateMilestone =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn: ({
        careerPathId,
        milestoneIndex,
        completed,
      }: {
        careerPathId: string;
        milestoneIndex: number;
        completed: boolean;
      }) =>
        careerService.updateMilestone(
          careerPathId,
          milestoneIndex,
          completed
        ),

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["career", "paths"],
        });
      },
    });
  };

export const useUpdateStatus = () => {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      careerPathId,
      status,
    }: {
      careerPathId: string;
      status: string;
    }) =>
      careerService.updateStatus(
        careerPathId,
        status
      ),

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["career", "paths"],
        });
      },
    });
};

export const useRefreshProgress =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn: ({
        careerPathId,
        progress,
      }: {
        careerPathId: string;
        progress: number;
      }) =>
        careerService.refreshProgress(
          careerPathId,
          progress
        ),

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["career", "paths"],
        });
      },
    });
};