'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Locale } from '@/lib/translations';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SubpageHero } from '@/components/SubpageHero';
import {
  Search,
  ChevronDown,
  HelpCircle,
  Phone,
  MessageSquare,
  Ticket,
  CreditCard,
  Luggage,
  RotateCcw,
  Sparkles,
  Building2,
  Clock,
  ShieldCheck,
} from 'lucide-react';

interface FAQItem {
  id: string;
  category: string;
  qEn: string;
  qAr: string;
  aEn: string;
  aAr: string;
}

export default function FAQPage() {
  const [locale, setLocale] = useState<Locale>('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedId, setExpandedId] = useState<string | null>('faq-1');

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

  const categories = [
    { id: 'all', labelEn: 'All Topics', labelAr: 'كافة المواضيع', icon: HelpCircle },
    { id: 'booking', labelEn: 'Booking & E-Tickets', labelAr: 'الحجز والتذاكر الرقمية', icon: Ticket },
    { id: 'payment', labelEn: 'Payments & 15% VAT', labelAr: 'طرق الدفع والضريبة', icon: CreditCard },
    { id: 'luggage', labelEn: 'Baggage & Boarding', labelAr: 'الأمتعة والصعود للحافلة', icon: Luggage },
    { id: 'refund', labelEn: 'Cancellations & Refunds', labelAr: 'الإلغاء والاسترداد المالي', icon: RotateCcw },
    { id: 'amenities', labelEn: 'Onboard VIP Comfort', labelAr: 'خدمات الحافلة والراحة', icon: Sparkles },
    { id: 'operator', labelEn: 'Operator Network', labelAr: 'شبكة المشغلين والشركاء', icon: Building2 },
  ];

  const faqs: FAQItem[] = [
    {
      id: 'faq-1',
      category: 'booking',
      qEn: 'How do I book a bus ticket on Bus Arabia?',
      qAr: 'كيف أقوم بحجز تذكرة حافلة عبر باص أرابيا؟',
      aEn: 'Booking takes less than a minute: Simply select your departure city, destination, and travel date on the homepage search box. Browse all available schedules from licensed operators, select your exact seat on our interactive bus map, and complete checkout with Mada, Apple Pay, or credit card. Your electronic QR ticket is issued immediately.',
      aAr: 'يتم الحجز في أقل من دقيقة: حدد مدينة الانطلاق، والوجهة، وتاريخ السفر في محرك البحث بالصفحة الرئيسية. استعرض الرحلات المتاحة من المشغلين المعتمدين، واختر مقعدك بدقة على الخريطة التفاعلية، وسدد عبر مدى أو آبل باي أو البطاقات الائتمانية. ستصلك تذكرتك الرقمية برمز QR فوراً.',
    },
    {
      id: 'faq-2',
      category: 'booking',
      qEn: 'Do I need to print my ticket or is the smartphone QR code sufficient?',
      qAr: 'هل يلزم طباعة التذكرة ورقيًا أم يكفي رمز QR على الجوال؟',
      aEn: 'Printing is not required! All partner operators are equipped with mobile QR barcode scanners. Simply present the digital ticket on your smartphone screen alongside your original official identification at the boarding gate.',
      aAr: 'لا داعي للطباعة الورقية إطلاقاً! جميع مشغلينا مزودون بأجهزة مسح إلكترونية. يكفي إبراز التذكرة الرقمية ورمز QR على شاشة جوالك مع إثبات الهوية الأصلي عند بوابة الصعود.',
    },
    {
      id: 'faq-3',
      category: 'booking',
      qEn: 'What official identification is mandatory for intercity bus travel in Saudi Arabia?',
      qAr: 'ما هي وثائق إثبات الهوية الإلزامية للسفر بالحافلة داخل المملكة؟',
      aEn: 'In compliance with Saudi Transport General Authority (TGA) security rules: Saudi Citizens must present their original National ID Card; Resident Expats must present a valid original Resident Identity (Iqama); GCC Nationals must present their National ID or Passport; and Tourists/Pilgrims must present their Passport with a valid entry visa.',
      aAr: 'وفق اشتراطات الهيئة العامة للنقل والجهات الأمنية: يلزم المواطنين إبراز أصل الهوية الوطنية؛ وللمقيمين أصل هوية مقيم (الإقامة) سارية المفعول؛ ولمواطني دول الخليج أصل الهوية الوطنية أو الجواز؛ وللزوار والمعتمرين أصل جواز السفر مع تأشيرة دخول نظامية سارية.',
    },
    {
      id: 'faq-4',
      category: 'booking',
      qEn: 'How does the 10-minute seat lock reservation work?',
      qAr: 'كيف تعمل ميزة حجز وقفل المقعد لمدة 10 دقائق؟',
      aEn: 'When you click a seat on our interactive bus map, our Redis distributed seat-lock engine temporarily holds that seat exclusively for you for 10 minutes. A visible countdown timer appears on your screen, ensuring no other passenger can book that seat while you finalize passenger details and payment.',
      aAr: 'بمجرد النقر على المقعد المطلوب، يقوم نظام الحجز الذكي بقفل المقعد وتخصيصه لك حصرياً لمدة 10 دقائق مع عداد تنازلي على الشاشة، مما يضمن عدم حجز نفس المقعد من أي مسافر آخر أثناء إدخال البيانات والدفع.',
    },
    {
      id: 'faq-5',
      category: 'payment',
      qEn: 'Which payment methods are accepted on the platform?',
      qAr: 'ما هي طرق الدفع المعتمدة في منصة باص أرابيا؟',
      aEn: 'We support all major Saudi and GCC payment methods: Mada debit cards, Apple Pay, Visa, Mastercard, American Express, and instant payments via Bus Arabia Wallet. All transactions are protected by bank-grade TLS 1.3 encryption.',
      aAr: 'ندعم كافة طرق الدفع المعتمدة في المملكة ودول الخليج: بطاقات مدى البنكية، آبل باي (Apple Pay)، فيزا، ماستركارد، أمريكان إكسبريس، ورصيد محفظة باص أرابيا الفورية، وتتم جميع العمليات بتشفير بنكي مشدد.',
    },
    {
      id: 'faq-6',
      category: 'payment',
      qEn: 'Are ticket prices inclusive of the 15% Saudi Value Added Tax (VAT)?',
      qAr: 'هل أسعار التذاكر شاملة ضريبة القيمة المضافة 15%؟',
      aEn: 'Yes! All fares displayed on Bus Arabia are 100% transparent and fully inclusive of the statutory 15% KSA Value Added Tax (VAT). There are zero hidden administrative charges or surprise fees at checkout.',
      aAr: 'نعم بالتأكيد! كافة الأسعار المعروضة على المنصة شفافة تماماً وشاملة لضريبة القيمة المضافة بنسبة 15%، ولا توجد أي رسوم إدارية خفية عند إتمام الدفع.',
    },
    {
      id: 'faq-7',
      category: 'luggage',
      qEn: 'What is the standard baggage allowance per passenger?',
      qAr: 'ما هو الوزن المسموح به للأمتعة لكل مسافر؟',
      aEn: 'Each standard ticket includes one large checked suitcase (up to 25 kg) placed in the lower luggage hold, plus one small personal carry-on item (up to 7 kg) inside the passenger cabin. Extra luggage space can be requested directly at the departure station for a nominal fee depending on bus capacity.',
      aAr: 'تشمل كل تذكرة حقيبة سفر رئيسية واحدة بوزن يصل إلى 25 كجم في صندوق الأمتعة السفلي، بالإضافة إلى حقيبة يد صغيرة شخصية بوزن 7 كجم داخل مقصورة الركاب. يمكن شحن أمتعة إضافية من محطة المغادرة مقابل رسوم رمزية حسب المساحة المتاحة.',
    },
    {
      id: 'faq-8',
      category: 'luggage',
      qEn: 'What time should I arrive at the bus terminal before departure?',
      qAr: 'متى يجب أن أحضر إلى محطة الحافلات قبل موعد الانطلاق؟',
      aEn: 'Passengers should arrive at least 30 minutes prior to scheduled departure (45 minutes during high-demand pilgrimage and holiday seasons). Boarding gates close strictly 10 minutes before the bus departs.',
      aAr: 'يجب الحضور في المحطة قبل موعد الرحلة بـ 30 دقيقة على الأقل (و45 دقيقة خلال مواسم الحج والعمرة والأعياد). تُغلق بوابات الصعود قبل 10 دقائق من موعد انطلاق الحافلة.',
    },
    {
      id: 'faq-9',
      category: 'refund',
      qEn: 'How do I cancel my ticket and how quickly do I receive my refund?',
      qAr: 'كيف يمكنني إلغاء تذكرتي، وكم يستغرق استرداد المبلغ؟',
      aEn: 'You can cancel directly online via "My Bookings" with your booking reference and phone number. If you choose refund to your Bus Arabia Wallet, your credit is available in 0 seconds (instantaneous). For card refunds, Mada takes 24–48 hours and credit cards take 3–7 business days.',
      aAr: 'يمكنك الإلغاء ذاتياً عبر صفحة "حجوزاتي" بإدخال رقم الحجز ورقم الجوال. عند اختيار الاسترداد إلى محفظة باص أرابيا، يضاف الرصيد فوراً خلال 0 ثانية. أما الاسترداد للبطاقات البنكية فيستغرق من 24-48 ساعة لبطاقات مدى، ومن 3-7 أيام عمل للبطاقات الائتمانية.',
    },
    {
      id: 'faq-10',
      category: 'refund',
      qEn: 'What happens if a bus is delayed or cancelled by the operator?',
      qAr: 'ماذا يحدث في حال تأخرت الحافلة أو تم إلغاء الرحلة من المشغل؟',
      aEn: 'Under our Passenger Disruption Guarantee and TGA regulations, if an operator cancels a trip or is delayed by more than 90 minutes, you are entitled to an immediate 100% full refund with zero deductions, plus a 10% complimentary travel discount voucher for your next trip.',
      aAr: 'وفقاً لضمان حماية المسافر ولوائح هيئة النقل، في حال إلغاء الرحلة من المشغل أو تأخرها لأكثر من 90 دقيقة، تسترد 100% من قيمة التذكرة بالكامل فوراً بدون أي استقطاع، مع قسيمة خصم 10% على رحلتك القادمة.',
    },
    {
      id: 'faq-11',
      category: 'amenities',
      qEn: 'What amenities are available on VIP and luxury coaches?',
      qAr: 'ما هي الخدمات ووسائل الراحة المتوفرة في حافلات VIP والدرجة الفاخرة؟',
      aEn: 'VIP coaches feature spacious 2+1 seating layouts with wide leather reclining seats, free high-speed Wi-Fi, personal USB/AC charging outlets, clean onboard restrooms, and complimentary chilled beverages and snacks.',
      aAr: 'تتميز حافلات VIP الفاخرة بنظام توزيع المقاعد 2+1 برحابة فائقة، ومقاعد جلدية مريحة تميل لمستوى النوم، وإنترنت واي فاي فائق السرعة، ومقابس شحن لكل مقعد، ودورة مياه نظيفة، ومشروبات وضيافة مجانية.',
    },
    {
      id: 'faq-12',
      category: 'operator',
      qEn: 'How can a licensed bus company join Bus Arabia as a partner?',
      qAr: 'كيف يمكن لشركات الحافلات المرخصة الانضمام كشريك في باص أرابيا؟',
      aEn: 'Licensed bus operators with active commercial registration and TGA transport permits can apply via our Contact page or the Operator Portal link. Our onboarding team reviews permits, configures seat layouts, and connects schedules within 48 hours.',
      aAr: 'يمكن لشركات النقل الحاصلة على سجل تجاري ساري وترخيص من الهيئة العامة للنقل التقديم عبر صفحة اتصل بنا أو رابط بوابة المشغلين. يقوم فريقنا بمراجعة التراخيص وتدشين الأسطول وجدولة الرحلات خلال 48 ساعة.',
    },
  ];

  const filteredFaqs = useMemo(() => {
    return faqs.filter((item) => {
      const matchesSearch =
        item.qEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.qAr.includes(searchQuery) ||
        item.aEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.aAr.includes(searchQuery);

      if (!matchesSearch) return false;
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
      return true;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="flex flex-col min-h-screen bg-[#fcf9f8] selection:bg-[#b20163] selection:text-white">
      <Navbar locale={locale} onToggleLocale={toggleLocale} />

      <main className="flex-1">
        {/* Figma Subpage Header */}
        <SubpageHero
          badge={isAr ? 'مركز المساعدة والمعرفة' : 'Knowledge & Help Center'}
          title={isAr ? 'الأسئلة الأكثر شيوعاً' : 'Frequently Asked Questions'}
          subtitle={
            isAr
              ? 'دليلك الشامل لمعرفة كل ما يتعلق بالحجز الإلكتروني، قفل المقاعد، وسائل الدفع، الأمتعة، والصعود إلى الحافلة.'
              : 'Your complete guide to intercity bus reservations, temporary seat-holding locks, accepted payment cards, luggage allowances, and gate check-in.'
          }
          breadcrumbs={[{ label: isAr ? 'الأسئلة الشائعة' : 'FAQ' }]}
          locale={locale}
        />

        {/* Content Layout matching Figma Frame 2062:1779 */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Sidebar: Quick Navigation & Support Card (Figma 2062:1780) */}
            <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
              {/* Category Pills Card */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-rose-100/70 space-y-2">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  {isAr ? 'تصنيفات الأسئلة' : 'Filter by Category'}
                </h3>
                <nav className="space-y-1">
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    const isActive = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                          isActive
                            ? 'bg-[#b20163] text-white shadow-xs'
                            : 'text-slate-600 hover:bg-rose-50/50 hover:text-[#b20163]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4" />
                          <span>{isAr ? cat.labelAr : cat.labelEn}</span>
                        </div>
                        {cat.id !== 'all' && (
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full ${
                              isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                            }`}
                          >
                            {faqs.filter((f) => f.category === cat.id).length}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Floating Contact Support Card (Figma 2062:1780) */}
              <div className="bg-gradient-to-br from-[#550036] to-[#b20163] rounded-3xl p-6 text-white shadow-lg space-y-4">
                <div className="w-10 h-10 rounded-2xl bg-[#ffe26d] text-slate-900 flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-white">
                    {isAr ? 'هل تحتاج إلى مساعدة فورية؟' : 'Still Have Questions?'}
                  </h4>
                  <p className="text-xs text-white/80 mt-1 leading-relaxed">
                    {isAr
                      ? 'فريق خدمة العملاء جاهز للرد الفوري على استفساراتك على مدار 24 ساعة.'
                      : 'Our support team is available 24/7 to resolve your inquiries via phone or WhatsApp.'}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-white/15">
                  <a
                    href="tel:920012345"
                    className="w-full py-2.5 px-4 rounded-full bg-[#ffe26d] hover:bg-[#ffd94f] text-slate-900 font-extrabold text-xs shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>9200 12345</span>
                  </a>
                  <a
                    href="https://wa.me/966501234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-4 rounded-full bg-white/15 hover:bg-white/25 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{isAr ? 'محادثة واتساب' : 'WhatsApp Support'}</span>
                  </a>
                </div>
              </div>
            </aside>

            {/* Right Main FAQ Content Area (Figma 2062:1779) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Search Bar */}
              <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-sm border border-rose-100/70 flex items-center gap-3">
                <Search className="w-5 h-5 text-[#b20163] flex-shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    isAr
                      ? 'ابحث بالكلمات المفتاحية (مثال: أمتعة، إلغاء، استرداد، مدى، قفل المقعد)...'
                      : 'Search by keyword (e.g. baggage, refund, Mada, seat lock, boarding)...'
                  }
                  className="w-full text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none bg-transparent"
                />
              </div>

              {/* Accordion List */}
              <div className="space-y-4">
                {filteredFaqs.length === 0 ? (
                  <div className="bg-white rounded-3xl p-10 text-center space-y-3 border border-slate-100">
                    <HelpCircle className="w-12 h-12 text-slate-300 mx-auto" />
                    <h3 className="text-base font-bold text-slate-800">
                      {isAr ? 'لم يتم العثور على نتائج' : 'No Matching Questions'}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {isAr
                        ? 'جرب البحث بكلمات أخرى أو اختر تصنيفاً مختلفاً من القائمة الجانبية.'
                        : 'Try searching with different terms or select a category from the sidebar.'}
                    </p>
                  </div>
                ) : (
                  filteredFaqs.map((faq) => {
                    const isOpen = expandedId === faq.id;
                    return (
                      <div
                        key={faq.id}
                        className="bg-white rounded-2xl shadow-2xs border border-rose-100/60 overflow-hidden transition-all"
                      >
                        <button
                          onClick={() => setExpandedId(isOpen ? null : faq.id)}
                          className="w-full p-5 sm:p-6 text-start flex items-center justify-between gap-4 cursor-pointer hover:bg-rose-50/20 transition-colors"
                        >
                          <span className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
                            {isAr ? faq.qAr : faq.qEn}
                          </span>
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-transform ${
                              isOpen
                                ? 'bg-[#b20163] text-white rotate-180'
                                : 'bg-slate-100 text-slate-500'
                            }`}
                          >
                            <ChevronDown className="w-4 h-4" />
                          </div>
                        </button>

                        {isOpen && (
                          <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4 font-normal">
                            {isAr ? faq.aAr : faq.aEn}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
