import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getAllUsers, createUser, deleteUser } from "@/lib/db";

export const dynamic = "force-dynamic";

/* GET — liste tous les utilisateurs (admin seulement) */
export async function GET() {
  try {
    await requireAdmin();
    const users = await getAllUsers();
    return NextResponse.json({ users });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Erreur serveur.";
    return NextResponse.json({ error: msg }, { status: msg.includes("refusé") ? 403 : 500 });
  }
}

/* POST — créer un utilisateur (admin seulement) */
export async function POST(req: Request) {
  try {
    await requireAdmin();
    const body = await req.json() as {
      name?: string; email?: string; password?: string; role?: string;
    };

    if (!body.name?.trim() || !body.email?.trim() || !body.password?.trim()) {
      return NextResponse.json({ error: "Nom, email et mot de passe requis." }, { status: 400 });
    }
    if (!["admin", "collaborator"].includes(body.role ?? "")) {
      return NextResponse.json({ error: "Rôle invalide." }, { status: 400 });
    }

    await createUser({
      name:     body.name.trim(),
      email:    body.email.trim().toLowerCase(),
      password: body.password,
      role:     (body.role ?? "collaborator") as "admin" | "collaborator",
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Erreur serveur.";
    const status = msg.includes("refusé") ? 403 : msg.includes("unique") ? 409 : 500;
    return NextResponse.json({ error: msg.includes("unique") ? "Cet email est déjà utilisé." : msg }, { status });
  }
}

/* DELETE — supprimer un utilisateur (admin seulement, pas le owner) */
export async function DELETE(req: Request) {
  try {
    await requireAdmin();
    const { id } = await req.json() as { id?: string };
    if (!id) return NextResponse.json({ error: "ID requis." }, { status: 400 });
    await deleteUser(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Erreur serveur.";
    return NextResponse.json({ error: msg }, { status: msg.includes("refusé") ? 403 : 500 });
  }
}
