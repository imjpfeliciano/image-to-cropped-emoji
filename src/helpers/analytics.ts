import { track as vercelTrack } from "@vercel/analytics/react";

/** Analytics event properties: only primitives (no nested objects). */
type AllowedPropertyValues = string | number | boolean | null | undefined;

/**
 * Safe wrapper for Vercel Analytics track().
 * When the analytics script is blocked (e.g. ad blocker → ERR_BLOCKED_BY_CLIENT),
 * the SDK may throw or no-op; this prevents unhandled errors and keeps the app working.
 */
export function track(
  name: string,
  data?: Record<string, AllowedPropertyValues>,
): void {
  try {
    if (!data) {
      return;
    }
    vercelTrack(name, data);
  } catch {
    // Script blocked or not loaded (e.g. ad blocker) — ignore
  }
}
