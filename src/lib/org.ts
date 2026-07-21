// Demo org ID — will be replaced by session-based tenant ID once auth is added
export const DEMO_ORG_ID = "4eb2eab0-c3c1-43d6-a947-9a462d7048c2";

export function apiUrl(path: string, params?: Record<string, string>) {
  const url = new URL(path, typeof window !== "undefined" ? window.location.origin : "http://localhost:3000");
  url.searchParams.set("organizationId", DEMO_ORG_ID);
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  return url.pathname + url.search;
}
