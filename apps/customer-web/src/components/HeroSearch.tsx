'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Locale, translations } from '@/lib/translations';

interface HeroSearchProps {
  locale: Locale;
  onSearch: (from: string, to: string) => void;
}

export function HeroSearch({ locale, onSearch }: HeroSearchProps) {
  const t = translations[locale];
  const [activeTab, setActiveTab] = useState('busTicket');
  const [fromCity, setFromCity] = useState(locale === 'ar' ? 'الرياض' : 'Riyadh');
  const [toCity, setToCity] = useState(locale === 'ar' ? 'جدة' : 'Jeddah');
  const [date, setDate] = useState('2026-09-25');
  const [passengers, setPassengers] = useState(1);

  // 8 Service Tabs matching Figma node 1574:3353. Only 'busTicket' has an icon.
  const tabs = [
    { key: 'busTicket', label: t.services.busTicket, hasIcon: true },
    { key: 'umrah', label: t.services.umrah },
    { key: 'madinah', label: t.services.madinahZiyarah },
    { key: 'umrahMadinah', label: t.services.umrahMadinah },
    { key: 'cargo', label: t.services.cargoService },
    { key: 'hajj', label: t.services.hajj },
    { key: 'tourism', label: t.services.tourism },
    { key: 'rental', label: t.services.busRental },
  ];

  const cities =
    locale === 'ar'
      ? ['الرياض', 'جدة', 'مكة المكرمة', 'المدينة المنورة', 'الدمام', 'الطائف', 'أبها', 'تبوك']
      : ['Riyadh', 'Jeddah', 'Makkah', 'Madinah', 'Dammam', 'Taif', 'Abha', 'Tabuk'];

  const handleSwap = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(fromCity, toCity);
  };

  return (
    <section className="relative w-full max-w-[1280px] mx-auto h-[836px]">
      {/* Background Hero Banner with High Fidelity Art Direction (Figma 1574:3046 - 1280px x 734px) */}
      <div className="relative w-full h-[734px] overflow-hidden">
        <Image
          src="/images/hero-bus-clean.png"
          alt="Bus Arabia Luxury Travel"
          fill
          priority
          className={`object-cover object-top sm:object-center select-none pointer-events-none ${
            locale === 'ar' ? '-scale-x-100' : ''
          }`}
        />

        {/* Soft bottom white gradient to blend smoothly into page */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#fcf9f8] via-[#fcf9f8]/60 to-transparent pointer-events-none" />

        {/* Live Semantic Typography Overlay from Frame 3429 (1574:3092 at x: 63, y: 158) */}
        <div className="absolute left-6 sm:left-12 lg:left-[63px] top-[148px] sm:top-[158px] rtl:left-auto rtl:right-6 rtl:sm:right-12 rtl:lg:right-[63px] max-w-[570px] text-left rtl:text-right">
          {/* Tagline: EFFORTLESS BOOKING. SEAMLESS TRAVEL. (1574:3093) */}
          <h2
            className="text-2xl sm:text-3xl lg:text-[44.7px] font-black italic uppercase text-[#1c1b1b] leading-[1.05] tracking-[-0.73px]"
            style={{ fontFamily: "'Barlow Semi Condensed', sans-serif" }}
          >
            EFFORTLESS BOOKING.<br />SEAMLESS TRAVEL.
          </h2>

          {/* Frame 3428: BIG SAVINGS GUARANTEED! (Figma exact vertical gradient angles) */}
          <div className="mt-2 sm:mt-3">
            {/* BIG SAVINGS: Vertical linear gradient (Figma 1574:3095: top #FA1590 via #C2006D to bottom #950250) */}
            <div
              className="text-5xl sm:text-7xl lg:text-[88.3px] font-black italic uppercase leading-[0.95] tracking-[-0.77px] bg-gradient-to-b from-[#FA1590] via-[#C2006D] to-[#950250] bg-clip-text text-transparent"
              style={{ fontFamily: "'Barlow Semi Condensed', sans-serif" }}
            >
              {t.hero.bigSavings}
            </div>
            {/* GUARANTEED!: Vertical linear gradient (Figma 1574:3096: top #FFE26D via #FDEA9D to bottom #D9B747) */}
            <div
              className="text-4xl sm:text-6xl lg:text-[72.9px] font-black italic uppercase leading-[0.95] tracking-[-0.64px] bg-gradient-to-b from-[#FFE26D] via-[#FDEA9D] to-[#D9B747] bg-clip-text text-transparent mt-0.5 sm:mt-1"
              style={{ fontFamily: "'Barlow Semi Condensed', sans-serif" }}
            >
              {t.hero.guaranteed}
            </div>
          </div>

          {/* Subheadings Frame 3397 (Figma 1574:3097: x: -2, y: 419, w: 467px, h: 135px, natural screen-edge fade wash) */}
          <div className="relative mt-4 sm:mt-5 max-w-[467px] py-1.5 sm:py-2">
            {/* Edge-to-edge atmospheric gradient wash (Figma Frame 3397: 95.57deg linear gradient bleeding from x: -2 to 467px with NO box rounded corners) */}
            <div
              className="absolute -top-2 -bottom-2 -left-6 sm:-left-12 lg:-left-[63px] right-0 rtl:left-0 rtl:-right-6 rtl:sm:-right-12 rtl:lg:-right-[63px] pointer-events-none"
              style={{
                background:
                  locale === 'ar'
                    ? 'linear-gradient(264.43deg, rgba(255, 255, 255, 0.55) 32.5%, rgba(255, 255, 255, 0) 96%)'
                    : 'linear-gradient(95.57deg, rgba(255, 255, 255, 0.55) 32.5%, rgba(255, 255, 255, 0) 96%)',
              }}
            />

            <div className="relative z-10">
              {/* Line 1 (Figma 1574:3099: Montserrat SemiBold 22px / 19.65px leading, #000000) */}
              <p className="text-base sm:text-[22px] font-semibold text-black leading-[19.65px] tracking-[-0.14px] font-['Montserrat',sans-serif]">
                {t.hero.subheading1}
              </p>
              {/* Line 2 (Figma 1574:3101 segment 1: Montserrat SemiBold 22px / 41px leading, #000000) */}
              <p className="text-base sm:text-[22px] font-semibold text-black leading-[32px] sm:leading-[41px] tracking-[-0.14px] font-['Montserrat',sans-serif] mt-1 sm:mt-2">
                {t.hero.subheading2}
              </p>
              {/* Line 3 (Figma 1574:3101 segment 2: Montserrat SemiBold 22px / 41px leading, #B20163) */}
              <p className="text-base sm:text-[22px] font-semibold text-[#b20163] leading-[32px] sm:leading-[41px] tracking-[-0.14px] font-['Montserrat',sans-serif]">
                {t.hero.saveBig}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Widget Container (Figma Overlay+Border+OverlayBlur 1574:3352 at y: 577, w: 1140, h: 259) */}
      <div className="absolute left-0 right-0 top-[577px] w-full max-w-[1140px] mx-auto px-4 z-20">
        <div
          id="search-box"
          className="bg-white rounded-[24px] shadow-[0_4px_8px_rgba(0,0,0,0.25)] pt-[28px] pr-[15px] pb-[29px] pl-[23px] text-slate-900 border border-white/50 transition-all backdrop-blur-md min-h-[259px] flex flex-col justify-between"
        >
          {/* Service Tabs (Figma 1574:3353: itemSpacing 21px, pb 17px, border-b #DBBFC94D) */}
          <div
            className="flex items-center gap-[21px] overflow-x-auto pb-[17px] border-b border-[#DBBFC9]/30 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-1.5 h-[40px] px-6 rounded-[25px] text-[14px] font-['Montserrat',sans-serif] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#950250] via-[#c2006d] to-[#fa1590] text-white shadow-[2px_4px_4px_rgba(0,0,0,0.08)]'
                      : 'text-[#1C1B1B] hover:text-[#b20163]'
                  }`}
                >
                  {tab.hasIcon && (
                    <img
                      src="/icons/figma/1574-3358.svg"
                      alt=""
                      width={11}
                      height={13}
                      className="shrink-0"
                    />
                  )}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Form Title (Figma 1574:3377: Book Your Bus Ticket, Manrope Bold 14px) */}
          <div className="mt-3 mb-2 flex items-center justify-between">
            <h3
              className="text-[14px] leading-[20px] tracking-[0.28px] font-bold text-[#1C1B1B]"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              {locale === 'ar' ? 'احجز تذكرة حافلتك' : 'Book Your Bus Ticket'}
            </h3>
          </div>

          {/* Search Form (Figma 1574:3379: itemSpacing 9px) */}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[225px_40px_225px_176px_176px_176px] gap-[9px] items-end justify-between"
          >
            {/* FROM (Figma 1574:3380) */}
            <div className="w-full">
              <label
                className="block text-[12px] leading-[14.4px] font-medium text-[#550036] mb-1.5 font-['Inter',sans-serif] pl-1 rtl:pr-1"
              >
                {t.search.from}
              </label>
              <div className="h-[50px] flex items-center bg-white border-[1.5px] border-[#DBBFC9] rounded-[12px] px-3 shadow-[0_4px_4px_rgba(0,0,0,0.1)] transition-all hover:border-[#b20163] focus-within:border-[#b20163]">
                <img
                  src="/icons/figma/1574-3385.svg"
                  alt=""
                  width={11}
                  height={14}
                  className="shrink-0 ltr:mr-2 rtl:ml-2"
                />
                <select
                  value={fromCity}
                  onChange={(e) => setFromCity(e.target.value)}
                  className="w-full bg-transparent text-sm font-medium text-[#1c1b1b] focus:outline-none cursor-pointer appearance-none"
                >
                  {cities.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <img
                  src="/icons/figma/1574-3390.svg"
                  alt=""
                  width={7}
                  height={4.3}
                  className="pointer-events-none shrink-0"
                />
              </div>
            </div>

            {/* SWAP BUTTON (Figma 1574:3392: 40x40px rounded-full border #DEBEC7) */}
            <div className="hidden lg:flex justify-center items-end pb-1">
              <button
                type="button"
                onClick={handleSwap}
                className="w-[40px] h-[40px] rounded-full bg-white border-[1.5px] border-[#DEBEC7] flex items-center justify-center text-[#550036] hover:bg-[#fff5fa] hover:border-[#b20163] transition-all cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
                title="Swap Cities"
              >
                <img
                  src="/icons/figma/1574-3394.svg"
                  alt=""
                  width={17}
                  height={13}
                />
              </button>
            </div>

            {/* TO (Figma 1574:3395) */}
            <div className="w-full">
              <label
                className="block text-[12px] leading-[14.4px] font-medium text-[#550036] mb-1.5 font-['Inter',sans-serif] pl-1 rtl:pr-1"
              >
                {t.search.to}
              </label>
              <div className="h-[50px] flex items-center bg-white border-[1.5px] border-[#DBBFC9] rounded-[12px] px-3 shadow-[0_4px_4px_rgba(0,0,0,0.1)] transition-all hover:border-[#b20163] focus-within:border-[#b20163]">
                <img
                  src="/icons/figma/1574-3401.svg"
                  alt=""
                  width={11}
                  height={14}
                  className="shrink-0 ltr:mr-2 rtl:ml-2"
                />
                <select
                  value={toCity}
                  onChange={(e) => setToCity(e.target.value)}
                  className="w-full bg-transparent text-sm font-medium text-[#1c1b1b] focus:outline-none cursor-pointer appearance-none"
                >
                  {cities.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <img
                  src="/icons/figma/1574-3406.svg"
                  alt=""
                  width={7}
                  height={4.3}
                  className="pointer-events-none shrink-0"
                />
              </div>
            </div>

            {/* DATE (Figma 1574:3407) */}
            <div className="w-full">
              <label
                className="block text-[12px] leading-[14.4px] font-medium text-[#550036] mb-1.5 font-['Inter',sans-serif] pl-1 rtl:pr-1"
              >
                {t.search.date}
              </label>
              <div className="h-[50px] flex items-center bg-white border-[1.5px] border-[#DBBFC9] rounded-[12px] px-3 shadow-[0_4px_4px_rgba(0,0,0,0.1)] transition-all hover:border-[#b20163] focus-within:border-[#b20163]">
                <img
                  src="/icons/figma/1574-3412.svg"
                  alt=""
                  width={16}
                  height={18}
                  className="shrink-0 ltr:mr-2 rtl:ml-2"
                />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-transparent text-sm font-medium text-[#1c1b1b] focus:outline-none cursor-pointer"
                />
              </div>
            </div>

            {/* PASSENGERS (Figma 1574:3416) */}
            <div className="w-full">
              <label
                className="block text-[12px] leading-[14.4px] font-medium text-[#550036] mb-1.5 font-['Inter',sans-serif] pl-1 rtl:pr-1"
              >
                {t.search.passengers}
              </label>
              <div className="h-[50px] flex items-center bg-white border-[1.5px] border-[#DBBFC9] rounded-[12px] px-3 shadow-[0_4px_4px_rgba(0,0,0,0.1)] transition-all hover:border-[#b20163] focus-within:border-[#b20163]">
                <img
                  src="/icons/figma/1574-3421.svg"
                  alt=""
                  width={12}
                  height={12}
                  className="shrink-0 ltr:mr-2 rtl:ml-2"
                />
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(Number(e.target.value))}
                  className="w-full bg-transparent text-sm font-medium text-[#1c1b1b] focus:outline-none cursor-pointer appearance-none"
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>
                      {num} {locale === 'ar' ? 'ركاب' : num === 1 ? 'Passenger' : 'Passengers'}
                    </option>
                  ))}
                </select>
                <img
                  src="/icons/figma/1574-3426.svg"
                  alt=""
                  width={7}
                  height={4.3}
                  className="pointer-events-none shrink-0"
                />
              </div>
            </div>

            {/* SEARCH BUTTON (Figma 1574:3427 / 1875:1550: 176x48px rounded-12px Gold gradient) */}
            <div className="w-full sm:col-span-2 lg:col-span-1">
              <button
                type="submit"
                className="w-full h-[48px] bg-gradient-to-r from-[#FFE26D] via-[#FDEA9D] to-[#D9B747] hover:brightness-105 text-[#1C1B1B] font-['Inter',sans-serif] font-bold text-[14px] leading-[16.8px] rounded-[12px] shadow-[0_4px_4px_rgba(0,0,0,0.1)] transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>{t.search.btnSearch}</span>
                <span className="w-6 h-6 rounded-full flex items-center justify-center">
                  <img
                    src="/icons/figma/1875-1553.svg"
                    alt=""
                    width={12}
                    height={12}
                    className="rtl:rotate-180 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
                  />
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
