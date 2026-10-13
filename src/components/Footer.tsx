import React, { useState } from 'react';
import { Shield, Phone, MapPin, ExternalLink, Mail } from 'lucide-react';
import { BUSINESS_CONFIG, buildTelUrl, SERVICES_DATA } from '../config/business';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onNavigate?: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onOpenTerms, onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const handleLink = (e: React.MouseEvent, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
    }
  };

  return (
    <footer className="bg-[#021330] text-slate-300 border-t border-[#082D68] pt-14 pb-20 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#082D68] border border-[#FFC400]/40 flex items-center justify-center text-[#FFC400]">
                <Shield className="w-5 h-5 fill-[#FFC400]/10 stroke-[2.2]" />
              </div>
              <div>
                <div className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                  <span>SREE</span>
                  <span className="text-[#FFC400]">AGENCY</span>
                </div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                  {BUSINESS_CONFIG.secondaryTagline}
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Professional CCTV installation, smart Wi-Fi cameras, automated sliding/swing gates, solar panel systems, and dependable maintenance across Chennai.
            </p>

            <div className="text-xs font-semibold text-[#FFC400]">
              "{BUSINESS_CONFIG.tagline}"
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="/services"
                  onClick={(e) => handleLink(e, '/services')}
                  className="hover:text-[#FFC400] transition-colors"
                >
                  Our Services
                </a>
              </li>
              <li>
                <a
                  href="/#estimator"
                  onClick={(e) => handleLink(e, '/#estimator')}
                  className="hover:text-[#FFC400] transition-colors"
                >
                  Instant Quote Estimator
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  onClick={(e) => handleLink(e, '/about')}
                  className="hover:text-[#FFC400] transition-colors"
                >
                  About SREE Agency
                </a>
              </li>
              <li>
                <a
                  href="/#areas"
                  onClick={(e) => handleLink(e, '/#areas')}
                  className="hover:text-[#FFC400] transition-colors"
                >
                  Chennai Coverage
                </a>
              </li>
              <li>
                <a
                  href="/#reviews"
                  onClick={(e) => handleLink(e, '/#reviews')}
                  className="hover:text-[#FFC400] transition-colors"
                >
                  Customer Reviews
                </a>
              </li>
              <li>
                <a
                  href="/#faq"
                  onClick={(e) => handleLink(e, '/#faq')}
                  className="hover:text-[#FFC400] transition-colors"
                >
                  Security FAQs
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  onClick={(e) => handleLink(e, '/contact')}
                  className="hover:text-[#FFC400] transition-colors"
                >
                  Contact & Free Survey
                </a>
              </li>
            </ul>
          </div>

          {/* Service Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Our Solutions</h4>
            <ul className="space-y-2 text-xs">
              {SERVICES_DATA.map((s) => (
                <li key={s.id}>
                  <a
                    href={`/services#${s.id}`}
                    onClick={(e) => handleLink(e, `/services#${s.id}`)}
                    className="hover:text-[#FFC400] transition-colors"
                  >
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details & Listing Link */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Direct Contact</h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#FFC400] shrink-0 mt-0.5" />
                <span>{BUSINESS_CONFIG.location}</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#FFC400] shrink-0" />
                <div className="space-x-2">
                  <a href={buildTelUrl(BUSINESS_CONFIG.primaryPhone)} className="hover:text-white">
                    {BUSINESS_CONFIG.primaryPhoneFormatted}
                  </a>
                  <span>/</span>
                  <a href={buildTelUrl(BUSINESS_CONFIG.secondaryPhone)} className="hover:text-white">
                    {BUSINESS_CONFIG.secondaryPhoneFormatted}
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={BUSINESS_CONFIG.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#FFC400] hover:underline"
                >
                  <span>View Official Google Business Listing</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar with legal & dynamic year */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {currentYear} SREE Agency. All rights reserved. Registered in Pammal, Chennai.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              onClick={onOpenTerms}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Terms of Use
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
