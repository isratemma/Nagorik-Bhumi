'use client';
import { useState } from 'react';

const cases = [
  { id: 'INH-2024-001', property: 'Residential Land – Savar, Dhaka', deceased: 'Mr. Rahim Uddin', relation: 'Father', share: '25%', status: 'In Progress', filed: '15 Jan 2024' },
  { id: 'INH-2024-002', property: 'Agricultural Land – Gazipur', deceased: 'Mrs. Rahela Begum', relation: 'Mother', share: '33%', status: 'Completed', filed: '03 Apr 2024' },
  { id: 'INH-2023-003', property: 'Agricultural Land – Tangail', deceased: 'Mr. Karim Mia', relation: 'Uncle', share: '12%', status: 'Pending Documents', filed: '20 Nov 2023' },
];

const statusStyle = {
  'In Progress': 'bg-blue-100 text-blue-700',
  'Completed': 'bg-green-100 text-green-700',
  'Pending Documents': 'bg-yellow-100 text-yellow-700',
};

export default function InheritancePage() {
  return (
    <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Inheritance</h1>
          <p className="text-sm text-gray-500 mt-0.5">Handle inheritance and succession matters</p>
        </div>
        <button className="bg-brand hover:bg-brand-dark text-white text-sm font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
          File New Case
        </button>
      </div>

      {/* Info banner */}
      <div className="bg-brand-light border border-brand/10 rounded-xl p-4 mb-6 flex items-start gap-3">
        <svg className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        <div>
          <p className="text-sm font-semibold text-gray-800">About Inheritance Cases</p>
          <p className="text-xs text-gray-600 mt-0.5">Land inheritance cases are processed by the Sub-Registrar office. You can track your cases here and upload required documents online.</p>
        </div>
      </div>

      {/* Cases */}
      <div className="space-y-4">
        {cases.map((c, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-brand">{c.id}</span>
                  <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${statusStyle[c.status]}`}>{c.status}</span>
                </div>
                <h3 className="font-semibold text-gray-800">{c.property}</h3>
              </div>
              <button className="text-xs text-brand font-medium border border-brand/20 px-3 py-1.5 rounded-lg hover:bg-brand-light transition-colors">View Case</button>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-50">
              <div><p className="text-xs text-gray-400">Deceased</p><p className="text-sm font-medium text-gray-700 mt-0.5">{c.deceased}</p></div>
              <div><p className="text-xs text-gray-400">Relation</p><p className="text-sm font-medium text-gray-700 mt-0.5">{c.relation}</p></div>
              <div><p className="text-xs text-gray-400">Inheritance Share</p><p className="text-sm font-medium text-gray-700 mt-0.5">{c.share}</p></div>
              <div><p className="text-xs text-gray-400">Filed On</p><p className="text-sm font-medium text-gray-700 mt-0.5">{c.filed}</p></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
