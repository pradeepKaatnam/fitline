export type IPaymentsListState = {
  payments: IPayment[];
  loading: boolean;
  error: string;
  filters: {
    [key in PaymentFilterTypes]: string;
  };
  modalsVisible: {
    [key in PaymentFilterTypes]: boolean;
  };
};

export enum PaymentFilterTypes {
  MONTH = "month",
  PROGRAM = "program",
  STATUS = "status",
}

export type IPayment = {
  id: string;
  title: string;
  amount: number;
  date: Date;
};
