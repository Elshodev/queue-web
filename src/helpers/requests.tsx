import { API_URL } from "../config";
import { LoginParamsType, QueueParamsType } from "../types";
import { $api } from "./api";
const queueWebLanguage = localStorage.getItem("queueWebLanguage") || "ru";
export const requests = {
  postLogin: (params: LoginParamsType) => $api.post(`${API_URL}/login`, params),
  postLogout: () => $api.post(`${API_URL}/logout`),
  fetchMe: () => $api.get(`${API_URL}/me`),
  fetchRegions: () => $api.get(`${API_URL}/regions`),
  fetchCategory: (type: string) =>
    $api.get(
      `${API_URL}/services/web?type=${type}&language=${queueWebLanguage}`
    ),
  fetchCategoryData: () => $api.get(`${API_URL}/date-queue`),
  fetchQueueDates: (params: { day: string }) =>
    $api.post(`${API_URL}/online-queue-by-date`, params),
  queueCreate: (params: QueueParamsType) =>
    $api.post(`${API_URL}/online-queue`, params),
  queueCreateOvir: (params: QueueParamsType) =>
    $api.post(`${API_URL}/online-queue-ovir`, params),
  createTicket: (
    serviceId: string,
    facilityId: string,
    date: string,
    range: string
  ) =>
    $api.post(
      `${API_URL}/queues/ticket/online/${serviceId}/${facilityId}?date=${date}&range=${range}`
    ),
};
