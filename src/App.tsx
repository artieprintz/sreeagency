import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { BrandsSection } from './components/BrandsSection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { AboutSection } from './components/AboutSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { GoogleReviewsSection } from './components/GoogleReviewsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { CallbackModal } from './components/CallbackModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { LegalModal } from './components/LegalModals';
import { ServicesPage } from './pages/ServicesPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    const path = window.location.pathname.toLowerCase();
    if (path.startsWith('/services')) return '/services';
    if (path.startsWith('/contact') || path.startsWith('/quote') || path.startsWith('/query')) return '/contact';
    return '/';
  });

  const [contactTab, setContactTab] = useState<'quote' | 'query' | 'callback'>('quote');
  const [callbackModalOpen, setCallbackModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);

  // Sync route and check for /admin URL
  useEffect(() => {
    const handleUrlChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();

      // Check if user visited /admin (exclusively via URL, no visible UI link)
      if (path === '/admin' || path === '/admin/' || hash === '#admin') {
        setAdminModalOpen(true);
        return;
      }

      if (path === '/services' || path === '/services/') {
        setCurrentPath('/services');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (path === '/contact' || path === '/contact/') {
        setCurrentPath('/contact');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (path === '/quote' || path === '/quote/') {
        setContactTab('quote');
        setCurrentPath('/contact');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (path === '/query' || path === '/query/') {
        setContactTab('query');
        setCurrentPath('/contact');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (path === '/callback' || path === '/callback/') {
        setContactTab('callback');
        setCurrentPath('/contact');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // Default home
      setCurrentPath('/');
      if (hash) {
        const id = hash.replace(/^#/, '');
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    };

    handleUrlChange();

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  const handleNavigate = (
    path: string,
    options?: { tab?: 'quote' | 'query' | 'callback'; service?: string }
  ) => {
    if (options?.service) {
      setSelectedService(options.service);
    }

    if (options?.tab) {
      setContactTab(options.tab);
    }

    // Hash anchor within Home or from another page
    if (path.startsWith('/#') || (path.startsWith('#') && path.length > 1)) {
      const hash = path.replace(/^\//, '');
      const elementId = hash.replace(/^#/, '');

      if (currentPath !== '/') {
        window.history.pushState({}, '', `/${hash}`);
        setCurrentPath('/');
        setTimeout(() => {
          const el = document.getElementById(elementId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        window.history.pushState({}, '', `/${hash}`);
        const el = document.getElementById(elementId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    if (path === '/admin' || path === '/admin/') {
      window.history.pushState({}, '', '/admin');
      setAdminModalOpen(true);
      return;
    }

    if (path === '/services') {
      window.history.pushState({}, '', '/services');
      setCurrentPath('/services');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (path === '/contact') {
      window.history.pushState({}, '', '/contact');
      setCurrentPath('/contact');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (path === '/quote') {
      setContactTab('quote');
      window.history.pushState({}, '', '/contact');
      setCurrentPath('/contact');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (path === '/query') {
      setContactTab('query');
      window.history.pushState({}, '', '/contact');
      setCurrentPath('/contact');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Default Home
    window.history.pushState({}, '', '/');
    setCurrentPath('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCallback = (prefilledService?: string) => {
    setSelectedService(prefilledService);
    setCallbackModalOpen(true);
  };

  const handleSelectServiceForQuote = (serviceName: string) => {
    setSelectedService(serviceName);
    setContactTab('quote');
    handleNavigate('/contact', { service: serviceName, tab: 'quote' });
  };

  const handleGetFreeQuote = () => {
    setContactTab('quote');
    handleNavigate('/contact', { tab: 'quote' });
  };

  const handleCloseAdmin = () => {
    setAdminModalOpen(false);
    // If user opened via /admin URL or #admin hash, revert URL back to /
    const path = window.location.pathname.toLowerCase();
    if (path === '/admin' || path === '/admin/' || window.location.hash.toLowerCase() === '#admin') {
      window.history.pushState({}, '', '/');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA] text-[#14213D]">
      {/* 1. Responsive Navigation Bar (NO admin link anywhere in UI) */}
      <Navbar
        currentPath={currentPath}
        onNavigate={handleNavigate}
        onRequestCallback={() => handleOpenCallback()}
      />

      <main className="flex-1">
        {currentPath === '/services' ? (
          /* Separate Dedicated Services Page */
          <ServicesPage
            onNavigateToContact={(serviceName, tab) =>
              handleNavigate('/contact', { service: serviceName, tab: tab || 'quote' })
            }
            onRequestCallback={(serviceName) => handleOpenCallback(serviceName)}
          />
        ) : currentPath === '/contact' ? (
          /* Separate Dedicated Contact, Request a Quote & Query Page */
          <ContactPage
            initialService={selectedService}
            initialTab={contactTab}
          />
        ) : (
          /* Default Homepage with Full Overview & Conversion Sections */
          <>
            {/* Homepage Hero Section */}
            <HeroSection
              onGetQuote={handleGetFreeQuote}
              onRequestCallback={() => handleOpenCallback()}
            />

            {/* Services Overview Section with 5 Core Offerings */}
            <ServicesSection
              onSelectServiceForCallback={(service) => handleOpenCallback(service)}
              onSelectServiceForQuote={handleSelectServiceForQuote}
              onNavigateToServices={() => handleNavigate('/services')}
            />

            {/* Brands We Deal With (Hikvision, CP Plus, Dahua, Hi-Focus) */}
            <BrandsSection />

            {/* Why Choose SREE Agency (6 Key Benefits) */}
            <WhyChooseUsSection />

            {/* How It Works (4-Step Workflow) */}
            <HowItWorksSection />

            {/* About Us Section */}
            <AboutSection />

            {/* Genuine Google Reviews Section (Authentic Customer Feedback) */}
            <GoogleReviewsSection />

            {/* Contact Section on Homepage */}
            <ContactSection initialService={selectedService} />
          </>
        )}
      </main>

      {/* Footer (NO admin link, clean navigation to pages) */}
      <Footer
        onOpenPrivacy={() => setLegalModalType('privacy')}
        onOpenTerms={() => setLegalModalType('terms')}
        onNavigate={handleNavigate}
      />

      {/* Floating Desktop WhatsApp & Mobile Contact Actions */}
      <FloatingActions onRequestCallback={() => handleOpenCallback()} />

      {/* Modal: Request a Callback */}
      <CallbackModal
        isOpen={callbackModalOpen}
        onClose={() => setCallbackModalOpen(false)}
        defaultService={selectedService}
      />

      {/* Modal: Secure Staff Admin Dashboard (Opens ONLY when accessing /admin via URL) */}
      <AdminDashboardModal
        isOpen={adminModalOpen}
        onClose={handleCloseAdmin}
      />

      {/* Modal: Legal Privacy & Terms */}
      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />
    </div>
  );
}
