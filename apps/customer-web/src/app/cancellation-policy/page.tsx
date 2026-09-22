'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Locale } from '@/lib/translations';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SubpageHero } from '@/components/SubpageHero';
import {
  RotateCcw,
  Wallet,
  Clock,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';

export default function CancellationPolicyPage() {
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

  const guaranteePillars = [
    {
      icon: Wallet,
      titleEn: 'Instant Wallet Refunds',
      titleAr: 'استرداد فوري إلى المحفظة',
      descEn:
        'Choose refund to your Bus Arabia Wallet for 0-second instant credit with zero processing deductions, ready for any future bus trip.',
      descAr:
        'اختر الاسترداد إلى محفظة باص أرابيا لتحصل على رصيدك فوراً في نفس اللحظة وبدون أي خصم، ليكون جاهزاً لحجز أي رحلة قادمة.',
      badgeEn: 'Instant • 0s',
      badgeAr: 'فوري • 0 ثانية',
    },
    {
      icon: RotateCcw,
      titleEn: 'Flexible Trip Modifications',
      titleAr: 'مرونة تعديل موعد الرحلة',
      descEn:
        'Change departure date or time up to 6 hours before departure with zero administrative penalty (only fare difference applies if any).',
      descAr:
        'يمكنك تغيير تاريخ أو وقت الرحلة حتى 6 ساعات قبل موعد الانطلاق بدون رسوم تعديل إدارية (يُدفع فارق السعر فقط إن وجد).',
      badgeEn: 'Free Changes',
      badgeAr: 'تعديل مجاني',
    },
    {
      icon: ShieldAlert,
      titleEn: 'Disruption & Delay Protection',
      titleAr: 'ضمان إلغاء وتأخير المشغل',
      descEn:
        'If an operator cancels a trip or delays departure by more than 90 minutes, receive a 100% full refund plus a 10% complimentary travel voucher.',
      descAr:
        'في حال إلغاء الرحلة من قبل المشغل أو تأخرها لأكثر من 90 دقيقة، تسترد 100% من المبلغ كاملاً تلقائياً مع قسيمة خصم إضافية 10%.',
      badgeEn: '100% Guaranteed',
      badgeAr: 'مضمون 100%',
    },
  ];

  const refundMatrix = [
    {
      timeEn: 'More than 24 hours before departure',
      timeAr: 'قبل أكثر من 24 ساعة من موعد الرحلة',
      wallet: '100%',
      card: '90%',
      noteEn: 'Instant 100% Wallet credit or 90% refund to original payment card (10% gateway fee).',
      noteAr: 'استرداد 100% فوري للمحفظة أو 90% للبطاقة البنكية الأصلية (خصم 10% رسوم بوابة).',
      status: 'high',
    },
    {
      timeEn: '12 to 24 hours before departure',
      timeAr: 'بين 12 إلى 24 ساعة قبل الرحلة',
      wallet: '75%',
      card: '65%',
      noteEn: '75% refund to Wallet or 65% to original card.',
      noteAr: 'استرداد 75% لرصيد المحفظة أو 65% للبطاقة الأصلية.',
      status: 'medium',
    },
    {
      timeEn: '2 to 12 hours before departure',
      timeAr: 'بين 2 إلى 12 ساعة قبل موعد الرحلة',
      wallet: '50%',
      card: 'Non-refundable',
      noteEn: '50% Wallet credit only. Not refundable to payment cards due to last-minute seat vacancy.',
      noteAr: '50% كرصيد محفظة فقط. غير قابل للاسترداد للبطاقة بسبب ضيق الوقت لإعادة حجز المقعد.',
      status: 'warning',
    },
    {
      timeEn: 'Less than 2 hours or post-departure (No-Show)',
      timeAr: 'أقل من ساعتين أو بعد انطلاق الحافلة (عدم حضور)',
      wallet: '0%',
      card: '0%',
      noteEn: 'Non-refundable under Saudi Transport General Authority (TGA) passenger bylaws.',
      noteAr: 'تذكرة غير قابلة للإلغاء أو الاسترداد وفق لوائح الهيئة العامة للنقل بالمملكة.',
      status: 'none',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#fcf9f8] selection:bg-[#b20163] selection:text-white">
      <Navbar locale={locale} onToggleLocale={toggleLocale} />

      <main className="flex-1">
        <SubpageHero
          badge={isAr ? 'سياسة واضحة وشفافة' : 'Fair & Transparent Policy'}
          title={
            isAr
              ? 'سياسة الإلغاء والتعديل والاسترداد المالي'
              : 'Cancellation, Modification & Refund Policy'
          }
          subtitle={
            isAr
              ? 'نضمن لك وضوحاً تاماً في شروط الإلغاء واسترداد الأموال مع ميزة الاسترداد الفوري التلقائي إلى محفظتك الإلكترونية بدون أي تأخير.'
              : 'Travel plans change. Enjoy transparent refund rules, free schedule adjustments, and instant automated refunds directly to your Bus Arabia Wallet.'
          }
          breadcrumbs={[{ label: isAr ? 'سياسة الإلغاء والاسترداد' : 'Cancellation & Refund' }]}
          locale={locale}
        />

        {/* 1. Guarantees 3-Column Band */}
        <section className="relative -mt-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {guaranteePillars.map((g, idx) => {
              const Icon = g.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-6 shadow-md border border-rose-100/70 hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-rose-100 text-[#b20163] flex items-center justify-center">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-50 text-[#137a08] border border-emerald-200">
                        {isAr ? g.badgeAr : g.badgeEn}
                      </span>
                    </div>
                    <h3 className="text-base font-extrabold text-slate-900 mb-2">
                      {isAr ? g.titleAr : g.titleEn}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {isAr ? g.descAr : g.descEn}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 2. Refund Schedule Matrix Table */}
        <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-100">
            <div className="mb-8">
              <span className="text-xs font-extrabold text-[#b20163] uppercase tracking-wider">
                {isAr ? 'جدول المبالغ المستردة' : 'Refund Schedule Breakdown'}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                {isAr ? 'مصفوفة الإلغاء ونسب الاسترداد' : 'Cancellation Timeline & Refund Matrix'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {isAr
                  ? 'يتم احتساب نسبة الاسترداد بناءً على المدة الزمنية المتبقية حتى موعد انطلاق الحافلة المجدول:'
                  : 'Refund percentages are calculated precisely based on the hours remaining prior to scheduled departure:'}
              </p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto border border-slate-200 rounded-2xl">
              <table className="w-full text-start text-xs sm:text-sm">
                <thead className="bg-[#fcf9f8] text-slate-700 font-extrabold border-b border-slate-200">
                  <tr>
                    <th className="p-4 text-start">{isAr ? 'توقيت الإلغاء' : 'Cancellation Window'}</th>
                    <th className="p-4 text-center">{isAr ? 'محفظة باص أرابيا' : 'Bus Arabia Wallet'}</th>
                    <th className="p-4 text-center">{isAr ? 'البطاقة البنكية' : 'Payment Card (Mada/Visa)'}</th>
                    <th className="p-4 text-start">{isAr ? 'الشروط والملاحظات' : 'Details'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {refundMatrix.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-4 font-bold text-slate-900 whitespace-nowrap">
                        {isAr ? row.timeAr : row.timeEn}
                      </td>
                      <td className="p-4 text-center font-extrabold text-[#b20163] text-sm sm:text-base">
                        {row.wallet}
                      </td>
                      <td className="p-4 text-center font-bold text-slate-700">
                        {row.card}
                      </td>
                      <td className="p-4 text-xs text-slate-500 leading-relaxed">
                        {isAr ? row.noteAr : row.noteEn}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Processing Timeline Notice */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
                <h4 className="text-xs font-bold text-emerald-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#137a08]" />
                  <span>{isAr ? 'مدة استرداد المحفظة' : 'Bus Arabia Wallet Speed'}</span>
                </h4>
                <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                  {isAr
                    ? 'فوري وتلقائي (0 ثانية). يظهر الرصيد في حسابك مباشرة ويمكنك استخدامه في حجز أي رحلة أخرى.'
                    : 'Instantaneous (0 seconds). The balance reflects immediately and can be utilized right away.'}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80">
                <h4 className="text-xs font-bold text-amber-900 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>{isAr ? 'مدة استرداد البطاقات البنكية' : 'Bank Card Refund Speed'}</span>
                </h4>
                <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                  {isAr
                    ? 'مدى (Mada): من 24 إلى 48 ساعة عمل. بطاقات فيزا/ماستركارد/آبل باي: من 3 إلى 7 أيام عمل حسب البنك المصدر.'
                    : 'Mada Debit: 24 to 48 business hours. Credit Cards & Apple Pay: 3 to 7 business days per Saudi bank clearing cycles.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. How to Cancel in 3 Steps */}
        <section className="py-12 bg-white border-y border-rose-100/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-12">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                {isAr ? 'كيفية إلغاء أو تعديل الحجز بـ 3 خطوات بسيطة' : 'How to Cancel or Modify Your Ticket'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  titleEn: 'Enter Booking Reference',
                  titleAr: 'أدخل رقم الحجز',
                  descEn:
                    'Access "My Bookings" and enter your Booking ID (e.g. BA-8921) and the registered mobile number.',
                  descAr: 'ادخل إلى صفحة "حجوزاتي" وأدخل رقم الحجز (مثال: BA-8921) ورقم جوالك المسجل.',
                },
                {
                  step: '02',
                  titleEn: 'Select Cancel or Modify',
                  titleAr: 'اختر الإلغاء أو التعديل',
                  descEn:
                    'Review the calculated refund amount and choose whether to cancel or switch to another departure date.',
                  descAr: 'راجع المبلغ المسترد بدقة واختر إما إلغاء الرحلة أو تغيير تاريخ ووقت السفر.',
                },
                {
                  step: '03',
                  titleEn: 'Confirm & Receive Refund',
                  titleAr: 'تأكيد واستلام المبلغ',
                  descEn:
                    'Choose Instant Wallet Credit or Original Card. Your QR ticket is voided and confirmation is sent instantly.',
                  descAr: 'اختر رصيد المحفظة الفوري أو بطاقتك. يُلغى رمز QR وتصلك رسالة تأكيد فورية بالعملية.',
                },
              ].map((s, idx) => (
                <div key={idx} className="relative p-6 rounded-3xl bg-[#fcf9f8] border border-slate-100">
                  <span className="text-3xl font-black text-[#b20163]/20 block mb-2">{s.step}</span>
                  <h3 className="text-sm font-bold text-slate-900 mb-1">
                    {isAr ? s.titleAr : s.titleEn}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {isAr ? s.descAr : s.descEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Help Desk Callout */}
        <section className="py-14 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#550036] via-[#75003d] to-[#b20163] rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 text-center md:text-start">
              <h3 className="text-lg sm:text-xl font-extrabold text-white">
                {isAr ? 'هل تحتاج إلى مساعدة في إلغاء حجزك؟' : 'Need Assistance With a Refund?'}
              </h3>
              <p className="text-xs sm:text-sm text-white/80 max-w-lg">
                {isAr
                  ? 'فريق خدمة العملاء جاهز لمعالجة طلبك عبر الهاتف الموحد 9200 12345 أو الواتساب على مدار الساعة.'
                  : 'Our 24/7 customer support agents can process your cancellation directly via toll-free 9200 12345 or WhatsApp.'}
              </p>
            </div>
            <Link
              href="/contact"
              className="px-6 py-2.5 rounded-full bg-[#ffe26d] hover:bg-[#ffd94f] text-slate-900 font-extrabold text-xs shadow-md transition-all whitespace-nowrap"
            >
              {isAr ? 'تواصل مع الدعم' : 'Contact Support Desk'}
            </Link>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
