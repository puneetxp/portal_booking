'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Locale } from '@/lib/translations';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SubpageHero } from '@/components/SubpageHero';
import { Cookie, ShieldCheck, Settings, CheckCircle2, Lock } from 'lucide-react';

export default function CookiePolicyPage() {
  const [locale, setLocale] = useState<Locale>('en');

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

  const cookieTypes = [
    {
      titleEn: 'Strictly Necessary Cookies',
      titleAr: 'ملفات تعريف الارتباط الضرورية جداً',
      descEn:
        'Essential for the core operation of the ticketing platform. They maintain your 10-minute temporary seat reservation lock, preserve your shopping cart, and ensure secure CSRF token protection during payment processing.',
      descAr:
        'ضرورية ولا غنى عنها لتشغيل منصة التذاكر. تحافظ على قفل حجز مقعدك لمدة 10 دقائق وتأمين سلة الحجز وحماية معاملات الدفع إلكترونياً.',
      required: true,
      examples: ['bus_arabia_session', 'seat_lock_token', 'csrf_protect'],
    },
    {
      titleEn: 'Functional & Preference Cookies',
      titleAr: 'ملفات الوظائف وتفضيلات المستخدم',
      descEn:
        'Enable personalized platform features, such as remembering your chosen language (English or Arabic RTL), recent origin/destination city searches, and passenger count selections.',
      descAr:
        'تتيح حفظ تفضيلاتك مثل اللغة المختارة (العربية أو الإنجليزية) وآخر المدن التي بحثت عنها وعدد الركاب لتسهيل رحلاتك القادمة.',
      required: false,
      examples: ['bus_arabia_locale', 'recent_search_origins'],
    },
    {
      titleEn: 'Analytics & Performance Cookies',
      titleAr: 'ملفات التحليل وقياس الأداء',
      descEn:
        'Collect aggregated, anonymized telemetry regarding page load speeds, popular route searches, and UI interactions to help us continually refine and enhance platform speed.',
      descAr:
        'تجمع بيانات إحصائية مجهولة المصدر لقياس سرعة تحميل الصفحات والمسارات الأكثر طلباً لتحسين تجربة المستخدم بانتظام.',
      required: false,
      examples: ['_ga', '_gid', 'bus_perf_metrics'],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#fcf9f8] selection:bg-[#b20163] selection:text-white">
      <Navbar locale={locale} onToggleLocale={toggleLocale} />

      <main className="flex-1">
        <SubpageHero
          badge={isAr ? 'الشفافية الرقمية' : 'Digital Transparency'}
          title={isAr ? 'سياسة ملفات تعريف الارتباط (الكوكيز)' : 'Cookie & Local Storage Policy'}
          subtitle={
            isAr
              ? 'توضح هذه السياسة كيفية استخدامنا لملفات تعريف الارتباط والتخزين المؤقت لتوفير تجربة حجز حافلات سريعة وآمنة وحفظ تفضيلاتك.'
              : 'This policy details how Bus Arabia utilizes cookies and web storage technologies to deliver secure seat reservations and tailored booking experiences.'
          }
          breadcrumbs={[{ label: isAr ? 'ملفات تعريف الارتباط' : 'Cookie Policy' }]}
          locale={locale}
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="space-y-8">
            {/* Intro Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 flex items-start gap-5">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center flex-shrink-0">
                <Cookie className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h2 className="text-lg font-black text-slate-900">
                  {isAr ? 'ما هي ملفات تعريف الارتباط؟' : 'What Are Cookies and Local Storage?'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {isAr
                    ? 'ملفات تعريف الارتباط هي ملفات نصية صغيرة تخزن على متصفحك عند زيارة باص أرابيا. تتيح لنا هذه الملفات التعرف على جهازك وتمكين ميزات حيوية مثل قفل المقعد المؤقت أثناء إتمام الدفع وتذكر اللغة المفضلة.'
                    : 'Cookies are small alphanumeric files placed on your browser when visiting Bus Arabia. They enable vital functionality like holding your reserved bus seat in real time for 10 minutes while you complete checkout, and remembering your language preferences.'}
                </p>
              </div>
            </div>

            {/* Cookie Categories */}
            <div className="space-y-6">
              <h2 className="text-xl font-black text-slate-900">
                {isAr ? 'أنواع ملفات تعريف الارتباط المستخدمة' : 'Categories of Cookies We Use'}
              </h2>

              <div className="grid grid-cols-1 gap-6">
                {cookieTypes.map((type, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#b20163]" />
                        <span>{isAr ? type.titleAr : type.titleEn}</span>
                      </h3>
                      <span
                        className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${
                          type.required
                            ? 'bg-rose-100 text-[#b20163]'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {type.required
                          ? isAr
                            ? 'ضرورية ولازمة'
                            : 'Mandatory'
                          : isAr
                          ? 'اختيارية'
                          : 'Optional'}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {isAr ? type.descAr : type.descEn}
                    </p>

                    <div className="pt-2 flex items-center gap-2 flex-wrap text-[11px] text-slate-500 font-mono">
                      <span className="font-sans font-semibold text-slate-400">
                        {isAr ? 'أمثلة:' : 'Technical Identifiers:'}
                      </span>
                      {type.examples.map((ex, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* How to Manage Cookies */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <Settings className="w-5 h-5 text-[#b20163]" />
                <span>{isAr ? 'كيفية التحكم وإيقاف ملفات تعريف الارتباط' : 'How to Manage Your Browser Cookies'}</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {isAr
                  ? 'يمكنك تعديل إعدادات متصفحك لرفض أو مسح ملفات تعريف الارتباط في أي وقت (عبر متصفح كروم أو سفاري أو إيدج). يرجى ملاحظة أن تعطيل الملفات الضرورية قد يمنع قفل المقاعد أو إتمام عمليات الدفع الإلكترونية.'
                  : 'You can configure your browser (Google Chrome, Safari, Microsoft Edge, Firefox) to alert you or reject cookies. Note that disabling strictly necessary cookies will prevent seat reservation locks and seamless checkout.'}
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
