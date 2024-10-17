import React from 'react';
import BillingItem from './BillingItem';

const billingItems = [
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/95c1099b75e8754a338b2e6b767a0bc25b9af4022f8a8cbf7e887f2e1f5cc592?placeholderIfAbsent=true&apiKey=f812e4cf0d5a4da58d477115f478dd2c",
    title: "ค่าน้ำและค่าไฟ",
    date: "เดือนกันยายน 2024",
    amount: "1,200 THB",
    details: [
      { label: "ค่าไฟ 140 หน่วย (หน่วยละ 7 บาท)", value: "1,190 THB" },
      { label: "ค่าน้ำ 2 หน่วย (หน่วยละ 5 บาท)", value: "1,190 THB" },
      { label: "ค่าปรับชำระหลังกำหนด", value: "0 THB" }
    ],
    dueDate: "20 Oct 2024"
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/33bb1e13bf6615877ad3e4dfd7b010ec35ed1f51945c87b180bc13620c943779?placeholderIfAbsent=true&apiKey=f812e4cf0d5a4da58d477115f478dd2c",
    title: "ค่าหอพัก",
    date: "เดือนกันยายน 2024",
    amount: "2,500 THB",
    details: [
      { label: "ค่าหอพัก", value: "2,500 THB" },
      { label: "ค่าปรับชำระหลังกำหนด", value: "0 THB" }
    ],
    dueDate: "20 Oct 2024"
  }
];

const BillingDetails: React.FC = () => {
  return (
    <section className="flex flex-col mt-10 w-full rounded-none">
      <div className="flex flex-col w-full rounded-3xl shadow-md bg-slate-50">
        <div className="flex flex-col px-6 pt-6 pb-10 w-full min-h-[442px]">
          <div className="flex gap-10 justify-between items-center w-full whitespace-nowrap">
            <h2 className="self-stretch my-auto text-base text-slate-800">รายการบิลที่ยังค้างชำระ</h2>
            <button className="flex gap-1 justify-center items-center self-stretch px-4 py-2 pr-3 pl-3.5 my-auto h-7 text-sm font-medium leading-6 text-gray-700 bg-white rounded-2xl border border-solid border-slate-200 min-h-[28px] w-[98px]">
              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/6fdeb11a873343f000e6983711e6bcc8696b832cf0c8f7da09e1406aadd88312?placeholderIfAbsent=true&apiKey=f812e4cf0d5a4da58d477115f478dd2c" alt="" className="object-contain shrink-0 self-stretch my-auto aspect-square w-[18px]" />
              <a href="/student/billing/all">
                <span className="self-stretch my-auto">ดูทั้งหมด</span>
              </a>
            </button>
          </div>
          <div className="flex flex-col mt-2 max-w-full w-[382px]">
            {billingItems.map((item, index) => (
              <BillingItem key={index} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BillingDetails;