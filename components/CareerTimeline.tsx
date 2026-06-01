'use client'

import { useEffect, useMemo, useState } from 'react'
import { roles as ROLES, timeline, type Role } from '../lib/content'

const { min: MIN, max: MAX, today: TODAY, ticks: YEARS } = timeline
const RANGE = MAX - MIN
const pct = (year: number) => ((year - MIN) / RANGE) * 100

const BAR_H = 36 // px
const ROW_GAP = 8 // px between stacked sub-rows
const MIN_BAR_PX = 120 // bars never shrink below this, so labels always fit inside
const UNDATED_END = MIN + 2.4 // synthetic span used only to lay out undated roles

const yy = (y: number) => `’${String(Math.floor(y)).slice(2)}`
function shortDate(r: Role) {
  if (r.undated) return 'earlier'
  if (r.current) return `${yy(r.start!)}-now`
  if (Math.floor(r.start!) === Math.floor(r.end!)) return yy(r.start!)
  return `${yy(r.start!)}-${yy(r.end!)}`
}

const LANES: { key: Role['lane']; label: string }[] = [
  { key: 'work', label: 'WORK' },
  { key: 'edu', label: 'EDUCATION' },
]

const layoutStart = (r: Role) => r.start ?? MIN
const layoutEnd = (r: Role) => r.end ?? UNDATED_END

/** Greedily pack a lane's roles into the fewest non-overlapping sub-rows. */
function packLane(items: Role[]) {
  const sorted = [...items].sort((a, b) => layoutStart(a) - layoutStart(b))
  const rowEnds: number[] = []
  const placed = sorted.map((role) => {
    let row = rowEnds.findIndex((end) => layoutStart(role) >= end)
    if (row === -1) {
      row = rowEnds.length
      rowEnds.push(layoutEnd(role))
    } else {
      rowEnds[row] = layoutEnd(role)
    }
    return { role, row }
  })
  return { placed, rowCount: Math.max(rowEnds.length, 1) }
}

export default function CareerTimeline() {
  const [active, setActive] = useState('lenovo')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const r = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(r)
  }, [])

  const lanes = useMemo(
    () =>
      LANES.map((lane) => ({
        ...lane,
        ...packLane(ROLES.filter((r) => r.lane === lane.key)),
      })),
    []
  )

  const activeRole = ROLES.find((r) => r.id === active)!

  // reverse-chronological for the mobile list; undated (Roblox) sinks to the end
  const mobileRoles = useMemo(
    () =>
      [...ROLES].sort(
        (a, b) =>
          (b.undated ? -Infinity : layoutStart(b)) -
          (a.undated ? -Infinity : layoutStart(a))
      ),
    []
  )

  return (
    <div className="w-full">
      {/* desktop: the to-scale Gantt */}
      <div className="hidden md:block">
      <div className="overflow-x-auto pb-1">
        <div className="min-w-[880px]">
          {lanes.map((lane) => {
            const trackH = lane.rowCount * BAR_H + (lane.rowCount - 1) * ROW_GAP
            return (
              <div key={lane.key} className="mb-3 flex items-stretch">
                <div
                  className="mono flex w-24 shrink-0 items-center text-[10px] tracking-[0.2em] text-faint"
                  style={{ height: trackH }}
                >
                  {lane.label}
                </div>
                <div className="relative flex-1" style={{ height: trackH }}>
                  {/* today marker */}
                  <div
                    className="absolute top-0 bottom-0 w-px bg-accent/30"
                    style={{ left: `${pct(TODAY)}%` }}
                  />
                  {lane.placed.map(({ role, row }, i) => {
                    const isActive = role.id === active
                    const left = pct(layoutStart(role))
                    const rawWidth = pct(layoutEnd(role)) - pct(layoutStart(role))
                    const top = row * (BAR_H + ROW_GAP)
                    const select = () => setActive(role.id)
                    // education bars name the degree; work bars name the company
                    const label = role.lane === 'edu' ? role.title : role.org
                    const showDate = rawWidth >= 14 // only roomy bars carry an inline date

                    // colors by state - fills must read clearly against the bg
                    const border = role.current
                      ? 'var(--accent)'
                      : isActive
                      ? 'var(--text-faint)'
                      : 'var(--line-strong)'
                    const bg = role.current
                      ? 'var(--accent-dim)'
                      : role.undated
                      ? 'rgba(255,255,255,0.03)'
                      : isActive
                      ? '#2a2a30'
                      : '#1d1d22'
                    const textColor = role.current ? 'var(--accent)' : isActive ? 'var(--text)' : 'var(--text-dim)'

                    return (
                      <button
                        key={role.id}
                        onMouseEnter={select}
                        onFocus={select}
                        onClick={select}
                        aria-label={`${role.title} at ${role.org}, ${role.dateLabel}`}
                        className="group absolute flex cursor-pointer items-center overflow-hidden rounded-md border px-3 text-left outline-none transition-[width,background,border-color] duration-500 ease-out focus-visible:ring-2 focus-visible:ring-accent/60"
                        style={{
                          left: `${left}%`,
                          top,
                          height: BAR_H,
                          width: mounted ? `max(${rawWidth}%, ${MIN_BAR_PX}px)` : '0%',
                          transitionDelay: `${i * 70}ms`,
                          borderStyle: role.undated ? 'dashed' : 'solid',
                          borderColor: border,
                          background: bg,
                        }}
                      >
                        {role.current && (
                          <span className="mr-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        )}
                        <span className="truncate text-[13px] font-medium" style={{ color: textColor }}>
                          {label}
                        </span>
                        {showDate && (
                          <span
                            className="mono ml-auto shrink-0 pl-3 text-[10px]"
                            style={{ color: 'var(--text-faint)' }}
                          >
                            {shortDate(role)}
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}

          {/* year axis */}
          <div className="flex">
            <div className="w-24 shrink-0" />
            <div className="relative mt-1 h-6 flex-1 border-t border-line">
              {YEARS.map((y) => (
                <div
                  key={y}
                  className="mono absolute top-2 -translate-x-1/2 text-[10px] text-faint"
                  style={{ left: `${pct(y)}%` }}
                >
                  ’{String(y).slice(2)}
                </div>
              ))}
              <div
                className="mono absolute top-2 -translate-x-1/2 text-[10px] font-medium text-accent"
                style={{ left: `${pct(TODAY)}%` }}
              >
                NOW
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* detail panel */}
      <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-3 border-t border-line pt-8 md:grid-cols-[210px_1fr]">
        <div className="mono text-xs tracking-[0.12em] text-faint">{activeRole.dateLabel}</div>
        <div>
          <h3 className="text-xl font-semibold text-text">
            {activeRole.title}
            <span className="text-dim"> · {activeRole.org}</span>
          </h3>
          <p className="mt-3 max-w-2xl leading-relaxed text-dim">{activeRole.blurb}</p>
        </div>
      </div>
      </div>

      {/* mobile: a clean stacked list (a horizontal chart is awkward on a phone) */}
      <ul className="flex flex-col divide-y divide-line md:hidden">
        {mobileRoles.map((role) => (
          <li key={role.id} className="py-5">
            <div className="mono flex items-center gap-2 text-[11px] tracking-wider text-faint">
              {role.current && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
              {role.dateLabel}
            </div>
            <h3 className="mt-1.5 text-base font-semibold text-text">
              {role.title}
              <span className="text-dim"> · {role.org}</span>
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-dim">{role.blurb}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
