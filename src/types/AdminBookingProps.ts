import type OutingProps from "./OutingProps";
import type IUser from "./User";

type AdminBookingProps = {
  bookingDate: BookingDate;
  bookingAddon: BookingAddon[];
  checkout: Checkout;
  bookingParticipant: BookingParticipant[];
  bookingParticipantCount: BookingParticipantCount;
  cost: string;
  createdAt: string;
  deletedAt: string | null;
  discountId: string | null;
  discountedCost: string | null;
  hasDiscount: boolean;
  id: string;
  numberOfPeopleSharing: number;
  outing: OutingProps;
  outingId: string;
  outingSubType: string;
  status: string;
  ticketQuantity: string | number | null;
  updatedAt: string;
  user: IUser;
  userId: string;
};
export default AdminBookingProps;
type BookingDate = {
  bookingId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  id: string;
  startDate: string;
  endDate: string;
};
type BookingParticipant = {
  id: string;
  userId: string;
  bookingId: string;
  name: string;
  email: string;
  isMain: boolean;
  isSharing: boolean;
  individualType: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

type BookingParticipantCount = {
  id: string;
  bookingId: string;
  numberOfAdults: number;
  numberOfChildren: number;
  numberOfInfants: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};
type Checkout = {
  bookingId: string;
  channel: string;
  createdAt: string;
  deletedAt: string | null;
  discountId: string | null;
  id: string;
  paymentMethod: string;
  periodicPaymentType: string | null;
  transactionId: string | null;
  updatedAt: string;
};
type BookingAddon = {
  addonId: string;
  bookingId: string;
  createdAt: string;
  deletedAt: string | null;
  id: string;
  outingAddon: OutingAddon;
  updatedAt: string;
};

type OutingAddon = {
  cost: string;
  createdAt: string;
  default: boolean;
  deletedAt: string | null;
  description: string;
  icon: string;
  id: string;
  name: string;
  outingId: string;
  updatedAt: string;
};
