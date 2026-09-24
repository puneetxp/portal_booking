'use client';

import React from 'react';
import Image from 'next/image';
import { Locale, translations } from '@/lib/translations';

interface MakkahPackagesProps {
  locale: Locale;
}

export function MakkahPackages({ locale }: MakkahPackagesProps) {
  const t = translations[locale];
  const isAr = locale === 'ar';

  /*
   * Figma: Group 8 (1884:259) — deepest layer analysis
   * ─────────────────────────────────────────────────────
   * The true source image lives inside Rectangle nodes 1884:261 / 1884:263
   * (fill_1peukxw, scaleMode FIT). It is a single 2098×750 px composited PNG
   * that already contains:
   *   • Dark maroon background with Arabic geometric pattern (left panel)
   *   • Kaaba photo (top-right) + Madinah mosque photo (bottom-right)
   *   • Gold gradient text "MAKKAH & MADINAH PACKAGES"
   *   • White subtitle + gold pill button
   *
   * The two "Bus Fleet" frames (1884:260, 1884:262) are identical stacked
   * copies of this image, rotated 180° with a dark overlay + drop-shadow.
   * The "Background+Shadow" frame (1884:264) adds only the left-side magenta
   * gradient and positions the text/button absolutely on top.
   *
   * → The banner image MUST come from banner-makkah-figma.png (the raw
   *   Rectangle fill), NOT banner-makkah.png (which was missing the Arabic
   *   pattern and had ghost text bleed-through from the duplicate layer).
   *
   * Container: 1140×408 px  |  border-radius: 16px  |  shadow: 0 4px 8px rgba(0,0,0,0.21)
   */

  // For Arabic locale the button arrow flips; image object-position stays right.
  const bannerSrc = isAr ? '/images/banner-makkah-ar.png' : '/images/banner-makkah-figma.png';

  return (
    <section className="w-full max-w-[1140px] mx-auto px-4 lg:px-0 my-10 sm:my-14 lg:my-16">
      {/* Figma: 1140×408, corner-radius 16px (not 40px!), shadow 0 4 8 */}
      <div
        className="relative w-full overflow-hidden group"
        style={{
          aspectRatio: '1140 / 408',
          borderRadius: '16px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.21)',
        }}
      >
        {/* The composited banner — already contains BG pattern, photos, text & button */}
        <Image
          src={bannerSrc}
          alt={isAr ? 'باقات مكة والمدينة' : 'Makkah & Madinah Packages'}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 1140px"
          className="object-cover object-left select-none transition-transform duration-700 group-hover:scale-[1.02]"
        />

        {/* Accessible CTA — invisible hotspot over the button in the image */}
        <a
          href="#search-box"
          className={`absolute bottom-[8%] ${isAr ? 'right-[4.5%]' : 'left-[4.5%]'} w-[23%] h-[13%] rounded-full opacity-0 focus:opacity-100 focus:ring-4 focus:ring-amber-300 z-10`}
          aria-label={t.makkahBanner.cta}
        />

        {/* SEO semantic text (screen-reader only) */}
        <div className="sr-only">
          <h2>{t.makkahBanner.title}</h2>
          <p>{t.makkahBanner.subtitle}</p>
        </div>
      </div>
    </section>
  );
}

