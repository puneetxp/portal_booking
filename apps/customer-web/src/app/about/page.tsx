'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Locale } from '@/lib/translations';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SubpageHero } from '@/components/SubpageHero';
import {
  ShieldCheck,
  HeartHandshake,
  Smartphone,
  Clock,
  Compass,
  Building2,
  Users,
  Award,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export default function AboutPage() {
  const [locale, setLocale] = useState<Locale>('en');

  const toggleLocale = () => {
    setLocale((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang');
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

  const stats = [
    {
      value: '50+',
      labelEn: 'Licensed Bus Operators',
      labelAr: 'مشغل حافلات مرخص',
      icon: Building2,
    },
    {
      value: '500+',
      labelEn: 'Daily Inter-City Routes',
      labelAr: 'خط سير يومي بين المدن',
      icon: Compass,
    },
    {
      value: '2.5M+',
      labelEn: 'Passengers Transported',
      labelAr: 'مسافر تم خدمتهم',
      icon: Users,
    },
    {
      value: '99.4%',
      labelEn: 'On-Time Schedule Adherence',
      labelAr: 'التزام بالمواعيد المجدولة',
      icon: Award,
    },
  ];

  const pillars = [
    {
      icon: ShieldCheck,
      titleEn: 'TGA Regulated & Safe',
      titleAr: 'مرخص ومعتمد من هيئة النقل',
      descEn:
        'All bus operators on Bus Arabia are officially licensed by the Transport General Authority (TGA), guaranteeing rigorous vehicle safety, valid insurance, and professional drivers.',
      descAr:
        'جميع مشغلي الحافلات في باص أرابيا مرخصون رسميًا من الهيئة العامة للنقل، مما يضمن معايير أمان صارمة وتأمين ساري وسائقين محترفين.',
    },
    {
      icon: Smartphone,
      titleEn: '100% Digital Experience',
      titleAr: 'تجربة رقمية متكاملة',
      descEn:
        'Skip ticket counters. Compare schedules, select your exact seat on interactive bus maps, pay securely with Mada or Apple Pay, and board with instant QR tickets.',
      descAr:
        'وداعاً لطوابير التذاكر. قارن المواعيد، واختر مقعدك بدقة على الخريطة التفاعلية، وادفع بأمان عبر مدى أو آبل باي، واصعد للحافلة برمز QR فوري.',
    },
    {
      icon: HeartHandshake,
      titleEn: 'Authentic Arabian Hospitality',
      titleAr: 'ضيافة عربية أصيلة',
      descEn:
        'We blend modern transit technology with warmth and care. Our 24/7 bilingual customer support team is always available to assist with bookings, changes, and questions.',
      descAr:
        'نجمع بين تقنيات النقل الحديثة والاهتمام بالمسافر. فريق دعم العملاء ثنائي اللغة يعمل على مدار الساعة لخدمتكم والإجابة على أي استفسار.',
    },
    {
      icon: Clock,
      titleEn: 'Punctuality & Instant Refunds',
      titleAr: 'دقة المواعيد واسترداد فوري',
      descEn:
        'Real-time departure tracking ensures you travel with confidence. Enjoy instant automated refunds directly to your Bus Arabia Wallet if plans change.',
      descAr:
        'تتبع حي لمواعيد المغادرة والوصول بكل ثقة. استمتع باسترداد مالي فوري وتلقائي إلى محفظتك الإلكترونية عند تعديل أو إلغاء رحلتك.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#fcf9f8] selection:bg-[#b20163] selection:text-white">
      <Navbar locale={locale} onToggleLocale={toggleLocale} />

      <main className="flex-1">
        {/* Subpage Header */}
        <SubpageHero
          badge={isAr ? 'عن باص أرابيا' : 'About Bus Arabia'}
          title={
            isAr
              ? 'إعادة ابتكار تجربة السفر بالحافلات في المملكة'
              : 'Transforming Inter-City Bus Travel Across the Kingdom'
          }
          subtitle={
            isAr
              ? 'باص أرابيا هي المنصة الرقمية الرائدة في المملكة لحجز تذاكر الحافلات، تربط المسافرين بأكثر من 50 مشغلاً مرخصاً بأسعار شفافة وتجربة سلسة.'
              : 'Bus Arabia is Saudi Arabia’s premier digital bus booking and mobility platform, connecting passengers with top licensed transport operators under Saudi Vision 2030.'
          }
          breadcrumbs={[{ label: isAr ? 'من نحن' : 'About Us' }]}
          locale={locale}
        />

        {/* 1. Statistics Band */}
        <section className="relative -mt-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-rose-100/60 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center p-3 rounded-2xl hover:bg-rose-50/40 transition-colors"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ffe26d] to-[#d9b747] text-slate-900 flex items-center justify-center mb-3 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#b20163] tracking-tight">
                    {s.value}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
                    {isAr ? s.labelAr : s.labelEn}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* 2. Mission & Vision Section */}
        <section className="py-16 sm:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100/60 text-[#b20163] text-xs font-bold uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5" />
                <span>{isAr ? 'رؤيتنا ورسالتنا' : 'Our Mission & Vision'}</span>
              </div>

              <h2
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight"
                style={{ fontFamily: isAr ? "'Cairo', sans-serif" : "'Montserrat', sans-serif" }}
              >
                {isAr
                  ? 'تمكين التنقل المستدام والموثوق للجميع'
                  : 'Empowering Accessible, Reliable Mobility for Every Traveler'}
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                {isAr
                  ? 'انطلقت باص أرابيا بهدف رئيسي: توحيد قطاع النقل بالحافلات في المملكة العربية السعودية ضمن منصة رقمية فائقة التطور وسهلة الاستخدام. نتيح للمواطنين والمقيمين وضيوف الرحمن المقارنة الفورية بين المشغلين والأسعار، وتأكيد الحجز في أقل من دقيقة.'
                  : 'Founded in Riyadh, Bus Arabia was born to solve a clear challenge: centralize and modernize the Kingdom’s fragmented bus transit sector into a unified, reliable digital ecosystem. We connect thousands of daily travelers with certified bus fleets across 30+ Saudi cities.'}
              </p>

              <div className="space-y-3 pt-2">
                {[
                  isAr
                    ? 'دعم مستهدفات رؤية السعودية 2030 في تعزيز النقل العام الصديق للبيئة'
                    : 'Supporting Saudi Vision 2030 transit and eco-friendly public mobility goals',
                  isAr
                    ? 'ربط أكثر من 30 مدينة سعودية برحلات مجدولة ومباشرة'
                    : 'Direct inter-city connections spanning Riyadh, Jeddah, Makkah, Madinah, Dammam, and more',
                  isAr
                    ? 'تسهيل رحلات العمرة والزيارة بالحافلات الفاخرة بأسعار اقتصادية'
                    : 'Dedicated pilgrimage and VIP express luxury lines for Umrah and Ziyarah',
                  isAr
                    ? 'أسعار شفافة بالكامل شاملة ضريبة القيمة المضافة 15% دون رسوم خفية'
                    : '100% transparent pricing inclusive of 15% KSA VAT with zero surprise fees',
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#b20163] flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-medium text-slate-700">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Card / Highlights */}
            <div className="lg:col-span-5">
              <div className="bg-gradient-to-br from-[#550036] to-[#b20163] rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#fa1590]/20 rounded-full blur-2xl pointer-events-none" />
                <h3 className="text-xl font-extrabold text-[#ffe26d] mb-4">
                  {isAr ? 'لماذا يختارنا المسافرون؟' : 'The Bus Arabia Advantage'}
                </h3>
                <p className="text-xs sm:text-sm text-white/90 leading-relaxed mb-6">
                  {isAr
                    ? 'نحن لا نبيع التذاكر فقط، بل نضمن لك مقعدك المؤكد بدقة متناهية، مع إمكانية إلغاء الحجز واسترداد القيمة فوراً إلى محفظتك الرقمية.'
                    : 'We do not merely sell bus tickets; we provide confirmed seat reservations with real-time seat lock protection, integrated Mada/Apple Pay, and automated refund safeguards.'}
                </p>

                <div className="border-t border-white/20 pt-6 space-y-4">
                  <div className="flex items-center justify-between text-xs sm:text-sm font-semibold">
                    <span className="text-white/80">{isAr ? 'تغطية المملكة' : 'Kingdom Coverage'}</span>
                    <span className="text-[#ffe26d]">100% All Provinces</span>
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm font-semibold">
                    <span className="text-white/80">{isAr ? 'الدفع الآمن' : 'Payment Security'}</span>
                    <span className="text-[#ffe26d]">Mada / Apple Pay / Visa</span>
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm font-semibold">
                    <span className="text-white/80">{isAr ? 'دعم العملاء' : 'Customer Support'}</span>
                    <span className="text-[#ffe26d]">24/7 Toll-Free & WhatsApp</span>
                  </div>
                </div>

                <div className="mt-8">
                  <Link
                    href="/operators"
                    className="inline-flex items-center justify-center w-full py-3 px-5 rounded-full bg-[#ffe26d] hover:bg-[#ffd94f] text-slate-900 font-extrabold text-xs shadow-md transition-transform active:scale-95 gap-2"
                  >
                    <span>{isAr ? 'استكشف المشغلين المعتمدين' : 'Explore Partner Operators'}</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Core Pillars Grid */}
        <section className="py-16 bg-white border-y border-rose-100/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-extrabold text-[#b20163] uppercase tracking-wider">
                {isAr ? 'قيمنا الجوهرية' : 'Our Core Values'}
              </span>
              <h2
                className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2"
                style={{ fontFamily: isAr ? "'Cairo', sans-serif" : "'Montserrat', sans-serif" }}
              >
                {isAr ? 'مبنية على الثقة والأمان والابتكار' : 'Built on Trust, Safety, and Digital Excellence'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {pillars.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <div
                    key={idx}
                    className="p-8 rounded-3xl bg-[#fcf9f8] border border-rose-100/60 hover:shadow-lg hover:border-[#b20163]/30 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-rose-100 text-[#b20163] group-hover:bg-[#b20163] group-hover:text-white flex items-center justify-center mb-5 transition-colors shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {isAr ? p.titleAr : p.titleEn}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {isAr ? p.descAr : p.descEn}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. Ready to Book CTA Banner */}
        <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#950250] via-[#b20163] to-[#550036] rounded-3xl p-8 sm:p-12 text-white text-center shadow-xl relative overflow-hidden">
            <div className="max-w-2xl mx-auto relative z-10 space-y-4">
              <h2
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold"
                style={{ fontFamily: isAr ? "'Cairo', sans-serif" : "'Montserrat', sans-serif" }}
              >
                {isAr ? 'جاهز لحجز رحلتك القادمة؟' : 'Ready to Plan Your Next Journey?'}
              </h2>
              <p className="text-xs sm:text-sm text-white/90">
                {isAr
                  ? 'ابحث بين مئات الرحلات اليومية عبر مدن المملكة واحصل على أفضل الأسعار فوراً.'
                  : 'Search hundreds of daily bus trips across Saudi Arabia with guaranteed seat reservation and instant digital ticketing.'}
              </p>
              <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/"
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-[#ffe26d] to-[#d9b747] text-slate-900 font-extrabold text-xs sm:text-sm shadow-md hover:brightness-105 transition-all"
                >
                  {isAr ? 'ابحث عن الرحلات الآن' : 'Search Bus Trips Now'}
                </Link>
                <Link
                  href="/contact"
                  className="px-7 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-xs sm:text-sm transition-all"
                >
                  {isAr ? 'تواصل معنا' : 'Contact Support'}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
