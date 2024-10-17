import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex flex-col px-6 pt-6 pb-4 w-full bg-white shadow-lg drop-shadow-lg">
      <h1 className="text-3xl font-bold text-black">บิลของฉัน</h1>
      <p className="text-base text-gray-800">
        ตอนนี้คุณอยู่ในรอบเดือน <span className="font-bold text-gray-800">กรกฏาคม</span>
      </p>
    </header>
  );
};

export default Header;