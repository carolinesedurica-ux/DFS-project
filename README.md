# DFS Group Corporate Website & DFS-OS Digital Foundation

This repository contains the Next.js (App Router), TypeScript, and Tailwind CSS digital foundation for **DFS Group** — a premier transport, logistics, and customs clearing provider based in Southern Africa. 

This corporate website serves two roles:
1. It replaces the previous basic landing page with a modern, high-capacity, responsive corporate showcase detailing services, fleets, corridors, and HSEQE safety standards.
2. It hosts the **DFS-OS Sandbox**, featuring high-fidelity interactive previews of the shipment tracker, customer document portal, and dispatcher control panel.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher (Tested on Node.js v24)
- **npm**: v9.0.0 or higher

### Local Development
1. Clone or copy the project files to your local directory.
2. Install all dependencies:
   ```bash
   npm install
   ```
3. Launch the local development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your web browser.

### Production Build
To compile the static production bundle:
```bash
npm run build
```
To run the built production bundle locally:
```bash
npm run start
```

---

## 📁 Project Structure

```
dfs-website/
├── src/
│   ├── app/                      # Next.js App Router Pages
│   │   ├── page.tsx              # Homepage
│   │   ├── layout.tsx            # Global persistent shell, menus, and SEO tags
│   │   ├── globals.css           # Google Fonts & brand theme configurations
│   │   ├── about/                # About Us & Corporate Governance
│   │   ├── services/             # Bulk, Bagged, Cross-Border, and Customs Clearing
│   │   ├── fleet/                # Active fleet list with capacity filters
│   │   ├── network/              # Corridor hubs and SVG transit map
│   │   ├── technology/           # DFS-OS vision and phase roadmap
│   │   ├── sustainability-safety/# Green targets and HSEQE downloads
│   │   ├── contact/              # General inquiries form with Suspense wrapper
│   │   ├── quote/                # 5-step interactive quote workflow form
│   │   ├── track/                # Interactive cargo timeline simulator
│   │   ├── admin-preview/        # Mock dispatch portal (Pending quote approvals)
│   │   └── portal-preview/       # Mock customer dashboard (active loads & files)
│   ├── components/               # Shared Reusable components
│   │   ├── Header.tsx            # Responsive navigation & announcements
│   │   ├── Footer.tsx            # Contact directories & legal disclaimers
│   │   └── RegionalMap.tsx       # Stylized interactive SVG route map
│   └── data/                     # Central JSON Content Store
│       ├── settings.json         # Contact numbers, offices, and statistics
│       ├── fleet.json            # Fleet truck specifications
│       ├── services.json         # Cargo features, routes, and disclaimers
│       └── news.json             # Newsletter and blog placeholders
├── CONTENT_CONFIRMATION_CHECKLIST.md  # Client verification list
└── package.json                  # Dependencies configuration
```

---

## ⚙️ Content Management (No-Code Updates)

To update corporate statistics, contacts, or fleet specs without modifying code, edit the JSON files inside `src/data/`:

1. **Company Stats & Contacts**: Open `settings.json` and change values under `"stats"`, `"company"`, or `"offices"`.
2. **Fleet Specs**: Open `fleet.json` to edit capacities, quantities, or add new Scania/Volvo models.
3. **News/Insights**: Open `news.json` to replace placeholder articles with verified company announcements.
4. **Services Details**: Open `services.json` to update HS Code guides, border corridors, or disclaimers.

---

## 🛠️ Stage 2: Database & API Integrations

The forms and tracker in this initial foundation use `localStorage` to simulate backend saving. To transition this codebase to a live production database (e.g., Supabase or Firebase):

### 1. Shipment Tracker API (`src/app/track/page.tsx`)
Replace the local mock state lookup with a server action query:
```typescript
// Example: src/app/track/page.tsx
const handleSearch = async (e: React.FormEvent) => {
  e.preventDefault();
  const res = await fetch(`/api/shipments/${trackingId}`);
  const data = await res.json();
  if (res.ok) {
    setShipment(data);
  } else {
    setShipment(null);
  }
};
```

### 2. Quote Submission Endpoint (`src/app/quote/page.tsx`)
In `handleSubmit`, replace the `localStorage` setter with a POST request to your API router:
```typescript
// Example: src/app/quote/page.tsx
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

### 3. Securing Portals & Dashboards
Create Next.js middleware or Auth boundaries (e.g., NextAuth.js or Supabase Auth) in `src/app/portal-preview/page.tsx` and `src/app/admin-preview/page.tsx` to restrict access based on user role roles (e.g., `role === 'client'` or `role === 'dispatcher'`).
