// ─────────────────────────────────────────────────
// DFS Group — Core Data Models
// Phase One: Typed interfaces for the DFS-OS platform
// ─────────────────────────────────────────────────

// ═══════════════════════════════════════════════════
// ENUMS & CONSTANTS
// ═══════════════════════════════════════════════════

export type ShipmentStatus =
  | "booking_confirmed"
  | "vehicle_assigned"
  | "cargo_collected"
  | "in_transit"
  | "border_processing"
  | "customs_cleared"
  | "out_for_delivery"
  | "delivered"
  | "delayed"
  | "on_hold";

export const SHIPMENT_STATUS_LABELS: Record<ShipmentStatus, string> = {
  booking_confirmed: "Booking Confirmed",
  vehicle_assigned: "Vehicle Assigned",
  cargo_collected: "Cargo Collected",
  in_transit: "In Transit",
  border_processing: "Border Processing",
  customs_cleared: "Customs Cleared",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  delayed: "Delayed",
  on_hold: "On Hold",
};

export type DocumentType =
  | "waybill"
  | "customs_declaration"
  | "cargo_manifest"
  | "packing_list"
  | "quote"
  | "invoice"
  | "proof_of_delivery"
  | "weight_certificate"
  | "other";

export const DOCUMENT_TYPE_LABELS: Record<DocumentType, string> = {
  waybill: "Waybill",
  customs_declaration: "Customs Declaration",
  cargo_manifest: "Cargo Manifest",
  packing_list: "Packing List",
  quote: "Quote",
  invoice: "Invoice",
  proof_of_delivery: "Proof of Delivery",
  weight_certificate: "Weight Certificate",
  other: "Other",
};

export type DocumentStatus =
  | "uploaded"
  | "under_review"
  | "approved"
  | "requires_correction"
  | "expired"
  | "missing";

export const DOCUMENT_STATUS_LABELS: Record<DocumentStatus, string> = {
  uploaded: "Uploaded",
  under_review: "Under Review",
  approved: "Approved",
  requires_correction: "Requires Correction",
  expired: "Expired",
  missing: "Missing",
};

export type QuoteStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "information_required"
  | "quoted"
  | "accepted"
  | "declined"
  | "expired";

export const QUOTE_STATUS_LABELS: Record<QuoteStatus, string> = {
  draft: "Draft",
  submitted: "Submitted",
  under_review: "Under Review",
  information_required: "Information Required",
  quoted: "Quoted",
  accepted: "Accepted",
  declined: "Declined",
  expired: "Expired",
};

export type SupportTicketStatus =
  | "open"
  | "assigned"
  | "awaiting_customer"
  | "in_progress"
  | "resolved"
  | "closed";

export const SUPPORT_STATUS_LABELS: Record<SupportTicketStatus, string> = {
  open: "Open",
  assigned: "Assigned",
  awaiting_customer: "Awaiting Customer",
  in_progress: "In Progress",
  resolved: "Resolved",
  closed: "Closed",
};

export type NotificationCategory =
  | "shipment_update"
  | "border_status"
  | "document_required"
  | "quote_update"
  | "delivery_completed"
  | "system_message";

export type UserRole =
  | "customer_user"
  | "customer_admin"
  | "dfs_ops"
  | "dfs_admin"
  | "dfs_executive";

export type CustomerStatus = "active" | "suspended" | "pending";
export type UserStatus = "active" | "suspended" | "pending";
export type AccessRequestStatus = "pending" | "approved" | "rejected";

// ═══════════════════════════════════════════════════
// CORE MODELS
// ═══════════════════════════════════════════════════

export interface Contact {
  name: string;
  email: string;
  phone: string;
  position: string;
}

export interface NotificationPreferences {
  shipmentUpdates: boolean;
  documentAlerts: boolean;
  quoteNotifications: boolean;
  borderStatuses: boolean;
  systemMessages: boolean;
}

export interface Customer {
  id: string;
  companyName: string;
  status: CustomerStatus;
  contacts: Contact[];
  approvedUsers: string[];
  services: string[];
  createdAt: string;
}

export interface PortalUser {
  id: string;
  customerId: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  lastLogin: string;
  notificationPreferences: NotificationPreferences;
  companyName: string;
}

export interface Shipment {
  id: string;
  customerId: string;
  reference: string;
  origin: string;
  destination: string;
  cargoType: string;
  weight: string;
  vehicle: string;
  driverRef: string;
  status: ShipmentStatus;
  estimatedArrival: string;
  actualDelivery: string | null;
  trackingEvents: TrackingEvent[];
  customerReference: string;
  lastUpdated: string;
}

export interface TrackingEvent {
  id: string;
  shipmentId: string;
  status: ShipmentStatus;
  location: string;
  timestamp: string;
  source: string;
  customerVisible: boolean;
  notes: string;
}

export interface ShipmentDocument {
  id: string;
  customerId: string;
  shipmentId: string | null;
  type: DocumentType;
  fileName: string;
  fileRef: string;
  status: DocumentStatus;
  uploadedBy: string;
  uploadedAt: string;
  reviewNotes: string;
  fileSize: string;
}

export interface Quote {
  id: string;
  customerId: string;
  origin: string;
  destination: string;
  cargoDetails: string;
  cargoType: string;
  equipmentRequirement: string;
  status: QuoteStatus;
  amount: string | null;
  validityDate: string | null;
  createdAt: string;
  updatedAt: string;
  weight: string;
}

export interface Message {
  id: string;
  customerId: string;
  shipmentId: string | null;
  sender: string;
  senderRole: "customer" | "dfs_staff";
  recipient: string;
  subject: string;
  body: string;
  timestamp: string;
  readStatus: boolean;
  category: "shipment" | "document" | "quote" | "customs" | "account" | "general";
}

export interface Notification {
  id: string;
  userId: string;
  customerId: string;
  category: NotificationCategory;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  relatedId: string | null;
  relatedType: "shipment" | "document" | "quote" | "support" | null;
}

export interface SupportTicket {
  id: string;
  customerId: string;
  shipmentId: string | null;
  category: "shipment" | "document" | "customs" | "account" | "billing" | "technical" | "general";
  subject: string;
  message: string;
  status: SupportTicketStatus;
  createdAt: string;
  updatedAt: string;
  assignedTo: string | null;
}

export interface AccessRequest {
  id: string;
  fullName: string;
  companyName: string;
  position: string;
  email: string;
  phone: string;
  existingCustomer: boolean;
  accountReference: string;
  serviceUsed: string;
  reason: string;
  consent: boolean;
  status: AccessRequestStatus;
  submittedAt: string;
  reviewedAt: string | null;
  reviewedBy: string | null;
}
