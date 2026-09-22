'use client';

import React from 'react';
import Image from 'next/image';
import { Locale, translations } from '@/lib/translations';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface TicketCalloutBannerProps {
  locale: Locale;
}

export function TicketCalloutBanner({ locale }: TicketCalloutBannerProps) {
  const t = translations[locale];
  const isAr = locale === 'ar';

  return (
    <section className="py-6 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-rose-900/10 bg-gradient-to-r from-[#950250] via-[#b20163] to-[#fa1590] group">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-[120px] lg:h-[130px] p-3 sm:p-4 lg:p-0">
          {/* 1. Left (LTR) / Right (RTL): Clean Coach Bus Photo */}
          <div
            className={`relative w-full lg:w-[38%] h-36 sm:h-44 lg:h-full flex-shrink-0 overflow-hidden ${
              isAr ? 'lg:order-2' : 'lg:order-1'
            }`}
          >
            <Image
              src="/images/ticket-bus-clean.png"
              alt="Luxury Coach Travel"
              fill
              className={`object-cover object-center ${isAr ? '-scale-x-100' : ''}`}
              priority
            />
          </div>

          {/* 2. White Slanted Ticket Ribbon Container */}
          <div
            className={`relative w-full lg:w-[62%] bg-white rounded-xl lg:rounded-l-3xl lg:rounded-r-none py-4 px-5 sm:px-8 lg:px-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg lg:h-[88%] lg:my-auto ${
              isAr ? 'lg:order-1 lg:rounded-r-3xl lg:rounded-l-none' : 'lg:order-2'
            }`}
          >
            {/* Semantic Text Content */}
            <div
              className={`flex flex-col justify-center ${
                isAr ? 'text-right' : 'text-left'
              }`}
            >
              <span
                className={`text-[#b20163] font-black italic uppercase text-xs sm:text-sm lg:text-base tracking-wide leading-tight ${
                  isAr ? 'font-sans' : "font-['Barlow_Semi_Condensed',sans-serif]"
                }`}
              >
                {t.ctaBanner.title1}
              </span>
              <span
                className={`mt-1 text-[#d4ad2d] font-black italic uppercase text-base sm:text-xl lg:text-[26px] tracking-wide leading-tight ${
                  isAr ? 'font-sans' : "font-['Barlow_Semi_Condensed',sans-serif]"
                }`}
              >
                {t.ctaBanner.title2}
              </span>
            </div>

            {/* Interactive Gold CTA Button */}
            <a
              href="#search-box"
              className="flex-shrink-0 inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-[#ffe47b] via-[#f8dc69] to-[#dcb83f] text-[#171717] font-bold text-xs sm:text-sm shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200 cursor-pointer group/btn"
              aria-label={t.ctaBanner.btn}
            >
              <span className="whitespace-nowrap">{t.ctaBanner.btn}</span>
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#171717] text-white flex items-center justify-center flex-shrink-0 transition-transform group-hover/btn:translate-x-0.5 rtl:group-hover/btn:-translate-x-0.5">
                {isAr ? (
                  <ArrowLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                ) : (
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                )}
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
