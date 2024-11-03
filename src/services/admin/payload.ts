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
export type CreateBlogTagsPayload = {
  name: string;
};
export type CreateBlogPostPayload = {
  title: string;
  content: string;
  featured: boolean;
  categoryIds?: any[];
};

export interface FundUserPayload {
  amount: number;
}

export interface CreateBannerPayload {
  title: string;
  description: string;
  ctaLink: string;
  status: string;
}

export interface BannerResponse {
  id: string;
  title: string;
  ctaLink: string;
  status: string;
  description: string;
  createdAt: string;
  imageUrl: string;
  deletedAt: string | null;
}

export interface CouponResponse {
  code: string;
  createdAt: string;
  deletedAt: string | null;
  expirationDate: string;
  id: string;
  numberOfRemainingUses: number;
  numberOfUses: number;
  outingId: string | null;
  type: string;
  updatedAt: string;
  value: string;
}
