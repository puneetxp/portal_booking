'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Locale } from '@/lib/translations';
import { SubpageNavbar } from '@/components/SubpageNavbar';
import { Footer } from '@/components/Footer';
import { SubpageHero } from '@/components/SubpageHero';
import { OPERATORS, Operator } from '@/lib/operators-data';
import {
  Search,
  Star,
  ShieldCheck,
  MapPin,
  ArrowRight,
  Clock,
  Award,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Users,
  Headphones,
} from 'lucide-react';

export default function OperatorsIndexPage() {
  const [locale, setLocale] = useState<Locale>('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedClass, setSelectedClass] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

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

  const cities = [
    { id: 'all', nameEn: 'All Hub Cities', nameAr: 'كافة المدن' },
    { id: 'Riyadh', nameEn: 'Riyadh', nameAr: 'الرياض' },
    { id: 'Jeddah', nameEn: 'Jeddah', nameAr: 'جدة' },
    { id: 'Makkah', nameEn: 'Makkah', nameAr: 'مكة المكرمة' },
    { id: 'Madinah', nameEn: 'Madinah', nameAr: 'المدينة المنورة' },
    { id: 'Dammam', nameEn: 'Dammam', nameAr: 'الدمام' },
    { id: 'Hail', nameEn: 'Hail', nameAr: 'حائل' },
  ];

  const filteredOperators = useMemo(() => {
    return OPERATORS.filter((op) => {
      const matchesSearch =
        op.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        op.nameAr.includes(searchQuery) ||
        op.headquartersEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        op.headquartersAr.includes(searchQuery);

      if (!matchesSearch) return false;

      if (selectedCity !== 'all') {
        const matchesCity =
          op.headquartersEn.includes(selectedCity) ||
          op.topRoutes.some((r) => r.fromEn === selectedCity || r.toEn === selectedCity);
        if (!matchesCity) return false;
      }

      if (selectedClass !== 'all') {
        const matchesClass = op.busClasses.some((c) =>
          c.toLowerCase().includes(selectedClass.toLowerCase())
        );
        if (!matchesClass) return false;
      }

      return true;
    });
  }, [searchQuery, selectedCity, selectedClass]);

  return (
    <div className="flex flex-col min-h-screen bg-[#fcf9f8] selection:bg-[#b20163] selection:text-white">
      <SubpageNavbar locale={locale} onToggleLocale={toggleLocale} activeNav="operators" />

      <main className="flex-1">
        {/* Figma Subpage Hero Banner */}
        <SubpageHero
          badge={isAr ? 'شبكة المشغلين المعتمدة' : 'Official Operator Directory'}
          title={isAr ? 'مشغلو الحافلات المعتمدون' : 'Verified Bus Operators'}
          subtitle={
            isAr
              ? 'اختر من بين أكثر من 50 شركة نقل معتمدة رسمياً من الهيئة العامة للنقل (TGA) في المملكة العربية السعودية.'
              : 'Choose from 50+ accredited transport carriers operating across 30+ Saudi cities with verified safety and real-time schedules.'
          }
          breadcrumbs={[{ label: isAr ? 'مشغلو الحافلات' : 'Our Bus Operators' }]}
          locale={locale}
        />

        {/* Content Container matching Figma Frame 2024:149 */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Section - Search and Filters (Figma 2024:186) */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-rose-100/70 mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  isAr ? 'ابحث باسم المشغل أو المدينة...' : 'Search operator or city...'
                }
                className="w-full ps-10 pe-4 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#b20163] bg-slate-50/50"
              />
            </div>

            {/* City Dropdown & Class Filters */}
            <div className="flex items-center gap-3 w-full md:w-auto flex-wrap">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="px-4 py-2.5 rounded-full border border-slate-200 text-xs font-bold text-slate-700 bg-white focus:outline-none focus:border-[#b20163] cursor-pointer"
              >
                {cities.map((c) => (
                  <option key={c.id} value={c.id}>
                    {isAr ? c.nameAr : c.nameEn}
                  </option>
                ))}
              </select>

              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                {[
                  { id: 'all', labelEn: 'All Classes', labelAr: 'كافة الفئات' },
                  { id: 'vip', labelEn: 'VIP Luxury', labelAr: 'فاخر VIP' },
                  { id: 'executive', labelEn: 'Executive', labelAr: 'درجة أولى' },
                  { id: 'express', labelEn: 'Express', labelAr: 'مكوكية' },
                ].map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setSelectedClass(tier.id)}
                    className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      selectedClass === tier.id
                        ? 'bg-[#b20163] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {isAr ? tier.labelAr : tier.labelEn}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 3-Column Operator Grid (Figma Frame 2024:220) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {filteredOperators.map((operator) => (
              <div
                key={operator.slug}
                className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl border border-rose-100/70 hover:border-[#b20163]/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Card Header: Monogram + Name + Rating */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#950250] to-[#b20163] text-white font-black text-xl flex items-center justify-center shadow-md flex-shrink-0">
                        {operator.nameEn.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#b20163] transition-colors leading-tight">
                          {isAr ? operator.nameAr : operator.nameEn}
                        </h3>
                        <p className="text-[11px] font-medium text-slate-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-[#b20163]" />
                          <span>{isAr ? operator.headquartersAr : operator.headquartersEn}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold flex-shrink-0">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{operator.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  {/* Badge & License */}
                  <div className="flex items-center gap-2 mb-3">
                    {operator.badgeEn && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-rose-50 text-[#b20163] text-[10px] font-extrabold uppercase border border-rose-200/50">
                        {isAr ? operator.badgeAr : operator.badgeEn}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#137a08] text-[10px] font-bold border border-emerald-200/60">
                      <ShieldCheck className="w-3 h-3" />
                      <span>{operator.tgaLicense}</span>
                    </span>
                  </div>

                  {/* Tagline */}
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4 font-normal">
                    {isAr ? operator.descriptionAr : operator.descriptionEn}
                  </p>

                  {/* Fleet & Class Pills */}
                  <div className="bg-[#fcf9f8] rounded-2xl p-3 mb-4 border border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 font-semibold block uppercase">
                        {isAr ? 'الأسطول النشط' : 'Active Fleet'}
                      </span>
                      <span className="font-extrabold text-slate-800">
                        {operator.fleetSize}+ {isAr ? 'حافلة' : 'Buses'}
                      </span>
                    </div>
                    <div className="text-end">
                      <span className="text-[10px] text-slate-400 font-semibold block uppercase">
                        {isAr ? 'فئات الخدمة' : 'Class Options'}
                      </span>
                      <span className="font-extrabold text-[#b20163]">
                        {operator.busClasses[0]}
                      </span>
                    </div>
                  </div>

                  {/* Popular Route Sample */}
                  <div className="space-y-1.5 mb-5">
                    <span className="text-[11px] font-bold text-slate-700 block">
                      {isAr ? 'أشهر المسارات:' : 'Key Corridor:'}
                    </span>
                    {operator.topRoutes.slice(0, 1).map((route, rIdx) => (
                      <div
                        key={rIdx}
                        className="flex items-center justify-between text-xs bg-white px-3 py-1.5 rounded-xl border border-slate-100"
                      >
                        <span className="font-semibold text-slate-800">
                          {isAr
                            ? `${route.fromAr} ⟵ ${route.toAr}`
                            : `${route.fromEn} → ${route.toEn}`}
                        </span>
                        <span className="font-extrabold text-[#b20163]">
                          {isAr ? `من ${route.price} ر.س` : `from SAR ${route.price}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Button */}
                <Link
                  href={`/operators/${operator.slug}`}
                  className="w-full py-2.5 px-4 rounded-full bg-slate-900 hover:bg-[#b20163] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs group/btn mt-auto"
                >
                  <span>{isAr ? 'عرض الأسطول والمواعيد' : 'View Fleet & Schedules'}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180 group-hover/btn:translate-x-0.5 rtl:group-hover/btn:-translate-x-0.5 transition-transform" />
                </Link>
              </div>
            ))}
          </div>

          {/* Pagination Section (Figma Frame 2024:634) */}
          <div className="flex items-center justify-center gap-2 py-6 border-t border-slate-200">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
            </button>
            <button className="w-9 h-9 rounded-full bg-[#b20163] text-white font-extrabold text-xs shadow-xs">
              1
            </button>
            <button className="w-9 h-9 rounded-full border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-100 transition-colors">
              2
            </button>
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <ChevronRight className="w-4 h-4 rtl:rotate-180" />
            </button>
          </div>

          {/* Section - Trust Signals (Figma Frame 2024:654) */}
          <div className="mt-12 bg-white rounded-3xl p-8 border border-rose-100/70 shadow-sm grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              {
                icon: ShieldCheck,
                titleEn: '100% TGA Licensed',
                titleAr: 'مرخص رسمي من هيئة النقل',
                descEn: 'Strict vehicle safety and driver standards.',
                descAr: 'فحص دوري ومعايير أمان معتمدة.',
              },
              {
                icon: Award,
                titleEn: 'Best Fare Guarantee',
                titleAr: 'ضمان أفضل الأسعار',
                descEn: 'Zero markups with 15% VAT included.',
                descAr: 'أسعار موحدة وشاملة للضريبة.',
              },
              {
                icon: CheckCircle2,
                titleEn: 'Guaranteed Seat Hold',
                titleAr: 'مقعد مؤكد بدون مفاجآت',
                descEn: 'Interactive live bus seat selection.',
                descAr: 'حجز مقعدك بدقة على الخريطة.',
              },
              {
                icon: Headphones,
                titleEn: '24/7 Toll-Free Support',
                titleAr: 'دعم هاتفي على مدار الساعة',
                descEn: 'Instant care via 9200 12345.',
                descAr: 'خدمة عملاء فورية على 9200 12345.',
              },
            ].map((sig, idx) => {
              const Icon = sig.icon;
              return (
                <div key={idx} className="space-y-1">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 text-[#b20163] flex items-center justify-center mx-auto mb-2">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">
                    {isAr ? sig.titleAr : sig.titleEn}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {isAr ? sig.descAr : sig.descEn}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
