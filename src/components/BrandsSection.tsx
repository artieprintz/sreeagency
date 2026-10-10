import React from 'react';
import { BRANDS_DATA } from '../config/business';

export const BrandsSection: React.FC = () => {
  return (
    <section id="brands" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-[#082D68] mb-2">
            Equipment & Systems
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#031D49] tracking-tight">
            Brands We Deal With
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            We supply, install, and service hardware from industry-recognized video surveillance and security brands.
          </p>
        </div>

        {/* Brand Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {BRANDS_DATA.map((brand) => (
            <div
              key={brand.name}
              className="p-6 rounded-xl border border-slate-200 bg-white hover:border-[#082D68]/40 transition-colors flex flex-col items-center text-center group shadow-xs"
            >
              {/* Brand Emblem */}
              <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[#031D49] font-black text-lg mb-4 group-hover:bg-[#031D49] group-hover:text-[#FFC400] transition-colors">
                {brand.name.substring(0, 2).toUpperCase()}
              </div>
              <h3 className="font-bold text-base text-[#031D49] mb-1">
                {brand.name}
              </h3>
              <p className="text-xs text-slate-500 font-medium mb-2">
                {brand.tagline}
              </p>
              <p className="text-[11px] text-slate-500 leading-snug">
                {brand.description}
              </p>
            </div>
          ))}
        </div>

        {/* Transparent Disclaimer */}
        <p className="mt-8 text-center text-xs text-slate-400">
          All brand names, trademarks, and logos are property of their respective owners and used here for hardware identification and service capability reference.
        </p>
      </div>
    </section>
  );
};
