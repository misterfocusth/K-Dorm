import React from 'react';

const Header: React.FC = () => (
  <header className="flex gap-3 items-start self-stretch px-6 pt-6 pb-4 w-full text-3xl font-bold text-black whitespace-nowrap bg-white shadow-lg">
    <a href="/student/billing">
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/96e488020467b1a68a58d80ca76afc8db87853d06f2bab055c47c8be724b2d55?placeholderIfAbsent=true&apiKey=f812e4cf0d5a4da58d477115f478dd2c" alt="" className="object-contain shrink-0 w-7 aspect-square" />
    </a>
    <h1 className="w-[242px]">บิลทั้งหมดของฉัน</h1>
  </header>
);

export default Header;