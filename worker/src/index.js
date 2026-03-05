/**
 * BlackRoad Command Center API Worker
 * Cloudflare Worker providing health, status, and service endpoints
 *
 * Copyright (c) 2024-2026 BlackRoad OS, Inc. All Rights Reserved.
 */

const SERVICES = [
  { name: 'Lucidia Earth', url: 'https://lucidia.earth', category: 'platform' },
  { name: 'BlackRoad AI', url: 'https://blackroadai.com', category: 'platform' },
  { name: 'Quantum', url: 'https://blackroadquantum.com', category: 'platform' },
  { name: 'Monitoring', url: 'https://blackroad-monitoring.pages.dev', category: 'infra' },
  { name: 'Dashboard', url: 'https://blackroad-dashboard.pages.dev', category: 'infra' },
  { name: 'API', url: 'https://blackroad-api.pages.dev', category: 'infra' },
];

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...CORS_HEADERS,
    },
  });
}

async function checkService(service) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const response = await fetch(service.url, {
      method: 'HEAD',
      signal: controller.signal,
      redirect: 'follow',
    });
    clearTimeout(timeout);
    return {
      name: service.name,
      url: service.url,
      category: service.category,
      status: response.ok ? 'operational' : 'degraded',
      statusCode: response.status,
    };
  } catch {
    return {
      name: service.name,
      url: service.url,
      category: service.category,
      status: 'down',
      statusCode: 0,
    };
  }
}

async function handleHealth() {
  return jsonResponse({
    status: 'healthy',
    service: 'blackroad-command-center-api',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
}

async function handleStatus() {
  const results = await Promise.all(SERVICES.map(checkService));
  const operational = results.filter(r => r.status === 'operational').length;
  const total = results.length;

  return jsonResponse({
    overall: operational === total ? 'operational' : operational > 0 ? 'degraded' : 'outage',
    services: results,
    summary: { total, operational, degraded: total - operational },
    timestamp: new Date().toISOString(),
  });
}

async function handleServices() {
  return jsonResponse({
    services: SERVICES,
    organizations: [
      'BlackRoad-OS', 'BlackRoad-AI', 'BlackRoad-Cloud', 'BlackRoad-Security',
      'BlackRoad-Labs', 'BlackRoad-Foundation', 'BlackRoad-Media', 'BlackRoad-Education',
      'BlackRoad-Hardware', 'BlackRoad-Interactive', 'BlackRoad-Studio', 'BlackRoad-Ventures',
      'BlackRoad-Gov', 'BlackRoad-Archive', 'Blackbox-Enterprises',
    ],
    agents: { total: 30000, fleet: 'active' },
    timestamp: new Date().toISOString(),
  });
}

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    if (request.method !== 'GET') {
      return jsonResponse({ error: 'Method not allowed' }, 405);
    }

    switch (url.pathname) {
      case '/':
        return jsonResponse({
          name: 'BlackRoad Command Center API',
          version: '1.0.0',
          endpoints: ['/health', '/status', '/services'],
        });
      case '/health':
        return handleHealth();
      case '/status':
        return handleStatus();
      case '/services':
        return handleServices();
      default:
        return jsonResponse({ error: 'Not found' }, 404);
    }
  },
};
