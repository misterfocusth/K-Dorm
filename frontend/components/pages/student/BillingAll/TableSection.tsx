import React from 'react';

const TabSection: React.FC = () => (
  <nav className="flex mt-6 max-w-full text-base font-semibold text-center text-black whitespace-nowrap rounded-none w-[399px]">
    <div className="flex flex-col flex-1">
      <div className="self-center">ทั้งหมด</div>
      <div className="shrink-0 h-px border border-black border-solid" />
    </div>
    <div className="flex flex-col flex-1">
      <div className="self-center">ค่าน้ำค่าไฟ</div>
      <div className="shrink-0 h-px border border-solid border-zinc-300" />
    </div>
    <div className="flex flex-col flex-1">
      <div className="self-center">ค่าหอพัก</div>
      <div className="shrink-0 h-px border border-solid border-zinc-300" />
    </div>
  </nav>
);

export default TabSection;