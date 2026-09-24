'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Locale, translations } from '@/lib/translations';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface FooterProps {
  locale: Locale;
}

export function Footer({ locale }: FooterProps) {
  const t = translations[locale];
  const isAr = locale === 'ar';

  const socialChannels = [
    {
      name: 'WhatsApp',
      href: 'https://wa.me/966500000000',
      title: 'Contact Bus Arabia on WhatsApp',
      icon: (
        <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.299.144.347.491 1.2.534 1.287.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824z" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/busarabia',
      title: 'Follow Bus Arabia on Instagram',
      icon: (
        <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      href: 'https://www.youtube.com/@busarabia',
      title: 'Subscribe to Bus Arabia on YouTube',
      icon: (
        <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/company/busarabia',
      title: 'Connect with Bus Arabia on LinkedIn',
      icon: (
        <svg className="w-[16px] h-[16px] fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/busarabia',
      title: 'Follow Bus Arabia on Facebook',
      icon: (
        <svg className="w-[17px] h-[17px] fill-current" viewBox="0 0 24 24">
          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
        </svg>
      ),
    },
    {
      name: 'X (Twitter)',
      href: 'https://x.com/busarabia',
      title: 'Follow Bus Arabia on Twitter',
      icon: (
        <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z" />
        </svg>
      ),
    },
  ];

  const paymentCards = [
    { name: 'Visa', label: 'VISA', icon: '/images/figma_export/payments/2136-1847.png' },
    { name: 'Mada', label: 'MADA PAY', icon: '/images/figma_export/payments/2136-1867.png' },
    { name: 'STC Pay', label: 'STC PAY', icon: '/images/figma_export/payments/2136-1861.png' },
    { name: 'Mastercard', label: 'MASTERCARD', icon: '/images/figma_export/payments/2136-1849.png' },
    { name: 'American Express', label: 'AMERICAN EXPRESS', icon: '/images/figma_export/payments/2136-1851.png', small: true },
    { name: 'Google Pay', label: 'GOOGLE PAY', icon: '/images/figma_export/payments/2136-1858.png' },
    { name: 'Samsung Pay', label: 'SAMSUNG PAY', icon: '/images/figma_export/payments/2136-1854.png' },
    { name: 'Apple Pay', label: 'APPLE PAY', icon: '/images/figma_export/payments/2136-1856.png' },
    { name: 'Union Pay', label: 'UNION PAY', icon: '/images/figma_export/payments/2136-1869.png' },
  ];

  return (
    <footer
      className="relative w-full max-w-[1280px] mx-auto h-[619px] overflow-hidden select-none bg-gradient-to-r from-[#950250] from-0% via-[#c2006d] via-[45%] to-[#fa1590] to-100% pt-[47px]"
      id="main-footer"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* =====================================================
          MAIN WHITE FOOTER CARD (Figma Frame 2035:1436: 1132px x 417px)
          Position: centered in 1280px, x: 74px, y: 47px, rounded: 42px, bg: #fcf9f8
      ====================================================== */}
      <div className="relative mx-auto w-[1132px] h-[417px] rounded-[42px] bg-[#fcf9f8] shadow-2xl">
        {/* =================================================
            COLUMN 1 — LOGO ASSET (278px x 109px) + SOCIAL ROW (y: 109px)
            Figma Company Info (2035:1437): x: 50px, y: 48px
        ================================================== */}
        <div className="absolute top-[48px] left-[50px] w-[278px] flex flex-col">
          {/* Pure Figma Logo Brand Image (278px x 109px) */}
          <Link
            href="/"
            className="block w-[278px] h-[109px] relative"
            aria-label="Bus Arabia Home"
            title="Bus Arabia Home"
          >
            <Image
              src="/images/figma_export/2035-1438.png"
              alt="Bus Arabia"
              width={278}
              height={109}
              className="w-[278px] h-[109px] object-contain select-none pointer-events-none"
              priority
            />
          </Link>

          {/* Real Social Buttons with Gold Gradient & Vector Icons (Frame 3424) */}
          <div className="flex items-center gap-[11.27px] mt-[10px] h-[39.8px]">
            {socialChannels.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                title={s.title}
                className="w-[37.55px] h-[37.55px] rounded-full bg-gradient-to-r from-[#ffe26d] via-[#fdea9d] to-[#d9b747] text-[#1c1b1b] flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xs shrink-0"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* =================================================
            MIDDLE COLUMNS — REAL SEMANTIC HTML LINKS
            Figma Frame 34 (2035:1453): x: 370px, y: 53px, gap: 48px
        ================================================== */}
        <div className="absolute top-[53px] left-[370px] flex items-start gap-[48px]">
          {/* Column 2: Company */}
          <div className="w-[134px]">
            <h4
              className="text-[20.88px] font-bold text-[#1c1b1b] leading-[25.06px] mb-[17.6px]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {t.footer.company}
            </h4>

            <ul
              className="flex flex-col gap-[17.9px] text-[17.9px] font-medium text-[#554149] leading-[21.48px]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <li>
                <Link
                  href="/about"
                  className="hover:text-[#b20163] transition-colors"
                  aria-label="About Us"
                >
                  {t.footer.aboutUs}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-[#b20163] transition-colors"
                  aria-label="Contact Us"
                >
                  {t.footer.contactUs}
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-[#b20163] transition-colors"
                  aria-label="FAQ"
                >
                  {t.footer.faq}
                </Link>
              </li>
              <li className="leading-[21.48px]">
                <Link
                  href="/operators"
                  className="hover:text-[#b20163] transition-colors"
                  aria-label="Our Bus Operators"
                >
                  {t.footer.ourBusOperators}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Information */}
          <div className="w-[160px]">
            <h4
              className="text-[20.88px] font-bold text-[#1c1b1b] leading-[25.06px] mb-[17.6px]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {t.footer.information}
            </h4>

            <ul
              className="flex flex-col gap-[17.9px] text-[17.9px] font-medium text-[#554149] leading-[21.48px]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-[#b20163] transition-colors"
                  aria-label="Privacy Policy"
                >
                  {t.footer.privacyPolicy}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-[#b20163] transition-colors"
                  aria-label="Terms of Service"
                >
                  {t.footer.termsOfService}
                </Link>
              </li>
              <li className="leading-[21.48px]">
                <Link
                  href="/cancellation-policy"
                  className="hover:text-[#b20163] transition-colors"
                  aria-label="Cancellation, Modification & Refund Policy"
                >
                  {t.footer.cancellationPolicy}
                </Link>
              </li>
              <li>
                <Link
                  href="/cookie-policy"
                  className="hover:text-[#b20163] transition-colors"
                  aria-label="Cookie Policy"
                >
                  {t.footer.cookiePolicy}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* =================================================
            COLUMN 4 — WE ACCEPT & 9 REAL PAYMENT CARDS (REAL TEXT + IMAGE ASSET)
            Figma Frame 3639 (2137:3534): x: 821px, y: 48px, w: 272.67px
        ================================================== */}
        <div className="absolute top-[48px] left-[821px] w-[273px]">
          <h4
            className="text-[20px] font-semibold text-[#550036] uppercase leading-[16.8px] mb-[28px] tracking-[0.5px]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {t.footer.weAccept}
          </h4>

          {/* 3x3 Payment Badges Grid: Real Card Box Image Asset + Real Text Label */}
          <div className="grid grid-cols-3 gap-x-[16px] gap-y-[20px] w-[273px]">
            {paymentCards.map((card) => (
              <div
                key={card.name}
                className="flex flex-col items-center group cursor-pointer"
                title={`We accept ${card.name}`}
              >
                {/* Pure Card Box Asset (White pill with provider logo) */}
                <div className="w-[70.67px] h-[50px] relative rounded-[12px] overflow-hidden group-hover:scale-105 transition-transform">
                  <Image
                    src={card.icon}
                    alt={card.name}
                    fill
                    className="object-contain pointer-events-none select-none"
                    priority
                  />
                </div>
                {/* Real HTML Text Label below Card */}
                <span
                  className={`mt-[4px] font-semibold text-[#1c1b1b] text-center leading-[17px] tracking-tight uppercase whitespace-nowrap ${
                    card.small ? 'text-[8px]' : 'text-[10px]'
                  }`}
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {card.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* =================================================
            OPERATOR LOGIN BUTTON — REAL HTML BUTTON WITH REAL TEXT
            Figma Button 2213:3015: x: 825px, y: 370px, w: 200px, h: 34.07px
        ================================================== */}
        <a
          href="#operator-portal"
          className="absolute top-[370px] left-[825px] inline-flex items-center justify-between w-[200px] h-[34.07px] pl-[8.5px] pr-[8.5px] rounded-full bg-gradient-to-r from-[#ffe26d] via-[#fdea9d] to-[#d9b747] text-[#1c1b1b] shadow-xs hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group"
          aria-label="Bus Operator Sign in / Sign up"
          title="Bus Operator Sign in / Sign up"
        >
          <span
            className="text-[10.48px] font-semibold whitespace-nowrap text-[#1c1b1b] leading-[15.72px]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {t.footer.operatorLogin}
          </span>
          <div className="w-[18.34px] h-[18.34px] rounded-full bg-[#1c1b1b] text-white flex items-center justify-center shrink-0">
            {isAr ? (
              <ArrowLeft className="w-2.5 h-2.5 text-white" />
            ) : (
              <ArrowRight className="w-2.5 h-2.5 text-white transition-transform group-hover:translate-x-0.5" />
            )}
          </div>
        </a>
      </div>

      {/* =====================================================
          REAL COPYRIGHT & UNIFIED NATIONAL NUMBER TEXT
          Figma Frame 3640 (2137:5503): x: 380.5px, y: 499px, w: 519px, h: 78px
      ====================================================== */}
      <div className="absolute top-[499px] left-1/2 -translate-x-1/2 flex flex-col items-center justify-center text-center text-white space-y-[6px]">
        <p
          className="text-[16.29px] font-semibold tracking-wide text-white leading-[20px] whitespace-nowrap"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          {t.footer.copyright}
        </p>
        <p
          className="text-[16.29px] font-semibold tracking-wider text-white leading-[20px] whitespace-nowrap"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          {t.footer.unifiedNumber}
        </p>
      </div>
    </footer>
  );
}
