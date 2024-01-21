import { Timestamp } from "firebase/firestore";

export type IPaymentsListState = {
  payments?: IPaymentInfo[];
  isExpanded?: { programId: string; isExpanded: boolean }[];
  loading?: boolean;
  error?: string | undefined;
  showDialogue?: boolean;
};

export type IPaymentInfo = {
  programId: string;
  data: IScheduledPayment[];
};

export enum PaymentFilterTypes {
  MONTH = "month",
  PROGRAM = "program",
  STATUS = "status",
}

export enum PaymentStatus {
  PAID = "Paid",
  UNPAID = "Pending",
}

export type IPayment = {
  id: string;
  title: string;
  amount: number;
  date: Date;
};

export type IPaymentsFiltersProps = {
  onChange: (filters: {
    [key in PaymentFilterTypes]: string;
  }) => void;
};

export type IPaymentsFiltersState = {
  filters: {
    [key in PaymentFilterTypes]: string;
  };
  modalsVisible: {
    [key in PaymentFilterTypes]: boolean;
  };
  loading: boolean;
  error: string;
};

export type IScheduledPayment = {
  communityId: string;
  programId: string;
  userId: string;
  userName: string;
  frequency: string;
  amount: number;
  status: PaymentStatus;
  scheduledDate: Timestamp;
  paidDate?: Timestamp; // This is the date the payment is marked as paid. It can be different from the paid date in the metadata.
  metadata?: {
    transactionId: string;
    paidDate?: Timestamp;
    notes?: string;
    paymentMethod?: string;
  };
};

export enum PAYMENTS_ACTIONS {
  SET_PAYMENTS_DATA = "SET_PAYMENTS_DATA",
}

export type IPaymentsDispatchActions = {
  type: PAYMENTS_ACTIONS.SET_PAYMENTS_DATA;
  data: IPaymentsListState;
};
