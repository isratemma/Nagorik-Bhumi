import Header from './Header';

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col relative" style={{ background: 'linear-gradient(135deg, #d4eddc 0%, #e8f5ee 40%, #c8dfc8 100%)' }}>
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Birds */}
        <svg className="absolute top-16 left-1/4 opacity-20 w-24" viewBox="0 0 100 30" fill="none">
          <path d="M0 15 Q10 5 20 15 Q30 5 40 15" stroke="#1a6b3c" strokeWidth="1.5" fill="none"/>
          <path d="M55 10 Q65 2 75 10 Q85 2 95 10" stroke="#1a6b3c" strokeWidth="1.5" fill="none"/>
        </svg>
        {/* Left leaves */}
        <svg className="absolute bottom-0 left-0 opacity-30 w-48" viewBox="0 0 150 200" fill="none">
          <path d="M10 200 Q30 150 20 100 Q50 120 40 180" fill="#2d8a55" opacity="0.6"/>
          <path d="M30 200 Q60 140 50 80 Q90 110 70 190" fill="#1a6b3c" opacity="0.5"/>
          <path d="M0 200 Q20 160 10 110 Q40 130 25 200" fill="#4aab6d" opacity="0.4"/>
        </svg>
        {/* Right leaves */}
        <svg className="absolute bottom-0 right-0 opacity-30 w-48" viewBox="0 0 150 200" fill="none">
          <path d="M140 200 Q120 150 130 100 Q100 120 110 180" fill="#2d8a55" opacity="0.6"/>
          <path d="M120 200 Q90 140 100 80 Q60 110 80 190" fill="#1a6b3c" opacity="0.5"/>
          <path d="M150 200 Q130 160 140 110 Q110 130 125 200" fill="#4aab6d" opacity="0.4"/>
        </svg>
        {/* Green field / landscape hint at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 opacity-20"
          style={{ background: 'linear-gradient(to top, #1a6b3c, transparent)' }} />
      </div>

      <Header />

      <main className="flex-1 flex items-start justify-center px-4 py-8 relative z-10">
        {children}
      </main>
    </div>
  );
}
