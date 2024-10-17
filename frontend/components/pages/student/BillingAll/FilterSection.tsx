import React from 'react';

const FilterSection: React.FC = () => (
  <section className="flex flex-col mt-6 max-w-full whitespace-nowrap w-[393px]">
    <div className="flex gap-10 w-full rounded-md max-w-[393px]">
      <label htmlFor="roomFilter" className="my-auto text-base font-bold text-black">ห้อง</label>
      <div className="flex flex-auto gap-2.5 items-center px-3 py-2 text-sm leading-6 bg-white rounded-md border border-solid border-slate-300 text-slate-900">
        <select id="roomFilter" className="flex-1 shrink self-stretch my-auto basis-0 bg-transparent border-none appearance-none">
          <option>ทั้งหมด</option>
        </select>
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/8a743e57255b9e4715609385bb334f4812daaef0aef1e154123df3727071bdb4?placeholderIfAbsent=true&apiKey=f812e4cf0d5a4da58d477115f478dd2c" alt="" className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square" />
      </div>
    </div>
    <div className="flex gap-7 mt-3 w-full rounded-md max-w-[393px]">
      <label htmlFor="paymentStatusFilter" className="grow my-auto text-base font-bold text-black">สถานะชำระเงิน</label>
      <div className="flex flex-auto gap-2.5 items-center px-3 py-2 text-sm leading-6 bg-white rounded-md border border-solid border-slate-300 text-slate-900">
        <select id="paymentStatusFilter" className="flex-1 shrink self-stretch my-auto basis-0 bg-transparent border-none appearance-none">
          <option>ทั้งหมด</option>
        </select>
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/8a743e57255b9e4715609385bb334f4812daaef0aef1e154123df3727071bdb4?placeholderIfAbsent=true&apiKey=f812e4cf0d5a4da58d477115f478dd2c" alt="" className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square" />
      </div>
    </div>
  </section>
);

export default FilterSection;