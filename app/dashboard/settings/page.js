'use client';
import { useState } from 'react';

export default function SettingsPage() {
  const [profile, setProfile] = useState({ name: 'Israt Jahan Ema', email: 'israt@email.com', phone: '01712345678', nid: '19901234567890', address: 'House 12, Road 5, Savar, Dhaka' });
  const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' });
  const [notifications, setNotifications] = useState({ email: true, sms: true, app: true, taxReminder: true, appStatus: true, newMessage: false });
  const [saved, setSaved] = useState('');

  const save = (section) => {
    setSaved(section);
    setTimeout(() => setSaved(''), 3000);
  };

  const Toggle = ({ checked, onChange }) => (
    <button onClick={() => onChange(!checked)}
      className={`relative w-10 h-6 rounded-full transition-colors ${checked ? 'bg-brand' : 'bg-gray-200'}`}>
      <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${checked ? 'left-5' : 'left-1'}`}/>
    </button>
  );

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-800">Settings</h1>
        <p className="text-sm text-gray-500 mt-0.5">Manage your account preferences</p>
      </div>

      <div className="max-w-2xl space-y-6">

        {/* Profile */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
            Profile Information
          </h2>

          {/* Avatar */}
          <div className="flex items-center gap-4 mb-5 pb-5 border-b border-gray-100">
            <div className="w-16 h-16 rounded-full bg-brand-light border-2 border-brand/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/></svg>
            </div>
            <div>
              <p className="font-semibold text-gray-800">{profile.name}</p>
              <p className="text-xs text-gray-500">Landowner · NID verified</p>
              <button className="text-xs text-brand font-medium mt-1 hover:underline">Change Photo</button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Full Name', key: 'name', type: 'text' },
              { label: 'Email Address', key: 'email', type: 'email' },
              { label: 'Phone Number', key: 'phone', type: 'tel' },
              { label: 'NID Number', key: 'nid', type: 'text', disabled: true },
            ].map(f => (
              <div key={f.key}>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">{f.label}</label>
                <input type={f.type} value={profile[f.key]} disabled={f.disabled}
                  onChange={e => setProfile({...profile, [f.key]: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand ${f.disabled ? 'bg-gray-50 text-gray-400 border-gray-100 cursor-not-allowed' : 'border-gray-200'}`}/>
                {f.disabled && <p className="text-[10px] text-gray-400 mt-1">NID cannot be changed</p>}
              </div>
            ))}
            <div className="col-span-2">
              <label className="block text-xs font-medium text-gray-700 mb-1.5">Address</label>
              <input type="text" value={profile.address} onChange={e => setProfile({...profile, address: e.target.value})}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"/>
            </div>
          </div>
          {saved === 'profile' && <p className="text-xs text-green-600 mt-3 flex items-center gap-1"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>Profile saved!</p>}
          <button onClick={() => save('profile')} className="mt-4 bg-brand hover:bg-brand-dark text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors">Save Profile</button>
        </div>

        {/* Password */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
            Change Password
          </h2>
          <div className="space-y-4">
            {[
              { label: 'Current Password', key: 'current' },
              { label: 'New Password', key: 'newPass' },
              { label: 'Confirm New Password', key: 'confirm' },
            ].map(f => (
              <div key={f.key}>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">{f.label}</label>
                <input type="password" value={passwords[f.key]} onChange={e => setPasswords({...passwords, [f.key]: e.target.value})}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"/>
              </div>
            ))}
          </div>
          {saved === 'password' && <p className="text-xs text-green-600 mt-3 flex items-center gap-1"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>Password updated!</p>}
          <button onClick={() => save('password')} className="mt-4 bg-brand hover:bg-brand-dark text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors">Update Password</button>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
            Notification Preferences
          </h2>
          <div className="space-y-3">
            {[
              { key: 'email', label: 'Email Notifications', sub: 'Receive updates via email' },
              { key: 'sms', label: 'SMS Notifications', sub: 'Receive updates via SMS' },
              { key: 'app', label: 'In-App Notifications', sub: 'Show notifications in dashboard' },
              { key: 'taxReminder', label: 'Tax Payment Reminders', sub: 'Get reminded before tax due dates' },
              { key: 'appStatus', label: 'Application Status Updates', sub: 'Notified when application status changes' },
              { key: 'newMessage', label: 'New Messages', sub: 'Notify on new buyer/seller messages' },
            ].map(n => (
              <div key={n.key} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-700">{n.label}</p>
                  <p className="text-xs text-gray-400">{n.sub}</p>
                </div>
                <Toggle checked={notifications[n.key]} onChange={v => setNotifications({...notifications, [n.key]: v})}/>
              </div>
            ))}
          </div>
          {saved === 'notifications' && <p className="text-xs text-green-600 mt-3 flex items-center gap-1"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>Preferences saved!</p>}
          <button onClick={() => save('notifications')} className="mt-4 bg-brand hover:bg-brand-dark text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors">Save Preferences</button>
        </div>

        {/* Danger zone */}
        <div className="bg-white rounded-xl border border-red-100 p-5">
          <h2 className="font-semibold text-red-600 mb-1 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            Danger Zone
          </h2>
          <p className="text-xs text-gray-500 mb-4">These actions are irreversible. Please proceed with caution.</p>
          <div className="flex gap-3">
            <button className="text-sm font-medium text-red-600 border border-red-200 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors">Deactivate Account</button>
            <button className="text-sm font-medium text-red-600 border border-red-200 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors">Delete Account</button>
          </div>
        </div>

      </div>
    </div>
  );
}
