// Synthetic Support Ticket Data (Phase One)
import type { SupportTicket } from "@/types/models";

export const DEMO_SUPPORT_TICKETS: SupportTicket[] = [
  { id: "sup-001", customerId: "cust-001", shipmentId: "shp-001", category: "customs", subject: "HS code query for copper concentrates", message: "We need clarification on the correct HS tariff code for the copper concentrates shipment DFS-102-BOT. The border agent is requesting HS 2603.00 but our supplier documentation references 7403.11. Please advise.", status: "in_progress", createdAt: "2026-06-26T16:30:00Z", updatedAt: "2026-06-26T17:00:00Z", assignedTo: "DFS Customs Desk" },
  { id: "sup-002", customerId: "cust-001", shipmentId: "shp-004", category: "document", subject: "Request signed POD copy", message: "Could you please provide a certified copy of the proof of delivery for shipment DFS-567-BOT? Our accounts department requires this for payment processing.", status: "resolved", createdAt: "2026-06-21T09:00:00Z", updatedAt: "2026-06-21T15:00:00Z", assignedTo: "DFS Document Centre" },
  { id: "sup-003", customerId: "cust-001", shipmentId: null, category: "account", subject: "Add additional portal user", message: "We would like to add our logistics coordinator, Ms. Naledi Tau (naledi@mmamashia-mining.co.bw), as an authorised user on our company portal account.", status: "open", createdAt: "2026-06-25T10:00:00Z", updatedAt: "2026-06-25T10:00:00Z", assignedTo: null },
];

export function getSupportTicketsByCustomer(customerId: string): SupportTicket[] {
  return DEMO_SUPPORT_TICKETS.filter((t) => t.customerId === customerId);
}
