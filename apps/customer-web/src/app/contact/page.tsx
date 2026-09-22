'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Locale } from '@/lib/translations';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SubpageHero } from '@/components/SubpageHero';
import {
  Phone,
  MessageSquare,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  HelpCircle,
  Building2,
  Headphones,
  ShieldCheck,
} from 'lucide-react';

export default function ContactPage() {
  const [locale, setLocale] = useState<Locale>('en');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'booking',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

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
      const type = p.get('type');
      if (type === 'operator') {
        setFormData((prev) => ({ ...prev, category: 'operator' }));
      }
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  }, [locale]);

  const isAr = locale === 'ar';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fcf9f8] selection:bg-[#b20163] selection:text-white">
      <Navbar locale={locale} onToggleLocale={toggleLocale} />

      <main className="flex-1">
        {/* Figma Subpage Header */}
        <SubpageHero
          badge={isAr ? 'خدمة العملاء 24/7' : '24/7 Support Desk'}
          title={isAr ? 'اتصل بفريق باص أرابيا' : 'Get in Touch with Us'}
          subtitle={
            isAr
              ? 'هل لديك استفسار عن حجز تذكرتك، أو تعديل الرحلة، أو ترغب في تسجيل أسطولك؟ نحن هنا لمساعدتك على مدار الساعة.'
              : 'Have questions regarding your bus ticket, schedule modification, or operator partnership? Our bilingual support team is on standby 24/7.'
          }
          breadcrumbs={[{ label: isAr ? 'اتصل بنا' : 'Contact Us' }]}
          locale={locale}
        />

        {/* Content Container matching Figma Frame 1037:1213 */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Side: Contact Information (Figma 1037:1214) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#550036] via-[#75003d] to-[#b20163] rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden space-y-8">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#fa1590]/20 rounded-full blur-2xl pointer-events-none" />

              <div>
                <span className="text-[11px] font-extrabold text-[#ffe26d] uppercase tracking-wider block mb-1">
                  {isAr ? 'معلومات الاتصال المباشرة' : 'Direct Support Channels'}
                </span>
                <h2 className="text-2xl font-black text-white leading-tight">
                  {isAr ? 'نحن معك في كل خطوة' : 'We’re With You Every Mile'}
                </h2>
                <p className="text-xs sm:text-sm text-white/85 mt-2 leading-relaxed font-normal">
                  {isAr
                    ? 'مركز الاتصال الموحد وفريق الدعم الفني متاحون لمساعدتك في أي وقت، قبل الرحلة وأثناء الطريق.'
                    : 'Our unified support hotline and customer care marshals are available 24/7 to assist with ticket inquiries and station assistance.'}
                </p>
              </div>

              {/* Channels List */}
              <div className="space-y-5">
                {/* 1. Phone */}
                <a
                  href="tel:920012345"
                  className="flex items-start gap-4 p-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 transition-all group cursor-pointer"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#ffe26d] text-slate-900 flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-[#ffe26d] tracking-wider block">
                      {isAr ? 'الرقم الموحد المجاني' : 'Toll-Free Helpline'}
                    </span>
                    <span className="text-base font-extrabold text-white block mt-0.5">
                      9200 12345
                    </span>
                    <span className="text-[11px] text-white/70 block mt-0.5">
                      {isAr ? 'متاح 24 ساعة من كافة الشبكات' : '24/7 Nationwide Support'}
                    </span>
                  </div>
                </a>

                {/* 2. WhatsApp */}
                <a
                  href="https://wa.me/966501234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 transition-all group cursor-pointer"
                >
                  <div className="w-11 h-11 rounded-xl bg-emerald-400 text-slate-900 flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-emerald-300 tracking-wider block">
                      {isAr ? 'محادثة واتساب الفورية' : 'Instant WhatsApp Care'}
                    </span>
                    <span className="text-base font-extrabold text-white block mt-0.5">
                      +966 50 123 4567
                    </span>
                    <span className="text-[11px] text-white/70 block mt-0.5">
                      {isAr ? 'رد فوري خلال أقل من 3 دقائق' : 'Average response < 3 mins'}
                    </span>
                  </div>
                </a>

                {/* 3. Email */}
                <a
                  href="mailto:support@busarabia.com"
                  className="flex items-start gap-4 p-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 transition-all group cursor-pointer"
                >
                  <div className="w-11 h-11 rounded-xl bg-rose-200 text-[#b20163] flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-rose-200 tracking-wider block">
                      {isAr ? 'البريد الإلكتروني' : 'Customer Support Email'}
                    </span>
                    <span className="text-sm font-extrabold text-white block mt-0.5">
                      support@busarabia.com
                    </span>
                    <span className="text-[11px] text-white/70 block mt-0.5">
                      {isAr ? 'الرد خلال ساعتين' : 'Replies within 2 hours'}
                    </span>
                  </div>
                </a>

                {/* 4. HQ Office */}
                <div className="flex items-start gap-4 p-3.5 rounded-2xl bg-white/10 border border-white/15">
                  <div className="w-11 h-11 rounded-xl bg-white/20 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-white/70 tracking-wider block">
                      {isAr ? 'المقر الرئيسي' : 'Headquarters'}
                    </span>
                    <span className="text-xs sm:text-sm font-extrabold text-white block mt-0.5">
                      King Fahd Road, Al-Olaya, Riyadh 12211
                    </span>
                    <span className="text-[11px] text-white/70 block mt-0.5">
                      Kingdom of Saudi Arabia
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Contact Form (Figma 1037:1268) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-rose-100/70 space-y-6">
              <div>
                <span className="text-xs font-extrabold text-[#b20163] uppercase tracking-wider">
                  {isAr ? 'نموذج المراسلة' : 'Send an Inquiry'}
                </span>
                <h2 className="text-2xl font-black text-slate-900 mt-1">
                  {isAr ? 'أرسل لنا رسالتك وسنرد فوراً' : 'How Can We Assist You?'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {isAr
                    ? 'يرجى تزويدنا بتفاصيل طلبك وسيقوم فريق الدعم بمتابعة الحالة في أسرع وقت.'
                    : 'Fill in the form below and an agent will follow up with you directly.'}
                </p>
              </div>

              {isSubmitted ? (
                <div className="p-8 rounded-3xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#137a08] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-emerald-900">
                    {isAr ? 'تم استلام طلبك بنجاح!' : 'Inquiry Submitted Successfully!'}
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-700 max-w-md mx-auto leading-relaxed">
                    {isAr
                      ? 'شكراً لتواصلك. تم فتح تذكرة دعم برقم #BA-9412 وسيتواصل معك أحد ممثلي الخدمة خلال دقائق.'
                      : 'Thank you for reaching out. Ticket #BA-9412 has been logged and an agent will contact you shortly.'}
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 px-6 py-2 rounded-full bg-[#137a08] text-white text-xs font-bold hover:bg-emerald-700 transition-colors cursor-pointer"
                  >
                    {isAr ? 'إرسال رسالة أخرى' : 'Submit Another Request'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        {isAr ? 'الاسم الكامل *' : 'Full Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={isAr ? 'محمد عبدالله' : 'e.g. Mohammed Abdullah'}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#b20163] bg-slate-50/50"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        {isAr ? 'البريد الإلكتروني *' : 'Email Address *'}
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@example.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#b20163] bg-slate-50/50"
                      />
                    </div>
                  </div>

                  {/* Phone & Category */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        {isAr ? 'رقم الجوال *' : 'Saudi Mobile *'}
                      </label>
                      <div className="relative">
                        <span className="absolute start-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                          +966
                        </span>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="50 123 4567"
                          className="w-full ps-14 pe-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#b20163] bg-slate-50/50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        {isAr ? 'نوع الاستفسار *' : 'Inquiry Category *'}
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#b20163] bg-white cursor-pointer"
                      >
                        <option value="booking">
                          {isAr ? 'حجز التذاكر والمواعيد' : 'Ticket Booking & Schedules'}
                        </option>
                        <option value="refund">
                          {isAr ? 'إلغاء حجز واسترداد مالي' : 'Cancellation & Refund'}
                        </option>
                        <option value="luggage">
                          {isAr ? 'الأمتعة والمفقودات' : 'Baggage & Lost Items'}
                        </option>
                        <option value="operator">
                          {isAr ? 'شراكة مشغلي الحافلات' : 'Bus Operator Partnership'}
                        </option>
                        <option value="other">{isAr ? 'استفسار عام' : 'General Feedback'}</option>
                      </select>
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      {isAr ? 'نص الرسالة *' : 'Your Message *'}
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={
                        isAr
                          ? 'يرجى كتابة تفاصيل استفسارك أو رقم الحجز إن وجد...'
                          : 'Please describe your inquiry or booking reference...'
                      }
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#b20163] resize-none bg-slate-50/50"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3 px-6 rounded-full bg-gradient-to-r from-[#950250] via-[#b20163] to-[#550036] hover:brightness-105 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4 rtl:rotate-180" />
                    <span>{isAr ? 'إرسال الرسالة الآن' : 'Send Message Now'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
