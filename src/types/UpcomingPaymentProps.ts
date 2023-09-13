import type OutingProps from "./OutingProps";
import type IUser from "./User";

type UpcomingPaymentProps = {
  id: string;
  userId: string;
  outingId: string;
  bookingId: string;
  paymentCardId: string;
  transactionId: string;
  startDate: string;
  endDate: string | null;
  periodicPaymentType: string;
  status: string;
  amountSaved: string;
  remainingAmountToBeCharged: string;
  remainingTrials: number;
  lastChargedDate: string;
  nextChargeDate: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  user: IUser;
  outing: OutingProps;
  booking: BookingProps;
};
export default UpcomingPaymentProps;

type BookingProps = {
  id: string;
  userId: string;
  outingId: string;
  hasDiscount: boolean;
  discountId: string | null;
  discountedCost: string | null;
  numberOfPeopleSharing: number;
  ticketQuantity: string | number | null;
  outingSubType: string;
  cost: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  bookingDate: {
    startDate: string;
    endDate: string;
    id: string;
    bookingId: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };
};
