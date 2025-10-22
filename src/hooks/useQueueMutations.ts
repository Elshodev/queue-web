import { useMutation } from "@tanstack/react-query";
import { requests } from "../helpers/requests";
import { QueueParamsType } from "../types";

export const useCreateQueue = () => {
  return useMutation({
    mutationFn: async (params: QueueParamsType) => {
      const response = await requests.queueCreate(params);
      return response.data;
    },
  });
};

export const useCreateQueueOvir = () => {
  return useMutation({
    mutationFn: async (params: QueueParamsType) => {
      const response = await requests.queueCreateOvir(params);
      return response.data;
    },
  });
};
