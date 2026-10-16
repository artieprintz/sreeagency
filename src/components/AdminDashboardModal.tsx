import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  Phone,
  Search,
  Download,
  CheckCircle,
  AlertCircle,
  FileText,
  User,
  Filter,
  LogOut,
  RefreshCw,
  Bell,
  Database,
  Send,
  Shield,
  Layers,
} from 'lucide-react';
import { buildTelUrl } from '../config/business';

interface EnquiryRecord {
  id: string;
  reference_code: string;
  customer_name: string;
  phone_number: string;
  email?: string;
  enquiry_type: 'callback' | 'quote' | 'general';
  service_required: string;
  property_type?: string;
  customer_location?: string;
  customer_message?: string;
  preferred_callback_date?: string;
  preferred_callback_time?: string;
  consent_recorded: boolean;
  status: 'New' | 'Contacted' | 'Callback Scheduled' | 'Converted' | 'Closed';
  assigned_to?: string;
  internal_notes?: string;
  created_at: string;
  updated_at: string;
  last_contacted_at?: string;
  next_callback_at?: string;
  notification_delivery_status?: 'pending' | 'sent' | 'failed' | 'unconfigured';
  notification_channel?: 'discord' | 'slack';
  notification_delivered_at?: string;
  notification_error_message?: string;
  slack_delivery_status?: 'pending' | 'sent' | 'failed' | 'unconfigured';
  slack_delivered_at?: string;
  slack_error_message?: string;
  google_sheets_synced_at?: string;
}

