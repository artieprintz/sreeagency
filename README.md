# SREE Agency — Complete Security Solutions Website

Production-ready business website and persistent lead-management platform for **SREE Agency**, providing CCTV camera installation, smart Wi-Fi cameras, gate automation, solar panel systems, and AMC maintenance services in Pammal, Chennai, Tamil Nadu, India.

---

## 1. Free-Tier Architecture Overview

The system is engineered on a **100% Free-Tier Architecture** requiring zero paid upgrades:

- **Primary Database:** **Supabase Free** (PostgreSQL with Row Level Security, 500 MB database, 50,000 monthly active users, persistent leads).
- **Real-Time Notification Destination:** **Slack Free** (Incoming Webhook to private `#customer-enquiries` channel, 90-day history, unlimited webhook posts).
- **Review System:** **Google Places API** (Authentic customer reviews with strict zero-fake-data policy).
- **Auxiliary Integration:** Optional **Google Sheets** webhook sync (Supabase remains the single source of truth).
- **Backend Service:** Full-stack Express with Node.js on Port 3000.

---

## 2. Business Profile & Contact Information

- **Business Name:** SREE Agency (*Sree Agency CCTV CAMERA installation and service*)
- **Tagline:** Secure Today, Safe Tomorrow!
- **Secondary Tagline:** Complete Security Solutions
- **Primary Phone:** `9500100061` (+91 95001 00061)
- **Secondary Phone:** `8939450061` (+91 89394 50061)
- **WhatsApp Support:** `+919500100061`
- **Location:** Pammal, Chennai, Tamil Nadu, India
- **Coordinates:** `12.9753406, 80.1327223`
- **Service Area:** Pammal, Chromepet, Pallavaram, Tambaram, and throughout Chennai
- **Official Google Maps Listing:** [SREE Agency Google Maps Listing](https://www.google.com/maps/place/Sree+Agency+CCTV+CAMERA+installation+and+service/@12.9753377,80.13265,17z/data=!4m15!1m8!3m7!1s0x3a525f0569002d97:0x37c956058c7cfa3f!2sSree+Agency+CCTV+CAMERA+installation+and+service!8m2!3d12.9753406!4d80.1327223!10e1!16s%2Fg%2F11nj1llmq6!3m5!1s0x3a525f0569002d97:0x37c956058c7cfa3f!8m2!3d12.9753406!4d80.1327223!16s%2Fg%2F11nj1llmq6)

---

## 3. Slack Free Webhook Setup (`#customer-enquiries`)

To connect real-time notifications to your team's Slack:

1. In your Slack workspace, create a private channel named `#customer-enquiries`.
2. Go to [Slack API: Your Apps](https://api.slack.com/apps) and click **Create New App** > **From scratch**.
3. Name it `SREE Agency Leads` and select your workspace.
4. In the left sidebar, click **Incoming Webhooks** and switch the toggle to **On**.
5. Click **Add New Webhook to Workspace** and select `#customer-enquiries`.
6. Copy the generated Webhook URL (format: `https://hooks.slack.com/services/T.../B.../...`).
7. Add it to your server environment variables:
   ```env
   SLACK_WEBHOOK_URL="<YOUR_SLACK_WEBHOOK_URL>"
   ```

### Notification Delivery Flow & Retry System
- **Order of Operations:** The enquiry is first written and confirmed in the primary database. **Only after confirmed database persistence** is the Slack notification dispatched.
- **Fail-Safe Delivery:** If Slack encounters a network hiccup or temporary rate limit, the customer enquiry remains 100% safe in the database.
- **Admin Dashboard Retry:** Staff can view the Slack status (`sent`, `pending`, `failed`) in the Admin Dashboard and click **Retry Slack Notification** at any time.

---

## 4. Supabase Free Database Setup

1. Create a free project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** in Supabase and run the migration script located at `supabase/schema.sql`.
3. Retrieve your project URL and service role key under **Settings** > **API**.
4. Configure environment variables in `.env`:
   ```env
   SUPABASE_URL="https://your-project-id.supabase.co"
   SUPABASE_ANON_KEY="your-anon-key"
   SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
   ```
5. **Row Level Security (RLS):** RLS policies are applied to ensure public visitors can only insert their own enquiries, while reading and updating records is restricted to authenticated administrators.

---

## 5. Staff Administrator Dashboard

- Accessible via the **Staff** link in the navigation header.
- Default Admin Password: `sreeadmin2026` (configurable via `ADMIN_PASSWORD`).
- **Features:**
  - Real database counts (zero when empty; strictly no fake seed records).
  - Search by customer name, phone, or reference code.
  - Filter by status (`New`, `Contacted`, `Callback Scheduled`, `Converted`, `Closed`) or service.
  - Clickable `tel:` call button for rapid lead response.
  - Schedule callback dates and times with automatic overdue alert badges.
  - Internal staff notes editor.
  - Slack notification status badge & **Retry Slack Notification** button.
  - **Free-Tier Architecture Health Tab** showing connection status of Supabase, Slack, Google Sheets, and Google Places.
  - One-click CSV export.

---

## 6. Strict Google Reviews Policy

- Live reviews are served through `/api/reviews` querying the Google Places API.
- If Google API credentials are not configured or the service is unreachable, the website displays a verified Google Maps card linking directly to `Sree Agency CCTV CAMERA installation and service` with:
  - **Read All Reviews on Google**
  - **Write a Google Review**
- **Strictly No Fake Data:** Under no circumstance does the website fabricate star ratings, review counts, or testimonials.

---

## 7. Running & Testing

```bash
# Install dependencies
npm install

# Start development server on port 3000
npm run dev

# Run TypeScript linter
npm run lint

# Build for production
npm run build

# Start production server
npm start
```
