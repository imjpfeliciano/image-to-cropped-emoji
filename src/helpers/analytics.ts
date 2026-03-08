import { track as vercelTrack } from "@vercel/analytics/react";

/**
 * Safe wrapper for Vercel Analytics track().
 * When the analytics script is blocked (e.g. ad blocker → ERR_BLOCKED_BY_CLIENT),
 * the SDK may throw or no-op; this prevents unhandled errors and keeps the app working.
 */
export function track(name: string, data?: Record<string, unknown>): void {
  try {
    vercelTrack(name, data);
  } catch {
    // Script blocked or not loaded (e.g. ad blocker) — ignore
  }
}
