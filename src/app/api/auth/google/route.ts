import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const REDIRECT_URI = "https://convert.nxtgen-stack.com/api/auth/google/callback";

export function GET(request: NextRequest) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) {
    return NextResponse.redirect(new URL("/login?error=google_unavailable", request.url));
  }

  const state = crypto.randomBytes(16).toString("hex");

  const params = new URLSearchParams({
    client_id:     clientId,
    redirect_uri:  REDIRECT_URI,
    response_type: "code",
    scope:         "openid email profile",
    access_type:   "offline",
    state,
    prompt:        "select_account",
  });

  const response = NextResponse.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${params}`
  );

  response.cookies.set("oauth_state", state, {
    httpOnly: true,
    secure:   true,
    sameSite: "lax",
    maxAge:   300,
    path:     "/",
  });

  return response;
}
