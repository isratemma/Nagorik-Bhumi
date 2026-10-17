'use client';

import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';

export default function AdminShell({ children }) {
  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      overflow: 'hidden',
      background: '#f9fafb',
      fontFamily: "'Inter', 'Hind Siliguri', sans-serif",
    }}>
      {/* Sidebar — always visible, part of flex row */}
      <div style={{ flexShrink: 0, position: 'relative', zIndex: 10 }}>
        <AdminSidebar />
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
        <AdminTopbar />
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
