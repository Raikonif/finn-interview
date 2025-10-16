import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "@/services/users";
import type { UserResponse } from "@/interfaces/authentication";
import { toast } from "sonner";

export default function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (email: string) => deleteUser(email),
    // Optimistic update: immediately remove from UI before server responds
    onMutate: async (email) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["users"] });

      // Snapshot the previous value
      const previousUsers = queryClient.getQueryData<UserResponse[]>(["users"]);

      // Optimistically remove the user
      queryClient.setQueryData<UserResponse[]>(["users"], (old) => {
        if (!old) return old;
        return old.filter((user) => user.email !== email);
      });

      // Return context with the snapshot for rollback
      return { previousUsers };
    },
    onSuccess: () => {
      toast.message("User deleted successfully");
      // Invalidate and refetch to get the real data from server
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (_error, _email, context) => {
      toast.error("Error deleting user");
      // Rollback to the previous value on error
      if (context?.previousUsers) {
        queryClient.setQueryData(["users"], context.previousUsers);
      }
    },
  });
}

