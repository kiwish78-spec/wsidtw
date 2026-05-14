import Link from 'next/link'
import Button from '@/components/ui/Button'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { unstable_noStore as noStore } from 'next/cache'

type EventImage = { url: string; display_order: number }
type Event = {
  id: string
  title: string
  host: string
  date: string
  time: string
  venue: string
  description: string | null
  event_images: EventImage[]
}

async function getActiveEvents(): Promise<Event[]> {
  noStore()
  try {
    const { data } = await supabaseAdmin
      .from('events')
      .select('*, event_images(url, display_order)')
      .eq('is_active', true)
      .order('date', { ascending: true })
    return data || []
  } catch {
    return []
  }
}

function EventCard({ event }: { event: Event }) {
  const images = [...event.event_images].sort((a, b) => a.display_order - b.display_order)
  const cover = images[0]?.url

  const formattedDate = new Date(event.date).toLocaleDateString('en-IN', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
  }).toUpperCase()

  return (
    <div className="relative">
      <Link href={`/events/${event.id}`} className="block group">
        <div className="bg-white border-4 border-secondary shadow-[10px_10px_0px_#FAFF00] group-hover:translate-x-2 group-hover:translate-y-2 group-hover:shadow-[6px_6px_0px_#FAFF00] transition-all duration-150">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: info */}
            <div className="p-8 md:p-12 border-b-4 md:border-b-0 md:border-r-4 border-pop-black">
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="halftone-yellow border-4 border-pop-black px-4 py-2 font-mono text-sm font-bold uppercase tracking-wider shadow-[3px_3px_0px_#000]">
                  📅 {formattedDate}
                </span>
                <span className="bg-primary border-4 border-pop-black text-white px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider shadow-[3px_3px_0px_#000]">
                  🔒 EXCLUSIVE
                </span>
              </div>

              <h3
                className="font-anton uppercase text-pop-black leading-none mb-4"
                style={{ fontSize: 'clamp(32px, 4vw, 56px)', textShadow: '3px 3px 0px #FF00FF' }}
              >
                {event.title}
              </h3>

              <div className="inline-block bg-tertiary border-4 border-pop-black px-4 py-2 mb-6 font-mono text-sm font-bold uppercase tracking-widest shadow-[3px_3px_0px_#000] rotate-[-1deg]">
                ✦ Not All Are Called. Fewer Are Chosen. ✦
              </div>

              {event.description && (
                <p className="font-archivo text-pop-on-surface text-base md:text-lg leading-relaxed mb-6 line-clamp-3">
                  {event.description}
                </p>
              )}

              <div className="flex flex-wrap gap-3 mb-8">
                {[
                  `📍 ${event.venue}`,
                  `🕐 ${event.time}`,
                  `🎤 ${event.host}`,
                ].map(tag => (
                  <span key={tag} className="bg-pop-bg border-4 border-pop-black px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>

              <Button variant="primary" size="lg">
                See Event Details →
              </Button>
            </div>

            {/* Right: image */}
            <div
              className="relative min-h-[400px]"
              style={cover ? {
                backgroundImage: `url(${cover})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderLeft: '4px solid #000',
              } : { backgroundColor: '#FF00FF', borderLeft: '4px solid #000' }}
            >
              {cover && <div className="absolute inset-0 bg-black/30" />}

              {/* Floating badges */}
              <div className="absolute top-6 right-6 bg-pop-black text-secondary border-4 border-secondary px-4 py-3 font-mono font-bold text-sm uppercase tracking-widest shadow-[4px_4px_0px_#FAFF00] rotate-[6deg] z-10">
                By Invite<br />Only
              </div>
              <div className="absolute bottom-6 left-6 bg-secondary border-4 border-pop-black px-4 py-3 font-mono font-bold text-xs uppercase tracking-widest shadow-[3px_3px_0px_#000] -rotate-[3deg] z-10">
                🌙 {event.venue}
              </div>

              {/* Fallback text when no image */}
              {!cover && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="font-anton text-center uppercase leading-none select-none"
                    style={{ fontSize: 'clamp(48px, 6vw, 80px)', color: 'rgba(0,0,0,0.2)' }}
                  >
                    {event.title}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>

      <div className="absolute -top-5 -right-4 z-20 bg-secondary border-4 border-pop-black text-pop-black font-mono font-bold text-xs uppercase px-3 py-2 shadow-[3px_3px_0px_#000] rotate-[10deg]">
        Click Me!
      </div>
    </div>
  )
}

export default async function EventsSection() {
  const events = await getActiveEvents()

  return (
    <section id="events" className="py-24 px-4 md:px-10 bg-pop-black relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'radial-gradient(circle, #FAFF00 1px, transparent 1px)', backgroundSize: '16px 16px' }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-12">
          <div className="inline-block bg-primary border-4 border-secondary px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest shadow-[3px_3px_0px_#FAFF00] text-white mb-4 rotate-[1deg]">
            🗓 Lined Up
          </div>
          <h2
            className="font-anton uppercase text-white leading-none"
            style={{ fontSize: 'clamp(40px, 7vw, 80px)', textShadow: '4px 4px 0px #FF00FF' }}
          >
            THIS WEEKEND&apos;S
            <br />
            <span style={{ color: '#FAFF00', textShadow: '4px 4px 0px #00FFFF' }}>DROP.</span>
          </h2>
        </div>

        {events.length === 0 ? (
          <div className="border-4 border-dashed border-gray-600 p-16 text-center">
            <p className="font-mono text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">
              Nothing announced yet —
            </p>
            <p className="font-archivo text-gray-400 text-base">Check back soon. Something's always brewing.</p>
            <div className="mt-6">
              <Link href="/register">
                <Button variant="outline" className="border-gray-500 text-white hover:bg-secondary hover:text-pop-black hover:border-pop-black">
                  Get Early Access
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-16">
            {events.map(event => <EventCard key={event.id} event={event} />)}
          </div>
        )}

        <div className="mt-16 border-4 border-dashed border-gray-600 p-8 text-center">
          <p className="font-mono text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">More drops incoming —</p>
          <p className="font-archivo text-gray-400 text-base">Club nights · Rooftop sessions · Pool parties · Pop-up dinners</p>
          <div className="mt-6">
            <Link href="/register">
              <Button variant="outline" className="border-gray-500 text-white hover:bg-secondary hover:text-pop-black hover:border-pop-black">
                Get Early Access
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
