import DocumentVerifier from "@/components/ai/DocumentVerifier";
import { PortalPageHeader } from "@/components/portals/PortalPageHeader";

export default function ClearingVerifyPage() {
  return (
    <div className="space-y-6">
      <PortalPageHeader 
        title="Document Verification Hub" 
        description="Verify customs manifests, packing lists, invoices, and certificates of origin via DFS AI."
      />
      <DocumentVerifier />
    </div>
  );
}
