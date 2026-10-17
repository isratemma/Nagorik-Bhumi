'use client';

import Link from 'next/link';

const stats = [
  {
    label: 'Total Land Records',
    value: '3',
    icon: (
      <svg className="w-6 h-6 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    label: 'Pending Applications',
    value: '2',
    icon: (
      <svg className="w-6 h-6 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    label: 'Unread Notifications',
    value: '3',
    icon: (
      <svg className="w-6 h-6 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
  },
  {
    label: 'Total Land Tax Due',
    value: '৳ 12,500',
    valueClass: 'text-red-600',
    icon: (
      <svg className="w-6 h-6 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
];

const landRecords = [
  { title: 'Residential Land', location: 'Savar, Dhaka', size: '5.00 Katha', sqft: '3,600 sq ft', id: 'LN-00123', status: 'Verified', statusColor: 'bg-green-500', imgColor: '#4a9e4a' },
  { title: 'Agricultural Land', location: 'Gazipur', size: '12.00 Katha', sqft: '8,640 sq ft', id: 'LN-00124', status: 'Pending', statusColor: 'bg-yellow-400', imgColor: '#6aaa3a' },
  { title: 'Commercial Land', location: 'Bashundhara, Dhaka', size: '8.00 Katha', sqft: '5,760 sq ft', id: 'LN-00125', status: 'Verified', statusColor: 'bg-green-500', imgColor: '#3a8a5a' },
  { title: 'Agricultural Land', location: 'Tangail', size: '10.00 Katha', sqft: '7,200 sq ft', id: 'LN-00126', status: 'Draft', statusColor: 'bg-gray-400', imgColor: '#5a9a3a' },
];

const services = [
  { label: 'My Applications',  desc: 'Track your submitted applications and status.', href: '/dashboard/applications',
    icon: <svg className="w-7 h-7 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg> },
  { label: 'Land Tax',          desc: 'View and manage your land tax payments.',       href: '/dashboard/land-tax',
    icon: <svg className="w-7 h-7 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/></svg> },
  { label: 'Inheritance',       desc: 'Handle inheritance and succession matters.',    href: '/dashboard/inheritance',
    icon: <svg className="w-7 h-7 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg> },
  { label: 'Documents',         desc: 'Access and manage your documents.',             href: '/dashboard/documents',
    icon: <svg className="w-7 h-7 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/></svg> },
];

export default function DashboardContent() {
  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="p-5 space-y-5">

        {/* ── Hero Banner ── */}
        <div className="relative rounded-2xl overflow-hidden h-44"
          style={{ backgroundImage: "url('/bg.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />
          <div className="relative z-10 p-6 h-full flex flex-col justify-center">
            <p className="text-white/80 text-sm">Good Morning,</p>
            <h1 className="text-white text-2xl font-bold flex items-center gap-2">
              Israt Jahan Ema <span>👋</span>
            </h1>
            <p className="text-white/70 text-sm mt-1 max-w-xs">
              Manage your land records, applications and more from your personal dashboard.
            </p>
          </div>
          {/* Tagline */}
          <div className="absolute right-6 bottom-6 text-right">
            <p className="text-white/90 font-bold text-lg italic leading-tight drop-shadow">
              Better Records<br />Brighter Future
            </p>
          </div>
        </div>

        {/* ── Stats Row ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map((s, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-3 hover:shadow-sm transition-shadow cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-brand-light flex items-center justify-center flex-shrink-0">
                {s.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 leading-tight">{s.label}</p>
                <p className={`text-xl font-bold mt-0.5 ${s.valueClass || 'text-gray-800'}`}>{s.value}</p>
              </div>
              <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          ))}
        </div>

        {/* ── My Land Records ── */}
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 font-semibold text-gray-800">
              <svg className="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              My Land Records
            </div>
            <Link href="/dashboard/land-records" className="text-sm text-brand font-medium hover:underline flex items-center gap-1">
              View All
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
            {landRecords.map((r, i) => (
              <div key={i} className="border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                {/* Land photo */}
                <div className="relative h-28 overflow-hidden bg-gray-100">
                  <img
                    src={r.photoUrl || `https://picsum.photos/seed/${r.id}/400/280`}
                    alt={r.title}
                    className="w-full h-full object-cover"
                    onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}
                  />
                  {/* fallback SVG if image fails */}
                  <div className="absolute inset-0 hidden items-center justify-center" style={{ background: `linear-gradient(135deg, ${r.imgColor}cc, ${r.imgColor}88)` }}>
                    <svg className="w-full h-full" viewBox="0 0 160 112" preserveAspectRatio="xMidYMid slice">
                      <rect width="160" height="112" fill={r.imgColor} opacity="0.7"/>
                      <path d="M0 70 Q40 50 80 60 Q120 70 160 55 L160 112 L0 112Z" fill="#2d6b35" opacity="0.6"/>
                      <path d="M0 85 Q40 70 80 78 Q120 86 160 74 L160 112 L0 112Z" fill="#1a5a20" opacity="0.7"/>
                      <rect x="10" y="10" width="140" height="85" rx="4" fill="none" stroke="white" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.7"/>
                    </svg>
                  </div>
                  {/* Status badge */}
                  <span className={`absolute top-2 left-2 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full ${r.statusColor}`}>
                    {r.status === 'Verified' && '✓ '}{r.status}
                  </span>
                  {/* menu dots */}
                  <button className="absolute top-2 right-2 text-white/80 hover:text-white">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/>
                    </svg>
                  </button>
                </div>

                <div className="p-3">
                  <h3 className="font-semibold text-gray-800 text-sm">{r.title}</h3>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {r.location}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    <span className="font-medium text-gray-700">{r.size}</span> (approx. {r.sqft})
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">ID: <span className="text-brand font-medium">{r.id}</span></p>
                  <Link href={`/dashboard/land-records`}
                    className="mt-2 w-full text-xs text-brand font-medium border border-brand/20 rounded-lg py-1.5 hover:bg-brand-light transition-colors flex items-center justify-center gap-1">
                    View Details
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Services Grid ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {services.map((s, i) => (
            <Link key={i} href={s.href}
              className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-sm transition-shadow group block">
              <div className="w-12 h-12 rounded-xl bg-brand-light flex items-center justify-center mb-3 group-hover:bg-brand/10 transition-colors">
                {s.icon}
              </div>
              <h3 className="font-semibold text-gray-800 text-sm">{s.label}</h3>
              <p className="text-xs text-gray-500 mt-1 leading-snug">{s.desc}</p>
              <div className="mt-3 flex items-center justify-end">
                <svg className="w-4 h-4 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* ── Footer ── */}
        <div className="flex items-center justify-between text-xs text-gray-400 pt-2 pb-1 border-t border-gray-100">
          <span>© 2025 <span className="font-semibold text-gray-500">Nagorik Bhumi</span>. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-brand transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-brand transition-colors">Contact</a>
          </div>
        </div>

      </div>
    </div>
  );
}
