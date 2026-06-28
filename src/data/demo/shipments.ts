// ─────────────────────────────────────────────────
// DFS Group — Synthetic Shipment Data (Phase One)
// All data is fictional. No real customer information.
// ─────────────────────────────────────────────────

import type { Shipment } from "@/types/models";

export const DEMO_SHIPMENTS: Shipment[] = [
  {
    id: "shp-001",
    customerId: "cust-001",
    reference: "DFS-102-BOT",
    origin: "Johannesburg Depot, South Africa",
    destination: "Gaborone Mmamashia Depot, Botswana",
    cargoType: "Dry Minerals (Copper Concentrates)",
    weight: "38 MT",
    vehicle: "Volvo FH 440 (Reg: B 345 ACD)",
    driverRef: "DRV-045",
    status: "border_processing",
    estimatedArrival: "2026-06-28",
    actualDelivery: null,
    customerReference: "MMM-PO-2026-0128",
    lastUpdated: "2026-06-26T16:00:00Z",
    trackingEvents: [
      { id: "te-001", shipmentId: "shp-001", status: "booking_confirmed", location: "DFS HQ, Gaborone", timestamp: "2026-06-25T09:00:00Z", source: "System", customerVisible: true, notes: "Booking confirmed by dispatch." },
      { id: "te-002", shipmentId: "shp-001", status: "vehicle_assigned", location: "DFS HQ, Gaborone", timestamp: "2026-06-25T14:00:00Z", source: "Dispatcher", customerVisible: true, notes: "Volvo FH 440 assigned." },
      { id: "te-003", shipmentId: "shp-001", status: "cargo_collected", location: "Johannesburg Depot", timestamp: "2026-06-26T08:30:00Z", source: "Driver", customerVisible: true, notes: "Cargo loaded and sealed." },
      { id: "te-004", shipmentId: "shp-001", status: "in_transit", location: "N1 North Highway", timestamp: "2026-06-26T12:00:00Z", source: "GPS", customerVisible: true, notes: "En route via N1." },
      { id: "te-005", shipmentId: "shp-001", status: "border_processing", location: "Martins Drift Border Post", timestamp: "2026-06-26T16:00:00Z", source: "Border Agent", customerVisible: true, notes: "Entered border queue." },
    ],
  },
  {
    id: "shp-002",
    customerId: "cust-001",
    reference: "DFS-789-ZIM",
    origin: "Gaborone Depot, Botswana",
    destination: "Harare Transit Hub, Zimbabwe",
    cargoType: "Bagged Cement Link",
    weight: "36 MT",
    vehicle: "Scania G460 Flat-Deck Link (Reg: B 902 ABF)",
    driverRef: "DRV-018",
    status: "customs_cleared",
    estimatedArrival: "2026-06-27",
    actualDelivery: null,
    customerReference: "MMM-PO-2026-0131",
    lastUpdated: "2026-06-26T11:00:00Z",
    trackingEvents: [
      { id: "te-006", shipmentId: "shp-002", status: "booking_confirmed", location: "DFS HQ, Gaborone", timestamp: "2026-06-24T10:00:00Z", source: "System", customerVisible: true, notes: "Booking confirmed." },
      { id: "te-007", shipmentId: "shp-002", status: "vehicle_assigned", location: "DFS HQ, Gaborone", timestamp: "2026-06-24T11:30:00Z", source: "Dispatcher", customerVisible: true, notes: "Scania G460 assigned." },
      { id: "te-008", shipmentId: "shp-002", status: "cargo_collected", location: "Gaborone Depot", timestamp: "2026-06-24T16:00:00Z", source: "Driver", customerVisible: true, notes: "Bags loaded, straps secured." },
      { id: "te-009", shipmentId: "shp-002", status: "in_transit", location: "A1 Highway north", timestamp: "2026-06-25T07:00:00Z", source: "GPS", customerVisible: true, notes: "Heading north on A1." },
      { id: "te-010", shipmentId: "shp-002", status: "border_processing", location: "Ramokgwebana Border", timestamp: "2026-06-25T14:30:00Z", source: "Border Agent", customerVisible: true, notes: "Queue entry at Ramokgwebana." },
      { id: "te-011", shipmentId: "shp-002", status: "customs_cleared", location: "Ramokgwebana Border", timestamp: "2026-06-26T11:00:00Z", source: "Customs", customerVisible: true, notes: "Customs cleared and released." },
    ],
  },
  {
    id: "shp-003",
    customerId: "cust-001",
    reference: "DFS-304-ZAM",
    origin: "Johannesburg Depot, South Africa",
    destination: "Lusaka Industrial Depot, Zambia",
    cargoType: "Agricultural Fertilizer Link",
    weight: "36 MT",
    vehicle: "Scania G460 Flat-Deck (Reg: B 118 AGH)",
    driverRef: "DRV-032",
    status: "in_transit",
    estimatedArrival: "2026-06-30",
    actualDelivery: null,
    customerReference: "MMM-PO-2026-0135",
    lastUpdated: "2026-06-26T09:00:00Z",
    trackingEvents: [
      { id: "te-012", shipmentId: "shp-003", status: "booking_confirmed", location: "DFS HQ, Gaborone", timestamp: "2026-06-25T08:00:00Z", source: "System", customerVisible: true, notes: "Booking confirmed." },
      { id: "te-013", shipmentId: "shp-003", status: "vehicle_assigned", location: "DFS HQ, Gaborone", timestamp: "2026-06-25T10:00:00Z", source: "Dispatcher", customerVisible: true, notes: "Scania G460 assigned." },
      { id: "te-014", shipmentId: "shp-003", status: "cargo_collected", location: "Johannesburg Depot", timestamp: "2026-06-26T09:00:00Z", source: "Driver", customerVisible: true, notes: "Fertilizer bags collected." },
    ],
  },
  {
    id: "shp-004",
    customerId: "cust-001",
    reference: "DFS-567-BOT",
    origin: "Durban Port, South Africa",
    destination: "Francistown Depot, Botswana",
    cargoType: "Construction Steel Beams",
    weight: "34 MT",
    vehicle: "Volvo FMX 460 (Reg: B 210 ACE)",
    driverRef: "DRV-051",
    status: "delivered",
    estimatedArrival: "2026-06-20",
    actualDelivery: "2026-06-20",
    customerReference: "MMM-PO-2026-0122",
    lastUpdated: "2026-06-20T14:00:00Z",
    trackingEvents: [
      { id: "te-015", shipmentId: "shp-004", status: "booking_confirmed", location: "DFS HQ", timestamp: "2026-06-17T08:00:00Z", source: "System", customerVisible: true, notes: "Booking confirmed." },
      { id: "te-016", shipmentId: "shp-004", status: "vehicle_assigned", location: "DFS HQ", timestamp: "2026-06-17T10:00:00Z", source: "Dispatcher", customerVisible: true, notes: "Volvo FMX assigned." },
      { id: "te-017", shipmentId: "shp-004", status: "cargo_collected", location: "Durban Port", timestamp: "2026-06-18T06:00:00Z", source: "Driver", customerVisible: true, notes: "Steel collected from port." },
      { id: "te-018", shipmentId: "shp-004", status: "in_transit", location: "N1 Highway", timestamp: "2026-06-18T12:00:00Z", source: "GPS", customerVisible: true, notes: "En route." },
      { id: "te-019", shipmentId: "shp-004", status: "border_processing", location: "Martins Drift", timestamp: "2026-06-19T08:00:00Z", source: "Border Agent", customerVisible: true, notes: "Processing." },
      { id: "te-020", shipmentId: "shp-004", status: "customs_cleared", location: "Martins Drift", timestamp: "2026-06-19T14:00:00Z", source: "Customs", customerVisible: true, notes: "Cleared." },
      { id: "te-021", shipmentId: "shp-004", status: "out_for_delivery", location: "A1 to Francistown", timestamp: "2026-06-20T07:00:00Z", source: "GPS", customerVisible: true, notes: "Final leg." },
      { id: "te-022", shipmentId: "shp-004", status: "delivered", location: "Francistown Depot", timestamp: "2026-06-20T14:00:00Z", source: "Driver", customerVisible: true, notes: "Delivered and unloaded." },
    ],
  },
];

export function getShipmentsByCustomer(customerId: string): Shipment[] {
  return DEMO_SHIPMENTS.filter((s) => s.customerId === customerId);
}

export function getShipmentById(shipmentId: string): Shipment | undefined {
  return DEMO_SHIPMENTS.find((s) => s.id === shipmentId);
}

export function getShipmentByReference(reference: string): Shipment | undefined {
  return DEMO_SHIPMENTS.find(
    (s) => s.reference.toLowerCase() === reference.toLowerCase()
  );
}
