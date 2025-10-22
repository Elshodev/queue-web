export type FacilityType = {
  id: string;
  nameUz: string;
  nameRu: string;
  nameCyrillic: string;
  type: "GAI" | "OVIR";
};

export type RegionType = {
  id: string;
  nameUz: string;
  nameRu: string;
  nameCyrillic: string;
  facilities: FacilityType[];
};
