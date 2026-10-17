import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminTopbar from '@/components/admin/AdminTopbar';

export const metadata = { title: 'Admin – Nagorik Bhumi' };

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50" style={{ fontFamily: "'Inter', 'Hind Siliguri', sans-serif" }}>
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminTopbar />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
