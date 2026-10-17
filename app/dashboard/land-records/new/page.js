'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const divisions = ['Dhaka','Chattogram','Rajshahi','Khulna','Barishal','Sylhet','Rangpur','Mymensingh'];

// ── Reusable input styles (defined OUTSIDE component so they never change) ──
const inputCls = (err) =>
  `w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all bg-white ${err ? 'border-red-400 bg-red-50' : 'border-gray-200'}`;

const labelCls = 'block text-sm font-medium text-gray-700 mb-1.5';

export default function NewLandRecordPage() {
  const router  = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors,  setErrors]  = useState({});
  const [form,    setForm]    = useState({
    title: '', type: '', division: '', district: '', upazila: '',
    address: '', plotNumber: '', khatianNumber: '', sizeValue: '', sizeUnit: 'Katha', notes: '',
  });

  const set = (name, value) => {
    setForm(f => ({ ...f, [name]: value }));
    setErrors(e => ({ ...e, [name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.title.trim())      e.title      = 'Title is required';
    if (!form.type)              e.type       = 'Land type is required';
    if (!form.division)          e.division   = 'Division is required';
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
      const res = await fetch(`${API}/land-records`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title, type: form.type,
          location: { division: form.division, district: form.district, upazila: form.upazila, address: form.address },
          plotNumber: form.plotNumber, khatianNumber: form.khatianNumber,
          size: { value: Number(form.sizeValue), unit: form.sizeUnit, sqft: Math.round(Number(form.sizeValue) * 720) },
          notes: form.notes,
        }),
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
    } finally { setLoading(false); }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-full">

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
                <span className="w-6 h-6 rounded-full bg-brand text-white text-xs flex items-center justify-center font-bold">1</span>
                Basic Information
              </h2>
              <div className="grid grid-cols-2 gap-4">

                {/* Title — full width */}
                <div className="col-span-2">
                  <label className={labelCls}>Land Title <span className="text-red-500">*</span></label>
                  <input type="text" value={form.title} onChange={e => set('title', e.target.value)}
                    placeholder="e.g. Residential Land – Savar"
                    className={inputCls(errors.title)}/>
                  {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
                </div>

                {/* Type */}
                <div>
                  <label className={labelCls}>Land Type <span className="text-red-500">*</span></label>
                  <select value={form.type} onChange={e => set('type', e.target.value)}
                    className={inputCls(errors.type)}>
                    <option value="">Select type</option>
                    {['Residential','Agricultural','Commercial','Industrial','Other'].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  {errors.type && <p className="text-xs text-red-500 mt-1">{errors.type}</p>}
                </div>

                {/* Plot Number */}
                <div>
                  <label className={labelCls}>Plot Number <span className="text-red-500">*</span></label>
                  <input type="text" value={form.plotNumber} onChange={e => set('plotNumber', e.target.value)}
                    placeholder="e.g. 1234"
                    className={inputCls(errors.plotNumber)}/>
                  {errors.plotNumber && <p className="text-xs text-red-500 mt-1">{errors.plotNumber}</p>}
                </div>

                {/* Khatian */}
                <div>
                  <label className={labelCls}>Khatian Number</label>
                  <input type="text" value={form.khatianNumber} onChange={e => set('khatianNumber', e.target.value)}
                    placeholder="e.g. KH-1001"
                    className={inputCls(false)}/>
                </div>

                {/* Size */}
                <div>
                  <label className={labelCls}>Land Size <span className="text-red-500">*</span></label>
                  <div className="flex gap-2">
                    <input type="number" value={form.sizeValue} onChange={e => set('sizeValue', e.target.value)}
                      placeholder="0.00" min="0" step="0.01"
                      className={`flex-1 px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand bg-white ${errors.sizeValue ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}/>
                    <select value={form.sizeUnit} onChange={e => set('sizeUnit', e.target.value)}
                      className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand bg-white">
                      {['Katha','Bigha','Acre','Decimal'].map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                  </div>
                  {errors.sizeValue && <p className="text-xs text-red-500 mt-1">{errors.sizeValue}</p>}
                  {form.sizeValue && !isNaN(form.sizeValue) && (
                    <p className="text-xs text-gray-400 mt-1">≈ {Math.round(Number(form.sizeValue) * 720).toLocaleString()} sq ft</p>
                  )}
                </div>

                {/* Notes — full width */}
                <div className="col-span-2">
                  <label className={labelCls}>Notes</label>
                  <textarea value={form.notes} onChange={e => set('notes', e.target.value)} rows={3}
                    placeholder="Any additional notes about this land..."
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand resize-none bg-white"/>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-brand text-white text-xs flex items-center justify-center font-bold">2</span>
                Location Details
              </h2>
              <div className="grid grid-cols-2 gap-4">

                {/* Division */}
                <div>
                  <label className={labelCls}>Division <span className="text-red-500">*</span></label>
                  <select value={form.division} onChange={e => set('division', e.target.value)}
                    className={inputCls(errors.division)}>
                    <option value="">Select division</option>
                    {divisions.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                  {errors.division && <p className="text-xs text-red-500 mt-1">{errors.division}</p>}
                </div>

                {/* District */}
                <div>
                  <label className={labelCls}>District <span className="text-red-500">*</span></label>
                  <input type="text" value={form.district} onChange={e => set('district', e.target.value)}
                    placeholder="e.g. Gazipur"
                    className={inputCls(errors.district)}/>
                  {errors.district && <p className="text-xs text-red-500 mt-1">{errors.district}</p>}
                </div>

                {/* Upazila */}
                <div>
                  <label className={labelCls}>Upazila</label>
                  <input type="text" value={form.upazila} onChange={e => set('upazila', e.target.value)}
                    placeholder="e.g. Savar Sadar"
                    className={inputCls(false)}/>
                </div>

                {/* Address — full width */}
                <div className="col-span-2">
                  <label className={labelCls}>Full Address / Mouza</label>
                  <input type="text" value={form.address} onChange={e => set('address', e.target.value)}
                    placeholder="Mouza name, village, road..."
                    className={inputCls(false)}/>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right column ── */}
          <div className="space-y-5">

            {/* Live Summary */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h2 className="font-semibold text-gray-800 mb-4">Summary</h2>
              <div className="space-y-3 text-sm">
                {[
                  { label:'Title',    value: form.title      || '—' },
                  { label:'Type',     value: form.type       || '—' },
                  { label:'Division', value: form.division   || '—' },
                  { label:'District', value: form.district   || '—' },
                  { label:'Plot No.', value: form.plotNumber || '—' },
                  { label:'Size',     value: form.sizeValue ? `${form.sizeValue} ${form.sizeUnit}` : '—' },
                ].map((r,i) => (
                  <div key={i} className="flex justify-between gap-2">
                    <span className="text-gray-500 flex-shrink-0">{r.label}</span>
                    <span className="font-medium text-gray-800 text-right truncate">{r.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="bg-brand-light rounded-xl border border-brand/10 p-4 flex items-start gap-2">
              <svg className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"/>
              </svg>
              <div>
                <p className="text-xs font-semibold text-gray-800">What happens next?</p>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  Your record will be submitted for officer verification within 3–5 working days.
                </p>
              </div>
            </div>

            {/* Submit */}
            <div className="space-y-2">
              <button type="submit" disabled={loading}
                className="w-full bg-brand hover:bg-brand-dark text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-60">
                {loading
                  ? <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>Submitting…</>
                  : <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>Add Land Record</>}
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
