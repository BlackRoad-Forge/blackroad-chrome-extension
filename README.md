# BlackRoad Command Center - Chrome Extension

[![CI](https://github.com/blackboxprogramming/blackroad-chrome-extension/actions/workflows/ci.yml/badge.svg)](https://github.com/blackboxprogramming/blackroad-chrome-extension/actions/workflows/ci.yml)
[![Auto Deploy](https://github.com/blackboxprogramming/blackroad-chrome-extension/actions/workflows/auto-deploy.yml/badge.svg)](https://github.com/blackboxprogramming/blackroad-chrome-extension/actions/workflows/auto-deploy.yml)
[![Security Scan](https://github.com/blackboxprogramming/blackroad-chrome-extension/actions/workflows/security-scan.yml/badge.svg)](https://github.com/blackboxprogramming/blackroad-chrome-extension/actions/workflows/security-scan.yml)
[![Self-Healing](https://github.com/blackboxprogramming/blackroad-chrome-extension/actions/workflows/self-healing.yml/badge.svg)](https://github.com/blackboxprogramming/blackroad-chrome-extension/actions/workflows/self-healing.yml)

> Quick access to your entire BlackRoad empire from any browser tab.

**Proprietary Software** - Copyright (c) 2024-2026 BlackRoad OS, Inc. All Rights Reserved.

## Features

- **30K Agent Dashboard** - Direct link to the agent visualization at `blackroad-30k-agents.pages.dev`
- **GitHub Quick Access** - All 15 organizations, 200+ repos at your fingertips
- **Cloudflare Integration** - Pages, Workers, D1 quick links
- **Stripe Dashboard** - Quick access to payment and product management
- **Live Service Status** - Real-time operational indicators for all services
- **Search** - Filter any service, repo, or org instantly
- **Keyboard Shortcuts**:
  - `Cmd/Ctrl + G` - Open GitHub
  - `Cmd/Ctrl + C` - Open Cloudflare
  - `Cmd/Ctrl + A` - Open 30K Agents

## Installation

### Method 1: Load Unpacked (Developer Mode)

1. Clone this repository:
   ```bash
   git clone https://github.com/blackboxprogramming/blackroad-chrome-extension.git
   ```
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable **Developer mode** (toggle in top right)
4. Click **Load unpacked**
5. Select the `blackroad-chrome-extension` folder
6. The extension icon appears in your toolbar

### Method 2: Pack Extension

1. Go to `chrome://extensions/`
2. Enable Developer mode
3. Click **Pack extension**
4. Select this folder
5. Distribute the `.crx` file internally

## Architecture

```
blackroad-chrome-extension/
├── manifest.json              # Chrome Extension manifest v3
├── popup.html                 # Main popup UI
├── popup.css                  # BlackRoad brand styling (Golden Ratio)
├── popup.js                   # Search, keyboard shortcuts, live stats
├── icons/
│   ├── icon16.png             # Toolbar icon
│   ├── icon48.png             # Extension page icon
│   └── icon128.png            # Chrome Web Store icon
├── worker/
│   ├── wrangler.toml          # Cloudflare Worker configuration
│   ├── package.json           # Worker dependencies
│   └── src/
│       └── index.js           # API: /health, /status, /services
├── .github/
│   ├── dependabot.yml         # Automated dependency updates
│   └── workflows/
│       ├── ci.yml             # Extension validation & worker lint
│       ├── auto-deploy.yml    # Cloudflare Pages + Worker deploy
│       ├── security-scan.yml  # CodeQL + dependency scanning
│       ├── self-healing.yml   # Health monitoring + auto-rollback
│       └── automerge.yml      # Auto-merge Dependabot PRs
├── LICENSE                    # BlackRoad OS, Inc. Proprietary License
└── README.md
```

## Cloudflare Worker API

The `worker/` directory contains a Cloudflare Worker that provides API endpoints:

| Endpoint     | Description                          |
|-------------|--------------------------------------|
| `GET /`     | API index with available endpoints   |
| `GET /health` | Health check (used by CI/CD)       |
| `GET /status`  | Live status of all BlackRoad services |
| `GET /services` | Service catalog and org listing   |

### Local Development

```bash
cd worker
npm install
npm run dev
```

### Deploy

```bash
cd worker
npm run deploy
```

## CI/CD Workflows

All GitHub Actions are **pinned to specific commit SHAs** for supply-chain security.

| Workflow | Trigger | Description |
|----------|---------|-------------|
| **CI** | Push/PR to main | Validates manifest.json, HTML, assets, JS syntax, worker lint |
| **Auto Deploy** | Push to main | Deploys extension to Cloudflare Pages + Worker |
| **Security Scan** | Push/PR/Weekly | CodeQL analysis + npm audit + dependency review |
| **Self-Healing** | Every 30 min | Health monitoring with auto-rollback on failure |
| **Automerge** | Dependabot PRs | Auto-approves and merges patch/minor updates |

### Required Secrets

| Secret | Purpose |
|--------|---------|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API authentication |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account identifier |
| `WORKER_URL` | Deployed worker base URL (for health checks) |

## Services Monitored

| Service | URL | Category |
|---------|-----|----------|
| Lucidia Earth | `lucidia.earth` | Platform |
| BlackRoad AI | `blackroadai.com` | Platform |
| Quantum | `blackroadquantum.com` | Platform |
| Monitoring | `blackroad-monitoring.pages.dev` | Infrastructure |
| Dashboard | `blackroad-dashboard.pages.dev` | Infrastructure |
| API | `blackroad-api.pages.dev` | Infrastructure |

## Organizations (15)

BlackRoad-OS, BlackRoad-AI, BlackRoad-Cloud, BlackRoad-Security, BlackRoad-Labs, BlackRoad-Foundation, BlackRoad-Media, BlackRoad-Education, BlackRoad-Hardware, BlackRoad-Interactive, BlackRoad-Studio, BlackRoad-Ventures, BlackRoad-Gov, BlackRoad-Archive, Blackbox-Enterprises

## Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Hot Pink | `#FF1D6C` | Primary accent |
| Amber | `#F5A623` | Secondary accent |
| Violet | `#9C27B0` | Tertiary accent |
| Electric Blue | `#2979FF` | Interactive elements |

## Security

- All GitHub Actions pinned to full-length commit SHAs
- CodeQL static analysis on every push and PR
- Automated dependency scanning via Dependabot
- Weekly security scans on schedule
- Proprietary license with strict access controls

## License

**BlackRoad OS, Inc. Proprietary Software License**

Copyright (c) 2024-2026 BlackRoad OS, Inc. All Rights Reserved.
Founder, CEO & Sole Stockholder: Alexa Louise Amundson

This software is proprietary and confidential. Unauthorized copying, distribution, or modification is strictly prohibited. See [LICENSE](LICENSE) for full terms.

This is NOT open source software. All rights reserved.

---

BlackRoad OS, Inc. | Stripe Products & Assets Included
