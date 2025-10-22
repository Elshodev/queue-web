import { useMutation } from "@tanstack/react-query";
import { requests } from "../helpers/requests";

export const useCreateTicket = () => {
  return useMutation({
    mutationFn: async ({
      serviceId,
      facilityId,
      date,
      range,
    }: {
      serviceId: string;
      facilityId: string;
      date: string;
      range: string;
    }) => {
      const response = await requests.createTicket(
        serviceId,
        facilityId,
        date,
        range
      );
      return response.data;
    },
  });
};
