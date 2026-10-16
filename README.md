# SREE Agency — Complete Security Solutions Website

Production-ready business website and persistent lead-management platform for **SREE Agency**, providing CCTV camera installation, smart Wi-Fi cameras, gate automation, solar panel systems, and AMC maintenance services in Pammal, Chennai, Tamil Nadu, India.

---

## 1. Free-Tier Architecture Overview

The system is engineered on a **100% Free-Tier Architecture** requiring zero paid upgrades:

- **Primary Lead Delivery:** **Discord Webhook** (Real-time embeds dispatched immediately to your Discord channel).
- **Zero Database Requirement:** All enquiries are delivered straight to Discord with full customer details, phone number, and service requirements.
- **Review System:** **Google Places API / Verified Reviews** (Authentic customer reviews with strict zero-fake-data policy).
- **Backend Service:** Full-stack Express with Node.js on Port 3000 + Vercel Serverless Function at `/api/enquiries`.

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

## 3. Discord Real-Time Webhook Setup

All customer leads from quotes, callbacks, and queries are delivered directly to your Discord channel:

1. In Discord, go to **Server Settings** > **Integrations** > **Webhooks** > **New Webhook**.
2. Name the webhook (e.g. `SREE Agency Leads`) and pick your target channel.
3. Click **Copy Webhook URL**.
4. Set the webhook in your `.env` or in Vercel Project Settings:
   ```env
   DISCORD_WEBHOOK_URL="https://discord.com/api/webhooks/..."
   ```

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
