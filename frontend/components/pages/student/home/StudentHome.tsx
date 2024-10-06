"use client";

// Components
import StudentResidenceCard from "@/components/student/Card/StudentResidenceCard";
import StudentHomeMenu from "@/components/student/menu/StudentHomeMenu";

// Contexts
import { AuthContext } from "@/contexts/AuthContext";

// React
import { useContext } from "react";

const StudentHome = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="py-8 flex flex-col gap-6 px-9">
      {/* <p>Role: {role}</p> */}
      {/* <p>Current User: {JSON.stringify(currentUser)}</p> */}

      <div>
        <p className="text-3xl font-bold text-primary">{`สวัสดี คุณ ${currentUser?.firstName}`}</p>
        <p className="mt-1">หวังว่าวันนี้จะเป็นวันที่ดีของเธอนะ</p>
      </div>

      <div>
        <p className="text-xl text-gray-700">หอพัก</p>
        <ul className="flex flex-row gap-4 overflow-y-auto mt-4">
          {new Array(3).fill(0).map((_, index) => (
            <li key={index}>
              <StudentResidenceCard room={"ห้อง 901"} building={"ตึก 11"} />
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="text-xl text-gray-700">บิลค้างชำระ</p>
        <div className="flex flex-row gap-4 mt-4 w-full">
          <div className="bg-zinc-100 p-4 flex flex-col gap-2 rounded-3xl w-[50%]">
            <p className="text-sm gray-600">วันกำหนดชำระ</p>
            <p className="text-xl text-black font-bold">20 Oct 2024</p>
          </div>

          <div className="bg-zinc-100 p-4 flex flex-col gap-2 rounded-3xl w-[50%]">
            <p className="text-sm gray-600">จำนวนบิลที่ค้างชำระ</p>
            <p className="text-xl text-black font-bold mt-auto">2 บิล</p>
          </div>
        </div>
      </div>

      <div>
        <p className="text-xl text-gray-700 mb-4">เมนู</p>
        <StudentHomeMenu />
      </div>
    </div>
  );
};

export default StudentHome;
