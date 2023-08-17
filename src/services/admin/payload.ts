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
export type CreateOutingChargePlanPayload = {
  title: string;
  description: string;
  currency: string;
  cost: number;
  adultMultiplier: number;
  infantMultiplier: number;
  childrenMultiplier: number;
  petMultiplier: number;
  quantity: number;
  singleOccupancyAmount: number;
  perPersonSharingAmount: number;
  extraDurationCostPerDay: number;
  initialPaymentPercent: number;
};
