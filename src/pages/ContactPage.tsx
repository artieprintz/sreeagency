import React, { useState, useEffect } from 'react';
import {
  Phone,
  MapPin,
  Navigation,
  MessageSquare,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  HelpCircle,
  FileText,
  PhoneCall,
  Copy,
  Check,
} from 'lucide-react';
import { BUSINESS_CONFIG, buildTelUrl, buildWhatsAppUrl, SERVICES_DATA } from '../config/business';

interface ContactPageProps {
  initialService?: string;
  initialTab?: 'quote' | 'query' | 'callback';
  initialMessage?: string;
  initialPropertyType?: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  initialService,
  initialTab = 'quote',
  initialMessage,
  initialPropertyType,
}) => {
  const [activeTab, setActiveTab] = useState<'quote' | 'query' | 'callback'>(initialTab);

  const [formData, setFormData] = useState({
    customer_name: '',
    phone_number: '',
    email: '',
    service_required: initialService || SERVICES_DATA[0].name,
    property_type: initialPropertyType || 'Residential (Villa / Flat)',
    customer_location: '',
    customer_message: initialMessage || '',
    preferred_callback_date: '',
    preferred_callback_time: 'Morning (9 AM - 12 PM)',
    consent_recorded: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successReference, setSuccessReference] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, service_required: initialService }));
    }
    if (initialMessage) {
      setFormData((prev) => ({ ...prev, customer_message: initialMessage }));
    }
    if (initialPropertyType) {
      setFormData((prev) => ({ ...prev, property_type: initialPropertyType }));
    }
  }, [initialService, initialMessage, initialPropertyType]);

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
      setError('Consent to contact is required to submit your request.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          enquiry_type: activeTab,
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
    } catch (err: any) {
      setError(err.message || 'Network error occurred. Please call 9500100061 directly.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = () => {
    if (successReference) {
      navigator.clipboard.writeText(successReference);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleResetForm = () => {
    setSuccessReference(null);
    setError(null);
    setFormData({
      customer_name: '',
      phone_number: '',
      email: '',
      service_required: initialService || SERVICES_DATA[0].name,
      property_type: 'Residential (Villa / Flat)',
      customer_location: '',
      customer_message: '',
      preferred_callback_date: '',
      preferred_callback_time: 'Morning (9 AM - 12 PM)',
      consent_recorded: true,
    });
  };

  return (
    <div className="bg-[#F5F7FA] text-[#14213D] min-h-screen">
      {/* Header Banner */}
      <section className="bg-[#031D49] text-white py-14 sm:py-20 relative overflow-hidden border-b border-[#082D68]">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FFC400_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#FFC400] text-xs font-semibold uppercase tracking-wider mb-4">
            <MessageSquare className="w-4 h-4 text-[#FFC400]" />
            <span>Connect with SREE Agency</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            Contact, Request Quote & Query
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Get in touch with our security technicians in Pammal, Chennai. Submit your requirements for a fast quote, request an immediate callback, or send us any security enquiry.
          </p>
        </div>
      </section>

      {/* Main Form & Contact Hub Section */}
      <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Direct Phone & Map Info */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Contact Card with Official Logo */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
                <div className="w-14 h-14 rounded-2xl bg-white p-1 border border-[#FFC400]/50 shadow-md flex items-center justify-center shrink-0">
                  <img
                    src="/images/logo.png"
                    alt="SREE Agency Official Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#031D49] mb-0.5">
                    Direct Office Contacts
                  </h2>
                  <p className="text-xs text-slate-500">
                    SREE Agency • Pammal, Chennai
                  </p>
                </div>
              </div>

              {/* Phone Lines */}
              <div className="space-y-3">
                <a
                  href={buildTelUrl(BUSINESS_CONFIG.primaryPhone)}
                  className="p-4 rounded-2xl bg-[#F5F7FA] hover:bg-slate-100 border border-slate-200 flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[#031D49] text-[#FFC400] flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Primary Phone Line</div>
                      <div className="text-base font-bold text-[#031D49] group-hover:text-[#082D68]">
                        {BUSINESS_CONFIG.primaryPhoneFormatted}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#082D68] bg-white px-2.5 py-1 rounded-md border border-slate-200">Call</span>
                </a>

                <a
                  href={buildTelUrl(BUSINESS_CONFIG.secondaryPhone)}
                  className="p-4 rounded-2xl bg-[#F5F7FA] hover:bg-slate-100 border border-slate-200 flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[#082D68] text-white flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Secondary Phone Line</div>
                      <div className="text-base font-bold text-[#031D49] group-hover:text-[#082D68]">
                        {BUSINESS_CONFIG.secondaryPhoneFormatted}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#082D68] bg-white px-2.5 py-1 rounded-md border border-slate-200">Call</span>
                </a>
              </div>

              {/* Fast WhatsApp Chat */}
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat with Technician on WhatsApp</span>
              </a>

              {/* Location Details */}
              <div className="pt-4 border-t border-slate-100 space-y-3.5 text-xs text-slate-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#082D68] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#031D49] block">Registered Hub:</strong>
                    <span>{BUSINESS_CONFIG.location}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Navigation className="w-4 h-4 text-[#082D68] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#031D49] block">Coverage Territory:</strong>
                    <span>Pammal, Chromepet, Pallavaram, Tambaram, and throughout Chennai</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#082D68] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#031D49] block">Business Hours:</strong>
                    <span>{BUSINESS_CONFIG.businessHoursNote}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Embed with Verified Coordinates */}
            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-white">
              <div className="p-4 bg-[#031D49] text-white text-xs font-bold flex items-center justify-between">
                <span>Google Business Profile Location</span>
                <span className="text-[#FFC400]">Pammal, Chennai</span>
              </div>
              <iframe
                title="SREE Agency Pammal Location Map"
                src={`https://www.google.com/maps?q=${BUSINESS_CONFIG.coordinates.lat},${BUSINESS_CONFIG.coordinates.lng}&hl=en&z=16&output=embed`}
                width="100%"
                height="280"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="p-3 bg-slate-50 border-t border-slate-200 flex gap-2">
                <a
                  href={BUSINESS_CONFIG.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 text-center text-xs font-bold text-[#031D49] bg-white border border-slate-300 rounded-lg hover:bg-slate-100"
                >
                  Get Directions
                </a>
                <a
                  href={BUSINESS_CONFIG.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 text-center text-xs font-bold text-white bg-[#031D49] rounded-lg hover:bg-[#082D68]"
                >
                  View on Google Maps
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Multi-Tab Submission Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
              {/* Segmented Mode Selector */}
              <div className="flex items-center p-1.5 bg-slate-100 rounded-2xl mb-8">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('quote');
                    setSuccessReference(null);
                  }}
                  className={`flex-1 py-2.5 px-3 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeTab === 'quote'
                      ? 'bg-white text-[#031D49] shadow-sm'
                      : 'text-slate-600 hover:text-black'
                  }`}
                >
                  <FileText className="w-4 h-4 text-[#082D68]" />
                  <span>Request Quote</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('query');
                    setSuccessReference(null);
                  }}
                  className={`flex-1 py-2.5 px-3 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeTab === 'query'
                      ? 'bg-white text-[#031D49] shadow-sm'
                      : 'text-slate-600 hover:text-black'
                  }`}
                >
                  <HelpCircle className="w-4 h-4 text-[#082D68]" />
                  <span>Ask a Query</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('callback');
                    setSuccessReference(null);
                  }}
                  className={`flex-1 py-2.5 px-3 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeTab === 'callback'
                      ? 'bg-white text-[#031D49] shadow-sm'
                      : 'text-slate-600 hover:text-black'
                  }`}
                >
                  <PhoneCall className="w-4 h-4 text-[#082D68]" />
                  <span>Callback</span>
                </button>
              </div>

              {/* Tab Title & Purpose */}
              <div className="mb-6">
                <h3 className="text-xl font-extrabold text-[#031D49]">
                  {activeTab === 'quote' && 'Request a Free Security Solution Quotation'}
                  {activeTab === 'query' && 'Ask a Security System Question or AMC Query'}
                  {activeTab === 'callback' && 'Schedule an Immediate Technical Callback'}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {activeTab === 'quote' && 'Share your property size and camera count to receive an accurate quote.'}
                  {activeTab === 'query' && 'Have a question about CCTV models, gate automation, or solar panels? Send your query.'}
                  {activeTab === 'callback' && 'Choose a preferred time slot and our team will call your mobile number directly.'}
                </p>
              </div>

              {/* Success Screen with Reference ID */}
              {successReference ? (
                <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-5">
                  <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-emerald-900">
                      Your Request Has Been Confirmed & Saved!
                    </h4>
                    <p className="text-xs text-emerald-800 mt-1 max-w-md mx-auto leading-relaxed">
                      Thank you for contacting SREE Agency. Your request has been securely recorded in our lead management system and alerted to our technical team.
                    </p>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-emerald-200 inline-block text-xs max-w-sm">
                    <span className="text-slate-500 font-semibold uppercase tracking-wider block mb-1">
                      Enquiry Reference ID
                    </span>
                    <div className="text-xl font-mono font-black text-[#031D49] tracking-wider select-all">
                      {successReference}
                    </div>
                    <button
                      onClick={handleCopyCode}
                      className="mt-2 text-xs font-semibold text-[#082D68] inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Copied to clipboard</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Reference ID</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
                    <button
                      onClick={handleResetForm}
                      className="px-5 py-2.5 text-xs font-bold text-[#031D49] bg-white border border-slate-300 rounded-xl hover:bg-slate-50 cursor-pointer"
                    >
                      Submit Another Request
                    </button>
                    <a
                      href={buildWhatsAppUrl(`Hello SREE Agency, I have submitted an enquiry with reference: ${successReference}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                </div>
              ) : (
                /* Form Fields */
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Name and Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-[#082D68] focus:ring-1 focus:ring-[#082D68] text-sm text-[#14213D] outline-none"
                      />
                    </div>

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
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-[#082D68] focus:ring-1 focus:ring-[#082D68] text-sm text-[#14213D] outline-none"
                      />
                    </div>
                  </div>

                  {/* Email & Service Category */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@example.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-[#082D68] focus:ring-1 focus:ring-[#082D68] text-sm text-[#14213D] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#031D49] mb-1">
                        Service Category <span className="text-red-600">*</span>
                      </label>
                      <select
                        value={formData.service_required}
                        onChange={(e) => setFormData({ ...formData, service_required: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-[#082D68] focus:ring-1 focus:ring-[#082D68] text-sm text-[#14213D] outline-none bg-white"
                      >
                        {SERVICES_DATA.map((s) => (
                          <option key={s.id} value={s.name}>
                            {s.name}
                          </option>
                        ))}
                        <option value="Other Enquiry">Other Security Hardware</option>
                      </select>
                    </div>
                  </div>

                  {/* Property Type and Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Property Type
                      </label>
                      <select
                        value={formData.property_type}
                        onChange={(e) => setFormData({ ...formData, property_type: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-[#082D68] focus:ring-1 focus:ring-[#082D68] text-sm text-[#14213D] outline-none bg-white"
                      >
                        <option value="Residential (Villa / Flat)">Residential (Villa / Flat)</option>
                        <option value="Apartment Complex / Gated Community">Apartment Complex / Gated Community</option>
                        <option value="Commercial Shop / Retail">Commercial Shop / Retail</option>
                        <option value="Corporate Office / Workspace">Corporate Office / Workspace</option>
                        <option value="Factory / Industrial Warehouse">Factory / Industrial Warehouse</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Location / Area in Chennai
                      </label>
                      <input
                        type="text"
                        value={formData.customer_location}
                        onChange={(e) => setFormData({ ...formData, customer_location: e.target.value })}
                        placeholder="e.g. Pammal, Chromepet, Tambaram"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-[#082D68] focus:ring-1 focus:ring-[#082D68] text-sm text-[#14213D] outline-none"
                      />
                    </div>
                  </div>

                  {/* Callback Slot (Visible when tab is callback) */}
                  {activeTab === 'callback' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Preferred Callback Date
                        </label>
                        <input
                          type="date"
                          value={formData.preferred_callback_date}
                          onChange={(e) => setFormData({ ...formData, preferred_callback_date: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs text-[#14213D] outline-none bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Preferred Time Window
                        </label>
                        <select
                          value={formData.preferred_callback_time}
                          onChange={(e) => setFormData({ ...formData, preferred_callback_time: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs text-[#14213D] outline-none bg-white"
                        >
                          <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                          <option value="Afternoon (12 PM - 3 PM)">Afternoon (12 PM - 3 PM)</option>
                          <option value="Evening (3 PM - 7 PM)">Evening (3 PM - 7 PM)</option>
                          <option value="Anytime during working hours">Anytime during working hours</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Detailed Description / Query */}
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      {activeTab === 'quote' && 'Quote Specifics (Camera count, area to cover, gate width...)'}
                      {activeTab === 'query' && 'Your Query / Questions for our Technical Team'}
                      {activeTab === 'callback' && 'Brief Topic for the Callback Discussion (Optional)'}
                    </label>
                    <textarea
                      rows={4}
                      value={formData.customer_message}
                      onChange={(e) => setFormData({ ...formData, customer_message: e.target.value })}
                      placeholder={
                        activeTab === 'quote'
                          ? 'e.g. Looking for 4 outdoor cameras with night vision and mobile app viewing...'
                          : activeTab === 'query'
                          ? 'e.g. Do you support Dahua IP camera repair or can you service existing cabling?'
                          : 'e.g. Want to discuss gate automation motors for a 12-foot sliding gate...'
                      }
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#082D68] focus:ring-1 focus:ring-[#082D68] text-sm text-[#14213D] outline-none resize-none"
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
                        I consent to SREE Agency contacting me via telephone call or WhatsApp regarding this enquiry. <span className="text-red-600">*</span>
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 px-6 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#031D49] bg-[#FFC400] hover:bg-[#ffcd20] rounded-2xl transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {loading ? (
                        <span>Submitting to Database & Dispatching Alerts...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>
                            {activeTab === 'quote' && 'Submit Free Quote Request'}
                            {activeTab === 'query' && 'Send Technical Query'}
                            {activeTab === 'callback' && 'Confirm & Request Callback'}
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
