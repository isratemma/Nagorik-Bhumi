'use client';
import { useState } from 'react';

const documents = [
  { name: 'Land Deed – LN-00123', type: 'Deed', land: 'Residential Land, Savar', size: '2.4 MB', format: 'PDF', uploaded: '12 Jan 2024', status: 'Verified' },
  { name: 'Survey Map – LN-00124', type: 'Survey', land: 'Agricultural Land, Gazipur', size: '5.1 MB', format: 'PDF', uploaded: '06 Mar 2024', status: 'Verified' },
  { name: 'NID Copy – Israt Jahan', type: 'Identity', land: '—', size: '0.8 MB', format: 'JPG', uploaded: '01 Jan 2024', status: 'Verified' },
  { name: 'Tax Receipt 2023 – LN-00126', type: 'Tax', land: 'Agricultural Land, Tangail', size: '0.3 MB', format: 'PDF', uploaded: '15 Dec 2023', status: 'Verified' },
  { name: 'Partition Deed – LN-00125', type: 'Deed', land: 'Commercial Land, Bashundhara', size: '3.7 MB', format: 'PDF', uploaded: '20 Apr 2024', status: 'Pending Review' },
  { name: 'Inheritance Certificate', type: 'Inheritance', land: 'Agricultural Land, Gazipur', size: '1.2 MB', format: 'PDF', uploaded: '05 May 2024', status: 'Pending Review' },
];

const typeIcon = {
  Deed: '📄', Survey: '🗺️', Identity: '🪪', Tax: '🧾', Inheritance: '👨‍👩‍👧',
};

const statusStyle = {
  'Verified': 'bg-green-100 text-green-700',
  'Pending Review': 'bg-yellow-100 text-yellow-700',
};

const formatColor = { PDF: 'bg-red-100 text-red-600', JPG: 'bg-blue-100 text-blue-600', PNG: 'bg-purple-100 text-purple-600' };

export default function DocumentsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = documents.filter(d =>
    (filter === 'All' || d.type === filter || d.status === filter) &&
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Documents</h1>
          <p className="text-sm text-gray-500 mt-0.5">Access and manage all your land documents</p>
        </div>
        <button className="bg-brand hover:bg-brand-dark text-white text-sm font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
          Upload Document
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Documents', value: documents.length, color: 'text-gray-800', bg: 'bg-white' },
          { label: 'Verified', value: documents.filter(d => d.status === 'Verified').length, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Pending Review', value: documents.filter(d => d.status === 'Pending Review').length, color: 'text-yellow-600', bg: 'bg-yellow-50' },
          { label: 'Total Size', value: '13.5 MB', color: 'text-brand', bg: 'bg-brand-light' },
        ].map((s, i) => (
          <div key={i} className={`${s.bg} border border-gray-100 rounded-xl p-4`}>
            <p className="text-xs text-gray-500">{s.label}</p>
            <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Search + filter */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-sm">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <input type="text" placeholder="Search documents..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand bg-white"/>
        </div>
        {['All', 'Deed', 'Survey', 'Identity', 'Tax', 'Inheritance', 'Verified', 'Pending Review'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`text-xs px-3 py-1.5 rounded-full font-medium border transition-colors ${filter === f ? 'bg-brand text-white border-brand' : 'bg-white text-gray-600 border-gray-200 hover:border-brand hover:text-brand'}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Documents grid */}
      <div className="grid grid-cols-3 gap-4">
        {filtered.map((d, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-2xl border border-gray-100">
                {typeIcon[d.type]}
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${formatColor[d.format] || 'bg-gray-100 text-gray-600'}`}>{d.format}</span>
            </div>
            <h3 className="font-semibold text-gray-800 text-sm leading-snug">{d.name}</h3>
            <p className="text-xs text-gray-500 mt-1">{d.land}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-gray-400">{d.size} · {d.uploaded}</span>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusStyle[d.status]}`}>{d.status}</span>
            </div>
            <div className="flex gap-2 mt-3">
              <button className="flex-1 text-xs text-brand font-medium border border-brand/20 rounded-lg py-1.5 hover:bg-brand-light transition-colors flex items-center justify-center gap-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/></svg>
                View
              </button>
              <button className="flex-1 text-xs text-gray-600 font-medium border border-gray-200 rounded-lg py-1.5 hover:bg-gray-50 transition-colors flex items-center justify-center gap-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
