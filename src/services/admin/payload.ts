export type CreateOutingPayload = {
  name: string;
  description: string;
  currency: string;
  price: string;
  type: string;
  subType: string;
  startDate: string;
  endDate: string;
  deadlineGap: string;
};
export type CreateOutingDestinationPayload = {
  city: string;
  country: string;
  continent: string;
  location: string;
};
