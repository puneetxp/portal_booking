'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Clock, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<'mobile' | 'otp' | 'success'>('mobile');
  const [mobileNumber, setMobileNumber] = useState('567990235');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [countdown, setCountdown] = useState(55);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const otpInputs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer for OTP resend
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 'otp' && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobileNumber.trim() || mobileNumber.length < 8) {
      setError('Please enter a valid mobile number');
      return;
    }
    setError('');
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('otp');
      setCountdown(55);
      setTimeout(() => {
        otpInputs.current[0]?.focus();
      }, 100);
    }, 600);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-advance to next input
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
    const enteredCode = otp.join('');
    if (enteredCode.length < 4) {
      setError('Please enter the complete 4-digit code');
      return;
    }
    setError('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const userProfile = {
        name: `Passenger (+966 ${mobileNumber})`,
        phone: `+966 ${mobileNumber}`,
        role: 'customer' as const,
        token: 'token_' + Date.now(),
      };
      localStorage.setItem('bus_arabia_auth', JSON.stringify(userProfile));
      localStorage.setItem('bus_arabia_user', JSON.stringify(userProfile));
      window.dispatchEvent(new Event('auth-change'));
      setStep('success');

      setTimeout(() => {
        router.push('/');
      }, 1400);
    }, 800);
  };

  const handleSocialLogin = (provider: 'Google' | 'Facebook') => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const userProfile = {
        name: `${provider} Traveler`,
        phone: '+966 50 123 4567',
        role: 'customer' as const,
        token: 'token_' + Date.now(),
      };
      localStorage.setItem('bus_arabia_auth', JSON.stringify(userProfile));
      localStorage.setItem('bus_arabia_user', JSON.stringify(userProfile));
      window.dispatchEvent(new Event('auth-change'));
      setStep('success');

      setTimeout(() => {
        router.push('/');
      }, 1200);
    }, 600);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden font-['Montserrat',sans-serif]">
      {/* Full-bleed Background Hero: Riyadh highway luxury coach bus (Frame 3434) */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/images/hero-bus-clean.png')` }}
      />

      {/* Main Content Area: Left Hero & Full-Height Right Dialog */}
      <div className="relative z-20 min-h-screen w-full flex flex-col lg:flex-row justify-between">
        
        {/* LEFT SECTION (Header + Hero Content) */}
        <div className="flex-1 flex flex-col justify-between p-6 sm:p-10 lg:p-14 lg:mr-[500px] xl:mr-[520px]">
          {/* Top Navigation Bar: Directly overlaid on the sky as designed in Figma */}
          <header className="w-full flex items-center justify-between pb-6">
            <Link href="/" className="inline-block transition-transform hover:scale-105">
              <Image
                src="/images/logo.png"
                alt="Bus Arabia"
                width={170}
                height={55}
                className="h-9 sm:h-11 w-auto object-contain drop-shadow-sm"
                priority
              />
            </Link>

            <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-sm font-medium text-[#1c1b1b]">
              <Link href="/about" className="hover:text-[#b20163] transition-colors">
                About Us
              </Link>
              <Link
                href="/operators"
                className="text-[#b20163] font-semibold border-b-2 border-[#b20163] pb-0.5 transition-colors"
              >
                Our Bus Operators
              </Link>
              <Link href="/faq" className="hover:text-[#b20163] transition-colors">
                FAQ
              </Link>
              <Link href="/contact" className="hover:text-[#b20163] transition-colors">
                Contact Us
              </Link>
              <div className="flex items-center gap-1.5 cursor-pointer text-[#1c1b1b] hover:text-[#b20163]">
                <span>Select Language</span>
              </div>
            </nav>
          </header>

          {/* LEFT Hero Typography (Frame 3429 & Frame 3397) */}
          <div className="my-auto py-8 max-w-[580px]">
            {/* Main Title: EFFORTLESS BOOKING. SEAMLESS TRAVEL. */}
            <h1 className="font-['Barlow_Semi_Condensed',sans-serif] italic font-black text-4xl sm:text-5xl lg:text-[54px] leading-[1.02] text-[#1c1b1b] tracking-tight uppercase mb-2">
              EFFORTLESS BOOKING.<br />
              SEAMLESS TRAVEL.
            </h1>

            {/* Gradient Highlight: BIG SAVINGS GUARANTEED! */}
            <div className="flex flex-col -space-y-3 sm:-space-y-4 mb-8">
              <span className="font-['Barlow_Semi_Condensed',sans-serif] italic font-black text-6xl sm:text-7xl lg:text-[96px] leading-none bg-gradient-to-r from-[#950250] via-[#c2006d] to-[#fa1590] bg-clip-text text-transparent uppercase tracking-tight">
                BIG SAVINGS
              </span>
              <span className="font-['Barlow_Semi_Condensed',sans-serif] italic font-black text-5xl sm:text-6xl lg:text-[80px] leading-none bg-gradient-to-r from-[#b38e36] via-[#d4af37] to-[#e4c25f] bg-clip-text text-transparent uppercase tracking-tight">
                GUARANTEED!
              </span>
            </div>

            {/* Sub Features directly over the background */}
            <div className="flex flex-col gap-4 max-w-[500px]">
              {/* Location Pin */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#950250] to-[#fa1590] flex items-center justify-center text-white shrink-0 shadow-md">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </div>
                <span className="text-[#1c1b1b] font-bold text-base sm:text-lg">
                  Find your Bus with just One Search!
                </span>
              </div>

              {/* Gift Box */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#950250] to-[#fa1590] flex items-center justify-center text-white shrink-0 shadow-md">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36 2.38 3.24L17 10.83 14.92 8H20v6z" />
                  </svg>
                </div>
                <div className="text-base sm:text-lg">
                  <span className="text-[#1c1b1b] font-bold">Your Ride. Your Way. </span>
                  <span className="text-[#b20163] font-black">Travel with us and Save Big!</span>
                </div>
              </div>
            </div>
          </div>

          <div className="h-4" />
        </div>

        {/* RIGHT SECTION: The Dialog (Anchored on the Right with exact Figma Frame 3520 margins: Top: 15px, Right: 16px, Bottom: 15px, Radius: 9-10px, No border stroke) */}
        <div className="w-full lg:w-[500px] xl:w-[520px] lg:fixed lg:right-4 lg:top-3.5 lg:bottom-3.5 lg:h-[calc(100vh-28px)] max-h-[828px] bg-[#fcf9f8] rounded-[10px] shadow-[0_20px_50px_rgba(0,0,0,0.18)] p-7 sm:p-9 lg:p-10 flex flex-col justify-between overflow-y-auto z-40">
          
          <div className="flex-1 flex flex-col justify-center items-center text-center my-auto pt-4 pb-4">
            {/* Bus Arabia Ticket Logo (Figma 1694:61) */}
            <div className="flex justify-center mb-6">
              <Link href="/" className="inline-block transition-transform hover:scale-105">
                <Image
                  src="/images/logo.png"
                  alt="Bus Arabia"
                  width={170}
                  height={58}
                  className="h-12 w-auto object-contain"
                  priority
                />
              </Link>
            </div>

            {/* STEP 1: MOBILE NUMBER & WELCOME (Figma Group 11) */}
            {step === 'mobile' && (
              <div className="w-full flex flex-col items-center animate-fadeIn">
                <h2 className="text-3xl sm:text-[38px] font-extrabold bg-gradient-to-r from-[#950250] via-[#c2006d] to-[#fa1590] bg-clip-text text-transparent mb-2.5">
                  Welcome !
                </h2>
                <p className="text-[#554149] text-sm sm:text-base font-normal max-w-[360px] mb-7 leading-relaxed">
                  Sign in / Sign up below to manage your bookings and explore new journeys.
                </p>

                <form onSubmit={handleSendOtp} className="w-full flex flex-col gap-5 text-left">
                  {/* Mobile Number Label & Input (Figma 1724:2914) */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-bold text-[#4a002e]">
                      Mobile Number
                    </label>
                    <div className="flex items-center gap-3">
                      {/* Saudi Flag + Country Code Pill (Figma 1724:2915, Radius: 8px) */}
                      <div className="flex items-center rounded-lg border border-[#dbbfca] overflow-hidden bg-white shadow-sm shrink-0">
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

                      {/* Number Input Box (Figma 1724:2928, Radius: 8px) */}
                      <input
                        type="tel"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                        placeholder="567990235"
                        maxLength={9}
                        className="flex-1 px-4 py-2.5 rounded-lg border border-[#dbbfca] bg-white text-base font-semibold text-[#1c1b1b] placeholder-[#88717a] shadow-sm outline-none focus:border-[#b20163] focus:ring-2 focus:ring-[#b20163]/20 transition-all"
                      />
                    </div>
                    {error && <p className="text-xs text-red-600 font-semibold mt-1">{error}</p>}
                  </div>

                  {/* Send OTP Button (Figma 1875:1554, Radius: 16px, Border: #DBBFCA) */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-2xl border border-[#dbbfca] font-bold text-base sm:text-lg text-white bg-gradient-to-r from-[#950250] via-[#c2006d] to-[#fa1590] shadow-[0_8px_20px_rgba(230,0,122,0.35)] hover:shadow-[0_12px_28px_rgba(230,0,122,0.5)] active:scale-[0.99] transition-all flex items-center justify-center cursor-pointer disabled:opacity-50 mt-1"
                  >
                    {isSubmitting ? (
                      <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      'Send One-Time Password (OTP)'
                    )}
                  </button>
                </form>

                {/* Divider: ─── or ─── */}
                <div className="w-full flex items-center gap-4 my-6">
                  <div className="flex-1 h-px bg-[#dbbfca]" />
                  <span className="text-sm font-semibold text-[#554149]">or</span>
                  <div className="flex-1 h-px bg-[#dbbfca]" />
                </div>

                {/* Social Login Buttons: Side by Side (Google & Facebook) */}
                <div className="w-full grid grid-cols-2 gap-3 mb-6">
                  {/* Google */}
                  <button
                    type="button"
                    onClick={() => handleSocialLogin('Google')}
                    className="flex flex-col items-center justify-center py-2.5 px-3 bg-white border border-[#dbbfca] rounded-xl hover:bg-gray-50/80 active:scale-[0.98] transition-all shadow-sm cursor-pointer group"
                  >
                    <span className="text-[11px] font-semibold text-[#554149]">Sign in with</span>
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
                    className="flex flex-col items-center justify-center py-2.5 px-3 bg-[#1877f2] border border-[#1877f2] rounded-xl hover:bg-[#166fe5] text-white active:scale-[0.98] transition-all shadow-sm cursor-pointer group"
                  >
                    <span className="text-[11px] font-semibold text-white/90">Sign in with</span>
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
                  By logging in, I understand & agree to Bus Arabia’s{' '}
                  <Link href="/terms" className="text-[#b20163] hover:underline font-bold">
                    Terms of Service
                  </Link>{' '}
                  &{' '}
                  <Link href="/privacy" className="text-[#b20163] hover:underline font-bold">
                    Privacy Policy
                  </Link>
                </p>
              </div>
            )}

            {/* STEP 2: VERIFICATION REQUIRED (Figma Group 12) */}
            {step === 'otp' && (
              <div className="w-full flex flex-col items-center animate-fadeIn">
                <h2 className="text-3xl sm:text-[34px] font-extrabold bg-gradient-to-r from-[#950250] via-[#c2006d] to-[#fa1590] bg-clip-text text-transparent mb-2.5">
                  Verification Required
                </h2>
                <p className="text-[#554149] text-sm sm:text-base font-normal max-w-[360px] mb-8 leading-relaxed">
                  We've sent a 4-digit security code to your Mobile number. Please enter it below to continue.
                </p>

                <form onSubmit={handleVerifyOtp} className="w-full flex flex-col gap-6 items-center">
                  {/* 4 Digit Boxes matching Figma */}
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
                        className="w-14 sm:w-16 h-18 sm:h-20 text-center text-2xl sm:text-3xl font-bold bg-[#f3f4f5] border border-[#dbbfca] rounded-lg shadow-sm text-[#1c1b1b] focus:bg-white focus:border-[#b20163] focus:ring-2 focus:ring-[#b20163]/20 outline-none transition-all"
                      />
                    ))}
                  </div>

                  {/* Timer & Resend */}
                  <div className="flex items-center justify-center gap-2 text-sm text-[#554149]">
                    <Clock className="w-4 h-4 text-[#554149]" />
                    {countdown > 0 ? (
                      <span>
                        Resend in <strong className="text-[#4a002e] font-bold">{formatTimer(countdown)}</strong>
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setCountdown(55)}
                        className="text-[#b20163] font-bold hover:underline cursor-pointer"
                      >
                        Resend OTP Now
                      </button>
                    )}
                  </div>

                  {error && <p className="text-xs text-red-600 font-semibold">{error}</p>}

                  {/* Verify & Login Button (Figma 1875:1554, Radius: 16px, Border: #DBBFCA) */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-2xl border border-[#dbbfca] bg-gradient-to-r from-[#950250] via-[#c2006d] to-[#fa1590] text-white font-bold text-base sm:text-lg shadow-[0_8px_20px_rgba(230,0,122,0.35)] hover:shadow-[0_12px_28px_rgba(230,0,122,0.5)] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-1"
                  >
                    {isSubmitting ? (
                      <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        Verify & Login
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  {/* Back to Sign In Link */}
                  <button
                    type="button"
                    onClick={() => {
                      setStep('mobile');
                      setError('');
                    }}
                    className="flex items-center gap-2 text-[#4a002e] hover:text-[#b20163] font-bold text-sm sm:text-base transition-colors cursor-pointer mt-1"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Sign in/Sign up
                  </button>
                </form>

                {/* Legal Policy Footer */}
                <p className="text-xs text-[#554149] max-w-[360px] leading-relaxed mt-7 text-center font-['Inter',sans-serif]">
                  By logging in, I understand & agree to Bus Arabia’s{' '}
                  <Link href="/terms" className="text-[#b20163] hover:underline font-bold">
                    Terms of Service
                  </Link>{' '}
                  &{' '}
                  <Link href="/privacy" className="text-[#b20163] hover:underline font-bold">
                    Privacy Policy
                  </Link>
                </p>
              </div>
            )}

            {/* STEP 3: SUCCESS STATE */}
            {step === 'success' && (
              <div className="flex flex-col items-center text-center py-10 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-4 animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-[#1c1b1b] mb-2">
                  Welcome to Bus Arabia!
                </h3>
                <p className="text-[#554149] text-sm mb-4">
                  You are now signed in. Redirecting to your journeys...
                </p>
                <div className="w-6 h-6 border-2 border-[#b20163] border-t-transparent rounded-full animate-spin" />
              </div>
            )}

          </div>

          <div className="h-4" />
        </div>

      </div>
    </div>
  );
}
