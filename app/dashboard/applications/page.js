'use client';
import { useState } from 'react';

const applications = [
  { id: 'APP-2024-001', type: 'Land Mutation', land: 'Residential Land – Savar, Dhaka', submitted: '10 Jan 2024', updated: '12 Jan 2024', status: 'Approved' },
  { id: 'APP-2024-002', type: 'Name Correction', land: 'Agricultural Land – Gazipur', submitted: '01 Mar 2024', updated: '05 Mar 2024', status: 'Pending' },
  { id: 'APP-2024-003', type: 'Land Survey', land: 'Commercial Land – Bashundhara', submitted: '15 Apr 2024', updated: '18 Apr 2024', status: 'In Review' },
  { id: 'APP-2024-004', type: 'Partition Deed', land: 'Agricultural Land – Tangail', submitted: '28 May 2024', updated: '02 Jun 2024', status: 'Rejected' },
  { id: 'APP-2024-005', type: 'Ownership Transfer', land: 'Residential Land – Mirpur', submitted: '10 Jul 2024', updated: '14 Jul 2024', status: 'Approved' },
  { id: 'APP-2024-006', type: 'Land Tax Clearance', land: 'Commercial Land – Motijheel', submitted: '20 Aug 2024', updated: '29 Aug 2024', status: 'Pending' },
];

const statusStyle = {
  Approved: 'bg-green-100 text-green-700',
  Pending: 'bg-yellow-100 text-yellow-700',
  'In Review': 'bg-blue-100 text-blue-700',
  Rejected: 'bg-red-100 text-red-600',
};

const statusIcon = {
  Approved: '✓',
  Pending: '⏳',
  'In Review': '🔍',
  Rejected: '✕',
};

export default function ApplicationsPage() {
  const [filter, setFilter] = useState('All');

  const filtered = applications.filter(a => filter === 'All' || a.status === filter);

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800">My Applications</h1>
          <p className="text-sm text-gray-500 mt-0.5">Track the status of all your submitted applications</p>
        </div>
        <button className="bg-brand hover:bg-brand-dark text-white text-sm font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
          New Application
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total', value: applications.length, color: 'text-gray-800', bg: 'bg-gray-50' },
          { label: 'Approved', value: applications.filter(a=>a.status==='Approved').length, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Pending', value: applications.filter(a=>a.status==='Pending').length, color: 'text-yellow-600', bg: 'bg-yellow-50' },
          { label: 'Rejected', value: applications.filter(a=>a.status==='Rejected').length, color: 'text-red-600', bg: 'bg-red-50' },
        ].map((s, i) => (
          <div key={i} className={`${s.bg} rounded-xl border border-gray-100 p-4`}>
            <p className="text-xs text-gray-500">{s.label}</p>
            <p className={`text-2xl font-bold ${s.color} mt-1`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-4">
        {['All','Approved','Pending','In Review','Rejected'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors border ${filter === f ? 'bg-brand text-white border-brand' : 'bg-white text-gray-600 border-gray-200 hover:border-brand hover:text-brand'}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {['Application ID','Type','Land','Submitted','Last Updated','Status','Action'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((a, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-medium text-brand text-xs">{a.id}</td>
                <td className="px-4 py-3 text-gray-700 text-xs">{a.type}</td>
                <td className="px-4 py-3 text-gray-500 text-xs">{a.land}</td>
                <td className="px-4 py-3 text-gray-500 text-xs">{a.submitted}</td>
                <td className="px-4 py-3 text-gray-500 text-xs">{a.updated}</td>
                <td className="px-4 py-3">
                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${statusStyle[a.status]}`}>
                    {statusIcon[a.status]} {a.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button className="text-xs text-brand font-medium hover:underline">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
