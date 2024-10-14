export type Account = {
  id: number;
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  isDisabled: boolean;
};

export type Student = Account & {
  studentId: string;
  isOnBoarded: boolean;
};
