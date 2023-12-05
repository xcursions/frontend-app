import type OutingProps from "./OutingProps";
import type IUser from "./User";

type TransactionProps = {
  id: string;
  userId: string;
  outingId: string;
  status: string;
  amount: string;
  nature: string;
  reference: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  purpose: string;
  checkout: CheckoutProps | null;
  user: IUser;
  outing: OutingProps;
};
type CheckoutProps = {
  id: string;
  bookingId: string;
  transactionId: string;
  discountId: string;
  outing: OutingProps;
  channel: any;
  paymentMethod: any;
  periodicPaymentType: any;
};
export default TransactionProps;
