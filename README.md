# DFS Group — Corporate Website & DFS-OS Digital Foundation

> **Moving Southern Africa Forward**

A modern, responsive, production-ready corporate website for **DFS Group**, a Botswana-headquartered transport, logistics and customs-clearing company operating across Southern Africa.

Built with **Next.js 16 (App Router)**, **TypeScript**, and **Tailwind CSS 4** using a Royal Purple & Metallic Gold design system.

---

## ✨ Overview

This website is the first deliverable within **Phase One** of the DFS Group Digital Transformation Strategy. It serves two roles:

1. **Corporate Showcase** — A premium, enterprise-grade logistics website with services, fleet, regional corridors, sustainability targets, and HSEQE safety standards.
2. **DFS-OS Foundation** — High-fidelity interactive previews of the future shipment tracker, customer document portal, and dispatcher control panel.

---

## 🎨 Design System

| Token | Value | Usage |
|---|---|---|
| Royal Purple | `#4B1678` | Primary brand, headings, navigation |
| Deep Purple | `#2B0B45` | Hero backgrounds, dark sections |
| Purple Black | `#170622` | Footer, deep overlays |
| Metallic Gold | `#D9A520` | CTAs, accents, highlights |
| Bright Gold | `#F0C75E` | Hover states, premium gradients |
| Tech Blue | `#21A7C7` | Technology, digital features |

**Typography**: Sora (display), Plus Jakarta Sans (headings), Inter (body)

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18.0.0+ (tested on Node.js v24)
- **npm** v9.0.0+

### Local Development
```bash
# 1. Clone the repository
git clone https://github.com/carolinesedurica-ux/DFS-project.git
cd DFS-project

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build   # Compile optimised static bundle
npm run start   # Serve locally
```

---

## 📁 Project Structure

```
dfs-website/
├── public/
│   └── images/                       # Generated brand visuals
│       ├── dfs-home-hero-fleet.jpg    # Hero background — purple & gold truck
│       ├── dfs-bulk-cargo-side-tipper.png
│       ├── dfs-bagged-cargo-flatdeck.png
│       ├── dfs-cross-border-road-freight.jpg
│       ├── dfs-fleet-lineup.jpg
│       ├── dfs-customs-support.png
│       ├── dfs-driver-safety.png
│       └── dfs-technology-dashboard.png
│
├── src/
│   ├── app/                          # Next.js App Router Pages
│   │   ├── layout.tsx                # Root shell (HTML, Body, AuthProvider)
│   │   ├── globals.css               # Design tokens, fonts, animations
│   │   ├── (marketing)/              # Corporate Marketing Website Route Group
│   │   │   ├── layout.tsx            # Global shell (UtilityBar + Header + Footer)
│   │   │   ├── page.tsx              # Homepage (modular component assembly)
│   │   │   ├── about/page.tsx        # Corporate governance & leadership
│   │   │   ├── services/page.tsx     # Bulk, Bagged, Cross-Border, Customs
│   │   │   ├── fleet/page.tsx        # Fleet specs with capacity filters
│   │   │   ├── network/page.tsx      # SADC corridor hubs & SVG map
│   │   │   ├── technology/page.tsx   # DFS-OS vision & phase roadmap
│   │   │   ├── sustainability-safety/# Green targets & HSEQE downloads
│   │   │   ├── contact/page.tsx      # Inquiry form with Suspense wrapper
│   │   │   ├── quote/page.tsx        # 5-step interactive quote workflow
│   │   │   ├── dashboard/page.tsx    # Corporate client dashboard
│   │   │   └── portal/               # Authentication pages
│   │   ├── trucking/                 # Independent Trucking Portal
│   │   │   ├── layout.tsx            # Portal-specific Sidebar and Header
│   │   │   └── dashboard/page.tsx    # Trucking operations dashboard
│   │   ├── clearing/                 # Independent Clearing Portal
│   │   │   ├── layout.tsx            # Portal-specific Sidebar and Header
│   │   │   └── dashboard/page.tsx    # Customs clearing dashboard
│   │   └── express/                  # Independent Express Portal
│   │       ├── layout.tsx            # Portal-specific Sidebar and Header
│   │       └── dashboard/page.tsx    # Express courier dashboard
│   │
│   ├── components/
│   │   ├── layout/                   # Persistent layout components
│   │   │   ├── UtilityBar.tsx        # Top utility bar (location, support)
│   │   │   ├── Header.tsx            # Scroll-aware sticky nav (transparent → white)
│   │   │   └── Footer.tsx            # Structured columns, purple-black, gold accents
│   │   │
│   │   ├── portals/                  # Multi-portal shared layout elements
│   │   │   ├── PortalHeader.tsx      # Top nav specific to portals
│   │   │   └── PortalSidebar.tsx     # Configurable left side navigation
│   │   │
│   │   ├── home/                     # Homepage section components
│   │   │   ├── Hero.tsx              # Full-width hero with dispatch feed panel
│   │   │   ├── TrackingPanel.tsx     # Overlapping shipment tracking bar
│   │   │   ├── QuickActions.tsx      # Quote / Fleet / Business action cards
│   │   │   ├── ServiceShowcase.tsx   # Alternating image-led service panels
│   │   │   ├── FleetPreview.tsx      # Horizontal fleet category scroll
│   │   │   ├── WhyDFS.tsx            # 6 benefit tiles with line icons
│   │   │   ├── TechnologySection.tsx # DFS-OS digital previews
│   │   │   ├── SustainabilitySafety.tsx # HSEQE and green targets
│   │   │   ├── NewsUpdates.tsx       # Operational update cards
│   │   │   └── FinalCTA.tsx          # Bottom image CTA banner
│   │   │
│   │   └── RegionalMap.tsx           # Interactive SVG SADC corridor map
│   │
│   └── data/                         # Central JSON content store
│       ├── settings.json             # Company contacts, offices, statistics
│       ├── fleet.json                # Truck specifications & capacities
│       ├── services.json             # Cargo features, routes, disclaimers
│       └── news.json                 # Newsletter & bulletin placeholders
│
├── content/
│   └── image-manifest.md             # Image asset specifications
│
├── CONTENT_CONFIRMATION_CHECKLIST.md # Client content verification list
├── package.json
├── tsconfig.json
├── next.config.ts
└── eslint.config.mjs
```

