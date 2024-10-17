import React from 'react';

interface BillDetail {
    label: string;
    amount: string;
}

interface BillItemProps {
    type: string;
    month: string;
    amount: string;
    details: BillDetail[];
    dueDate: string;
    icon: string;
    isOverdue?: boolean;
}

const BillItem: React.FC<BillItemProps> = ({ type, month, amount, details, dueDate, icon, isOverdue }) => (
    <article className={`flex flex-col gap-y-2 px-5 py-4 w-full bg-white rounded-2xl ${isOverdue ? 'border border-red-400 border-solid' : ''} shadow-[0px_7px_29px_rgba(100,100,111,0.2)]`}>
        <div className="flex gap-6 justify-between items-start w-full min-h-[44px]">
            <div className="flex gap-2 items-start">
                <img loading="lazy" src={icon} alt="" className="object-contain shrink-0 w-6 aspect-square" />
                <div className="flex flex-col justify-between min-h-[44px] w-[202px]">
                    <h2 className="text-base font-medium text-black">{type}</h2>
                    <p className="text-xs text-neutral-400">{month}</p>
                </div>
            </div>
            <p className="text-xl font-semibold text-black w-full">{amount}</p>
        </div>
        <div className="flex gap-2 items-end mt-2 w-full">
            <div className="flex flex-col flex-1 shrink w-full text-xs text-gray-700">
                {details.map((detail, index) => (
                    <div key={index} className="flex gap-5 justify-between w-full rounded-none">
                        <div>{detail.label}</div>
                        <div className="text-right">{detail.amount}</div>
                    </div>
                ))}
            </div>
        </div>
        <div className="px-10 text-sm text-right text-orange-700 rounded-none w-full">
            ชำระเงินภายใน <span className="font-semibold">{dueDate}</span>
        </div>
    </article>
);

export default BillItem;