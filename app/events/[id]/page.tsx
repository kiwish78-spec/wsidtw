import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'
import PopCard from '@/components/ui/PopCard'
import { supabaseAdmin } from '@/lib/supabase-admin'

type EventImage = { id: string; url: string; display_order: number }
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

async function getEvent(id: string): Promise<Event | null> {
  const { data } = await supabaseAdmin
    .from('events')
    .select('*, event_images(id, url, display_order)')
    .eq('id', id)
    .eq('is_active', true)
    .single()
  return data
}

export default async function EventDetailPage({ params }: { params: { id: string } }) {
  const event = await getEvent(params.id)
  if (!event) notFound()

  const images = [...(event.event_images || [])].sort((a, b) => a.display_order - b.display_order)
  const coverImage = images[0]?.url

  const formattedDate = new Date(event.date).toLocaleDateString('en-IN', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 pt-16">
        {/* Hero */}
        <div
          className="relative bg-pop-black overflow-hidden"
          style={coverImage ? {
            backgroundImage: `url(${coverImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          } : {}}
        >
          <div className="absolute inset-0 bg-black/65" />
          <div
            className="absolute inset-0 opacity-20"
            style={{ backgroundImage: 'radial-gradient(circle, #FAFF00 1px, transparent 1px)', backgroundSize: '18px 18px' }}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-10 py-20 md:py-28">
            <div className="flex items-center gap-2 mb-8 font-mono text-xs uppercase tracking-widest text-gray-400">
              <Link href="/" className="hover:text-secondary transition-colors">Home</Link>
              <span>›</span>
              <Link href="/#events" className="hover:text-secondary transition-colors">Events</Link>
              <span>›</span>
              <span className="text-secondary">{event.title}</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              <span className="bg-secondary border-4 border-pop-black text-pop-black px-4 py-2 font-mono text-sm font-bold uppercase tracking-wider shadow-[3px_3px_0px_#FF00FF]">
                📅 {formattedDate}
              </span>
              <span className="bg-primary border-4 border-secondary text-white px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider shadow-[3px_3px_0px_#FAFF00]">
                🔒 Exclusive
              </span>
            </div>

            <h1
              className="font-anton uppercase text-white leading-none mb-6"
              style={{ fontSize: 'clamp(48px, 9vw, 110px)', lineHeight: '0.9', textShadow: '6px 6px 0px #FF00FF' }}
            >
              {event.title.split(' ').map((word, i) => (
                <span key={i}>
                  {i > 0 && <br />}
                  {word}
                </span>
              ))}
            </h1>

            <div className="inline-block bg-tertiary border-4 border-pop-black px-6 py-3 mb-8 rotate-[-1deg] shadow-[5px_5px_0px_#000]">
              <p className="font-mono font-bold text-pop-black uppercase tracking-widest text-base">
                ✦ Not All Are Called. Fewer Are Chosen. ✦
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 md:px-10 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">

              {/* Image gallery */}
              {images.length > 1 && (
                <div>
                  <div className="font-mono text-xs font-bold uppercase tracking-widest text-pop-black mb-4 border-b-4 border-pop-black pb-2">
                    Gallery
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {images.map((img, idx) => (
                      <div key={img.id} className={`border-4 border-pop-black overflow-hidden shadow-pop ${idx === 0 ? 'col-span-2 md:col-span-2 row-span-2' : ''}`}>
                        <img src={img.url} alt={`Event image ${idx + 1}`} className="w-full h-full object-cover aspect-square" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              {event.description && (
                <PopCard accent="yellow" className="p-8">
                  <div className="inline-block bg-secondary border-4 border-pop-black px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest shadow-[2px_2px_0px_#000] mb-4">
                    About This Night
                  </div>
                  <p className="font-archivo text-pop-on-surface text-lg leading-relaxed whitespace-pre-wrap">
                    {event.description}
                  </p>
                </PopCard>
              )}

              {/* Event details */}
              <div>
                <div className="font-mono text-xs font-bold uppercase tracking-widest text-pop-black mb-4 border-b-4 border-pop-black pb-2">
                  Event Details
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { icon: '📅', label: 'Date', value: formattedDate },
                    { icon: '🕐', label: 'Time', value: event.time },
                    { icon: '📍', label: 'Venue', value: event.venue },
                    { icon: '🎤', label: 'Host', value: event.host },
                    { icon: '🔒', label: 'Access', value: 'By Personal Invite Only' },
                  ].map(({ icon, label, value }) => (
                    <div key={label} className="flex items-start gap-3 p-4 bg-white border-4 border-pop-black shadow-[3px_3px_0px_#000]">
                      <span className="text-2xl flex-shrink-0">{icon}</span>
                      <div>
                        <div className="font-mono text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">{label}</div>
                        <div className="font-archivo text-pop-on-surface font-semibold">{value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-pop-black border-4 border-secondary p-6 shadow-[6px_6px_0px_#FAFF00]">
                <div className="font-mono text-xs font-bold uppercase tracking-widest text-secondary mb-3">Questions?</div>
                <a href="mailto:support.wsidtw@gmail.com" className="font-mono font-bold text-tertiary underline hover:text-primary transition-colors">
                  support.wsidtw@gmail.com
                </a>
                <p className="font-mono text-xs text-gray-500 mt-3 uppercase tracking-widest">Invited guests will be notified directly.</p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <PopCard accent="pink" className="p-8" tag="Limited">
                  <h3 className="font-anton text-2xl uppercase text-pop-black mb-3 leading-tight" style={{ textShadow: '2px 2px 0px #FAFF00' }}>
                    Think You&apos;re In?
                  </h3>
                  <p className="font-archivo text-pop-on-surface text-sm leading-relaxed mb-6">
                    Submit your details. We review every entry personally.
                  </p>
                  <Link href="/register" className="block">
                    <Button variant="primary" size="lg" className="w-full justify-center">
                      Request My Invite
                    </Button>
                  </Link>
                </PopCard>

                <div className="bg-secondary border-4 border-pop-black p-6 shadow-pop rotate-[1deg]">
                  <div className="font-mono text-xs font-bold uppercase tracking-widest text-pop-black mb-2">⚡ Heads Up</div>
                  <p className="font-archivo text-pop-black text-sm leading-relaxed">
                    Spots are <strong>extremely limited</strong>. The sooner you submit, the better your chances.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
