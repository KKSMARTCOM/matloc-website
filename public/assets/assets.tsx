import {
  CogIcon,
  DrillIcon,
  MailIcon,
  MapPinIcon,
  MoveVerticalIcon,
  PhoneIcon,
  ShieldCheckIcon,
  ShieldPlusIcon,
  UserShieldIcon,
  VanIcon,
  WrenchIcon,
} from "lucide-react";

export interface Service {
  id?: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  description?: string;
  url?: string;
  points?: string[];
  href?: string;
}

export const SERVICES: Service[] = [
  {
    id: "echafaudages",
    icon: MoveVerticalIcon,
    title: "Solutions de travail en hauteur",
    subtitle:
      "Large gamme d'échafaudages robustes, modulables et de solutions d'élevation pour tous vos besoins de travaux en hauteur.",
    description:
      "Sécurisez vos travaux en hauteur avec nos systèmes modulables certifiés, idéal pour le ravalement, la peinture ou la rénovation de façades complexes.",
    points: [
      "Montage et démontage rapides",
      "Conformité aux normes de sécurité internationales",
      "Configurations personnalisées",
    ],
    url: "/assets/images/jpg/Echafaudage.jpeg",
    href: "/services/echafaudages",
  },
  {
    id: "transport",
    icon: VanIcon,
    title: "Solution de transport",
    subtitle:
      "Flotte de camions bennes pour le transport et l'évacuation de matériaux sur divers chantiers.",
    description:
      "Transportez vos matériaux en toute sérénité. Nous proposons des camions bennes, 8×4, 6×4 adaptés pour le transport de granulats, l'évacuation de graves et la logistique de chantier lourde.",
    points: [
      "Charge utile optimisée",
      "Chauffeurs expérimentés disponibles",
      "Maintenance hebdomadaire",
    ],
    url: "/assets/images/jpg/Camion.jpeg",
    href: "/assets/images/jpg/Btp.jpeg",
  },

  {
    id: "engins",
    icon: CogIcon,
    title: "Location d'engins et d'équipements BTP",
    subtitle:
      "Pelleteuses, chargeuses et engins de terrassement pour vos projets d'envergure.",
    description:
      "Puissance et précision pour vos terrassements. Notre gamme comprend des pelleteuses, chargeuses et compacteurs de marques leaders mondiales.",
    points: [
      "Moteurs basse consommation",
      "Disponibilité immédiate en stock",
      "Assistance technique sur site 24/7",
    ],
    url: "/assets/images/jpg/Btp.jpeg",
    href: "/services/engins",
  },
  {
    id: "associes",
    icon: WrenchIcon,
    title: "Services associés aux travaux et chantiers",
    subtitle:
      "Groupes électrogènes, marteaux-piqueurs, grues et petits matériels spécialisés.",
    description:
      "Tout l'outillage nécessaire pour vos opérations quotidiennes : groupes électrogènes, marteaux-piqueurs, bétonnières et compresseurs manuels.",
    points: [
      "Équipements récents et performants",
      "Testés avant chaque location",
      "Solutions pour chantiers isolés",
    ],
    url: "/assets/images/jpg/Chantier.jpeg",
    href: "/services/associes",
  },
];

export interface ContactItem {
  icon: React.ElementType;
  title?: string;
  label: string;
  href?: string;
  type: "address" | "phone" | "email";
}

export const CONTACT_INFO: ContactItem[] = [
  {
    icon: MapPinIcon,
    title: "Siège Social",
    label: "Cotonou, Bénin 1ère Rue à droite après la SBEE Kpondéhou",
    type: "address",
  },
  {
    icon: MailIcon,
    title: "Email",
    label: "info.matloc@gmail.com",
    href: "mailto:info.matloc@gmail.com",
    type: "email",
  },
  {
    icon: PhoneIcon,
    title: "Téléphone",
    label: "+229 01 28 31 02 63",
    href: "tel:+22901283102",
    type: "phone",
  },
];

export interface Values {
  icon: React.ElementType;
  title: string;
  subtitle: string;
}

export const VALUES: Values[] = [
  {
    icon: ShieldCheckIcon,
    title: "Fiabilité",
    subtitle:
      "Des équipements inspectés et certifiés pour garantir une disponibilité maximale sur vos chantiers.",
  },
  {
    icon: DrillIcon,
    title: "Innovation",
    subtitle:
      "Investissement continu dans des technologies de levage et de transport de dernière génération.",
  },
  {
    icon: ShieldPlusIcon,
    title: "Sécurité",
    subtitle:
      "Protocoles de sécurité rigoureux pour protéger vos équipes et vos actifs les plus précieux.",
  },
  {
    icon: UserShieldIcon,
    title: "Professionnalisme",
    subtitle:
      "Une équipe d'experts dédiée à l'accompagnement technique et au conseil stratégique.",
  },
];

