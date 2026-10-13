import React from 'react';
import {
  Shield,
  ShieldCheck,
  Award,
  Wrench,
  MapPin,
  Phone,
  Clock,
  ExternalLink,
  CheckCircle2,
  Users,
  Compass,
  ArrowRight,
} from 'lucide-react';
import { BUSINESS_CONFIG, buildTelUrl, buildWhatsAppUrl } from '../config/business';

interface AboutPageProps {
  onNavigateToContact: () => void;
  onRequestCallback: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigateToContact,
  onRequestCallback,
}) => {
  const values = [
    {
      title: '100% Genuine Branded Equipment',
      desc: 'We strictly configure certified security hardware from Hikvision, CP Plus, Dahua, and Hi-Focus with verifiable manufacturer serials and full warranty support.',
      icon: ShieldCheck,
    },
    {
      title: 'Neat Conduit & Wiring Standards',
      desc: 'Every camera cable is routed through impact-resistant PVC casing or weather-sealed conduit pipes, eliminating unsightly clutter and protecting against pests and weather.',
      icon: Wrench,
    },
    {
      title: 'Zero Hidden Costs or Surprises',
      desc: 'We provide clear, line-item quotations detailing cameras, DVR/NVR channels, storage capacities, power supplies, and cabling distances before commencement.',
      icon: Award,
    },
    {
      title: 'Dedicated Local Chennai Support',
      desc: 'Headquartered in Pammal, our field technicians arrive quickly for surveys, installations, urgent troubleshooting, and preventative AMC checkups.',
      icon: Compass,
    },
  ];

  return (
    <div className="bg-[#F5F7FA] text-[#14213D] min-h-screen">
      {/* Page Header Banner */}
      <section className="bg-[#031D49] text-white py-14 sm:py-20 relative overflow-hidden border-b border-[#082D68]">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FFC400_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#FFC400] text-xs font-semibold uppercase tracking-wider mb-4">
            <Shield className="w-4 h-4 text-[#FFC400]" />
            <span>About SREE Agency</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            Protecting What Matters Most
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Your trusted local partner for CCTV camera installations, automated gates, solar panels, and security maintenance in Pammal and throughout Chennai.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              onClick={onNavigateToContact}
              className="px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#031D49] bg-[#FFC400] hover:bg-[#ffcd20] rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Get a Free Quote
            </button>
            <button
              onClick={onRequestCallback}
              className="px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-colors cursor-pointer"
            >
              Request a Callback
            </button>
          </div>
        </div>
      </section>

      {/* Main Narrative & Story Section */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Side */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100 group">
              <img
                src="/images/about_technician_service_1791636428379.jpg"
                alt="SREE Agency Skilled CCTV Installation Specialist"
                className="w-full h-[400px] sm:h-[480px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#031D49]/90 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 bg-[#031D49]/95 backdrop-blur-md p-5 rounded-2xl border border-white/15 text-white">
                <div className="text-sm font-bold text-[#FFC400]">SREE Agency Team Guarantee</div>
                <div className="text-xs text-slate-300 mt-1">
                  Over a decade of hands-on expertise securing villas, commercial complexes, and industrial plants across Chennai.
                </div>
              </div>
            </div>
          </div>

          {/* Text Content Side */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs font-bold uppercase tracking-wider text-[#082D68]">
              Our Foundation & Philosophy
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#031D49] tracking-tight leading-snug">
              Secure Today, Safe Tomorrow!
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              Founded with the objective of bringing dependable, high-definition electronic surveillance and home automation to homeowners and business enterprises in Chennai, <strong>SREE Agency</strong> has grown to become one of Pammal's most trusted security solutions providers.
            </p>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              We understand that true premises security depends not merely on having cameras on a wall, but on thoughtful system engineering: correct lens focal lengths, elimination of blind spots, tamper-proof conduit wiring, reliable surveillance-grade storage, and intuitive mobile applications that allow you to check in on your property from anywhere, anytime.
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-200">
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                <div className="text-2xl sm:text-3xl font-black text-[#031D49]">100%</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Genuine Branded Equipment</div>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                <div className="text-2xl sm:text-3xl font-black text-[#082D68]">5.0 ★</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Verified Google Rating</div>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs col-span-2 sm:col-span-1">
                <div className="text-2xl sm:text-3xl font-black text-emerald-700">Same-Day</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Local Service Callouts</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Core Pillars Section */}
      <section className="py-16 sm:py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs font-bold uppercase tracking-wider text-[#082D68] mb-2">
              Our Workmanship Principles
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#031D49] tracking-tight">
              Why Customers Rely on SREE Agency
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Every project is carried out with meticulous care, clean execution, and customer-first support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.title}
                  className="p-6 rounded-2xl bg-[#F5F7FA] border border-slate-200 flex flex-col justify-between hover:border-[#082D68]/40 transition-colors shadow-xs"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#031D49] text-[#FFC400] flex items-center justify-center mb-5 shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-[#031D49] mb-2 leading-snug">
                      {val.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {val.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Office, Workshop & Coverage Details */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#082D68]">
              <MapPin className="w-3.5 h-3.5" />
              <span>Location & Contact Hub</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#031D49]">
              Visit or Contact Our Pammal Office
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              We are located in Pammal, Chennai, providing swift on-site surveying and service dispatch across Chromepet, Pallavaram, Tambaram, Pozhichalur, and Greater Chennai.
            </p>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#082D68] shrink-0 mt-0.5" />
                <div>
                  <strong>Address:</strong> {BUSINESS_CONFIG.location}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#082D68] shrink-0" />
                <div>
                  <strong>Phone:</strong> {BUSINESS_CONFIG.primaryPhoneFormatted} / {BUSINESS_CONFIG.secondaryPhoneFormatted}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#082D68] shrink-0" />
                <div>
                  <strong>Hours:</strong> {BUSINESS_CONFIG.businessHoursNote}
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href={BUSINESS_CONFIG.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#031D49] hover:bg-[#082D68] rounded-xl transition-colors flex items-center gap-2 shadow-xs"
              >
                <span>View on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#FFC400]" />
              </a>

              <a
                href={BUSINESS_CONFIG.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 text-xs font-semibold text-[#031D49] bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl transition-colors flex items-center gap-2"
              >
                <span>Get Directions</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#F5F7FA] p-6 rounded-2xl border border-slate-200 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#031D49] text-[#FFC400] mx-auto flex items-center justify-center font-black text-xl">
              5.0
            </div>
            <div>
              <h3 className="font-bold text-[#031D49] text-base">Verified Google Business Profile</h3>
              <p className="text-xs text-slate-500 mt-1">
                "Sree Agency CCTV CAMERA installation and service"
              </p>
            </div>
            <p className="text-xs text-slate-600 italic">
              "Completed the installation in a very neat and professional manner. Clean wiring, well-organized, and properly planned." — Sunil Dharan, Local Guide
            </p>
            <button
              onClick={onNavigateToContact}
              className="w-full py-3 text-xs font-bold uppercase tracking-wider text-[#031D49] bg-[#FFC400] hover:bg-[#ffcd20] rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              Get Free Site Survey
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
