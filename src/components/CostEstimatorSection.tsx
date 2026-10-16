import React, { useState, useId } from 'react';
import {
  Calculator,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  HardDrive,
  Video,
  Building,
  Home,
  Store,
  Factory,
  Zap,
  Info,
} from 'lucide-react';
import { BUSINESS_CONFIG, buildWhatsAppUrl } from '../config/business';

interface CostEstimatorProps {
  onSelectEstimate: (details: {
    serviceName: string;
    propertyType: string;
    cameraCount: string;
    techType: string;
    storageDays: string;
    estimatedRange: string;
    notes: string;
  }) => void;
}

export const CostEstimatorSection: React.FC<CostEstimatorProps> = ({ onSelectEstimate }) => {
  const propertySelectId = useId();
  const [propertyType, setPropertyType] = useState<'home' | 'shop' | 'office' | 'warehouse'>('home');
  const [cameraCount, setCameraCount] = useState<number>(4);
  const [cameraTech, setCameraTech] = useState<'2mp_hd' | '5mp_colorvu' | '4k_ip'>('5mp_colorvu');
  const [storageDays, setStorageDays] = useState<'15' | '30' | '60'>('30');
  const [includeGateAutomation, setIncludeGateAutomation] = useState(false);
  const [includeAmc, setIncludeAmc] = useState(false);

  const propertyLabels = {
    home: 'Independent Home / Villa / Flat',
    shop: 'Retail Store / Showroom / Boutique',
    office: 'Office / Commercial Facility',
    warehouse: 'Warehouse / Factory / Industrial Unit',
  };

  const techLabels = {
    '2mp_hd': '2MP Full HD 1080p Standard Infrared',
    '5mp_colorvu': '5MP ColorVu 24/7 Full-Color with Built-in Mic Audio',
    '4k_ip': '4K Ultra HD AI Smart IP (Human/Vehicle Detection)',
  };

  const summaryNotes = `${cameraCount}x ${techLabels[cameraTech]} for ${propertyLabels[propertyType]}, ${storageDays} Days Recording${
    includeGateAutomation ? ' + Motorized Gate Automation' : ''
  }${includeAmc ? ' + 1-Year AMC Maintenance Plan' : ''}`;

  const handleBookSurvey = () => {
    onSelectEstimate({
      serviceName: 'CCTV Camera Installation',
      propertyType: propertyLabels[propertyType],
      cameraCount: `${cameraCount} Cameras`,
      techType: techLabels[cameraTech],
      storageDays: `${storageDays} Days`,
      estimatedRange: 'Custom Quote on Survey',
      notes: `Custom Package: ${summaryNotes}`,
    });
  };

  const whatsappMessage = `Hello SREE Agency, I customized a security package on your website:
• Property: ${propertyLabels[propertyType]}
• Setup: ${cameraCount} Cameras (${techLabels[cameraTech]})
• Storage: ${storageDays} Days Hard Drive
${includeGateAutomation ? '• Included: Motorized Gate Automation\n' : ''}${includeAmc ? '• Included: 1-Year AMC Maintenance\n' : ''}Please confirm availability for a free on-site survey in Chennai.`;

  return (
    <section id="estimator" className="py-16 sm:py-24 bg-gradient-to-b from-white to-[#F5F7FA] border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#082D68]/10 text-[#082D68] text-xs font-bold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Custom Package Builder</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#031D49] tracking-tight">
            Customize Your Security Package
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Select your property needs below for a customized equipment breakdown and book a free on-site survey across Chennai.
          </p>
        </div>

        {/* Estimator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (Left) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-8">
            {/* 1. Property Type Selector */}
            <div>
              <label htmlFor={propertySelectId} className="block text-xs font-bold uppercase tracking-wider text-[#082D68] mb-3">
                1. Select Property Type
              </label>
              <div id={propertySelectId} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'home', label: 'Home / Villa', icon: Home },
                  { id: 'shop', label: 'Shop / Retail', icon: Store },
                  { id: 'office', label: 'Office', icon: Building },
                  { id: 'warehouse', label: 'Factory', icon: Factory },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = propertyType === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setPropertyType(item.id as any)}
                      className={`p-3.5 rounded-xl border text-center flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#031D49] bg-[#031D49] text-white shadow-sm ring-2 ring-[#031D49]/20'
                          : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isSelected ? 'text-[#FFC400]' : 'text-slate-500'}`} />
                      <span className="text-xs font-bold">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Camera Count Selector */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#082D68]">
                  2. Number of Cameras
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  {cameraCount} Channels Coverage
                </span>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {[2, 4, 8, 16].map((count) => {
                  const isSelected = cameraCount === count;
                  return (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setCameraCount(count)}
                      className={`py-3 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#082D68] bg-[#082D68] text-white shadow-sm ring-2 ring-[#082D68]/20'
                          : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                      }`}
                    >
                      <div className="text-lg font-black">{count}</div>
                      <div className="text-[10px] uppercase font-bold opacity-80">Cameras</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Camera Technology & Optics */}
            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-[#082D68] mb-3">
                3. Camera Technology & Clarity
              </span>
              <div className="space-y-2.5">
                {[
                  {
                    id: '2mp_hd',
                    name: '2MP Full HD 1080p Standard',
                    desc: 'Crisp daytime surveillance with up to 20m infrared night vision.',
                    tag: 'Budget-Friendly',
                  },
                  {
                    id: '5mp_colorvu',
                    name: '5MP ColorVu + Audio Recording (Most Popular)',
                    desc: 'Full 24/7 color night vision in pitch darkness plus live audio recording.',
                    tag: 'Recommended',
                  },
                  {
                    id: '4k_ip',
                    name: '4K Ultra HD AI Smart IP System',
                    desc: 'Ultra-high detail with AI vehicle/human classification and digital zoom.',
                    tag: 'High Security',
                  },
                ].map((tech) => {
                  const isSelected = cameraTech === tech.id;
                  return (
                    <div
                      key={tech.id}
                      onClick={() => setCameraTech(tech.id as any)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                        isSelected
                          ? 'border-[#031D49] bg-[#031D49]/5 ring-1 ring-[#031D49]'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="cameraTech"
                          checked={isSelected}
                          onChange={() => setCameraTech(tech.id as any)}
                          className="mt-1 accent-[#031D49]"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-[#031D49]">{tech.name}</span>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                tech.tag === 'Recommended'
                                  ? 'bg-[#FFC400] text-[#031D49]'
                                  : 'bg-slate-100 text-slate-700'
                              }`}
                            >
                              {tech.tag}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 mt-0.5">{tech.desc}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 4. Hard Drive Storage Duration */}
            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-[#082D68] mb-3">
                4. Surveillance Recording Duration
              </span>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { days: '15', label: '15 Days Backup', drive: '500GB – 1TB HDD' },
                  { days: '30', label: '30 Days Backup', drive: '1TB – 2TB HDD' },
                  { days: '60', label: '60 Days Backup', drive: '2TB – 4TB HDD' },
                ].map((s) => {
                  const isSelected = storageDays === s.days;
                  return (
                    <button
                      key={s.days}
                      type="button"
                      onClick={() => setStorageDays(s.days as any)}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#031D49] bg-[#031D49] text-white shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                      }`}
                    >
                      <HardDrive className={`w-4 h-4 mx-auto mb-1 ${isSelected ? 'text-[#FFC400]' : 'text-slate-400'}`} />
                      <div className="text-xs font-bold">{s.label}</div>
                      <div className={`text-[10px] ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
                        {s.drive}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. Optional Package Add-ons */}
            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-[#082D68] mb-3">
                5. Optional System Add-ons
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={includeGateAutomation}
                    onChange={(e) => setIncludeGateAutomation(e.target.checked)}
                    className="w-4 h-4 accent-[#031D49] rounded"
                  />
                  <div>
                    <div className="text-xs font-bold text-[#031D49]">Motorized Gate Automation</div>
                    <div className="text-[11px] text-slate-500">Includes motor drive & 2 wireless remotes</div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={includeAmc}
                    onChange={(e) => setIncludeAmc(e.target.checked)}
                    className="w-4 h-4 accent-[#031D49] rounded"
                  />
                  <div>
                    <div className="text-xs font-bold text-[#031D49]">1-Year Priority AMC Plan</div>
                    <div className="text-[11px] text-slate-500">Quarterly visits + free callout support</div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Real-Time Live Quote Breakdown Card (Right) */}
          <div className="lg:col-span-5 sticky top-24 space-y-4">
            <div className="bg-[#031D49] text-white rounded-2xl p-6 sm:p-7 shadow-xl border border-[#082D68] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#FFC400]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/10 text-[#FFC400] text-[11px] font-bold uppercase tracking-wider mb-2">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Configured Security Package</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {cameraCount} Camera Security Setup
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    *Complete customized package including branded hardware and professional installation.
                  </p>
                </div>

                {/* Package Inclusions Checklist */}
                <div className="space-y-2.5 pt-4 border-t border-white/10">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#FFC400]">
                    What's Included In This Package:
                  </div>

                  <ul className="space-y-2 text-xs text-slate-200">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#FFC400] shrink-0 mt-0.5" />
                      <span>{cameraCount}x Branded Cameras ({techLabels[cameraTech]})</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#FFC400] shrink-0 mt-0.5" />
                      <span>Branded DVR/NVR Surveillance Recorder with HDMI/VGA output</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#FFC400] shrink-0 mt-0.5" />
                      <span>Certified Surveillance Hard Drive ({storageDays} Days Auto-Overwrite)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#FFC400] shrink-0 mt-0.5" />
                      <span>Individual SMPS Power Supply + Weatherproof Junction Boxes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#FFC400] shrink-0 mt-0.5" />
                      <span>Neat conduit routing & professional termination by skilled technicians</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#FFC400] shrink-0 mt-0.5" />
                      <span>Mobile app setup on all family/staff phones (live view & alerts)</span>
                    </li>
                    {includeGateAutomation && (
                      <li className="flex items-start gap-2 text-[#FFC400]">
                        <CheckCircle2 className="w-4 h-4 text-[#FFC400] shrink-0 mt-0.5" />
                        <span>Motorized Gate Automation system with dual wireless keyfobs</span>
                      </li>
                    )}
                    {includeAmc && (
                      <li className="flex items-start gap-2 text-[#FFC400]">
                        <CheckCircle2 className="w-4 h-4 text-[#FFC400] shrink-0 mt-0.5" />
                        <span>1-Year Comprehensive AMC priority support contract</span>
                      </li>
                    )}
                  </ul>
                </div>

                {/* Primary CTA Buttons */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <button
                    onClick={handleBookSurvey}
                    className="w-full py-3.5 px-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#031D49] bg-[#FFC400] hover:bg-[#ffcd20] rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Book Free Site Survey for this Package</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href={buildWhatsAppUrl(whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 text-xs sm:text-sm font-semibold text-emerald-300 hover:text-white bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/30 rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <span>Send this Configuration to WhatsApp</span>
                  </a>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <Info className="w-3.5 h-3.5 text-[#FFC400] shrink-0" />
                  <span>Exact quotation confirmed on-site based on cable distances. No hidden fees.</span>
                </div>
              </div>
            </div>

            {/* Quick Guarantees Box */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between text-xs text-slate-700">
              <span className="font-semibold text-[#031D49]">100% Genuine Branded Equipment</span>
              <span className="text-slate-300">·</span>
              <span className="font-semibold text-[#031D49]">Free Pammal & Chennai Survey</span>
              <span className="text-slate-300">·</span>
              <span className="font-semibold text-[#031D49]">On-Site Warranty</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
