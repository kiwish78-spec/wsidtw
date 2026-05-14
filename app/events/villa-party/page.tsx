import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'
import PopCard from '@/components/ui/PopCard'

export const metadata = {
  title: 'Villa Night Lonavala — WSIDTW',
  description: 'An exclusive villa party in Lonavala. Strictly by invite only. Not All Are Called. Fewer Are Chosen.',
}

const details = [
  { icon: '📅', label: 'Date', value: 'Saturday, 16 May 2026' },
  { icon: '📍', label: 'Location', value: 'A private villa, Lonavala, Maharashtra' },
  { icon: '🎭', label: 'Theme', value: 'Exclusive Gathering · International Crowd' },
  { icon: '🔒', label: 'Access', value: 'By Personal Invite Only' },
  { icon: '🎶', label: 'Vibe', value: 'Live Sets · Curated Music · Open Bar' },
  { icon: '📸', label: 'Dress Code', value: 'Your most photogenic self' },
]

export default function VillaPartyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 pt-16">
        {/* Hero banner */}
        <div className="relative bg-pop-black overflow-hidden">
          {/* Full-bleed image via background */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'url(/villa-party.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          {/* Dark + halftone overlay so text stays readable */}
          <div className="absolute inset-0 bg-black/65" />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(circle, #FAFF00 1px, transparent 1px)',
              backgroundSize: '18px 18px',
            }}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-10 py-20 md:py-28">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-8 font-mono text-xs uppercase tracking-widest text-gray-500">
              <Link href="/" className="hover:text-secondary transition-colors">Home</Link>
              <span>›</span>
              <Link href="/#events" className="hover:text-secondary transition-colors">Events</Link>
              <span>›</span>
              <span className="text-secondary">Villa Night</span>
            </div>

            {/* Labels */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="bg-secondary border-4 border-pop-black text-pop-black px-4 py-2 font-mono text-sm font-bold uppercase tracking-wider shadow-[3px_3px_0px_#FF00FF]">
                📅 16 May 2026
              </span>
              <span className="bg-primary border-4 border-secondary text-white px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider shadow-[3px_3px_0px_#FAFF00]">
                🔒 Strictly Exclusive
              </span>
              <span className="bg-tertiary border-4 border-pop-black text-pop-black px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider shadow-[3px_3px_0px_#000]">
                📍 Lonavala
              </span>
            </div>

            {/* Title */}
            <h1
              className="font-anton uppercase text-white leading-none mb-6"
              style={{
                fontSize: 'clamp(48px, 9vw, 110px)',
                lineHeight: '0.9',
                textShadow: '6px 6px 0px #FF00FF',
              }}
            >
              VILLA
              <br />
              <span style={{ color: '#FAFF00', textShadow: '6px 6px 0px #00FFFF' }}>
                NIGHT
              </span>
            </h1>

            {/* Tagline */}
            <div className="inline-block bg-tertiary border-4 border-pop-black px-6 py-3 mb-8 rotate-[-1deg] shadow-[5px_5px_0px_#000]">
              <p className="font-mono font-bold text-pop-black uppercase tracking-widest text-base">
                ✦ Not All Are Called. Fewer Are Chosen. ✦
              </p>
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="max-w-7xl mx-auto px-4 md:px-10 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              {/* The story */}
              <PopCard accent="yellow" className="p-8">
                <div className="inline-block bg-secondary border-4 border-pop-black px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest shadow-[2px_2px_0px_#000] mb-4">
                  The Drop
                </div>
                <h2 className="font-anton text-3xl md:text-4xl uppercase text-pop-black mb-4 leading-tight" style={{ textShadow: '2px 2px 0px #FAFF00' }}>
                  The Night That&apos;s Not For Everyone
                </h2>
                <p className="font-archivo text-pop-on-surface text-lg leading-relaxed mb-4">
                  A mate of ours — born in Pune, built his empire in Australia — is passing through this May.
                  And we&apos;re not letting that slide without throwing the kind of night Lonavala has never seen.
                </p>
                <p className="font-archivo text-pop-on-surface text-lg leading-relaxed mb-4">
                  We&apos;ve locked down a private villa tucked in the hills. Think: infinity views, live music,
                  handpicked crowd, and conversations worth having. This isn&apos;t a party you stumble into —
                  it&apos;s one you earn.
                </p>
                <p className="font-archivo text-pop-on-surface text-lg leading-relaxed font-semibold">
                  Entry is personal for everyone. No +1s, no exceptions. Every invite is sent directly.
                </p>
              </PopCard>

              {/* Security note */}
              <div className="border-4 border-primary bg-white p-6 shadow-[6px_6px_0px_#FF00FF] rotate-[-0.5deg]">
                <div className="flex items-start gap-4">
                  <div className="text-4xl flex-shrink-0">🔐</div>
                  <div>
                    <div className="font-mono font-bold text-sm uppercase tracking-widest text-primary mb-2">
                      Security Notice
                    </div>
                    <p className="font-archivo text-pop-on-surface leading-relaxed">
                      This event is strictly exclusive and access is highly selective. For the safety
                      and privacy of all guests, this is a closed-door gathering. All attendees are
                      personally vetted. Details are shared only with confirmed invitees.
                    </p>
                  </div>
                </div>
              </div>

              {/* Event details grid */}
              <div>
                <div className="font-mono text-xs font-bold uppercase tracking-widest text-pop-black mb-4 border-b-4 border-pop-black pb-2">
                  Event Details
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {details.map(({ icon, label, value }) => (
                    <div
                      key={label}
                      className="flex items-start gap-3 p-4 bg-white border-4 border-pop-black shadow-[3px_3px_0px_#000]"
                    >
                      <span className="text-2xl flex-shrink-0">{icon}</span>
                      <div>
                        <div className="font-mono text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">
                          {label}
                        </div>
                        <div className="font-archivo text-pop-on-surface font-semibold">{value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enquiry note */}
              <div className="bg-pop-black border-4 border-secondary p-6 shadow-[6px_6px_0px_#FAFF00]">
                <div className="font-mono text-xs font-bold uppercase tracking-widest text-secondary mb-3">
                  Questions?
                </div>
                <p className="font-archivo text-gray-300 leading-relaxed mb-3">
                  For any enquiries, reach us at:
                </p>
                <a
                  href="mailto:support.wsidtw@gmail.com"
                  className="font-mono font-bold text-tertiary underline hover:text-primary transition-colors break-all"
                >
                  support.wsidtw@gmail.com
                </a>
                <p className="font-mono text-xs text-gray-500 mt-3 uppercase tracking-widest">
                  Invited guests will be notified directly.
                </p>
              </div>
            </div>

            {/* Sidebar CTA */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <PopCard accent="pink" className="p-8" tag="Limited">
                  <h3 className="font-anton text-2xl uppercase text-pop-black mb-3 leading-tight" style={{ textShadow: '2px 2px 0px #FAFF00' }}>
                    Think You&apos;re In?
                  </h3>
                  <p className="font-archivo text-pop-on-surface text-sm leading-relaxed mb-6">
                    Submit your details. We review every entry personally. Selected guests will receive
                    a direct invite with all the details.
                  </p>

                  <div className="space-y-3 mb-6">
                    {[
                      'Name',
                      'Instagram ID',
                      'Email & Phone',
                      'Why you?',
                    ].map(item => (
                      <div key={item} className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-pop-on-surface">
                        <span className="text-primary font-bold">✓</span>
                        {item}
                      </div>
                    ))}
                  </div>

                  <Link href="/register" className="block">
                    <Button variant="primary" size="lg" className="w-full justify-center">
                      Request My Invite
                    </Button>
                  </Link>
                </PopCard>

                {/* Countdown / urgency card */}
                <div className="bg-secondary border-4 border-pop-black p-6 shadow-pop rotate-[1deg]">
                  <div className="font-mono text-xs font-bold uppercase tracking-widest text-pop-black mb-2">
                    ⚡ Heads Up
                  </div>
                  <p className="font-archivo text-pop-black text-sm leading-relaxed">
                    Spots are <strong>extremely limited</strong>. The sooner you submit, the better
                    your chances of being selected.
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
