'use client';
import { useState } from 'react';

const taxes = [
  { land: 'Residential Land', location: 'Savar, Dhaka', id: 'LN-00123', size: '5.00 Katha', amount: 4500, due: '31 Dec 2024', status: 'Unpaid', year: '2024' },
  { land: 'Agricultural Land', location: 'Gazipur', id: 'LN-00124', size: '12.00 Katha', amount: 3600, due: '31 Dec 2024', status: 'Unpaid', year: '2024' },
  { land: 'Commercial Land', location: 'Bashundhara, Dhaka', id: 'LN-00125', size: '8.00 Katha', amount: 4400, due: '31 Dec 2024', status: 'Unpaid', year: '2024' },
  { land: 'Agricultural Land', location: 'Tangail', id: 'LN-00126', size: '10.00 Katha', amount: 3000, due: '31 Dec 2023', status: 'Paid', year: '2023' },
  { land: 'Residential Land', location: 'Savar, Dhaka', id: 'LN-00123', size: '5.00 Katha', amount: 4200, due: '31 Dec 2023', status: 'Paid', year: '2023' },
];

const statusStyle = { Unpaid: 'bg-red-100 text-red-600', Paid: 'bg-green-100 text-green-700' };

export default function LandTaxPage() {
  const [selected, setSelected] = useState([]);

  const totalDue = taxes.filter(t => t.status === 'Unpaid').reduce((s, t) => s + t.amount, 0);
  const toggle = (i) => setSelected(s => s.includes(i) ? s.filter(x => x !== i) : [...s, i]);

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
          <p className="text-xs text-gray-400 mt-1">{taxes.filter(t=>t.status==='Unpaid').length} properties unpaid</p>
        </div>
        <div className="bg-green-50 border border-green-100 rounded-xl p-4">
          <p className="text-xs text-gray-500">Total Paid (2023)</p>
          <p className="text-2xl font-bold text-green-600 mt-1">৳ {taxes.filter(t=>t.status==='Paid').reduce((s,t)=>s+t.amount,0).toLocaleString()}</p>
          <p className="text-xs text-gray-400 mt-1">{taxes.filter(t=>t.status==='Paid').length} properties cleared</p>
        </div>
        <div className="bg-brand-light border border-brand/10 rounded-xl p-4">
          <p className="text-xs text-gray-500">Next Due Date</p>
          <p className="text-2xl font-bold text-brand mt-1">31 Dec 2024</p>
          <p className="text-xs text-gray-400 mt-1">Annual land tax deadline</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800 text-sm">Tax Records</h2>
          {selected.length > 0 && (
            <button className="bg-brand hover:bg-brand-dark text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors">
              Pay Selected (৳ {selected.reduce((s, i) => s + taxes[i].amount, 0).toLocaleString()})
            </button>
          )}
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-4 py-3 w-10"></th>
              {['Land','Location','ID','Size','Amount','Due Date','Year','Status','Action'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {taxes.map((t, i) => (
              <tr key={i} className={`hover:bg-gray-50 transition-colors ${selected.includes(i) ? 'bg-brand-light/30' : ''}`}>
                <td className="px-4 py-3">
                  {t.status === 'Unpaid' && (
                    <input type="checkbox" checked={selected.includes(i)} onChange={() => toggle(i)}
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
                  {t.status === 'Unpaid'
                    ? <button className="text-xs bg-brand text-white px-3 py-1 rounded-lg hover:bg-brand-dark transition-colors">Pay Now</button>
                    : <button className="text-xs text-brand font-medium hover:underline">Receipt</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
