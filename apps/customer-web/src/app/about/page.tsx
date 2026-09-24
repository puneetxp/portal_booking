'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Locale } from '@/lib/translations';
import { SubpageNavbar } from '@/components/SubpageNavbar';
import { Footer } from '@/components/Footer';
import { ArrowRight } from 'lucide-react';

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

  // 4 Feature highlights directly from Figma Frame 3694 / Introduction Section
  const introFeatures = [
    {
      icon: '/icons/about/2099-1284.svg',
      titleEn: 'Regional Corridors',
      titleAr: 'مسارات وخطوط إقليمية',
      descEn: 'Saudi Arabia, Yemen,\nEgypt, Jordan, UAE &\nmore',
      descAr: 'المملكة العربية السعودية،\nاليمن، مصر، الأردن،\nالإمارات والمزيد',
    },
    {
      icon: '/icons/about/2099-1292.svg',
      titleEn: 'Hajj & Umrah Packages',
      titleAr: 'باقات الحج والعمرة',
      descEn: 'Dedicated pilgrimage\ncharter & coach\nbookings',
      descAr: 'حجوزات حافلات وكوتشات\nمخصصة لرحلات\nالحج والزيارة',
    },
    {
      icon: '/icons/about/2099-1308.svg',
      titleEn: 'Quick Comparison',
      titleAr: 'مقارنة سريعة',
      descEn: 'Compare the Pricing, Schedules and Amenities to select your perfect journey quickly.',
      descAr: 'قارن بين الأسعار والمواعيد والخدمات لاختيار رحلتك المثالية بسرعة وبكل سهولة.',
    },
    {
      icon: '/icons/about/2158-2415.svg',
      titleEn: 'Best Prices Guarantee',
      titleAr: 'ضمان أفضل الأسعار',
      descEn: 'Find the best prices online only at Bus Arabia',
      descAr: 'احصل على أفضل الأسعار عبر الإنترنت حصرياً مع باص أرابيا',
    },
  ];

  // 4 Micro-counter stats directly from Figma Frame 3700 / Mission Section (2099:1313)
  const missionStats = [
    {
      value: '100+',
      labelEn: 'INTERCITY CORRIDORS',
      labelAr: 'مسار بين المدن والمناطق',
    },
    {
      value: '50+',
      labelEn: 'VERIFIED FLEET PARTNERS',
      labelAr: 'شريك أسطول معتمد وموثوق',
    },
    {
      value: '3 Clicks',
      labelEn: 'FAST CHECKOUT',
      labelAr: 'حجز سريع بثلاث خطوات',
    },
    {
      value: '24 / 7',
      labelEn: 'PASSENGER SUPPORT',
      labelAr: 'دعم متواصل للمسافرين',
    },
  ];

  // 3 Core Values directly from Figma Frame 3603 / Our Values Section (2099:1595)
  const values = [
    {
      icon: '/icons/about/2258-3497.svg',
      checkIcon: '/icons/about/2099-1377.svg',
      titleEn: 'Customer-centric Attitude',
      titleAr: 'التركيز التام على العميل',
      tagEn: 'Priority Care Guarantee',
      tagAr: 'ضمان العناية الفائقة',
      descEn:
        'Our customers’ needs and satisfaction are at the heart of our work ethic. We listen to their queries and exceed their expectations every step of the way.',
      descAr:
        'احتياجات عملائنا ورضاهم هما جوهر أخلاقيات عملنا. نستمع إلى استفساراتهم ونسعى لتجاوز توقعاتهم في كل خطوة من خطوات الرحلة.',
    },
    {
      icon: '/icons/about/2099-1383.svg',
      checkIcon: '/icons/about/2099-1395.svg',
      titleEn: 'Quality',
      titleAr: 'الجودة والتميز',
      tagEn: 'High Audit Standards',
      tagAr: 'معايير تدقيق صارمة',
      descEn:
        'We prioritize quality in everything we do. From the bus operators we partner with, to the customer service we provide, excellence is at the heart of all our operations',
      descAr:
        'نضع الجودة في مقدمة أولوياتنا في كل ما نقوم به. بدءاً من مشغلي الحافلات الذين نتعاون معهم، وحتى خدمة العملاء التي نقدمها، التميز هو أساس جميع عملياتنا.',
    },
    {
      icon: '/icons/about/2099-1401.svg',
      checkIcon: '/icons/about/2099-1413.svg',
      titleEn: 'Accountability',
      titleAr: 'المسؤولية والالتزام',
      tagEn: 'Zero-Disruption Commitment',
      tagAr: 'التزام برحلات بلا انقطاع',
      descEn:
        'We’re fully accountable for our work and go all out to fulfill what we commit to. This makes us the reliable choice for anyone who wishes to travel without unexpected disruptions.',
      descAr:
        'نتحمل المسؤولية الكاملة عن خدماتنا ونبذل قصارى جهدنا للوفاء بوعودنا. هذا ما يجعلنا الخيار الموثوق لكل من يرغب في السفر دون أي مفاجآت أو تعطل غير متوقع.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#fcf9f8] selection:bg-[#b20163] selection:text-white font-['Montserrat',sans-serif]">
      {/* 1. Header / Navbar (Frame 3650) */}
      <SubpageNavbar locale={locale} onToggleLocale={toggleLocale} activeNav="about" />

      {/* 2. HERO BANNER - Exact 1:1 match to Figma Frame 3684 & Clip path group 2257:3484 */}
      <section className="relative w-full max-w-[1280px] mx-auto min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] overflow-hidden flex items-center">
        {/* Full-bleed scenic banner background image with red luxury coach */}
        <div
          className={`absolute inset-0 bg-no-repeat bg-cover ${
            isAr
              ? 'bg-[center_left] [transform:scaleX(-1)]'
              : 'bg-[center_right]'
          }`}
          style={{
            backgroundImage: 'url(/images/about/2257-3484.png)',
          }}
        />

        {/* Soft edge-fade for mobile legibility */}
        <div
          className={`absolute inset-0 pointer-events-none ${
            isAr
              ? 'bg-gradient-to-l from-white/90 via-white/70 to-transparent sm:via-white/50 lg:via-transparent'
              : 'bg-gradient-to-r from-white/90 via-white/70 to-transparent sm:via-white/50 lg:via-transparent'
          }`}
        />

        {/* Hero text aligned exactly as in Figma (x: 122, y: 198, w: 577) */}
        <div className="relative z-10 w-full px-6 sm:px-12 lg:px-[122px] py-12 sm:py-16">
          <div className="max-w-[577px] space-y-3 sm:space-y-4">
            {/* Title: About Bus Arabia (Figma: 2157:2406, size 65.5px, bold, #620123) */}
            <h1
              className="text-4xl sm:text-5xl lg:text-[65px] font-bold text-[#620123] leading-[1.1] tracking-tight"
              style={{ fontFamily: isAr ? "'Cairo', sans-serif" : "'Montserrat', sans-serif" }}
            >
              {isAr ? 'عن باص أرابيا' : 'About Bus Arabia'}
            </h1>

            {/* Subtitle 1: Helping you find your Perfect Bus Journey (Figma: 2257:3465, size 28.8px, medium, #000b23) */}
            <p
              className="text-xl sm:text-2xl lg:text-[28px] font-medium text-[#000b23] leading-[1.25] pt-1"
              style={{ fontFamily: isAr ? "'Cairo', sans-serif" : "'Montserrat', sans-serif" }}
            >
              {isAr
                ? 'نساعدك في العثور على رحلة الحافلة المثالية'
                : 'Helping you find your Perfect Bus Journey'}
            </p>

            {/* Subtitle 2: Travel at Discounted prices... (Figma: 2257:3466, size 23.3px, regular, #000b23) */}
            <p
              className="text-base sm:text-lg lg:text-[23px] font-normal text-[#000b23] leading-[1.3] pt-1"
              style={{ fontFamily: isAr ? "'Cairo', sans-serif" : "'Montserrat', sans-serif" }}
            >
              {isAr
                ? 'سافر بأسعار مخفضة براحة وأمان مع مشغلي الحافلات المعتمدين والموثوقين لدينا'
                : 'Travel at Discounted prices with Comfort, Safety and Security with our trusted Bus Operators'}
            </p>
          </div>
        </div>
      </section>

      {/* MAIN BODY CONTAINER - Exactly centered at 1200px width as in Figma Frame 3699 (x: 59, y: 823, w: 1200) */}
      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-0 py-8 sm:py-12 space-y-12 sm:space-y-16">
        {/* 3. OUR INTRODUCTION SECTION (Figma Frame 3699) */}
        <section className="space-y-8">
          <div className="space-y-4">
            <h2
              className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#191c1d]"
              style={{ fontFamily: isAr ? "'Cairo', sans-serif" : "'Montserrat', sans-serif" }}
            >
              {isAr ? 'مقدمة عنا' : 'Our Introduction'}
            </h2>

            <div className="text-sm sm:text-base text-[#584047] leading-[26px] font-normal space-y-4">
              <p>
                {isAr
                  ? 'باص أرابيا هي منصة موثوقة لحجز تذاكر الحافلات عبر الإنترنت، تمكّن المسافرين من التنقل بكل سهولة وسلاسة بين دول الشرق الأوسط. ودّع عناء الذهاب إلى مكاتب السفر ومرحباً بحجز تذاكر الحافلات إلكترونياً داخل السعودية، اليمن، الإمارات، عُمان، السودان، مصر، الأردن، سوريا، العراق، ولبنان براحة تامة من منزلك أو أثناء تنقلك. ما عليك سوى تحديد وجهتي المغادرة والوصول، ومقارنة الأسعار والعروض المقدمة من مختلف المشغلين، واختيار مواعيد السفر المفضلة لديك، وستكون جاهزاً للانطلاق!'
                  : 'Bus Arabia is a reliable online bus ticket booking platform helping people effortlessly move seamlessly across Middle Eastern countries .Say goodbye to the back and forth of going to agents and hello to online bus ticket booking within Saudi Arabia, Yemen, UAE, Oman, Sudan, Egypt, Jordan, Syria, Iraq and Lebanon from the comfort of your home or on the go. Just select your departure and arrival destinations, compare the quotes offered by different providers, choose your preferred travel dates, and you are ready to go!'}
              </p>
              <p>
                {isAr
                  ? 'من شوارع المملكة العربية السعودية النابضة بالحياة إلى معالم مصر التاريخية وصحاري اليمن الساحرة، ومن مدن الأردن العريقة إلى المعالم العصرية لدولة الإمارات، نربطك بمجموعة واسعة من الوجهات عبر أنحاء المنطقة.'
                  : 'From the bustling streets of Saudi Arabia to the historic landmarks of Egypt and stretching deserts of Yemen, and from the historic cities of Jordan to the cosmopolitan landscape of the UAE, we connect you to a wide range of destinations across the region.'}
              </p>
            </div>
          </div>

          {/* 4 Feature Cards (Figma Frame 3694 - w: 265px, h: 187px, rounded-12px) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-2">
            {introFeatures.map((f, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white border border-[#f0e1e6] shadow-[0_2px_4px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-[#b20163]/40 transition-all flex flex-col justify-between min-h-[187px]"
              >
                <div>
                  <div className="w-9 h-9 rounded-lg bg-[#fdf2f6] border border-[#f7d6e3] flex items-center justify-center mb-3">
                    <Image src={f.icon} alt={f.titleEn} width={17} height={17} />
                  </div>
                  <h3 className="text-base font-bold text-[#191c1d] leading-snug">
                    {isAr ? f.titleAr : f.titleEn}
                  </h3>
                </div>
                <p className="text-xs font-bold text-[#584047] leading-[18px] whitespace-pre-line mt-2">
                  {isAr ? f.descAr : f.descEn}
                </p>
              </div>
            ))}
          </div>

          {/* Cargo & Unique Traveler Highlight Card (Figma Background+Shadow 2271:3737 - 6px accent strip) */}
          <div className="relative p-6 sm:p-8 rounded-xl bg-white border border-[#f0e1e6] shadow-[0_2px_8px_rgba(0,0,0,0.02)] overflow-hidden ps-8 sm:ps-10">
            {/* 6px Left Accent Stripe (Figma 2271:3740 - #a40259) */}
            <div className="absolute inset-y-0 start-0 w-1.5 bg-[#a40259]" />

            <div className="space-y-3 text-sm sm:text-base text-[#584047] leading-[26px] font-medium">
              <p>
                {isAr
                  ? 'ندرك في باص أرابيا أن لكل مسافر احتياجاته الخاصة، ولذلك نوفر خيارات متنوعة لحجز تذاكر الحافلات داخل المملكة العربية السعودية واليمن والإمارات ودول الشرق الأوسط لتناسب كافة المتطلبات. سواء كنت تسافر للعمل أو الترفيه، بمفردك أو مع عائلتك ومجموعتك، أو تبحث عن باقات حافلات موثوقة للحج والعمرة، فإن باص أرابيا هي رفيقك الأمثل لحجز تذاكر سريع وخالٍ من المتاعب.'
                  : 'At Bus Arabia, we realize that every traveler is unique, which is why we provide a diverse range of options for online bus ticket booking within Saudi Arabia, Yemen, UAE, and other Middle Eastern countries for their specific needs. Whether you are traveling for business or leisure, solo or with a group, or if you are searching for reliable Hajj and Umrah bus packages, Bus Arabia is your trusted companion for a stress-free quick ticket booking process.'}
              </p>
              <p>
                {isAr
                  ? 'من الحافلات الفاخرة VIP إلى الخيارات الاقتصادية، ستجد كل ما تبحث عنه. ولتكون رحلتك مريحة بالكامل، نقدم أيضاً خدمات شحن الأمتعة لنقل أمتعتك مهما كان حجمها بكل سهولة.'
                  : 'From luxury VIP buses to budget-friendly choices, you will find it all here. And to make your travel truly stress-free, we also offer cargo services where you can transport luggage of any volume without any hassle.'}
              </p>
            </div>
          </div>

          {/* 2 Bottom Action Cards (Figma Frame 3698 - w: 549px & 574px, h: 240px, rounded-12px) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Card A: Quick Comparison (Figma 2099:1257) */}
            <div className="p-7 rounded-xl bg-white border border-[#f0e1e6] shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between min-h-[220px] sm:min-h-[240px]">
              <div className="w-9 h-9 rounded-lg bg-[#fdf2f6] border border-[#f7d6e3] flex items-center justify-center">
                <Image src="/icons/about/2258-3499.svg" alt="Bus Ticket" width={20} height={20} />
              </div>
              <p className="text-base sm:text-lg font-medium text-[#584047] leading-[28px]">
                {isAr
                  ? 'تكمن القوة الفريدة لمنصتنا في تمكينك من مقارنة أسعار التذاكر والمواعيد والخدمات بسهولة تامة، مما يجعل حجز التذكرة الأنسب لميزانيتك وتفضيلاتك أمراً بغاية البساطة والسرعة.'
                  : 'Our platform’s unique strength lies in allowing you to compare ticket prices, schedules, and amenities, making it easy to book the most suitable ticket for your budget and preferences.'}
              </p>
            </div>

            {/* Card B: Plan Your Trip + Explore Trips Button (Figma 2099:1263) */}
            <div className="p-7 rounded-xl bg-white border border-[#f0e1e6] shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between min-h-[220px] sm:min-h-[240px]">
              <div className="w-9 h-9 rounded-lg bg-[#fdf2f6] border border-[#f7d6e3] flex items-center justify-center">
                <Image src="/icons/about/2258-3491.svg" alt="Trip" width={20} height={20} />
              </div>
              <p className="text-base sm:text-lg font-medium text-[#584047] leading-[28px]">
                {isAr
                  ? 'ابدأ التخطيط لرحلتك القادمة اليوم، ودعنا نأخذك عبر دول الشرق الأوسط وشمال أفريقيا بكل سهولة وراحة.'
                  : 'Start planning your next trip today, and let us take you across the Middle East and North African countries with ease.'}
              </p>
              <div>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#ffe26d] hover:bg-[#ffd94f] text-[#191c1d] font-bold text-sm shadow-xs transition-transform active:scale-95"
                >
                  <span>{isAr ? 'استكشف الرحلات' : 'Explore Trips'}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 4. OUR MISSION SECTION (Figma 2099:1313 - w: 1274, cornerRadius: 18.5px, 9.2px accent stripe) */}
        <section className="relative p-8 sm:p-12 lg:p-14 rounded-[18px] bg-white border border-[#f0e1e6] shadow-[0_2px_8px_rgba(0,0,0,0.02)] overflow-hidden ps-10 sm:ps-14 space-y-8">
          {/* 9.26px Left Accent Stripe (Figma 2099:1316 - #a40259) */}
          <div className="absolute inset-y-0 start-0 w-[9.26px] bg-[#a40259]" />

          <div className="space-y-4">
            <h2
              className="text-2xl sm:text-3xl lg:text-[28px] font-bold text-[#191c1d]"
              style={{ fontFamily: isAr ? "'Cairo', sans-serif" : "'Montserrat', sans-serif" }}
            >
              {isAr ? 'رسالتنا' : 'Our Mission'}
            </h2>
            <p className="text-base sm:text-lg lg:text-[20px] font-medium text-[#584047] leading-[34px] max-w-4xl">
              {isAr
                ? 'تبسيط السفر بالحافلات للجميع. نسعى لتحقيق ذلك من خلال تقديم عملية حجز سهلة وسلسة تضم باقة متنوعة من تذاكر وخيارات الحافلات. بالإضافة إلى ذلك، نساعد المسافرين على اتخاذ قرارات مدروسة من خلال معلومات واضحة وموجزة عن المسارات المتاحة والأسعار ومشغلي الحافلات. بنقرات معدودة وبكل سهولة، يمكنك حجز تذكرتك المطلوبة.'
                : 'To simplify bus\u00a0travel for everyone. We want to achieve this by offering a smooth booking process that involves a range of bus ticket options. Besides, we help travelers make informed decisions through clear and concise information about available routes, prices, and bus operators. With only a few clicks, you can easily book your desired bus ticket.'}
            </p>
          </div>

          {/* 4 Micro-counters Banner (Figma 2099:1327 - 100+ Intercity Corridors, 50+ Verified Fleets, 3 Clicks, 24/7) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-rose-100/60">
            {missionStats.map((s, idx) => (
              <div key={idx} className="flex flex-col space-y-1">
                <span className="text-3xl sm:text-[37px] font-extrabold text-[#a40259] tracking-tight leading-none">
                  {s.value}
                </span>
                <span className="text-xs sm:text-[14px] font-bold text-[#584047] uppercase tracking-wide pt-1">
                  {isAr ? s.labelAr : s.labelEn}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 5. OUR VALUES SECTION (Figma Frame 3603 / 2099:1595 - w: 1144, 3 cards, 3.5px bottom gradient stripe) */}
        <section className="space-y-6">
          <div>
            <h2
              className="text-2xl sm:text-3xl lg:text-[28px] font-bold text-[#191c1d]"
              style={{ fontFamily: isAr ? "'Cairo', sans-serif" : "'Montserrat', sans-serif" }}
            >
              {isAr ? 'قيمنا الجوهرية' : 'Our Values'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v, idx) => (
              <div
                key={idx}
                className="relative p-7 rounded-[11px] bg-white border border-[#f0e1e6] shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-md hover:border-[#b20163]/40 transition-all flex flex-col justify-between min-h-[340px] sm:min-h-[361px] overflow-hidden"
              >
                <div className="space-y-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#fdf2f6] border border-[#f7d6e3] flex items-center justify-center">
                    <Image src={v.icon} alt={v.titleEn} width={18} height={18} />
                  </div>
                  <h3 className="text-lg sm:text-[21px] font-bold text-[#191c1d]">
                    {isAr ? v.titleAr : v.titleEn}
                  </h3>
                  <p className="text-sm sm:text-base font-semibold text-[#584047] leading-[24px]">
                    {isAr ? v.descAr : v.descEn}
                  </p>
                </div>

                {/* Bottom Border + Guarantee Tag */}
                <div className="pt-4 border-t border-rose-100 flex items-center justify-between text-xs sm:text-sm font-bold text-[#7a0041]">
                  <span>{isAr ? v.tagAr : v.tagEn}</span>
                  <Image src={v.checkIcon} alt="Check" width={16} height={16} />
                </div>

                {/* 3.57px Bottom Gradient Accent Stripe (Figma Gradient RECTANGLE: #a40259 -> #fd7fb1) */}
                <div className="absolute inset-x-0 bottom-0 h-[3.57px] bg-gradient-to-r from-[#a40259] to-[#fd7fb1]" />
              </div>
            ))}
          </div>
        </section>

        {/* 6. READY TO START YOUR JOURNEY? CTA BANNER (Figma Section 1037:150 - w: 1152) */}
        <section className="relative p-8 sm:p-14 rounded-3xl overflow-hidden shadow-xl text-center sm:text-start" style={{
          background: 'linear-gradient(90deg, #950250 0%, #c2006d 45%, #fa1590 100%)',
        }}>
          <div className="relative z-10 max-w-2xl space-y-4 text-white">
            <h2
              className="text-3xl sm:text-4xl lg:text-[48px] font-extrabold leading-[1.15]"
              style={{ fontFamily: isAr ? "'Cairo', sans-serif" : "'Montserrat', sans-serif" }}
            >
              {isAr ? 'جاهز لبدء رحلتك القادمة؟' : 'Ready to Start Your Journey?'}
            </h2>
            <p className="text-base sm:text-lg lg:text-[20px] text-white/95 leading-relaxed font-normal">
              {isAr
                ? 'احجز رحلتك القادمة مع باص أرابيا واكتشف لماذا تُعد الخيار الأكثر تفضيلاً للسفر بالحافلات عبر الشرق الأوسط وشمال أفريقيا.'
                : 'Book your next trip with Bus Arabia and experience why Bus Arabia is the most popular choice for Bus travel in the Middle East and North Africa.'}
            </p>
            <div className="pt-2">
              <Link
                href="/"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-bold text-sm text-[#1c1b1b] shadow-md transition-transform active:scale-95"
                style={{
                  background: 'linear-gradient(90deg, #ffe26d 0%, #d9b747 100%)',
                }}
              >
                {isAr ? 'استكشف الرحلات' : 'Explore Trips'}
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* 7. Footer (Figma 2101:2271) */}
      <Footer locale={locale} />
    </div>
  );
}