---

## 📄 Pages & Routes

| Route | Description | Status |
|---|---|---|
| `/` | Homepage with 12 modular sections | ✅ Live |
| `/about` | Corporate governance & leadership | ✅ Live |
| `/services` | Bulk, Bagged, Cross-Border, Customs | ✅ Live |
| `/fleet` | Fleet specs with capacity filters | ✅ Live |
| `/network` | SADC corridor map & hub directories | ✅ Live |
| `/technology` | DFS-OS vision & phase roadmap | ✅ Live |
| `/sustainability-safety` | HSEQE & green targets | ✅ Live |
| `/contact` | General inquiry form | ✅ Live |
| `/quote` | 5-step interactive quote workflow | ✅ Live |
| `/track` | Shipment timeline simulator | ✅ Live |
| `/portal-preview` | Customer dashboard mock | ✅ Live |
| `/admin-preview` | Dispatcher control panel mock | ✅ Live |

---

## ⚙️ Content Management (No-Code Updates)

Update corporate data without modifying code by editing JSON files in `src/data/`:

| File | What to Edit |
|---|---|
| `settings.json` | Company stats, contacts, office addresses |
| `fleet.json` | Truck specs, capacities, model quantities |
| `services.json` | Cargo features, border corridors, disclaimers |
| `news.json` | Operational bulletins & announcements |

---

## 🛠️ Stage 2: Database & API Integrations

Forms and trackers currently use `localStorage` to simulate backend saving. To go live:

### Shipment Tracker API
Replace the mock state lookup in `src/app/track/page.tsx` with a server action:
```typescript
const handleSearch = async (e: React.FormEvent) => {
  e.preventDefault();
  const res = await fetch(`/api/shipments/${trackingId}`);
  const data = await res.json();
  setShipment(res.ok ? data : null);
};
```

### Quote Submission Endpoint
Replace `localStorage` in `src/app/quote/page.tsx` with a POST request:
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  const response = await fetch('/api/quotes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ customer, shipment, equipment })
  });
  const data = await response.json();
  setSubmissionReference(data.reference);
  setCurrentStep(6);
};
```

### Securing Portals & Dashboards
Add NextAuth.js or Supabase Auth middleware in `src/app/portal-preview/` and `src/app/admin-preview/` to restrict access by user role (`client` or `dispatcher`).

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2.9 (App Router, Turbopack) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Icons | Lucide React |
| Fonts | Google Fonts (Sora, Plus Jakarta Sans, Inter, Manrope) |
| Runtime | React 19.2.4 |

---

## 📜 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Create optimised production build |
| `npm run start` | Serve production build locally |
| `npm run lint` | Run ESLint checks |

---

## 📝 License

© 2026 DFS Group. All rights reserved.

---

*Built as part of the DFS Group Digital Transformation Strategy — Phase One.*
