'use client';

import React from 'react';
import Image from 'next/image';
import { Locale, translations } from '@/lib/translations';

interface TopReasonsProps {
  locale: Locale;
}

export function TopReasons({ locale }: TopReasonsProps) {
  const t = translations[locale];

  const icons = [
    '/images/icon-mobile.png',
    '/images/icon-discount.png',
    '/images/icon-calendar.png',
    '/images/icon-headphones.png',
    '/images/icon-security.png',
    '/images/icon-globe.png',
  ];

  return (
    <section className="py-16 bg-[#fcf9f8] px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with Ornamental Gold Lines matching Frame 3681 */}
        <div className="w-full text-center mx-auto mb-12 sm:mb-14 px-4">
          <div className="flex items-center justify-center gap-3 sm:gap-5 lg:gap-7">
            {/* Left Line */}
            <div className="flex-1 max-w-[200px] sm:max-w-[260px] flex items-center justify-end">
              <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-[#d8b93c] to-[#d8b93c]" />
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#d8b93c] shrink-0" />
            </div>

            {/* Title */}
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-black italic uppercase tracking-tight leading-none bg-gradient-to-b from-[#ff1493] via-[#d90075] to-[#990052] bg-clip-text text-transparent px-2"
              style={{ fontFamily: "'Barlow Semi Condensed', sans-serif" }}
            >
              {t.topReasons.title}
            </h2>

            {/* Right Line */}
            <div className="flex-1 max-w-[200px] sm:max-w-[260px] flex items-center justify-start">
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#d8b93c] shrink-0" />
              <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent via-[#d8b93c] to-[#d8b93c]" />
            </div>
          </div>
        </div>

        {/* 6 Feature Cards in 3x2 Grid matching Frame 3681 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.topReasons.cards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[28px] p-6 sm:p-7 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 group"
            >
              {/* Left Column: 3D Icon & Magenta Title */}
              <div className="flex flex-col items-center text-center shrink-0 sm:w-28 md:w-32">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-2 group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src={icons[idx]}
                    alt={card.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3
                  className="text-sm sm:text-base font-black text-[#b20163] leading-tight text-center"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {card.title}
                </h3>
              </div>

              {/* Right Column: Detailed Benefit Description */}
              <div className="flex-1 text-center sm:text-left rtl:sm:text-right pt-1">
                <p
                  className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