interface IntegrationInfo {
  storage?: { status: string; label: string; quotaNote: string };
  discord?: { status: string; label: string; quotaNote: string };
  slack?: { status: string; channel: string; label: string; quotaNote: string };
  googleSheets?: { status: string; label: string };
  googleReviews?: { status: string; label: string; policyNote: string };
}

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('sree_admin_token'));
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);

  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>([]);
  const [counts, setCounts] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    callback_scheduled: 0,
    converted: 0,
    closed: 0,
  });

  const [integrationInfo, setIntegrationInfo] = useState<IntegrationInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryRecord | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'callbacks' | 'integrations'>('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Editing state for selected enquiry
  const [editStatus, setEditStatus] = useState<string>('New');
  const [editNotes, setEditNotes] = useState<string>('');
  const [editNextCallback, setEditNextCallback] = useState<string>('');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);
  const [savingChanges, setSavingChanges] = useState(false);

  // Slack retry state
  const [retryingSlack, setRetryingSlack] = useState(false);
  const [slackRetryResult, setSlackRetryResult] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      fetchEnquiries();
      fetchIntegrationStatus();
    }
  }, [token, statusFilter, searchQuery]);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoginLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Invalid credentials');
      }

      setToken(data.token);
      localStorage.setItem('sree_admin_token', data.token);
      setPasswordInput('');
    } catch (err: any) {
      setLoginError(err.message || 'Login failed');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    if (token) {
      try {
        await fetch('/api/admin/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        console.error('Logout error:', err);
      }
    }
    setToken(null);
    localStorage.removeItem('sree_admin_token');
    setEnquiries([]);
    setSelectedEnquiry(null);
  };

  const fetchEnquiries = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const url = new URL('/api/admin/enquiries', window.location.origin);
      if (statusFilter !== 'all') {
        url.searchParams.set('status', statusFilter);
      }
      if (searchQuery.trim()) {
        url.searchParams.set('search', searchQuery.trim());
      }

      const res = await fetch(url.toString(), {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        handleLogout();
        return;
      }

      const data = await res.json();
      setEnquiries(data.enquiries || []);
      setCounts(data.counts || { total: 0, new: 0, contacted: 0, callback_scheduled: 0, converted: 0, closed: 0 });

      if (selectedEnquiry) {
        const found = (data.enquiries || []).find((e: EnquiryRecord) => e.id === selectedEnquiry.id);
        if (found) {
          setSelectedEnquiry(found);
          setEditStatus(found.status);
          setEditNotes(found.internal_notes || '');
          setEditNextCallback(found.next_callback_at ? found.next_callback_at.substring(0, 16) : '');
        }
      }
    } catch (err) {
      console.error('Failed to load enquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchIntegrationStatus = async () => {
    if (!token) return;
    try {
      const res = await fetch('/api/admin/integration-status', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setIntegrationInfo(data.integrations);
      }
    } catch (err) {
      console.error('Failed to load integration status:', err);
    }
  };

  const handleSelectEnquiry = (enq: EnquiryRecord) => {
    setSelectedEnquiry(enq);
    setEditStatus(enq.status);
    setEditNotes(enq.internal_notes || '');
    setEditNextCallback(enq.next_callback_at ? enq.next_callback_at.substring(0, 16) : '');
    setSaveSuccessMsg(null);
    setSlackRetryResult(null);
  };

  const handleSaveChanges = async () => {
    if (!token || !selectedEnquiry) return;
    setSavingChanges(true);
    setSaveSuccessMsg(null);

    try {
      const res = await fetch(`/api/admin/enquiries/${selectedEnquiry.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: editStatus,
          internal_notes: editNotes,
          next_callback_at: editNextCallback || null,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update enquiry');
      }

      setSaveSuccessMsg('Lead updated successfully');
      fetchEnquiries();
      setTimeout(() => setSaveSuccessMsg(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Error saving changes');
    } finally {
      setSavingChanges(false);
    }
  };

  const handleRetrySlack = async () => {
    if (!token || !selectedEnquiry) return;
    setRetryingSlack(true);
    setSlackRetryResult(null);

    try {
      const res = await fetch(`/api/admin/enquiries/${selectedEnquiry.id}/retry-slack`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (data.success) {
        setSlackRetryResult('Slack notification dispatched successfully to #customer-enquiries!');
      } else {
        setSlackRetryResult(`Failed: ${data.error || 'Check SLACK_WEBHOOK_URL configuration'}`);
      }
      fetchEnquiries();
    } catch (err: any) {
      setSlackRetryResult(`Error: ${err.message}`);
    } finally {
      setRetryingSlack(false);
    }
  };

  const handleExportCsv = () => {
    if (!token) return;
    fetch('/api/admin/export-csv', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `sree-agency-enquiries-${new Date().toISOString().slice(0, 10)}.csv`;
        link.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((err) => alert('CSV download failed: ' + err));
  };

  const displayedEnquiries =
    activeTab === 'callbacks'
      ? enquiries.filter((e) => e.status === 'Callback Scheduled' || e.enquiry_type === 'callback')
      : enquiries;

  const isOverdue = (enq: EnquiryRecord) => {
    if (!enq.next_callback_at) return false;
    return new Date(enq.next_callback_at).getTime() < Date.now() && enq.status !== 'Closed' && enq.status !== 'Converted';
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-xs overflow-y-auto"
    >
      <div className="relative w-full max-w-6xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header with Official Logo */}
        <div className="bg-[#031D49] px-6 py-4 text-white flex items-center justify-between border-b border-[#082D68]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white p-1 border border-[#FFC400]/50 shadow-md flex items-center justify-center shrink-0">
              <img
                src="/images/logo.png"
                alt="SREE Agency Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">SREE Agency Lead Management System</h2>
              <p className="text-[11px] text-slate-300">
                Lead Management · Real-Time Alerts: Discord Webhook
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {token && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close Admin Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#F5F7FA]">
          {!token ? (
            /* Login Gate */
            <div className="max-w-md mx-auto py-12 px-6 bg-white rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-white p-1.5 border border-[#FFC400]/50 shadow-md flex items-center justify-center mb-4">
                <img
                  src="/images/logo.png"
                  alt="SREE Agency Official Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-[#031D49] mb-1">Staff Authentication Required</h3>
              <p className="text-xs text-slate-500 mb-6">
                Enter your administrative password to access customer leads and callback requests.
              </p>

              {loginError && (
                <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <input
                    type="password"
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter admin password (default: sreeadmin2026)"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-[#082D68] focus:ring-1 focus:ring-[#082D68] text-sm text-[#14213D] outline-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full py-3 px-4 text-xs font-bold uppercase tracking-wider text-[#031D49] bg-[#FFC400] hover:bg-[#ffcd20] rounded-xl transition-all shadow-sm active:scale-98 cursor-pointer disabled:opacity-50"
                >
                  {loginLoading ? 'Authenticating...' : 'Sign In to Dashboard'}
                </button>
              </form>
            </div>
          ) : (
            /* Authenticated Admin Dashboard */
            <div className="space-y-6">
              {/* Derived Database Counts Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                  <div className="text-[11px] font-semibold text-slate-500">Total Leads</div>
                  <div className="text-2xl font-black text-[#031D49] tabular-nums mt-0.5">{counts.total}</div>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-amber-200 bg-amber-50/30">
                  <div className="text-[11px] font-semibold text-amber-800">New Enquiries</div>
                  <div className="text-2xl font-black text-amber-700 tabular-nums mt-0.5">{counts.new}</div>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-blue-200 bg-blue-50/30">
                  <div className="text-[11px] font-semibold text-blue-800">Callbacks Sched.</div>
                  <div className="text-2xl font-black text-blue-700 tabular-nums mt-0.5">
                    {counts.callback_scheduled}
                  </div>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-purple-200 bg-purple-50/30">
                  <div className="text-[11px] font-semibold text-purple-800">Contacted</div>
                  <div className="text-2xl font-black text-purple-700 tabular-nums mt-0.5">{counts.contacted}</div>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/30">
                  <div className="text-[11px] font-semibold text-emerald-800">Converted</div>
                  <div className="text-2xl font-black text-emerald-700 tabular-nums mt-0.5">{counts.converted}</div>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                  <div className="text-[11px] font-semibold text-slate-500">Closed</div>
                  <div className="text-2xl font-black text-slate-600 tabular-nums mt-0.5">{counts.closed}</div>
                </div>
              </div>

              {/* Action Toolbar & Tab Switcher */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="inline-flex bg-slate-100 p-1 rounded-lg text-xs font-semibold">
                    <button
                      onClick={() => setActiveTab('all')}
                      className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                        activeTab === 'all' ? 'bg-white text-[#031D49] shadow-xs' : 'text-slate-600 hover:text-black'
                      }`}
                    >
                      All Leads ({counts.total})
                    </button>
                    <button
                      onClick={() => setActiveTab('callbacks')}
                      className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                        activeTab === 'callbacks'
                          ? 'bg-white text-[#031D49] shadow-xs'
                          : 'text-slate-600 hover:text-black'
                      }`}
                    >
                      Callbacks
                    </button>
                    <button
                      onClick={() => setActiveTab('integrations')}
                      className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                        activeTab === 'integrations'
                          ? 'bg-white text-[#031D49] shadow-xs'
                          : 'text-slate-600 hover:text-black'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5 text-[#082D68]" />
                      <span>Free-Tier Architecture</span>
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      fetchEnquiries();
                      fetchIntegrationStatus();
                    }}
                    title="Refresh data"
                    className="p-2 text-slate-600 hover:text-black rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  </button>
                </div>

                {activeTab !== 'integrations' && (
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="relative flex-1 sm:w-52">
                      <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search name, phone, ref..."
                        className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-300 text-xs text-[#14213D] outline-none focus:border-[#082D68]"
                      />
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-slate-600">
                      <Filter className="w-3.5 h-3.5 text-slate-400" />
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs bg-white outline-none"
                      >
                        <option value="all">All Statuses</option>
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Callback Scheduled">Callback Scheduled</option>
                        <option value="Converted">Converted</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </div>

                    <button
                      onClick={handleExportCsv}
                      className="px-3 py-1.5 text-xs font-semibold text-[#031D49] bg-[#FFC400] hover:bg-[#ffcd20] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>CSV Export</span>
                    </button>
                  </div>
                )}
              </div>

              {/* View 1: Free-Tier Integrations & Quotas Health */}
              {activeTab === 'integrations' ? (
                <div className="space-y-4">
                  <div className="bg-white p-6 rounded-2xl border border-slate-200">
                    <h3 className="text-base font-bold text-[#031D49] mb-1">
                      Free-Tier System Integrations & Health Monitor
                    </h3>
                    <p className="text-xs text-slate-500 mb-6">
                      SREE Agency operates on an independent, zero-subscription architecture with resilient local persistence and real-time Discord notifications.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Primary Storage Engine */}
                      <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Database className="w-4 h-4 text-[#082D68]" />
                            <strong className="text-xs text-[#031D49]">Primary Storage Engine</strong>
                          </div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                            STORAGE ACTIVE
                          </span>
                        </div>
                        <p className="text-xs text-slate-700 font-medium">
                          {integrationInfo?.storage?.label || 'Persistent Local & Cloud-Safe Storage'}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          {integrationInfo?.storage?.quotaNote || 'High-reliability JSON storage with zero external database dependencies.'}
                        </p>
                      </div>

                      {/* Discord Webhooks */}
                      <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Bell className="w-4 h-4 text-indigo-600" />
                            <strong className="text-xs text-[#031D49]">Real-Time Notifications</strong>
                          </div>
                          <span
                            className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800"
                          >
                            DISCORD ACTIVE
                          </span>
                        </div>
                        <p className="text-xs text-slate-700 font-medium">
                          Destination: <code className="text-xs bg-slate-200 px-1 py-0.5 rounded">Discord Incoming Webhook</code>
                        </p>
                        <p className="text-[11px] text-slate-500">
                          Instant rich embeds with customer details, phone click-to-call, and reference IDs.
                        </p>
                      </div>

                      {/* Google Sheets Sync */}
                      <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                        <div className="flex items-center justify-between">
                          <strong className="text-xs text-[#031D49]">Google Sheets Sync</strong>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                            {integrationInfo?.googleSheets?.status === 'connected' ? 'CONNECTED' : 'OPTIONAL'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-700">
                          {integrationInfo?.googleSheets?.label || 'Google Sheets Webhook Sync Optional'}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          Optional auxiliary sync. Local database remains the primary source of truth.
                        </p>
                      </div>

                      {/* Google Reviews */}
                      <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                        <div className="flex items-center justify-between">
                          <strong className="text-xs text-[#031D49]">Google Reviews Integration</strong>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                            TRUTHFUL MODE
                          </span>
                        </div>
                        <p className="text-xs text-slate-700">
                          {integrationInfo?.googleReviews?.label || 'Verified Google Business Profile Reviews Displayed'}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          Strict policy: Zero fabricated reviews, simulated ratings, or fake testimonials.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* View 2: Enquiries List & Detail Inspector */
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Master List */}
                  <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                    {displayedEnquiries.length === 0 ? (
                      <div className="p-12 text-center text-slate-500">
                        <FileText className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                        <p className="text-sm font-semibold text-slate-700">No Enquiry Records Found</p>
                        <p className="text-xs text-slate-400 mt-1">
                          When visitors submit callback requests or quotes, they appear here persistently.
                        </p>
                      </div>
                    ) : (
                      <div className="divide-y divide-slate-100 max-h-[520px] overflow-y-auto">
                        {displayedEnquiries.map((enq) => {
                          const overdue = isOverdue(enq);
                          const isSelected = selectedEnquiry?.id === enq.id;
                          return (
                            <div
                              key={enq.id}
                              onClick={() => handleSelectEnquiry(enq)}
                              className={`p-4 hover:bg-slate-50 cursor-pointer transition-colors ${
                                isSelected ? 'bg-blue-50/50 border-l-4 border-[#082D68]' : ''
                              }`}
                            >
                              <div className="flex items-start justify-between gap-2 mb-1.5">
                                <div>
                                  <span className="text-[11px] font-mono font-bold text-[#082D68]">
                                    {enq.reference_code}
                                  </span>
                                  <h4 className="text-sm font-bold text-[#031D49]">{enq.customer_name}</h4>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  {overdue && (
                                    <span className="text-[10px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded">
                                      Overdue Callback
                                    </span>
                                  )}
                                  <span
                                    className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                                      enq.status === 'New'
                                        ? 'bg-amber-100 text-amber-800'
                                        : enq.status === 'Callback Scheduled'
                                        ? 'bg-blue-100 text-blue-800'
                                        : enq.status === 'Converted'
                                        ? 'bg-emerald-100 text-emerald-800'
                                        : 'bg-slate-100 text-slate-700'
                                    }`}
                                  >
                                    {enq.status}
                                  </span>
                                </div>
                              </div>

                              <div className="text-xs text-slate-600 flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                                <span className="font-medium text-[#031D49]">{enq.service_required}</span>
                                <span>·</span>
                                <span>{enq.phone_number}</span>
                                {enq.customer_location && (
                                  <>
                                    <span>·</span>
                                    <span>{enq.customer_location}</span>
                                  </>
                                )}
                              </div>

                              <div className="text-[11px] text-slate-400 mt-2 flex items-center justify-between">
                                <span>Received: {new Date(enq.created_at).toLocaleString()}</span>
                                <div className="flex items-center gap-2">
                                  {/* Slack notification status icon */}
                                  <span
                                    title={`Slack status: ${enq.slack_delivery_status}`}
                                    className={`text-[10px] px-1.5 py-0.5 rounded ${
                                      enq.slack_delivery_status === 'sent'
                                        ? 'bg-emerald-50 text-emerald-700'
                                        : enq.slack_delivery_status === 'failed'
                                        ? 'bg-red-50 text-red-700'
                                        : 'bg-slate-100 text-slate-600'
                                    }`}
                                  >
                                    Slack: {enq.slack_delivery_status}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Detail & Action Inspector */}
                  <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
                    {selectedEnquiry ? (
                      <div className="space-y-5">
                        <div className="border-b border-slate-100 pb-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-mono font-bold text-[#082D68]">
                              {selectedEnquiry.reference_code}
                            </span>
                            <span className="text-[11px] text-slate-500">
                              {new Date(selectedEnquiry.created_at).toLocaleString()}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-[#031D49]">{selectedEnquiry.customer_name}</h3>
                          <p className="text-xs text-slate-500 capitalize">
                            Type: {selectedEnquiry.enquiry_type} Enquiry
                          </p>
                        </div>

                        {/* Clickable Phone Number */}
                        <div className="p-3 bg-[#F5F7FA] rounded-lg border border-slate-200 flex items-center justify-between">
                          <div>
                            <div className="text-[10px] uppercase font-bold text-slate-500">Customer Phone</div>
                            <div className="text-sm font-bold text-[#031D49] font-mono">
                              {selectedEnquiry.phone_number}
                            </div>
                          </div>
                          <a
                            href={buildTelUrl(selectedEnquiry.phone_number)}
                            className="px-3 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg flex items-center gap-1.5 transition-colors"
                          >
                            <Phone className="w-3 h-3" />
                            <span>Call Lead</span>
                          </a>
                        </div>

                        {/* Discord Delivery Status Card with Retry Action */}
                        <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                              <Bell className="w-3.5 h-3.5 text-indigo-600" />
                              <span>Discord Webhook</span>
                            </span>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                                selectedEnquiry.notification_delivery_status === 'sent' || selectedEnquiry.slack_delivery_status === 'sent'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : selectedEnquiry.notification_delivery_status === 'failed' || selectedEnquiry.slack_delivery_status === 'failed'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-slate-200 text-slate-700'
                              }`}
                            >
                              {selectedEnquiry.notification_delivery_status || selectedEnquiry.slack_delivery_status || 'pending'}
                            </span>
                          </div>

                          {selectedEnquiry.notification_delivered_at && (
                            <p className="text-[10px] text-slate-500">
                              Delivered at: {new Date(selectedEnquiry.notification_delivered_at).toLocaleTimeString()}
                            </p>
                          )}

                          {selectedEnquiry.notification_error_message && (
                            <p className="text-[10px] text-red-600">
                              Error: {selectedEnquiry.notification_error_message}
                            </p>
                          )}

                          <div className="pt-1">
                            <button
                              onClick={handleRetrySlack}
                              disabled={retryingSlack}
                              className="w-full py-1.5 px-2 text-[11px] font-semibold text-[#031D49] bg-white border border-slate-300 hover:bg-slate-100 rounded flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                            >
                              <Send className="w-3 h-3 text-[#082D68]" />
                              <span>{retryingSlack ? 'Dispatching to Discord...' : 'Retry Discord Notification'}</span>
                            </button>
                          </div>

                          {slackRetryResult && (
                            <p className="text-[10px] text-slate-700 bg-white p-1.5 rounded border border-slate-200">
                              {slackRetryResult}
                            </p>
                          )}
                        </div>

                        {/* Details */}
                        <div className="space-y-1.5 text-xs text-slate-700">
                          <div>
                            <strong>Service:</strong> {selectedEnquiry.service_required}
                          </div>
                          {selectedEnquiry.email && (
                            <div>
                              <strong>Email:</strong> {selectedEnquiry.email}
                            </div>
                          )}
                          {selectedEnquiry.customer_location && (
                            <div>
                              <strong>Location:</strong> {selectedEnquiry.customer_location}
                            </div>
                          )}
                          {selectedEnquiry.property_type && (
                            <div>
                              <strong>Property:</strong> {selectedEnquiry.property_type}
                            </div>
                          )}
                          {selectedEnquiry.preferred_callback_time && (
                            <div>
                              <strong>Preferred Time:</strong> {selectedEnquiry.preferred_callback_time}
                            </div>
                          )}
                          {selectedEnquiry.preferred_callback_date && (
                            <div>
                              <strong>Preferred Date:</strong> {selectedEnquiry.preferred_callback_date}
                            </div>
                          )}
                          {selectedEnquiry.customer_message && (
                            <div className="p-2.5 bg-slate-50 rounded border border-slate-100 text-slate-800">
                              <strong>Note:</strong> "{selectedEnquiry.customer_message}"
                            </div>
                          )}
                        </div>

                        {/* Edit Status & Callback Schedule */}
                        <div className="border-t border-slate-100 pt-4 space-y-3">
                          <h4 className="text-xs font-bold text-[#031D49] uppercase tracking-wider">
                            Manage Lead Status
                          </h4>

                          <div>
                            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                              Current Status
                            </label>
                            <select
                              value={editStatus}
                              onChange={(e) => setEditStatus(e.target.value)}
                              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white outline-none"
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Callback Scheduled">Callback Scheduled</option>
                              <option value="Converted">Converted</option>
                              <option value="Closed">Closed</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                              Schedule Next Callback (Date & Time)
                            </label>
                            <input
                              type="datetime-local"
                              value={editNextCallback}
                              onChange={(e) => setEditNextCallback(e.target.value)}
                              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                              Internal Staff Notes
                            </label>
                            <textarea
                              rows={2}
                              value={editNotes}
                              onChange={(e) => setEditNotes(e.target.value)}
                              placeholder="Notes on customer quote, premises visit, follow-up..."
                              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 outline-none resize-none"
                            />
                          </div>

                          {saveSuccessMsg && (
                            <div className="p-2 rounded bg-emerald-50 text-emerald-800 text-xs flex items-center gap-1.5">
                              <CheckCircle className="w-3.5 h-3.5" />
                              <span>{saveSuccessMsg}</span>
                            </div>
                          )}

                          <button
                            onClick={handleSaveChanges}
                            disabled={savingChanges}
                            className="w-full py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#031D49] hover:bg-[#082D68] rounded-lg transition-colors cursor-pointer"
                          >
                            {savingChanges ? 'Saving Changes...' : 'Save Lead Updates'}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="py-12 text-center text-slate-400">
                        <User className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                        <p className="text-xs">Select any enquiry to inspect details, schedule callbacks, or retry Slack notifications.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
