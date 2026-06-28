// Synthetic Document Data (Phase One)
import type { ShipmentDocument } from "@/types/models";

export const DEMO_DOCUMENTS: ShipmentDocument[] = [
  { id: "doc-001", customerId: "cust-001", shipmentId: "shp-001", type: "waybill", fileName: "Waybill-DFS-102-BOT.pdf", fileRef: "ref-w-001", status: "approved", uploadedBy: "DFS Dispatch", uploadedAt: "2026-06-25T09:30:00Z", reviewNotes: "", fileSize: "320 KB" },
  { id: "doc-002", customerId: "cust-001", shipmentId: "shp-001", type: "cargo_manifest", fileName: "Manifest-CopperConc-38MT.pdf", fileRef: "ref-m-001", status: "approved", uploadedBy: "DFS Dispatch", uploadedAt: "2026-06-25T09:45:00Z", reviewNotes: "", fileSize: "180 KB" },
  { id: "doc-003", customerId: "cust-001", shipmentId: "shp-001", type: "customs_declaration", fileName: "CustomsDecl-MartinsDrift-001.pdf", fileRef: "ref-c-001", status: "under_review", uploadedBy: "Border Agent", uploadedAt: "2026-06-26T16:15:00Z", reviewNotes: "HS code verification pending.", fileSize: "1.4 MB" },
  { id: "doc-004", customerId: "cust-001", shipmentId: "shp-002", type: "waybill", fileName: "Waybill-DFS-789-ZIM.pdf", fileRef: "ref-w-002", status: "approved", uploadedBy: "DFS Dispatch", uploadedAt: "2026-06-24T10:30:00Z", reviewNotes: "", fileSize: "290 KB" },
  { id: "doc-005", customerId: "cust-001", shipmentId: "shp-002", type: "customs_declaration", fileName: "CustomsDecl-Ramokgwebana-789.pdf", fileRef: "ref-c-002", status: "approved", uploadedBy: "Customs Officer", uploadedAt: "2026-06-26T11:15:00Z", reviewNotes: "All codes validated.", fileSize: "1.2 MB" },
  { id: "doc-006", customerId: "cust-001", shipmentId: "shp-002", type: "weight_certificate", fileName: "WeightCert-JHB-908.pdf", fileRef: "ref-wc-001", status: "approved", uploadedBy: "Weighbridge", uploadedAt: "2026-06-24T15:00:00Z", reviewNotes: "", fileSize: "480 KB" },
  { id: "doc-007", customerId: "cust-001", shipmentId: "shp-003", type: "waybill", fileName: "Waybill-DFS-304-ZAM.pdf", fileRef: "ref-w-003", status: "uploaded", uploadedBy: "DFS Dispatch", uploadedAt: "2026-06-25T08:30:00Z", reviewNotes: "", fileSize: "310 KB" },
  { id: "doc-008", customerId: "cust-001", shipmentId: "shp-003", type: "packing_list", fileName: "PackingList-Fertilizer-304.pdf", fileRef: "ref-p-001", status: "requires_correction", uploadedBy: "Customer", uploadedAt: "2026-06-25T09:00:00Z", reviewNotes: "Weight discrepancy on line 4. Please resubmit.", fileSize: "150 KB" },
  { id: "doc-009", customerId: "cust-001", shipmentId: "shp-004", type: "proof_of_delivery", fileName: "POD-DFS-567-BOT-signed.pdf", fileRef: "ref-pod-001", status: "approved", uploadedBy: "Driver", uploadedAt: "2026-06-20T14:30:00Z", reviewNotes: "Signed by receiver.", fileSize: "520 KB" },
  { id: "doc-010", customerId: "cust-001", shipmentId: "shp-004", type: "invoice", fileName: "Invoice-MMM-0122.pdf", fileRef: "ref-inv-001", status: "uploaded", uploadedBy: "DFS Finance", uploadedAt: "2026-06-21T10:00:00Z", reviewNotes: "", fileSize: "95 KB" },
];

export function getDocumentsByCustomer(customerId: string): ShipmentDocument[] {
  return DEMO_DOCUMENTS.filter((d) => d.customerId === customerId);
}

export function getDocumentsByShipment(shipmentId: string): ShipmentDocument[] {
  return DEMO_DOCUMENTS.filter((d) => d.shipmentId === shipmentId);
}
