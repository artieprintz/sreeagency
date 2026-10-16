import React, { useState } from 'react';
import { Phone, Shield, Menu, X, ArrowRight } from 'lucide-react';
import { BUSINESS_CONFIG, buildTelUrl } from '../config/business';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onRequestCallback: (prefilledService?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  onRequestCallback,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Estimator', path: '/#estimator' },
    { label: 'About', path: '/about' },
    { label: 'Coverage', path: '/#areas' },
    { label: 'Reviews', path: '/#reviews' },
    { label: 'FAQ', path: '/#faq' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#031D49] text-white shadow-md border-b border-[#082D68]">
      {/* Top micro-bar for direct phone access */}
      <div className="hidden sm:block bg-[#021330] px-4 sm:px-8 py-1.5 text-xs text-slate-300 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span>Location: {BUSINESS_CONFIG.locality}, {BUSINESS_CONFIG.city}</span>
            <span className="hidden md:inline">·</span>
            <span className="hidden md:inline text-[#FFC400] font-medium">{BUSINESS_CONFIG.tagline}</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={buildTelUrl(BUSINESS_CONFIG.primaryPhone)}
              className="flex items-center gap-1.5 hover:text-[#FFC400] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#FFC400]" />
              <span>{BUSINESS_CONFIG.primaryPhoneFormatted}</span>
            </a>
            <span className="text-white/30">|</span>
            <a
              href={buildTelUrl(BUSINESS_CONFIG.secondaryPhone)}
              className="flex items-center gap-1.5 hover:text-[#FFC400] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#FFC400]" />
              <span>{BUSINESS_CONFIG.secondaryPhoneFormatted}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main 3-Zone Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-18 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark Element with Official Logo */}
        <button
          onClick={(e) => handleLinkClick(e, '/')}
          className="flex items-center gap-3 shrink-0 group text-left cursor-pointer"
        >
          <div className="w-11 h-11 rounded-xl bg-white p-1 border border-[#FFC400]/50 shadow-md group-hover:scale-105 transition-transform flex items-center justify-center shrink-0">
            <img
              src="/images/logo.png"
              alt="SREE Agency Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
              <span>SREE</span>
              <span className="text-[#FFC400]">AGENCY</span>
            </div>
            <div className="text-[10px] uppercase tracking-wider text-slate-300 font-medium">
              Complete Security Solutions
            </div>
          </div>
        </button>

        {/* Zone 2: Single-line Text Links */}
        <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-slate-200">
          {navLinks.map((link) => {
            const isActive =
              (link.path === '/' && currentPath === '/') ||
              (link.path === '/services' && currentPath === '/services') ||
              (link.path === '/about' && currentPath === '/about') ||
              (link.path === '/contact' && (currentPath === '/contact' || currentPath === '/quote' || currentPath === '/query'));

            return (
              <button
                key={link.label}
                onClick={(e) => handleLinkClick(e, link.path)}
                className={`transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer ${
                  isActive ? 'text-[#FFC400] font-bold' : 'hover:text-[#FFC400]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary CTA Button */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('/contact')}
            className="px-5 py-2.5 text-xs font-bold tracking-wide uppercase text-[#031D49] bg-[#FFC400] hover:bg-[#ffcd20] rounded-lg transition-all duration-150 shadow-md hover:shadow-lg flex items-center gap-2 whitespace-nowrap cursor-pointer active:scale-95"
          >
            <span>Request a Quote</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => onRequestCallback()}
            className="px-3 py-1.5 text-xs font-bold uppercase text-[#031D49] bg-[#FFC400] rounded-md transition-colors"
          >
            Callback
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white rounded-lg focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#082D68] border-t border-white/10 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={(e) => handleLinkClick(e, link.path)}
              className="w-full text-left block py-2.5 text-sm font-medium text-slate-200 hover:text-[#FFC400] border-b border-white/5 cursor-pointer"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('/contact');
              }}
              className="w-full py-2.5 text-center text-xs font-bold uppercase tracking-wider text-[#031D49] bg-[#FFC400] rounded-lg"
            >
              Request a Free Quote
            </button>
            <a
              href={buildTelUrl(BUSINESS_CONFIG.primaryPhone)}
              className="flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 rounded-lg"
            >
              <Phone className="w-4 h-4 text-[#FFC400]" />
              <span>Call: {BUSINESS_CONFIG.primaryPhoneFormatted}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
