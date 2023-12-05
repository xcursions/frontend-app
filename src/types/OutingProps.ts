type OutingProps = {
  name: string;
  description: string;
  id: string;
  deadlineGap: number;
  deletedAt: string;
  createdAt: string;
  liked: boolean;
  price: string;
  status: string;
  subType: string;
  type: string;
  updatedAt: string;
  viewCount: number;
  isDraft: boolean;
  bookingCount: number;
  uniqueBookingCount: number;
  defaultOutingDurationInDays: number;
  showInLandingPage: boolean;
  outingDestination: OutingDestination;
  outingChargePlan: OutingChargePlan;
  outingGallery: OutingGallery[];
  outingDate: OutingDate[];
  outingPickup: OutingPickup;
};
export default OutingProps;

type OutingChargePlan = {
  title: string;
  description: string;
  currency: string;
  cost: string;
  costGroup: string;
  adultMultiplier: number;
  infantMultiplier: number;
  childrenMultiplier: number;
  petMultiplier: number;
  quantity: number;
  singleOccupancyAmount: string;
  singleOccupancyGroupAmount: string;
  perPersonSharingAmount: string;
  perPersonSharingGroupAmount: string;
  extraDurationCostPerDay: string;
  extraDurationGroupCostPerDay: string;
  initialPaymentPercent: number;
  outingId: string;
  id: string;
  deletedAt: string;
  updatedAt: string;
  createdAt: string;
};

type OutingDestination = {
  city: string;
  continent: string;
  country: string;
  createdAt: string;
  id: string;
  location: string;
  deletedAt: string;
  outingId: string;
  updatedAt: string;
};
type OutingDate = {
  availability: boolean;
  createdAt: string;
  id: string;
  deletedAt: string;
  updatedAt: string;
  startDate: string;
  endDate: string;
};

type OutingGallery = {
  createdAt: string;
  featured: boolean;
  id: string;
  image: string;
  outingId: string;
  updatedAt: string;
  deletedAt: string;
  video: any;
};
type OutingPickup = {
  city: string;
  continent: string;
  country: string;
  createdAt: string;
  id: string;
  location: string;
  deletedAt: string;
  outingId: string;
  updatedAt: string;
};
