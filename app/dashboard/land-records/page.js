'use client';
import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';

const records = [
  { title: 'Residential Land', location: 'Savar, Dhaka', size: '5.00 Katha', sqft: '3,600 sq ft', id: 'LN-00123', status: 'Verified', type: 'Residential', date: '12 Jan 2024', imgColor: '#4a9e4a' },
  { title: 'Agricultural Land', location: 'Gazipur', size: '12.00 Katha', sqft: '8,640 sq ft', id: 'LN-00124', status: 'Pending', type: 'Agricultural', date: '05 Mar 2024', imgColor: '#6aaa3a' },
  { title: 'Commercial Land', location: 'Bashundhara, Dhaka', size: '8.00 Katha', sqft: '5,760 sq ft', id: 'LN-00125', status: 'Verified', type: 'Commercial', date: '18 Apr 2024', imgColor: '#3a8a5a' },
  { title: 'Agricultural Land', location: 'Tangail', size: '10.00 Katha', sqft: '7,200 sq ft', id: 'LN-00126', status: 'Draft', type: 'Agricultural', date: '02 Jun 2024', imgColor: '#5a9a3a' },
  { title: 'Residential Land', location: 'Mirpur, Dhaka', size: '3.50 Katha', sqft: '2,520 sq ft', id: 'LN-00127', status: 'Verified', type: 'Residential', date: '14 Jul 2024', imgColor: '#4a8e6a' },
  { title: 'Commercial Land', location: 'Motijheel, Dhaka', size: '6.00 Katha', sqft: '4,320 sq ft', id: 'LN-00128', status: 'Pending', type: 'Commercial', date: '29 Aug 2024', imgColor: '#3a7a4a' },
];

const statusColor = { Verified: 'bg-green-100 text-green-700', Pending: 'bg-yellow-100 text-yellow-700', Draft: 'bg-gray-100 text-gray-600' };

export default function LandRecordsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = records.filter(r =>
    (filter === 'All' || r.status === filter || r.type === filter) &&
    (r.title.toLowerCase().includes(search.toLowerCase()) || r.location.toLowerCase().includes(search.toLowerCase()) || r.id.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800">My Land Records</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage and view all your registered land properties</p>
        </div>
        <Link href="/dashboard/land-records/new"
          className="bg-brand hover:bg-brand-dark text-white text-sm font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
          Add New Record
        </Link>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-5">
        <div className="relative flex-1 max-w-sm">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <input type="text" placeholder="Search by name, location, ID..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand bg-white"/>
        </div>
        {['All','Verified','Pending','Draft','Residential','Agricultural','Commercial'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors border ${filter === f ? 'bg-brand text-white border-brand' : 'bg-white text-gray-600 border-gray-200 hover:border-brand hover:text-brand'}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-3 flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>
            </div>
            <h3 className="font-semibold text-gray-600 mb-1">No records found</h3>
            <p className="text-sm text-gray-400">Try adjusting your search or filters.</p>
          </div>
        ) : filtered.map((r, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative h-36 overflow-hidden bg-gray-100">
              <img
                src={r.photoUrl || `https://picsum.photos/seed/${r.id}/400/280`}
                alt={r.title}
                className="w-full h-full object-cover"
                onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }}
              />
              <div className="hidden w-full h-full" style={{ background: `linear-gradient(135deg, ${r.imgColor}cc, ${r.imgColor}88)` }}>
                <svg className="w-full h-full" viewBox="0 0 200 140" preserveAspectRatio="xMidYMid slice">
                  <rect width="200" height="140" fill={r.imgColor} opacity="0.7"/>
                  <path d="M0 90 Q50 65 100 80 Q150 95 200 72 L200 140 L0 140Z" fill="#2d6b35" opacity="0.6"/>
                  <path d="M0 108 Q50 88 100 98 Q150 108 200 90 L200 140 L0 140Z" fill="#1a5a20" opacity="0.7"/>
                </svg>
              </div>
              <span className={`absolute top-2 left-2 text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusColor[r.status]}`}>{r.status === 'Verified' ? '✓ ' : ''}{r.status}</span>
              <span className={`absolute top-2 left-2 text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusColor[r.status]}`}>{r.status === 'Verified' ? '✓ ' : ''}{r.status}</span>
              <button onClick={() => toast.info(`Options for ${r.title}`)} className="absolute top-2 right-2 text-white/80 hover:text-white z-10">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>
              </button>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-gray-800 text-sm">{r.title}</h3>
                <span className="text-[10px] bg-brand-light text-brand px-2 py-0.5 rounded-full font-medium">{r.type}</span>
              </div>
              <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                {r.location}
              </p>
              <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                <span><span className="font-medium text-gray-700">{r.size}</span> ({r.sqft})</span>
                <span className="text-gray-400">{r.date}</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">ID: <span className="text-brand font-medium">{r.id}</span></p>
              <Link href="/dashboard/land-records/new"
                className="mt-3 w-full text-xs text-brand font-medium border border-brand/20 rounded-lg py-2 hover:bg-brand-light transition-colors flex items-center justify-center gap-1">
                View Details
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
