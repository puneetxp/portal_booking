import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, User, LogOut, ChevronDown, Ticket } from 'lucide-react';
import { Locale, translations } from '@/lib/translations';
import { AuthModal } from './AuthModal';

interface SubpageNavbarProps {
  locale?: Locale;
  onToggleLocale?: () => void;
  activeNav?: 'about' | 'operators' | 'faq' | 'contact';
}

export function SubpageNavbar({
  locale = 'en',
  onToggleLocale = () => {},
  activeNav,
}: SubpageNavbarProps) {
  const t = translations[locale];
  const isAr = locale === 'ar';
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<'customer' | 'operator'>('customer');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    const syncUser = () => {
      try {
        const stored = localStorage.getItem('bus_arabia_user');
        setCurrentUser(stored ? JSON.parse(stored) : null);
      } catch (e) {
        setCurrentUser(null);
      }
    };
    syncUser();

    const handleAuthChange = () => syncUser();
    const handleOpenAuth = (e: any) => {
      setAuthTab(e.detail?.tab || 'customer');
      setAuthOpen(true);
    };

    window.addEventListener('auth-change', handleAuthChange);
    window.addEventListener('open-auth', handleOpenAuth);

    return () => {
      window.removeEventListener('auth-change', handleAuthChange);
      window.removeEventListener('open-auth', handleOpenAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('bus_arabia_user');
    setCurrentUser(null);
    setUserDropdownOpen(false);
    window.dispatchEvent(new Event('auth-change'));
  };

  // Determine active route based on pathname or activeNav prop
  const isAboutActive = activeNav === 'about' || pathname === '/about' || pathname?.startsWith('/about');
  const isOperatorsActive =
    activeNav === 'operators' || pathname === '/operators' || pathname?.startsWith('/operators');
  const isFaqActive = activeNav === 'faq' || pathname === '/faq' || pathname?.startsWith('/faq');
  const isContactActive =
    activeNav === 'contact' || pathname === '/contact' || pathname?.startsWith('/contact');

  const navLinks = [
    {
      href: '/about',
      label: t.nav.aboutUs,
      isActive: isAboutActive,
    },
    {
      href: '/operators',
      label: t.nav.ourBusOperators,
      isActive: isOperatorsActive,
    },
    {
      href: '/faq',
      label: t.nav.faq,
      isActive: isFaqActive,
    },
    {
      href: '/contact',
      label: t.nav.contactUs,
      isActive: isContactActive,
    },
  ];

  return (
    <>
      <header className="sticky top-0 left-0 right-0 z-50 w-full bg-white border-b border-[#fae8f1] shadow-[0_2px_12px_rgba(178,1,99,0.04)] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-20 flex items-center justify-between">
          {/* Left Group: Brand Logo + Primary Subpage Nav Links (Frame 3700) */}
          <div className="flex items-center gap-7 lg:gap-10">
            <Link href="/" className="flex items-center flex-shrink-0 group">
              <div className="relative h-11 w-36 sm:w-42 transition-transform group-hover:scale-[1.02]">
                <Image
                  src="/images/logo.png"
                  alt="Bus Arabia Logo"
                  fill
                  className="object-contain object-left rtl:object-right"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation Links with Active State (Frame 3700) */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs sm:text-[13px] font-['Montserrat',sans-serif] h-20">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative flex items-center h-full font-semibold transition-colors whitespace-nowrap ${
                    link.isActive
                      ? 'text-[#b20163] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-[#b20163] after:rounded-t-full'
                      : 'text-[#554149] hover:text-[#b20163] font-medium'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right Action Controls matching Frame 3700 */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 lg:gap-4 flex-shrink-0">
            {/* Language Selector Pill */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-[11px] font-['Montserrat',sans-serif] font-bold text-[#554149] hidden xl:inline">
                {isAr ? 'اختر اللغة:' : 'Select Language:'}
              </span>
              <button
                onClick={onToggleLocale}
                type="button"
                className="inline-flex items-center justify-center gap-[9px] w-[119px] h-[41px] rounded-full border border-[#dbc0c9] bg-[#fff8f8] hover:bg-white text-xs font-semibold text-[#554149] cursor-pointer shadow-[0_4px_4px_rgba(0,0,0,0.08)] backdrop-blur-[50px] transition-all flex-shrink-0"
                title="Toggle Language"
              >
                <div className="relative w-[28px] h-[19.25px] flex-shrink-0 overflow-hidden rounded-[3px] shadow-[0_1px_2px_rgba(0,0,0,0.1)]">
                  <Image
                    src={isAr ? '/icons/uk-flag.svg' : '/icons/saudi-flag.svg'}
                    alt={isAr ? 'English' : 'Saudi Arabia Flag'}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="font-['Montserrat',sans-serif] font-semibold text-[12px] text-[#554149] tracking-[0.7px]">
                  {isAr ? 'English' : 'العربية'}
                </span>
              </button>
            </div>

            {/* Gold Book Now CTA Button */}
            <Link
              href="/#search-box"
              className="inline-flex items-center justify-center px-4 sm:px-6 py-2.5 text-xs sm:text-sm font-['Inter',sans-serif] font-bold text-[#1c1b1b] bg-gradient-to-r from-[#ffe26d] via-[#fdea9d] to-[#d9b747] hover:brightness-105 rounded-full shadow-[0_3px_8px_rgba(217,183,71,0.25)] hover:shadow-md transition-all cursor-pointer whitespace-nowrap"
            >
              {t.nav.bookNow}
            </Link>

            {/* User Session or Sign in / Sign up CTA */}
            {currentUser ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-xs font-bold text-[#b20163] hover:bg-rose-100 transition-all cursor-pointer"
                >
                  <span className="w-6 h-6 rounded-full bg-[#b20163] text-white flex items-center justify-center text-[10px] font-black">
                    {currentUser.name ? currentUser.name.substring(0, 1).toUpperCase() : 'U'}
                  </span>
                  <span className="max-w-[80px] truncate">{currentUser.name || 'Account'}</span>
                  <ChevronDown className="w-3 h-3" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute ltr:right-0 rtl:left-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-50 animate-fadeIn">
                    <div className="px-3.5 py-2 border-b border-slate-100 text-xs">
                      <p className="font-extrabold text-slate-800 truncate">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{currentUser.phone || currentUser.email}</p>
                    </div>
                    <Link
                      href="/#search-box"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <Ticket className="w-3.5 h-3.5 text-[#b20163]" />
                      <span>{isAr ? 'حجوزاتي' : 'My Bookings'}</span>
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer text-left rtl:text-right"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>{isAr ? 'تسجيل الخروج' : 'Sign Out'}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setAuthTab('customer');
                  setAuthOpen(true);
                }}
                className="hidden sm:inline-flex items-center justify-center px-2 sm:px-3 py-2 text-xs sm:text-sm font-['Inter',sans-serif] font-bold text-[#b20163] hover:text-[#8c0047] transition-all cursor-pointer whitespace-nowrap"
              >
                {t.nav.signInSignUp}
              </button>
            )}

            {/* Mobile Menu Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="lg:hidden p-2 rounded-lg text-[#554149] hover:text-[#b20163] hover:bg-rose-50 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-rose-100/70 py-4 bg-white/98 backdrop-blur-md animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col gap-1 pb-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    link.isActive
                      ? 'bg-rose-50/80 text-[#b20163] font-bold'
                      : 'text-[#554149] hover:bg-slate-50 hover:text-[#b20163]'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.isActive && (
                    <span className="w-2 h-2 rounded-full bg-[#b20163]" />
                  )}
                </Link>
              ))}
            </nav>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
              <div className="flex items-center justify-between px-3">
                <span className="text-xs font-semibold text-slate-500">
                  {isAr ? 'اللغة' : 'Language'}
                </span>
                <button
                  onClick={() => {
                    onToggleLocale();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-[#554149]"
                >
                  <span>🇸🇦</span>
                  <span>{isAr ? 'English' : 'العربية'}</span>
                </button>
              </div>

              <div className="px-3 pt-1 flex items-center justify-between">
                {currentUser ? (
                  <button
                    type="button"
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-xs font-bold text-rose-600 hover:underline"
                  >
                    {isAr ? 'تسجيل الخروج' : 'Sign Out'}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setAuthTab('customer');
                      setAuthOpen(true);
                      setMobileMenuOpen(false);
                    }}
                    className="text-xs font-bold text-[#b20163] hover:underline"
                  >
                    {t.nav.signInSignUp}
                  </button>
                )}
                <Link
                  href="/#search-box"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 text-xs font-bold rounded-full bg-gradient-to-r from-[#ffe26d] to-[#d9b747] text-[#1c1b1b]"
                >
                  {t.nav.bookNow}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>

    {/* Interactive Auth Modal */}
    <AuthModal
      isOpen={authOpen}
      onClose={() => setAuthOpen(false)}
      locale={locale}
      initialTab={authTab}
    />
  </>
  );
}
