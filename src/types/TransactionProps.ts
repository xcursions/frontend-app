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
  user: IUser;
  outing: OutingProps;
};

export default TransactionProps;
