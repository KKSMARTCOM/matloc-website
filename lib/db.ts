import { Pool } from "pg";

/* ── Connexion singleton ─────────────────────────────────────── */
const globalPool = global as typeof global & { _pgPool?: Pool };

export const pool: Pool =
  globalPool._pgPool ??
  (globalPool._pgPool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10,
    idleTimeoutMillis: 30_000,
  }));

export async function query<T extends object = Record<string, unknown>>(
  sql: string,
  params?: unknown[],
): Promise<T[]> {
  const { rows } = await pool.query(sql, params);
  return rows as T[];
}

export type CmsSetting = {
  key: string;
  value: string;
  label: string;
  grp: string;
  sort_order: number;
};

/* ── Seed complet ────────────────────────────────────────────── */
type SeedRow = { key: string; value: string; label: string; grp: string; sort_order: number };

const SEED: SeedRow[] = [
  /* ── IMAGES ── */
  { key: "img_hero_bg",          label: "Accueil — Image de fond Hero",              grp: "images", sort_order: 1,  value: "/assets/images/jpg/Hero2.jpeg" },
  { key: "img_about_home",       label: "Accueil — Image section Expertise BTP",     grp: "images", sort_order: 2,  value: "/assets/images/jpg/AboutHome.jpeg" },
  { key: "img_about_page",       label: "Page À propos — Photo principale",          grp: "images", sort_order: 3,  value: "/assets/images/jpg/About.jpeg" },
  { key: "img_banner_services",  label: "Page Services — Image hero bannière",       grp: "images", sort_order: 4,  value: "/assets/images/banner.jpg" },
  { key: "img_banner_realisations", label: "Page Réalisations — Image hero bannière", grp: "images", sort_order: 5, value: "/assets/images/banner.jpg" },
  { key: "img_banner_contact",   label: "Page Contact — Image hero bannière",        grp: "images", sort_order: 6,  value: "/assets/images/banner.jpg" },
  { key: "img_banner_apropos",   label: "Page À propos — Image hero bannière",       grp: "images", sort_order: 7,  value: "/assets/images/banner.jpg" },
  { key: "img_logo",             label: "Logo principal (header/footer)",            grp: "images", sort_order: 8,  value: "/assets/images/logo-matloc.jpg" },
  { key: "img_logo_white",       label: "Logo blanc (footer fond sombre)",           grp: "images", sort_order: 9,  value: "/assets/images/logo_white.png" },

  /* ── HERO ── */
  { key: "hero_title",      label: "Titre principal",   grp: "hero", sort_order: 1,
    value: "Votre partenaire en solutions d'élévation, de transport et d'équipements BTP." },
  { key: "hero_subtitle",   label: "Sous-titre",        grp: "hero", sort_order: 2,
    value: "Tout pour vos travaux de constructions au Bénin. Des solutions flexibles adaptées à l'envergure de vos chantiers." },
  { key: "hero_btn_primary",   label: "Bouton principal",  grp: "hero", sort_order: 3, value: "Demander un devis" },
  { key: "hero_btn_secondary", label: "Bouton secondaire", grp: "hero", sort_order: 4, value: "Nos services" },

  /* ── ABOUT (section accueil) ── */
  { key: "about_title",        label: "Titre — \"Expertise BTP\"",     grp: "about", sort_order: 1, value: "Expertise BTP" },
  { key: "about_intro",        label: "Paragraphe 1",                   grp: "about", sort_order: 2,
    value: "Bienvenue chez MATLOC, votre partenaire de confiance dans la location d'échafaudages, de camions bennes, d'engins et d'équipements spécialisés pour le secteur du Bâtiment et des Travaux Publics." },
  { key: "about_fleet",        label: "Paragraphe 2",                   grp: "about", sort_order: 3,
    value: "Grâce à une flotte diversifiée et régulièrement entretenue, nous permettons à nos clients de réaliser leurs travaux de construction, de terrassement ou d'infrastructure de manière efficace, économique et en toute sécurité." },
  { key: "about_check1_title", label: "✓ Avantage 1 — titre",          grp: "about", sort_order: 4, value: "Maintenance régulière" },
  { key: "about_check1_sub",   label: "✓ Avantage 1 — description",    grp: "about", sort_order: 5, value: "Équipements vérifiés et certifiés." },
  { key: "about_check2_title", label: "✓ Avantage 2 — titre",          grp: "about", sort_order: 6, value: "Flexibilité totale" },
  { key: "about_check2_sub",   label: "✓ Avantage 2 — description",    grp: "about", sort_order: 7, value: "Location courte ou longue durée." },

  /* ── ABOUT PAGE (page à propos) ── */
  { key: "aboutpage_title",    label: "Titre",           grp: "aboutpage", sort_order: 1, value: "Qui sommes-nous ?" },
  { key: "aboutpage_intro",    label: "Paragraphe 1",    grp: "aboutpage", sort_order: 2,
    value: "Depuis sa création, MATLOC s'est imposé comme la référence au Bénin dans les domaines du BTP et de la logistique industrielle." },
  { key: "aboutpage_mission",  label: "Paragraphe 2",    grp: "aboutpage", sort_order: 3,
    value: "Notre mission : accompagner les professionnels du bâtiment avec des équipements de haute performance, un service réactif et des tarifs adaptés à chaque projet." },
  { key: "aboutpage_stat1_value", label: "Stat 1 — valeur", grp: "aboutpage", sort_order: 4, value: "15+" },
  { key: "aboutpage_stat1_label", label: "Stat 1 — label",  grp: "aboutpage", sort_order: 5, value: "Années d'expérience" },
  { key: "aboutpage_stat2_value", label: "Stat 2 — valeur", grp: "aboutpage", sort_order: 6, value: "50+" },
  { key: "aboutpage_stat2_label", label: "Stat 2 — label",  grp: "aboutpage", sort_order: 7, value: "Engins disponibles" },
  { key: "aboutpage_values_title",    label: "Valeurs — titre",      grp: "aboutpage", sort_order: 8,  value: "Nos valeurs fondamentales" },
  { key: "aboutpage_values_subtitle", label: "Valeurs — sous-titre", grp: "aboutpage", sort_order: 9,
    value: "L'excellence opérationnelle n'est pas un acte, c'est une habitude." },
  { key: "aboutpage_team_title",    label: "Équipe — titre",      grp: "aboutpage", sort_order: 10, value: "Notre équipe" },
  { key: "aboutpage_team_subtitle", label: "Équipe — sous-titre", grp: "aboutpage", sort_order: 11,
    value: "Une équipe de professionnels engagés à votre service." },

  /* ── SERVICES PAGE ── */
  { key: "services_hero_title", label: "Hero — titre de la page Services",          grp: "services", sort_order: 1, value: "Nos Services" },
  { key: "services_title",      label: "Accueil — titre \"Un parc matériel de pointe\"", grp: "services", sort_order: 2, value: "Un parc matériel de pointe" },
  { key: "services_subtitle",   label: "Accueil — sous-titre sous le titre",        grp: "services", sort_order: 3,
    value: "MATLOC met à votre disposition une flotte de machines de dernière génération et une expertise technique reconnue." },

  /* ── RÉALISATIONS PAGE ── */
  { key: "realisations_hero_title", label: "Hero — titre",      grp: "realisations", sort_order: 1, value: "Nos Réalisations" },
  { key: "realisations_title",      label: "Section — titre",   grp: "realisations", sort_order: 2, value: "Projets emblématiques" },
  { key: "realisations_subtitle",   label: "Section — sous-titre", grp: "realisations", sort_order: 3,
    value: "Nous intervenons sur des projets de toutes envergures, des infrastructures routières aux installations industrielles complexes." },

  /* ── PARTENAIRES ── */
  { key: "partners_title",    label: "Section — titre",      grp: "partners", sort_order: 1, value: "Nos partenaires" },
  { key: "partners_subtitle", label: "Section — sous-titre", grp: "partners", sort_order: 2,
    value: "Des entreprises de renom qui nous confient leurs chantiers et leur font confiance." },

  /* ── CTA BANNER ── */
  { key: "cta_title",    label: "Titre",      grp: "cta", sort_order: 1,
    value: "Optimisez la performance de votre chantier avec MATLOC" },
  { key: "cta_subtitle", label: "Sous-titre", grp: "cta", sort_order: 2,
    value: "Contactez nos experts pour une analyse personnalisée de vos besoins en levage et transport. Devis gratuit sous 24h." },
  { key: "cta_btn_primary",   label: "Bouton principal",  grp: "cta", sort_order: 3, value: "Demander un Devis" },
  { key: "cta_btn_secondary", label: "Bouton secondaire", grp: "cta", sort_order: 4, value: "Nous Contacter" },

  /* ── SEO ── */
  { key: "seo_site_name",        label: "Nom du site",           grp: "seo", sort_order: 1, value: "MATLOC" },
  { key: "seo_home_title",       label: "Accueil — titre",       grp: "seo", sort_order: 2,
    value: "MATLOC — Expert en location d'échafaudages, transport et équipements BTP" },
  { key: "seo_home_description", label: "Accueil — description", grp: "seo", sort_order: 3,
    value: "MATLOC est votre partenaire en solutions d'élévation, de transport et d'équipements BTP au Bénin. Devis gratuit sous 24h." },

  /* ── FOOTER ── */
  { key: "footer_description", label: "Description",     grp: "footer", sort_order: 1,
    value: "Expert en location d'échafaudages, transport et équipements BTP." },
  { key: "footer_address",     label: "Adresse",         grp: "footer", sort_order: 2, value: "Cotonou, Bénin 1ère Rue à droite après la SBEE Kpondéhou" },
  { key: "footer_phone",       label: "Téléphone",       grp: "footer", sort_order: 3, value: "+229 01 28 31 02 63" },
  { key: "footer_email",       label: "Email",           grp: "footer", sort_order: 4, value: "info.matloc@gmail.com" },
  { key: "footer_whatsapp",    label: "Lien WhatsApp",   grp: "footer", sort_order: 5, value: "https://wa.me/22901283102" },
  { key: "footer_facebook",    label: "Lien Facebook",   grp: "footer", sort_order: 6, value: "https://www.facebook.com/profile.php?id=61568070177659" },
  { key: "footer_instagram",   label: "Lien Instagram",  grp: "footer", sort_order: 7, value: "https://www.instagram.com/matloc_bj/" },
  { key: "footer_linkedin",    label: "Lien LinkedIn",   grp: "footer", sort_order: 8, value: "https://linkedin.com/in/matloc_bj/" },
  { key: "footer_tiktok",      label: "Lien TikTok",     grp: "footer", sort_order: 9, value: "https://vm.tiktok.com/ZMAXbL9TJ/" },
  { key: "footer_copyright",   label: "Texte copyright", grp: "footer", sort_order: 10, value: "MATLOC BTP. Tous droits réservés." },

  /* ── CONTACT ── */
  { key: "contact_hero_title",  label: "Hero — titre de la page",  grp: "contact", sort_order: 0, value: "Contactez-nous" },
  { key: "contact_address",     label: "Adresse",             grp: "contact", sort_order: 1, value: "Cotonou, Bénin 1ère Rue à droite après la SBEE Kpondéhou" },
  { key: "contact_phone",       label: "Téléphone",           grp: "contact", sort_order: 2, value: "+229 01 28 31 02 63" },
  { key: "contact_email",       label: "Email",               grp: "contact", sort_order: 3, value: "info.matloc@gmail.com" },
  { key: "contact_maps_query",  label: "Requête Google Maps", grp: "contact", sort_order: 4, value: "MATLOC, Cotonou, Bénin" },
  { key: "contact_hours_title", label: "Titre horaires",      grp: "contact", sort_order: 5, value: "Heures d'ouverture" },
  { key: "contact_weekdays",    label: "Jours ouvrables",     grp: "contact", sort_order: 6, value: "Lundi - Vendredi" },
  { key: "contact_hours_value", label: "Horaires",            grp: "contact", sort_order: 7, value: "08:00 — 18:30" },
];

