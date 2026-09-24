'use client';

import React from 'react';
import Image from 'next/image';
import { Locale, translations } from '@/lib/translations';

interface TopReasonsProps {
  locale: Locale;
}

export function TopReasons({ locale }: TopReasonsProps) {
  const t = translations[locale];
  const isAr = locale === 'ar';

  const icons = [
    '/images/icon-mobile.png',
    '/images/icon-discount.png',
    '/images/icon-calendar.png',
    '/images/icon-headphones.png',
    '/images/icon-security.png',
    '/images/icon-globe.png',
  ];

  return (
    <section className="w-full max-w-[1240px] mx-auto min-h-[793px] px-4 lg:px-6 xl:px-0 flex flex-col items-center justify-between my-12 sm:my-16 lg:my-20">
      {/* 1. Header with Ornamental Gold Lines matching Frame 3436 (height: 44px) */}
      <div className="w-full flex items-center justify-center gap-2 sm:gap-4 min-h-[44px] shrink-0">
        {/* Left Ornament */}
        <div className="hidden xs:flex items-center gap-1 sm:gap-1.5 w-[40px] sm:w-[100px] md:w-[140px] lg:w-[195px] justify-end">
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#ffe26d] to-[#d9b747]" />
          <span className="w-2 sm:w-2.5 lg:w-3 h-2 sm:h-2.5 lg:h-3 rounded-full bg-gradient-to-r from-[#ffe26d] to-[#d9b747] shrink-0" />
        </div>

        {/* Title */}
        <h2
          className="text-lg sm:text-2xl lg:text-[30px] font-black italic uppercase tracking-tight text-center bg-gradient-to-r from-[#950250] via-[#c2006d] to-[#fa1590] bg-clip-text text-transparent px-2 leading-tight sm:leading-[47px]"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          {t.topReasons.title}
        </h2>

        {/* Right Ornament */}
        <div className="hidden xs:flex items-center gap-1 sm:gap-1.5 w-[40px] sm:w-[100px] md:w-[140px] lg:w-[195px] justify-start">
          <span className="w-2 sm:w-2.5 lg:w-3 h-2 sm:h-2.5 lg:h-3 rounded-full bg-gradient-to-r from-[#ffe26d] to-[#d9b747] shrink-0" />
          <div className="h-[2px] w-full bg-gradient-to-l from-transparent via-[#ffe26d] to-[#d9b747]" />
        </div>
      </div>

      {/* 2. 6 Feature Cards in 2 Rows matching Frame 3680 (1193px x 702px) */}
      <div className="w-full max-w-[1193px] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-[20px] xl:gap-x-[29px] gap-y-[24px] xl:gap-y-[34px] mt-[32px] sm:mt-[47px]">
        {t.topReasons.cards.map((card, idx) => (
          <div
            key={idx}
            className="w-full max-w-[378px] mx-auto h-[334px] bg-white rounded-[31px] p-[20px] sm:p-[23px] border border-[#dbc0c9]/30 shadow-[0_5.83px_15.55px_rgba(0,0,0,0.15)] flex flex-row items-center justify-between gap-[12px] group transition-all duration-300 hover:shadow-xl"
          >
            {/* Left Column (148px in Figma): 3D Icon & Magenta Title */}
            <div className="w-[125px] sm:w-[142px] h-full flex flex-col items-center justify-center text-center shrink-0">
              <div className="relative w-[96px] h-[100px] sm:w-[110px] sm:h-[115px] mb-2 group-hover:scale-105 transition-transform duration-300 shrink-0">
                <Image
                  src={icons[idx]}
                  alt={card.title}
                  fill
                  className="object-contain"
                />
              </div>
              <h3
                className="text-[16px] sm:text-[19px] lg:text-[21px] font-bold text-[#b20163] leading-[21px] sm:leading-[25px] text-center"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {card.title}
              </h3>
            </div>

            {/* Right Column: Detailed Benefit Description (Figma: Inter Regular, fitted within 288px vertical height) */}
            <div className={`flex-1 h-full flex items-center ${isAr ? 'text-right' : 'text-left'}`}>
              <p
                className="text-[12.5px] sm:text-[13.5px] xl:text-[14px] leading-[18.5px] sm:leading-[20px] xl:leading-[21px] text-[#554149] font-normal"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {card.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
