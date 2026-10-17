import Link from 'next/link';

const stats = [
  { label: 'Total Land Records', value: '12,458', change: '+5.2%', up: true, color: 'text-brand', bg: 'bg-brand-light',
    icon: <svg className="w-7 h-7 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg> },
  { label: 'Total Applications', value: '3,247', change: '+12.8%', up: true, color: 'text-blue-600', bg: 'bg-blue-50',
    icon: <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg> },
  { label: 'Registered Users', value: '18,763', change: '+8.4%', up: true, color: 'text-orange-500', bg: 'bg-orange-50',
    icon: <svg className="w-7 h-7 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg> },
  { label: 'Approved Records', value: '2,891', change: '+14.6%', up: true, color: 'text-purple-600', bg: 'bg-purple-50',
    icon: <svg className="w-7 h-7 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> },
  { label: 'Pending Approvals', value: '12', change: '-25.0%', up: false, color: 'text-red-500', bg: 'bg-red-50',
    icon: <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> },
];

const pendingApprovals = [
  { name: 'Md. Rahim Hossain', type: 'Residential', plot: '1234', date: 'Apr 26, 2025' },
  { name: 'Fatema Akter',       type: 'Agricultural', plot: '5678', date: 'Apr 22, 2025' },
  { name: 'Abdul Karim',        type: 'Commercial',   plot: '9012', date: 'Apr 20, 2025' },
  { name: 'Sadia Islam',        type: 'Residential',  plot: '3456', date: 'Apr 18, 2025' },
  { name: 'Hasan Mahmud',       type: 'Agricultural', plot: '7890', date: 'Apr 17, 2025' },
];

const recentRecords = [
  { plot: '1234', type: 'Residential',  owner: 'Md. Rahim Hossain', status: 'Approved' },
  { plot: '5678', type: 'Agricultural', owner: 'Fatema Akter',       status: 'Approved' },
  { plot: '9012', type: 'Commercial',   owner: 'Abdul Karim',        status: 'Pending'  },
  { plot: '3456', type: 'Residential',  owner: 'Sadia Islam',        status: 'Approved' },
  { plot: '7890', type: 'Agricultural', owner: 'Hasan Mahmud',       status: 'Rejected' },
];

const recentUsers = [
  { name: 'Md. Rahim',    nid: '19876543210',  role: 'Citizen', status: 'Active' },
  { name: 'Fatema Akter', nid: '19987654321',  role: 'Citizen', status: 'Active' },
  { name: 'Abdul Karim',  nid: '19765432109',  role: 'Citizen', status: 'Active' },
  { name: 'Sadia Islam',  nid: '20012345678',  role: 'Citizen', status: 'Active' },
  { name: 'Hasan Mahmud', nid: '19654321098',  role: 'Citizen', status: 'Active' },
];

const quickActions = [
  { label: 'Add New Land Record',  icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>, href: '/admin/land-records' },
  { label: 'Review Applications',  icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2"/></svg>, href: '/admin/applications' },
  { label: 'Check Land Status',    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>, href: '/admin/land-records' },
  { label: 'Generate Reports',     icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>, href: '/admin/reports' },
  { label: 'Manage Users',         icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>, href: '/admin/users' },
  { label: 'Verify Documents',     icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>, href: '/admin/documents' },
];

const typeColor = { Residential: 'text-blue-600 bg-blue-50', Agricultural: 'text-green-600 bg-green-50', Commercial: 'text-orange-500 bg-orange-50', Industrial: 'text-purple-600 bg-purple-50' };
const statusColor = { Approved: 'bg-green-100 text-green-700', Pending: 'bg-yellow-100 text-yellow-700', Rejected: 'bg-red-100 text-red-600' };

// Chart months
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const totalData =    [800,  950,  1050, 1100, 1200, 1350, 1250, 1400, 1480, 1550, 1620, 1700];
const approvedData = [600,  700,  800,  850,  900,  1000, 950,  1050, 1100, 1180, 1250, 1320];
const pendingData =  [200,  250,  250,  250,  300,  350,  300,  350,  380,  370,  370,  380];

const maxVal = 2000;
const chartH = 140;
const chartW = 540;
const padL = 40; const padB = 24; const padT = 10; const padR = 10;
const w = chartW - padL - padR;
const h = chartH - padT - padB;

function toX(i) { return padL + (i / (months.length - 1)) * w; }
function toY(v) { return padT + h - (v / maxVal) * h; }
function polyline(data) { return data.map((v,i) => `${toX(i)},${toY(v)}`).join(' '); }
function area(data) {
  const pts = data.map((v,i) => `${toX(i)},${toY(v)}`).join(' ');
  return `${padL},${padT+h} ${pts} ${toX(months.length-1)},${padT+h}`;
}

// Donut
const donutData = [
  { label: 'Residential', value: 5320, pct: 42.7, color: '#1a6b3c' },
  { label: 'Agricultural', value: 4176, pct: 33.5, color: '#3a9a5c' },
  { label: 'Commercial',   value: 1248, pct: 10.0, color: '#6ec28a' },
  { label: 'Industrial',   value: 748,  pct: 6.0,  color: '#9dd4b0' },
  { label: 'Others',       value: 966,  pct: 7.8,  color: '#c6e8d4' },
];
const cx = 80, cy = 80, r = 60, ir = 40;
let cumAngle = -Math.PI / 2;
function arc(pct) {
  const angle = (pct / 100) * 2 * Math.PI;
  const x1 = cx + r * Math.cos(cumAngle);
  const y1 = cy + r * Math.sin(cumAngle);
  cumAngle += angle;
  const x2 = cx + r * Math.cos(cumAngle);
  const y2 = cy + r * Math.sin(cumAngle);
  const ix1 = cx + ir * Math.cos(cumAngle);
  const iy1 = cy + ir * Math.sin(cumAngle);
  const ix2 = cx + ir * Math.cos(cumAngle - angle);
  const iy2 = cy + ir * Math.sin(cumAngle - angle);
  const lg = pct > 50 ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${lg} 1 ${x2} ${y2} L ${ix1} ${iy1} A ${ir} ${ir} 0 ${lg} 0 ${ix2} ${iy2} Z`;
}
const donutPaths = donutData.map(d => ({ ...d, path: arc(d.pct) }));

export default function AdminDashboardPage() {
  return (
    <div className="p-5 space-y-5 bg-gray-50 min-h-full">

      {/* Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden h-40"
        style={{ backgroundImage: "url('/bg.png')", backgroundSize: 'cover', backgroundPosition: 'center top' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/25 to-transparent"/>
        <div className="relative z-10 p-6 h-full flex flex-col justify-center">
          <p className="text-white/80 text-sm">Good Morning, Admin</p>
          <h1 className="text-white text-2xl font-bold mt-0.5">Welcome to Nagorik Bhumi</h1>
          <p className="text-white/70 text-sm mt-1 max-w-sm">Manage land records, approvals, users and system settings — all in one place.</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-5 gap-3">
        {stats.map((s, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-11 h-11 rounded-xl ${s.bg} flex items-center justify-center`}>{s.icon}</div>
              <p className="text-xs text-gray-500 leading-tight">{s.label}</p>
            </div>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className={`text-xs mt-1 font-medium ${s.up ? 'text-green-500' : 'text-red-500'}`}>
              {s.change} <span className="text-gray-400 font-normal">vs. last month</span>
            </p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-3 gap-4">

        {/* Line Chart */}
        <div className="col-span-2 bg-white rounded-xl border border-gray-100 p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-gray-800 text-sm">Land Records Overview</h2>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-brand inline-block rounded"/>Total</span>
              <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-blue-400 inline-block rounded"/>Approved</span>
              <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-yellow-400 inline-block rounded"/>Pending</span>
            </div>
          </div>
          <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full">
            {/* Y gridlines */}
            {[0,500,1000,1500,2000].map(v => (
              <g key={v}>
                <line x1={padL} y1={toY(v)} x2={chartW-padR} y2={toY(v)} stroke="#f0f0f0" strokeWidth="1"/>
                <text x={padL-6} y={toY(v)+4} textAnchor="end" fontSize="9" fill="#aaa">{v}</text>
              </g>
            ))}
            {/* X labels */}
            {months.map((m,i) => (
              <text key={m} x={toX(i)} y={chartH-6} textAnchor="middle" fontSize="9" fill="#aaa">{m}</text>
            ))}
            {/* Areas */}
            <polygon points={area(totalData)} fill="#1a6b3c" opacity="0.07"/>
            <polygon points={area(approvedData)} fill="#3b82f6" opacity="0.07"/>
            <polygon points={area(pendingData)} fill="#facc15" opacity="0.1"/>
            {/* Lines */}
            <polyline points={polyline(totalData)} fill="none" stroke="#1a6b3c" strokeWidth="2" strokeLinejoin="round"/>
            <polyline points={polyline(approvedData)} fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinejoin="round"/>
            <polyline points={polyline(pendingData)} fill="none" stroke="#facc15" strokeWidth="2" strokeLinejoin="round"/>
            {/* Dots */}
            {totalData.map((v,i) => <circle key={i} cx={toX(i)} cy={toY(v)} r="3" fill="#1a6b3c"/>)}
            {approvedData.map((v,i) => <circle key={i} cx={toX(i)} cy={toY(v)} r="3" fill="#3b82f6"/>)}
            {pendingData.map((v,i) => <circle key={i} cx={toX(i)} cy={toY(v)} r="3" fill="#facc15"/>)}
          </svg>
        </div>

        {/* Donut Chart */}
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <h2 className="font-semibold text-gray-800 text-sm mb-3">Land Type Distribution</h2>
          <div className="flex items-center gap-4">
            <svg viewBox="0 0 160 160" className="w-36 flex-shrink-0">
              {donutPaths.map((d,i) => (
                <path key={i} d={d.path} fill={d.color} className="hover:opacity-80 transition-opacity cursor-pointer"/>
              ))}
              <text x={cx} y={cy-6} textAnchor="middle" fontSize="18" fontWeight="bold" fill="#1a6b3c">12,458</text>
              <text x={cx} y={cy+10} textAnchor="middle" fontSize="8" fill="#888">Total Records</text>
            </svg>
            <div className="space-y-1.5 flex-1">
              {donutData.map((d,i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }}/>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-700 truncate">{d.label}</p>
                    <p className="text-[10px] text-gray-400">{d.value.toLocaleString()} ({d.pct}%)</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-3 gap-4">

        {/* Pending Approvals Table */}
        <div className="col-span-1 bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
              <svg className="w-4 h-4 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              Pending Approvals
            </div>
            <Link href="/admin/applications" className="text-xs text-brand font-medium hover:underline flex items-center gap-1">
              View All <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>
            </Link>
          </div>
          <table className="w-full text-xs">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>{['#','Applicant Name','Land Type','Plot No.','Submitted Date','Action'].map(h=>(
                <th key={h} className="text-left px-3 py-2 text-[10px] font-semibold text-gray-400">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {pendingApprovals.map((r,i)=>(
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-3 py-2.5 text-gray-400">{i+1}</td>
                  <td className="px-3 py-2.5 font-medium text-gray-700">{r.name}</td>
                  <td className="px-3 py-2.5"><span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${typeColor[r.type] || 'bg-gray-100 text-gray-600'}`}>{r.type}</span></td>
                  <td className="px-3 py-2.5 text-gray-500">{r.plot}</td>
                  <td className="px-3 py-2.5 text-gray-400">{r.date}</td>
                  <td className="px-3 py-2.5"><button className="text-[10px] bg-brand text-white px-2.5 py-1 rounded-lg hover:bg-brand-dark transition-colors font-semibold">Review</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Land Records */}
        <div className="col-span-1 bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
              <svg className="w-4 h-4 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>
              Recent Land Records
            </div>
            <Link href="/admin/land-records" className="text-xs text-brand font-medium hover:underline flex items-center gap-1">
              View All <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>
            </Link>
          </div>
          <table className="w-full text-xs">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>{['#','Plot No.','Land Type','Owner','Status'].map(h=>(
                <th key={h} className="text-left px-3 py-2 text-[10px] font-semibold text-gray-400">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentRecords.map((r,i)=>(
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-3 py-2.5 text-gray-400">{i+1}</td>
                  <td className="px-3 py-2.5 font-medium text-brand">{r.plot}</td>
                  <td className="px-3 py-2.5"><span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${typeColor[r.type] || 'bg-gray-100 text-gray-600'}`}>{r.type}</span></td>
                  <td className="px-3 py-2.5 text-gray-600">{r.owner}</td>
                  <td className="px-3 py-2.5"><span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusColor[r.status]}`}>{r.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right column: Quick Actions + Recent Users */}
        <div className="flex flex-col gap-4">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-3">
              <svg className="w-4 h-4 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              Quick Actions
            </div>
            <div className="space-y-1">
              {quickActions.map((a,i)=>(
                <Link key={i} href={a.href}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-brand-light/50 hover:text-brand transition-colors group">
                  <div className="w-7 h-7 rounded-lg bg-brand-light flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-colors">
                    {a.icon}
                  </div>
                  <span className="text-xs font-medium text-gray-700 group-hover:text-brand flex-1">{a.label}</span>
                  <svg className="w-3.5 h-3.5 text-gray-300 group-hover:text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Users */}
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                <svg className="w-4 h-4 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                Recent Users
              </div>
              <Link href="/admin/users" className="text-xs text-brand font-medium hover:underline flex items-center gap-1">
                View All <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>
              </Link>
            </div>
            <table className="w-full text-xs">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>{['#','Name','NID','Role','Status'].map(h=>(
                  <th key={h} className="text-left px-3 py-2 text-[10px] font-semibold text-gray-400">{h}</th>
                ))}</tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentUsers.map((u,i)=>(
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-3 py-2 text-gray-400">{i+1}</td>
                    <td className="px-3 py-2 font-medium text-gray-700">{u.name}</td>
                    <td className="px-3 py-2 text-gray-400 font-mono text-[10px]">{u.nid}</td>
                    <td className="px-3 py-2 text-gray-500">{u.role}</td>
                    <td className="px-3 py-2"><span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">{u.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-brand rounded-xl p-4 flex items-center gap-3">
        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
        </div>
        <div>
          <p className="text-white font-semibold text-sm">Secure, Transparent, For a Better Bangladesh</p>
          <p className="text-white/70 text-xs">Nagorik Bhumi — Land Services for a Better Bangladesh</p>
        </div>
      </div>

    </div>
  );
}
