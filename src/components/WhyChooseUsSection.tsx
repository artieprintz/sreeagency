import React from 'react';
import { ShieldCheck, Wrench, Award, BadgePercent, Clock, SlidersHorizontal } from 'lucide-react';
import { WHY_CHOOSE_US_DATA } from '../config/business';

export const WhyChooseUsSection: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-[#031D49]" />;
      case 'Wrench':
        return <Wrench className="w-6 h-6 text-[#031D49]" />;
      case 'Award':
        return <Award className="w-6 h-6 text-[#031D49]" />;
      case 'BadgePercent':
        return <BadgePercent className="w-6 h-6 text-[#031D49]" />;
      case 'Clock':
        return <Clock className="w-6 h-6 text-[#031D49]" />;
      case 'Sliders':
      default:
        return <SlidersHorizontal className="w-6 h-6 text-[#031D49]" />;
    }
  };

  return (
    <section id="why-us" className="py-16 sm:py-24 bg-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-bold uppercase tracking-wider text-[#082D68] mb-2">
            Our Commitment
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#031D49] tracking-tight">
            Why Choose SREE Agency?
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Dedicated security expertise with dependable service, transparent communication, and genuine care for your property.
          </p>
        </div>

        {/* 6 Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {WHY_CHOOSE_US_DATA.map((item, index) => (
            <div
              key={item.title}
              className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-xs hover:border-[#082D68]/40 transition-colors"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#FFC400]/20 flex items-center justify-center shrink-0">
                  {getIcon(item.iconName)}
                </div>
                <span className="text-xs font-bold text-slate-400">0{index + 1}</span>
              </div>
              <h3 className="text-lg font-bold text-[#031D49] mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
