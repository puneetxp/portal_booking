'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Locale } from '@/lib/translations';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SubpageHero } from '@/components/SubpageHero';
import { ShieldCheck, Lock, Eye, Database, UserCheck, Mail } from 'lucide-react';

export default function PrivacyPage() {
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
      id: 'commitment',
      titleEn: '1. Commitment to Privacy & Saudi PDPL Compliance',
      titleAr: '1. الالتزام بالخصوصية ونظام حماية البيانات الشخصية السعودي',
      contentEn:
        'Bus Arabia ("we", "our", or "the Platform") is committed to safeguarding the privacy, confidentiality, and integrity of your personal information. This Privacy Policy explains our data collection, processing, and protection practices in strict compliance with the Personal Data Protection Law (PDPL) of the Kingdom of Saudi Arabia, promulgated under Royal Decree No. (M/19), and its executive regulations enforced by the Saudi Data & AI Authority (SDAIA).',
      contentAr:
        'تلتزم باص أرابيا ("نحن" أو "المنصة") بحماية خصوصية وسرية وسلامة بياناتكم الشخصية بأعلى المعايير. توضح هذه السياسة ممارساتنا في جمع البيانات ومعالجتها وحمايتها في إطار الالتزام التام بنظام حماية البيانات الشخصية (PDPL) في المملكة العربية السعودية، الصادر بالمرسوم الملكي رقم (م/19)، ولوائحه التنفيذية الصادرة عن الهيئة السعودية للبيانات والذكاء الاصطناعي (سدايا).',
    },
    {
      id: 'collection',
      titleEn: '2. Categories of Personal Data We Collect',
      titleAr: '2. فئات البيانات الشخصية التي نقوم بجمعها',
      contentEn:
        'We collect only the minimal data strictly necessary to facilitate your travel booking: (a) Identification Data: Full Name, National ID / Iqama / Passport Number, date of birth, gender, and nationality (as mandated for official passenger manifests); (b) Contact Details: Mobile phone number and email address; (c) Travel Information: Origin terminal, destination, departure date/time, seat selection, and baggage allowance; (d) Transaction Data: Payment reference tokens, payment method (Mada, Apple Pay, Credit Card), and billing timestamp. We never store raw credit card numbers or CVV codes on our servers.',
      contentAr:
        'نقوم بجمع الحد الأدنى من البيانات الضرورية حصرياً لإتمام حجز رحلتكم: (أ) بيانات الهوية: الاسم الكامل، رقم الهوية الوطنية / الإقامة / جواز السفر، تاريخ الميلاد، الجنس، والجنسية (وفق المتطلبات النظامية لقوائم ركاب الحافلات)؛ (ب) بيانات الاتصال: رقم الجوال والبريد الإلكتروني؛ (ج) بيانات الرحلة: محطة الانطلاق والوصول، تاريخ ووقت الرحلة، رقم المقعد المختار؛ (د) بيانات المعاملات المالية: الرموز المرجعية للدفع، طريقة السداد (مدى، آبل باي، فيزا)، وتوقيت العملية. لا نقوم إطلاقاً بتخزين أرقام البطاقات البنكية أو رموز الأمان (CVV) في خوادمنا.',
    },
    {
      id: 'purpose',
      titleEn: '3. Legal Grounds & Purposes of Processing',
      titleAr: '3. المسوغات النظامية وأغراض معالجة البيانات',
      contentEn:
        'We process personal data based on explicit consent and the necessity to execute the travel booking contract. Specific purposes include: (1) Issuing official digital boarding passes and tickets; (2) Compiling statutory passenger manifests mandated by the Transport General Authority (TGA) and public security checkpoints along intercity highways; (3) Sending real-time SMS, WhatsApp, and email trip departure updates and gate alerts; (4) Executing secure payment captures and processing instant wallet refunds.',
      contentAr:
        'نعالج بياناتكم الشخصية استناداً إلى الموافقة الصريحة وضرورة تنفيذ عقد حجز التذاكر. وتشمل الأغراض المحددة: (1) إصدار بطاقات الصعود والتذاكر الرقمية المعتمدة؛ (2) إعداد قوائم المسافرين الرسمية (المانيفست) الإلزامية نظاماً لهيئة النقل ونقاط التفتيش الأمنية على الطرق السريعة؛ (3) إرسال تنبيهات الرحلات وتحديثات البوابات عبر الرسائل النصية والواتساب والبريد؛ (4) إتمام عمليات السداد الآمنة وتنفيذ الاسترداد المالي الفوري للمحفظة.',
    },
    {
      id: 'sharing',
      titleEn: '4. Data Disclosure to Partner Bus Operators',
      titleAr: '4. مشاركة البيانات مع مشغلي الحافلات الشركاء',
      contentEn:
        'When you book a trip, Bus Arabia shares only the necessary passenger details (Name, ID number, Seat number, and Emergency mobile contact) with the certified bus operator operating your scheduled coach. Our partner operators are bound by stringent non-disclosure and data protection agreements, prohibiting any unauthorized secondary use or marketing dissemination of your data.',
      contentAr:
        'عند قيامك بحجز رحلة، تشارك باص أرابيا فقط البيانات اللازمة (الاسم، رقم الهوية، رقم المقعد، ورقم جوال التواصل) مع مشغل الحافلات المعتمد المسؤول عن تنفيذ رحلتك. ويلتزم جميع المشغلين الشركاء باتفاقيات حماية بيانات وسرية صارمة تحظر استخدام بياناتكم لأي أغراض دعائية أو مشاركتها مع أطراف أخرى.',
    },
    {
      id: 'security',
      titleEn: '5. Data Security & National Cloud Localization',
      titleAr: '5. أمن البيانات والاستضافة السحابية داخل المملكة',
      contentEn:
        'In strict adherence to Saudi National Cybersecurity Authority (NCA) controls and cloud hosting regulations, all Bus Arabia passenger data is encrypted both in transit (TLS 1.3) and at rest (AES-256). All primary databases and backup environments are physically hosted in certified data center facilities located within the Kingdom of Saudi Arabia, ensuring sovereign data localization.',
      contentAr:
        'التزاماً بضوابط الهيئة الوطنية للأمن السيبراني (NCA) وأنظمة الاستضافة السحابية، تُشفر كافة بيانات مسافري باص أرابيا أثناء النقل (TLS 1.3) وأثناء التخزين (AES-256). وتتم استضافة جميع قواعد البيانات والنسخ الاحتياطية حصرياً داخل مراكز بيانات معتمدة داخل أراضي المملكة العربية السعودية لضمان السيادة الرقمية للبيانات.',
    },
    {
      id: 'rights',
      titleEn: '6. Your Legal Rights Under Saudi PDPL',
      titleAr: '6. حقوقك النظامية بموجب نظام حماية البيانات الشخصية',
      contentEn:
        'Under the Saudi Personal Data Protection Law, you enjoy the following rights: (a) Right to Knowledge: To be informed of the purpose and legal basis for processing; (b) Right of Access: To review and obtain a copy of your stored personal data; (c) Right to Rectification: To update or correct inaccurate profile information; (d) Right to Erasure: To request deletion of your personal data, subject to statutory tax and transportation record-keeping requirements.',
      contentAr:
        'بموجب نظام حماية البيانات الشخصية، تتمتع بالحقوق النظامية التالية: (أ) حق العلم: معرفة المسوغ النظامي والغرض من معالجة بياناتك؛ (ب) حق الوصول: الاطلاع على بياناتك الشخصية المخزنة وطلب نسخة منها؛ (ج) حق التصحيح: تحديث وتعديل أي بيانات غير دقيقة؛ (د) حق الإتلاف: طلب مسح بياناتك الشخصية عند انتهاء الغرض منها، بما لا يتعارض مع متطلبات الأنظمة الضريبية ونظام النقل.',
    },
    {
      id: 'dpo',
      titleEn: '7. Data Protection Officer & Privacy Inquiries',
      titleAr: '7. مسؤول حماية البيانات والتواصل للخصوصية',
      contentEn:
        'To exercise any of your data rights or file a privacy inquiry, please contact our dedicated Data Protection Officer at: privacy@busarabia.com or call our toll-free support at 9200 12345. Requests are verified and responded to within a maximum of 14 business days.',
      contentAr:
        'لممارسة أي من حقوقك أو لتقديم استفسار يتعلق بالخصوصية، يسعدنا تواصلك مع مسؤول حماية البيانات عبر البريد: privacy@busarabia.com أو الاتصال بالرقم المجاني 9200 12345. يتم فحص الطلبات والرد عليها رسمياً خلال 14 يوم عمل كحد أقصى.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#fcf9f8] selection:bg-[#b20163] selection:text-white">
      <Navbar locale={locale} onToggleLocale={toggleLocale} />

      <main className="flex-1">
        <SubpageHero
          badge={isAr ? 'نظام حماية البيانات السعودي' : 'Saudi PDPL Compliant'}
          title={isAr ? 'سياسة الخصوصية وحماية البيانات' : 'Privacy & Data Protection Policy'}
          subtitle={
            isAr
              ? 'نحن ملتزمون بحماية بياناتكم الشخصية واستضافتها بأمان داخل المملكة العربية السعودية وفق أعلى معايير الأمن السيبراني ونظام حماية البيانات الشخصية (PDPL).'
              : 'Bus Arabia is dedicated to safeguarding your personal information. Our data handling strictly adheres to the Kingdom of Saudi Arabia Personal Data Protection Law (PDPL).'
          }
          breadcrumbs={[{ label: isAr ? 'سياسة الخصوصية' : 'Privacy Policy' }]}
          locale={locale}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Main Content (8 cols) */}
            <div className="lg:col-span-8 space-y-8">
              {/* Highlight Box */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-100 flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#137a08] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">
                    {isAr ? 'بياناتك مستضافة ومحمية محلياً 100%' : '100% In-Kingdom Sovereign Data Hosting'}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {isAr
                      ? 'لا يتم نقل بيانات ركاب باص أرابيا خارج المملكة العربية السعودية إطلاقاً. كافة الخوادم وقواعد البيانات مدارة ومشفرة داخل أراضي المملكة بتوافق تام مع أنظمة سدايا وهيئة الأمن السيبراني.'
                      : 'No passenger personal data is transferred or hosted outside the Kingdom of Saudi Arabia. All servers operate within certified sovereign cloud infrastructure.'}
                  </p>
                  <span className="text-[11px] text-slate-400 font-medium mt-2 block">
                    {isAr ? 'تاريخ النفاذ: أغسطس 2026' : 'Effective Date: August 2026 • SDAIA Compliant'}
                  </span>
                </div>
              </div>

              {/* Policy Clauses */}
              <div className="space-y-8">
                {sections.map((sec) => (
                  <article
                    key={sec.id}
                    id={sec.id}
                    className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 scroll-mt-28"
                  >
                    <h2 className="text-base sm:text-lg font-black text-slate-900 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#137a08]" />
                      <span>{isAr ? sec.titleAr : sec.titleEn}</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {isAr ? sec.contentAr : sec.contentEn}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            {/* Sidebar Table of Contents (4 cols) */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {isAr ? 'فهرس سياسة الخصوصية' : 'Privacy Index'}
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
                    {isAr ? 'مساعدة الخصوصية المباشرة:' : 'Privacy Contacts:'}
                  </span>
                  <div className="p-3 bg-[#fcf9f8] rounded-xl text-xs space-y-1">
                    <span className="font-bold text-slate-800 block">
                      {isAr ? 'مسؤول حماية البيانات (DPO)' : 'Data Protection Officer'}
                    </span>
                    <a
                      href="mailto:privacy@busarabia.com"
                      className="text-[#b20163] hover:underline font-semibold block"
                    >
                      privacy@busarabia.com
                    </a>
                  </div>
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
