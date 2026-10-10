import React from 'react';
import { MessageSquare, PhoneCall, Check, ArrowUpRight } from 'lucide-react';
import { SERVICES_DATA, buildWhatsAppUrl, ServiceItem } from '../config/business';

interface ServicesSectionProps {
  onSelectServiceForCallback: (serviceName: string) => void;
  onSelectServiceForQuote: (serviceName: string) => void;
  onNavigateToServices?: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForCallback,
  onSelectServiceForQuote,
  onNavigateToServices,
}) => {
  return (
    <section id="services" className="py-16 sm:py-24 bg-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-bold uppercase tracking-wider text-[#082D68] mb-2">
            Our Core Offerings
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#031D49] tracking-tight">
            Comprehensive Security & Installation Services
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Tailored security hardware, professional cabling, and dedicated maintenance designed for residences, commercial shops, and industrial properties in Chennai.
          </p>
        </div>

        {/* 5 Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service: ServiceItem, idx: number) => {
            const isFeatured = idx === 0; // First service (CCTV) can occupy normal or marquee prominence
            return (
              <div
                key={service.id}
                className={`bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between ${
                  isFeatured ? 'md:col-span-2 lg:col-span-1 border-slate-300' : ''
                }`}
              >
                {/* Image Container with Fallback */}
                <div>
                  <div className="relative h-52 sm:h-56 bg-slate-100 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 right-3 bg-[#031D49]/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md backdrop-blur-sm">
                      SREE Agency
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#031D49] tracking-tight mb-2.5">
                      {service.name}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-5">
                      {service.shortDescription}
                    </p>

                    {/* Features List */}
                    <div className="space-y-2 mb-6 border-t border-slate-100 pt-4">
                      {service.features.map((feat) => (
                        <div key={feat} className="flex items-start gap-2 text-xs text-slate-700">
                          <Check className="w-3.5 h-3.5 text-[#082D68] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="p-6 pt-0 bg-white border-t border-slate-100 mt-auto space-y-2.5">
                  <div className="grid grid-cols-2 gap-2">
                    {/* Request a Quote Button */}
                    <button
                      onClick={() => onSelectServiceForQuote(service.name)}
                      className="w-full py-2.5 px-3 text-xs font-semibold text-[#031D49] bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer text-center"
                    >
                      Request Quote
                    </button>

                    {/* Request a Callback Button */}
                    <button
                      onClick={() => onSelectServiceForCallback(service.name)}
                      className="w-full py-2.5 px-3 text-xs font-semibold text-[#031D49] bg-[#FFC400] hover:bg-[#ffcd20] rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <PhoneCall className="w-3 h-3" />
                      <span>Callback</span>
                    </button>
                  </div>

                  {/* WhatsApp Enquiry Link */}
                  <a
                    href={buildWhatsAppUrl(service.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp Enquiry</span>
                    <ArrowUpRight className="w-3 h-3 text-emerald-600" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* View Full Services Page CTA Banner */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm max-w-xl mx-auto">
            <div className="text-left flex-1">
              <div className="text-xs font-bold uppercase tracking-wider text-[#082D68]">Looking for technical specifications?</div>
              <div className="text-sm font-semibold text-[#031D49]">View our full dedicated Services Page with specs & FAQs</div>
            </div>
            {onNavigateToServices && (
              <button
                onClick={onNavigateToServices}
                className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#031D49] hover:bg-[#082D68] rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer whitespace-nowrap"
              >
                View Full Services Page →
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
