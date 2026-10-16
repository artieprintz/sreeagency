import React, { useState } from 'react';
import { Phone, MapPin, Navigation, Send, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';
import { BUSINESS_CONFIG, buildTelUrl, buildWhatsAppUrl, SERVICES_DATA } from '../config/business';

interface ContactSectionProps {
  initialService?: string;
  onSuccessSubmission?: (refCode: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialService, onSuccessSubmission }) => {
  const [formData, setFormData] = useState({
    customer_name: '',
    phone_number: '',
    email: '',
    service_required: initialService || SERVICES_DATA[0].name,
    property_type: 'Residential',
    customer_location: '',
    customer_message: '',
    consent_recorded: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successReference, setSuccessReference] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Client-side quick check
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
      setError('You must consent to be contacted regarding this enquiry.');
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
          enquiry_type: 'quote',
        }),
      });

      const contentType = response.headers.get('content-type') || '';
      if (!contentType.toLowerCase().includes('application/json')) {
        const responseText = await response.text();
        console.error('[CONTACT FORM] API returned non-JSON response', {
          status: response.status,
          url: response.url,
          body: responseText.slice(0, 300),
        });
        throw new Error(
          `The contact API returned an unexpected response (HTTP ${response.status}). Please try again later.`
        );
      }
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit enquiry. Please retry.');
      }

      setSuccessReference(result.reference_code);
      if (onSuccessSubmission) {
        onSuccessSubmission(result.reference_code);
      }
    } catch (err: any) {
      setError(err.message || 'Network error occurred. Please call 9500100061 directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-bold uppercase tracking-wider text-[#082D68] mb-2">
            Get in Touch
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#031D49] tracking-tight">
            Contact SREE Agency
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Request an on-site property inspection, get an accurate security quotation, or talk to our technicians directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
          {/* Left Column: Direct Contact & Embedded Map */}
          <div className="lg:col-span-5 space-y-6">
            {/* Phone & Info Card with Official Logo */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center gap-3.5 pb-3 border-b border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-white p-1 border border-[#FFC400]/50 shadow-md flex items-center justify-center shrink-0">
                  <img
                    src="/images/logo.png"
                    alt="SREE Agency Official Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#031D49] mb-0.5">
                    Direct Phone Enquiries
                  </h3>
                  <p className="text-xs text-slate-500">
                    SREE Agency • Pammal, Chennai
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <a
                  href={buildTelUrl(BUSINESS_CONFIG.primaryPhone)}
                  className="p-3.5 rounded-xl bg-[#F5F7FA] hover:bg-slate-100 border border-slate-200 flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#031D49] text-[#FFC400] flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium">Primary Line</div>
                      <div className="text-sm font-bold text-[#031D49] group-hover:text-[#082D68]">
                        {BUSINESS_CONFIG.primaryPhoneFormatted}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#082D68]">Call</span>
                </a>

                <a
                  href={buildTelUrl(BUSINESS_CONFIG.secondaryPhone)}
                  className="p-3.5 rounded-xl bg-[#F5F7FA] hover:bg-slate-100 border border-slate-200 flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#082D68] text-white flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium">Secondary Line</div>
                      <div className="text-sm font-bold text-[#031D49] group-hover:text-[#082D68]">
                        {BUSINESS_CONFIG.secondaryPhoneFormatted}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#082D68]">Call</span>
                </a>
              </div>

              {/* Location and Service Coverage */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <MapPin className="w-4 h-4 text-[#082D68] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#031D49] block">Office Location:</strong>
                    <span>{BUSINESS_CONFIG.location}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs text-slate-700">
                  <Navigation className="w-4 h-4 text-[#082D68] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#031D49] block">Service Coverage:</strong>
                    <span>{BUSINESS_CONFIG.serviceArea}</span>
                  </div>
                </div>
              </div>

              {/* Direct Maps & WhatsApp CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <a
                  href={BUSINESS_CONFIG.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 text-xs font-bold text-center text-white bg-[#031D49] hover:bg-[#082D68] rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#FFC400]" />
                  <span>Get Directions</span>
                </a>

                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 text-xs font-bold text-center text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>
            </div>

            {/* Embedded Google Maps Centered at Exact Verified Coordinates */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white">
              <div className="p-3 bg-[#031D49] text-white text-xs font-bold flex items-center justify-between">
                <span>Google Maps Location</span>
                <span className="text-[10px] text-[#FFC400] font-normal">12.9753° N, 80.1327° E</span>
              </div>
              <iframe
                title="SREE Agency Pammal Chennai Google Maps"
                src={`https://www.google.com/maps?q=${BUSINESS_CONFIG.coordinates.lat},${BUSINESS_CONFIG.coordinates.lng}&hl=en&z=16&output=embed`}
                width="100%"
                height="240"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right Column: Customer Enquiry & Quote Request Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-[#031D49]">
                  Request a Free Quotation or General Enquiry
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Submit your property requirements below. All enquiries are recorded persistently and followed up by our technical team.
                </p>
              </div>

              {successReference ? (
                <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
                  <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-emerald-900">
                      Enquiry Successfully Received!
                    </h4>
                    <p className="text-xs text-emerald-800 mt-1 max-w-md mx-auto">
                      Thank you for contacting SREE Agency. Your quote request has been securely recorded in our lead management system.
                    </p>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-emerald-200 inline-block text-xs">
                    <span className="text-slate-500">Your Enquiry Reference Code:</span>
                    <div className="text-base font-black text-[#031D49] tracking-wider mt-0.5">
                      {successReference}
                    </div>
                  </div>
                  <div className="pt-2 flex justify-center gap-3">
                    <button
                      onClick={() => {
                        setSuccessReference(null);
                        setFormData({
                          customer_name: '',
                          phone_number: '',
                          email: '',
                          service_required: SERVICES_DATA[0].name,
                          property_type: 'Residential',
                          customer_location: '',
                          customer_message: '',
                          consent_recorded: true,
                        });
                      }}
                      className="px-4 py-2 text-xs font-semibold text-[#031D49] bg-white border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer"
                    >
                      Submit Another Enquiry
                    </button>
                    <a
                      href={buildWhatsAppUrl(`Hello SREE Agency, I just submitted an enquiry with reference ${successReference}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg flex items-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-800 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        placeholder="e.g. Ramesh Kumar"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#082D68] focus:ring-1 focus:ring-[#082D68] text-sm text-[#14213D] outline-none"
                      />
                    </div>

                    {/* Mobile Number */}
                    <div>
                      <label className="block text-xs font-bold text-[#031D49] mb-1">
                        Mobile Number <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone_number}
                        onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                        placeholder="10-digit number (e.g. 9500100061)"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#082D68] focus:ring-1 focus:ring-[#082D68] text-sm text-[#14213D] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email (Optional) */}
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@example.com"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#082D68] focus:ring-1 focus:ring-[#082D68] text-sm text-[#14213D] outline-none"
                      />
                    </div>

                    {/* Service Required Dropdown */}
                    <div>
                      <label className="block text-xs font-bold text-[#031D49] mb-1">
                        Service Category <span className="text-red-600">*</span>
                      </label>
                      <select
                        value={formData.service_required}
                        onChange={(e) => setFormData({ ...formData, service_required: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#082D68] focus:ring-1 focus:ring-[#082D68] text-sm text-[#14213D] outline-none bg-white"
                      >
                        {SERVICES_DATA.map((s) => (
                          <option key={s.id} value={s.name}>
                            {s.name}
                          </option>
                        ))}
                        <option value="Other Enquiry">Other Security Enquiry</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Property Type */}
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Property Type
                      </label>
                      <select
                        value={formData.property_type}
                        onChange={(e) => setFormData({ ...formData, property_type: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#082D68] focus:ring-1 focus:ring-[#082D68] text-sm text-[#14213D] outline-none bg-white"
                      >
                        <option value="Residential">Residential (Independent / Flat)</option>
                        <option value="Commercial Shop">Commercial Retail Shop</option>
                        <option value="Office">Office / IT Workspace</option>
                        <option value="Industrial / Warehouse">Industrial / Warehouse</option>
                        <option value="Apartment Complex">Apartment Association / Gated</option>
                      </select>
                    </div>

                    {/* Location / Area */}
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Location / Area in Chennai
                      </label>
                      <input
                        type="text"
                        value={formData.customer_location}
                        onChange={(e) => setFormData({ ...formData, customer_location: e.target.value })}
                        placeholder="e.g. Pammal, Chromepet, Tambaram"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#082D68] focus:ring-1 focus:ring-[#082D68] text-sm text-[#14213D] outline-none"
                      />
                    </div>
                  </div>

                  {/* Requirements Message */}
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Requirements or Message
                    </label>
                    <textarea
                      rows={3}
                      value={formData.customer_message}
                      onChange={(e) => setFormData({ ...formData, customer_message: e.target.value })}
                      placeholder="Number of cameras, area to cover, gate dimensions, or problem description..."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#082D68] focus:ring-1 focus:ring-[#082D68] text-sm text-[#14213D] outline-none resize-none"
                    />
                  </div>

                  {/* Consent Checkbox */}
                  <div className="pt-1">
                    <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.consent_recorded}
                        onChange={(e) => setFormData({ ...formData, consent_recorded: e.target.checked })}
                        className="mt-0.5 rounded text-[#031D49] focus:ring-[#082D68]"
                      />
                      <span>
                        I consent to SREE Agency contacting me via phone call or WhatsApp regarding my security quotation enquiry. <span className="text-red-600">*</span>
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 px-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#031D49] bg-[#FFC400] hover:bg-[#ffcd20] rounded-xl transition-all shadow-sm hover:shadow-md active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {loading ? (
                        <span>Submitting to Database...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Quote Request</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
