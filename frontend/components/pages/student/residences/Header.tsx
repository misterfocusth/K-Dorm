import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex flex-col items-center w-full">
      <div className="flex flex-col w-full whitespace-nowrap">
        <div className="flex relative flex-col items-start py-9 pr-20 pl-8 w-full min-h-[142px]">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/e1c837d7ddaa9dea29d65976265fd9b8ff44a62f9ba8761488f2e0ff6d3a3372?placeholderIfAbsent=true&apiKey=f812e4cf0d5a4da58d477115f478dd2c" alt="" className="object-cover absolute inset-0 size-full" />
          <h1 className="relative text-3xl font-bold text-white">
            ห้องพักของฉัน
          </h1>
          <p className="relative text-base leading-6 text-gray-300">
            ดูประวัติและรายการห้องที่เคยพักอาศัย
          </p>
        </div>
      </div>
      <div className="flex gap-2.5 items-center self-stretch px-6 mt-5 w-full text-sm leading-6 whitespace-nowrap text-slate-900">
        <div className="flex justify-between items-center self-stretch px-4 py-2 my-auto bg-white rounded-2xl border border-solid border-slate-300 w-[206px]">
          <span className="flex-1 shrink self-stretch my-auto basis-0">ทุกปี</span>
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/41bb9af46cc456863725de9721f7b03b4ecc089914a537c04cbc9a0d112c818e?placeholderIfAbsent=true&apiKey=f812e4cf0d5a4da58d477115f478dd2c" alt="" className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square" />
        </div>
      </div>
    </header>
  );
};

export default Header;