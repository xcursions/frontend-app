import type IUser from "./User";

type IReview = {
  comment: string;
  createdAt: string;
  deletedAt: string;
  id: string;
  outing: IOuting;
  outingId: string;
  rating: number;
  updatedAt: string;
  user: IUser;
  userId: string;
};
type IOuting = {
  bookingCount: number;
  createdAt: string;
  currency: string;
  deadlineGap: number;
  description: string;
  id: string;
  name: string;
  price: string;
  showInLandingPage: boolean;
  status: string;
  subType: string;
  type: string;
  deleatedAt: string;
  updatedAt: string;
  viewCount: number;
};

export default IReview;
