// Synthetic Quote Data (Phase One)
import type { Quote } from "@/types/models";

export const DEMO_QUOTES: Quote[] = [
  { id: "qt-001", customerId: "cust-001", origin: "Johannesburg, SA", destination: "Gaborone, Botswana", cargoDetails: "Copper concentrates, bulk mineral", cargoType: "Dry Minerals", equipmentRequirement: "Side-tipper 45m³", status: "quoted", amount: "BWP 48,500", validityDate: "2026-07-15", createdAt: "2026-06-20T09:00:00Z", updatedAt: "2026-06-22T14:00:00Z", weight: "38 MT" },
  { id: "qt-002", customerId: "cust-001", origin: "Gaborone, Botswana", destination: "Lusaka, Zambia", cargoDetails: "Bagged cement, palletized", cargoType: "Bagged Cargo", equipmentRequirement: "Flat-deck link", status: "submitted", amount: null, validityDate: null, createdAt: "2026-06-24T11:00:00Z", updatedAt: "2026-06-24T11:00:00Z", weight: "36 MT" },
  { id: "qt-003", customerId: "cust-001", origin: "Durban Port, SA", destination: "Francistown, Botswana", cargoDetails: "Construction steel beams", cargoType: "Heavy Cargo", equipmentRequirement: "Flat-deck reinforced", status: "accepted", amount: "BWP 62,000", validityDate: "2026-07-01", createdAt: "2026-06-10T08:00:00Z", updatedAt: "2026-06-12T16:00:00Z", weight: "34 MT" },
  { id: "qt-004", customerId: "cust-001", origin: "Johannesburg, SA", destination: "Harare, Zimbabwe", cargoDetails: "Agricultural machinery parts", cargoType: "General Cargo", equipmentRequirement: "Flat-deck with tarpaulin", status: "under_review", amount: null, validityDate: null, createdAt: "2026-06-25T14:00:00Z", updatedAt: "2026-06-26T09:00:00Z", weight: "28 MT" },
  { id: "qt-005", customerId: "cust-001", origin: "Walvis Bay, Namibia", destination: "Gaborone, Botswana", cargoDetails: "Imported electronics containers", cargoType: "Containerised", equipmentRequirement: "Container carrier", status: "expired", amount: "BWP 55,000", validityDate: "2026-06-01", createdAt: "2026-05-15T09:00:00Z", updatedAt: "2026-06-02T00:00:00Z", weight: "22 MT" },
];

export function getQuotesByCustomer(customerId: string): Quote[] {
  return DEMO_QUOTES.filter((q) => q.customerId === customerId);
}
