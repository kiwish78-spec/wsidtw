import Link from 'next/link'
import Button from '@/components/ui/Button'
import Starburst from '@/components/ui/Starburst'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-pop-black pt-16">
      {/* Halftone background texture */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, #FF00FF 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* Yellow diagonal stripe accent */}
      <div
        className="absolute top-0 right-0 w-1/3 h-full bg-secondary opacity-10"
        style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0% 100%)' }}
      />

      {/* Floating starbursts */}
      <Starburst
        text="FREE!"
        color="yellow"
        size="lg"
        className="absolute top-24 right-8 md:right-24 rotate-12 opacity-90 z-10"
      />
      <Starburst
        text="2026"
        color="cyan"
        size="sm"
        className="absolute bottom-32 left-8 -rotate-6 opacity-80 z-10"
      />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-10 py-20">
        <div className="max-w-4xl">
          {/* Label chip */}
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="bg-secondary border-4 border-pop-black px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest shadow-[3px_3px_0px_#FF00FF]">
              📍 Pune, India
            </span>
            <span className="bg-primary border-4 border-secondary px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest text-white shadow-[3px_3px_0px_#FAFF00]">
              Est. 2026
            </span>
          </div>

          {/* Main headline */}
          <h1
            className="font-anton uppercase leading-none mb-4"
            style={{
              fontSize: 'clamp(52px, 10vw, 120px)',
              lineHeight: '0.9',
              textShadow: '6px 6px 0px #FF00FF',
              color: '#FAFF00',
            }}
          >
            WHAT<br />
            <span style={{ color: '#FFFFFF', textShadow: '6px 6px 0px #00FFFF' }}>
              SHOULD
            </span>
            <br />
            I DO
          </h1>
          <h1
            className="font-anton uppercase leading-none mb-8"
            style={{
              fontSize: 'clamp(52px, 10vw, 120px)',
              lineHeight: '0.9',
              textShadow: '6px 6px 0px #FAFF00',
              color: '#FF00FF',
            }}
          >
            THIS<br />
            <span style={{ color: '#00FFFF', textShadow: '6px 6px 0px #FF00FF' }}>
              WEEKEND?
            </span>
          </h1>

          {/* Tagline */}
          <div className="border-4 border-secondary bg-secondary inline-block px-6 py-3 mb-8 rotate-[-1deg] shadow-[5px_5px_0px_#000]">
            <p className="font-mono font-bold text-pop-black uppercase tracking-widest text-sm md:text-base">
              ✦ Stop Scrolling. Start Living. ✦
            </p>
          </div>

          <p className="font-archivo text-white text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
            The most exclusive weekend party collective in Pune. We don&apos;t just throw parties —
            we create moments you&apos;ll be lying about for years.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 items-center">
            <Link href="/#events">
              <Button variant="secondary" size="lg" tilt>
                🎉 See This Weekend
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="primary" size="lg">
                Request an Invite →
              </Button>
            </Link>
          </div>

          {/* Stat row */}
          <div className="flex flex-wrap gap-6 mt-12 pt-8 border-t-2 border-gray-700">
            {[
              { val: 'Every', label: 'Weekend, Non-stop' },
              { val: 'Invite', label: 'Only Access' },
              { val: '100%', label: 'Vibe Guaranteed' },
            ].map(({ val, label }) => (
              <div key={label}>
                <div className="font-anton text-3xl text-secondary" style={{ textShadow: '2px 2px 0px #FF00FF' }}>
                  {val}
                </div>
                <div className="font-mono text-xs text-gray-400 uppercase tracking-widest">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom border stripe */}
      <div className="absolute bottom-0 left-0 right-0 h-4 flex">
        {['bg-primary', 'bg-secondary', 'bg-tertiary', 'bg-primary', 'bg-secondary', 'bg-tertiary', 'bg-primary', 'bg-secondary'].map((c, i) => (
          <div key={i} className={`flex-1 ${c}`} />
        ))}
      </div>
    </section>
  )
}
