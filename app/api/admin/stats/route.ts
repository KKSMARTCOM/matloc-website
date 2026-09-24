import { NextResponse } from "next/server";
import { initCrudTables } from "@/lib/db";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await initCrudTables();

    /* ── Totaux ── */
    const [services, achievements, partners, members, users, settings] =
      await Promise.all([
        prisma.cmsService.count(),
        prisma.cmsAchievement.count(),
        prisma.cmsPartner.count(),
        prisma.cmsMember.count(),
        prisma.adminUser.count(),
        prisma.cmsSetting.count(),
      ]);

    /* ── Activités récentes — dernières mises à jour ── */
    const [
      recentServices,
      recentAchievements,
      recentPartners,
      recentMembers,
      recentSettings,
    ] = await Promise.all([
      prisma.cmsService.findMany({
        select: { title: true, updatedAt: true },
        orderBy: { updatedAt: "desc" },
        take: 8,
      }),
      prisma.cmsAchievement.findMany({
        select: { title: true, updatedAt: true },
        orderBy: { updatedAt: "desc" },
        take: 8,
      }),
      prisma.cmsPartner.findMany({
        select: { name: true, updatedAt: true },
        orderBy: { updatedAt: "desc" },
        take: 8,
      }),
      prisma.cmsMember.findMany({
        select: { name: true, updatedAt: true },
        orderBy: { updatedAt: "desc" },
        take: 8,
      }),
      prisma.cmsSetting.findMany({
        select: { label: true, updatedAt: true },
        orderBy: { updatedAt: "desc" },
        take: 8,
      }),
    ]);
    const recent = [
      ...recentServices.map((row) => ({
        type: "service",
        label: row.title,
        updated_at: row.updatedAt,
      })),
      ...recentAchievements.map((row) => ({
        type: "réalisation",
        label: row.title,
        updated_at: row.updatedAt,
      })),
      ...recentPartners.map((row) => ({
        type: "partenaire",
        label: row.name,
        updated_at: row.updatedAt,
      })),
      ...recentMembers.map((row) => ({
        type: "membre",
        label: row.name,
        updated_at: row.updatedAt,
      })),
      ...recentSettings.map((row) => ({
        type: "paramètre",
        label: row.label,
        updated_at: row.updatedAt,
      })),
    ]
      .sort((a, b) => b.updated_at.getTime() - a.updated_at.getTime())
      .slice(0, 8)
      .map((row) => ({ ...row, updated_at: row.updated_at.toISOString() }));

    return NextResponse.json({
      totals: {
        services,
        achievements,
        partners,
        members,
        users,
        settings,
      },
      recent,
    });
  } catch (err) {
    console.error("[stats]", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
