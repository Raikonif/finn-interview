import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "@/services/users";
import type {UserResponse, UserUpdateCredentials} from "@/interfaces/authentication";
import { toast } from "sonner";

export default function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: UserUpdateCredentials) => updateUser(userData),
    // Optimistic update: immediately update UI before server responds
    onMutate: async (updatedUser) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["users"] });

      // Snapshot the previous value
      const previousUsers = queryClient.getQueryData<UserResponse[]>(["users"]);

      // Optimistically update to the new value
      queryClient.setQueryData<UserResponse[]>(["users"], (old) => {
        if (!old) return old;
        return old.map((user) =>
          user.id === updatedUser.id
            ? { id: user.id, fullName: updatedUser.fullname, email: updatedUser.email }
            : user
        );
      });

      // Return context with the snapshot for rollback
      return { previousUsers };
    },
    onSuccess: () => {
      toast.message("User updated successfully");
      // Invalidate and refetch to get the real data from server
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (_error, _updatedUser, context) => {
      toast.error("Error updating user");
      // Rollback to the previous value on error
      if (context?.previousUsers) {
        queryClient.setQueryData(["users"], context.previousUsers);
      }
    },
  });
}
