import React from 'react';

interface BillingItemDetail {
  label: string;
  value: string;
}

interface BillingItemProps {
  icon: string;
  title: string;
  date: string;
  amount: string;
  details: BillingItemDetail[];
  dueDate: string;
}

const BillingItem: React.FC<BillingItemProps> = ({ icon, title, date, amount, details, dueDate }) => {
  return (
    <div className="flex flex-col px-5 py-4 mt-4 w-full bg-white rounded-2xl max-w-[382px] shadow-[0px_7px_29px_rgba(100,100,111,0.2)]">
      <div className="flex gap-3 justify-between items-start w-full min-h-[44px]">
        <div className="flex gap-2 items-start">
          <img src={icon} alt="" className="object-contain shrink-0 w-6 aspect-square" />
          <div className="flex flex-col justify-between min-h-[44px] w-[202px]">
            <h3 className="text-base font-medium text-black">{title}</h3>
            <p className="text-xs text-neutral-400">{date}</p>
          </div>
        </div>
        <p className="text-xl font-semibold text-black w-full">{amount}</p>
      </div>
      <div className="flex gap-2 items-end mt-2 w-full">
        <div className="flex flex-col flex-1 shrink w-full text-xs text-gray-700 basis-[140px] min-w-[240px]">
          {details.map((detail, index) => (
            <div key={index} className="flex gap-5 justify-between w-full rounded-none">
              <p>{detail.label}</p>
              <p className="text-right">{detail.value}</p>
            </div>
          ))}
        </div>
      </div>
      <p className="px-10 text-sm text-right text-orange-700 rounded-none min-w-[240px] w-[316px]">
        ชำระเงินภายใน <span className="font-semibold">{dueDate}</span>
      </p>
    </div>
  );
};

export default BillingItem;