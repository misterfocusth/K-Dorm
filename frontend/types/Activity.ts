import { Student } from "./Account";

export type Activity = {
  id: number;
  name: string;
  note?: string;
  date: string;
  location: string;
  earnedVolunteerHours?: number;
  student: Student;
  categories: ActivityCategory[];
};

export type ActivityCategory = {
  id: number;
  handle: string;
  name: string;
  visibleToStudents: boolean;
  visibleToStaffs: boolean;
  visibleToSecurityStaffs: boolean;
};

export const CATEGORIES: ActivityCategory[] = [
  {
    id: 1,
    handle: "ENTER_CHECKIN",
    name: "เข้าหอพัก",
    visibleToStudents: true,
    visibleToStaffs: true,
    visibleToSecurityStaffs: true,
  },
  {
    id: 2,
    handle: "EXIT_CHECKIN",
    name: "ออกหอพัก",
    visibleToStudents: true,
    visibleToStaffs: true,
    visibleToSecurityStaffs: true,
  },
  {
    id: 3,
    handle: "ACTIVITY",
    name: "กิจกรรม",
    visibleToStudents: true,
    visibleToStaffs: true,
    visibleToSecurityStaffs: true,
  },
  {
    id: 4,
    handle: "PROHIBITED",
    name: "การประพฤติมิชอบ",
    visibleToStudents: true,
    visibleToStaffs: true,
    visibleToSecurityStaffs: true,
  },
  {
    id: 5,
    handle: "VOLUNTEER",
    name: "กิจกรรมอาสาสมัคร",
    visibleToStudents: true,
    visibleToStaffs: true,
    visibleToSecurityStaffs: true,
  },
];

const STUDENT = {
  id: 1,
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@kmitl.ac.th",
  isDisabled: false,
  isOnBoarded: true,
  studentId: "6012345678",
  uid: "6012345678",
};

export const ACTIVITIES: Activity[] = [
  {
    id: 1,
    name: "เข้าหอพัก",
    date: "2021-09-01T00:00:00Z",
    location: "หอพัก",
    student: STUDENT,
    categories: [CATEGORIES[0]],
  },
  {
    id: 2,
    name: "ออกหอพัก",
    date: "2021-09-01T00:00:00Z",
    location: "หอพัก",
    student: STUDENT,
    categories: [CATEGORIES[1]],
  },
  {
    id: 3,
    name: "กิจกรรม",
    date: "2021-09-01T00:00:00Z",
    location: "กิจกรรมทำบุญวันเข้าพรรณษา",
    student: STUDENT,
    categories: [CATEGORIES[2]],
  },
  {
    id: 4,
    name: "เข้าหอพักเลยกำหนดเวลา",
    date: "2021-09-01T00:00:00Z",
    location: "หอพัก",
    student: STUDENT,
    categories: [CATEGORIES[3]],
  },
  {
    id: 5,
    name: "Staff กิจกรรม Pre-Programming",
    date: "2021-09-01T00:00:00Z",
    location: "คณะเทคโนโลยีสารสนเทศ สจล.",
    student: STUDENT,
    categories: [CATEGORIES[4]],
    earnedVolunteerHours: 5,
  },
];
