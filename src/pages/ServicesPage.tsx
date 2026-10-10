import React, { useState } from 'react';
import {
  Shield,
  Check,
  PhoneCall,
  MessageSquare,
  ArrowRight,
  ArrowUpRight,
  Wrench,
  Cpu,
  Zap,
  HelpCircle,
  ChevronDown,
} from 'lucide-react';
import { SERVICES_DATA, buildWhatsAppUrl, buildTelUrl, BUSINESS_CONFIG, ServiceItem } from '../config/business';

interface ServicesPageProps {
  onNavigateToContact: (serviceName?: string, tab?: 'quote' | 'callback' | 'query') => void;
  onRequestCallback: (serviceName?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onNavigateToContact,
  onRequestCallback,
}) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const serviceSpecs: Record<string, { suitableFor: string[]; techSpecs: string[]; inclusions: string[] }> = {
    'cctv-installation': {
      suitableFor: ['Individual Homes & Villas', 'Apartment Buildings & Communities', 'Retail Shops & Showrooms', 'Offices & Warehouses'],
      techSpecs: ['2MP to 8MP (4K) High Definition Resolution', 'ColorVu & Smart Dual Light Night Vision', 'H.265+ Video Compression for extended storage', 'Weatherproof IP66 / IP67 outdoor rating'],
      inclusions: ['Complete on-site site survey & camera positioning', 'High-quality copper video & power cabling', 'Conduit casing & weather-tight junction boxes', 'DVR / NVR setup & Mobile remote viewing app configuration'],
    },
    'wifi-camera-setup': {
      suitableFor: ['Apartments & Flats', 'Small Retail Shops & Boutiques', 'Indoor Baby / Elderly Monitoring', 'Temporary Project Sites'],
      techSpecs: ['360° Horizontal Pan & 90° Vertical Tilt (PTZ)', 'High-gain Wi-Fi Antennas (2.4GHz)', 'AI Smart Human Detection & Auto-Tracking', 'Up to 256GB MicroSD & Optional Cloud Storage'],
      inclusions: ['Camera mounting on ceiling or wall bracket', 'Wi-Fi router pairing & signal strength test', 'Two-way audio microphone & speaker test', 'Multiple family phone app pairing & user training'],
    },
    'gate-automation': {
      suitableFor: ['Independent Houses & Villas', 'Gated Communities', 'Commercial Entrances', 'Industrial Factories'],
      techSpecs: ['Supports gate weights from 400kg to 2000kg', 'Heavy-duty oil-bath / grease motor gearbox', 'Infrared anti-collision safety photocells', 'Manual emergency key release during power cuts'],
      inclusions: ['Motor foundation mounting & galvanized gear rack installation', 'Limit switch alignment & magnetic sensors', 'Programming of wireless remote keyfobs', 'Safety stop test & obstacle sensitivity tuning'],
    },
    'solar-panel-installation': {
      suitableFor: ['Residential Rooftops', 'Commercial Complexes & Clinics', 'Educational Institutions', 'Small Manufacturing Units'],
      techSpecs: ['Mono-PERC / TopCon High Efficiency Solar PV Panels', 'Grid-tie & Hybrid Inverter Systems', 'Anti-corrosive Aluminum / GI Mounting Structures', 'Lightning arrestor & dedicated solar earthing'],
      inclusions: ['Shadow analysis & rooftop layout design', 'Panel structure anchoring & neat DC wiring', 'Net-metering liaison assistance with EB/TANGEDCO', 'Generation monitoring app configuration'],
    },
    'repair-and-maintenance': {
      suitableFor: ['Existing CCTV Owners', 'Apartment Associations (RWA)', 'Commercial Offices & Banks', 'Industrial Sites'],
      techSpecs: ['Multi-brand support: Hikvision, CP Plus, Dahua, Hi-Focus', 'Diagnostic cable multimeters & video testers', 'Hard drive recovery & sector replacement', 'Annual Maintenance Contract (AMC) schedules'],
      inclusions: ['No-video signal and power surge troubleshooting', 'Camera realignment & lens cleaning', 'Recording backup & time-drift calibration', 'Quarterly preventative maintenance visits under AMC'],
    },
  };

  const faqs = [
    {
      q: 'How many CCTV cameras do I need for my house or shop?',
      a: 'A typical independent house usually requires 4 to 8 cameras (covering the main gate, parking, backyard, and entrance). A small shop often needs 2 to 4 cameras (cash counter, entrance, and sales aisles). We provide a free on-site survey in Pammal and Chennai to determine the optimal count.',
    },
    {
      q: 'Can I view the CCTV camera footage on my mobile phone when away from home?',
      a: 'Yes, absolutely. We configure official mobile viewing apps (such as Hik-Connect, gDMSS, or gCMOB) on your iOS or Android smartphone so you can watch live video, listen to audio, and playback recordings from anywhere with an internet connection.',
    },
    {
      q: 'What happens to automated gates during a power failure?',
      a: 'All our gate automation systems come with a personalized manual mechanical key release. In the event of a power outage, you can simply unlock the motor clutch with the key and slide or swing the gate manually with minimal effort. Battery backup inverter kits are also available.',
    },
    {
      q: 'Do you provide maintenance for cameras installed by another vendor?',
      a: 'Yes. Our Repair & Maintenance service covers troubleshooting, cable replacements, power supply repairs, and AMC service for existing security systems from Hikvision, CP Plus, Dahua, Hi-Focus, and other major brands.',
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
            <span>Complete Security Solutions</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            Our Security & Automation Services
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Professional CCTV camera installation, smart Wi-Fi systems, automated gate motors, rooftop solar arrays, and reliable maintenance across Chennai.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => onNavigateToContact(undefined, 'quote')}
              className="px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#031D49] bg-[#FFC400] hover:bg-[#ffcd20] rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Request a Free Quote
            </button>
            <button
              onClick={() => onRequestCallback()}
              className="px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-colors cursor-pointer"
            >
              Request a Callback
            </button>
          </div>
        </div>
      </section>

      {/* Services Detailed List */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        {SERVICES_DATA.map((service: ServiceItem, index: number) => {
          const specs = serviceSpecs[service.id] || {
            suitableFor: ['Residential', 'Commercial', 'Industrial'],
            techSpecs: ['High-Grade Hardware', 'Professional Configuration'],
            inclusions: ['On-site Installation', 'Testing & Verification'],
          };
          const isEven = index % 2 === 1;

          return (
            <div
              key={service.id}
              id={service.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 sm:p-10 scroll-mt-24"
            >
              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                {/* Visual Image Column */}
                <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-100 group">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-72 sm:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 bg-[#031D49]/90 text-white text-xs font-bold px-3 py-1 rounded-md backdrop-blur-sm">
                      0{index + 1} · {BUSINESS_CONFIG.name}
                    </div>
                  </div>
                </div>

                {/* Content Details Column */}
                <div className={`lg:col-span-7 space-y-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#082D68] mb-1">
                      Professional Security Solution
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#031D49] tracking-tight">
                      {service.name}
                    </h2>
                  </div>

                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                    {service.fullDescription}
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {/* Suitable For */}
                    <div className="p-4 rounded-xl bg-[#F5F7FA] border border-slate-200">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#082D68] uppercase mb-2">
                        <Cpu className="w-4 h-4 text-[#082D68]" />
                        <span>Ideal Applications</span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {specs.suitableFor.map((item) => (
                          <li key={item} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FFC400]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technical Specifications */}
                    <div className="p-4 rounded-xl bg-[#F5F7FA] border border-slate-200">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#082D68] uppercase mb-2">
                        <Zap className="w-4 h-4 text-[#082D68]" />
                        <span>Technical Capabilities</span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {specs.techSpecs.map((item) => (
                          <li key={item} className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Service Inclusions */}
                  <div className="border-t border-slate-100 pt-4">
                    <div className="text-xs font-bold text-[#031D49] uppercase tracking-wider mb-2">
                      What's Included with SREE Agency:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                      {specs.inclusions.map((inc) => (
                        <div key={inc} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#082D68] shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons for this specific service */}
                  <div className="pt-4 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => onNavigateToContact(service.name, 'quote')}
                      className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#031D49] bg-[#FFC400] hover:bg-[#ffcd20] rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer flex items-center gap-2"
                    >
                      <span>Request Quote for {service.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onRequestCallback(service.name)}
                      className="px-4 py-2.5 text-xs font-semibold text-[#031D49] bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Request Callback</span>
                    </button>

                    <a
                      href={buildWhatsAppUrl(service.whatsappMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-colors flex items-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                      <span>WhatsApp</span>
                      <ArrowUpRight className="w-3 h-3 text-emerald-600" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-12">
            <div className="text-xs font-bold uppercase tracking-wider text-[#082D68] mb-2">
              Common Questions
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#031D49]">
              Frequently Asked Service Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((item, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={item.q}
                  className="rounded-2xl border border-slate-200 overflow-hidden bg-[#F5F7FA] transition-colors"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-[#031D49] cursor-pointer"
                  >
                    <span className="flex items-center gap-2.5">
                      <HelpCircle className="w-4 h-4 text-[#082D68] shrink-0" />
                      <span>{item.q}</span>
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 bg-white">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA Strip */}
      <section className="bg-[#031D49] text-white py-12 border-t border-[#082D68]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">Ready to secure your premises?</h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Contact SREE Agency today for genuine hardware and transparent pricing in Pammal, Chennai.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={buildTelUrl(BUSINESS_CONFIG.primaryPhone)}
              className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#082D68] hover:bg-[#0c3982] border border-white/20 rounded-xl"
            >
              Call: {BUSINESS_CONFIG.primaryPhoneFormatted}
            </a>
            <button
              onClick={() => onNavigateToContact(undefined, 'quote')}
              className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#031D49] bg-[#FFC400] hover:bg-[#ffcd20] rounded-xl shadow-md cursor-pointer"
            >
              Get Free Quote
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
