'use client';

import React from 'react';
import Image from 'next/image';
import { Locale, translations } from '@/lib/translations';

interface OperatorPartnerBannerProps {
  locale: Locale;
}

export function OperatorPartnerBanner({ locale }: OperatorPartnerBannerProps) {
  const t = translations[locale];
  const isAr = locale === 'ar';

  return (
    <section className="w-full max-w-[1191px] mx-auto h-[200px] select-none" id="operator-banner">
      <div className="relative w-full max-w-[1191px] h-[200px] rounded-[16px] overflow-hidden shadow-lg">
        {/* =====================================================
            CLEAN BACKGROUND ASSET: Coaches on Right + Smooth Gradient
        ====================================================== */}
        <Image
          src="/images/figma_export/operator-bg-clean.png"
          alt="Bus Arabia Fleet Coaches"
          fill
          priority
          className={`object-cover pointer-events-none select-none ${isAr ? '-scale-x-100' : ''}`}
        />

        {/* =====================================================
            1. REAL HTML HEADING (Figma Frame 7: x: 25px, y: 22px)
            Font: Montserrat Bold Italic 24.72px / 33px
        ====================================================== */}
        <h3
          className={`absolute ${
            isAr ? 'right-[25px] text-right' : 'left-[25px] text-left'
          } top-[22px] w-[564px] text-[24.72px] font-bold italic text-white leading-[33px] tracking-[-0.22px] uppercase ${
            isAr ? 'font-sans' : "font-['Montserrat',sans-serif]"
          }`}
        >
          {isAr ? (
            t.operatorBanner.title
          ) : (
            <>
               ARE YOU A BUS OPERATOR
              <br />
              PLANNING TO GROW YOUR BUSINESS?
            </>
          )}
        </h3>

        {/* =====================================================
            2. REAL HTML DESCRIPTION (Figma Frame 7: x: 25px, y: 100px)
            Font: Inter Regular 12px / 19px
        ====================================================== */}
        <p
          className={`absolute ${
            isAr ? 'right-[25px] text-right' : 'left-[25px] text-left'
          } top-[100px] w-[510px] text-[12px] font-normal text-white leading-[19px] ${
            isAr ? 'font-sans' : "font-['Inter',sans-serif]"
          }`}
        >
          {isAr ? (
            t.operatorBanner.desc
          ) : (
            <>
              Partner with Bus Arabia and reach millions of travelers across the region.
              <br />
              Increase your bookings and expand your presence with our powerful platform.
            </>
          )}
        </p>

        {/* =====================================================
            3. REAL HTML CTA BUTTON (Figma Button: x: 25px, y: 150px, w: 171px, h: 34px)
            Gradient: #ffe26d -> #fdea9d -> #d9b747, Montserrat SemiBold 10.48px
        ====================================================== */}
        <a
          href="#operator-signup"
          className={`absolute ${
            isAr ? 'right-[25px]' : 'left-[25px]'
          } top-[150px] inline-flex items-center justify-between w-[171px] h-[34px] px-3.5 rounded-full bg-gradient-to-r from-[#ffe26d] via-[#fdea9d] to-[#d9b747] text-[#1c1b1b] shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group/btn`}
          aria-label={t.operatorBanner.title}
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          <span className="text-[10.48px] font-semibold whitespace-nowrap text-[#1c1b1b]">
            {t.operatorBanner.btn}
          </span>
          <div className="w-[18.34px] h-[18.34px] rounded-full bg-[#1c1b1b] flex items-center justify-center shrink-0 transition-transform group-hover/btn:translate-x-0.5 rtl:group-hover/btn:-translate-x-0.5">
            <img
              src="/icons/figma/1574-3257.svg"
              alt=""
              width={10}
              height={7}
              className="rtl:rotate-180"
            />
          </div>
        </a>
      </div>
    </section>
  );
}
