"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    bootSudharmika?: () => void;
  }
}

/** Re-apply language after hydration, in case the inline boot ran too early. */
export function SiteBoot() {
  useEffect(() => {
    window.bootSudharmika?.();
  }, []);
  return null;
}
