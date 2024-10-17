import React from 'react';

interface BillingCardProps {
  title: string;
  amount: string;
}

const BillingCard: React.FC<BillingCardProps> = ({ title, amount }) => {
  return (
    <div className="flex flex-col self-stretch my-auto rounded-none w-[180px]">
      <div className="flex flex-col h-24 rounded-2xl bg-zinc-100">
        <div className="flex flex-col justify-center px-4 py-6 min-h-[96px]">
          <p className="text-sm text-gray-600">{title}</p>
          <p className="mt-1 text-2xl font-bold leading-none text-black">{amount}</p>
        </div>
      </div>
    </div>
  );
};

export default BillingCard;