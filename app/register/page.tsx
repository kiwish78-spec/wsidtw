import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import RegistrationForm from '@/components/register/RegistrationForm'

export const metadata = {
  title: 'Request an Invite — WSIDTW',
  description: 'Submit your details to be considered for our exclusive villa party in Lonavala. Not all are called. Fewer are chosen.',
}

export default function RegisterPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 pt-16">
        {/* Header */}
        <div className="bg-pop-black border-b-4 border-secondary relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: 'radial-gradient(circle, #FF00FF 1px, transparent 1px)',
              backgroundSize: '14px 14px',
            }}
          />
          <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-10 py-16 md:py-20">
            <div className="inline-block bg-secondary border-4 border-pop-black px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest shadow-[3px_3px_0px_#FF00FF] mb-6 rotate-[-1deg]">
              🎟 Villa Night · 16 May 2026
            </div>
            <h1
              className="font-anton uppercase text-white leading-none mb-6"
              style={{
                fontSize: 'clamp(40px, 8vw, 88px)',
                lineHeight: '0.9',
                textShadow: '5px 5px 0px #FF00FF',
              }}
            >
              REQUEST
              <br />
              <span style={{ color: '#FAFF00', textShadow: '5px 5px 0px #00FFFF' }}>
                YOUR INVITE
              </span>
            </h1>
            <p className="font-archivo text-gray-300 text-lg max-w-xl leading-relaxed">
              Fill in your details below. We personally review every submission.
              If you make the cut, you&apos;ll be notified directly — no automated responses, no mass lists.
            </p>
          </div>
        </div>

        {/* Form section */}
        <div className="max-w-4xl mx-auto px-4 md:px-10 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white border-4 border-pop-black shadow-[8px_8px_0px_#FF00FF] p-8">
                <div className="mb-8">
                  <h2 className="font-anton text-3xl uppercase text-pop-black mb-2" style={{ textShadow: '2px 2px 0px #FAFF00' }}>
                    Your Details
                  </h2>
                  <p className="font-mono text-xs text-gray-500 uppercase tracking-widest">
                    All fields are required.
                  </p>
                </div>
                <RegistrationForm />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* How it works */}
              <div className="bg-secondary border-4 border-pop-black shadow-pop p-6">
                <div className="font-mono text-xs font-bold uppercase tracking-widest text-pop-black mb-4">
                  How It Works
                </div>
                <div className="space-y-4">
                  {[
                    { step: '01', title: 'Submit', desc: 'Fill in the form with your details' },
                    { step: '02', title: 'Review', desc: 'We personally review every entry' },
                    { step: '03', title: 'Invite', desc: 'Selected guests get a direct message' },
                    { step: '04', title: 'Party', desc: 'Show up. Have the night of your life.' },
                  ].map(({ step, title, desc }) => (
                    <div key={step} className="flex items-start gap-3">
                      <span className="font-mono font-bold text-lg text-pop-black opacity-40 flex-shrink-0">{step}</span>
                      <div>
                        <div className="font-mono font-bold text-xs uppercase tracking-widest text-pop-black">{title}</div>
                        <div className="font-archivo text-pop-black text-sm">{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Privacy note */}
              <div className="border-4 border-pop-black bg-white p-5 shadow-[4px_4px_0px_#000]">
                <div className="font-mono text-xs font-bold uppercase tracking-widest text-primary mb-2">
                  🔒 Privacy First
                </div>
                <p className="font-archivo text-sm text-pop-on-surface leading-relaxed">
                  Your data is stored securely and used solely to evaluate your invite request.
                  We will never share your information with third parties.
                </p>
              </div>

              {/* Contact */}
              <div className="border-4 border-pop-black bg-pop-black p-5 shadow-[4px_4px_0px_#FF00FF]">
                <div className="font-mono text-xs font-bold uppercase tracking-widest text-secondary mb-2">
                  Questions?
                </div>
                <a
                  href="mailto:support.wsidtw@gmail.com"
                  className="font-mono text-sm text-tertiary underline hover:text-primary transition-colors break-all"
                >
                  support.wsidtw@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
