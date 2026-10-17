'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const divisions = ['Dhaka','Chattogram','Rajshahi','Khulna','Barishal','Sylhet','Rangpur','Mymensingh'];

export default function NewLandRecordPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    title: '',
    type: '',
    division: '',
    district: '',
    upazila: '',
    address: '',
    plotNumber: '',
    khatianNumber: '',
    sizeValue: '',
    sizeUnit: 'Katha',
    notes: '',
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const e = {};
    if (!form.title.trim())      e.title      = 'Title is required';
    if (!form.type)               e.type       = 'Land type is required';
    if (!form.division)           e.division   = 'Division is required';
    if (!form.district.trim())   e.district   = 'District is required';
    if (!form.plotNumber.trim()) e.plotNumber = 'Plot number is required';
    if (!form.sizeValue || isNaN(form.sizeValue) || Number(form.sizeValue) <= 0)
      e.sizeValue = 'Valid size is required';
    return e;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      const payload = {
        title: form.title,
        type:  form.type,
        location: {
          division: form.division,
          district: form.district,
          upazila:  form.upazila,
          address:  form.address,
        },
        plotNumber:    form.plotNumber,
        khatianNumber: form.khatianNumber,
        size: {
          value: Number(form.sizeValue),
          unit:  form.sizeUnit,
          sqft:  Math.round(Number(form.sizeValue) * 720),
        },
        notes: form.notes,
      };

      const res = await fetch(`${API}/land-records`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Land record added successfully!');
        router.push('/dashboard/land-records');
      } else {
        toast.error(data.message || 'Failed to add record');
      }
    } catch {
      toast.error('Could not connect to server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const InputField = ({ label, name, type = 'text', placeholder, required, children }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children || (
        <input
          type={type}
          name={name}
          value={form[name]}
          onChange={handleChange}
          placeholder={placeholder}
          className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all
            ${errors[name] ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'}`}
        />
      )}
      {errors[name] && <p className="text-xs text-red-500 mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/dashboard/land-records"
          className="p-2 hover:bg-white rounded-lg border border-gray-200 transition-colors">
          <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
          </svg>
        </Link>
        <div>
          <h1 className="text-xl font-bold text-gray-800">Add New Land Record</h1>
          <p className="text-sm text-gray-500 mt-0.5">Fill in the details of your land property</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* ── Left column ── */}
          <div className="lg:col-span-2 space-y-5">

            {/* Basic Info */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-brand text-white text-xs flex items-center justify-center font-bold">1</div>
                Basic Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <InputField label="Land Title" name="title" placeholder="e.g. Residential Land – Savar" required/>
                </div>

                <InputField label="Land Type" name="type" required>
                  <select name="type" value={form.type} onChange={handleChange}
                    className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand
                      ${errors.type ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'}`}>
                    <option value="">Select type</option>
                    {['Residential','Agricultural','Commercial','Industrial','Other'].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  {errors.type && <p className="text-xs text-red-500 mt-1">{errors.type}</p>}
                </InputField>

                <InputField label="Plot Number" name="plotNumber" placeholder="e.g. 1234" required/>
                <InputField label="Khatian Number" name="khatianNumber" placeholder="e.g. KH-1001"/>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Land Size <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <input type="number" name="sizeValue" value={form.sizeValue} onChange={handleChange}
                      placeholder="0.00" min="0" step="0.01"
                      className={`flex-1 px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand
                        ${errors.sizeValue ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}/>
                    <select name="sizeUnit" value={form.sizeUnit} onChange={handleChange}
                      className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand bg-white">
                      {['Katha','Bigha','Acre','Decimal'].map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                  </div>
                  {errors.sizeValue && <p className="text-xs text-red-500 mt-1">{errors.sizeValue}</p>}
                  {form.sizeValue && !isNaN(form.sizeValue) && (
                    <p className="text-xs text-gray-400 mt-1">≈ {Math.round(Number(form.sizeValue) * 720).toLocaleString()} sq ft</p>
                  )}
                </div>

                <div className="col-span-2">
                  <InputField label="Notes" name="notes" placeholder="Any additional notes about this land...">
                    <textarea name="notes" value={form.notes} onChange={handleChange} rows={3}
                      placeholder="Any additional notes about this land..."
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand resize-none"/>
                  </InputField>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-brand text-white text-xs flex items-center justify-center font-bold">2</div>
                Location Details
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <InputField label="Division" name="division" required>
                  <select name="division" value={form.division} onChange={handleChange}
                    className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand
                      ${errors.division ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'}`}>
                    <option value="">Select division</option>
                    {divisions.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                  {errors.division && <p className="text-xs text-red-500 mt-1">{errors.division}</p>}
                </InputField>

                <InputField label="District" name="district" placeholder="e.g. Savar" required/>
                <InputField label="Upazila" name="upazila" placeholder="e.g. Savar Sadar"/>
                <div className="col-span-2">
                  <InputField label="Full Address / Mouza" name="address" placeholder="Mouza name, village, road..."/>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right column ── */}
          <div className="space-y-5">

            {/* Summary card */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h2 className="font-semibold text-gray-800 mb-4">Summary</h2>
              <div className="space-y-3 text-sm">
                {[
                  { label: 'Title',      value: form.title      || '—' },
                  { label: 'Type',       value: form.type       || '—' },
                  { label: 'Division',   value: form.division   || '—' },
                  { label: 'District',   value: form.district   || '—' },
                  { label: 'Plot No.',   value: form.plotNumber || '—' },
                  { label: 'Size',       value: form.sizeValue ? `${form.sizeValue} ${form.sizeUnit}` : '—' },
                ].map((r, i) => (
                  <div key={i} className="flex justify-between">
                    <span className="text-gray-500">{r.label}</span>
                    <span className="font-medium text-gray-800 text-right max-w-[60%] truncate">{r.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Info box */}
            <div className="bg-brand-light rounded-xl border border-brand/10 p-4">
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"/>
                </svg>
                <div>
                  <p className="text-xs font-semibold text-gray-800">What happens next?</p>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    Your land record will be submitted for verification. An officer will review and verify within 3–5 working days.
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <button type="submit" disabled={loading}
                className="w-full bg-brand hover:bg-brand-dark text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
                {loading ? (
                  <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg> Submitting…</>
                ) : (
                  <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg> Add Land Record</>
                )}
              </button>
              <Link href="/dashboard/land-records"
                className="w-full border border-gray-200 text-gray-600 font-medium py-3 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors text-sm">
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
