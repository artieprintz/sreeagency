import React from 'react';
import { Phone, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { BUSINESS_CONFIG, buildTelUrl } from '../config/business';

interface HeroSectionProps {
  onGetQuote: () => void;
  onRequestCallback: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onGetQuote, onRequestCallback }) => {
  const trustIndicators = [
    'Quality Products',
    'Expert Technicians',
    'Trusted Service',
    'Affordable Pricing',
  ];

  return (
    <section className="relative bg-[#031D49] text-white overflow-hidden border-b border-[#082D68]">
      {/* Background architectural pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FFC400_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14 sm:py-20 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Headlines & Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Tagline kicker */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#FFC400] text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-[#FFC400]" />
              <span>{BUSINESS_CONFIG.tagline}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight lg:leading-tight">
              Complete Security Solutions for Your Home & Business
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Protect what matters most with reliable CCTV surveillance, smart gate automation, solar solutions, and professional security system maintenance from SREE Agency.
            </p>

            {/* Location Notice */}
            <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#FFC400]" />
              <span>Serving Pammal, Chromepet, Pallavaram, and across Chennai</span>
            </div>

            {/* 3 Call to Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              {/* Primary CTA */}
              <button
                onClick={onGetQuote}
                className="px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-[#031D49] bg-[#FFC400] hover:bg-[#ffcd20] rounded-xl transition-all shadow-md hover:shadow-xl active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <span>Get a Free Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Secondary CTA */}
              <a
                href={buildTelUrl(BUSINESS_CONFIG.primaryPhone)}
                className="px-5 py-3.5 text-sm font-semibold text-white bg-[#082D68] hover:bg-[#0c3982] border border-white/20 rounded-xl transition-colors flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <Phone className="w-4 h-4 text-[#FFC400]" />
                <span>Call Us Now</span>
              </a>

              {/* Third CTA */}
              <button
                onClick={onRequestCallback}
                className="px-5 py-3.5 text-sm font-semibold text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors cursor-pointer"
              >
                <span>Request a Callback</span>
              </button>
            </div>

            {/* Trust Indicator Strip */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {trustIndicators.map((indicator) => (
                <div key={indicator} className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-[#FFC400] shrink-0" />
                  <span>{indicator}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-[#082D68] group">
              <img
                src="/images/hero_security_cctv_1791636369635.jpg"
                alt="SREE Agency Professional CCTV Security Monitoring"
                className="w-full h-[340px] sm:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {/* Subtle gradient vignette scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#031D49]/90 via-[#031D49]/30 to-transparent pointer-events-none" />

              {/* Floating feature badge with Official Logo */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#031D49]/95 backdrop-blur-md p-3.5 rounded-xl border border-white/15 text-xs text-slate-200 flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-white p-1 border border-[#FFC400]/50 shadow-md shrink-0 flex items-center justify-center">
                  <img
                    src="/images/logo.png"
                    alt="SREE Agency Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-bold text-white text-sm truncate">SREE Agency</span>
                    <span className="text-[#FFC400] font-semibold text-[11px] shrink-0">Pammal, Chennai</span>
                  </div>
                  <div className="text-slate-300 text-[11px] truncate">
                    CCTV Installation · Gate Automation · Solar · AMC
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