/* ── Init ────────────────────────────────────────────────────── */
let initialized = false;

export async function initCmsDb() {
  if (initialized) return;
  initialized = true;

  await pool.query(`
    CREATE TABLE IF NOT EXISTS cms_settings (
      key        TEXT PRIMARY KEY,
      value      TEXT NOT NULL,
      label      TEXT NOT NULL,
      grp        TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  for (const row of SEED) {
    await pool.query(
      `INSERT INTO cms_settings (key, value, label, grp, sort_order)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (key) DO NOTHING`,
      [row.key, row.value, row.label, row.grp, row.sort_order],
    );
  }
}

/* ── Helpers ─────────────────────────────────────────────────── */

export async function getSettingsByGroup(grp: string): Promise<CmsSetting[]> {
  await initCmsDb();
  return query<CmsSetting>(
    "SELECT key, value, label, grp, sort_order FROM cms_settings WHERE grp = $1 ORDER BY sort_order",
    [grp],
  );
}

export async function getAllSettings(): Promise<CmsSetting[]> {
  await initCmsDb();
  return query<CmsSetting>(
    "SELECT key, value, label, grp, sort_order FROM cms_settings ORDER BY grp, sort_order",
  );
}

export async function updateSetting(key: string, value: string): Promise<void> {
  await initCmsDb();
  await pool.query(
    "UPDATE cms_settings SET value = $1, updated_at = NOW() WHERE key = $2",
    [value, key],
  );
}

export async function updateManySettings(updates: Record<string, string>): Promise<void> {
  await initCmsDb();
  const entries = Object.entries(updates);
  if (!entries.length) return;
  for (const [key, value] of entries) {
    await pool.query(
      "UPDATE cms_settings SET value = $1, updated_at = NOW() WHERE key = $2",
      [value, key],
    );
  }
}

export function settingsToMap(rows: CmsSetting[]): Record<string, string> {
  return Object.fromEntries(rows.map((r) => [r.key, r.value]));
}

/* ══════════════════════════════════════════════════════════════
   TABLES CRUD — services, achievements, partners, members, values
   ══════════════════════════════════════════════════════════════ */

export type DbService = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  points: string[];
  image_url: string;
  href: string;
  sort_order: number;
  is_published: boolean;
};

export type DbAchievement = {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  video_url: string;
  sort_order: number;
  is_published: boolean;
};

export type DbPartner = {
  id: string;
  name: string;
  logo_url: string;
  website_url: string;
  sort_order: number;
  is_published: boolean;
};

export type DbMember = {
  id: string;
  name: string;
  role: string;
  image_url: string;
  sort_order: number;
};

export type DbValue = {
  id: string;
  title: string;
  subtitle: string;
  sort_order: number;
};

let crudInitialized = false;

export async function initCrudTables() {
  if (crudInitialized) return;
  crudInitialized = true;
  await initCmsDb();

  await pool.query(`
    CREATE TABLE IF NOT EXISTS cms_services (
      id          TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
      title       TEXT NOT NULL,
      subtitle    TEXT NOT NULL DEFAULT '',
      description TEXT NOT NULL DEFAULT '',
      points      JSONB NOT NULL DEFAULT '[]',
      image_url   TEXT NOT NULL DEFAULT '',
      href        TEXT NOT NULL DEFAULT '',
      sort_order  INTEGER NOT NULL DEFAULT 0,
      is_published BOOLEAN NOT NULL DEFAULT TRUE,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS cms_achievements (
      id          TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
      title       TEXT NOT NULL,
      category    TEXT NOT NULL DEFAULT '',
      thumbnail   TEXT NOT NULL DEFAULT '',
      video_url   TEXT NOT NULL DEFAULT '',
      sort_order  INTEGER NOT NULL DEFAULT 0,
      is_published BOOLEAN NOT NULL DEFAULT TRUE,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS cms_partners (
      id          TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
      name        TEXT NOT NULL,
      logo_url    TEXT NOT NULL DEFAULT '',
      website_url TEXT NOT NULL DEFAULT '',
      sort_order  INTEGER NOT NULL DEFAULT 0,
      is_published BOOLEAN NOT NULL DEFAULT TRUE,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS cms_members (
      id         TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
      name       TEXT NOT NULL,
      role       TEXT NOT NULL DEFAULT '',
      image_url  TEXT NOT NULL DEFAULT '',
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS cms_values (
      id         TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
      title      TEXT NOT NULL,
      subtitle   TEXT NOT NULL DEFAULT '',
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  /* Seed initial uniquement si tables vides */
  const [svc, ach, par, mem, val] = await Promise.all([
    query<{ count: string }>("SELECT COUNT(*)::TEXT AS count FROM cms_services"),
    query<{ count: string }>("SELECT COUNT(*)::TEXT AS count FROM cms_achievements"),
    query<{ count: string }>("SELECT COUNT(*)::TEXT AS count FROM cms_partners"),
    query<{ count: string }>("SELECT COUNT(*)::TEXT AS count FROM cms_members"),
    query<{ count: string }>("SELECT COUNT(*)::TEXT AS count FROM cms_values"),
  ]);

  if (Number(svc[0]?.count ?? 0) === 0) {
    const services = [
      { id: "echafaudages", title: "Solutions de travail en hauteur", subtitle: "Large gamme d'échafaudages robustes, modulables et de solutions d'élevation.", description: "Sécurisez vos travaux en hauteur avec nos systèmes modulables certifiés.", points: ["Montage et démontage rapides","Conformité aux normes internationales","Configurations personnalisées"], image_url: "/assets/images/jpg/Echafaudage.jpeg", href: "/services/echafaudages", sort_order: 0 },
      { id: "transport",    title: "Solution de transport",            subtitle: "Flotte de camions bennes pour le transport de matériaux.", description: "Transportez vos matériaux en toute sérénité.", points: ["Charge utile optimisée","Chauffeurs expérimentés","Maintenance hebdomadaire"], image_url: "/assets/images/jpg/Camion.jpeg", href: "/services/transport", sort_order: 1 },
      { id: "engins",       title: "Location d'engins et d'équipements BTP", subtitle: "Pelleteuses, chargeuses et engins de terrassement.", description: "Puissance et précision pour vos terrassements.", points: ["Moteurs basse consommation","Disponibilité immédiate","Assistance 24/7"], image_url: "/assets/images/jpg/Btp.jpeg", href: "/services/engins", sort_order: 2 },
      { id: "associes",     title: "Services associés aux travaux et chantiers", subtitle: "Groupes électrogènes, marteaux-piqueurs, grues.", description: "Tout l'outillage nécessaire pour vos opérations.", points: ["Équipements performants","Testés avant location","Solutions isolées"], image_url: "/assets/images/jpg/Chantier.jpeg", href: "/services/associes", sort_order: 3 },
    ];
    for (const s of services) {
      await pool.query(
        "INSERT INTO cms_services (id, title, subtitle, description, points, image_url, href, sort_order) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) ON CONFLICT (id) DO NOTHING",
        [s.id, s.title, s.subtitle, s.description, JSON.stringify(s.points), s.image_url, s.href, s.sort_order],
      );
    }
  }

  if (Number(ach[0]?.count ?? 0) === 0) {
    const achievements = [
      { id: "1", title: "Réhabilitation du pont de Porto-Novo",   category: "Infrastructures routières", thumbnail: "/assets/images/png/achievement1.png", video_url: "https://res.cloudinary.com/dabnbstdz/video/upload/v1787568537/20250509_140541.mp4", sort_order: 0 },
      { id: "2", title: "Zone industrielle de Sèmè-Kpodji",       category: "Zones industrielles",        thumbnail: "/assets/images/png/achievement2.png", video_url: "https://res.cloudinary.com/dabnbstdz/video/upload/v1787567926/20251119_152338.mp4", sort_order: 1 },
      { id: "3", title: "Extension du port autonome de Cotonou",  category: "Ports",                      thumbnail: "/assets/images/png/achievement3.png", video_url: "https://res.cloudinary.com/dabnbstdz/video/upload/v1787567921/20260113_104734.mp4", sort_order: 2 },
      { id: "4", title: "Réseau d'assainissement — Abomey-Calavi",category: "Assainissement urbain",       thumbnail: "/assets/images/png/achievement4.png", video_url: "https://res.cloudinary.com/dabnbstdz/video/upload/v1787567920/20251119_152422.mp4", sort_order: 3 },
      { id: "5", title: "Terrassement chantier routier RNIE",      category: "Infrastructures routières", thumbnail: "/assets/images/png/achievement5.png", video_url: "https://res.cloudinary.com/dabnbstdz/video/upload/v1787567908/20251119_152307.mp4", sort_order: 4 },
      { id: "6", title: "Terrassement chantier routier Porto-Novo",category: "Infrastructures routières", thumbnail: "/assets/images/png/achievement6.png", video_url: "https://res.cloudinary.com/dabnbstdz/video/upload/v1787567927/20251119_152651.mp4", sort_order: 5 },
    ];
    for (const a of achievements) {
      await pool.query(
        "INSERT INTO cms_achievements (id, title, category, thumbnail, video_url, sort_order) VALUES ($1,$2,$3,$4,$5,$6) ON CONFLICT (id) DO NOTHING",
        [a.id, a.title, a.category, a.thumbnail, a.video_url, a.sort_order],
      );
    }
  }

  if (Number(par[0]?.count ?? 0) === 0) {
    for (let i = 1; i <= 5; i++) {
      await pool.query(
        "INSERT INTO cms_partners (id, name, logo_url, sort_order) VALUES ($1,$2,$3,$4) ON CONFLICT (id) DO NOTHING",
        [`partner-${i}`, `Partenaire ${i}`, `/assets/images/jpg/partner${i}.jpeg`, i - 1],
      );
    }
  }

  if (Number(mem[0]?.count ?? 0) === 0) {
    const members = [
      { name: "AKINDES THIERRY ALBERT",   role: "Directeur Général",        image_url: "/assets/images/jpg/Thierry.jpeg",     sort_order: 0 },
      { name: "Andréa MALENGUE",           role: "Assistante de Direction",   image_url: "/assets/images/jpg/Andrea.jpeg",      sort_order: 1 },
      { name: "Albin ATIGNON",             role: "Agent Commercial",          image_url: "/assets/images/jpg/Albin.jpeg",       sort_order: 2 },
      { name: "Appolinaire ATCHOUKOU",     role: "Agent Commercial",          image_url: "/assets/images/jpg/Appolinaire.jpeg", sort_order: 3 },
      { name: "KOUASSI BOSSOU Emmanuela",  role: "Community manager",         image_url: "/assets/images/jpg/Kouassi.jpeg",     sort_order: 4 },
      { name: "BODJRÈNOU Abigaël",         role: "Assistante commerciale",    image_url: "/assets/images/jpg/Abigael.jpeg",     sort_order: 5 },
      { name: "BOCOKPEVI Chantal",         role: "Agent commerciale",         image_url: "/assets/images/jpg/chantal.jpeg",     sort_order: 6 },
    ];
    for (const m of members) {
      await pool.query(
        "INSERT INTO cms_members (name, role, image_url, sort_order) VALUES ($1,$2,$3,$4)",
        [m.name, m.role, m.image_url, m.sort_order],
      );
    }
  }

  if (Number(val[0]?.count ?? 0) === 0) {
    const values = [
      { title: "Fiabilité",        subtitle: "Des équipements inspectés et certifiés pour garantir une disponibilité maximale sur vos chantiers.", sort_order: 0 },
      { title: "Innovation",       subtitle: "Investissement continu dans des technologies de levage et de transport de dernière génération.", sort_order: 1 },
      { title: "Sécurité",         subtitle: "Protocoles de sécurité rigoureux pour protéger vos équipes et vos actifs les plus précieux.", sort_order: 2 },
      { title: "Professionnalisme",subtitle: "Une équipe d'experts dédiée à l'accompagnement technique et au conseil stratégique.", sort_order: 3 },
    ];
    for (const v of values) {
      await pool.query(
        "INSERT INTO cms_values (title, subtitle, sort_order) VALUES ($1,$2,$3)",
        [v.title, v.subtitle, v.sort_order],
      );
    }
  }
}

/* ── CRUD Services ─────────────────────────────────────────── */
export async function getServices(): Promise<DbService[]> {
  await initCrudTables();
  const rows = await query<{ id: string; title: string; subtitle: string; description: string; points: string; image_url: string; href: string; sort_order: number; is_published: boolean }>(
    "SELECT * FROM cms_services ORDER BY sort_order, created_at",
  );
  return rows.map((r) => ({ ...r, points: typeof r.points === "string" ? JSON.parse(r.points) as string[] : r.points as unknown as string[] })) as DbService[];
}

export async function upsertService(data: Partial<DbService> & { id?: string }): Promise<string> {
  await initCrudTables();
  const id = data.id ?? crypto.randomUUID();
  await pool.query(
    `INSERT INTO cms_services (id, title, subtitle, description, points, image_url, href, sort_order, is_published, updated_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,NOW())
     ON CONFLICT (id) DO UPDATE SET title=$2, subtitle=$3, description=$4, points=$5, image_url=$6, href=$7, sort_order=$8, is_published=$9, updated_at=NOW()`,
    [id, data.title ?? "", data.subtitle ?? "", data.description ?? "", JSON.stringify(data.points ?? []), data.image_url ?? "", data.href ?? "", data.sort_order ?? 0, data.is_published ?? true],
  );
  return id;
}

export async function deleteService(id: string): Promise<void> {
  await initCrudTables();
  await pool.query("DELETE FROM cms_services WHERE id = $1", [id]);
}

/* ── CRUD Réalisations ──────────────────────────────────────── */
export async function getAchievements(): Promise<DbAchievement[]> {
  await initCrudTables();
  return query<DbAchievement>("SELECT * FROM cms_achievements ORDER BY sort_order, created_at");
}

export async function upsertAchievement(data: Partial<DbAchievement> & { id?: string }): Promise<string> {
  await initCrudTables();
  const id = data.id ?? crypto.randomUUID();
  await pool.query(
    `INSERT INTO cms_achievements (id, title, category, thumbnail, video_url, sort_order, is_published, updated_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7,NOW())
     ON CONFLICT (id) DO UPDATE SET title=$2, category=$3, thumbnail=$4, video_url=$5, sort_order=$6, is_published=$7, updated_at=NOW()`,
    [id, data.title ?? "", data.category ?? "", data.thumbnail ?? "", data.video_url ?? "", data.sort_order ?? 0, data.is_published ?? true],
  );
  return id;
}

export async function deleteAchievement(id: string): Promise<void> {
  await initCrudTables();
  await pool.query("DELETE FROM cms_achievements WHERE id = $1", [id]);
}

/* ── CRUD Partenaires ───────────────────────────────────────── */
export async function getPartners(): Promise<DbPartner[]> {
  await initCrudTables();
  return query<DbPartner>("SELECT * FROM cms_partners ORDER BY sort_order, created_at");
}

export async function upsertPartner(data: Partial<DbPartner> & { id?: string }): Promise<string> {
  await initCrudTables();
  const id = data.id ?? crypto.randomUUID();
  await pool.query(
    `INSERT INTO cms_partners (id, name, logo_url, website_url, sort_order, is_published, updated_at)
     VALUES ($1,$2,$3,$4,$5,$6,NOW())
     ON CONFLICT (id) DO UPDATE SET name=$2, logo_url=$3, website_url=$4, sort_order=$5, is_published=$6, updated_at=NOW()`,
    [id, data.name ?? "", data.logo_url ?? "", data.website_url ?? "", data.sort_order ?? 0, data.is_published ?? true],
  );
  return id;
}

export async function deletePartner(id: string): Promise<void> {
  await initCrudTables();
  await pool.query("DELETE FROM cms_partners WHERE id = $1", [id]);
}

/* ── CRUD Membres ───────────────────────────────────────────── */
export async function getMembers(): Promise<DbMember[]> {
  await initCrudTables();
  return query<DbMember>("SELECT * FROM cms_members ORDER BY sort_order, created_at");
}

export async function upsertMember(data: Partial<DbMember> & { id?: string }): Promise<string> {
  await initCrudTables();
  const id = data.id ?? crypto.randomUUID();
  await pool.query(
    `INSERT INTO cms_members (id, name, role, image_url, sort_order, updated_at)
     VALUES ($1,$2,$3,$4,$5,NOW())
     ON CONFLICT (id) DO UPDATE SET name=$2, role=$3, image_url=$4, sort_order=$5, updated_at=NOW()`,
    [id, data.name ?? "", data.role ?? "", data.image_url ?? "", data.sort_order ?? 0],
  );
  return id;
}

export async function deleteMember(id: string): Promise<void> {
  await initCrudTables();
  await pool.query("DELETE FROM cms_members WHERE id = $1", [id]);
}

/* ── CRUD Valeurs ───────────────────────────────────────────── */
export async function getValues(): Promise<DbValue[]> {
  await initCrudTables();
  return query<DbValue>("SELECT * FROM cms_values ORDER BY sort_order, created_at");
}

export async function upsertValue(data: Partial<DbValue> & { id?: string }): Promise<string> {
  await initCrudTables();
  const id = data.id ?? crypto.randomUUID();
  await pool.query(
    `INSERT INTO cms_values (id, title, subtitle, sort_order, updated_at)
     VALUES ($1,$2,$3,$4,NOW())
     ON CONFLICT (id) DO UPDATE SET title=$2, subtitle=$3, sort_order=$4, updated_at=NOW()`,
    [id, data.title ?? "", data.subtitle ?? "", data.sort_order ?? 0],
  );
  return id;
}

export async function deleteValue(id: string): Promise<void> {
  await initCrudTables();
  await pool.query("DELETE FROM cms_values WHERE id = $1", [id]);
}

/* ══════════════════════════════════════════════════════════════
   TABLE admin_users — gestion des utilisateurs admin
   ══════════════════════════════════════════════════════════════ */

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  role: "admin" | "collaborator";
  is_owner: boolean;
  created_at: string;
};

let usersTableInit = false;

export async function initUsersTable() {
  if (usersTableInit) return;
  usersTableInit = true;
  await initCmsDb();

  await pool.query(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id            TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
      name          TEXT NOT NULL,
      email         TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      role          TEXT NOT NULL DEFAULT 'collaborator',
      is_owner      BOOLEAN NOT NULL DEFAULT FALSE,
      created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  /* Seed : créer le compte owner depuis .env si la table est vide */
  const count = await query<{ count: string }>("SELECT COUNT(*)::TEXT AS count FROM admin_users");
  if (Number(count[0]?.count ?? 0) === 0) {
    const bcrypt = await import("bcryptjs");
    const rawPwd = process.env.ADMIN_PASSWORD ?? "Admin@2026";
    const hash   = rawPwd.startsWith("$2") ? rawPwd : await bcrypt.hash(rawPwd, 12);
    await pool.query(
      `INSERT INTO admin_users (id, name, email, password_hash, role, is_owner)
       VALUES ($1, $2, $3, $4, 'admin', TRUE)
       ON CONFLICT (email) DO NOTHING`,
      ["owner-1", "Administrateur", process.env.ADMIN_EMAIL ?? "admin@matloc.bj", hash],
    );
  }
}

export async function findUserByEmail(email: string): Promise<AdminUser | null> {
  await initUsersTable();
  const rows = await query<AdminUser>(
    "SELECT * FROM admin_users WHERE email = $1",
    [email],
  );
  return rows[0] ?? null;
}

export async function getAllUsers(): Promise<Omit<AdminUser, "password_hash">[]> {
  await initUsersTable();
  return query<Omit<AdminUser, "password_hash">>(
    "SELECT id, name, email, role, is_owner, created_at FROM admin_users ORDER BY created_at",
  );
}

export async function createUser(data: { name: string; email: string; password: string; role: "admin" | "collaborator" }): Promise<void> {
  await initUsersTable();
  const bcrypt = await import("bcryptjs");
  const hash   = await bcrypt.hash(data.password, 12);
  await pool.query(
    `INSERT INTO admin_users (name, email, password_hash, role, is_owner)
     VALUES ($1, $2, $3, $4, FALSE)`,
    [data.name, data.email, hash, data.role],
  );
}

export async function deleteUser(id: string): Promise<void> {
  await initUsersTable();
  /* Interdire la suppression du owner */
  await pool.query("DELETE FROM admin_users WHERE id = $1 AND is_owner = FALSE", [id]);
}
