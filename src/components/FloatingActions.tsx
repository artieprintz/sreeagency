import React from 'react';
import { MessageSquare, Phone, PhoneCall } from 'lucide-react';
import { BUSINESS_CONFIG, buildTelUrl, buildWhatsAppUrl } from '../config/business';

interface FloatingActionsProps {
  onRequestCallback: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onRequestCallback }) => {
  return (
    <>
      {/* Desktop Floating WhatsApp Button */}
      <aside aria-label="Quick Communication" className="hidden sm:block fixed bottom-6 right-6 z-40">
        <a
          href={buildWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white pl-4 pr-5 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 active:scale-95 border-2 border-white/20"
          aria-label="Chat with SREE Agency on WhatsApp"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5 fill-white/20" />
            <span className="sr-only">WhatsApp Chat</span>
          </div>
          <span className="text-xs font-bold tracking-wide">
            Chat on WhatsApp
          </span>
        </a>
      </aside>

      {/* Mobile Sticky Contact Bar (Restricted to < 15% viewport height) */}
      <nav aria-label="Mobile Quick Contact" className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#031D49] border-t border-[#082D68] px-3 py-2 shadow-2xl backdrop-blur-md">
        <div className="grid grid-cols-3 gap-2">
          {/* Quick Call */}
          <a
            href={buildTelUrl(BUSINESS_CONFIG.primaryPhone)}
            className="flex flex-col items-center justify-center py-1.5 px-2 rounded-lg bg-white/10 active:bg-white/20 text-white transition-colors"
            aria-label="Call SREE Agency Now"
          >
            <Phone className="w-4 h-4 text-[#FFC400] mb-0.5" />
            <span className="text-[10px] font-bold">Call Now</span>
          </a>

          {/* WhatsApp */}
          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-1.5 px-2 rounded-lg bg-emerald-600 active:bg-emerald-700 text-white transition-colors shadow-sm"
            aria-label="Open WhatsApp Chat"
          >
            <MessageSquare className="w-4 h-4 text-white mb-0.5" />
            <span className="text-[10px] font-bold">WhatsApp</span>
          </a>

          {/* Callback Request */}
          <button
            onClick={onRequestCallback}
            className="flex flex-col items-center justify-center py-1.5 px-2 rounded-lg bg-[#FFC400] active:bg-[#ffcd20] text-[#031D49] transition-colors shadow-sm"
            aria-label="Request a Callback from SREE Agency"
          >
            <PhoneCall className="w-4 h-4 text-[#031D49] mb-0.5" />
            <span className="text-[10px] font-bold">Callback</span>
          </button>
        </div>
      </nav>
    </>
  );
};
