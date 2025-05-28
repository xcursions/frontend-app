export type GetOutingByContinentPaylod = {
  minPrice?: number | string;
  maxPrice?: number | string;
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

export type VisaApplicationPayload = {
  visaCountry: string;
  nationality: string;
  hasPassport: boolean;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  maritalStatus: string;
  dateOfBirth: string;
  travelHistory?: string;
  channel: string;
  callbackUrl?: string;
};

export type CustomTripPayload = {
  toCountry: string;
  numberOfPersons: number;
  otherDestinations: string;
  specialOccasion?: string;
  travelDates: string;
  budgetPerPersonExcludingFlight: number;
  otherActivities: string;
  notes: string;
  referredFrom?: string;
};
