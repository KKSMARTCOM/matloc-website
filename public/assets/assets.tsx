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

export interface Achievement {
  id: string | number;
  title: string;
  category: string;
  thumbnail: string;
  videoUrl: string;
}

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

export const MAPS_QUERY = "MATLOC, Cotonou, Bénin";
