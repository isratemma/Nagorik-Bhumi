'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';

const statusColor = {
  Verified: 'bg-green-100 text-green-700',
  Pending:  'bg-yellow-100 text-yellow-700',
  Rejected: 'bg-red-100 text-red-600',
  Draft:    'bg-gray-100 text-gray-600',
};

const statusBadgeBg = {
  Verified: 'bg-green-500',
  Pending:  'bg-yellow-400',
  Rejected: 'bg-red-500',
  Draft:    'bg-gray-400',
};

export default function LandRecordsPage() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search,  setSearch]  = useState('');
  const [filter,  setFilter]  = useState('All');

  useEffect(() => {
    async function fetchRecords() {
      try {
        const res = await fetch('http://localhost:5000/api/land-records?limit=50');
        if (res.ok) {
          const data = await res.json();
          setRecords(data.records || []);
        }
      } catch (err) {
        console.error('Failed to fetch records:', err);
        toast.error('Could not load land records from server');
      } finally {
        setLoading(false);
      }
    }
    fetchRecords();
  }, []);

  const filtered = records.filter(r => {
    const matchFilter = filter === 'All' || r.status === filter || r.type === filter;
    const matchSearch = !search ||
      r.title?.toLowerCase().includes(search.toLowerCase()) ||
      r.location?.district?.toLowerCase().includes(search.toLowerCase()) ||
      r.recordId?.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-full">
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
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <input type="text" placeholder="Search by name, location, ID..."
            value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand bg-white"/>
        </div>
        <div className="flex gap-2 flex-wrap">
          {['All','Verified','Pending','Rejected','Residential','Agricultural','Commercial'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`text-xs px-3 py-1.5 rounded-full font-medium border transition-colors
                ${filter === f ? 'bg-brand text-white border-brand' : 'bg-white text-gray-600 border-gray-200 hover:border-brand hover:text-brand'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Loading skeletons */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {[...Array(6)].map((_,i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden animate-pulse">
              <div className="h-44 bg-gray-200"/>
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"/>
                <div className="h-3 bg-gray-100 rounded w-1/2"/>
                <div className="h-3 bg-gray-100 rounded w-2/3"/>
                <div className="h-8 bg-gray-100 rounded mt-3"/>
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>
          </div>
          <h3 className="font-semibold text-gray-600 mb-1">No records found</h3>
          <p className="text-sm text-gray-400 mb-4">Try adjusting your search or filters.</p>
          <Link href="/dashboard/land-records/new"
            className="bg-brand text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-brand-dark transition-colors">
            Add Your First Record
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((r, i) => (
            <div key={r._id || i} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">

              {/* ── Land Photo ── */}
              <div className="relative h-44 bg-gray-200 overflow-hidden">
                {r.photoUrl ? (
                  <img
                    src={r.photoUrl}
                    alt={r.title}
                    className="w-full h-full object-cover"
                    onError={e => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                {/* Fallback gradient */}
                <div
                  className="absolute inset-0 items-center justify-center bg-gradient-to-br from-green-700 to-green-400"
                  style={{ display: r.photoUrl ? 'none' : 'flex' }}>
                  <svg className="w-12 h-12 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>
                </div>

                {/* Status badge */}
                <span className={`absolute top-2 left-2 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusBadgeBg[r.status] || 'bg-gray-400'}`}>
                  {r.status === 'Verified' ? '✓ ' : ''}{r.status}
                </span>
                {/* Type badge */}
                <span className="absolute top-2 right-2 bg-black/40 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full backdrop-blur-sm">
                  {r.type}
                </span>
              </div>

              {/* ── Card Body ── */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 text-sm">{r.title}</h3>

                <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  {r.location?.district}{r.location?.division ? `, ${r.location.division}` : ''}
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  <span className="font-medium text-gray-700">{r.size?.value} {r.size?.unit}</span>
                  {r.size?.sqft ? ` (${Number(r.size.sqft).toLocaleString()} sq ft)` : ''}
                </p>

                <p className="text-xs text-gray-400 mt-0.5">
                  ID: <span className="text-brand font-medium">{r.recordId}</span>
                </p>

                <p className="text-xs text-gray-400 mt-0.5">
                  Plot: <span className="font-medium text-gray-600">{r.plotNumber}</span>
                  {r.khatianNumber ? <> · Khatian: <span className="font-medium text-gray-600">{r.khatianNumber}</span></> : null}
                </p>

                <Link href={`/dashboard/land-records/edit?id=${r._id}`}
                  className="mt-3 w-full text-xs text-brand font-medium border border-brand/20 rounded-lg py-2 hover:bg-brand-light transition-colors flex items-center justify-center gap-1">
                  Edit / View Details
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
