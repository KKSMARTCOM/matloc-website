import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  fr: {
    translation: {
      nav: {
        home: "Accueil",
        about: "À propos",
        services: "Services",
        projects: "Réalisations",
        contact: "Contact",
      },
      actions: {
        quote: "Demander un devis",
        contact: "Nous contacter",
        learnMore: "En savoir plus",
        send: "Envoyer le message",
        sendRequest: "Envoyer la demande",
      },
      common: {
        language: "Langue :",
        close: "Fermer",
        openMenu: "Ouvrir le menu",
        closeMenu: "Fermer le menu",
        home: "MATLOC — Accueil",
        navigation: "Navigation principale",
        menu: "Menu de navigation",
        social: "Réseaux sociaux",
        allRights: "Tous droits réservés.",
        madeBy: "Réalisé par",
      },
      cta: {
        eyebrow: "PRÊT À DÉMARRER ?",
        title: "Optimisez la performance de votre chantier avec MATLOC",
        subtitle:
          "Contactez nos experts pour une analyse personnalisée de vos besoins en levage et transport. Devis gratuit sous 24h.",
      },
      forms: {
        messageTitle: "Envoyez un message",
        messageIntro:
          "Remplissez le formulaire ci-dessous et nos équipes vous répondront sous 24h.",
        fullName: "Nom complet",
        professionalEmail: "Email professionnel",
        subject: "Sujet de votre demande",
        collaboration: "Collaboration",
        information: "Renseignements",
        other: "Autres",
        message: "Votre message",
        describe: "Décrivez votre besoin",
        status: "Statut",
        individual: "Particulier",
        company: "Entreprise",
        companyName: "Nom / raison sociale",
        phone: "Téléphone",
        email: "Email",
        requestedService: "Service souhaité",
        detailedMessage: "Message détaillé",
        success: "Votre demande a bien été envoyée.",
        error: "Une erreur est survenue. Veuillez réessayer.",
      },
      footer: {
        description:
          "Expert en location d'échafaudages, transport et équipements BTP.",
        quickLinks: "Liens rapides",
        services: "Nos services",
        contact: "Contact",
      },
      home: {
        heroTitle:
          "Votre partenaire en solutions d’élévation, de transport et d’équipements BTP.",
        heroSubtitle:
          "Tout pour vos travaux de construction au Bénin. Des solutions flexibles adaptées à l’envergure de vos chantiers.",
        expertise: "Expertise BTP",
        welcome:
          "Bienvenue chez MATLOC, votre partenaire de confiance dans la location d’échafaudages, de camions bennes, d’engins et d’équipements spécialisés pour le secteur du Bâtiment et des Travaux Publics.",
        fleet:
          "Grâce à une flotte diversifiée et régulièrement entretenue, nous permettons à nos clients de réaliser leurs travaux de construction, de terrassement ou d’infrastructure de manière efficace, économique et en toute sécurité. Notre expertise et notre engagement envers l’innovation nous positionnent comme un acteur clé dans la réussite de vos projets.",
        maintenance: "Maintenance régulière",
        certified: "Équipements certifiés et fiables",
        flexibility: "Flexibilité totale",
        duration: "Location courte ou longue durée",
        services: "Nos services",
        servicesIntro:
          "Location d'engins de chantier et prestations BTP clé en main, du terrassement au gros œuvre, avec du matériel entretenu et des équipes qualifiées",
        partners: "Nos partenaires",
        partnersIntro:
          "Entreprises, promoteurs et maîtres d'ouvrage qui nous confient leurs chantiers pour la location d'engins et l'exécution des travaux",
        quote: "Devis",
        quoteIntro: "Demandez une estimation gratuite pour votre projet.",
        quoteText:
          "Notre équipe se tient à votre disposition pour vous offrir un devis sur-mesure adapté à vos besoins spécifiques. Remplissez simplement notre formulaire et nous vous répondrons dans les plus brefs délais.",
      },
      pages: {
        about: "À propos",
        aboutTitle: "Qui sommes-nous ?",
        values: "Nos valeurs fondamentales",
        team: "Notre équipe",
        services: "Nos services",
        serviceTitle: "Un parc matériel de pointe",
        projects: "Nos réalisations",
        projectTitle: "Projets emblématiques",
        contact: "Contactez-nous",
        coordinates: "Nos coordonnées",
        hours: "Heure d’ouverture",
        weekdays: "Lundi - Vendredi",
        hoursValue: "08h00 - 18h30",
      },
      service: {
        height: "Solutions de travail en hauteur",
        transport: "Solution de transport",
        equipment: "Location d'engins et d'équipements BTP",
        associated: "Services associés aux travaux et chantiers",
        learn: "En savoir plus",
      },
      about: {
        intro:
          "Depuis sa création, MATLOC s'est imposé comme l'acteur de référence au Bénin dans le secteur du BTP et de la logistique industrielle. Notre parc d'engins, parmi les plus modernes de la sous-région, répond aux exigences de fiabilité les plus strictes.",
        mission:
          "Notre mission est claire : accompagner les entreprises de construction et les institutions dans la réalisation de leurs infrastructures en fournissant des équipements de haute performance, maintenus selon les standards internationaux de sécurité.",
        experience: "Années d'expérience",
        equipment: "Engins disponibles",
        valuesIntro:
          "L'excellence opérationnelle n'est pas un acte, c'est une habitude. Nous bâtissons notre réputation sur quatre piliers essentiels.",
      },
      data: {
        services: {
          echafaudages: {
            title: "Solutions de travail en hauteur",
            subtitle:
              "Large gamme d'échafaudages robustes, modulables et de solutions d'élévation pour tous vos besoins de travaux en hauteur.",
            description:
              "Sécurisez vos travaux en hauteur avec nos systèmes modulables certifiés, idéals pour le ravalement, la peinture ou la rénovation de façades complexes.",
            points: [
              "Montage et démontage rapides",
              "Conformité aux normes de sécurité internationales",
              "Configurations personnalisées",
            ],
          },
          transport: {
            title: "Solution de transport",
            subtitle:
              "Flotte de camions bennes pour le transport et l'évacuation de matériaux sur divers chantiers.",
            description:
              "Transportez vos matériaux en toute sérénité avec nos camions bennes 8x4 et 6x4, adaptés au transport de granulats, à l'évacuation de graves et à la logistique de chantier lourde.",
            points: [
              "Charge utile optimisée",
              "Chauffeurs expérimentés disponibles",
              "Maintenance hebdomadaire",
            ],
          },
          engins: {
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
          },
          associes: {
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
          },
        },
        values: {
          reliability: {
            title: "Fiabilité",
            subtitle:
              "Des équipements inspectés et certifiés pour garantir une disponibilité maximale sur vos chantiers.",
          },
          innovation: {
            title: "Innovation",
            subtitle:
              "Investissement continu dans des technologies de levage et de transport de dernière génération.",
          },
          safety: {
            title: "Sécurité",
            subtitle:
              "Protocoles de sécurité rigoureux pour protéger vos équipes et vos actifs les plus précieux.",
          },
          professionalism: {
            title: "Professionnalisme",
            subtitle:
              "Une équipe d'experts dédiée à l'accompagnement technique et au conseil stratégique.",
          },
        },
        videos: {
          earthworks: "Chantier de terrassement — Cotonou",
          scaffolding: "Location d'échafaudages — Porto-Novo",
          transport: "Transport de matériaux BTP",
          machinery: "Engins de terrassement en action",
        },
        achievements: {
          all: "Tous",
          roads: "Infrastructures routières",
          industrial: "Zones industrielles",
          ports: "Ports",
          sanitation: "Assainissement urbain",
          empty: "Aucune réalisation dans cette catégorie pour le moment.",
          bridge: "Réhabilitation du pont de Porto-Novo",
          zone: "Zone industrielle de Sèmè-Kpodji",
          port: "Extension du port autonome de Cotonou",
          network: "Réseau d'assainissement — Abomey-Calavi",
          roadSite: "Terrassement chantier routier RNIE",
          portoSite: "Terrassement chantier routier Porto-Novo",
        },
      },
    },
  },
  en: {
    translation: {
      nav: {
        home: "Home",
        about: "About",
        services: "Services",
        projects: "Projects",
        contact: "Contact",
      },
      actions: {
        quote: "Request a quote",
        contact: "Contact us",
        learnMore: "Learn more",
        send: "Send message",
        sendRequest: "Send request",
      },
      common: {
        language: "Language:",
        close: "Close",
        openMenu: "Open menu",
        closeMenu: "Close menu",
        home: "MATLOC — Home",
        navigation: "Main navigation",
        menu: "Navigation menu",
        social: "Social networks",
        allRights: "All rights reserved.",
        madeBy: "Built by",
      },
      cta: {
        eyebrow: "READY TO GET STARTED?",
        title: "Optimize your site performance with MATLOC",
        subtitle:
          "Contact our experts for a personalized assessment of your lifting and transport needs. Free quote within 24 hours.",
      },
      forms: {
        messageTitle: "Send us a message",
        messageIntro:
          "Fill out the form below and our teams will reply within 24 hours.",
        fullName: "Full name",
        professionalEmail: "Professional email",
        subject: "Subject of your request",
        collaboration: "Collaboration",
        information: "Information",
        other: "Other",
        message: "Your message",
        describe: "Describe your needs",
        status: "Status",
        individual: "Individual",
        company: "Company",
        companyName: "Name / company name",
        phone: "Phone",
        email: "Email",
        requestedService: "Requested service",
        detailedMessage: "Detailed message",
        success: "Your request has been sent successfully.",
        error: "An error occurred. Please try again.",
      },
      footer: {
        description:
          "Expert in scaffolding rental, transport and construction equipment.",
        quickLinks: "Quick links",
        services: "Our services",
        contact: "Contact",
      },
      home: {
        heroTitle:
          "Your partner for lifting, transport and construction equipment solutions.",
        heroSubtitle:
          "Everything you need for your construction projects in Benin. Flexible solutions adapted to the scale of your sites.",
        expertise: "Construction expertise",
        welcome:
          "Welcome to MATLOC, your trusted partner for scaffolding, dump truck, machinery and specialized equipment rental for the construction and public works sector.",
        fleet:
          "With a diverse and regularly maintained fleet, we help our clients carry out construction, earthmoving and infrastructure projects efficiently, economically and safely. Our expertise and commitment to innovation make us a key partner in the success of your projects.",
        maintenance: "Regular maintenance",
        certified: "Certified and reliable equipment",
        flexibility: "Total flexibility",
        duration: "Short or long-term rental",
        services: "Our services",
        servicesIntro:
          "Construction machinery rental and turnkey services, from earthworks to structural work, with maintained equipment and qualified teams",
        partners: "Our partners",
        partnersIntro:
          "Companies, developers and project owners who trust us with their equipment rental and construction projects",
        quote: "Quote",
        quoteIntro: "Request a free estimate for your project.",
        quoteText:
          "Our team is available to provide a tailored quote that meets your specific needs. Simply fill out our form and we will get back to you shortly.",
      },
      pages: {
        about: "About",
        aboutTitle: "Who are we?",
        values: "Our core values",
        team: "Our team",
        services: "Our services",
        serviceTitle: "A cutting-edge equipment fleet",
        projects: "Our projects",
        projectTitle: "Landmark projects",
        contact: "Contact us",
        coordinates: "Our contact details",
        hours: "Opening hours",
        weekdays: "Monday - Friday",
        hoursValue: "8:00 AM - 6:30 PM",
      },
      service: {
        height: "Working at height solutions",
        transport: "Transport solution",
        equipment: "Construction machinery and equipment rental",
        associated: "Services related to works and sites",
        learn: "Learn more",
      },
      about: {
        intro:
          "Since its creation, MATLOC has become a leading reference in Benin's construction and industrial logistics sectors. Our machinery fleet, one of the most modern in the sub-region, meets the strictest reliability requirements.",
        mission:
          "Our mission is clear: to support construction companies and institutions in delivering their infrastructure by providing high-performance equipment maintained to international safety standards.",
        experience: "Years of experience",
        equipment: "Available machines",
        valuesIntro:
          "Operational excellence is not an act, it is a habit. We build our reputation on four essential pillars.",
      },
      data: {
        services: {
          echafaudages: {
            title: "Working at height solutions",
            subtitle:
              "A wide range of sturdy, modular scaffolding and lifting solutions for all your work-at-height needs.",
            description:
              "Secure your work at height with our certified modular systems, ideal for facade restoration, painting and complex renovations.",
            points: [
              "Fast assembly and dismantling",
              "Compliant with international safety standards",
              "Custom configurations",
            ],
          },
          transport: {
            title: "Transport solution",
            subtitle:
              "A fleet of dump trucks for transporting and removing materials from various sites.",
            description:
              "Move your materials with confidence using our 8x4 and 6x4 dump trucks, designed for aggregates, spoil removal and heavy site logistics.",
            points: [
              "Optimized payload",
              "Experienced drivers available",
              "Weekly maintenance",
            ],
          },
          engins: {
            title: "Construction machinery and equipment rental",
            subtitle:
              "Excavators, loaders and earthmoving equipment for large-scale projects.",
            description:
              "Power and precision for your earthworks. Our range includes excavators, loaders and compactors from leading global brands.",
            points: [
              "Low-consumption engines",
              "Immediate availability",
              "24/7 on-site technical support",
            ],
          },
          associes: {
            title: "Services related to works and sites",
            subtitle:
              "Generators, jackhammers, cranes and specialized small equipment.",
            description:
              "All the tools you need for daily operations: generators, jackhammers, concrete mixers and manual compressors.",
            points: [
              "Recent, high-performance equipment",
              "Tested before every rental",
              "Solutions for remote sites",
            ],
          },
        },
        values: {
          reliability: {
            title: "Reliability",
            subtitle:
              "Inspected and certified equipment to guarantee maximum availability on your sites.",
          },
          innovation: {
            title: "Innovation",
            subtitle:
              "Continuous investment in the latest lifting and transport technologies.",
          },
          safety: {
            title: "Safety",
            subtitle:
              "Strict safety protocols to protect your teams and your most valuable assets.",
          },
          professionalism: {
            title: "Professionalism",
            subtitle:
              "A team of experts dedicated to technical support and strategic advice.",
          },
        },
        videos: {
          earthworks: "Earthworks site — Cotonou",
          scaffolding: "Scaffolding rental — Porto-Novo",
          transport: "Construction materials transport",
          machinery: "Earthmoving machinery in action",
        },
        achievements: {
          all: "All",
          roads: "Road infrastructure",
          industrial: "Industrial zones",
          ports: "Ports",
          sanitation: "Urban sanitation",
          empty: "No projects are available in this category yet.",
          bridge: "Porto-Novo bridge rehabilitation",
          zone: "Sèmè-Kpodji industrial zone",
          port: "Cotonou autonomous port extension",
          network: "Abomey-Calavi sanitation network",
          roadSite: "RNIE road construction earthworks",
          portoSite: "Porto-Novo road construction earthworks",
        },
      },
    },
  },
} as const;

if (!i18n.isInitialized) {
  i18n.use(LanguageDetector).init({
    resources,
    fallbackLng: "fr",
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
    interpolation: { escapeValue: false },
  });
}

export default i18n;
