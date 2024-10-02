export type Account = {
  id: number;
  uid: String;
  email: String;
  firstName: string;
  lastName: string;
  isDisabled: boolean;

  // Student
  studentId?: string;
  isOnBoarded?: boolean;
};
