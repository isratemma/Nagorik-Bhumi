'use client';
import { useState } from 'react';

const taxes = [
  { id:'TAX-2024-001', owner:'Md. Rahim Hossain', record:'LN-00123', type:'Residential',  location:'Savar, Dhaka',      size:'5.00 Katha', amount:4500,  due:'31 Dec 2024', paid:'—',           status:'Unpaid' },
  { id:'TAX-2024-002', owner:'Fatema Akter',       record:'LN-00124', type:'Agricultural', location:'Gazipur',            size:'12.00 Katha',amount:3600,  due:'31 Dec 2024', paid:'—',           status:'Unpaid' },
  { id:'TAX-2024-003', owner:'Abdul Karim',         record:'LN-00125', type:'Commercial',   location:'Bashundhara, Dhaka', size:'8.00 Katha', amount:4400,  due:'31 Dec 2024', paid:'—',           status:'Unpaid' },
  { id:'TAX-2023-004', owner:'Sadia Islam',         record:'LN-00126', type:'Residential',  location:'Mirpur, Dhaka',      size:'3.50 Katha', amount:3800,  due:'31 Dec 2023', paid:'28 Nov 2023', status:'Paid' },
  { id:'TAX-2023-005', owner:'Hasan Mahmud',        record:'LN-00127', type:'Agricultural', location:'Tangail',            size:'10.00 Katha',amount:3000,  due:'31 Dec 2023', paid:'—',           status:'Overdue' },
  { id:'TAX-2023-006', owner:'Kabir Uddin',         record:'LN-00128', type:'Commercial',   location:'Motijheel, Dhaka',   size:'6.00 Katha', amount:4200,  due:'31 Dec 2023', paid:'30 Dec 2023', status:'Paid' },
];

const statusStyle = { Unpaid:'bg-yellow-100 text-yellow-700', Paid:'bg-green-100 text-green-700', Overdue:'bg-red-100 text-red-600' };

export default function AdminLandTaxPage() {
  const [filter, setFilter] = useState('All');

  const filtered = taxes.filter(t => filter==='All' || t.status===filter);
  const totalCollected = taxes.filter(t=>t.status==='Paid').reduce((s,t)=>s+t.amount,0);
  const totalPending   = taxes.filter(t=>t.status!=='Paid').reduce((s,t)=>s+t.amount,0);

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Land Tax Management</h1>
          <p className="text-sm text-gray-500 mt-0.5">Monitor and manage land tax records across all properties</p>
        </div>
        <button className="border border-brand text-brand text-sm font-semibold px-4 py-2 rounded-lg hover:bg-brand-light transition-colors">Export Report</button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label:'Total Records',     value: taxes.length,                                        color:'text-gray-800', bg:'bg-white' },
          { label:'Total Collected',   value:`৳ ${totalCollected.toLocaleString()}`,               color:'text-green-600',bg:'bg-green-50' },
          { label:'Pending Amount',    value:`৳ ${totalPending.toLocaleString()}`,                 color:'text-red-600',  bg:'bg-red-50' },
          { label:'Overdue',           value: taxes.filter(t=>t.status==='Overdue').length,        color:'text-orange-600',bg:'bg-orange-50' },
        ].map((s,i)=>(
          <div key={i} className={`${s.bg} border border-gray-100 rounded-xl p-4`}>
            <p className="text-xs text-gray-500">{s.label}</p>
            <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mb-4">
        {['All','Unpaid','Paid','Overdue'].map(f=>(
          <button key={f} onClick={()=>setFilter(f)}
            className={`text-xs px-3 py-1.5 rounded-full font-medium border transition-colors ${filter===f?'bg-brand text-white border-brand':'bg-white text-gray-600 border-gray-200 hover:border-brand hover:text-brand'}`}>{f}</button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>{['#','Tax ID','Owner','Record ID','Type','Location','Size','Amount','Due Date','Paid On','Status','Action'].map(h=>(
              <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500">{h}</th>
            ))}</tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((t,i)=>(
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-gray-400 text-xs">{i+1}</td>
                <td className="px-4 py-3 text-brand font-semibold text-xs">{t.id}</td>
                <td className="px-4 py-3 font-medium text-gray-800 text-xs">{t.owner}</td>
                <td className="px-4 py-3 text-gray-500 text-xs">{t.record}</td>
                <td className="px-4 py-3 text-gray-500 text-xs">{t.type}</td>
                <td className="px-4 py-3 text-gray-500 text-xs">{t.location}</td>
                <td className="px-4 py-3 text-gray-500 text-xs">{t.size}</td>
                <td className="px-4 py-3 font-semibold text-gray-800 text-xs">৳ {t.amount.toLocaleString()}</td>
                <td className="px-4 py-3 text-gray-400 text-xs">{t.due}</td>
                <td className="px-4 py-3 text-gray-400 text-xs">{t.paid}</td>
                <td className="px-4 py-3"><span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${statusStyle[t.status]}`}>{t.status}</span></td>
                <td className="px-4 py-3">
                  {t.status==='Paid'
                    ? <button className="text-xs text-brand font-medium hover:underline">Receipt</button>
                    : <button className="text-xs bg-brand text-white px-2.5 py-1 rounded-lg hover:bg-brand-dark transition-colors">Send Reminder</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
