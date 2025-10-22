import { useQuery } from "@tanstack/react-query";
import { requests } from "../helpers/requests";

export const useQueueDates = (day: string, enabled: boolean = true) => {
  const { data: queueDatesResponse, isLoading: isQueueDatesLoading } = useQuery(
    {
      queryKey: ["queueDates", day],
      queryFn: async () => {
        const response = await requests.fetchQueueDates({ day });
        return response.data;
      },
      enabled: enabled && !!day,
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchOnMount: false,
    }
  );

  return {
    queueDates: queueDatesResponse,
    isLoading: isQueueDatesLoading,
  };
};
