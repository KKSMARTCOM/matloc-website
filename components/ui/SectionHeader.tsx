import Reveal from "./Reveal";

interface Props {
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ title, subtitle }: Props) {
  return (
    <div className="text-center mb-8 space-y-3 w-full md:max-w-2/3 mx-auto">
      <Reveal>
        <h2 className="section-title text-secondary">{title}</h2>
      </Reveal>
      <Reveal distance={50} duration={1.3} delay={0.3}>
        {subtitle && <p>{subtitle}</p>}
      </Reveal>
    </div>
  );
}
