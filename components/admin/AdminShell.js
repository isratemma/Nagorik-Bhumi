'use client';

import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';

export default function AdminShell({ children }) {
  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      fontFamily: "'Inter', 'Hind Siliguri', sans-serif",
      background: '#f9fafb',
    }}>

      {/* Sidebar — fixed width, no z-index */}
      <div style={{ width: '224px', flexShrink: 0, overflowY: 'auto' }}>
        <AdminSidebar />
      </div>

      {/* Right side */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>
        <AdminTopbar />
        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
          {children}
        </div>
      </div>

    </div>
  );
}