export interface Member {
  name: string;
  role: string;
  image: string;
}

export const MEMBERS: Member[] = [
  {
    name: "Andréa MALENGUE",
    role: "Assistante de Direction",
    image: "/assets/images/jpg/Andrea.jpeg",
  },
  {
    name: "Albin ATIGNON",
    role: "Agent Commercial",
    image: "/assets/images/jpg/Albin.jpeg",
  },
  {
    name: "KOUASSI BOSSOU Emmanuela",
    role: "Community manager",
    image: "/assets/images/jpg/Kouassi.jpeg",
  },
  {
    name: "Appolinaire ATCHOUKOU",
    role: "Agent Commercial",
    image: "/assets/images/jpg/Appolinaire.jpeg",
  },
  {
    name: "BODJRÈNOU Abigaël ",
    role: "Assistante commerciale",
    image: "/assets/images/jpg/Abigael.jpeg",
  },
  {
    name: "MALIKI Tidjani",
    role: "Responsable marketing et logistique",
    image: "/assets/images/jpg/Mohamed.jpeg",
  },
  {
    name: "BOCOKPEVI Chantal",
    role: "Agent commerciale",
    image: "/assets/images/jpg/chantal.jpeg",
  },
  {
    name: "LEKE Landry",
    role: "Assistant comptable",
    image: "/assets/images/jpg/landry.jpeg",
  },
  {
    name: "AKINDES THIERRY ALBERT ",
    role: "Directeur Général",
    image: "/assets/images/jpg/Thierry.jpeg",
  },
];

export interface Video {
  title: string;
  thumbnail: string;
  videoUrl: string;
}

export const VIDEOS: Video[] = [
  {
    title: "Installation d’échafaudage au niveau de la pharmacie la Madone",
    thumbnail: "/assets/images/png/achievement1.png",
    videoUrl:
      "https://res.cloudinary.com/dabnbstdz/video/upload/v1787568537/20250509_140541.mp4",
  },
  {
    title: "Livraison d’agrégats sur le site de JULIUS BERGER à SEDEGBE",
    thumbnail: "/assets/images/png/achievement5.png",
    videoUrl:
      "https://res.cloudinary.com/dabnbstdz/video/upload/v1787567908/20251119_152307.mp4",
  },
  {
    title:
      "Mise à disposition d’une nacelle ciseau pour des travaux au SOFITEL BENIN",
    thumbnail: "/assets/images/png/20250901_094502.png",
    videoUrl:
      "https://res.cloudinary.com/dabnbstdz/video/upload/v1789503394/20250901_094502.mp4",
  },
  {
    title:
      "Chantier d’installation d’échafaudage au niveau de la pharmacie la Madone.",
    thumbnail: "/assets/images/png/20250509_140731.png",
    videoUrl:
      "https://res.cloudinary.com/dabnbstdz/video/upload/v1789503898/20250509_140731.mp4",
  },
];

export interface Achievement {
  id: string | number;
  title: string;
  category: string;
  thumbnail: string;
  videoUrl: string;
}

