import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { findUserByEmail } from "@/lib/db";

const JWT_SECRET = process.env.JWT_SECRET ?? "matloc_fallback_secret_change_me";

export const COOKIE_NAME    = "matloc_admin_token";
export const COOKIE_MAX_AGE = 60 * 60 * 8; /* 8h */

export type UserRole = "admin" | "collaborator";

export type JwtPayload = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  isOwner: boolean;
};

/* ── Vérifier les identifiants en DB ─────────────────────────── */
export async function verifyCredentials(
  email: string,
  password: string,
): Promise<JwtPayload | null> {
  const user = await findUserByEmail(email);
  if (!user) return null;

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return null;

  return {
    id:      user.id,
    email:   user.email,
    name:    user.name,
    role:    user.role as UserRole,
    isOwner: user.is_owner,
  };
}

/* ── Signer un token ─────────────────────────────────────────── */
export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "8h" });
}

/* ── Vérifier un token (Node.js uniquement) ──────────────────── */
export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch {
    return null;
  }
}

/* ── Lire la session depuis les cookies serveur ─────────────── */
export async function getSession(): Promise<JwtPayload | null> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

/* ── Vérifier que la session est admin ───────────────────────── */
export async function requireAdmin(): Promise<JwtPayload> {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    throw new Error("Accès refusé — rôle admin requis.");
  }
  return session;
}

/* ── Cookie helpers ──────────────────────────────────────────── */
export function buildSetCookie(token: string): string {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${COOKIE_NAME}=${token}; Max-Age=${COOKIE_MAX_AGE}; Path=/; HttpOnly; SameSite=Lax${secure}`;
}

export function buildClearCookie(): string {
  return `${COOKIE_NAME}=; Max-Age=0; Path=/; HttpOnly; SameSite=Lax`;
}
