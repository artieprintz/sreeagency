import React, { useState } from 'react';
import { MapPin, Navigation, Clock, CheckCircle2, Phone, ExternalLink } from 'lucide-react';
import { BUSINESS_CONFIG, buildTelUrl } from '../config/business';

interface ServiceAreasSectionProps {
  onRequestCallback?: (areaName?: string) => void;
}

export const ServiceAreasSection: React.FC<ServiceAreasSectionProps> = ({ onRequestCallback }) => {
  const [selectedZone, setSelectedZone] = useState<'all' | 'primary' | 'south' | 'central'>('all');

  const areas = [
    { name: 'Pammal', zone: 'primary', eta: 'Same-day / Immediate', tag: 'Headquarters Hub' },
    { name: 'Chromepet', zone: 'primary', eta: 'Under 1 hour', tag: 'Core Coverage' },
    { name: 'Pallavaram', zone: 'primary', eta: 'Under 1 hour', tag: 'Core Coverage' },
    { name: 'Tambaram (East & West)', zone: 'primary', eta: 'Under 2 hours', tag: 'Core Coverage' },
    { name: 'Pozhichalur', zone: 'primary', eta: 'Same-day', tag: 'Local Area' },
    { name: 'Anakaputhur', zone: 'primary', eta: 'Same-day', tag: 'Local Area' },
    { name: 'Kundrathur', zone: 'primary', eta: 'Same-day', tag: 'Local Area' },
    { name: 'Medavakkam', zone: 'south', eta: 'Same-day', tag: 'Extended South' },
    { name: 'Perungalathur', zone: 'south', eta: 'Same-day', tag: 'Extended South' },
    { name: 'Vandalur', zone: 'south', eta: 'Same-day', tag: 'Extended South' },
    { name: 'Sholinganallur (OMR)', zone: 'south', eta: 'Scheduled', tag: 'IT Corridor' },
    { name: 'Velachery', zone: 'central', eta: 'Scheduled', tag: 'Central Chennai' },
    { name: 'Guindy', zone: 'central', eta: 'Scheduled', tag: 'Central Chennai' },
    { name: 'Porur', zone: 'central', eta: 'Scheduled', tag: 'West Chennai' },
    { name: 'Madipakkam', zone: 'south', eta: 'Same-day', tag: 'South Chennai' },
    { name: 'Nanganallur', zone: 'central', eta: 'Same-day', tag: 'Central Chennai' },
  ];

  const filteredAreas = areas.filter((a) => {
    if (selectedZone === 'all') return true;
    return a.zone === selectedZone;
  });

  return (
    <section id="areas" className="py-16 sm:py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#082D68]/10 text-[#082D68] text-xs font-bold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>Chennai Local Service Coverage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#031D49] tracking-tight">
            Service Areas Across Chennai
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Based centrally in Pammal, SREE Agency provides on-site surveys, swift installation, and same-day maintenance across key residential and commercial localities.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'all', label: 'All Localities' },
            { id: 'primary', label: 'Pammal & Immediate Suburbs' },
            { id: 'south', label: 'South Chennai & OMR' },
            { id: 'central', label: 'Central & West Chennai' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedZone(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedZone === tab.id
                  ? 'bg-[#031D49] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Areas Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredAreas.map((area) => (
            <div
              key={area.name}
              className="p-4 rounded-xl border border-slate-200 bg-[#F5F7FA] hover:border-[#082D68]/40 hover:bg-white transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                    {area.tag}
                  </span>
                  <MapPin className="w-3.5 h-3.5 text-[#082D68] group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="font-bold text-sm text-[#031D49] mb-1">{area.name}</h3>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Clock className="w-3 h-3 text-emerald-600" />
                  <span>ETA: {area.eta}</span>
                </div>
              </div>

              {onRequestCallback && (
                <div className="pt-3 mt-3 border-t border-slate-200/80">
                  <button
                    onClick={() => onRequestCallback(area.name)}
                    className="text-xs font-bold text-[#082D68] hover:text-[#031D49] flex items-center gap-1 cursor-pointer"
                  >
                    <span>Request Visit</span>
                    <span>→</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Free Site Survey Guarantee Callout */}
        <div className="mt-12 bg-gradient-to-r from-[#031D49] to-[#082D68] text-white p-6 sm:p-8 rounded-2xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-xs font-bold uppercase tracking-wider text-[#FFC400]">
              Free On-Site Inspection Guarantee
            </div>
            <h3 className="text-xl sm:text-2xl font-bold">
              Need CCTV or Security in Another Area in Chennai?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              We cover installations and maintenance throughout the Greater Chennai region. Contact our team to schedule a prompt survey.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={buildTelUrl(BUSINESS_CONFIG.primaryPhone)}
              className="px-5 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#031D49] bg-[#FFC400] hover:bg-[#ffcd20] rounded-xl transition-all shadow-md flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call: {BUSINESS_CONFIG.primaryPhoneFormatted}</span>
            </a>
            <a
              href={BUSINESS_CONFIG.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-colors flex items-center gap-2"
            >
              <span>View Map</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
