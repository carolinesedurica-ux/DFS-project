// Synthetic Message Data (Phase One)
import type { Message } from "@/types/models";

export const DEMO_MESSAGES: Message[] = [
  { id: "msg-001", customerId: "cust-001", shipmentId: "shp-001", sender: "DFS Dispatch", senderRole: "dfs_staff", recipient: "Kago Mosimanyana", subject: "DFS-102-BOT: Border entry confirmed", body: "Your shipment DFS-102-BOT has entered the Martins Drift border post queue. Estimated processing time is 4-6 hours. We will notify you when customs clearance is completed.", timestamp: "2026-06-26T16:15:00Z", readStatus: false, category: "shipment" },
  { id: "msg-002", customerId: "cust-001", shipmentId: "shp-002", sender: "DFS Customs Desk", senderRole: "dfs_staff", recipient: "Kago Mosimanyana", subject: "DFS-789-ZIM: Customs cleared at Ramokgwebana", body: "Good news — your bagged cement shipment DFS-789-ZIM has been cleared through Ramokgwebana customs. The vehicle is now proceeding towards Harare. ETA remains 27 June.", timestamp: "2026-06-26T11:30:00Z", readStatus: true, category: "customs" },
  { id: "msg-003", customerId: "cust-001", shipmentId: "shp-003", sender: "Kago Mosimanyana", senderRole: "customer", recipient: "DFS Operations", subject: "DFS-304-ZAM: Packing list correction", body: "I've noticed the packing list for shipment DFS-304-ZAM has a weight discrepancy on line 4. I will upload a corrected version shortly. Please hold the current document.", timestamp: "2026-06-25T15:00:00Z", readStatus: true, category: "document" },
  { id: "msg-004", customerId: "cust-001", shipmentId: null, sender: "DFS Commercial", senderRole: "dfs_staff", recipient: "Kago Mosimanyana", subject: "New quotation for Walvis Bay corridor", body: "We have prepared a quotation for your upcoming Walvis Bay to Gaborone route. Please review quote QT-005 in your portal and let us know if you'd like to proceed.", timestamp: "2026-06-20T10:00:00Z", readStatus: true, category: "quote" },
  { id: "msg-005", customerId: "cust-001", shipmentId: null, sender: "DFS Account Manager", senderRole: "dfs_staff", recipient: "Kago Mosimanyana", subject: "Welcome to the DFS Customer Portal", body: "Welcome to the DFS Digital Logistics Portal. From here you can track your shipments, manage documents, request quotes, and communicate directly with our operations team. If you need any assistance, please don't hesitate to reach out via the support section.", timestamp: "2026-06-15T08:00:00Z", readStatus: true, category: "general" },
];

export function getMessagesByCustomer(customerId: string): Message[] {
  return DEMO_MESSAGES.filter((m) => m.customerId === customerId);
}

export function getUnreadCount(customerId: string): number {
  return DEMO_MESSAGES.filter((m) => m.customerId === customerId && !m.readStatus).length;
}
