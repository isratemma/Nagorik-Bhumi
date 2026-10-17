'use client';
import { useState } from 'react';

const users = [
  { id: 'USR-001', name: 'Md. Rahim Hossain', nid: '1987654321098', email: 'rahim@email.com', phone: '01711111111', role: 'Citizen', records: 3, joined: '10 Jan 2024', status: 'Active' },
  { id: 'USR-002', name: 'Fatema Akter',       nid: '1998765432109', email: 'fatema@email.com', phone: '01722222222', role: 'Citizen', records: 2, joined: '15 Feb 2024', status: 'Active' },
  { id: 'USR-003', name: 'Abdul Karim',         nid: '1976543210987', email: 'akarim@email.com', phone: '01733333333', role: 'Citizen', records: 4, joined: '05 Mar 2024', status: 'Active' },
  { id: 'USR-004', name: 'Sadia Islam',         nid: '2001234567891', email: 'sadia@email.com',  phone: '01744444444', role: 'Citizen', records: 1, joined: '20 Mar 2024', status: 'Suspended' },
  { id: 'USR-005', name: 'Hasan Mahmud',        nid: '1965432109876', email: 'hasan@email.com',  phone: '01755555555', role: 'Citizen', records: 5, joined: '02 Apr 2024', status: 'Active' },
  { id: 'USR-006', name: 'Nusrat Jahan',        nid: '1994321098765', email: 'nusrat@email.com', phone: '01766666666', role: 'Officer', records: 0, joined: '12 Apr 2024', status: 'Active' },
  { id: 'USR-007', name: 'Kabir Uddin',         nid: '1983210987654', email: 'kabir@email.com',  phone: '01777777777', role: 'Citizen', records: 2, joined: '25 Apr 2024', status: 'Active' },
  { id: 'USR-008', name: 'Roksana Begum',       nid: '1972109876543', email: 'roksana@email.com',phone: '01788888888', role: 'Citizen', records: 3, joined: '10 May 2024', status: 'Inactive' },
];

const statusStyle = { Active: 'bg-green-100 text-green-700', Suspended: 'bg-red-100 text-red-600', Inactive: 'bg-gray-100 text-gray-500' };
const roleStyle   = { Citizen: 'bg-blue-50 text-blue-600', Officer: 'bg-purple-50 text-purple-600', Admin: 'bg-orange-50 text-orange-600' };

export default function UsersPage() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = users.filter(u =>
    (roleFilter === 'All' || u.role === roleFilter) &&
    (statusFilter === 'All' || u.status === statusFilter) &&
    (u.name.toLowerCase().includes(search.toLowerCase()) || u.nid.includes(search) || u.email.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800">User Management</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage all registered users and their permissions</p>
        </div>
        <button className="bg-brand hover:bg-brand-dark text-white text-sm font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
          Add New User
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Users',    value: users.length,                                           color: 'text-gray-800', bg: 'bg-white' },
          { label: 'Active',         value: users.filter(u=>u.status==='Active').length,             color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Suspended',      value: users.filter(u=>u.status==='Suspended').length,          color: 'text-red-600',   bg: 'bg-red-50' },
          { label: 'Officers',       value: users.filter(u=>u.role==='Officer').length,              color: 'text-purple-600',bg: 'bg-purple-50' },
        ].map((s,i) => (
          <div key={i} className={`${s.bg} border border-gray-100 rounded-xl p-4`}>
            <p className="text-xs text-gray-500">{s.label}</p>
            <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <input type="text" placeholder="Search by name, NID, or email…" value={search} onChange={e=>setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand bg-white"/>
        </div>
        <div className="flex gap-2">
          {['All','Citizen','Officer'].map(f=>(
            <button key={f} onClick={()=>setRoleFilter(f)}
              className={`text-xs px-3 py-1.5 rounded-full font-medium border transition-colors ${roleFilter===f?'bg-brand text-white border-brand':'bg-white text-gray-600 border-gray-200 hover:border-brand hover:text-brand'}`}>{f}</button>
          ))}
        </div>
        <div className="flex gap-2">
          {['All','Active','Suspended','Inactive'].map(f=>(
            <button key={f} onClick={()=>setStatusFilter(f)}
              className={`text-xs px-3 py-1.5 rounded-full font-medium border transition-colors ${statusFilter===f?'bg-brand text-white border-brand':'bg-white text-gray-600 border-gray-200 hover:border-brand hover:text-brand'}`}>{f}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>{['#','User ID','Name','NID','Email','Phone','Role','Records','Joined','Status','Actions'].map(h=>(
              <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500">{h}</th>
            ))}</tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((u,i)=>(
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-gray-400 text-xs">{i+1}</td>
                <td className="px-4 py-3 text-brand font-medium text-xs">{u.id}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-brand-light flex items-center justify-center text-brand font-bold text-xs flex-shrink-0">{u.name[0]}</div>
                    <span className="font-medium text-gray-800 text-xs">{u.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs font-mono">{u.nid}</td>
                <td className="px-4 py-3 text-gray-500 text-xs">{u.email}</td>
                <td className="px-4 py-3 text-gray-500 text-xs">{u.phone}</td>
                <td className="px-4 py-3"><span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${roleStyle[u.role]}`}>{u.role}</span></td>
                <td className="px-4 py-3 text-center text-gray-700 font-semibold text-xs">{u.records}</td>
                <td className="px-4 py-3 text-gray-400 text-xs">{u.joined}</td>
                <td className="px-4 py-3"><span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${statusStyle[u.status]}`}>{u.status}</span></td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 rounded-lg hover:bg-brand-light text-brand transition-colors" title="View"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/></svg></button>
                    <button className="p-1.5 rounded-lg hover:bg-yellow-50 text-yellow-600 transition-colors" title="Edit"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg></button>
                    <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors" title="Suspend"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/></svg></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
