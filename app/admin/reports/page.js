'use client';

const monthlyData = [
  { month:'Jan', records:800,  applications:120, tax:180000 },
  { month:'Feb', records:950,  applications:145, tax:210000 },
  { month:'Mar', records:1050, applications:160, tax:240000 },
  { month:'Apr', records:1100, applications:175, tax:260000 },
  { month:'May', records:1200, applications:190, tax:290000 },
  { month:'Jun', records:1350, applications:210, tax:320000 },
  { month:'Jul', records:1250, applications:195, tax:305000 },
  { month:'Aug', records:1400, applications:225, tax:345000 },
  { month:'Sep', records:1480, applications:240, tax:370000 },
  { month:'Oct', records:1550, applications:255, tax:390000 },
  { month:'Nov', records:1620, applications:270, tax:410000 },
  { month:'Dec', records:1700, applications:290, tax:435000 },
];

const maxRecords = Math.max(...monthlyData.map(d=>d.records));

export default function AdminReportsPage() {
  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Reports & Analytics</h1>
          <p className="text-sm text-gray-500 mt-0.5">System-wide statistics and performance overview</p>
        </div>
        <div className="flex gap-2">
          <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-brand/20">
            <option>2024</option><option>2023</option><option>2022</option>
          </select>
          <button className="bg-brand hover:bg-brand-dark text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">Export PDF</button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label:'Total Revenue (Tax)',    value:'৳ 35,55,000', change:'+18.2%', up:true,  color:'text-brand',       bg:'bg-brand-light' },
          { label:'Records This Year',      value:'12,458',       change:'+5.2%',  up:true,  color:'text-blue-600',    bg:'bg-blue-50' },
          { label:'Applications Processed', value:'2,430',        change:'+12.8%', up:true,  color:'text-purple-600',  bg:'bg-purple-50' },
          { label:'Avg. Processing Time',   value:'4.2 days',     change:'-8.5%',  up:true,  color:'text-orange-500',  bg:'bg-orange-50' },
        ].map((s,i)=>(
          <div key={i} className={`${s.bg} border border-gray-100 rounded-xl p-4`}>
            <p className="text-xs text-gray-500 mb-2">{s.label}</p>
            <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
            <p className={`text-xs mt-1 font-medium ${s.up?'text-green-500':'text-red-500'}`}>{s.change} vs last year</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-5 mb-5">
        {/* Monthly Bar Chart */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h2 className="font-semibold text-gray-800 text-sm mb-4">Monthly Land Records (2024)</h2>
          <div className="flex items-end gap-2 h-36">
            {monthlyData.map((d,i)=>(
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full bg-brand rounded-t-sm transition-all hover:bg-brand-dark"
                  style={{ height:`${(d.records/maxRecords)*100}%`, minHeight:'4px' }}
                  title={`${d.month}: ${d.records}`}/>
                <span className="text-[9px] text-gray-400">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Applications Bar Chart */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h2 className="font-semibold text-gray-800 text-sm mb-4">Monthly Applications (2024)</h2>
          <div className="flex items-end gap-2 h-36">
            {monthlyData.map((d,i)=>(
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full bg-blue-400 rounded-t-sm hover:bg-blue-500 transition-all"
                  style={{ height:`${(d.applications/Math.max(...monthlyData.map(x=>x.applications)))*100}%`, minHeight:'4px' }}
                  title={`${d.month}: ${d.applications}`}/>
                <span className="text-[9px] text-gray-400">{d.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Summary Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800 text-sm">Monthly Summary</h2>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>{['Month','Land Records','Applications','Tax Collected','Growth'].map(h=>(
              <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500">{h}</th>
            ))}</tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {monthlyData.map((d,i)=>{
              const prev = monthlyData[i-1];
              const growth = prev ? (((d.records-prev.records)/prev.records)*100).toFixed(1) : null;
              return (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3 font-medium text-gray-700">{d.month} 2024</td>
                  <td className="px-5 py-3 text-gray-600">{d.records.toLocaleString()}</td>
                  <td className="px-5 py-3 text-gray-600">{d.applications}</td>
                  <td className="px-5 py-3 text-gray-600">৳ {d.tax.toLocaleString()}</td>
                  <td className="px-5 py-3">
                    {growth !== null
                      ? <span className={`text-xs font-semibold ${parseFloat(growth)>=0?'text-green-600':'text-red-500'}`}>{parseFloat(growth)>=0?'+':''}{growth}%</span>
                      : <span className="text-gray-300 text-xs">—</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
