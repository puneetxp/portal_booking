'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Locale } from '@/lib/translations';
import { SubpageNavbar } from '@/components/SubpageNavbar';
import { Footer } from '@/components/Footer';
import { SubpageHero } from '@/components/SubpageHero';
import { OPERATORS, Operator } from '@/lib/operators-data';
import {
  Star,
  ShieldCheck,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Bus,
  CheckCircle2,
  Clock,
  ArrowRight,
  Wifi,
  Sparkles,
  Award,
  ChevronRight,
} from 'lucide-react';

interface OperatorDetailsPageProps {
  params: Promise<{ slug: string }>;
}

export default function OperatorDetailsPage({ params }: OperatorDetailsPageProps) {
  const resolvedParams = use(params);
  const operator = OPERATORS.find((op) => op.slug === resolvedParams.slug) || OPERATORS[0];

  const [locale, setLocale] = useState<Locale>('en');
  const [activeTab, setActiveTab] = useState<'overview' | 'routes' | 'amenities' | 'reviews'>('overview');

  const toggleLocale = () => {
    setLocale((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search);
      const urlLang = p.get('lang');
      if (urlLang === 'ar' || urlLang === 'en') {
        setLocale(urlLang);
      }
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  }, [locale]);

  const isAr = locale === 'ar';

  return (
    <div className="flex flex-col min-h-screen bg-[#fcf9f8] selection:bg-[#b20163] selection:text-white">
      <SubpageNavbar locale={locale} onToggleLocale={toggleLocale} activeNav="operators" />

      <main className="flex-1">
        {/* Header Hero */}
        <SubpageHero
          badge={operator.badgeEn ? (isAr ? operator.badgeAr : operator.badgeEn) : (isAr ? 'مشغل معتمد' : 'Verified Operator')}
          title={isAr ? operator.nameAr : operator.nameEn}
          subtitle={isAr ? operator.taglineAr : operator.taglineEn}
          breadcrumbs={[
            { label: isAr ? 'مشغلو الحافلات' : 'Our Bus Operators', href: '/operators' },
            { label: isAr ? operator.nameAr : operator.nameEn },
          ]}
          locale={locale}
        />

        {/* Operator Profile Overview Card (Grounded in Figma 840:2521) */}
        <section className="relative -mt-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-rose-100/70">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
              {/* Left Profile Info */}
              <div className="flex items-center gap-5">
                <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-br from-[#950250] via-[#b20163] to-[#550036] text-white font-black text-2xl sm:text-3xl flex items-center justify-center shadow-lg flex-shrink-0">
                  {operator.nameEn.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                      {isAr ? operator.nameAr : operator.nameEn}
                    </h2>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#137a08] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{operator.tgaLicense}</span>
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 flex items-center gap-1.5 flex-wrap">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#b20163]" />
                      {isAr ? operator.headquartersAr : operator.headquartersEn}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {isAr ? `تأسست عام ${operator.founded}` : `Est. ${operator.founded}`}
                    </span>
                  </p>
                </div>
              </div>

              {/* Right Rating & Action */}
              <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                <div className="text-end">
                  <div className="flex items-center gap-1.5 justify-end">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(operator.rating)
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-base font-extrabold text-slate-900">
                      {operator.rating.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
                    ({operator.reviewCount.toLocaleString()}{' '}
                    {isAr ? 'تقييم موثق' : 'verified reviews'})
                  </span>
                </div>

                <Link
                  href="/#search-box"
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#ffe26d] via-[#fdeab2] to-[#d9b747] text-slate-900 font-extrabold text-xs shadow-sm hover:brightness-105 transition-all"
                >
                  {isAr ? 'احجز رحلة الآن' : 'Book a Trip'}
                </Link>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 text-center">
              <div className="p-3 bg-[#fcf9f8] rounded-2xl border border-slate-100">
                <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase block">
                  {isAr ? 'عدد الحافلات' : 'Active Fleet'}
                </span>
                <span className="text-lg sm:text-xl font-extrabold text-[#b20163]">
                  {operator.fleetSize}+
                </span>
              </div>
              <div className="p-3 bg-[#fcf9f8] rounded-2xl border border-slate-100">
                <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase block">
                  {isAr ? 'فئات الخدمة' : 'Fleet Classes'}
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-slate-800">
                  {operator.busClasses.length} {isAr ? 'فئات' : 'Tiers'}
                </span>
              </div>
              <div className="p-3 bg-[#fcf9f8] rounded-2xl border border-slate-100">
                <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase block">
                  {isAr ? 'خدمة العملاء' : 'Helpline'}
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-slate-800">
                  {operator.phone}
                </span>
              </div>
              <div className="p-3 bg-[#fcf9f8] rounded-2xl border border-slate-100">
                <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase block">
                  {isAr ? 'حالة الاعتماد' : 'Accreditation'}
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-[#137a08]">
                  {isAr ? 'معتمد رسمي' : 'TGA Verified'}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Tabbed Content Navigation */}
        <section className="py-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex border-b border-slate-200 gap-6 sm:gap-8 overflow-x-auto scrollbar-none">
            {[
              { id: 'overview', labelEn: 'Company Overview & Fleet', labelAr: 'عن الشركة والأسطول' },
              { id: 'routes', labelEn: 'Active Routes & Fares', labelAr: 'المسارات والأسعار' },
              { id: 'amenities', labelEn: 'Amenities & Safety', labelAr: 'الخدمات والأمان' },
              { id: 'reviews', labelEn: 'Customer Reviews', labelAr: 'تقييمات المسافرين' },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-3 text-xs sm:text-sm font-extrabold transition-colors whitespace-nowrap cursor-pointer relative ${
                    isActive ? 'text-[#b20163]' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {isAr ? tab.labelAr : tab.labelEn}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#b20163] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="py-8 space-y-10">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-4">
                <h3 className="text-lg font-bold text-slate-900">
                  {isAr ? `نبذة عن ${operator.nameAr}` : `About ${operator.nameEn}`}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {isAr ? operator.descriptionAr : operator.descriptionEn}
                </p>

                <div className="pt-4">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                    {isAr ? 'فئات الحافلات المتوفرة في الأسطول:' : 'Available Bus Categories:'}
                  </h4>
                  <div className="flex flex-wrap gap-2.5">
                    {operator.busClasses.map((cls, i) => (
                      <span
                        key={i}
                        className="px-3.5 py-1.5 rounded-full bg-rose-50 text-[#b20163] text-xs font-bold border border-rose-200/50"
                      >
                        {cls}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ACTIVE ROUTES */}
          {activeTab === 'routes' && (
            <div className="py-8 space-y-4">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {isAr ? 'جدول الرحلات اليومية والأسعار' : 'Daily Departure Schedules & Starting Fares'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {operator.topRoutes.map((route, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center justify-between gap-4 hover:shadow-md transition-shadow"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-sm font-extrabold text-slate-900">
                        <span>{isAr ? route.fromAr : route.fromEn}</span>
                        <ArrowRight className="w-4 h-4 text-[#b20163] rtl:rotate-180" />
                        <span>{isAr ? route.toAr : route.toEn}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {route.duration}
                        </span>
                        <span>•</span>
                        <span>
                          {route.departuresPerDay} {isAr ? 'رحلة/يوم' : 'trips/day'}
                        </span>
                      </div>
                    </div>

                    <div className="text-end flex-shrink-0">
                      <span className="text-xs text-slate-400 block">{isAr ? 'يبدأ من' : 'Starts from'}</span>
                      <span className="text-lg font-extrabold text-[#b20163]">
                        {isAr ? `${route.price} ر.س` : `SAR ${route.price}`}
                      </span>
                      <Link
                        href={`/#search-box`}
                        className="mt-1 inline-flex items-center justify-center text-[11px] font-bold text-slate-900 bg-[#ffe26d] hover:bg-[#ffd94f] px-3 py-1 rounded-full shadow-2xs"
                      >
                        {isAr ? 'احجز' : 'Book'}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: AMENITIES & SAFETY */}
          {activeTab === 'amenities' && (
            <div className="py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Onboard Amenities */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#b20163]" />
                  <span>{isAr ? 'الخدمات ووسائل الراحة' : 'Onboard Comfort & Amenities'}</span>
                </h3>
                <div className="space-y-3">
                  {operator.amenities.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-rose-50/40 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-rose-100 text-[#b20163] flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-slate-800">
                        {isAr ? item.nameAr : item.nameEn}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Safety Standards */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#137a08]" />
                  <span>{isAr ? 'معايير السلامة والتأمين' : 'Safety Protocols & Telemetry'}</span>
                </h3>
                <div className="space-y-3">
                  {(isAr ? operator.safetyFeaturesAr : operator.safetyFeaturesEn).map(
                    (feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-emerald-50/40 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#137a08] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-slate-700 leading-snug">
                          {feature}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="py-8 space-y-6">
              <h3 className="text-lg font-bold text-slate-900">
                {isAr ? 'آراء وتجارب المسافرين الموثقة' : 'Verified Passenger Reviews'}
              </h3>
              <div className="space-y-4">
                {operator.reviews.map((rev, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-full bg-[#fdeab2] text-slate-900 font-black text-xs flex items-center justify-center">
                          {rev.author.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <span className="text-xs sm:text-sm font-bold text-slate-900 block">
                            {rev.author}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium">
                            {rev.route} • {rev.date}
                          </span>
                        </div>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < rev.rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-slate-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                      "{isAr ? rev.commentAr : rev.commentEn}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
