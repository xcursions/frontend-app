import type OutingProps from "./OutingProps";
import type User from "./User";

type UpcomingOutingProps = {
  bookingDate: BookingDate;
  cost: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  discount: string | null;
  discountId: string | null;
  discountedCost: string | null;
  hasDiscount: boolean;
  id: string;
  numberOfPeopleSharing: number;
  outing: OutingProps;
  outingId: string;
  outingSubType: string;
  status: string;
  ticketQuantity: string | null;
  user: User;
  userId: string;
};
export default UpcomingOutingProps;

type BookingDate = {
  bookingId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  id: string;
  startDate: string;
  endDate: string;
};
