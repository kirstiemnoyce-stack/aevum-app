// Session cookie options shared between login, logout and middleware.

export interface SessionCookieOptions {
  httpOnly: boolean;
  path: string;
  sameSite: "Lax" | "None";
  secure: boolean;
}

export function getSessionCookieOptions(requestHeaders: Headers): SessionCookieOptions {
  const host = requestHeaders.get("host") || "";
  const isSecureHost =
    host.includes("localhost") || host.includes("127.0.0.1") ? false : true;

  return {
    httpOnly: true,
    path: "/",
    sameSite: isSecureHost ? "None" : "Lax",
    secure: isSecureHost,
  };
}
