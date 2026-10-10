import React from 'react';
import { MapPin, Phone, CheckCircle2 } from 'lucide-react';
import { BUSINESS_CONFIG, buildTelUrl } from '../config/business';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Image with authentic technician */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-slate-100">
              <img
                src="/images/about_technician_service_1791636428379.jpg"
                alt="SREE Agency Security Specialist Calibrating CCTV Camera System"
                className="w-full h-[380px] sm:h-[440px] object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-[#031D49]/95 backdrop-blur-md p-4 rounded-xl border border-white/10 text-white text-xs">
                <div className="font-bold text-sm text-[#FFC400] mb-0.5">SREE Agency On-Site Support</div>
                <div className="text-slate-300">Skilled technicians handling clean conduit runs and equipment calibration.</div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Location */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <div className="text-xs font-bold uppercase tracking-wider text-[#082D68]">
              About SREE Agency
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#031D49] tracking-tight">
              Your Trusted Security Partner
            </h2>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              SREE Agency provides security and automation solutions designed to help protect homes, businesses, and commercial properties. From CCTV installation and remote monitoring to gate automation, solar systems, and maintenance, our focus is on dependable products, practical solutions, and customer satisfaction.
            </p>

            {/* Service & Location Specs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#F5F7FA] border border-slate-200/80">
                <div className="flex items-center gap-2 text-xs font-bold text-[#082D68] uppercase mb-1">
                  <MapPin className="w-4 h-4 text-[#082D68]" />
                  <span>Headquarters</span>
                </div>
                <p className="text-sm font-semibold text-[#031D49]">
                  {BUSINESS_CONFIG.location}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Primary hub in Pammal serving residential & commercial complexes.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F5F7FA] border border-slate-200/80">
                <div className="flex items-center gap-2 text-xs font-bold text-[#082D68] uppercase mb-1">
                  <CheckCircle2 className="w-4 h-4 text-[#082D68]" />
                  <span>Service Area</span>
                </div>
                <p className="text-sm font-semibold text-[#031D49]">
                  {BUSINESS_CONFIG.serviceArea}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Pammal, Chromepet, Pallavaram, Tambaram, and greater Chennai.
                </p>
              </div>
            </div>

            {/* Direct Calling Strip */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-sm">
              <span className="text-slate-600 font-medium">Direct phone lines:</span>
              <a
                href={buildTelUrl(BUSINESS_CONFIG.primaryPhone)}
                className="inline-flex items-center gap-1.5 font-bold text-[#031D49] hover:text-[#082D68] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#082D68]" />
                <span>{BUSINESS_CONFIG.primaryPhoneFormatted}</span>
              </a>
              <span className="text-slate-300">·</span>
              <a
                href={buildTelUrl(BUSINESS_CONFIG.secondaryPhone)}
                className="inline-flex items-center gap-1.5 font-bold text-[#031D49] hover:text-[#082D68] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#082D68]" />
                <span>{BUSINESS_CONFIG.secondaryPhoneFormatted}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
