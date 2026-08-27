import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import ProjectCard from "@/components/ui/ProjectCard";
import CtaBanner from "@/components/ui/CtaBanner";
import { PROJECTS } from "@/public/assets/assets";

export const metadata = {
  title: "MATLOC — Nos réalisations",
  description:
    "Découvrez les projets emblématiques réalisés par MATLOC : ponts, zones industrielles, ports et assainissement urbain au Bénin.",
};

export default function RealisationsPage() {
  return (
    <>
      <PageHero title="nos réalisations" url="/assets/images/banner.jpg" />

      <section className="container-site py-16">
        <SectionHeader
          title="Projets emblématiques"
          subtitle="Nous intervenons sur des projets de toutes envergures, des infrastructures routières aux installations industrielles complexes."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
