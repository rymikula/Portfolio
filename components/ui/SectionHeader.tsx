/**
 * The recurring section header: a mono label, a hairline rule, and optional
 * right-aligned meta. Keeps every section visually consistent.
 */
export default function SectionHeader({
  label,
  meta,
}: {
  label: string
  meta?: string
}) {
  return (
    <div className="mono mb-8 flex items-center gap-4 text-[11px] tracking-[0.2em] text-faint">
      <span className="whitespace-nowrap">{label}</span>
      <span className="h-px flex-1 bg-line" />
      {meta && <span className="whitespace-nowrap">{meta}</span>}
    </div>
  )
}
