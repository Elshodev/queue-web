import { useQuery } from "@tanstack/react-query";
import { requests } from "../helpers/requests";

export const useCategoryData = () => {
  const { data: categoryDataResponse, isLoading: isCategoryDataLoading } =
    useQuery({
      queryKey: ["categoryData"],
      queryFn: async () => {
        const response = await requests.fetchCategoryData();
        return response.data.data;
      },
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchOnMount: false,
    });

  return {
    categoryData: categoryDataResponse,
    isLoading: isCategoryDataLoading,
  };
};
