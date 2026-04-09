import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { skillGapService } from '../services/skillgap.service';

export const useGenerateSkillGap = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => skillGapService.generateSkillGap(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skillgap'] });
    },
  });
};

export const useSkillGap = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ['skillgap', 'latest'],
    queryFn: () => skillGapService.getSkillGap(),
    enabled,
  });
};

export const useUpdateSkillGap = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ skillGapId, analysis }: { skillGapId: string; analysis: any }) =>
      skillGapService.updateSkillGap(skillGapId, analysis),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skillgap'] });
    },
  });
};
