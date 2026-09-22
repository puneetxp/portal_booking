'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Locale } from '@/lib/translations';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SubpageHero } from '@/components/SubpageHero';
import { ShieldCheck, FileText, AlertCircle, Scale, CheckCircle2 } from 'lucide-react';

export default function TermsPage() {
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

  const sections = [
    {
      id: 'preamble',
      titleEn: '1. Introduction & Agreement to Terms',
      titleAr: '1. المقدمة والموافقة على الشروط',
      contentEn:
        'Welcome to Bus Arabia ("Platform", "we", "us", or "our"). These Terms of Service govern your access to and use of the Bus Arabia website, mobile platforms, and related digital booking services. By accessing our platform, searching routes, or completing a ticket reservation, you acknowledge that you have read, understood, and agreed to be legally bound by these Terms, in compliance with the laws of the Kingdom of Saudi Arabia and the regulations of the Transport General Authority (TGA).',
      contentAr:
        'مرحباً بكم في باص أرابيا ("المنصة" أو "نحن"). تحكم شروط الخدمة هذه وصولك واستخدامك لموقع باص أرابيا الإلكتروني والتطبيقات التابعة له وخدمات حجز التذاكر الرقمية. بمجرد دخولك للمنصة أو قيامك بالبحث أو إتمام حجز تذكرة، فإنك تقر بأنك قرأت وفهمت ووافقت على الالتزام الكامل بهذه الشروط وفقاً لأنظمة المملكة العربية السعودية ولوائح الهيئة العامة للنقل.',
    },
    {
      id: 'role',
      titleEn: '2. Role of Bus Arabia as an Intermediary',
      titleAr: '2. طبيعة دور باص أرابيا كوسيط تقني معتمد',
      contentEn:
        'Bus Arabia acts solely as an electronic ticketing platform and marketplace connecting passengers with licensed, independent bus transport operators across the Kingdom of Saudi Arabia. Bus Arabia is not a transport carrier itself and does not operate vehicles, employ drivers, or determine road schedules. The transport contract is concluded directly between the passenger and the respective licensed bus operator whose service is selected during checkout.',
      contentAr:
        'تعمل باص أرابيا حصرياً كمنصة إلكترونية وسوق رقمي لحجز تذاكر الحافلات يربط المسافرين بمشغلي نقل الحافلات المستقلين والمرخصين في المملكة العربية السعودية. باص أرابيا ليست ناقلاً فعلياً ولا تمتلك الحافلات ولا توظف السائقين ولا تضع الجداول الميدانية. ينعقد عقد النقل البري مباشرة بين المسافر ومشغل الحافلات المختار.',
    },
    {
      id: 'eligibility',
      titleEn: '3. Passenger Eligibility & Mandatory Travel Documents',
      titleAr: '3. أهلية المسافر والوثائق الرسمية الإلزامية',
      contentEn:
        'To book and travel, passengers must hold valid official identification required by Saudi security authorities and the Transport General Authority: (a) Saudi Citizens: Original National ID Card; (b) Resident Expats: Original Resident Identity (Iqama); (c) GCC Citizens: Original GCC National ID or Passport; (d) International Tourists & Pilgrims: Valid Passport with appropriate entry visa (Tourist, Business, Umrah, or Hajj). Failure to present valid original identification at the boarding gate will result in denied boarding with zero entitlement to compensation.',
      contentAr:
        'لإتمام الحجز والسفر، يتعين على جميع الركاب حمل إثبات هوية رسمي ساري المفعول وفق اشتراطات الجهات الأمنية وهيئة النقل: (أ) المواطنون السعوديون: أصل الهوية الوطنية؛ (ب) المقيمون: أصل هوية مقيم (الإقامة) سارية؛ (ج) مواطنو دول الخليج: أصل البطاقة المدنية أو جواز السفر؛ (د) الزوار والمعتمرون: أصل جواز السفر مع تأشيرة نظامية سارية. عدم إبراز أصل الهوية عند بوابة الصعود يؤدي إلى حرمان الراكب من الصعود دون أي حق في التعويض.',
    },
    {
      id: 'fares',
      titleEn: '4. Fares, Currency, and Value Added Tax (VAT)',
      titleAr: '4. الأسعار والعملة وضريبة القيمة المضافة',
      contentEn:
        'All ticket prices displayed on Bus Arabia are denominated in Saudi Riyals (SAR) and are inclusive of the statutory 15% Value Added Tax (VAT) mandated by the Zakat, Tax and Customs Authority (ZATCA). The price confirmed at the moment of seat locking is guaranteed for a period of 10 minutes to allow completion of checkout. Any applicable service or terminal facility fees are transparently disclosed prior to final payment.',
      contentAr:
        'كافة أسعار التذاكر المعروضة في باص أرابيا محددة بالريال السعودي (SAR) وشاملة لضريبة القيمة المضافة بنسبة 15% المقررة نظاماً من هيئة الزكاة والضريبة والجمارك (ZATCA). السعر المؤكد لحظة حجز المقعد مضمون لمدة 10 دقائق لإتمام عملية الدفع. يتم توضيح أي رسوم خدمات مسبقاً وبكل شفافية قبل اعتماد الدفع.',
    },
    {
      id: 'boarding',
      titleEn: '5. Boarding Timelines & Electronic QR Tickets',
      titleAr: '5. مواعيد الصعود إلى الحافلة والتذكرة الرقمية',
      contentEn:
        'Upon successful payment, an official digital boarding pass with a secure, tamper-proof QR code is issued immediately. Passengers must arrive at the departure terminal station at least 30 minutes prior to the scheduled departure time (or 45 minutes during peak seasons such as Ramadan, Hajj, and Eid holidays). Boarding gates close strictly 10 minutes prior to scheduled departure. Passengers failing to arrive on time will be classified as No-Shows without refund rights.',
      contentAr:
        'فور إتمام الدفع بنجاح، تصدر المنصة بطاقة صعود رقمية مزودة برمز QR آمن ومشفر. يتعين على المسافر الحضور في محطة المغادرة قبل موعد الرحلة بـ 30 دقيقة على الأقل (أو 45 دقيقة خلال مواسم الذروة كرمضان والحج والأعياد). تُغلق بوابات الصعود تماماً قبل 10 دقائق من موعد الانطلاق المجدول، ويعتبر المتأخر متخلفاً عن السفر وتسقط تذكرته دون حق الاسترداد.',
    },
    {
      id: 'luggage',
      titleEn: '6. Baggage Regulations & Prohibited Goods',
      titleAr: '6. لوائح الأمتعة والمواد المحظورة',
      contentEn:
        'Each adult passenger ticket includes one standard under-carriage luggage allowance (maximum 25 kg) and one small hand luggage piece (maximum 7 kg). Carriage of hazardous, flammable, explosive, illegal substances, unpackaged food, or live animals is strictly prohibited under Saudi public safety laws. Operators reserve the right to inspect baggage and refuse non-compliant items.',
      contentAr:
        'تشمل كل تذكرة راكب بالغ حق نقل حقيبة سفر واحدة في صندوق الأمتعة (بحد أقصى 25 كجم) وحقيبة يد صغيرة داخل المقصورة (بحد أقصى 7 كجم). يُحظر حظراً تاماً نقل المواد الخطرة أو القابلة للاشتعال أو المتفجرات أو المواد الممنوعة نظاماً أو الحيوانات الحية. يحق للمشغل تفتيش الأمتعة ورفض أي مواد مخالفة للأنظمة.',
    },
    {
      id: 'liability',
      titleEn: '7. Limitation of Liability & Delays',
      titleAr: '7. حدود المسؤولية والتأخيرات الطارئة',
      contentEn:
        'Bus operators make reasonable efforts to adhere to published travel schedules; however, schedules are subject to road traffic conditions, weather phenomena, and mandatory security inspections along Saudi highway corridors. Bus Arabia shall not be liable for incidental or consequential damages resulting from operational delays, road detours, or mechanical breakdowns, which are solely governed by the operator’s passenger charter and TGA consumer protection bylaws.',
      contentAr:
        'يبذل مشغلو الحافلات أقصى درجات العناية للالتزام بمواعيد الرحلات المعلنة، ومع ذلك قد تطرأ تأخيرات ناتجة عن الازدحام المروري أو الظروف المناخية أو الإجراءات الأمنية النظامية. لا تتحمل باص أرابيا مسؤولية الأضرار التبعية الناتجة عن تأخيرات الطرق، وتخضع حقوق الركاب للائحة حماية حقوق ركاب النقل العام الصادرة عن هيئة النقل.',
    },
    {
      id: 'jurisdiction',
      titleEn: '8. Governing Law & Dispute Resolution',
      titleAr: '8. النظام الواجب التطبيق والاختصاص القضائي',
      contentEn:
        'These Terms of Service and all related transactions are governed by and construed in accordance with the laws and regulations of the Kingdom of Saudi Arabia. In the event of any dispute arising out of or in connection with these Terms, the parties shall endeavor to resolve the matter amicably through our customer arbitration desk, failing which the dispute shall be subject to the exclusive jurisdiction of the competent courts in Riyadh, Kingdom of Saudi Arabia.',
      contentAr:
        'تخضع شروط الخدمة هذه وكافة المعاملات المنبثقة عنها وتُفسر وفقاً لأنظمة ولوائح المملكة العربية السعودية. في حال نشوء أي نزاع، يسعى الطرفان لحله ودياً عبر مركز فض النزاعات بالمنصة، وفي حال تعذر ذلك، يكون الاختصاص القضائي الحصري للمحاكم المختصة بمدينة الرياض بالمملكة العربية السعودية.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#fcf9f8] selection:bg-[#b20163] selection:text-white">
      <Navbar locale={locale} onToggleLocale={toggleLocale} />

      <main className="flex-1">
        <SubpageHero
          badge={isAr ? 'الوثائق القانونية' : 'Legal & Regulatory'}
          title={isAr ? 'شروط وأحكام الخدمة' : 'Terms of Service'}
          subtitle={
            isAr
              ? 'يرجى قراءة شروط الخدمة بعناية قبل إتمام أي حجز عبر منصة باص أرابيا، حيث تحدد هذه الشروط الحقوق والواجبات المتبادلة وفق أنظمة النقل في المملكة.'
              : 'Please review these Terms of Service carefully prior to booking tickets on Bus Arabia. They establish the legal framework between passengers, the platform, and licensed operators.'
          }
          breadcrumbs={[{ label: isAr ? 'شروط الخدمة' : 'Terms of Service' }]}
          locale={locale}
        />

        {/* Content Container with Table of Contents */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Main Legal Content (8 cols) */}
            <div className="lg:col-span-8 space-y-8">
              {/* Compliance Notice Banner */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-rose-100 flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-rose-50 text-[#b20163] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">
                    {isAr ? 'الامتثال للوائح هيئة النقل السعودية' : 'Transport General Authority (TGA) Compliance'}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {isAr
                      ? 'تمت صياغة هذه الشروط وفقاً للائحة التنفيذية لنقل الركاب بالحافلات ولائحة حقوق ركاب النقل العام الصادرة عن الهيئة العامة للنقل في المملكة العربية السعودية.'
                      : 'These terms are authored strictly in adherence to the Saudi Public Transport Passenger Rights Regulations and Electronic Commerce regulations.'}
                  </p>
                  <span className="text-[11px] text-slate-400 font-medium mt-2 block">
                    {isAr ? 'آخر تحديث: أغسطس 2026' : 'Last Updated: August 2026 • Version 2.4'}
                  </span>
                </div>
              </div>

              {/* Sections */}
              <div className="space-y-8">
                {sections.map((sec) => (
                  <article
                    key={sec.id}
                    id={sec.id}
                    className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 scroll-mt-28"
                  >
                    <h2 className="text-base sm:text-lg font-black text-slate-900 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#b20163]" />
                      <span>{isAr ? sec.titleAr : sec.titleEn}</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {isAr ? sec.contentAr : sec.contentEn}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            {/* Sticky Table of Contents (4 cols) */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {isAr ? 'فهرس الشروط والأحكام' : 'Table of Contents'}
                </h3>
                <nav className="space-y-2 text-xs">
                  {sections.map((sec) => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      className="block p-2 rounded-xl text-slate-600 hover:text-[#b20163] hover:bg-rose-50/50 transition-colors font-medium"
                    >
                      {isAr ? sec.titleAr : sec.titleEn}
                    </a>
                  ))}
                </nav>

                <div className="border-t border-slate-100 pt-4 space-y-2">
                  <span className="text-[11px] text-slate-500 font-medium block">
                    {isAr ? 'روابط قانونية ذات صلة:' : 'Related Legal Documents:'}
                  </span>
                  <Link
                    href="/privacy"
                    className="block text-xs font-bold text-[#b20163] hover:underline"
                  >
                    {isAr ? 'سياسة الخصوصية ←' : 'Privacy Policy →'}
                  </Link>
                  <Link
                    href="/cancellation-policy"
                    className="block text-xs font-bold text-[#b20163] hover:underline"
                  >
                    {isAr ? 'سياسة الإلغاء والاسترداد ←' : 'Cancellation & Refund Policy →'}
                  </Link>
                  <Link
                    href="/cookie-policy"
                    className="block text-xs font-bold text-[#b20163] hover:underline"
                  >
                    {isAr ? 'سياسة ملفات تعريف الارتباط ←' : 'Cookie Policy →'}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
