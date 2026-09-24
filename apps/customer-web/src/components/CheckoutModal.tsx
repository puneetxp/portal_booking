'use client';

import React, { useState } from 'react';
import { Locale } from '@/lib/translations';
import {
  X,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Download,
  Share2,
  Calendar,
  Clock,
  MapPin,
  Bus,
  QrCode,
  Smartphone,
  RefreshCw,
} from 'lucide-react';

interface SelectedSeat {
  id: string;
  fare: number;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
  seats: SelectedSeat[];
  route: string;
  date: string;
  operator: string;
}

export function CheckoutModal({
  isOpen,
  onClose,
  locale,
  seats,
  route,
  date,
  operator,
}: CheckoutModalProps) {
  const [step, setStep] = useState<'details' | 'success'>('details');
  const [passengerName, setPassengerName] = useState('Abdullah Al-Mansoor');
  const [idNumber, setIdNumber] = useState('1084920491');
  const [phone, setPhone] = useState('501234567');
  const [paymentMethod, setPaymentMethod] = useState<'mada' | 'apple' | 'stc' | 'card'>('mada');
  const [isLoading, setIsLoading] = useState(false);
  const [bookingRef, setBookingRef] = useState('BA-849210');

  const isAr = locale === 'ar';

  if (!isOpen) return null;

  const baseFare = seats.reduce((acc, s) => acc + s.fare, 0);
  const vat = baseFare * 0.15;
  const total = baseFare + vat;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passengerName || !idNumber) {
      alert(isAr ? 'يرجى إدخال اسم المسافر ورقم الهوية' : 'Please enter passenger name and ID.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const ref = 'BA-' + Math.floor(100000 + Math.random() * 900000);
      setBookingRef(ref);
      setStep('success');
    }, 1200);
  };

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[540px] my-8 bg-white rounded-3xl shadow-2xl border border-rose-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        dir={isAr ? 'rtl' : 'ltr'}
      >
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-[#b20163] via-[#a00057] to-[#8c0047] p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 ltr:right-5 rtl:left-5 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-7 h-7 rounded-xl bg-white/15 flex items-center justify-center text-xs font-bold text-[#ffe26d]">
              SAR
            </span>
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#ffe26d]">
              {isAr ? 'بوابة الدفع الآمن' : 'Instant Secure Checkout'}
            </span>
          </div>
          <h3 className="text-2xl font-black text-white">
            {step === 'details'
              ? isAr
                ? 'إتمام حجز تذكرة الحافلة'
                : 'Complete Your Bus Reservation'
              : isAr
              ? 'تم تأكيد الحجز وإصدار التذكرة!'
              : 'Booking Confirmed & Issued!'}
          </h3>
          <p className="text-xs text-white/80 mt-1">
            {step === 'details'
              ? `${route} · ${operator}`
              : isAr
              ? 'تذكرتك الرقمية جاهزة ومسجلة في نظام النقل العام'
              : 'Digital boarding pass verified and registered with TGA'}
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'details' ? (
            <form onSubmit={handlePay} className="space-y-5">
              {/* Trip & Seat Summary Card */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2.5">
                <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-200">
                  <span className="text-slate-500 font-semibold">{isAr ? 'الرحلة المختارة:' : 'Selected Route:'}</span>
                  <span className="font-extrabold text-slate-800">{route}</span>
                </div>
                <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-200">
                  <span className="text-slate-500 font-semibold">{isAr ? 'المقاعد المحجوزة:' : 'Locked Seats:'}</span>
                  <span className="font-extrabold text-[#b20163]">
                    {seats.map((s) => `Seat ${s.id}`).join(', ')} ({seats.length}{' '}
                    {isAr ? 'مقاعد' : 'seat(s)'})
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-semibold">
                    {isAr ? 'المبلغ الإجمالي (شامل 15% ضريبة):' : 'Total (incl. 15% VAT):'}
                  </span>
                  <span className="font-black text-emerald-700 text-sm">{total.toFixed(2)} SAR</span>
                </div>
              </div>

              {/* Passenger ID Info */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-500">
                  {isAr ? 'بيانات المسافر الرسمية (وفق متطلبات الهيئة)' : 'Mandatory Passenger Identification'}
                </h4>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isAr ? 'الاسم الكامل (مطابق للهوية / الجواز)' : 'Full Name (as on ID / Passport)'}
                  </label>
                  <input
                    type="text"
                    value={passengerName}
                    onChange={(e) => setPassengerName(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#b20163]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isAr ? 'رقم الهوية الوطنية / الإقامة / الجواز' : 'National ID / Iqama / Passport'}
                    </label>
                    <input
                      type="text"
                      value={idNumber}
                      onChange={(e) => setIdNumber(e.target.value)}
                      required
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#b20163]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isAr ? 'رقم الجوال لتلقي التذكرة' : 'Mobile for WhatsApp / SMS'}
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-2.5 bg-slate-200/80 rounded-l-xl rtl:rounded-l-none rtl:rounded-r-xl text-xs font-bold text-slate-600 border border-slate-300">
                        +966
                      </span>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 9))}
                        required
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-r-xl rtl:rounded-r-none rtl:rounded-l-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#b20163]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-500">
                  {isAr ? 'طريقة الدفع الفوري' : 'Select Payment Method'}
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'mada', label: 'مدى Mada', badge: '🇸🇦 Debit' },
                    { id: 'apple', label: 'Apple Pay', badge: ' 1-Click' },
                    { id: 'stc', label: 'STC Pay', badge: '📱 Wallet' },
                    { id: 'card', label: 'Visa/MC', badge: '💳 Credit' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPaymentMethod(p.id as any)}
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                        paymentMethod === p.id
                          ? 'border-[#b20163] bg-rose-50/60 ring-2 ring-[#b20163]/20 shadow-xs'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-xs font-black text-slate-900">{p.label}</span>
                      <span className="text-[10px] text-slate-500 font-semibold mt-0.5">{p.badge}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-extrabold py-4 px-6 rounded-2xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 text-sm transition-all cursor-pointer"
                >
                  {isLoading ? (
                    <RefreshCw className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>
                        {isAr
                          ? `دفع ${total.toFixed(2)} ر.س وإصدار التذكرة`
                          : `Pay ${total.toFixed(2)} SAR & Issue Ticket`}
                      </span>
                    </>
                  )}
                </button>
                <div className="flex items-center justify-center gap-1.5 mt-2.5 text-[11px] text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>
                    {isAr
                      ? 'مدفوعات مشفرة 256-bit بمعايير البنك المركزي السعودي (ساما)'
                      : '256-bit PCI-DSS encrypted payment compliant with Saudi Central Bank (SAMA)'}
                  </span>
                </div>
              </div>
            </form>
          ) : (
            /* Booking Confirmed State */
            <div className="space-y-5 animate-fadeIn">
              <div className="text-center py-2">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-black text-slate-900">
                  {isAr ? 'تم تأكيد رحلتك بنجاح!' : 'Your Journey is Confirmed!'}
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  {isAr
                    ? `تم إرسال نسخة التذكرة ورابط تتبع الحافلة إلى جوالك +966 ${phone}`
                    : `Ticket copy & live bus tracking link sent via WhatsApp to +966 ${phone}`}
                </p>
              </div>

              {/* Digital E-Ticket Card */}
              <div className="p-4 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-300 relative space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">
                      {isAr ? 'رقم الحجز الموحد' : 'Booking PNR Reference'}
                    </span>
                    <h5 className="text-lg font-black text-[#b20163] tracking-widest">{bookingRef}</h5>
                  </div>
                  <div className="w-12 h-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center p-1">
                    <QrCode className="w-10 h-10 text-slate-800" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-200">
                  <div>
                    <span className="text-slate-400 block text-[10px]">{isAr ? 'المسافر' : 'Passenger'}</span>
                    <span className="font-bold text-slate-800">{passengerName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">{isAr ? 'المقاعد' : 'Seats'}</span>
                    <span className="font-bold text-emerald-700">{seats.map((s) => s.id).join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">{isAr ? 'المشغل' : 'Operator'}</span>
                    <span className="font-bold text-slate-800">{operator}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">{isAr ? 'المبلغ المدفوع' : 'Total Paid'}</span>
                    <span className="font-bold text-slate-800">{total.toFixed(2)} SAR (Mada)</span>
                  </div>
                </div>
              </div>

              {/* Next Actions */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => alert(isAr ? 'جاري تحميل ملف PDF للتذكرة...' : 'Downloading PDF ticket...')}
                  className="flex-1 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>{isAr ? 'تحميل التذكرة (PDF)' : 'Download PDF'}</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#b20163] hover:bg-[#8c0047] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>{isAr ? 'إغلاق والعودة للرئيسية' : 'Done & Return'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
