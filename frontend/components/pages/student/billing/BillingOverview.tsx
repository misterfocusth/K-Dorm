import React from 'react';
import BillingCard from './BillingCard';
const billingData = [
  { title: 'ยอดค่าน้ำค่าไฟค้างชำระ', amount: '1,200 THB' },
  { title: 'ยอดค่าที่พักค้างชำระ', amount: '2,500 THB' },
  { title: 'เส้นตายที่ใกล้ที่สุด', amount: '20 Oct 2024' },
  { title: 'จำนวนบิลที่ค้างไม่ได้จ่าย', amount: '2 บิล' }
];

const BillingOverview: React.FC = () => {
  return (
    <section className="flex flex-col w-full bg-gradient-to-b from-[#AFDE5C] to-[#FDBA74] py-5">
      <div className="flex flex-col px-6 pb-1.5 mt-4 w-full">
        <p className="text-base text-slate-800">ขณะนี้มียอดค้างชำระอยู่ทั้งหมด</p>
        <p className="text-4xl font-bold leading-none text-black">3,700 THB</p>
      </div>
      <div className="grid grid-cols-2 gap-5 items-center px-6 mt-4 w-full">
        {billingData.map((item, index) => (
          <BillingCard key={index} title={item.title} amount={item.amount} />
        ))}
      </div>
    </section>
  );
};

export default BillingOverview;