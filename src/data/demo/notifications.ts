// Synthetic Notification Data (Phase One)
import type { Notification } from "@/types/models";

export const DEMO_NOTIFICATIONS: Notification[] = [
  { id: "ntf-001", userId: "usr-cust-001", customerId: "cust-001", category: "shipment_update", title: "Shipment DFS-102-BOT entered border queue", message: "Your shipment has arrived at Martins Drift border post and is now in the processing queue.", timestamp: "2026-06-26T16:00:00Z", read: false, relatedId: "shp-001", relatedType: "shipment" },
  { id: "ntf-002", userId: "usr-cust-001", customerId: "cust-001", category: "border_status", title: "Customs cleared: DFS-789-ZIM", message: "Shipment DFS-789-ZIM has been cleared through Ramokgwebana customs. Vehicle is now proceeding to destination.", timestamp: "2026-06-26T11:00:00Z", read: false, relatedId: "shp-002", relatedType: "shipment" },
  { id: "ntf-003", userId: "usr-cust-001", customerId: "cust-001", category: "document_required", title: "Packing list correction needed", message: "The packing list for DFS-304-ZAM requires correction on line 4. Please upload a revised document.", timestamp: "2026-06-25T14:00:00Z", read: true, relatedId: "doc-008", relatedType: "document" },
  { id: "ntf-004", userId: "usr-cust-001", customerId: "cust-001", category: "quote_update", title: "New quotation available", message: "A quotation for Walvis Bay to Gaborone has been prepared. Please review QT-005 in your quotes section.", timestamp: "2026-06-20T10:00:00Z", read: true, relatedId: "qt-005", relatedType: "quote" },
  { id: "ntf-005", userId: "usr-cust-001", customerId: "cust-001", category: "delivery_completed", title: "Delivery confirmed: DFS-567-BOT", message: "Your shipment DFS-567-BOT has been delivered and unloaded at Francistown Depot. Proof of delivery is available.", timestamp: "2026-06-20T14:00:00Z", read: true, relatedId: "shp-004", relatedType: "shipment" },
  { id: "ntf-006", userId: "usr-cust-001", customerId: "cust-001", category: "system_message", title: "Welcome to the DFS Customer Portal", message: "Your portal access has been activated. You can now track shipments, manage documents, and communicate with our operations team.", timestamp: "2026-06-15T08:00:00Z", read: true, relatedId: null, relatedType: null },
];

export function getNotificationsByUser(userId: string): Notification[] {
  return DEMO_NOTIFICATIONS.filter((n) => n.userId === userId);
}

export function getUnreadNotificationCount(userId: string): number {
  return DEMO_NOTIFICATIONS.filter((n) => n.userId === userId && !n.read).length;
}
