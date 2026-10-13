import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageSquare, Phone } from 'lucide-react';
import { BUSINESS_CONFIG, buildWhatsAppUrl, buildTelUrl } from '../config/business';

interface FaqSectionProps {
  onRequestCallback?: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onRequestCallback }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How many CCTV cameras do I need for my house, apartment, or shop in Chennai?',
      a: 'For an independent house or villa, a 4 to 8 camera setup is typically recommended to cover the front entrance, parking gate, side pathways, and backyard perimeter. For small retail shops or offices, a 2 to 4 camera setup covering the cash counter, entrance, and storage shelves is usually sufficient. SREE Agency offers a free on-site survey anywhere in Pammal and Chennai to calculate exact camera angles without blind spots.',
    },
    {
      q: 'Can I view live footage and recordings on my smartphone when I am traveling?',
      a: 'Yes, 100%. We configure official mobile apps (such as Hik-Connect for Hikvision, gCMOB for CP Plus, or DMSS for Dahua) on all your family or staff smartphones. As long as your DVR/NVR is connected to your Wi-Fi or broadband router, you can view real-time video, playback past recordings, listen to two-way audio, and receive instant motion push notifications from anywhere in the world.',
    },
    {
      q: 'What brand of equipment do you supply and what is the warranty period?',
      a: 'We strictly deal in authentic equipment from premier manufacturers: Hikvision, CP Plus, Dahua Technology, and Hi-Focus. All cameras, DVR/NVR recorders, and dedicated surveillance hard drives (Western Digital Purple / Seagate SkyHawk) come with genuine 1 to 2-year manufacturer warranties. In addition, SREE Agency provides on-site installation support and workmanship warranty.',
    },
    {
      q: 'What happens to automatic sliding or swing gates during a power failure (EB power cut)?',
      a: 'Every automatic gate motor installed by SREE Agency comes equipped with a secure manual mechanical clutch release key. If there is a power outage, you simply unlock the clutch using your personal key and move the gate manually with smooth, effortless glide. We can also integrate dedicated battery backup inverters so the gate operates automatically even during power cuts.',
    },
    {
      q: 'Do you repair or provide AMC (Annual Maintenance) for CCTV systems installed by other vendors?',
      a: 'Yes! If you already have existing CCTV cameras that are experiencing video loss, blurred lenses, power supply burnt issues, hard drive failure, or mobile app disconnection, our experienced technicians can troubleshoot and fix them. We also offer affordable Annual Maintenance Contracts (AMC) for apartments, gated communities, and commercial establishments across Chennai.',
    },
    {
      q: 'How long does a standard CCTV installation take from booking to completion?',
      a: 'A standard 4 to 8 camera residential or shop installation is typically completed within a single working day (4 to 7 hours). Our technicians ensure all cables are neatly concealed inside PVC conduit pipes or casing, cameras are securely mounted and aligned, the recording hard drive is formatted and tested, and mobile apps are configured on all your devices before handoff.',
    },
    {
      q: 'What is the difference between standard HD analog cameras and Wi-Fi smart cameras?',
      a: 'HD Analog / IP systems use a central DVR/NVR recorder with hard drive storage and physical cabling, making them exceptionally reliable, tamper-proof, and suitable for 24/7 continuous perimeter recording. Wi-Fi smart cameras are wireless, plug-and-play devices suitable for indoor rooms, apartments, or small spaces with direct SD card recording and built-in two-way audio. We help you choose the best combination for your property.',
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-[#F5F7FA] border-t border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#082D68]/10 text-[#082D68] text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#031D49] tracking-tight">
            Security & Installation FAQs
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Common questions answered regarding CCTV cameras, installation timelines, mobile remote access, and service policies.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.q}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-[#031D49] leading-snug">
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-[#031D49] text-white' : 'text-slate-600'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    <p className="pt-2">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Strip */}
        <div className="mt-10 p-6 rounded-2xl bg-white border border-slate-200 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h3 className="text-sm font-bold text-[#031D49]">Have a specific query about your premises?</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Speak directly with our technical team in Pammal for personalized advice.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={buildTelUrl(BUSINESS_CONFIG.primaryPhone)}
              className="px-4 py-2 text-xs font-bold text-white bg-[#031D49] hover:bg-[#082D68] rounded-xl transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#FFC400]" />
              <span>Call Us</span>
            </a>
            <a
              href={buildWhatsAppUrl("Hello SREE Agency, I have a question about CCTV installation for my property.")}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
