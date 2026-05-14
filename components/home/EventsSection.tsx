import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function EventsSection() {
  return (
    <section id="events" className="py-24 px-4 md:px-10 bg-pop-black relative overflow-hidden">
      {/* Background halftone */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle, #FAFF00 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className="mb-12">
          <div className="inline-block bg-primary border-4 border-secondary px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest shadow-[3px_3px_0px_#FAFF00] text-white mb-4 rotate-[1deg]">
            🗓 Lined Up
          </div>
          <h2
            className="font-anton uppercase text-white leading-none"
            style={{
              fontSize: 'clamp(40px, 7vw, 80px)',
              textShadow: '4px 4px 0px #FF00FF',
            }}
          >
            THIS WEEKEND&apos;S
            <br />
            <span style={{ color: '#FAFF00', textShadow: '4px 4px 0px #00FFFF' }}>
              DROP.
            </span>
          </h2>
        </div>

        {/* Event card */}
        <div className="relative">
          <Link href="/events/villa-party" className="block group">
            <div className="bg-white border-4 border-secondary shadow-[10px_10px_0px_#FAFF00] group-hover:translate-x-2 group-hover:translate-y-2 group-hover:shadow-[6px_6px_0px_#FAFF00] transition-all duration-150">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Left: info */}
                <div className="p-8 md:p-12 border-b-4 md:border-b-0 md:border-r-4 border-pop-black">
                  {/* Date chip */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="halftone-yellow border-4 border-pop-black px-4 py-2 font-mono text-sm font-bold uppercase tracking-wider shadow-[3px_3px_0px_#000]">
                      📅 FRI, 16 MAY 2026
                    </span>
                    <span className="bg-primary border-4 border-pop-black text-white px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider shadow-[3px_3px_0px_#000]">
                      🔒 EXCLUSIVE
                    </span>
                  </div>

                  <h3
                    className="font-anton uppercase text-pop-black leading-none mb-4"
                    style={{
                      fontSize: 'clamp(36px, 5vw, 64px)',
                      textShadow: '3px 3px 0px #FF00FF',
                    }}
                  >
                    VILLA NIGHT
                    <br />
                    <span style={{ color: '#FF00FF', textShadow: '3px 3px 0px #000' }}>
                      LONAVALA
                    </span>
                  </h3>

                  {/* Tagline */}
                  <div className="inline-block bg-tertiary border-4 border-pop-black px-4 py-2 mb-6 font-mono text-sm font-bold uppercase tracking-widest shadow-[3px_3px_0px_#000] rotate-[-1deg]">
                    ✦ Not All Are Called. Fewer Are Chosen. ✦
                  </div>

                  <p className="font-archivo text-pop-on-surface text-base md:text-lg leading-relaxed mb-8">
                    A private villa in the hills. An intimate circle. An Aussie billionaire passing through.
                    This one&apos;s strictly by invite — and strictly unforgettable.
                  </p>

                  <div className="flex flex-wrap gap-3 mb-8">
                    {['🏡 Private Villa', '🌄 Lonavala', '🎶 Live Sets', '🍹 Open Bar'].map(tag => (
                      <span
                        key={tag}
                        className="bg-pop-bg border-4 border-pop-black px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Button variant="primary" size="lg">
                    See Event Details →
                  </Button>
                </div>

                {/* Right: visual panel */}
                <div
                  className="relative min-h-[320px] halftone-pink flex flex-col items-center justify-center p-8"
                >
                  {/* Giant text decoration */}
                  <div
                    className="font-anton text-center uppercase leading-none select-none"
                    style={{
                      fontSize: 'clamp(60px, 8vw, 100px)',
                      color: 'rgba(0,0,0,0.15)',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    VILLA<br />PARTY
                  </div>

                  {/* Floating label */}
                  <div className="absolute top-8 right-8 bg-pop-black text-secondary border-4 border-secondary px-5 py-3 font-mono font-bold text-sm uppercase tracking-widest shadow-[4px_4px_0px_#FAFF00] rotate-[6deg]">
                    By Invite<br />Only
                  </div>

                  {/* Bottom badge */}
                  <div className="absolute bottom-8 left-8 bg-secondary border-4 border-pop-black px-4 py-3 font-mono font-bold text-xs uppercase tracking-widest shadow-[3px_3px_0px_#000] -rotate-[3deg]">
                    🌙 16 May · Lonavala
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Decorative sticker */}
          <div className="absolute -top-5 -right-4 z-20 bg-secondary border-4 border-pop-black text-pop-black font-mono font-bold text-xs uppercase px-3 py-2 shadow-[3px_3px_0px_#000] rotate-[10deg]">
            Click Me!
          </div>
        </div>

        {/* Coming soon teaser */}
        <div className="mt-12 border-4 border-dashed border-gray-600 p-8 text-center">
          <p className="font-mono text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">
            More drops incoming —
          </p>
          <p className="font-archivo text-gray-400 text-base">
            Club nights · Rooftop sessions · Pool parties · Pop-up dinners
          </p>
          <p className="font-mono text-xs text-gray-600 mt-3 uppercase tracking-widest">
            Subscribe or get on the list to be the first to know.
          </p>
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
