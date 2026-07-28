import React, { useState } from 'react';
import { submitContactForm } from '../../services/api';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { contactContent } from '../../content/contactContent';

// ─── CONTACT SECTION ──────────────────────────────────────────────────────────
// All text, contact details, and form subject options are managed in:
//   src/content/contactContent.ts
// Edit that file to update address, phone, email, and working hours.

// Icon map — maps the order of contactContent.details to their Lucide icons
const detailIcons = [
  <MapPin size={20} style={{ color: '#F04424' }} />,
  <Phone size={20} style={{ color: '#F04424' }} />,
  <Mail size={20} style={{ color: '#F04424' }} />,
  <Clock size={20} style={{ color: '#F04424' }} />,
];

export const ContactSection: React.FC = () => {
  const c = contactContent;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<{ success: boolean; message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus(null);
    const res = await submitContactForm(formData);
    setIsSubmitting(false);
    setSubmissionStatus(res);
    if (res.success) {
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }
  };

  return (
    // ── id="contact" — anchor target for Header "Contact Us" nav link ─────────
    <section id="contact" className="ent-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header — text from contactContent.sectionBadge / sectionTitle / sectionSubtitle */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="ent-badge">{c.sectionBadge}</span>
          <h2 className="ent-section-title mt-3">{c.sectionTitle}</h2>
          <p className="ent-section-subtitle">{c.sectionSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* ── Contact Details Panel ──────────────────────────────────────── */}
          <div
            className="lg:col-span-5 p-8 sm:p-10 rounded-2xl flex flex-col justify-between space-y-8"
            style={{ background: '#1F1F1F', border: '1px solid #2a2a2a' }}
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-bold" style={{ color: '#FFFFFF' }}>Reach Us Directly</h3>
              <p className="text-xs leading-relaxed" style={{ color: '#777777' }}>
                Visit our campus or get in touch with our helpdesk for immediate assistance.
              </p>

              {/* Contact Detail Items — data from contactContent.details[] */}
              <div className="space-y-4 text-sm" style={{ color: '#ECECEC' }}>
                {c.details.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="p-3 rounded-xl shrink-0" style={{ background: item.accent }}>
                      {detailIcons[idx]}
                    </div>
                    <div>
                      <strong className="block font-semibold text-xs mb-0.5" style={{ color: '#FFFFFF' }}>
                        {item.label}
                      </strong>
                      <span className="text-xs" style={{ color: '#777777' }}>{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Transport Note — from contactContent.transportNote */}
            <div
              className="p-4 rounded-xl text-xs"
              style={{ background: '#2a2a2a', border: '1px solid #333', color: '#ECECEC' }}
            >
              <strong className="block mb-1" style={{ color: '#F04424' }}>📍 Transport & Connectivity:</strong>
              {c.transportNote}
            </div>
          </div>

          {/* ── Inquiry Form ───────────────────────────────────────────────── */}
          <div className="lg:col-span-7 ent-card p-8 sm:p-10">
            <h3 className="text-2xl font-bold mb-1" style={{ color: '#111111' }}>Send an Enquiry Message</h3>
            <p className="text-xs mb-6" style={{ color: '#777777' }}>Our admin department will respond within 24 hours.</p>

            {submissionStatus && (
              <div
                className="p-4 rounded-xl mb-6 text-sm flex items-center gap-3"
                style={{
                  background: 'rgba(240,68,36,0.06)',
                  border: '1px solid rgba(240,68,36,0.2)',
                  color: '#111111'
                }}
              >
                <CheckCircle size={18} style={{ color: '#F04424' }} />
                <span>{submissionStatus.message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="ent-label">Your Full Name *</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleChange}
                    placeholder="John Doe" className="ent-input" />
                </div>
                <div>
                  <label className="ent-label">Email Address *</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleChange}
                    placeholder="john@example.com" className="ent-input" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="ent-label">Phone Number *</label>
                  <input type="tel" name="phone" required value={formData.phone} onChange={handleChange}
                    placeholder="+91 98765 43210" className="ent-input" />
                </div>
                <div>
                  <label className="ent-label">Inquiry Subject *</label>
                  {/* Subject options — from contactContent.subjectOptions[] */}
                  <select name="subject" required value={formData.subject} onChange={handleChange} className="ent-input">
                    <option value="">Select Subject</option>
                    {c.subjectOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="ent-label">Detailed Message *</label>
                <textarea name="message" required rows={4} value={formData.message} onChange={handleChange}
                  placeholder="Type your message here..."
                  className="ent-input" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full justify-center py-3.5 text-sm uppercase tracking-wider disabled:opacity-50"
              >
                {isSubmitting ? 'Sending Message...' : 'Submit Inquiry'} <Send size={16} />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};
