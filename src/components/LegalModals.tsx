import React from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        <div className="bg-[#031D49] px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {type === 'privacy' ? (
              <ShieldCheck className="w-5 h-5 text-[#FFC400]" />
            ) : (
              <FileText className="w-5 h-5 text-[#FFC400]" />
            )}
            <h3 className="text-base font-bold text-white">
              {type === 'privacy' ? 'Privacy Policy' : 'Terms of Use'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close Legal Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto text-xs sm:text-sm text-slate-700 space-y-4 leading-relaxed">
          {type === 'privacy' ? (
            <>
              <p>
                <strong>Last Updated:</strong> October 2026
              </p>
              <p>
                At <strong>SREE Agency</strong> ({BUSINESS_CONFIG.location}), we respect your privacy. This policy describes how we collect, store, and utilize information provided when you submit callback requests, request quotations, or contact our security specialists.
              </p>
              <h4 className="font-bold text-[#031D49] text-sm pt-2">1. Information We Collect</h4>
              <p>
                We collect your full name, phone number, email address (if provided), property type, service requirements, and location specifically for providing CCTV, gate automation, solar panel, and security servicing estimates.
              </p>
              <h4 className="font-bold text-[#031D49] text-sm pt-2">2. How We Use Your Information</h4>
              <p>
                Your information is stored in our persistent lead management database solely to:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Call you back regarding requested security installations.</li>
                <li>Dispatch technicians for on-site property measurements and estimates.</li>
                <li>Coordinate ongoing maintenance or AMC warranty visits.</li>
              </ul>
              <h4 className="font-bold text-[#031D49] text-sm pt-2">3. Data Protection</h4>
              <p>
                We do not sell, distribute, or publicly display customer details. Lead records are accessible only to authorized SREE Agency staff through authenticated access.
              </p>
              <h4 className="font-bold text-[#031D49] text-sm pt-2">4. Contact Us</h4>
              <p>
                For questions regarding your data or to request removal of your enquiry record, contact us directly at {BUSINESS_CONFIG.primaryPhoneFormatted} or via email at {BUSINESS_CONFIG.email}.
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>Last Updated:</strong> October 2026
              </p>
              <p>
                Welcome to the official website of <strong>SREE Agency</strong>. By accessing this website or submitting an enquiry, you agree to the following terms:
              </p>
              <h4 className="font-bold text-[#031D49] text-sm pt-2">1. Services & Quotations</h4>
              <p>
                Descriptions and quotations provided via our website or callback communications are estimates tailored to typical installation conditions. Final proposals depend on on-site wiring distances, physical property constraints, camera channels, and equipment availability.
              </p>
              <h4 className="font-bold text-[#031D49] text-sm pt-2">2. Genuine Brand Hardware</h4>
              <p>
                We supply and service equipment from established manufacturers including Hikvision, CP Plus, Dahua, and Hi-Focus. Brand names and logos are the property of their respective trademark holders.
              </p>
              <h4 className="font-bold text-[#031D49] text-sm pt-2">3. Customer Consent</h4>
              <p>
                By providing your phone number on callback or quotation forms, you authorize SREE Agency representatives to contact you via telephone or WhatsApp regarding your requested services.
              </p>
            </>
          )}

          <div className="pt-4 border-t border-slate-200 text-right">
            <button
              onClick={onClose}
              className="px-5 py-2 text-xs font-bold text-white bg-[#031D49] hover:bg-[#082D68] rounded-lg transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
