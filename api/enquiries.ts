const DEFAULT_DISCORD_WEBHOOK =
  'https://discord.com/api/webhooks/1558471259568742514/XPp9W4DGsERBsLXiEEHTrhUBxzscrxKLXt9Zla2qB8aWoBd9_C3pl5lbPiN3N-hKwFAB';

const IndianPhoneRegex = /^(\+91[\-\s]?)?[6789]\d{9}$/;

async function parseRequestBody(req: any): Promise<any> {
  if (req.body) {
    if (typeof req.body === 'string') {
      try {
        return JSON.parse(req.body);
      } catch {
        return {};
      }
    }
    return req.body;
  }

  return new Promise((resolve) => {
    let bodyStr = '';
    req.on('data', (chunk: any) => {
      bodyStr += chunk;
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(bodyStr || '{}'));
      } catch {
        resolve({});
      }
    });
    req.on('error', () => {
      resolve({});
    });
  });
}

function sendJson(res: any, status: number, data: any) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (typeof res.status === 'function') {
    return res.status(status).json(data);
  } else {
    res.statusCode = status;
    res.end(JSON.stringify(data));
  }
}

export default async function handler(req: any, res: any) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (typeof res.status === 'function') {
      return res.status(204).end();
    }
    res.statusCode = 204;
    return res.end();
  }

  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'Method Not Allowed. Please send a POST request.' });
  }

  try {
    const body = await parseRequestBody(req);

    const customer_name = String(body.customer_name || '').trim();
    const raw_phone = String(body.phone_number || '').trim();
    const clean_phone = raw_phone.replace(/[\s\-]/g, '');
    const service_required = String(body.service_required || 'CCTV Camera Installation').trim();
    const enquiry_type = String(body.enquiry_type || 'quote').toLowerCase();
    const email = String(body.email || '').trim();
    const property_type = String(body.property_type || '').trim();
    const customer_location = String(body.customer_location || '').trim();
    const customer_message = String(body.customer_message || '').trim();
    const preferred_callback_date = String(body.preferred_callback_date || '').trim();
    const preferred_callback_time = String(body.preferred_callback_time || '').trim();
    const consent_recorded = Boolean(body.consent_recorded);

    // Validation
    if (!customer_name || customer_name.length < 2) {
      return sendJson(res, 400, { error: 'Please enter your full name (at least 2 characters).' });
    }

    if (!clean_phone || !IndianPhoneRegex.test(clean_phone)) {
      return sendJson(res, 400, {
        error: 'Please enter a valid 10-digit Indian mobile number (e.g. 9500100061).',
      });
    }

    if (!consent_recorded) {
      return sendJson(res, 400, {
        error: 'Consent to contact is required to submit your request.',
      });
    }

    // Generate unique reference code
    const year = new Date().getFullYear();
    const randomSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
    const reference_code = `SREE-${year}-${randomSuffix}`;
    const timestamp = new Date().toISOString();

    // Prepare Discord Notification Payload
    const discordUrl = process.env.DISCORD_WEBHOOK_URL || DEFAULT_DISCORD_WEBHOOK;

    const payload = {
      username: 'SREE Agency Security Alerts',
      embeds: [
        {
          title: `🚨 New Lead: ${enquiry_type.toUpperCase()} REQUEST`,
          description: `A new customer enquiry was received for **SREE Agency** (Pammal, Chennai).`,
          color: 16761856, // SREE Agency Gold #FFC400
          fields: [
            {
              name: '🏷️ Reference Code',
              value: `\`${reference_code}\``,
              inline: true,
            },
            {
              name: '🛠️ Service Required',
              value: `**${service_required}**`,
              inline: true,
            },
            {
              name: '👤 Customer Name',
              value: customer_name,
              inline: true,
            },
            {
              name: '📞 Phone Number',
              value: `[${clean_phone}](tel:${clean_phone})`,
              inline: true,
            },
            {
              name: '📍 Location',
              value: customer_location || 'Pammal / Chennai',
              inline: true,
            },
            {
              name: '🏠 Property Type',
              value: property_type || 'Not specified',
              inline: true,
            },
            ...(email
              ? [
                  {
                    name: '✉️ Email',
                    value: email,
                    inline: true,
                  },
                ]
              : []),
            {
              name: '⏰ Preferred Callback',
              value: `${preferred_callback_time || 'Anytime'}${
                preferred_callback_date ? ` (${preferred_callback_date})` : ''
              }`,
              inline: true,
            },
            ...(customer_message
              ? [
                  {
                    name: '📝 Requirements / Notes',
                    value: `>>> ${customer_message}`,
                    inline: false,
                  },
                ]
              : []),
          ],
          footer: {
            text: 'SREE Agency • Pammal, Chennai • Direct Discord Integration',
          },
          timestamp,
        },
      ],
    };

    // Send directly to Discord
    try {
      const discordRes = await fetch(discordUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!discordRes.ok) {
        const errorText = await discordRes.text();
        console.error(`[DISCORD] Delivery error (${discordRes.status}):`, errorText);
      } else {
        console.log(`[DISCORD] Enquiry ${reference_code} delivered successfully.`);
      }
    } catch (discordErr) {
      console.error('[DISCORD] Failed to send webhook:', discordErr);
    }

    // Always return clean JSON success to the client
    return sendJson(res, 201, {
      success: true,
      reference_code,
      message:
        'Thank you for contacting SREE Agency! Your request has been received. Our team will contact you regarding your enquiry.',
      enquiry: {
        reference_code,
        customer_name,
        service_required,
        created_at: timestamp,
      },
    });
  } catch (err: any) {
    console.error('[API ERROR] Unexpected failure in enquiry handler:', err);
    return sendJson(res, 500, {
      error: 'Failed to process enquiry. Please call us directly at 9500100061.',
    });
  }
}
