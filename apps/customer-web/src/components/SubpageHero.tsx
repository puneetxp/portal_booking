'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { Locale } from '@/lib/translations';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface SubpageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumbs: BreadcrumbItem[];
  badge?: string;
  locale?: Locale;
}

export function SubpageHero({
  title,
  subtitle,
  breadcrumbs,
  badge,
  locale = 'en',
}: SubpageHeroProps) {
  const isAr = locale === 'ar';

  return (
    <div className="relative bg-gradient-to-br from-[#950250] via-[#b20163] to-[#550036] text-white pt-10 sm:pt-14 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden shadow-md">
      {/* Decorative Background Patterns */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffe26d_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#fa1590]/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#ffe26d]/15 blur-2xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Breadcrumb navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 sm:gap-2 text-xs font-semibold text-white/80 mb-4 flex-wrap"
        >
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-[#ffe26d] transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>{isAr ? 'الرئيسية' : 'Home'}</span>
          </Link>

          {breadcrumbs.map((item, index) => (
            <React.Fragment key={index}>
              <ChevronRight className="w-3.5 h-3.5 text-white/50 rtl:rotate-180 flex-shrink-0" />
              {item.href ? (
                <Link
                  href={item.href}
                  className="hover:text-[#ffe26d] transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-[#ffe26d] font-bold">{item.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Optional Badge */}
        {badge && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs border border-white/20 text-[#ffe26d] text-xs font-bold uppercase tracking-wider mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffe26d] animate-pulse" />
            {badge}
          </div>
        )}

        {/* Title & Subtitle */}
        <h1
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight"
          style={{ fontFamily: isAr ? "'Cairo', sans-serif" : "'Montserrat', sans-serif" }}
        >
          {title}
        </h1>

        {subtitle && (
          <p className="mt-3 max-w-2xl text-sm sm:text-base text-white/90 font-normal leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
