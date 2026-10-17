'use client';
import { useState } from 'react';

const documents = [
  { id:'DOC-001', name:'Land Deed – LN-00123',         owner:'Md. Rahim Hossain', type:'Deed',        format:'PDF', size:'2.4 MB', uploaded:'12 Jan 2024', status:'Verified' },
  { id:'DOC-002', name:'Survey Map – LN-00124',         owner:'Fatema Akter',       type:'Survey',      format:'PDF', size:'5.1 MB', uploaded:'06 Mar 2024', status:'Verified' },
  { id:'DOC-003', name:'NID Copy – Abdul Karim',         owner:'Abdul Karim',         type:'Identity',    format:'JPG', size:'0.9 MB', uploaded:'20 Apr 2024', status:'Pending' },
  { id:'DOC-004', name:'Partition Deed – LN-00125',     owner:'Abdul Karim',         type:'Deed',        format:'PDF', size:'3.7 MB', uploaded:'20 Apr 2024', status:'Pending' },
  { id:'DOC-005', name:'Inheritance Certificate',       owner:'Fatema Akter',         type:'Inheritance', format:'PDF', size:'1.2 MB', uploaded:'05 May 2024', status:'Pending' },
  { id:'DOC-006', name:'Tax Receipt 2023 – LN-00127',  owner:'Hasan Mahmud',         type:'Tax',         format:'PDF', size:'0.3 MB', uploaded:'28 Dec 2023', status:'Verified' },
  { id:'DOC-007', name:'Ownership Transfer – LN-00128', owner:'Kabir Uddin',           type:'Deed',       format:'PDF', size:'2.1 MB', uploaded:'29 Aug 2024', status:'Rejected' },
];

const statusStyle = { Verified:'bg-green-100 text-green-700', Pending:'bg-yellow-100 text-yellow-700', Rejected:'bg-red-100 text-red-600' };
const typeColor   = { Deed:'bg-blue-50 text-blue-600', Survey:'bg-purple-50 text-purple-600', Identity:'bg-orange-50 text-orange-500', Tax:'bg-brand-light text-brand', Inheritance:'bg-pink-50 text-pink-600' };

export default function AdminDocumentsPage() {
  const [filter, setFilter] = useState('All');

  const filtered = documents.filter(d => filter==='All' || d.status===filter);

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Document Verification</h1>
          <p className="text-sm text-gray-500 mt-0.5">Review and verify uploaded land documents</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label:'Total',    value: documents.length,                                        color:'text-gray-800', bg:'bg-white' },
          { label:'Verified', value: documents.filter(d=>d.status==='Verified').length,       color:'text-green-600',bg:'bg-green-50' },
          { label:'Pending',  value: documents.filter(d=>d.status==='Pending').length,        color:'text-yellow-600',bg:'bg-yellow-50' },
          { label:'Rejected', value: documents.filter(d=>d.status==='Rejected').length,       color:'text-red-600',  bg:'bg-red-50' },
        ].map((s,i)=>(
          <div key={i} className={`${s.bg} border border-gray-100 rounded-xl p-4`}>
            <p className="text-xs text-gray-500">{s.label}</p>
            <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mb-4">
        {['All','Pending','Verified','Rejected'].map(f=>(
          <button key={f} onClick={()=>setFilter(f)}
            className={`text-xs px-3 py-1.5 rounded-full font-medium border transition-colors ${filter===f?'bg-brand text-white border-brand':'bg-white text-gray-600 border-gray-200 hover:border-brand hover:text-brand'}`}>{f}</button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>{['#','Doc ID','Document Name','Owner','Type','Format','Size','Uploaded','Status','Actions'].map(h=>(
              <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500">{h}</th>
            ))}</tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((d,i)=>(
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-gray-400 text-xs">{i+1}</td>
                <td className="px-4 py-3 text-brand font-semibold text-xs">{d.id}</td>
                <td className="px-4 py-3 font-medium text-gray-800 text-xs">{d.name}</td>
                <td className="px-4 py-3 text-gray-500 text-xs">{d.owner}</td>
                <td className="px-4 py-3"><span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${typeColor[d.type]||'bg-gray-100 text-gray-600'}`}>{d.type}</span></td>
                <td className="px-4 py-3 text-gray-500 text-xs">{d.format}</td>
                <td className="px-4 py-3 text-gray-400 text-xs">{d.size}</td>
                <td className="px-4 py-3 text-gray-400 text-xs">{d.uploaded}</td>
                <td className="px-4 py-3"><span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${statusStyle[d.status]}`}>{d.status}</span></td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <button className="text-xs bg-brand text-white px-2.5 py-1 rounded-lg hover:bg-brand-dark transition-colors">View</button>
                    {d.status==='Pending' && <>
                      <button className="text-xs bg-green-600 text-white px-2.5 py-1 rounded-lg hover:bg-green-700 transition-colors">Verify</button>
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
