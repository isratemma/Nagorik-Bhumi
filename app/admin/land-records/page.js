'use client';
import { useState } from 'react';

const records = [
  { id:'LN-00123', owner:'Md. Rahim Hossain', nid:'1987654321098', type:'Residential',  location:'Savar, Dhaka',      size:'5.00 Katha',  area:'3,600 sq ft', submitted:'12 Jan 2024', status:'Approved' },
  { id:'LN-00124', owner:'Fatema Akter',       nid:'1998765432109', type:'Agricultural', location:'Gazipur',            size:'12.00 Katha', area:'8,640 sq ft', submitted:'06 Mar 2024', status:'Approved' },
  { id:'LN-00125', owner:'Abdul Karim',         nid:'1976543210987', type:'Commercial',   location:'Bashundhara, Dhaka', size:'8.00 Katha',  area:'5,760 sq ft', submitted:'20 Apr 2024', status:'Pending' },
  { id:'LN-00126', owner:'Sadia Islam',         nid:'2001234567891', type:'Residential',  location:'Mirpur, Dhaka',      size:'3.50 Katha',  area:'2,520 sq ft', submitted:'14 Jul 2024', status:'Approved' },
  { id:'LN-00127', owner:'Hasan Mahmud',        nid:'1965432109876', type:'Agricultural', location:'Tangail',            size:'10.00 Katha', area:'7,200 sq ft', submitted:'02 Jun 2024', status:'Rejected' },
  { id:'LN-00128', owner:'Kabir Uddin',         nid:'1983210987654', type:'Commercial',   location:'Motijheel, Dhaka',   size:'6.00 Katha',  area:'4,320 sq ft', submitted:'29 Aug 2024', status:'Pending' },
];

const statusStyle = { Approved:'bg-green-100 text-green-700', Pending:'bg-yellow-100 text-yellow-700', Rejected:'bg-red-100 text-red-600' };
const typeColor   = { Residential:'bg-blue-50 text-blue-600', Agricultural:'bg-green-50 text-green-600', Commercial:'bg-orange-50 text-orange-500', Industrial:'bg-purple-50 text-purple-600' };

export default function AdminLandRecordsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  const filtered = records.filter(r =>
    (statusFilter==='All' || r.status===statusFilter) &&
    (typeFilter==='All'   || r.type===typeFilter) &&
    (r.owner.toLowerCase().includes(search.toLowerCase()) || r.id.toLowerCase().includes(search.toLowerCase()) || r.location.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800">All Land Records</h1>
          <p className="text-sm text-gray-500 mt-0.5">View, verify and manage all registered land records</p>
        </div>
        <button className="bg-brand hover:bg-brand-dark text-white text-sm font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
          Add Record
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label:'Total Records',  value: records.length,                                        color:'text-gray-800', bg:'bg-white' },
          { label:'Approved',       value: records.filter(r=>r.status==='Approved').length,       color:'text-green-600',bg:'bg-green-50' },
          { label:'Pending',        value: records.filter(r=>r.status==='Pending').length,        color:'text-yellow-600',bg:'bg-yellow-50' },
          { label:'Rejected',       value: records.filter(r=>r.status==='Rejected').length,       color:'text-red-600',  bg:'bg-red-50' },
        ].map((s,i)=>(
          <div key={i} className={`${s.bg} border border-gray-100 rounded-xl p-4`}>
            <p className="text-xs text-gray-500">{s.label}</p>
            <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <input type="text" placeholder="Search by owner, record ID, location…" value={search} onChange={e=>setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand bg-white"/>
        </div>
        {['All','Approved','Pending','Rejected'].map(f=>(
          <button key={f} onClick={()=>setStatusFilter(f)}
            className={`text-xs px-3 py-1.5 rounded-full font-medium border transition-colors ${statusFilter===f?'bg-brand text-white border-brand':'bg-white text-gray-600 border-gray-200 hover:border-brand hover:text-brand'}`}>{f}</button>
        ))}
        {['All','Residential','Agricultural','Commercial'].map(f=>(
          <button key={f} onClick={()=>setTypeFilter(f)}
            className={`text-xs px-3 py-1.5 rounded-full font-medium border transition-colors ${typeFilter===f?'bg-brand text-white border-brand':'bg-white text-gray-600 border-gray-200 hover:border-brand hover:text-brand'}`}>{f}</button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>{['#','Record ID','Owner','NID','Type','Location','Size','Submitted','Status','Actions'].map(h=>(
              <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500">{h}</th>
            ))}</tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((r,i)=>(
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-gray-400 text-xs">{i+1}</td>
                <td className="px-4 py-3 text-brand font-semibold text-xs">{r.id}</td>
                <td className="px-4 py-3 font-medium text-gray-800 text-xs">{r.owner}</td>
                <td className="px-4 py-3 text-gray-400 text-xs font-mono">{r.nid}</td>
                <td className="px-4 py-3"><span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${typeColor[r.type]||'bg-gray-100 text-gray-600'}`}>{r.type}</span></td>
                <td className="px-4 py-3 text-gray-500 text-xs">{r.location}</td>
                <td className="px-4 py-3 text-gray-600 text-xs font-medium">{r.size}</td>
                <td className="px-4 py-3 text-gray-400 text-xs">{r.submitted}</td>
                <td className="px-4 py-3"><span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${statusStyle[r.status]}`}>{r.status}</span></td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <button className="text-xs bg-brand text-white px-2.5 py-1 rounded-lg hover:bg-brand-dark transition-colors">View</button>
                    {r.status==='Pending' && <button className="text-xs bg-green-600 text-white px-2.5 py-1 rounded-lg hover:bg-green-700 transition-colors">Approve</button>}
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
