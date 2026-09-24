'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Locale, translations } from '@/lib/translations';
import { SubpageNavbar } from './SubpageNavbar';

export { SubpageNavbar };

interface NavbarProps {
  locale: Locale;
  onToggleLocale: () => void;
  variant?: 'home' | 'subpage';
  activeNav?: 'about' | 'operators' | 'faq' | 'contact';
}

export function Navbar({ locale, onToggleLocale, variant = 'home', activeNav }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (variant === 'subpage') return;
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [variant]);

  if (variant === 'subpage') {
    return <SubpageNavbar locale={locale} onToggleLocale={onToggleLocale} activeNav={activeNav} />;
  }

  const t = translations[locale];
  const isAr = locale === 'ar';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-rose-100/60'
          : 'bg-transparent border-transparent'
        }`}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-20 flex items-center justify-between">
          {/* Left Group: Brand Logo + Navigation Links (itemSpacing: 46px) */}
          <div className="flex items-center gap-7 lg:gap-[46px]">
            <Link href="/" className="flex items-center flex-shrink-0">
              <div className="relative w-[145px] h-[54px]">
                <Image
                  src="/images/logo.png"
                  alt="Bus Arabia Logo"
                  fill
                  className="object-contain object-left rtl:object-right"
                  priority
                />
              </div>
            </Link>

            {/* Navigation Links (Figma 1574:3063: itemSpacing 32px, Montserrat 12px Medium) */}
            <nav className="hidden lg:flex items-center gap-[32px] text-[13px] leading-[16.8px] font-['Montserrat',sans-serif] font-medium text-[#554149]">
              <Link
                href="/about"
                className={`hover:text-[#b20163] transition-colors whitespace-nowrap ${activeNav === 'about' ? 'text-[#b20163]' : ''
                  }`}
              >
                {t.nav.aboutUs}
              </Link>
              <Link
                href="/operators"
                className="relative pb-1 hover:text-[#b20163] transition-colors whitespace-nowrap"
              >
                <span className="text-[#b20163] font-semibold">
                  {t.nav.ourBusOperators}
                </span>
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#b20163] rounded-full" />
              </Link>
              <Link
                href="/faq"
                className={`hover:text-[#b20163] transition-colors whitespace-nowrap ${activeNav === 'faq' ? 'text-[#b20163]' : ''
                  }`}
              >
                {t.nav.faq}
              </Link>
              <Link
                href="/contact"
                className={`hover:text-[#b20163] transition-colors whitespace-nowrap ${activeNav === 'contact' ? 'text-[#b20163]' : ''
                  }`}
              >
                {t.nav.contactUs}
              </Link>
            </nav>
          </div>

          {/* Right Action Controls matching Figma Frame 127 (1574:3072: itemSpacing 12px) */}
          <div className="flex items-center gap-3 sm:gap-[12px] flex-shrink-0">
            {/* Language Selector Group: "Select Language: [ Flag العربية ] :اختر اللغة" */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-[11px] font-['Montserrat',sans-serif] font-bold text-[#554149] hidden xl:inline tracking-[0.62px] whitespace-nowrap">
                Select Language:
              </span>
              <button
                onClick={onToggleLocale}
                type="button"
                className="inline-flex items-center justify-center gap-[9px] w-[119px] h-[41px] rounded-full border border-[#DBBFC9] bg-[#FFF8F8] hover:bg-white text-[12px] font-semibold text-[#554149] cursor-pointer shadow-[0_4px_4px_rgba(0,0,0,0.08)] backdrop-blur-[49.8px] transition-all flex-shrink-0"
                title="Toggle Language"
              >
                {/* Saudi / UK Flag from Figma */}
                <div className="relative w-[28px] h-[19.25px] flex-shrink-0 overflow-hidden rounded-[3px] shadow-[0_1px_2px_rgba(0,0,0,0.1)]">
                  <img
                    src={isAr ? '/icons/uk-flag.svg' : '/icons/figma/1574-3078.svg'}
                    alt={isAr ? 'English' : 'Saudi Arabia Flag'}
                    width={28}
                    height={19.25}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-['Montserrat',sans-serif] font-semibold text-[12px] text-[#554149] tracking-[0.7px]">
                  {isAr ? 'English' : 'العربية'}
                </span>
              </button>
              <span className="text-[12px] font-['Montserrat',sans-serif] font-bold text-[#554149] hidden xl:inline tracking-[0.66px] whitespace-nowrap">
                :اختر اللغة
              </span>
            </div>

            {/* Gold Book Now CTA Button matching Figma Frame 3088 (1574:3088: 137x41px) */}
            <Link
              href="/#search-box"
              className="inline-flex items-center justify-center w-[125px] sm:w-[137px] h-[41px] text-[14px] leading-[16.8px] tracking-[0.7px] font-['Inter',sans-serif] font-semibold text-[#1C1B1B] bg-gradient-to-r from-[#FFE26D] via-[#FDEA9D] to-[#D9B747] hover:brightness-105 rounded-full shadow-[0_4px_4px_rgba(0,0,0,0.1)] hover:shadow-md transition-all cursor-pointer whitespace-nowrap"
            >
              {t.nav.bookNow}
            </Link>

            {/* Sign in / Sign up link matching Figma Frame 3090 (1574:3090) */}
            <a
              href="#login"
              className="inline-flex items-center justify-center px-2 py-2 text-[14px] leading-[16.8px] tracking-[0.7px] font-['Inter',sans-serif] font-semibold text-[#B20163] hover:text-[#8c0047] transition-all cursor-pointer whitespace-nowrap"
            >
              {t.nav.signInSignUp}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

