import Link from "next/link";
import {
  ImageIcon, Info, Wrench, FolderOpen, Users,
  Phone, AlignLeft, Globe, Megaphone, GalleryHorizontal,
  ArrowRight,
} from "lucide-react";

const GROUPS = [
  {
    label: "Contenu", color: "blue",
    items: [
      { href:"/admin/hero",         icon:ImageIcon,           label:"Hero accueil",    desc:"Titre, sous-titre, boutons" },
      { href:"/admin/about",        icon:Info,                label:"À propos",        desc:"Textes, équipe, valeurs" },
      { href:"/admin/services",     icon:Wrench,              label:"Services",        desc:"Fiches et textes" },
      { href:"/admin/realisations", icon:FolderOpen,          label:"Réalisations",    desc:"Galerie vidéo" },
      { href:"/admin/partenaires",  icon:Users,               label:"Partenaires",     desc:"Logos partenaires" },
      { href:"/admin/cta",          icon:Megaphone,           label:"Bannière CTA",    desc:"Appel à l'action" },
    ],
  },
  {
    label: "Pages", color: "green",
    items: [
      { href:"/admin/contact",      icon:Phone,               label:"Contact",         desc:"Coordonnées, horaires, Maps" },
      { href:"/admin/footer",       icon:AlignLeft,           label:"Footer",          desc:"Liens et réseaux" },
    ],
  },
  {
    label: "Médias & SEO", color: "purple",
    items: [
      { href:"/admin/images",       icon:GalleryHorizontal,   label:"Images",          desc:"Toutes les images du site" },
      { href:"/admin/seo",          icon:Globe,               label:"SEO",             desc:"Métadonnées Google" },
    ],
  },
];

const colorMap: Record<string, string> = {
  blue:   "bg-blue-50 text-blue-600 group-hover:bg-blue-100",
  green:  "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100",
  purple: "bg-violet-50 text-violet-600 group-hover:bg-violet-100",
};

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* En-tête */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="text-sm text-gray-500 mt-1">Gérez l&apos;ensemble du contenu de votre site MATLOC.</p>
      </div>

      {GROUPS.map(({ label, color, items }) => (
        <div key={label}>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">{label}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3">
            {items.map(({ href, icon: Icon, label: lbl, desc }) => (
              <Link key={href} href={href}
                className="group flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-150">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${colorMap[color]}`}>
                  <Icon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-gray-900">{lbl}</p>
                  <p className="text-xs text-gray-400 mt-0.5 truncate">{desc}</p>
                </div>
                <ArrowRight size={14} className="text-gray-300 group-hover:text-gray-500 shrink-0 mt-0.5 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      ))}

      <p className="text-xs text-gray-400 text-center pt-2">
        Modifications enregistrées en base de données — visibles immédiatement sur le site.
      </p>
    </div>
  );
}
