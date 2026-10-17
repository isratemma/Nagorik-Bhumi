'use client';
import { useState } from 'react';
import { toast } from 'sonner';

const taxes = [
  { land:'Residential Land', location:'Savar, Dhaka',       id:'LN-00123', size:'5.00 Katha',  amount:4500, due:'31 Dec 2024', status:'Unpaid', year:'2024' },
  { land:'Agricultural Land', location:'Gazipur',            id:'LN-00124', size:'12.00 Katha', amount:3600, due:'31 Dec 2024', status:'Unpaid', year:'2024' },
  { land:'Commercial Land',  location:'Bashundhara, Dhaka', id:'LN-00125', size:'8.00 Katha',  amount:4400, due:'31 Dec 2024', status:'Unpaid', year:'2024' },
  { land:'Agricultural Land', location:'Tangail',            id:'LN-00126', size:'10.00 Katha', amount:3000, due:'31 Dec 2023', status:'Paid',   year:'2023' },
  { land:'Residential Land', location:'Savar, Dhaka',       id:'LN-00123', size:'5.00 Katha',  amount:4200, due:'31 Dec 2023', status:'Paid',   year:'2023' },
];

const statusStyle = { Unpaid:'bg-red-100 text-red-600', Paid:'bg-green-100 text-green-700', Overdue:'bg-orange-100 text-orange-600' };

export default function LandTaxPage() {
  const [selected, setSelected]   = useState([]);
  const [paying, setPaying]       = useState(null); // index being paid
  const [localTaxes, setLocalTaxes] = useState(taxes);

  const totalDue = localTaxes.filter(t=>t.status==='Unpaid').reduce((s,t)=>s+t.amount,0);
  const toggle   = i => setSelected(s => s.includes(i) ? s.filter(x=>x!==i) : [...s, i]);

  const payTax = async (indices) => {
    const idx = Array.isArray(indices) ? indices : [indices];
    setPaying(idx[0]);
    await new Promise(r => setTimeout(r, 1200));
    setLocalTaxes(prev => prev.map((t,i) =>
      idx.includes(i) && t.status === 'Unpaid'
        ? { ...t, status:'Paid', paidAt: new Date().toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}) }
        : t
    ));
    setSelected([]);
    setPaying(null);
    toast.success(`Payment successful! ৳ ${idx.reduce((s,i)=>s+taxes[i].amount,0).toLocaleString()} paid.`);
  };

  const downloadReceipt = (t) => {
    toast.success(`Receipt for ${t.id} downloaded.`);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Land Tax</h1>
          <p className="text-sm text-gray-500 mt-0.5">View and pay your land tax dues</p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-red-50 border border-red-100 rounded-xl p-4">
          <p className="text-xs text-gray-500">Total Due</p>
          <p className="text-2xl font-bold text-red-600 mt-1">৳ {totalDue.toLocaleString()}</p>
          <p className="text-xs text-gray-400 mt-1">{localTaxes.filter(t=>t.status==='Unpaid').length} properties unpaid</p>
        </div>
        <div className="bg-green-50 border border-green-100 rounded-xl p-4">
          <p className="text-xs text-gray-500">Total Paid</p>
          <p className="text-2xl font-bold text-green-600 mt-1">৳ {localTaxes.filter(t=>t.status==='Paid').reduce((s,t)=>s+t.amount,0).toLocaleString()}</p>
          <p className="text-xs text-gray-400 mt-1">{localTaxes.filter(t=>t.status==='Paid').length} properties cleared</p>
        </div>
        <div className="bg-brand-light border border-brand/10 rounded-xl p-4">
          <p className="text-xs text-gray-500">Next Due Date</p>
          <p className="text-2xl font-bold text-brand mt-1">31 Dec 2024</p>
          <p className="text-xs text-gray-400 mt-1">Annual land tax deadline</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800 text-sm">Tax Records</h2>
          {selected.length > 0 && (
            <button
              onClick={() => payTax(selected)}
              disabled={paying !== null}
              className="bg-brand hover:bg-brand-dark text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors disabled:opacity-60 flex items-center gap-2">
              {paying !== null
                ? <><svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>Processing…</>
                : `Pay Selected (৳ ${selected.reduce((s,i)=>s+localTaxes[i].amount,0).toLocaleString()})`}
            </button>
          )}
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-4 py-3 w-10"/>
              {['Land','Location','ID','Size','Amount','Due Date','Year','Status','Action'].map(h=>(
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {localTaxes.map((t,i)=>(
              <tr key={i} className={`hover:bg-gray-50 transition-colors ${selected.includes(i)?'bg-brand-light/30':''}`}>
                <td className="px-4 py-3">
                  {t.status==='Unpaid' && (
                    <input type="checkbox" checked={selected.includes(i)} onChange={()=>toggle(i)}
                      className="w-4 h-4 accent-brand cursor-pointer"/>
                  )}
                </td>
                <td className="px-4 py-3 font-medium text-gray-700 text-xs">{t.land}</td>
                <td className="px-4 py-3 text-gray-500 text-xs">{t.location}</td>
                <td className="px-4 py-3 text-brand font-medium text-xs">{t.id}</td>
                <td className="px-4 py-3 text-gray-500 text-xs">{t.size}</td>
                <td className="px-4 py-3 font-semibold text-gray-800 text-xs">৳ {t.amount.toLocaleString()}</td>
                <td className="px-4 py-3 text-gray-500 text-xs">{t.due}</td>
                <td className="px-4 py-3 text-gray-500 text-xs">{t.year}</td>
                <td className="px-4 py-3">
                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${statusStyle[t.status]}`}>{t.status}</span>
                </td>
                <td className="px-4 py-3">
                  {t.status==='Unpaid'
                    ? <button
                        onClick={() => payTax(i)}
                        disabled={paying !== null}
                        className="text-xs bg-brand text-white px-3 py-1 rounded-lg hover:bg-brand-dark transition-colors disabled:opacity-60 flex items-center gap-1">
                        {paying===i
                          ? <><svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>Paying…</>
                          : 'Pay Now'}
                      </button>
                    : <button onClick={() => downloadReceipt(t)}
                        className="text-xs text-brand font-medium hover:underline flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                        Receipt
                      </button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
