import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PROCESS_STEPS_DATA } from '../config/business';

export const HowItWorksSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-[#031D49] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-bold uppercase tracking-wider text-[#FFC400] mb-2">
            Simple Process
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            How It Works
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            A straightforward 4-step workflow from initial enquiry to active property protection.
          </p>
        </div>

        {/* Responsive Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {PROCESS_STEPS_DATA.map((item, index) => (
            <div
              key={item.step}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 relative hover:border-[#FFC400]/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black text-[#FFC400] tracking-tight">
                    {item.step}
                  </span>
                  {index < PROCESS_STEPS_DATA.length - 1 && (
                    <ArrowRight className="hidden md:block w-4 h-4 text-white/30" />
                  )}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
