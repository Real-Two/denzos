export interface Notes {
  top: string[];
  heart: string[];
  base: string[];
}

interface NotesPyramidProps {
  notes: Notes;
  accentHex?: string;
  productName?: string;
}

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function NotesPyramid({ notes, accentHex = '#C49A2E', productName }: NotesPyramidProps) {
  const bands = [
    {
      label: 'Top Notes',
      sublabel: 'First impression · 15–30 min',
      notes: notes.top,
      fillOpacity: 0.22,
      strokeOpacity: 0.5,
    },
    {
      label: 'Heart Notes',
      sublabel: 'The soul of the scent · 2–4 hrs',
      notes: notes.heart,
      fillOpacity: 0.5,
      strokeOpacity: 0.7,
    },
    {
      label: 'Base Notes',
      sublabel: 'The lasting impression · 6+ hrs',
      notes: notes.base,
      fillOpacity: 0.85,
      strokeOpacity: 1,
    },
  ];

  // SVG pyramid geometry — isosceles triangle
  // viewBox: 0 0 200 240, apex at top center
  const svgW = 200;
  const svgH = 240;
  const apex = { x: svgW / 2, y: 0 };
  const baseLeft = { x: 0, y: svgH };
  const baseRight = { x: svgW, y: svgH };

  // Each band covers 1/3 of the triangle height
  // Interpolate left/right edge points at 1/3 and 2/3 heights
  function lerp(a: number, b: number, t: number) {
    return a + (b - a) * t;
  }

  const bandPoints = [
    // Top band: apex → y=H/3
    {
      points: [
        apex,
        { x: lerp(apex.x, baseLeft.x, 1 / 3), y: lerp(apex.y, baseLeft.y, 1 / 3) },
        { x: lerp(apex.x, baseRight.x, 1 / 3), y: lerp(apex.y, baseRight.y, 1 / 3) },
      ],
    },
    // Middle band: y=H/3 → y=2H/3
    {
      points: [
        { x: lerp(apex.x, baseLeft.x, 1 / 3), y: lerp(apex.y, baseLeft.y, 1 / 3) },
        { x: lerp(apex.x, baseLeft.x, 2 / 3), y: lerp(apex.y, baseLeft.y, 2 / 3) },
        { x: lerp(apex.x, baseRight.x, 2 / 3), y: lerp(apex.y, baseRight.y, 2 / 3) },
        { x: lerp(apex.x, baseRight.x, 1 / 3), y: lerp(apex.y, baseRight.y, 1 / 3) },
      ],
    },
    // Bottom band: y=2H/3 → base
    {
      points: [
        { x: lerp(apex.x, baseLeft.x, 2 / 3), y: lerp(apex.y, baseLeft.y, 2 / 3) },
        baseLeft,
        baseRight,
        { x: lerp(apex.x, baseRight.x, 2 / 3), y: lerp(apex.y, baseRight.y, 2 / 3) },
      ],
    },
  ];

  function pointsToPath(pts: { x: number; y: number }[]): string {
    return pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + ' Z';
  }

  return (
    <div className="w-full">
      {productName && (
        <p className="font-inter text-[10px] tracking-[0.25em] uppercase text-charcoal-muted mb-1">
          Fragrance Profile
        </p>
      )}
      <h3 className="font-cormorant text-3xl font-light text-charcoal mb-10">
        Fragrance Notes
      </h3>

      <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start">
        {/* SVG Pyramid */}
        <div className="flex-shrink-0 flex justify-center">
          <svg
            width={svgW}
            height={svgH}
            viewBox={`0 0 ${svgW} ${svgH}`}
            aria-label="Fragrance notes pyramid"
          >
            {bandPoints.map((band, i) => (
              <path
                key={i}
                d={pointsToPath(band.points)}
                fill={hexToRgba(accentHex, bands[i].fillOpacity)}
                stroke={hexToRgba(accentHex, bands[i].strokeOpacity)}
                strokeWidth="0.5"
              />
            ))}
            {/* Horizontal dividers */}
            <line
              x1={lerp(apex.x, baseLeft.x, 1 / 3)}
              y1={lerp(apex.y, baseLeft.y, 1 / 3)}
              x2={lerp(apex.x, baseRight.x, 1 / 3)}
              y2={lerp(apex.y, baseRight.y, 1 / 3)}
              stroke={hexToRgba(accentHex, 0.4)}
              strokeWidth="0.5"
            />
            <line
              x1={lerp(apex.x, baseLeft.x, 2 / 3)}
              y1={lerp(apex.y, baseLeft.y, 2 / 3)}
              x2={lerp(apex.x, baseRight.x, 2 / 3)}
              y2={lerp(apex.y, baseRight.y, 2 / 3)}
              stroke={hexToRgba(accentHex, 0.6)}
              strokeWidth="0.5"
            />
          </svg>
        </div>

        {/* Notes columns — stacked vertically, aligned with bands */}
        <div className="flex-1 flex flex-col justify-between gap-6">
          {bands.map((band) => (
            <div key={band.label} className="flex flex-col gap-1.5">
              {/* Label row with accent left border */}
              <div
                className="pl-3 mb-1"
                style={{ borderLeft: `2px solid ${hexToRgba(accentHex, band.strokeOpacity)}` }}
              >
                <p
                  className="font-inter text-[10px] tracking-[0.2em] uppercase font-medium"
                  style={{ color: hexToRgba(accentHex, band.strokeOpacity) }}
                >
                  {band.label}
                </p>
                <p className="font-inter text-[9px] text-charcoal-muted/60 mt-0.5">{band.sublabel}</p>
              </div>
              {/* Note pills */}
              <div className="flex flex-wrap gap-1.5">
                {band.notes.map(note => (
                  <span
                    key={note}
                    className="font-inter text-[11px] text-charcoal bg-ivory border-[0.5px] px-3 py-1"
                    style={{ borderColor: hexToRgba(accentHex, 0.3) }}
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
