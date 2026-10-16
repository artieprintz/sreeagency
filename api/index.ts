import enquiriesHandler from './enquiries';

export default async function handler(req: any, res: any) {
  // If the request is for enquiries, delegate directly to the enquiries handler
  const url = req.url || '';
  if (url.includes('enquiries') || req.method === 'POST') {
    return enquiriesHandler(req, res);
  }

  // Fallback response for GET /api or other health check
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (typeof res.status === 'function') {
    return res.status(200).json({ status: 'ok', service: 'SREE Agency API', time: new Date().toISOString() });
  }
  res.statusCode = 200;
  return res.end(JSON.stringify({ status: 'ok', service: 'SREE Agency API', time: new Date().toISOString() }));
}
