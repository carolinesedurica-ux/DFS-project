import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "DFS Group | Logistics, Transport & Customs Solutions | Southern Africa",
    template: "%s | DFS Group"
  },
  description: "DFS Group is a Botswana-headquartered logistics, transport, and customs-clearing company. We operate high-capacity bulk cargo, bagged cargo, and cross-border freight solutions across Gaborone, Johannesburg, Lusaka, and Harare.",
  keywords: [
    "Logistics company Botswana",
    "Transport company Botswana",
    "Cross-border transport Southern Africa",
    "Bulk cargo transport Botswana",
    "Bagged cargo transport",
    "Side-tipper transport",
    "Regional freight services",
    "Customs clearing Botswana",
    "Botswana South Africa transport",
    "Botswana Zambia freight",
    "Botswana Zimbabwe logistics",
    "African logistics technology",
    "Shipment tracking Botswana"
  ],
  authors: [{ name: "DFS Group Development" }],
  robots: "index, follow",
  alternates: {
    canonical: "https://www.dfs.group"
  },
  openGraph: {
    title: "DFS Group | Southern African Logistics, Transport & Customs Solutions",
    description: "Enterprise-grade logistics coordination and regional freight solutions across Botswana, South Africa, Zambia, and Zimbabwe. Modern fleet capability with digital visibility.",
    url: "https://www.dfs.group",
    siteName: "DFS Group",
    locale: "en_BW",
    type: "website"
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#331a44"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col font-sans antialiased bg-white text-charcoal">
        <Header />
        <main className="flex-grow flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
