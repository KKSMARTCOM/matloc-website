import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "matloc_admin_token";

/**
 * Décode le payload d'un JWT sans vérifier la signature.
 * La vérification réelle se fait côté serveur (Route Handlers).
 * Ici on vérifie uniquement présence + rôle + expiration.
 */
function decodeJwtPayload(token: string): { exp?: number; role?: string } | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const b64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(b64)) as { exp?: number; role?: string };
  } catch {
    return null;
  }
}

function isTokenValid(token: string | undefined): boolean {
  if (!token) return false;
  const p = decodeJwtPayload(token);
  return (
    (p?.role === "admin" || p?.role === "collaborator") &&
    typeof p.exp === "number" &&
    p.exp * 1000 > Date.now()
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /* ── Routes publiques : login + logout ── */
  if (
    pathname === "/admin/login" ||
    pathname.startsWith("/admin/login/") ||
    pathname === "/api/admin/login" ||
    pathname === "/api/admin/logout"
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  const valid = isTokenValid(token);

  /* ── Non authentifié ── */
  if (!valid) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
    }
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  /* ── /admin/users réservé aux admins ── */
  const isUsersRoute =
    pathname === "/admin/users" ||
    pathname.startsWith("/admin/users/") ||
    pathname.startsWith("/api/admin/users");

  const payload = decodeJwtPayload(token!);
  if (isUsersRoute && payload?.role !== "admin") {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Accès refusé." }, { status: 403 });
    }
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  /* Matcher explicite : /admin, /admin/xxx et /api/admin/xxx */
  matcher: ["/admin", "/admin/:path*", "/api/admin/:path*"],
};
