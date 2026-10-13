-- SREE Agency Supabase Schema & Row Level Security (RLS) Policies
-- Migration for Free-Tier PostgreSQL on Supabase

-- 1. Create Enquiries Table
CREATE TABLE IF NOT EXISTS public.enquiries (
    id TEXT PRIMARY KEY,
    reference_code TEXT NOT NULL UNIQUE,
    customer_name TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    email TEXT,
    enquiry_type TEXT NOT NULL DEFAULT 'callback' CHECK (enquiry_type IN ('callback', 'quote', 'general', 'query')),
    service_required TEXT NOT NULL,
    property_type TEXT,
    customer_location TEXT,
    customer_message TEXT,
    preferred_callback_date TEXT,
    preferred_callback_time TEXT,
    consent_recorded BOOLEAN NOT NULL DEFAULT true,
    status TEXT NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Callback Scheduled', 'Converted', 'Closed')),
    assigned_to TEXT,
    internal_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    last_contacted_at TIMESTAMPTZ,
    next_callback_at TIMESTAMPTZ,
    notification_delivery_status TEXT DEFAULT 'pending' CHECK (notification_delivery_status IN ('pending', 'sent', 'failed', 'unconfigured')),
    notification_channel TEXT DEFAULT 'discord',
    notification_delivered_at TIMESTAMPTZ,
    notification_error_message TEXT,
    slack_delivery_status TEXT DEFAULT 'pending' CHECK (slack_delivery_status IN ('pending', 'sent', 'failed', 'unconfigured')),
    google_sheets_synced_at TIMESTAMPTZ
);

-- 2. Indexes for Rapid Search & Dashboard Queries
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON public.enquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON public.enquiries (status);
CREATE INDEX IF NOT EXISTS idx_enquiries_phone ON public.enquiries (phone_number);
CREATE INDEX IF NOT EXISTS idx_enquiries_ref ON public.enquiries (reference_code);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies
-- Policy 1: Anyone (public anon key) can insert a new enquiry record
CREATE POLICY "Public visitors can submit enquiries"
    ON public.enquiries
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Policy 2: Service role / Authenticated admin full read/write access
CREATE POLICY "Service role and staff administrators full access"
    ON public.enquiries
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- 5. Auto-update timestamp trigger
CREATE OR REPLACE FUNCTION update_enquiries_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_enquiries_updated_at ON public.enquiries;
CREATE TRIGGER trigger_enquiries_updated_at
    BEFORE UPDATE ON public.enquiries
    FOR EACH ROW
    EXECUTE FUNCTION update_enquiries_updated_at();
