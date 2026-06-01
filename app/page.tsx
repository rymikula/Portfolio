import { profile } from '../lib/content'
import CareerTimeline from '../components/CareerTimeline'
import SectionHeader from '../components/ui/SectionHeader'

const nav = [
  ['EMAIL', `mailto:${profile.email}`],
  ['LINKEDIN', profile.links.linkedin],
  ['GITHUB', profile.links.github],
]

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-16 md:px-10 md:py-20">
      {/* header */}
      <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight text-text md:text-5xl">
            {profile.name}
          </h1>
          <p className="mt-3 max-w-xl text-lg leading-snug text-dim">{profile.tagline}</p>
        </div>
        <nav className="mono flex flex-wrap gap-x-5 gap-y-2 text-xs tracking-wider text-faint">
          {nav.map(([label, href]) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="transition-colors hover:text-accent"
            >
              {label}
            </a>
          ))}
        </nav>
      </header>

      {/* career timeline - the centerpiece */}
      <section className="mt-20 md:mt-24">
        <SectionHeader label="CAREER" />
        <CareerTimeline />
      </section>

      {/* contact footer */}
      <footer className="mt-28 border-t border-line pt-10">
        <a
          href={`mailto:${profile.email}`}
          className="text-2xl font-semibold tracking-tight text-text transition-colors hover:text-accent md:text-3xl"
        >
          {profile.email}
        </a>
        <p className="mono mt-3 text-[11px] tracking-wider text-faint">
          {profile.location.toUpperCase()}
        </p>
      </footer>
    </main>
  )
}
