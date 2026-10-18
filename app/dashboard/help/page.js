'use client';
import { useState } from 'react';

const faqs = [
  { q: 'How do I add a new land record?', a: 'Go to My Land Records and click "Add New Record". Fill in the land details and upload required documents like the deed and survey map.' },
  { q: 'How long does a mutation application take?', a: 'Mutation applications typically take 30–45 working days after submission of all required documents.' },
  { q: 'What documents are required for inheritance?', a: 'You need the death certificate of the deceased, NID copies of all heirs, original land deed, and a succession certificate.' },
  { q: 'How do I pay land tax online?', a: 'Go to Land Tax section, select the property, and click "Pay Now". You can pay via bKash, Nagad, or bank transfer.' },
  { q: 'Can I download my verified documents?', a: 'Yes, go to Documents section and click "Download" next to any verified document.' },
  { q: 'What is a Katha?', a: '1 Katha = 720 square feet in Bangladesh. It is a commonly used unit of land measurement.' },
];

export default function HelpPage() {
  const [open, setOpen] = useState(null);
  const [ticket, setTicket] = useState({ subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    if (!ticket.subject.trim() || !ticket.message.trim()) {
      toast.error('Please fill in both subject and message.');
      return;
    }
    setSent(true);
    toast.success('Ticket submitted! We\'ll respond within 24 hours.');
    setTicket({ subject: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-800">Help & Support</h1>
        <p className="text-sm text-gray-500 mt-0.5">Find answers or contact our support team</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { icon: '📞', label: 'Call Us', value: '16789', sub: 'Mon–Sat, 9am–6pm' },
          { icon: '✉️', label: 'Email', value: 'support@nagorikbhumi.gov.bd', sub: 'Response within 24 hrs' },
          { icon: '💬', label: 'Live Chat', value: 'Start Chat', sub: 'Available now', action: true },        ].map((c, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-xl p-5 flex items-center gap-4 hover:shadow-sm transition-shadow">
            <div className="w-12 h-12 bg-brand-light rounded-xl flex items-center justify-center text-2xl">{c.icon}</div>
            <div>
              <p className="text-xs text-gray-500">{c.label}</p>
              <p className={`font-semibold text-sm mt-0.5 ${c.action ? 'text-brand cursor-pointer hover:underline' : 'text-gray-800'}`}
               onClick={c.action ? () => window.open('mailto:support@nagorikbhumi.gov.bd?subject=Live Chat Request', '_blank') : undefined}>
              {c.value}
            </p>
              <p className="text-xs text-gray-400 mt-0.5">{c.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* FAQs */}
        <div>
          <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            Frequently Asked Questions
          </h2>
          <div className="space-y-2">
            {faqs.map((f, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-xl overflow-hidden">
                <button onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors">
                  <span className="text-sm font-medium text-gray-800">{f.q}</span>
                  <svg className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ${open === i ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
                </button>
                {open === i && (
                  <div className="px-4 pb-3 border-t border-gray-50">
                    <p className="text-xs text-gray-600 pt-3 leading-relaxed">{f.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact form */}
        <div>
          <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            Submit a Support Ticket
          </h2>
          <div className="bg-white border border-gray-100 rounded-xl p-5">
            {sent && (
              <div className="mb-4 bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-lg flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                Ticket submitted! We'll get back to you within 24 hours.
              </div>
            )}
            <form onSubmit={handleSend} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Subject</label>
                <input type="text" value={ticket.subject} onChange={e => setTicket({...ticket, subject: e.target.value})}
                  placeholder="Brief description of your issue" required
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"/>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Message</label>
                <textarea rows={5} value={ticket.message} onChange={e => setTicket({...ticket, message: e.target.value})}
                  placeholder="Describe your issue in detail..." required
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand resize-none"/>
              </div>
              <button type="submit" className="w-full bg-brand hover:bg-brand-dark text-white text-sm font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
                Send Ticket
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
