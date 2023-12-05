export type GetOutingByContinentPaylod = {
  minPrice?: number;
  maxPrice?: number;
  subType?: string;
  page?: number;
  search?: string;
  limit?: number;
  isDraft?: boolean;
  startDate?: string;
  endDate?: string;
  location?: string;
  status?: string;
  type?: string;
  month?: string;
};
