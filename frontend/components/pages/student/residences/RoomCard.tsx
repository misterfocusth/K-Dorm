import React from 'react';

const RoomCard: React.FC = () => {
  return (
    <article className="flex overflow-hidden flex-col py-1 w-full bg-white rounded-2xl border-4 border-orange-500 border-solid text-black">
      <div className="flex z-10 flex-col px-6 py-7 mt-0 min-h-[566px]">
        <div className="flex flex-col max-w-full text-black min-h-[72px] w-[307px]">
          <h2 className="text-xl font-semibold leading-tight">ตึก 11 ชั้น 9</h2>
          <p className="mt-2 text-4xl font-bold leading-none">ห้อง 901</p>
        </div>
        <div className="flex flex-col mt-3 w-full h-[404px]">
          <div className="flex flex-col max-w-full w-[280px]">
            <div className="flex items-start w-full min-h-[34px]">
              <div className="flex flex-col">
                <span className="text-xs font-light leading-3 text-gray-600">รอบ</span>
                <p className="mt-1.5 text-base font-medium leading-none text-black">
                  หอใหม่ ภาคเรียนที่ 1 ปี 2024
                </p>
              </div>
            </div>
            <div className="flex gap-10 justify-between items-start mt-3 w-full min-h-[34px]">
              <div className="flex flex-col">
                <span className="text-xs font-light leading-3 text-gray-600">วันที่เริ่มต้นพัก</span>
                <p className="mt-1.5 text-base font-medium leading-none text-black">24 Oct 2024</p>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-light leading-3 text-gray-600">วันสุดท้าย</span>
                <p className="mt-1.5 text-base font-medium leading-none text-black">3 March 2025</p>
              </div>
            </div>
            <div className="flex gap-10 justify-between items-end mt-3 w-full">
              <div className="flex flex-col">
                <span className="text-xs font-light leading-3 text-gray-600">ผู้พัก</span>
                <p className="mt-1.5 text-base font-medium leading-4 text-black">Supratouch Suwatno</p>
              </div>
              <p className="text-base font-medium leading-4 text-black">Supratouch Suwatno</p>
            </div>
          </div>
          <div className="flex gap-10 items-start self-start mt-6">
            <div className="flex flex-col rounded-none w-[127px]">
              <div className="flex flex-col rounded-xl bg-zinc-100">
                <div className="flex flex-col justify-center px-4 py-4 min-h-[76px]">
                  <span className="text-xs text-gray-600">ค่าน้ำค่าไฟค้างชำระ</span>
                  <p className="mt-1 text-2xl font-bold leading-none text-black">0 THB</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col rounded-none w-[127px]">
              <div className="flex flex-col rounded-xl bg-zinc-100">
                <div className="flex flex-col justify-center px-4 py-4 min-h-[76px]">
                  <span className="text-xs text-gray-600">ค่าหอค้างชำระ</span>
                  <p className="mt-1 text-2xl font-bold leading-none text-black">0 THB</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-start mt-6 w-full min-h-[82px]">
            <div className="flex flex-col flex-1 shrink w-full basis-0 min-w-[240px]">
              <span className="text-xs font-light leading-3 text-gray-600">MOTD</span>
              <p className="mt-1.5 text-sm font-medium leading-4 text-black">
                เข้ากลุ่มไลน์ https://line.me/12345 เข้ากลุ่มไลน์ https://line.me/12345 เข้ากลุ่มไลน์ https://line.me/12345 เข้ากลุ่มไลน์ https://line.me/12345
              </p>
            </div>
          </div>
          <div className="flex flex-col mt-6 w-full text-sm font-semibold leading-6 text-white whitespace-nowrap">
            <button className="gap-2.5 self-stretch px-4 py-2 w-full bg-orange-700 rounded-md">
              ดูบิลของห้องพักนี้
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default RoomCard;