'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Locale, translations } from '@/lib/translations';

interface PlacesWeCoverProps {
  locale: Locale;
  onSelectPlace: (city: string) => void;
}

export function PlacesWeCover({ locale, onSelectPlace }: PlacesWeCoverProps) {
  const t = translations[locale];
  const isAr = locale === 'ar';
  const [activeSlide, setActiveSlide] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [viewportWidth, setViewportWidth] = useState<number>(1092.25);

  const destinations = [
    {
      city: isAr ? 'جدة' : 'Jeddah',
      country: isAr ? 'المملكة العربية السعودية' : 'Saudi Arabia',
      price: isAr ? 'ابتداءً من 45 ﷼' : 'From 45 SAR',
      image: '/images/pure-photo-jeddah.png',
    },
    {
      city: isAr ? 'المدينة المنورة' : 'Madinah',
      country: isAr ? 'المملكة العربية السعودية' : 'Saudi Arabia',
      price: isAr ? 'ابتداءً من 45 ﷼' : 'From 45 SAR',
      image: '/images/pure-photo-madinah.png',
    },
    {
      city: isAr ? 'الرياض' : 'Riyadh',
      country: isAr ? 'المملكة العربية السعودية' : 'Saudi Arabia',
      price: isAr ? 'ابتداءً من 45 ﷼' : 'From 45 SAR',
      image: '/images/pure-photo-riyadh.png',
    },
    {
      city: isAr ? 'عمّان' : 'Amman',
      country: isAr ? 'الأردن' : 'Jordan',
      price: isAr ? 'ابتداءً من 45 ﷼' : 'From 45 SAR',
      image: '/images/pure-photo-amman.png',
    },
    {
      city: isAr ? 'مكة المكرمة' : 'Makkah',
      country: isAr ? 'المملكة العربية السعودية' : 'Saudi Arabia',
      price: isAr ? 'ابتداءً من 40 ﷼' : 'From 40 SAR',
      image: '/images/makkah-kaaba.png',
    },
    {
      city: isAr ? 'الدمام' : 'Dammam',
      country: isAr ? 'المملكة العربية السعودية' : 'Saudi Arabia',
      price: isAr ? 'ابتداءً من 55 ﷼' : 'From 55 SAR',
      image: '/images/pure-photo-riyadh.png',
    },
    {
      city: isAr ? 'الطائف' : 'Taif',
      country: isAr ? 'المملكة العربية السعودية' : 'Saudi Arabia',
      price: isAr ? 'ابتداءً من 35 ﷼' : 'From 35 SAR',
      image: '/images/pure-photo-amman.png',
    },
    {
      city: isAr ? 'الخبر' : 'Khobar',
      country: isAr ? 'المملكة العربية السعودية' : 'Saudi Arabia',
      price: isAr ? 'ابتداءً من 50 ﷼' : 'From 50 SAR',
      image: '/images/pure-photo-jeddah.png',
    },
  ];

  // Append first 4 destinations to enable smooth sliding across all 8 dots while keeping a grid of 4
  const displayDestinations = [...destinations, ...destinations.slice(0, 4)];
  const totalSlides = destinations.length; // 8 slides matching Frame 3437 (1574:3179)

  useEffect(() => {
    const updateDimensions = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth < 640) setItemsPerView(1);
        else if (window.innerWidth < 1024) setItemsPerView(2);
        else setItemsPerView(4);

        if (viewportRef.current) {
          setViewportWidth(viewportRef.current.clientWidth);
        }
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const handlePrev = () => {
    setActiveSlide((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
  };

  // Gap between cards in Figma Frame 3415 is 24.52px
  const gap = 24.52;
  // Exact card width calculation so that itemsPerView cards fit precisely within the viewport with zero clipping
  const cardWidth = Math.max(200, (viewportWidth - (itemsPerView - 1) * gap) / itemsPerView);
  const slideStep = cardWidth + gap;
  const currentOffset = activeSlide * slideStep;

  return (
    <section className="w-full max-w-[1280px] mx-auto py-8 flex flex-col justify-between px-4 sm:px-6">
      {/* Section Header with Ornamental Gold Lines matching Frame 3433 (1574:3105) */}
      <div className="w-full text-center mx-auto mb-6">
        <div className="flex items-center justify-center gap-3 sm:gap-5 lg:gap-7">
          {/* Left Line Frame 3431 */}
          <div className="flex-1 max-w-[200px] sm:max-w-[279px] flex items-center justify-end">
            <div className="h-[3px] flex-1 bg-gradient-to-r from-transparent via-[#ffe26d] to-[#d9b747] rounded-full" />
            <span className="w-3 h-3 rounded-full bg-gradient-to-r from-[#ffe26d] to-[#d9b747] shrink-0 ml-1" />
          </div>

          {/* Title PLACES We Cover (1574:3111) */}
          <h2
            className="text-3xl sm:text-5xl lg:text-[64px] font-bold italic uppercase tracking-tight leading-[48px] bg-gradient-to-r from-[#950250] via-[#c2006d] to-[#fa1590] bg-clip-text text-transparent px-3 font-['Montserrat',sans-serif]"
          >
            {t.places.title}
          </h2>

          {/* Right Line Frame 3430 */}
          <div className="flex-1 max-w-[200px] sm:max-w-[279px] flex items-center justify-start">
            <span className="w-3 h-3 rounded-full bg-gradient-to-r from-[#ffe26d] to-[#d9b747] shrink-0 mr-1" />
            <div className="h-[3px] flex-1 bg-gradient-to-l from-transparent via-[#ffe26d] to-[#d9b747] rounded-full" />
          </div>
        </div>

        {/* Subtitle (1574:3118) */}
        <p className="mt-3 text-xs sm:text-sm lg:text-[18px] leading-[28.8px] text-[#554149] font-normal max-w-2xl mx-auto font-['Inter',sans-serif]">
          {t.places.subtitle}
        </p>
      </div>

      {/* Cards Slider Container with Navigation Buttons (Frame 3434: 1246px x 452.75px) */}
      <div className="w-full max-w-[1246px] mx-auto flex items-center justify-between gap-3 lg:gap-[21px]">
        {/* Left Arrow Button matching Frame 1875:1807 (55.65px x 55.65px) */}
        <button
          onClick={isAr ? handleNext : handlePrev}
          type="button"
          className="w-[46px] sm:w-[55.65px] h-[46px] sm:h-[55.65px] rounded-full bg-gradient-to-r from-[#950250] via-[#c2006d] to-[#fa1590] border border-[#dbc0c9] shadow-[0_1px_2px_rgba(0,0,0,0.05)] text-white flex items-center justify-center shrink-0 hover:scale-105 active:scale-95 transition-all cursor-pointer z-10"
          aria-label="Previous Destination"
        >
          <img
            src="/icons/figma/1875-1809.svg"
            alt=""
            width={12}
            height={20}
            className="rtl:rotate-180"
          />
        </button>

        {/* Carousel Viewport (Frame 3415 - 1092.25px max width x 452.75px height) */}
        <div ref={viewportRef} className="overflow-hidden w-full max-w-[1092.25px] h-[453px]">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              gap: `${gap}px`,
              transform: `translateX(${isAr ? '' : '-'}${currentOffset}px)`,
            }}
          >
            {displayDestinations.map((item, idx) => (
              <div
                key={idx}
                onClick={() => onSelectPlace(item.city)}
                style={{
                  width: `${cardWidth}px`,
                }}
                className="h-[452.75px] shrink-0 relative rounded-[30.2px] overflow-hidden shadow-[0_18.86px_37.73px_-9.43px_rgba(0,0,0,0.08),0_9.43px_18.86px_-4.72px_rgba(0,0,0,0.05)] cursor-pointer group select-none"
              >
                {/* Layer 1: Full Card Destination Image (Figma 1875:1812) */}
                <Image
                  src={item.image}
                  alt={`${item.city} - ${item.country}`}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  priority={idx < 4}
                />

                {/* Layer 2: Top Floating Gold Badge (Figma Frame 3551 / 1884:206: 147.85px x 36.89px) */}
                <div
                  className={`absolute top-[12.6px] ${
                    isAr ? 'left-[12px]' : 'right-[12px]'
                  } z-20 w-[130px] sm:w-[147.85px] h-[34px] sm:h-[36.89px] rounded-full bg-gradient-to-r from-[#ffe26d] via-[#fdea9d] to-[#d9b747] text-[#550036] font-['Inter',sans-serif] font-bold text-xs sm:text-[18px] shadow-[0_4.47px_13.42px_rgba(0,0,0,0.1)] flex items-center justify-center leading-none`}
                >
                  {item.price}
                </div>

                {/* Layer 3: Bottom Floating Magenta City Bar (Figma Container 1875:1813: 254.67px x 72.63px) */}
                <div className="absolute bottom-0 inset-x-0 w-full h-[72.63px] bg-gradient-to-r from-[#950250] via-[#c2006d] to-[#fa1590] backdrop-blur-[51.7px] flex flex-col items-center justify-center z-10 transition-all duration-300 rounded-b-[30.2px]">
                  <h3 className="text-white font-['Montserrat',sans-serif] font-bold text-[24px] sm:text-[28px] lg:text-[32px] leading-tight tracking-wide">
                    {item.city}
                  </h3>
                  <p className="text-white/95 font-['Inter',sans-serif] font-semibold text-[14px] sm:text-[16px] lg:text-[20px] leading-tight mt-0.5">
                    {item.country}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow Button matching Frame 1875:1853 (55.65px x 55.65px) */}
        <button
          onClick={isAr ? handlePrev : handleNext}
          type="button"
          className="w-[46px] sm:w-[55.65px] h-[46px] sm:h-[55.65px] rounded-full bg-gradient-to-r from-[#950250] via-[#c2006d] to-[#fa1590] border border-[#dbc0c9] shadow-[0_1px_2px_rgba(0,0,0,0.05)] text-white flex items-center justify-center shrink-0 hover:scale-105 active:scale-95 transition-all cursor-pointer z-10"
          aria-label="Next Destination"
        >
          <img
            src="/icons/figma/1875-1864.svg"
            alt=""
            width={12}
            height={20}
            className="rtl:rotate-180"
          />
        </button>
      </div>

      {/* Pagination Indicator Dots (Figma Frame 3437 / 1574:3179: 8 dots, 13x13px each, gap 8px) */}
      <div className="flex items-center justify-center gap-[8px] mt-6">
        {Array.from({ length: totalSlides }).map((_, dot) => {
          const isActive = dot === activeSlide;
          return (
            <button
              key={dot}
              type="button"
              onClick={() => setActiveSlide(dot)}
              className={`w-[13px] h-[13px] rounded-full transition-all cursor-pointer ${
                isActive ? 'bg-[#B20163] scale-110' : 'bg-[#D9D9D9] hover:bg-[#c4c4c4]'
              }`}
              aria-label={`Go to slide ${dot + 1}`}
            />
          );
        })}
      </div>
    </section>
  );
}

