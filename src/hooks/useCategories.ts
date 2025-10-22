import { useQuery } from "@tanstack/react-query";
import { requests } from "../helpers/requests";

export const useCategories = (type: string) => {
  const { data: categoriesResponse, isLoading: isCategoriesLoading } = useQuery(
    {
      queryKey: ["services", type],
      queryFn: async () => {
        const response = await requests.fetchCategory(type);
        return response.data.data;
      },
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchOnMount: false,
    }
  );

  return {
    categories: categoriesResponse,
    isLoading: isCategoriesLoading,
  };
};
