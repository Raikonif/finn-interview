import { useMutation, useQueryClient } from "@tanstack/react-query";

import { signUpUser } from "@/services/users";
import type { UserAuthCredentials, UserResponse } from "@/interfaces/authentication";
import {toast} from "sonner";

export default function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: UserAuthCredentials) => signUpUser(userData),
    onMutate: async (newUser) => {
      await queryClient.cancelQueries({ queryKey: ["users"] });

      const previousUsers = queryClient.getQueryData<UserResponse[]>(["users"]);

      queryClient.setQueryData<UserResponse[]>(["users"], (old) => {
        const optimisticUser: UserResponse = {
          id: Date.now(), // Temporary ID
          fullName: newUser.fullname,
          email: newUser.email,
        };
        return old ? [...old, optimisticUser] : [optimisticUser];
      });

      return { previousUsers };
    },
    onSuccess: () => {
      toast.message("User created successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (_error, _newUser, context) => {
      toast.error("Error creating user");
      if (context?.previousUsers) {
        queryClient.setQueryData(["users"], context.previousUsers);
      }
    },
  });
}
