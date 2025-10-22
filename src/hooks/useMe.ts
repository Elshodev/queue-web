import { useQuery } from "@tanstack/react-query";
import { requests } from "../helpers/requests";

export const useMe = () => {
  const { data: meResponse, isLoading: isMeLoading } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const response = await requests.fetchMe();
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchOnMount: false,
  });

  return {
    me: meResponse,
    isLoading: isMeLoading,
  };
};
