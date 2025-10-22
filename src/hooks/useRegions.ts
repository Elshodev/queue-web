import { useQuery } from "@tanstack/react-query";
import { requests } from "../helpers/requests";
import { RegionType } from "../types";

export const useRegions = () => {
  return useQuery({
    queryKey: ["regions"],
    queryFn: async (): Promise<RegionType[]> => {
      const response = await requests.fetchRegions();
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
