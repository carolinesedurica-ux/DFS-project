"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPreviewRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/portal/sign-in");
  }, [router]);

  return null;
}
