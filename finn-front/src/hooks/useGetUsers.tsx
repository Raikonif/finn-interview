import {useQuery} from "@tanstack/react-query";
import {getUsers} from "@/services/users";

export default function useGetUsers(enabled = true){
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    enabled,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });
}
