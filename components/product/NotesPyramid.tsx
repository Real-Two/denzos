export interface Notes {
  top: string[];
  heart: string[];
  base: string[];
}

interface NotesPyramidProps {
  notes: Notes;
  productName?: string;
}

export default function NotesPyramid({ notes, productName }: NotesPyramidProps) {
  const rows = [
    { label: 'Top Notes', notes: notes.top, width: 'w-2/5', desc: 'First impression · 15–30 min' },
    { label: 'Heart Notes', notes: notes.heart, width: 'w-3/5', desc: 'The core · 2–4 hours' },
    { label: 'Base Notes', notes: notes.base, width: 'w-full', desc: 'The lasting impression · 6+ hours' },
  ];

  return (
    <div className="w-full">
      {productName && (
        <p className="font-inter text-[10px] tracking-[0.25em] uppercase text-charcoal-muted mb-1">
          Fragrance Profile
        </p>
      )}
      <h3 className="font-cormorant text-3xl font-light text-charcoal mb-8">
        How it Smells
      </h3>

      <div className="flex flex-col items-center gap-0">
        {rows.map((row, index) => (
          <div key={row.label} className={`${row.width} transition-all duration-300`}>
            <div
              className={`border-[0.5px] border-bronze/40 bg-bone px-6 py-5 relative ${
                index === 0
                  ? 'rounded-t-none'
                  : ''
              }`}
              style={{
                borderTop: index > 0 ? 'none' : undefined,
              }}
            >
              {/* Pyramid visual accent */}
              <div
                className="absolute left-0 top-0 bottom-0 w-[2px]"
                style={{ background: `rgba(196, 154, 46, ${0.2 + index * 0.2})` }}
              />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <p className="font-inter text-[10px] tracking-[0.2em] uppercase text-charcoal-muted">
                    {row.label}
                  </p>
                  <p className="font-inter text-[9px] text-charcoal-muted/60 mt-0.5">{row.desc}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {row.notes.map(note => (
                    <span
                      key={note}
                      className="font-inter text-[11px] text-charcoal bg-ivory border-[0.5px] border-bronze/30 px-3 py-1"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Visual pyramid illustration */}
      <div className="flex justify-center mt-6">
        <div className="flex flex-col items-center gap-0 opacity-20">
          <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-b-[12px] border-l-transparent border-r-transparent border-b-bronze" />
          <div className="w-0 h-0 border-l-[32px] border-r-[32px] border-b-[14px] border-l-transparent border-r-transparent border-b-bronze" />
          <div className="w-0 h-0 border-l-[48px] border-r-[48px] border-b-[16px] border-l-transparent border-r-transparent border-b-bronze" />
        </div>
      </div>
    </div>
  );
}
