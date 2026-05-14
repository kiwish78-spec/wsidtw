import PopCard from '@/components/ui/PopCard'

const pillars = [
  {
    icon: '🎓',
    title: 'Fresh Grads, New City',
    body: "We packed our bags, left our comfort zones, and landed in Pune for our MBAs. New city, zero connections, full ambition.",
    tilt: 'left' as const,
    accent: 'pink' as const,
  },
  {
    icon: '🤝',
    title: 'The Real Networking',
    body: "LinkedIn connections are easy. Real friendships? Not so much. We figured the best way to build your tribe is over a good party, not a boardroom.",
    tilt: 'right' as const,
    accent: 'yellow' as const,
  },
  {
    icon: '🎉',
    title: 'The Weekend Ritual',
    body: "Every weekend — a new experience. Villa parties, rooftop nights, pool parties, club takeovers. If the vibe is right, we're making it happen.",
    tilt: 'none' as const,
    accent: 'cyan' as const,
  },
]

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 md:px-10 bg-pop-bg relative overflow-hidden">
      {/* Top color stripe */}
      <div className="absolute top-0 left-0 right-0 h-4 flex">
        {['bg-secondary', 'bg-primary', 'bg-tertiary', 'bg-secondary', 'bg-primary', 'bg-tertiary', 'bg-secondary', 'bg-primary'].map((c, i) => (
          <div key={i} className={`flex-1 ${c}`} />
        ))}
      </div>

      <div className="max-w-7xl mx-auto pt-8">
        {/* Section header */}
        <div className="mb-16">
          <div className="inline-block bg-tertiary border-4 border-pop-black px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest shadow-pop mb-4 rotate-[1deg]">
            The Origin Story
          </div>
          <h2
            className="font-anton uppercase text-pop-black leading-none"
            style={{
              fontSize: 'clamp(40px, 7vw, 80px)',
              textShadow: '4px 4px 0px #FAFF00',
            }}
          >
            WE ALL ASKED
            <br />
            <span style={{ color: '#FF00FF', textShadow: '4px 4px 0px #000' }}>
              THE SAME QUESTION.
            </span>
          </h2>
        </div>

        {/* Story block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-center">
          <div>
            <p className="font-archivo text-lg md:text-xl text-pop-on-surface leading-relaxed mb-6">
              Picture this: you just moved to a new city for your MBA. You don&apos;t know anyone.
              Your week is brutal — case studies, group projects, networking events with name tags.
            </p>
            <p className="font-archivo text-lg md:text-xl text-pop-on-surface leading-relaxed mb-6">
              And then Friday hits. And you&apos;re sitting in your room, scrolling through Instagram,
              watching everyone else apparently having <em>the time of their lives.</em>
            </p>
            <p className="font-archivo text-lg md:text-xl text-pop-on-surface leading-relaxed">
              We were those people. A bunch of fresh MBA graduates who left our cities, our friends,
              our comfort zones — and arrived in Pune with big dreams and absolutely zero weekend plans.
            </p>
          </div>

          {/* Quote callout */}
          <div className="relative">
            <div className="bg-pop-black border-4 border-secondary p-8 shadow-[8px_8px_0px_#FAFF00] rotate-[-1.5deg]">
              <div className="font-anton text-6xl text-secondary mb-4 leading-none">"</div>
              <p className="font-archivo text-white text-xl md:text-2xl leading-relaxed mb-4">
                So we stopped waiting for the perfect night out to find us — and started building it ourselves.
              </p>
              <div className="font-mono text-xs text-gray-400 uppercase tracking-widest">
                — The WSIDTW Crew
              </div>
            </div>
            {/* Sticker accent */}
            <div className="absolute -top-4 -right-4 bg-primary border-4 border-pop-black text-white font-mono font-bold text-xs uppercase px-3 py-2 shadow-[3px_3px_0px_#000] rotate-[8deg]">
              True Story
            </div>
          </div>
        </div>

        {/* Three pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {pillars.map(({ icon, title, body, tilt, accent }) => (
            <PopCard key={title} tilt={tilt} accent={accent} className="p-8">
              <div className="text-5xl mb-4">{icon}</div>
              <h3 className="font-anton text-2xl uppercase text-pop-black mb-3 leading-tight">
                {title}
              </h3>
              <p className="font-archivo text-base text-pop-on-surface leading-relaxed">{body}</p>
            </PopCard>
          ))}
        </div>

        {/* Bottom tagline */}
        <div className="mt-16 text-center">
          <div
            className="inline-block bg-secondary border-4 border-pop-black px-8 py-4 shadow-[6px_6px_0px_#000] rotate-[-0.5deg]"
          >
            <p className="font-anton text-2xl md:text-3xl uppercase text-pop-black" style={{ textShadow: '2px 2px 0px #FF00FF' }}>
              THIS IS WSIDTW. THE ANSWER TO YOUR FRIDAY BLUES.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
