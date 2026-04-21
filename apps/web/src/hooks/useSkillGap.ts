import {
  useQuery,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";

import {
  skillGapService
} from "../services/skillgap.service";

export const useSkillGap =
(
  enabled: boolean = true
) =>
{
  return useQuery(
  {
    queryKey: ["skillgap"],
    queryFn:
      skillGapService.getSkillGap,
    enabled,
    staleTime: 0
  });
};


export const useGenerateSkillGap =
() =>
{
  const queryClient =
    useQueryClient();

  return useMutation(
  {
    mutationFn:
      skillGapService.generateSkillGap,

    onSuccess:
      async () =>
      {
        await queryClient.removeQueries(
        {
          queryKey: ["skillgap"]
        });

        await queryClient.invalidateQueries(
        {
          queryKey: ["skillgap"]
        });

        await queryClient.invalidateQueries(
        {
          queryKey: ["dashboardStats"]
        });
      }
  });
};


export const useDeleteSkillGap =
() =>
{
  const queryClient =
    useQueryClient();

  return useMutation(
  {
    mutationFn:
      skillGapService.deleteSkillGap,

    onSuccess:
      async () =>
      {
        await queryClient.removeQueries(
        {
          queryKey: ["skillgap"]
        });

        await queryClient.invalidateQueries(
        {
          queryKey: ["dashboardStats"]
        });
      }
  });
};