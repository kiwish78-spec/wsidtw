'use client'

import Modal from '@/components/ui/Modal'
import { Registration } from '@/lib/supabase'

interface RecordModalProps {
  record: Registration | null
  onClose: () => void
}

function DetailRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`p-4 border-4 border-pop-black ${highlight ? 'bg-secondary' : 'bg-white'}`}>
      <div className="font-mono text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">{label}</div>
      <div className="font-archivo text-base text-pop-on-surface font-semibold break-words">{value || '—'}</div>
    </div>
  )
}

export default function RecordModal({ record, onClose }: RecordModalProps) {
  if (!record) return null

  const formattedDate = new Date(record.created_at).toLocaleString('en-IN', {
    dateStyle: 'long',
    timeStyle: 'short',
  })

  return (
    <Modal isOpen={!!record} onClose={onClose} title="Registration Details">
      {/* Header card */}
      <div className="bg-pop-black border-4 border-secondary p-6 shadow-[6px_6px_0px_#FAFF00] mb-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="font-mono text-xs font-bold uppercase tracking-widest text-secondary mb-1">
              Entry ID
            </div>
            <div className="font-mono text-xs text-gray-400 break-all">{record.id}</div>
          </div>
          <div className="flex-shrink-0">
            <span className="bg-tertiary border-4 border-pop-black text-pop-black px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider">
              Received
            </span>
          </div>
        </div>
        <div className="mt-4">
          <div
            className="font-anton text-3xl md:text-4xl uppercase text-white"
            style={{ textShadow: '2px 2px 0px #FF00FF' }}
          >
            {record.name}
          </div>
          <div className="font-mono text-sm text-gray-400 mt-1">Submitted {formattedDate}</div>
        </div>
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <DetailRow label="Instagram ID" value={record.instagram_id} highlight />
        <DetailRow label="Email" value={record.email} />
        <DetailRow label="Phone" value={record.phone} />
        <DetailRow label="Submitted On" value={formattedDate} />
      </div>

      {/* Why invite - full width */}
      <div className="border-4 border-primary bg-white p-5 shadow-[4px_4px_0px_#FF00FF]">
        <div className="flex items-center gap-2 mb-3">
          <div className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
            Why Should We Invite Them?
          </div>
          <div className="flex-1 h-1 bg-primary opacity-30" />
        </div>
        <p className="font-archivo text-pop-on-surface text-base leading-relaxed whitespace-pre-wrap">
          {record.why_invite}
        </p>
      </div>

      {/* Action row */}
      <div className="mt-6 flex flex-wrap gap-3 pt-4 border-t-4 border-pop-black">
        <a
          href={`mailto:${record.email}`}
          className="inline-flex items-center gap-2 bg-tertiary border-4 border-pop-black px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest shadow-[3px_3px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_#000] transition-all"
        >
          ✉ Email
        </a>
        <a
          href={`https://www.instagram.com/${record.instagram_id.replace('@', '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-primary text-white border-4 border-pop-black px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest shadow-[3px_3px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_#000] transition-all"
        >
          📸 Instagram
        </a>
        <button
          onClick={onClose}
          className="ml-auto bg-white border-4 border-pop-black px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest shadow-[3px_3px_0px_#000] hover:bg-pop-surface transition-colors"
        >
          Close
        </button>
      </div>
    </Modal>
  )
}
