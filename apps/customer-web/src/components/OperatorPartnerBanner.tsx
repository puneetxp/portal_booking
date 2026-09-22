'use client';

import React from 'react';
import Image from 'next/image';
import { Locale, translations } from '@/lib/translations';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface OperatorPartnerBannerProps {
  locale: Locale;
}

export function OperatorPartnerBanner({ locale }: OperatorPartnerBannerProps) {
  const t = translations[locale];
  const isAr = locale === 'ar';

  return (
    <section className="w-full py-8 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative rounded-[24px] overflow-hidden shadow-2xl border border-rose-950/20 bg-gradient-to-r from-[#8a003f] via-[#a80058] to-[#b20163] group min-h-[220px] sm:min-h-[240px]">
        {/* Background Coaches Asset Layer (Figma 1574:3250) */}
        <div
          className={`absolute inset-y-0 ${
            isAr ? 'left-0' : 'right-0'
          } w-full lg:w-[62%] h-full overflow-hidden`}
        >
          <Image
            src="/images/operator-bus-only.png"
            alt="Bus Arabia Operators Fleet"
            fill
            className={`object-cover ${
              isAr ? 'object-left -scale-x-100' : 'object-right'
            } select-none opacity-90 group-hover:scale-[1.02] transition-transform duration-700`}
            priority
          />

          {/* Gradient blend so text is always 100% readable */}
          <div
            className={`absolute inset-0 ${
              isAr
                ? 'bg-gradient-to-l from-[#8a003f] from-10% via-[#a80058] via-45% to-transparent'
                : 'bg-gradient-to-r from-[#8a003f] from-10% via-[#a80058] via-45% to-transparent'
            }`}
          />
        </div>

        {/* Foreground Content Layer (Text & Button) */}
        <div
          className={`relative z-10 py-8 sm:py-10 px-6 sm:px-10 lg:px-12 flex flex-col justify-center max-w-2xl min-h-[220px] sm:min-h-[240px] ${
            isAr ? 'ml-auto text-right items-end' : 'text-left items-start'
          }`}
        >
          <h3
            className={`text-xl sm:text-2xl lg:text-[28px] font-black italic text-white leading-snug uppercase tracking-tight ${
              isAr ? 'font-sans' : "font-['Montserrat',sans-serif]"
            }`}
          >
            {t.operatorBanner.title}
          </h3>

          <p
            className={`text-xs sm:text-sm text-white/90 leading-relaxed max-w-lg mt-2.5 ${
              isAr ? 'font-sans' : "font-['Inter',sans-serif]"
            }`}
          >
            {t.operatorBanner.desc}
          </p>

          <a
            href="#operator-signup"
            className="mt-5 inline-flex items-center gap-2.5 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-[#ffe26d] via-[#fdea9d] to-[#d9b747] text-[#171717] font-bold text-xs sm:text-sm shadow-md hover:shadow-lg hover:scale-105 transition-all w-fit group/btn cursor-pointer"
            aria-label={t.operatorBanner.title}
          >
            <span>{t.operatorBanner.btn}</span>
            <div className="w-6 h-6 rounded-full bg-[#171717] text-[#ffe26d] flex items-center justify-center transition-transform group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1">
              {isAr ? (
                <ArrowLeft className="w-3.5 h-3.5" />
              ) : (
                <ArrowRight className="w-3.5 h-3.5" />
              )}
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
