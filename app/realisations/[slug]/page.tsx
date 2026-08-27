import Reveal from "@/components/ui/Reveal";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function RealisationDetailPage({ params }: Props) {
  const { slug } = await params;
  return (
    <Reveal className="container-site py-16">
      <p className="text-[var(--color-text-secondary)]">Réalisation : {slug}</p>
    </Reveal>
  );
}
