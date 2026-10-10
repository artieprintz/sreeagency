import React, { useState } from 'react';
import { Star, ExternalLink, ShieldCheck, MapPin, CheckCircle2 } from 'lucide-react';
import { BUSINESS_CONFIG, VERIFIED_GOOGLE_REVIEWS } from '../config/business';

export const GoogleReviewsSection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'cctv' | 'recent'>('all');

  const filteredReviews = VERIFIED_GOOGLE_REVIEWS.filter((rev) => {
    if (filter === 'cctv') return rev.text.toLowerCase().includes('cctv');
    if (filter === 'recent') return rev.relativeTime.includes('2') || rev.relativeTime.includes('4');
    return true;
  });

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#082D68] mb-2">
            <ShieldCheck className="w-4 h-4 text-[#082D68]" />
            <span>Verified Google Customer Reviews</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#031D49] tracking-tight">
            What Our Customers Say
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Real reviews from our official Google Maps listing for SREE Agency in Pammal, Chennai.
          </p>
        </div>

        {/* Rating Showcase Banner */}
        <div className="max-w-2xl mx-auto mb-10 p-5 sm:p-6 rounded-2xl bg-[#F5F7FA] border border-slate-200 text-center shadow-xs">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <div className="flex items-center gap-3">
              <span className="text-4xl sm:text-5xl font-black text-[#031D49] tabular-nums">5.0</span>
              <div className="text-left">
                <div className="flex items-center text-[#FFC400]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#FFC400] text-[#FFC400]" />
                  ))}
                </div>
                <div className="text-xs font-bold text-slate-700 mt-0.5">Google Rating</div>
              </div>
            </div>

            <div className="hidden sm:block h-10 w-px bg-slate-200" />

            <div className="text-xs text-slate-600 text-left">
              <div className="flex items-center gap-1.5 font-bold text-[#031D49]">
                <MapPin className="w-3.5 h-3.5 text-[#082D68]" />
                <span>Sree Agency CCTV CAMERA installation and service</span>
              </div>
              <div className="text-slate-500 mt-0.5">
                Pammal, Chennai · Verified Google Business Profile Reviews
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Filter Control */}
        <div className="flex items-center justify-center gap-1 p-1 bg-slate-100 rounded-xl max-w-xs mx-auto mb-10">
          <button
            onClick={() => setFilter('all')}
            className={`flex-1 py-1.5 px-3 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              filter === 'all'
                ? 'bg-white text-[#031D49] shadow-xs'
                : 'text-slate-600 hover:text-black'
            }`}
          >
            All Reviews ({VERIFIED_GOOGLE_REVIEWS.length})
          </button>
          <button
            onClick={() => setFilter('cctv')}
            className={`flex-1 py-1.5 px-3 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              filter === 'cctv'
                ? 'bg-white text-[#031D49] shadow-xs'
                : 'text-slate-600 hover:text-black'
            }`}
          >
            CCTV Works
          </button>
          <button
            onClick={() => setFilter('recent')}
            className={`flex-1 py-1.5 px-3 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              filter === 'recent'
                ? 'bg-white text-[#031D49] shadow-xs'
                : 'text-slate-600 hover:text-black'
            }`}
          >
            Recent
          </button>
        </div>

        {/* Genuine Google Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.authorName}
              className="p-6 rounded-2xl bg-[#F5F7FA] border border-slate-200 flex flex-col justify-between hover:border-[#082D68]/30 transition-colors shadow-xs"
            >
              <div>
                {/* Author Info & Rating */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full text-white text-sm font-bold flex items-center justify-center shrink-0 shadow-xs"
                      style={{ backgroundColor: rev.avatarBg || '#031D49' }}
                    >
                      {rev.avatarInitial}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#031D49] leading-tight">
                        {rev.authorName}
                      </h4>
                      {rev.badge && (
                        <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                          <span>{rev.badge}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center text-[#FFC400]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#FFC400] text-[#FFC400]" />
                      ))}
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
                      {rev.relativeTime}
                    </span>
                  </div>
                </div>

                {/* Review Prose */}
                <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line mb-4 font-normal">
                  "{rev.text}"
                </div>
              </div>

              {/* Card Footer with Verification Attribution */}
              <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1 text-emerald-700 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Google Review</span>
                </span>
                <span className="font-semibold text-slate-700">Google Maps</span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons linking directly to official Google Maps listing */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <a
            href={BUSINESS_CONFIG.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#031D49] hover:bg-[#082D68] rounded-xl transition-colors flex items-center gap-2 shadow-sm"
          >
            <span>Read All Reviews on Google</span>
            <ExternalLink className="w-4 h-4 text-[#FFC400]" />
          </a>

          <a
            href={BUSINESS_CONFIG.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#031D49] bg-[#FFC400] hover:bg-[#ffcd20] rounded-xl transition-colors flex items-center gap-2 shadow-sm"
          >
            <span>Write a Google Review</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
