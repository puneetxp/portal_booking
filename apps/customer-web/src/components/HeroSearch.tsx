'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Locale, translations } from '@/lib/translations';
import {
  Bus,
  Moon,
  Compass,
  Package,
  Car,
  MapPin,
  Calendar,
  Users,
  ArrowLeftRight,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';

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

  const tabs = [
    { key: 'busTicket', label: t.services.busTicket, icon: <Bus className="w-4 h-4" /> },
    { key: 'umrah', label: t.services.umrah, icon: <Moon className="w-4 h-4" /> },
    { key: 'madinah', label: t.services.madinahZiyarah, icon: <Compass className="w-4 h-4" /> },
    { key: 'cargo', label: t.services.cargoService, icon: <Package className="w-4 h-4" /> },
    { key: 'hajj', label: t.services.hajj, icon: <Moon className="w-4 h-4" /> },
    { key: 'tourism', label: t.services.tourism, icon: <Compass className="w-4 h-4" /> },
    { key: 'rental', label: t.services.busRental, icon: <Car className="w-4 h-4" /> },
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
    <section className="relative w-full overflow-hidden">
      {/* Background Hero Banner with High Fidelity Art Direction */}
      <div className="relative min-h-[460px] sm:min-h-[500px] lg:min-h-[540px] w-full">
        <Image
          src={locale === 'ar' ? '/images/hero-bg-ar.png' : '/images/hero-bg.png'}
          alt="Bus Arabia Luxury Travel"
          fill
          priority
          className="object-cover object-top select-none pointer-events-none"
        />

        {/* Soft bottom white gradient to blend smoothly into page */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#fcf9f8] via-[#fcf9f8]/60 to-transparent pointer-events-none" />

        {/* Live Semantic Typography Overlay from Frame 3681 */}
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 lg:pt-32">
          <div className="max-w-xl text-left rtl:text-right">
            {/* Tagline 1 & 2 */}
            <h2
              className="text-xl sm:text-2xl lg:text-[34px] font-black uppercase tracking-tight text-slate-900 leading-tight"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {t.hero.tagline1} {t.hero.tagline2}
            </h2>

            {/* BIG SAVINGS GUARANTEED! */}
            <h1
              className="text-4xl sm:text-6xl lg:text-[76px] font-black italic uppercase tracking-[-1.5px] leading-[0.9] my-2 sm:my-3"
              style={{ fontFamily: "'Barlow Semi Condensed', sans-serif" }}
            >
              <span className="bg-gradient-to-b from-[#ff1493] via-[#d90075] to-[#990052] bg-clip-text text-transparent drop-shadow-sm">
                {t.hero.bigSavings}
              </span>{' '}
              <span className="bg-gradient-to-b from-[#FFF6B0] via-[#FFE06A] to-[#D4A900] bg-clip-text text-transparent drop-shadow-sm">
                {t.hero.guaranteed}
              </span>
            </h1>

            {/* Subheadings */}
            <p
              className="text-base sm:text-xl font-bold text-black tracking-tight leading-tight drop-shadow-xs"
              style={{
                fontFamily: "'Barlow Semi Condensed', sans-serif",
                fontWeight: 700,
              }}
            >
              {t.hero.subheading1}
            </p>
            <p
              className="text-sm sm:text-lg font-black text-[#111111] mt-1 tracking-[-0.3px] leading-tight drop-shadow-xs"
              style={{
                fontFamily: "'Barlow Semi Condensed', sans-serif",
                fontWeight: 900,
              }}
            >
              {t.hero.subheading2}
            </p>
            <p
              className="text-sm sm:text-base font-extrabold mt-2 tracking-tight leading-tight"
              style={{
                fontFamily: "'Barlow Semi Condensed', sans-serif",
                fontWeight: 800,
                background: 'linear-gradient(to bottom, #ff1493 0%, #d90075 55%, #990052 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {t.hero.saveBig}
            </p>
          </div>
        </div>
      </div>

      {/* Search Widget Container (Figma Overlay+Border+OverlayBlur 1574:3352) */}
      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-5 -mt-16 sm:-mt-20 lg:-mt-24 z-20">
        <div
          id="search-box"
          className="bg-white rounded-[24px] shadow-[0_10px_30px_rgba(85,0,54,0.12)] px-4 sm:px-6 lg:px-7 py-4 sm:py-5 text-slate-900 border border-slate-100/90 transition-all backdrop-blur-md"
        >
          {/* Service Tabs */}
          <div
            className="flex items-center gap-1.5 sm:gap-3 overflow-x-auto pb-3 border-b border-[#f1e5eb] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#b20163] to-[#f20b82] text-white shadow-md shadow-[#b20163]/25'
                      : 'text-[#20202a] hover:text-[#b20163]'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Form Title */}
          <h3
            className="text-sm sm:text-base font-extrabold text-[#20202a] mt-4 mb-3 uppercase tracking-wider"
            style={{ fontFamily: "'Barlow Semi Condensed', sans-serif" }}
          >
            {t.search.title}
          </h3>

          {/* Search Form */}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.35fr_48px_1.35fr_1fr_0.85fr_1fr] gap-3 items-end"
          >
            {/* FROM */}
            <div>
              <label
                className="block text-xs font-bold text-[#7d174f] mb-1.5 uppercase"
                style={{ fontFamily: "'Barlow Semi Condensed', sans-serif" }}
              >
                {t.search.from}
              </label>
              <div className="h-[48px] flex items-center bg-white border-2 border-[#ebcad9] rounded-xl px-3 transition-all hover:border-[#dca5bd] focus-within:border-[#b20163]">
                <MapPin className="w-4 h-4 text-[#8f7d84] shrink-0 ltr:mr-2 rtl:ml-2" />
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
                <ChevronDown className="w-4 h-4 text-[#8f7d84] pointer-events-none shrink-0" />
              </div>
            </div>

            {/* SWAP */}
            <div className="hidden lg:flex justify-center items-end pb-1">
              <button
                type="button"
                onClick={handleSwap}
                className="w-10 h-10 rounded-full bg-white border-2 border-[#f0b4d0] flex items-center justify-center text-[#8b1550] hover:bg-[#fff5fa] hover:border-[#b20163] transition-all cursor-pointer shadow-xs"
                title="Swap Cities"
              >
                <ArrowLeftRight className="w-4 h-4" />
              </button>
            </div>

            {/* TO */}
            <div>
              <label
                className="block text-xs font-bold text-[#7d174f] mb-1.5 uppercase"
                style={{ fontFamily: "'Barlow Semi Condensed', sans-serif" }}
              >
                {t.search.to}
              </label>
              <div className="h-[48px] flex items-center bg-white border-2 border-[#ebcad9] rounded-xl px-3 transition-all hover:border-[#dca5bd] focus-within:border-[#b20163]">
                <MapPin className="w-4 h-4 text-[#8f7d84] shrink-0 ltr:mr-2 rtl:ml-2" />
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
                <ChevronDown className="w-4 h-4 text-[#8f7d84] pointer-events-none shrink-0" />
              </div>
            </div>

            {/* DATE */}
            <div>
              <label
                className="block text-xs font-bold text-[#7d174f] mb-1.5 uppercase"
                style={{ fontFamily: "'Barlow Semi Condensed', sans-serif" }}
              >
                {t.search.date}
              </label>
              <div className="h-[48px] flex items-center bg-white border-2 border-[#ebcad9] rounded-xl px-3 transition-all hover:border-[#dca5bd] focus-within:border-[#b20163]">
                <Calendar className="w-4 h-4 text-[#8f7d84] shrink-0 ltr:mr-2 rtl:ml-2" />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-transparent text-sm font-medium text-[#1c1b1b] focus:outline-none cursor-pointer"
                />
              </div>
            </div>

            {/* PASSENGERS */}
            <div>
              <label
                className="block text-xs font-bold text-[#7d174f] mb-1.5 uppercase"
                style={{ fontFamily: "'Barlow Semi Condensed', sans-serif" }}
              >
                {t.search.passengers}
              </label>
              <div className="h-[48px] flex items-center bg-white border-2 border-[#ebcad9] rounded-xl px-3 transition-all hover:border-[#dca5bd] focus-within:border-[#b20163]">
                <Users className="w-4 h-4 text-[#8f7d84] shrink-0 ltr:mr-2 rtl:ml-2" />
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(Number(e.target.value))}
                  className="w-full bg-transparent text-sm font-medium text-[#1c1b1b] focus:outline-none cursor-pointer appearance-none"
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-[#8f7d84] pointer-events-none shrink-0" />
              </div>
            </div>

            {/* SEARCH BUTTON */}
            <div className="sm:col-span-2 lg:col-span-1">
              <button
                type="submit"
                className="w-full h-[48px] bg-gradient-to-r from-[#ffe26d] via-[#ffdf63] to-[#d9b747] hover:brightness-105 text-[#17171d] font-extrabold text-sm sm:text-base rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group"
                style={{ fontFamily: "'Barlow Semi Condensed', sans-serif" }}
              >
                <span>{t.search.btnSearch}</span>
                <span className="w-6 h-6 rounded-full flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-[#17171d] rtl:rotate-180 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
