export type Account = {
  id: number;
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  isDisabled: boolean;

  student?: any | null;
  staff?: any | null;
  securityStaff?: any | null;
  maintenanceStaff?: any | null;
};

export type Student = Account & {
  studentId: string;
  isOnBoarded: boolean;
};
