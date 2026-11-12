// Shared constants used by both the API server and (via types) the frontend.

export const Session = {
  cookieName: "aevum_session",
  maxAgeMs: 365 * 24 * 60 * 60 * 1000, // 1 year
} as const;

export const Paths = {
  oauthCallback: "/api/oauth/callback",
  apiTrpc: "/api/trpc",
} as const;

export const ErrorMessages = {
  unauthenticated: "You must be logged in to do that.",
  insufficientRole: "You do not have permission to do that.",
} as const;
