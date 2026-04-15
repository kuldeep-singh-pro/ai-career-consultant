import {
  useQuery,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";

import {
  userService
} from "../services/user.service";

export const useCurrentUser =
(
  enabled: boolean = true
) =>
{
  return useQuery({
    queryKey: ["current-user"],
    queryFn:
      userService.getCurrentUser,
    enabled
  });
};

export const useUpdateUser =
() =>
{
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn:
      userService.updateCurrentUser,

    onSuccess:
      (updatedUser) =>
      {
        queryClient.setQueryData(
          ["current-user"],
          updatedUser
        );
      }
  });
};

export const useUploadProfilePicture =
() =>
{
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn:
      userService.uploadProfilePicture,

    onSuccess:
      (updatedUser) =>
      {
        queryClient.setQueryData(
          ["current-user"],
          updatedUser
        );
      }
  });
};