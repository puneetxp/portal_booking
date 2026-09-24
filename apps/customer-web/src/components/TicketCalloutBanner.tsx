'use client';

import React from 'react';
import Image from 'next/image';
import { Locale, translations } from '@/lib/translations';

interface TicketCalloutBannerProps {
  locale: Locale;
}

export function TicketCalloutBanner({ locale }: TicketCalloutBannerProps) {
  const t = translations[locale];
  const isAr = locale === 'ar';

  return (
    <section className="w-full max-w-[1280px] mx-auto h-[122px] px-2 sm:px-0">
      <div className="relative w-full h-[122px] overflow-hidden rounded-none sm:rounded-xl shadow-lg bg-gradient-to-r from-[#950250] via-[#c2006d] to-[#fa1590] flex items-center justify-between">
        {/* 1. Bus Photo (x: -14, width: 398, height: 122 in Figma) */}
        <div
          className={`relative h-[122px] w-[340px] sm:w-[398px] shrink-0 overflow-hidden ${
            isAr ? 'order-2 -scale-x-100' : 'order-1'
          }`}
        >
          <Image
            src="/images/ticket-bus-clean.png"
            alt="Luxury Coach Travel"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* 2. White Slanted Ticket Ribbon Container (width: 813px, height: 103px in Figma) */}
        <div
          className={`relative h-[103px] w-full max-w-[813px] mr-2 sm:mr-3 rounded-[8px] bg-white px-5 sm:px-8 flex items-center justify-between gap-4 shadow-sm ${
            isAr ? 'order-1 mr-0 ml-2 sm:ml-3' : 'order-2'
          }`}
        >
          {/* Typography */}
          <div className={`flex flex-col justify-center ${isAr ? 'text-right' : 'text-left'}`}>
            <span
              className="text-[#b20163] font-bold italic uppercase text-xs sm:text-[15px] lg:text-[17px] tracking-tight leading-tight"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {t.ctaBanner.title1}
            </span>
            <span
              className="mt-0.5 text-[#d8b93c] font-bold italic uppercase text-sm sm:text-xl lg:text-[25px] tracking-tight leading-tight"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {t.ctaBanner.title2}
            </span>
          </div>

          {/* Gold CTA Button matching Figma 1574:3263 (199px x 40px) */}
          <a
            href="#search-box"
            className="shrink-0 inline-flex items-center justify-between gap-2.5 w-[160px] sm:w-[199px] h-[40px] px-3 sm:px-4 rounded-[8.4px] bg-gradient-to-r from-[#ffe26d] via-[#fdea9d] to-[#d9b747] text-[#1c1b1b] font-semibold text-xs sm:text-[12.2px] shadow-sm hover:scale-[1.02] transition-all cursor-pointer group/btn"
            aria-label={t.ctaBanner.btn}
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <span className="whitespace-nowrap font-semibold">
              {t.ctaBanner.btn}
            </span>
            <div className="w-[21px] h-[21px] rounded-full bg-[#1c1b1b] flex items-center justify-center shrink-0 transition-transform group-hover/btn:translate-x-0.5 rtl:group-hover/btn:-translate-x-0.5">
              <img
                src="/icons/figma/1574-3266.svg"
                alt=""
                width={12}
                height={8}
                className="rtl:rotate-180"
              />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