export const ACHIEVEMENT_CATEGORIES = [
  "Tous",
  "Transport d’agrégats",
  "Travaux sur un navire",
  "Travaux en hauteur",
  "Travaux d’assainissement",
  "Travaux de terrassement",
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 1,
    title: "Installation d’échafaudage au niveau de la pharmacie la Madone",
    category: "Travaux en hauteur",
    thumbnail: "/assets/images/png/achievement1.png",
    videoUrl:
      "https://res.cloudinary.com/dabnbstdz/video/upload/v1787568537/20250509_140541.mp4",
  },
  /* {
    id: 2,
    title: "Livraison d’agrégats sur le site de JULIUS BERGER à SEDEGBE",
    category: "Transport d’agrégats",
    thumbnail: "/assets/images/png/achievement2.png",
    videoUrl:
      "https://res.cloudinary.com/dabnbstdz/video/upload/v1787567926/20251119_152338.mp4",
  }, */
  /* {
    id: 3,
    title: "Extension au port autonome de Cotonou",
    category: "Travaux sur un navire",
    thumbnail: "/assets/images/png/achievement3.png",
    videoUrl:
      "https://res.cloudinary.com/dabnbstdz/video/upload/v1787567921/20260113_104734.mp4",
  }, */
  /* {
    id: 4,
    title: "Livraison d’agrégats sur le site de JULIUS BERGER à SEDEGBE",
    category: "Transport d’agrégats",
    thumbnail: "/assets/images/png/achievement4.png",
    videoUrl:
      "https://res.cloudinary.com/dabnbstdz/video/upload/v1787567920/20251119_152422.mp4",
  }, */
  {
    id: 5,
    title: "Livraison d’agrégats sur le site de JULIUS BERGER à SEDEGBE",
    category: "Transport d’agrégats",
    thumbnail: "/assets/images/png/achievement5.png",
    videoUrl:
      "https://res.cloudinary.com/dabnbstdz/video/upload/v1787567908/20251119_152307.mp4",
  },
  {
    id: 6,
    title: "Livraison d’agrégats sur le site de JULIUS BERGER à SEDEGBE",
    category: "Transport d’agrégats",
    thumbnail: "/assets/images/png/achievement6.png",
    videoUrl:
      "https://res.cloudinary.com/dabnbstdz/video/upload/v1787567927/20251119_152651.mp4",
  },
  {
    id: 7,
    title:
      "Chantier d’installation d’échafaudage au niveau de la pharmacie la Madone.",
    category: "Travaux en hauteur",
    thumbnail: "/assets/images/png/20250509_140731.png",
    videoUrl:
      "https://res.cloudinary.com/dabnbstdz/video/upload/v1789503898/20250509_140731.mp4",
  },
  {
    id: 8,
    title:
      "Mise à disposition d’une nacelle ciseau pour des travaux au SOFITEL BENIN",
    category: "Travaux en hauteur",
    thumbnail: "/assets/images/png/20250901_094502.png",
    videoUrl:
      "https://res.cloudinary.com/dabnbstdz/video/upload/v1789503394/20250901_094502.mp4",
  },
  /* {
    id: 9,
    title:
      "Mise à disposition d’une nacelle ciseau pour des travaux au SOFITEL BENIN",
    category: "Travaux en hauteur",
    thumbnail: "/assets/images/png/20250901_100258.png",
    videoUrl:
      "https://res.cloudinary.com/dabnbstdz/video/upload/v1789503387/20250901_100258.mp4",
  }, */
  /* {
    id: 10,
    title: "Assainissement à Akpakpa",
    category: "Travaux d’assainissement",
    thumbnail: "/assets/images/png/20260420_095058.png",
    videoUrl:
      "https://res.cloudinary.com/dabnbstdz/video/upload/v1789503301/20260420_095058.mp4",
  }, */
  /* {
    id: 11,
    title: "Assainissement à Akpakpa",
    category: "Travaux d’assainissement",
    thumbnail: "/assets/images/png/20260420_095109.png",
    videoUrl:
      "https://res.cloudinary.com/dabnbstdz/video/upload/v1789503995/20260420_095109.mp4",
  }, */
  {
    id: 12,
    title: "Terrassement sur un site au niveau de Grand-Popo",
    category: "Travaux de terrassement",
    thumbnail: "/assets/images/png/VID-20250325-WA0023.png",
    videoUrl:
      "https://res.cloudinary.com/dabnbstdz/video/upload/v1789503166/VID-20250325-WA0023.mp4",
  },
];

export interface Project {
  id: string;
  category: string;
  title: string;
  description: string;
  stats?: { label: string; value: string }[];
  tags?: string[];
  href?: string;
  layout?: "default" | "overlay-stats" | "overlay-tags" | "overlay-detail";
}

export const PROJECTS: Project[] = [
  {
    id: "pont-cotonou",
    category: "Infrastructure routière",
    title: "Nouveau Pont de Cotonou",
    description:
      "Location stratégique de grues à tour et transport spécialisé pour les structures pré-contraintes du tablier central.",
    stats: [
      { label: "Durée de mission", value: "18 Mois" },
      { label: "Tonnage déplacé", value: "+5,000 T" },
    ],
    tags: ["12 Grues de levage lourd"],
    layout: "default",
  },
  {
    id: "gdiz-glo-djigbe",
    category: "Développement industriel",
    title: "Aménagement GDIZ Glo-Djigbé",
    description:
      "Terrassement massif et aménagement des plateformes logistiques pour la zone industrielle.",
    stats: [
      { label: "Disponibilité", value: "24/7" },
      { label: "Engins", value: "45" },
    ],
    layout: "overlay-stats",
  },
  {
    id: "port-autonome",
    category: "Infrastructure portuaire",
    title: "Extension Port Autonome",
    description:
      "Support logistique pour l'extension du terminal à conteneurs. Déplacement de charges minimums gros tonnage et nacelles.",
    tags: ["Maintenance sur site 24h/24", "Opérateurs certifiés ISO"],
    layout: "overlay-tags",
  },
  {
    id: "assainissement-parakou",
    category: "Travaux urbains",
    title: "Assainissement Urbain Parakou",
    description:
      "Curage de canaux et pose de conduites pluviales. Utilisation de pellicules hydrauliques à longue portée.",
    tags: ["Projet clôturé en 2025"],
    href: "#",
    layout: "overlay-detail",
  },
];

export const MAPS_QUERY = "MATLOC, Cotonou, Bénin";
