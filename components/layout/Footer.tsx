import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-pop-black border-t-4 border-pop-black mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div
              className="font-anton text-4xl text-secondary mb-2 uppercase"
              style={{ textShadow: '3px 3px 0px #FF00FF' }}
            >
              WSIDTW
            </div>
            <p className="font-mono text-xs text-gray-400 uppercase tracking-widest leading-relaxed">
              What Should I Do This Weekend?
            </p>
            <p className="font-archivo text-sm text-gray-400 mt-3">
              Stop scrolling. Start living. We curate the weekend so you don&apos;t have to.
            </p>
          </div>

          {/* Links */}
          <div>
            <div className="font-mono text-xs font-bold uppercase tracking-widest text-secondary mb-4">
              Navigate
            </div>
            <div className="flex flex-col gap-2">
              <Link href="/#about" className="font-archivo text-gray-400 hover:text-primary transition-colors text-sm">
                Who We Are
              </Link>
              <Link href="/#events" className="font-archivo text-gray-400 hover:text-primary transition-colors text-sm">
                Weekend Lineup
              </Link>
              <Link href="/register" className="font-archivo text-gray-400 hover:text-primary transition-colors text-sm">
                Request an Invite
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="font-mono text-xs font-bold uppercase tracking-widest text-secondary mb-4">
              Enquiries
            </div>
            <a
              href="mailto:support.wsidtw@gmail.com"
              className="font-mono text-sm text-tertiary hover:text-primary transition-colors underline break-all"
            >
              support.wsidtw@gmail.com
            </a>
            <p className="font-archivo text-xs text-gray-500 mt-4 leading-relaxed">
              Invited guests will be notified directly.<br />
              All entries are reviewed manually.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t-2 border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-mono text-xs text-gray-600 uppercase tracking-widest">
            © 2026 WSIDTW. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-primary border-2 border-secondary inline-block"></span>
            <span className="w-3 h-3 bg-secondary border-2 border-primary inline-block rotate-45"></span>
            <span className="w-3 h-3 bg-tertiary border-2 border-secondary inline-block"></span>
          </div>
          <p className="font-mono text-xs text-gray-600 uppercase tracking-widest">
            Made with chaos & coffee ☕
          </p>
        </div>
      </div>
    </footer>
  )
}
