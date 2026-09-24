"use client";

interface Slice {
  label: string;
  value: number;
  color: string;
}

interface Props {
  slices: Slice[];
  size?: number;
  thickness?: number;
}

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeArc(cx: number, cy: number, r: number, start: number, end: number) {
  const s = polarToCartesian(cx, cy, r, start);
  const e = polarToCartesian(cx, cy, r, end);
  const large = end - start > 180 ? 1 : 0;
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`;
}

export default function DonutChart({ slices, size = 180, thickness = 36 }: Props) {
  const cx = size / 2;
  const cy = size / 2;
  const r  = (size - thickness) / 2;

  const total = slices.reduce((s, d) => s + d.value, 0) || 1;
  let cursor  = 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {slices.map((slice) => {
        const startAngle = (cursor / total) * 360;
        cursor += slice.value;
        const endAngle = (cursor / total) * 360;
        const gap = 2; /* espace entre les segments */
        const path = describeArc(cx, cy, r, startAngle + gap / 2, endAngle - gap / 2);
        return (
          <path
            key={slice.label}
            d={path}
            fill="none"
            stroke={slice.color}
            strokeWidth={thickness}
            strokeLinecap="round"
          />
        );
      })}
      {/* Centre vide */}
      <circle cx={cx} cy={cy} r={r - thickness / 2} fill="white" />
    </svg>
  );
}
