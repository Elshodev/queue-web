export type QueueParamsType = {
  category_id: number;
  car_number: string;
  day: string;
  date: string;
  phone_number?: string;
  structure_id?: number;
  type?: number;
};

export type CheckType = {
  id?: number;
  prefix?: string;
  queue?: string;
  service?: string;
  startDate?: string;
  endDate?: string;
  qrCode?: string;
};
