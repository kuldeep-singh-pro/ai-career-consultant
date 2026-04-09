import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileService } from '../services/profile.service';

export const useProfile = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: () => profileService.getProfile(),
    enabled,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => profileService.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};

export const useUploadProfilePicture = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => profileService.uploadProfilePicture(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};
