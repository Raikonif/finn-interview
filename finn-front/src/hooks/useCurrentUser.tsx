import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/services/users";

export function useCurrentUser(enabled: boolean = true) {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    enabled,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });
}
