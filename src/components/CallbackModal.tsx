import React, { useState, useEffect } from 'react';
import { X, PhoneCall, CheckCircle2, AlertCircle, Copy, Check, MessageSquare } from 'lucide-react';
import { SERVICES_DATA, buildWhatsAppUrl } from '../config/business';

interface CallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
  defaultMessage?: string;
  defaultPropertyType?: string;
}

export const CallbackModal: React.FC<CallbackModalProps> = ({
  isOpen,
  onClose,
  defaultService,
  defaultMessage,
  defaultPropertyType,
}) => {
  const [formData, setFormData] = useState({
    customer_name: '',
    phone_number: '',
    email: '',
    service_required: defaultService || SERVICES_DATA[0].name,
    property_type: defaultPropertyType || '',
    customer_location: '',
    preferred_callback_date: '',
    preferred_callback_time: 'Morning (9 AM - 12 PM)',
    customer_message: defaultMessage || '',
    consent_recorded: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [referenceCode, setReferenceCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (defaultService) {
      setFormData((prev) => ({ ...prev, service_required: defaultService }));
    }
    if (defaultMessage) {
      setFormData((prev) => ({ ...prev, customer_message: defaultMessage }));
    }
    if (defaultPropertyType) {
      setFormData((prev) => ({ ...prev, property_type: defaultPropertyType }));
    }
  }, [defaultService, defaultMessage, defaultPropertyType]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!formData.customer_name.trim() || formData.customer_name.trim().length < 2) {
      setError('Please provide your full name (minimum 2 characters).');
      return;
    }

    const cleanPhone = formData.phone_number.replace(/[\s\-]/g, '');
    const indianPhoneRegex = /^(\+91)?[6789]\d{9}$/;
    if (!indianPhoneRegex.test(cleanPhone)) {
      setError('Please enter a valid 10-digit Indian mobile number (e.g., 9500100061).');
      return;
    }

    if (!formData.consent_recorded) {
      setError('Please provide consent to receive a callback.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          enquiry_type: 'callback',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit callback request. Please try again.');
      }

      setReferenceCode(data.reference_code);
    } catch (err: any) {
      setError(err.message || 'An error occurred while submitting your request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = () => {
    if (referenceCode) {
      navigator.clipboard.writeText(referenceCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleResetAndClose = () => {
    setReferenceCode(null);
    setError(null);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto"
    >
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Header */}
        <div className="bg-[#031D49] px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white p-1 border border-[#FFC400]/50 shadow-md shrink-0 flex items-center justify-center">
              <img
                src="/images/logo.png"
                alt="SREE Agency Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Request a Callback</h3>
              <p className="text-[11px] text-slate-300">SREE Agency • Pammal, Chennai</p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {referenceCode ? (
            /* Confirmed Submission Screen with Unique Reference ID */
            <div className="text-center py-4 space-y-5">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-lg font-bold text-[#031D49]">
                  Thank you for contacting SREE Agency!
                </h4>
                <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto leading-relaxed">
                  Your callback request has been received. Our team will contact you regarding your enquiry.
                </p>
              </div>

              {/* Reference ID Box */}
              <div className="p-4 rounded-xl bg-[#F5F7FA] border border-slate-200 max-w-xs mx-auto">
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Enquiry Reference Code
                </div>
                <div className="text-xl font-mono font-bold text-[#031D49] tracking-wider select-all">
                  {referenceCode}
                </div>
                <button
                  onClick={handleCopyCode}
                  className="mt-2 text-xs font-semibold text-[#082D68] hover:text-[#031D49] inline-flex items-center gap-1.5 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied to clipboard</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Reference Code</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-slate-500">
                Please retain this reference code for future enquiries with our technicians.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
                <a
                  href={buildWhatsAppUrl(`Hello SREE Agency, I have submitted a callback request with reference: ${referenceCode}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Notify via WhatsApp</span>
                </a>
                <button
                  onClick={handleResetAndClose}
                  className="px-5 py-2.5 text-xs font-bold text-[#031D49] bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            /* Callback Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-800 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-[#031D49] mb-1">
                  Full Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.customer_name}
                  onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                  placeholder="e.g. Anand Sundaram"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:border-[#082D68] focus:ring-1 focus:ring-[#082D68] text-sm text-[#14213D] outline-none"
                />
              </div>

              {/* Phone and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#031D49] mb-1">
                    Mobile Number <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone_number}
                    onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                    placeholder="10 digits (e.g. 9500100061)"
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:border-[#082D68] focus:ring-1 focus:ring-[#082D68] text-sm text-[#14213D] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:border-[#082D68] focus:ring-1 focus:ring-[#082D68] text-sm text-[#14213D] outline-none"
                  />
                </div>
              </div>

              {/* Service Required */}
              <div>
                <label className="block text-xs font-bold text-[#031D49] mb-1">
                  Service Required <span className="text-red-600">*</span>
                </label>
                <select
                  value={formData.service_required}
                  onChange={(e) => setFormData({ ...formData, service_required: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:border-[#082D68] focus:ring-1 focus:ring-[#082D68] text-sm text-[#14213D] outline-none bg-white"
                >
                  {SERVICES_DATA.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                  <option value="Other Enquiry">Other Enquiry</option>
                </select>
              </div>

              {/* Location & Property Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Location / Area (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.customer_location}
                    onChange={(e) => setFormData({ ...formData, customer_location: e.target.value })}
                    placeholder="e.g. Pammal, Chromepet"
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:border-[#082D68] focus:ring-1 focus:ring-[#082D68] text-sm text-[#14213D] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Property Type (Optional)
                  </label>
                  <select
                    value={formData.property_type}
                    onChange={(e) => setFormData({ ...formData, property_type: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:border-[#082D68] focus:ring-1 focus:ring-[#082D68] text-sm text-[#14213D] outline-none bg-white"
                  >
                    <option value="">Select property type...</option>
                    <option value="Residential">Residential Villa / Independent</option>
                    <option value="Flat / Apartment">Flat / Apartment</option>
                    <option value="Shop / Commercial">Shop / Commercial Space</option>
                    <option value="Office">Office / IT Space</option>
                    <option value="Warehouse / Industrial">Warehouse / Industrial</option>
                  </select>
                </div>
              </div>

              {/* Preferred Callback Time & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Preferred Callback Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={formData.preferred_callback_date}
                    onChange={(e) => setFormData({ ...formData, preferred_callback_date: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:border-[#082D68] focus:ring-1 focus:ring-[#082D68] text-xs text-[#14213D] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Preferred Time Slot (Optional)
                  </label>
                  <select
                    value={formData.preferred_callback_time}
                    onChange={(e) => setFormData({ ...formData, preferred_callback_time: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:border-[#082D68] focus:ring-1 focus:ring-[#082D68] text-xs text-[#14213D] outline-none bg-white"
                  >
                    <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                    <option value="Afternoon (12 PM - 3 PM)">Afternoon (12 PM - 3 PM)</option>
                    <option value="Evening (3 PM - 7 PM)">Evening (3 PM - 7 PM)</option>
                    <option value="Anytime during working hours">Anytime during working hours</option>
                  </select>
                </div>
              </div>

              {/* Message (Optional) */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Brief Description (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formData.customer_message}
                  onChange={(e) => setFormData({ ...formData, customer_message: e.target.value })}
                  placeholder="e.g. Need 4 cameras with mobile view setup..."
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:border-[#082D68] focus:ring-1 focus:ring-[#082D68] text-xs text-[#14213D] outline-none resize-none"
                />
              </div>

              {/* Consent Checkbox */}
              <div>
                <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consent_recorded}
                    onChange={(e) => setFormData({ ...formData, consent_recorded: e.target.checked })}
                    className="mt-0.5 rounded text-[#031D49] focus:ring-[#082D68]"
                  />
                  <span>
                    I consent to SREE Agency contacting me via phone call regarding this callback request. <span className="text-red-600">*</span>
                  </span>
                </label>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#031D49] bg-[#FFC400] hover:bg-[#ffcd20] rounded-xl transition-all shadow-sm active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <span>Saving Callback Request...</span>
                  ) : (
                    <>
                      <PhoneCall className="w-4 h-4" />
                      <span>Request a Callback Now</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
