-- SREE Agency - Supabase Database Schema & Migration
-- Complete Security Solutions Database Definition
-- Compliant with PostgreSQL and Supabase Row Level Security (RLS)

-- 1. Create Enquiries Table
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference_code VARCHAR(32) NOT NULL UNIQUE,
    customer_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    enquiry_type VARCHAR(20) NOT NULL DEFAULT 'callback' CHECK (enquiry_type IN ('callback', 'quote', 'general')),
    service_required VARCHAR(100) NOT NULL,
    property_type VARCHAR(50),
    customer_location VARCHAR(150),
    customer_message TEXT,
    preferred_callback_date DATE,
    preferred_callback_time VARCHAR(50),
    consent_recorded BOOLEAN NOT NULL DEFAULT true,
    status VARCHAR(30) NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Callback Scheduled', 'Converted', 'Closed')),
    assigned_to VARCHAR(100),
    internal_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    last_contacted_at TIMESTAMPTZ,
    next_callback_at TIMESTAMPTZ,
    -- Real-time notification & sync tracking (Free-tier architecture: Discord / Slack)
    notification_delivery_status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (notification_delivery_status IN ('pending', 'sent', 'failed', 'unconfigured')),
    notification_channel VARCHAR(20) DEFAULT 'discord',
    notification_delivered_at TIMESTAMPTZ,
    notification_error_message TEXT,
    slack_delivery_status VARCHAR(20) DEFAULT 'pending',
    slack_delivered_at TIMESTAMPTZ,
    slack_error_message TEXT,
    google_sheets_synced_at TIMESTAMPTZ
);

-- 2. Indexes for efficient lookup
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON public.enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_phone ON public.enquiries(phone_number);
CREATE INDEX IF NOT EXISTS idx_enquiries_reference ON public.enquiries(reference_code);
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON public.enquiries(created_at DESC);

-- 3. Automatic updated_at Trigger
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_enquiries_modtime ON public.enquiries;
CREATE TRIGGER update_enquiries_modtime
    BEFORE UPDATE ON public.enquiries
    FOR EACH ROW
    EXECUTE PROCEDURE update_modified_column();

-- 4. Row Level Security (RLS)
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- Allow anonymous visitors to INSERT their own callback/enquiry requests
CREATE POLICY "Allow public insert of customer enquiries"
    ON public.enquiries
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Restrict SELECT, UPDATE, DELETE to authenticated administrators only
CREATE POLICY "Allow authenticated staff to view enquiries"
    ON public.enquiries
    FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated staff to update enquiries"
    ON public.enquiries
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Note: Customer enquiries are never made readable to unauthenticated users.
