'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Locale } from '@/lib/translations';
import {
  X,
  Clock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
  initialTab?: 'customer' | 'operator';
}

export function AuthModal({ isOpen, onClose, locale }: AuthModalProps) {
  const [step, setStep] = useState<'mobile' | 'otp' | 'success'>('mobile');

  // Mobile / OTP state matching Figma Group 11 & 12
  const [mobileNumber, setMobileNumber] = useState('567990235');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [countdown, setCountdown] = useState(55);
  const otpInputs = useRef<(HTMLInputElement | null)[]>([]);

  // Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const isAr = locale === 'ar';

  useEffect(() => {
    if (isOpen) {
      setStep('mobile');
      setError('');
    }
  }, [isOpen]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 'otp' && countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobileNumber.trim() || mobileNumber.length < 8) {
      setError(isAr ? 'يرجى إدخال رقم جوال صالح' : 'Please enter a valid mobile number');
      return;
    }
    setError('');
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('otp');
      setCountdown(55);
      setTimeout(() => otpInputs.current[0]?.focus(), 100);
    }, 600);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      otpInputs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const entered = otp.join('');
    if (entered.length < 4) {
      setError(isAr ? 'يرجى إدخال رمز التحقق المكون من 4 أرقام' : 'Please enter the 4-digit security code');
      return;
    }
    setError('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const user = {
        name: `Passenger (+966 ${mobileNumber})`,
        phone: `+966 ${mobileNumber}`,
        role: 'customer' as const,
        token: 'token_' + Date.now(),
      };
      localStorage.setItem('bus_arabia_auth', JSON.stringify(user));
      localStorage.setItem('bus_arabia_user', JSON.stringify(user));
      window.dispatchEvent(new Event('auth-change'));
      setStep('success');

      setTimeout(() => {
        onClose();
      }, 1200);
    }, 800);
  };

  const handleSocialLogin = (provider: 'Google' | 'Facebook') => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const user = {
        name: `${provider} Traveler`,
        phone: '+966 50 123 4567',
        role: 'customer' as const,
        token: 'token_' + Date.now(),
      };
      localStorage.setItem('bus_arabia_auth', JSON.stringify(user));
      localStorage.setItem('bus_arabia_user', JSON.stringify(user));
      window.dispatchEvent(new Event('auth-change'));
      setStep('success');

      setTimeout(() => {
        onClose();
      }, 1200);
    }, 600);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-end p-3 sm:p-4 bg-black/55 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      {/* Floating Right Card matching Figma Frame 3520 (Top: 15px, Right: 16px, Bottom: 15px, Width: 520px, Height: 808px, Radius: 24px) */}
      <div
        className="relative w-full max-w-[500px] lg:max-w-[520px] h-[calc(100vh-28px)] max-h-[828px] bg-[#fcf9f8] rounded-3xl shadow-2xl border border-[#dbbfca]/60 overflow-y-auto font-['Montserrat',sans-serif] flex flex-col justify-between p-6 sm:p-8 lg:p-10 animate-slideInRight"
        onClick={(e) => e.stopPropagation()}
        dir={isAr ? 'rtl' : 'ltr'}
      >
        {/* Top Controls: Close Button */}
        <div className="absolute top-5 right-5 rtl:right-auto rtl:left-5 z-20 flex items-center gap-2">
          <button
            onClick={onClose}
            className="text-[#554149]/60 hover:text-[#554149] p-2 rounded-full hover:bg-black/5 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Panel Content (Centered Vertically) */}
        <div className="flex-1 flex flex-col justify-center items-center text-center my-auto pt-6 pb-4">
          
          {/* Logo (Figma 1694:61) */}
          <div className="mb-6">
            <Image
              src="/images/logo.png"
              alt="Bus Arabia"
              width={170}
              height={58}
              className="h-12 w-auto object-contain"
              priority
            />
          </div>

          {/* STEP 1: MOBILE NUMBER & WELCOME (Figma Group 11) */}
          {step === 'mobile' && (
            <div className="w-full flex flex-col items-center">
              {/* Title: Welcome ! */}
              <h2 className="text-3xl sm:text-[38px] font-bold bg-gradient-to-r from-[#950250] via-[#c2006d] to-[#fa1590] bg-clip-text text-transparent mb-2.5">
                {isAr ? 'أهلاً بك !' : 'Welcome !'}
              </h2>
              
              {/* Subtitle */}
              <p className="text-[#554149] text-sm sm:text-base font-medium max-w-[360px] mb-7 leading-relaxed">
                {isAr
                  ? 'سجل الدخول أو أنشئ حسابك لإدارة حجوزاتك واستكشاف الرحلات.'
                  : 'Sign in / Sign up below to manage your bookings and explore new journeys.'}
              </p>

              <form onSubmit={handleSendOtp} className="w-full flex flex-col gap-5 text-left rtl:text-right">
                {/* Mobile Number Field */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#550036]">
                    {isAr ? 'رقم الجوال' : 'Mobile Number'}
                  </label>
                  <div className="flex items-center gap-3">
                    {/* Saudi Flag + +966 Pill */}
                    <div className="flex items-center rounded-xl border border-[#dbbfca] overflow-hidden bg-white shadow-sm shrink-0">
                      <div className="flex items-center justify-center px-3 py-2.5 bg-white">
                        <Image
                          src="/images/saudi-flag.png"
                          alt="Saudi Arabia Flag"
                          width={24}
                          height={16}
                          className="h-4 w-6 object-contain"
                        />
                      </div>
                      <div className="px-3.5 py-2.5 bg-gradient-to-r from-[#950250] to-[#fa1590] text-white font-bold text-sm sm:text-base">
                        +966
                      </div>
                    </div>

                    {/* Number Input Box */}
                    <input
                      type="tel"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                      placeholder="567990235"
                      maxLength={9}
                      className="flex-1 px-4 py-2.5 rounded-xl border border-[#dbbfca] bg-white text-base font-semibold text-[#1c1b1b] placeholder-[#88717a] shadow-sm outline-none focus:border-[#b20163] focus:ring-2 focus:ring-[#b20163]/20 transition-all"
                      required
                      autoFocus
                    />
                  </div>
                  {error && <p className="text-xs text-red-600 font-semibold mt-1">{error}</p>}
                </div>

                {/* Send OTP CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#950250] via-[#c2006d] to-[#fa1590] text-white font-bold text-base sm:text-lg shadow-[0_8px_20px_rgba(230,0,122,0.35)] hover:shadow-[0_12px_28px_rgba(230,0,122,0.5)] active:scale-[0.99] transition-all flex items-center justify-center cursor-pointer disabled:opacity-50 mt-1"
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    isAr ? 'إرسال رمز التحقق (OTP)' : 'Send One-Time Password (OTP)'
                  )}
                </button>
              </form>

              {/* Divider: ─── or ─── */}
              <div className="w-full flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-[#dbbfca]" />
                <span className="text-sm font-semibold text-[#554149]">
                  {isAr ? 'أو' : 'or'}
                </span>
                <div className="flex-1 h-px bg-[#dbbfca]" />
              </div>

              {/* Social Buttons */}
              <div className="w-full grid grid-cols-2 gap-3 mb-6">
                {/* Google */}
                <button
                  type="button"
                  onClick={() => handleSocialLogin('Google')}
                  className="flex flex-col items-center justify-center py-2.5 px-3 bg-white border border-[#dbbfca] rounded-xl hover:bg-gray-50 active:scale-[0.98] transition-all shadow-sm cursor-pointer"
                >
                  <span className="text-[11px] font-semibold text-[#554149]">
                    {isAr ? 'دخول عبر' : 'Sign in with'}
                  </span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span className="text-sm font-bold text-[#1c1b1b]">Google</span>
                  </div>
                </button>

                {/* Facebook */}
                <button
                  type="button"
                  onClick={() => handleSocialLogin('Facebook')}
                  className="flex flex-col items-center justify-center py-2.5 px-3 bg-[#1877f2] border border-[#1877f2] rounded-xl hover:bg-[#166fe5] text-white active:scale-[0.98] transition-all shadow-sm cursor-pointer"
                >
                  <span className="text-[11px] font-semibold text-white/90">
                    {isAr ? 'دخول عبر' : 'Sign in with'}
                  </span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span className="text-sm font-bold text-white">Facebook</span>
                  </div>
                </button>
              </div>

              {/* Legal Policy Footer */}
              <p className="text-xs text-[#554149] max-w-[360px] leading-relaxed text-center font-['Inter',sans-serif]">
                {isAr ? (
                  <>
                    بتسجيل الدخول، أنت توافق على{' '}
                    <Link href="/terms" className="text-[#b20163] hover:underline font-bold">
                      شروط الخدمة
                    </Link>{' '}
                    و{' '}
                    <Link href="/privacy" className="text-[#b20163] hover:underline font-bold">
                      سياسة الخصوصية
                    </Link>
                  </>
                ) : (
                  <>
                    By logging in, I understand & agree to Bus Arabia’s{' '}
                    <Link href="/terms" className="text-[#b20163] hover:underline font-bold">
                      Terms of Service
                    </Link>{' '}
                    &{' '}
                    <Link href="/privacy" className="text-[#b20163] hover:underline font-bold">
                      Privacy Policy
                    </Link>
                  </>
                )}
              </p>
            </div>
          )}

          {/* STEP 2: VERIFICATION REQUIRED (Figma Group 12) */}
          {step === 'otp' && (
            <div className="w-full flex flex-col items-center animate-fadeIn">
              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#950250] via-[#c2006d] to-[#fa1590] bg-clip-text text-transparent mb-2">
                {isAr ? 'رمز التحقق مطلوب' : 'Verification Required'}
              </h2>

              {/* Subtitle */}
              <p className="text-[#554149] text-sm sm:text-base font-normal max-w-[360px] mb-8 leading-relaxed">
                {isAr
                  ? 'لقد أرسلنا رمز أمان مكون من 4 أرقام إلى رقم جوالك. يرجى إدخاله أدناه للمتابعة.'
                  : "We've sent a 4-digit security code to your Mobile number. Please enter it below to continue."}
              </p>

              <form onSubmit={handleVerifyOtp} className="w-full flex flex-col gap-6 items-center">
                {/* 4 Digit Boxes matching Figma 64x80 */}
                <div className="flex justify-center gap-3 sm:gap-4 my-1">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => {
                        otpInputs.current[idx] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      className="w-14 sm:w-16 h-18 sm:h-20 text-center text-2xl sm:text-3xl font-bold bg-[#f3f4f5] border border-[#dbbfca] rounded-2xl shadow-sm text-[#1c1b1b] focus:bg-white focus:border-[#b20163] focus:ring-2 focus:ring-[#b20163]/20 outline-none transition-all"
                    />
                  ))}
                </div>

                {/* Timer & Resend */}
                <div className="flex items-center justify-center gap-2 text-sm text-[#554149]">
                  <Clock className="w-4 h-4 text-[#554149]" />
                  {countdown > 0 ? (
                    <span>
                      {isAr ? 'إعادة الإرسال بعد ' : 'Resend in '}
                      <strong className="text-[#550036] font-bold">{formatTimer(countdown)}</strong>
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setCountdown(55)}
                      className="text-[#b20163] font-bold hover:underline cursor-pointer"
                    >
                      {isAr ? 'إعادة إرسال الرمز الآن' : 'Resend OTP Now'}
                    </button>
                  )}
                </div>

                {error && <p className="text-xs text-red-600 font-semibold">{error}</p>}

                {/* Verify & Login Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#950250] via-[#c2006d] to-[#fa1590] text-white font-bold text-base sm:text-lg shadow-[0_8px_20px_rgba(230,0,122,0.35)] hover:shadow-[0_12px_28px_rgba(230,0,122,0.5)] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-1"
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      {isAr ? 'تأكيد ودخول' : 'Verify & Login'}
                      <ArrowRight className="w-5 h-5 rtl:rotate-180" />
                    </>
                  )}
                </button>

                {/* Back Link */}
                <button
                  type="button"
                  onClick={() => {
                    setStep('mobile');
                    setError('');
                  }}
                  className="flex items-center gap-2 text-[#554149] hover:text-[#b20163] font-bold text-sm sm:text-base transition-colors cursor-pointer mt-1"
                >
                  <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
                  {isAr ? 'العودة لتسجيل الدخول' : 'Back to Sign in/Sign up'}
                </button>
              </form>

              {/* Legal Policy Footer */}
              <p className="text-xs text-[#554149] max-w-[360px] leading-relaxed mt-7 text-center font-['Inter',sans-serif]">
                {isAr ? (
                  <>
                    بتسجيل الدخول، أنت توافق على{' '}
                    <Link href="/terms" className="text-[#b20163] hover:underline font-bold">
                      شروط الخدمة
                    </Link>{' '}
                    و{' '}
                    <Link href="/privacy" className="text-[#b20163] hover:underline font-bold">
                      سياسة الخصوصية
                    </Link>
                  </>
                ) : (
                  <>
                    By logging in, I understand & agree to Bus Arabia’s{' '}
                    <Link href="/terms" className="text-[#b20163] hover:underline font-bold">
                      Terms of Service
                    </Link>{' '}
                    &{' '}
                    <Link href="/privacy" className="text-[#b20163] hover:underline font-bold">
                      Privacy Policy
                    </Link>
                  </>
                )}
              </p>
            </div>
          )}

          {/* SUCCESS STATE */}
          {step === 'success' && (
            <div className="w-full flex flex-col items-center py-6 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-4 animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-[#1c1b1b] mb-2">
                {isAr ? 'تم تسجيل الدخول بنجاح!' : 'Welcome to Bus Arabia!'}
              </h3>
              <p className="text-[#554149] text-sm mb-4">
                {isAr ? 'جاري تحويلك إلى رحلاتك...' : 'You are now signed in. Enjoy your journey!'}
              </p>
              <div className="w-6 h-6 border-2 border-[#b20163] border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>

        {/* Bottom spacing */}
        <div className="h-4" />
      </div>
    </div>
  );
}
