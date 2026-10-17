'use client';
import { useState } from 'react';

const applications = [
  { id:'APP-2025-001', applicant:'Md. Rahim Hossain', nid:'1987654321098', type:'Land Mutation',      plot:'1234', submitted:'Apr 26, 2025', status:'Pending',   priority:'High' },
  { id:'APP-2025-002', applicant:'Fatema Akter',       nid:'1998765432109', type:'Name Correction',    plot:'5678', submitted:'Apr 22, 2025', status:'Pending',   priority:'Normal' },
  { id:'APP-2025-003', applicant:'Abdul Karim',         nid:'1976543210987', type:'Land Survey',        plot:'9012', submitted:'Apr 20, 2025', status:'In Review', priority:'High' },
  { id:'APP-2025-004', applicant:'Sadia Islam',         nid:'2001234567891', type:'Partition Deed',     plot:'3456', submitted:'Apr 18, 2025', status:'Pending',   priority:'Normal' },
  { id:'APP-2025-005', applicant:'Hasan Mahmud',        nid:'1965432109876', type:'Ownership Transfer', plot:'7890', submitted:'Apr 17, 2025', status:'Approved',  priority:'Normal' },
  { id:'APP-2025-006', applicant:'Kabir Uddin',         nid:'1983210987654', type:'Land Tax Clearance', plot:'4321', submitted:'Apr 15, 2025', status:'Rejected',  priority:'Low' },
  { id:'APP-2025-007', applicant:'Nusrat Jahan',        nid:'1994321098765', type:'Land Mutation',      plot:'8765', submitted:'Apr 10, 2025', status:'Approved',  priority:'Normal' },
];

const statusStyle   = { Pending:'bg-yellow-100 text-yellow-700', 'In Review':'bg-blue-100 text-blue-700', Approved:'bg-green-100 text-green-700', Rejected:'bg-red-100 text-red-600' };
const priorityStyle = { High:'bg-red-50 text-red-500', Normal:'bg-gray-100 text-gray-600', Low:'bg-green-50 text-green-600' };

export default function AdminApplicationsPage() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = applications.filter(a =>
    (filter==='All' || a.status===filter) &&
    (a.applicant.toLowerCase().includes(search.toLowerCase()) || a.id.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Pending Approvals</h1>
          <p className="text-sm text-gray-500 mt-0.5">Review and process all land service applications</p>
        </div>
        <div className="flex gap-2">
          <button className="border border-brand text-brand text-sm font-semibold px-4 py-2 rounded-lg hover:bg-brand-light transition-colors">Export</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label:'Total',     value: applications.length,                                              color:'text-gray-800', bg:'bg-white' },
          { label:'Pending',   value: applications.filter(a=>a.status==='Pending').length,              color:'text-yellow-600',bg:'bg-yellow-50' },
          { label:'In Review', value: applications.filter(a=>a.status==='In Review').length,            color:'text-blue-600',  bg:'bg-blue-50' },
          { label:'Approved',  value: applications.filter(a=>a.status==='Approved').length,             color:'text-green-600', bg:'bg-green-50' },
        ].map((s,i)=>(
          <div key={i} className={`${s.bg} border border-gray-100 rounded-xl p-4`}>
            <p className="text-xs text-gray-500">{s.label}</p>
            <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-sm">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <input type="text" placeholder="Search applicant or ID…" value={search} onChange={e=>setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand bg-white"/>
        </div>
        {['All','Pending','In Review','Approved','Rejected'].map(f=>(
          <button key={f} onClick={()=>setFilter(f)}
            className={`text-xs px-3 py-1.5 rounded-full font-medium border transition-colors ${filter===f?'bg-brand text-white border-brand':'bg-white text-gray-600 border-gray-200 hover:border-brand hover:text-brand'}`}>{f}</button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>{['#','App ID','Applicant','NID','Type','Plot No.','Submitted','Priority','Status','Actions'].map(h=>(
              <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500">{h}</th>
            ))}</tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((a,i)=>(
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-gray-400 text-xs">{i+1}</td>
                <td className="px-4 py-3 text-brand font-semibold text-xs">{a.id}</td>
                <td className="px-4 py-3 font-medium text-gray-800 text-xs">{a.applicant}</td>
                <td className="px-4 py-3 text-gray-400 text-xs font-mono">{a.nid}</td>
                <td className="px-4 py-3 text-gray-600 text-xs">{a.type}</td>
                <td className="px-4 py-3 text-gray-500 text-xs font-medium">{a.plot}</td>
                <td className="px-4 py-3 text-gray-400 text-xs">{a.submitted}</td>
                <td className="px-4 py-3"><span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${priorityStyle[a.priority]}`}>{a.priority}</span></td>
                <td className="px-4 py-3"><span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${statusStyle[a.status]}`}>{a.status}</span></td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <button className="text-xs bg-brand text-white px-2.5 py-1 rounded-lg hover:bg-brand-dark transition-colors">Review</button>
                    {(a.status==='Pending'||a.status==='In Review') && <>
                      <button className="text-xs bg-green-600 text-white px-2.5 py-1 rounded-lg hover:bg-green-700 transition-colors">Approve</button>
                      <button className="text-xs bg-red-500 text-white px-2.5 py-1 rounded-lg hover:bg-red-600 transition-colors">Reject</button>
                    </>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
