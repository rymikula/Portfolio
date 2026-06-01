// ─────────────────────────────────────────────────────────────────────────
// Single source of truth for everything on the site.
// Edit your data here; every component reads from this file.
// ─────────────────────────────────────────────────────────────────────────

export const profile = {
  name: 'Ryan Mikula',
  tagline: 'Happy software engineer.',
  location: 'Raleigh, NC',
  email: 'ryanmikula3@gmail.com',
  links: {
    linkedin: 'https://www.linkedin.com/in/ryanmikula/',
    github: 'https://github.com/rymikula',
  },
}

export type Lane = 'work' | 'edu'

export type Role = {
  id: string
  lane: Lane
  title: string
  org: string
  // start/end are decimal years (e.g. 2024.42 ≈ June 2024) used to place the
  // bar on the time axis. Omit both for an undated role.
  start?: number
  end?: number
  undated?: boolean
  dateLabel: string
  current?: boolean
  blurb: string
}

export const roles: Role[] = [
  {
    id: 'roblox',
    lane: 'work',
    title: 'Lead Developer / Founder',
    org: 'Roblox Game Studio',
    undated: true,
    dateLabel: 'Earlier · no fixed dates',
    blurb:
      'Founded and ran a Roblox game studio, doing full-stack development in Lua - a large set of modular game systems and services.',
  },
  {
    id: 'bs',
    lane: 'edu',
    title: 'B.S. Computer Science',
    org: 'NC State University',
    start: 2021.6,
    end: 2025.4,
    dateLabel: '2021 - 2025',
    blurb: 'B.S. in Computer Science at NC State University.',
  },
  {
    id: 'lexis',
    lane: 'work',
    title: 'Software Engineer Intern',
    org: 'LexisNexis',
    start: 2024.42,
    end: 2024.66,
    dateLabel: 'Jun - Aug 2024',
    blurb:
      'Built Java applications in content-engineering pipelines that process XML content before deployment, with test-driven development and Jenkins CI/CD.',
  },
  {
    id: 'ms',
    lane: 'edu',
    title: 'M.S. Computer Science',
    org: 'NC State University',
    start: 2024.6,
    end: 2026.4,
    dateLabel: '2024 - 2026',
    blurb: 'M.S. in Computer Science at NC State University, alongside full-time work.',
  },
  {
    id: 'lenovo',
    lane: 'work',
    title: 'Software Engineer',
    org: 'Lenovo',
    start: 2025.42,
    end: 2026.46,
    current: true,
    dateLabel: 'May 2025 - Present',
    blurb:
      'Build shared platform software in C#/.NET and C++ that runs on Lenovo Windows devices - services other teams build their features on, spanning telemetry, remote configuration, and on-device AI.',
  },
]

// Timeline axis bounds (decimal years). Starts at the first dated role.
export const timeline = {
  min: 2021,
  max: 2027, // headroom so the NOW marker isn't clipped
  today: 2026.46,
  ticks: [2021, 2022, 2023, 2024, 2025, 2026],
}
