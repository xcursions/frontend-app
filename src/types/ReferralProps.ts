import type IUser from "./User";

type ReferralProps = {
  createdAt: string;
  deletedAt: string;
  id: string;
  referralUser: IUser;
  referredUser: IUser;
  referralUserId: string;
  status: string;
  transaction: {
    id: string;
    userId: string;
    outingId: string | null;
    status: string;
    amount: string;
    nature: string;
    reference: string | null;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    purpose: string;
  };
  transactionId: string;
  updatedAt: string;
};

export default ReferralProps;
