export type ServiceCardType = {
  id: number;
  name: string;
  slug: string;
  child_id: ServiceCardType[];
  type: { int: number; string: string };
};

export type QueueDataType = {
  id: number;
  type: number;
  date: string;
};
export type CategoriesType = {
  id: number;
  name: string;
  name_uz: string;
  name_ru: string;
  name_cyrilic: string;
  type: { int: number; string: string };
};
