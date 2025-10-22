import { useMutation } from "@tanstack/react-query";
import { requests } from "../helpers/requests";
import { LoginParamsType } from "../types";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (params: LoginParamsType) => {
      const response = await requests.postLogin(params);
      return response.data;
    },
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await requests.postLogout();
      return response.data;
    },
  });
};
