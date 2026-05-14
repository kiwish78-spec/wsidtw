'use client'

import { useState, useEffect, useCallback } from 'react'
import { Registration } from '@/lib/supabase'
import RecordModal from './RecordModal'

export default function RegistrationsTable() {
  const [records, setRecords] = useState<Registration[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState<Registration | null>(null)
  const [search, setSearch] = useState('')

  const fetchRecords = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/registrations', { cache: 'no-store' })
      if (!res.ok) throw new Error('Failed to fetch registrations')
      const data = await res.json()
      setRecords(data.registrations || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading records')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchRecords()
  }, [fetchRecords])

  const filtered = records.filter(r => {
    const q = search.toLowerCase()
    return (
      r.name.toLowerCase().includes(q) ||
      r.instagram_id.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q)
    )
  })

  return (
    <div>
      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Entries', val: records.length, color: 'bg-secondary' },
          { label: 'Showing', val: filtered.length, color: 'bg-tertiary' },
          { label: 'Event', val: '16 May', color: 'bg-primary text-white' },
          { label: 'Location', val: 'Lonavala', color: 'halftone-yellow' },
        ].map(({ label, val, color }) => (
          <div
            key={label}
            className={`border-4 border-pop-black p-4 shadow-[4px_4px_0px_#000] ${color}`}
          >
            <div className="font-mono text-xs font-bold uppercase tracking-widest opacity-60">{label}</div>
            <div className="font-anton text-3xl text-pop-black mt-1">{val}</div>
          </div>
        ))}
      </div>

      {/* Search + Refresh */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by name, @instagram, or email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 px-4 py-3 border-4 border-pop-black font-archivo text-base focus:outline-none focus:border-primary bg-white"
        />
        <button
          onClick={fetchRecords}
          className="bg-secondary border-4 border-pop-black px-6 py-3 font-mono text-sm font-bold uppercase tracking-widest shadow-[3px_3px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_#000] transition-all flex-shrink-0"
        >
          ↺ Refresh
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="border-4 border-pop-black bg-white p-12 text-center">
          <div className="font-mono text-sm uppercase tracking-widest text-gray-500 animate-pulse">
            ⏳ Loading registrations...
          </div>
        </div>
      ) : error ? (
        <div className="border-4 border-red-500 bg-red-50 p-6">
          <div className="font-mono text-sm font-bold text-red-700">⚠ {error}</div>
          <button onClick={fetchRecords} className="mt-3 font-mono text-xs underline text-red-600">
            Retry
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="border-4 border-pop-black bg-white p-12 text-center">
          <div className="font-mono text-sm uppercase tracking-widest text-gray-400">
            {search ? 'No results for your search.' : 'No registrations yet.'}
          </div>
        </div>
      ) : (
        <div className="border-4 border-pop-black shadow-[6px_6px_0px_#000] overflow-hidden">
          {/* Table header */}
          <div className="bg-pop-black grid grid-cols-12 gap-0">
            <div className="col-span-1 p-3 font-mono text-xs font-bold uppercase tracking-widest text-secondary border-r-2 border-gray-700">#</div>
            <div className="col-span-3 p-3 font-mono text-xs font-bold uppercase tracking-widest text-secondary border-r-2 border-gray-700">Name</div>
            <div className="col-span-3 p-3 font-mono text-xs font-bold uppercase tracking-widest text-secondary border-r-2 border-gray-700">Instagram</div>
            <div className="col-span-3 p-3 font-mono text-xs font-bold uppercase tracking-widest text-secondary border-r-2 border-gray-700 hidden md:block">Email</div>
            <div className="col-span-2 p-3 font-mono text-xs font-bold uppercase tracking-widest text-secondary">Date</div>
          </div>

          {/* Table rows */}
          <div className="divide-y-4 divide-pop-black">
            {filtered.map((record, idx) => (
              <div
                key={record.id}
                className="grid grid-cols-12 gap-0 bg-white hover:bg-secondary cursor-pointer transition-colors group"
                onClick={() => setSelected(record)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && setSelected(record)}
              >
                <div className="col-span-1 p-3 font-mono text-sm text-gray-400 border-r-2 border-pop-black group-hover:text-pop-black">
                  {idx + 1}
                </div>
                <div className="col-span-3 p-3 border-r-2 border-pop-black">
                  <div className="font-archivo font-semibold text-sm text-pop-on-surface truncate group-hover:text-pop-black">
                    {record.name}
                  </div>
                </div>
                <div className="col-span-3 p-3 border-r-2 border-pop-black">
                  <div className="font-mono text-xs text-primary truncate group-hover:text-pop-black">
                    {record.instagram_id}
                  </div>
                </div>
                <div className="col-span-3 p-3 border-r-2 border-pop-black hidden md:block">
                  <div className="font-arquivo text-xs text-gray-500 truncate group-hover:text-pop-black">
                    {record.email}
                  </div>
                </div>
                <div className="col-span-2 p-3">
                  <div className="font-mono text-xs text-gray-400 group-hover:text-pop-black">
                    {new Date(record.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <RecordModal record={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
