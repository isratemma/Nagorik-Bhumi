'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Topbar from '@/components/dashboard/Topbar';

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#f9fafb', fontFamily: "'Inter', 'Hind Siliguri', sans-serif" }}>

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 40 }}
        />
      )}

      {/* Sidebar wrapper — always visible on desktop via min-width trick */}
      <div style={{
        flexShrink: 0,
        position: 'relative',
        zIndex: 50,
        display: 'flex',
      }}>
        <div style={{
          transform: sidebarOpen ? 'translateX(0)' : undefined,
          transition: 'transform 300ms ease-in-out',
        }}>
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        <Topbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        <main style={{ flex: 1, overflow: 'hidden', display: 'flex', minHeight: 0 }}>
          {children}
        </main>
      </div>
    </div>
  );
}
