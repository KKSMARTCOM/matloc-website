import Link from "next/link";
import { Calendar, Settings, CheckCircle } from "lucide-react";
import { Project } from "@/public/assets/assets";

const cardBase =
  "flex flex-col bg-white border border-[var(--color-primary-light)] shadow-md hover:shadow-lg transition-shadow duration-200 rounded-sm overflow-hidden";
const imgBase = "relative w-full h-56 bg-gray-300 shrink-0";
const overlay = "absolute inset-0 flex flex-col justify-end p-4";
const overlayBg =
  "bg-gradient-to-t from-[var(--color-secondary)] via-[var(--color-secondary)]/60 to-transparent";

/* Card 1 — image overlay + stats en tableau label/valeur */
function CardDefault({ category, title, description, stats, tags }: Project) {
  return (
    <div className={cardBase}>
      <div className={imgBase}>
        <div className={`${overlay} ${overlayBg}`}>
          <span className="mb-2 self-start bg-[var(--color-primary)] text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide rounded-sm">
            {category}
          </span>
          <h3 className="text-base font-bold text-white leading-snug">
            {title}
          </h3>
        </div>
      </div>
      <div className="flex gap-4 p-5">
        <div className="flex flex-col gap-3 flex-1 min-w-0">
          <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
          {tags &&
            tags.map((t) => (
              <span
                key={t}
                className="flex items-center gap-1.5 text-xs text-[var(--color-primary)] font-medium"
              >
                <Settings
                  size={13}
                  className="text-[var(--color-primary)] shrink-0"
                />
                {t}
              </span>
            ))}
        </div>
        {stats && (
          <div className="shrink-0 border border-gray-200 rounded-sm overflow-hidden self-start w-44 bg-[var(--color-primary-light)]">
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex items-center justify-between px-3 py-2.5 border-b border-gray-200 last:border-b-0"
              >
                <span className="text-[11px] uppercase tracking-wide text-[var(--color-text-secondary)]">
                  {s.label}
                </span>
                <span className="text-sm font-bold text-[var(--color-text-primary)] ml-3 whitespace-nowrap">
                  {s.value}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* Card 2 — image overlay + grandes stats orange côte à côte */
function CardOverlayStats({ category, title, description, stats }: Project) {
  return (
    <div className={cardBase}>
      <div className={imgBase}>
        <div className={`${overlay} ${overlayBg}`}>
          <span className="mb-2 self-start bg-[var(--color-primary)] text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide rounded-sm">
            {category}
          </span>
          <h3 className="text-base font-bold text-white leading-snug">
            {title}
          </h3>
        </div>
      </div>
      <div className="p-5 flex flex-col gap-3">
        <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
        {stats && (
          <div className="grid grid-cols-2 divide-x divide-[var(--color-border)] border border-[var(--color-border)] rounded-sm overflow-hidden">
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center py-3 px-4"
              >
                <span className="text-2xl font-bold text-[var(--color-primary)] leading-tight">
                  {s.value}
                </span>
                <span className="text-[10px] uppercase tracking-wide text-[var(--color-text-secondary)] mt-0.5">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* Card 3 — image overlay + tags avec ✓ */
function CardOverlayTags({ title, description, tags }: Project) {
  return (
    <div className={cardBase}>
      <div className={imgBase}>
        <div className={`${overlay} ${overlayBg}`}>
          <h3 className="text-base font-bold text-white leading-snug">
            {title}
          </h3>
        </div>
      </div>
      <div className="p-5 flex flex-col gap-3">
        <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
        {tags &&
          tags.map((t) => (
            <span
              key={t}
              className="flex items-center gap-2 text-sm text-[var(--color-text-primary)]"
            >
              <CheckCircle
                size={15}
                className="text-[var(--color-primary)] shrink-0"
              />
              {t}
            </span>
          ))}
      </div>
    </div>
  );
}

/* Card 4 — image overlay + bandeau marine en bas avec calendrier + Détails */
function CardOverlayDetail({ title, description, tags, href }: Project) {
  return (
    <div className={cardBase}>
      <div className={imgBase}>
        <div className={`${overlay} ${overlayBg}`}>
          <h3 className="text-base font-bold text-white leading-snug">
            {title}
          </h3>
        </div>
      </div>
      <div className="p-5 flex flex-col gap-3">
        <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
      </div>
      {(tags || href) && (
        <div className="mt-auto bg-[var(--color-secondary)] px-5 py-3 flex items-center justify-between gap-3">
          {tags &&
            tags.map((t) => (
              <span
                key={t}
                className="flex items-center gap-2 text-xs text-white/80"
              >
                <Calendar
                  size={13}
                  className="text-[var(--color-primary)] shrink-0"
                />
                {t}
              </span>
            ))}
          {href && (
            <Link
              href={href}
              className="text-sm font-semibold text-[var(--color-primary)] hover:underline whitespace-nowrap"
            >
              Détails →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export default function ProjectCard(props: Project) {
  if (props.layout === "overlay-stats") return <CardOverlayStats {...props} />;
  if (props.layout === "overlay-tags") return <CardOverlayTags {...props} />;
  if (props.layout === "overlay-detail")
    return <CardOverlayDetail {...props} />;
  return <CardDefault {...props} />;
}
