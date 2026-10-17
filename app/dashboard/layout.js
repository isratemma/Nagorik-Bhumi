'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Topbar from '@/components/dashboard/Topbar';

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      overflow: 'hidden',
      background: '#f9fafb',
      fontFamily: "'Inter', 'Hind Siliguri', sans-serif",
      position: 'relative',
    }}>

      {/* Mobile backdrop — only rendered when open, never blocks desktop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.4)',
            zIndex: 40,
          }}
        />
      )}

      {/* Sidebar — always part of flex row, never overlaps content on desktop */}
      <div style={{ flexShrink: 0, zIndex: 50, position: 'relative' }}>
        <Sidebar />
      </div>

      {/* Main area */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        minWidth: 0,
        position: 'relative',
        zIndex: 1,
      }}>
        <Topbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        {/* children scroll independently */}
        <div style={{ flex: 1, overflow: 'auto', display: 'flex', minHeight: 0 }}>
          {children}
        </div>
      </div>
    </div>
  );
}
