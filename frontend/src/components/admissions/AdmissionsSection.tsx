import React, { useState } from 'react';
import { submitAdmissionForm } from '../../services/api';
import type { AdmissionApplication } from '../../types';
import { Send, CheckCircle, FileText, DollarSign, HelpCircle, UserCheck } from 'lucide-react';
import { admissionsContent } from '../../content/admissionsContent.tsx';

const stepIcons = [
  <FileText style={{ color: '#F04424' }} size={20} />,
  <CheckCircle style={{ color: '#F04424' }} size={20} />,
  <UserCheck style={{ color: '#F04424' }} size={20} />,
  <DollarSign style={{ color: '#F04424' }} size={20} />,
];

export const AdmissionsSection: React.FC = () => {
  const c = admissionsContent;
  const [formData, setFormData] = useState<AdmissionApplication>({
    studentName: '', parentName: '', email: '', phone: '',
    grade: 'Nursery', previousSchool: '', message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{ success: boolean; message: string; id?: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionResult(null);
    const res = await submitAdmissionForm(formData);
    setIsSubmitting(false);
    setSubmissionResult(res);
    if (res.success) setFormData({ studentName: '', parentName: '', email: '', phone: '', grade: 'Nursery', previousSchool: '', message: '' });
  };

  return (
    <section id="admissions" className="ent-section-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="ent-badge">{c.sectionBadge}</span>
          <h2 className="ent-section-title mt-3">{c.sectionTitle}</h2>
          <p className="ent-section-subtitle">{c.sectionSubtitle}</p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-16">
          {c.steps.map((item, idx) => (
            <div key={idx} className="ent-card p-6 relative overflow-hidden">
              <div className="text-5xl font-black absolute right-4 top-2 select-none" style={{ color: '#ECECEC' }}>{item.step}</div>
              <div className="relative z-10 space-y-2">
                <div className="p-2 rounded-lg inline-block mb-3" style={{ background: 'rgba(240,68,36,0.08)' }}>{stepIcons[idx]}</div>
                <h4 className="font-bold text-base" style={{ color: '#111111' }}>{item.title}</h4>
                <p className="text-xs leading-relaxed" style={{ color: '#777777' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Form + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 ent-card p-8 sm:p-10">
            <h3 className="text-2xl font-bold mb-1" style={{ color: '#111111' }}>Online Application Form</h3>
            <p className="text-xs mb-6" style={{ color: '#777777' }}>Fields marked with * are mandatory.</p>

            {submissionResult && (
              <div className="p-4 rounded-xl mb-6 text-sm flex items-start gap-3"
                style={{ background: 'rgba(240,68,36,0.06)', border: '1px solid rgba(240,68,36,0.2)', color: '#111111' }}>
                <CheckCircle size={19} style={{ color: '#F04424' }} className="shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-semibold">{submissionResult.message}</strong>
                  {submissionResult.id && <span className="text-xs" style={{ color: '#F04424' }}>Reference ID: {submissionResult.id}</span>}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="ent-label">Student Full Name *</label>
                  <input type="text" name="studentName" required value={formData.studentName} onChange={handleChange} placeholder="e.g. Aarav Sharma" className="ent-input" /></div>
                <div><label className="ent-label">Parent / Guardian Name *</label>
                  <input type="text" name="parentName" required value={formData.parentName} onChange={handleChange} placeholder="e.g. Rajesh Sharma" className="ent-input" /></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="ent-label">Email Address *</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="rajesh@example.com" className="ent-input" /></div>
                <div><label className="ent-label">Phone Number *</label>
                  <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" className="ent-input" /></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="ent-label">Seeking Grade *</label>
                  <select name="grade" value={formData.grade} onChange={handleChange} className="ent-input">
                    {c.gradeOptions.map(g => <option key={g.value} value={g.value}>{g.label}</option>)}
                  </select></div>
                <div><label className="ent-label">Previous School (If Any)</label>
                  <input type="text" name="previousSchool" value={formData.previousSchool} onChange={handleChange} placeholder="Name of current school" className="ent-input" /></div>
              </div>
              <div><label className="ent-label">Additional Notes / Special Requirements</label>
                <textarea name="message" rows={3} value={formData.message} onChange={handleChange}
                  placeholder="Tell us about your child's interests..." className="ent-input" /></div>
              <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center py-4 text-sm uppercase tracking-wider disabled:opacity-50">
                {isSubmitting ? 'Submitting...' : 'Submit Admission Application'} <Send size={16} />
              </button>
            </form>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            <div className="ent-card-dark p-8 rounded-2xl space-y-4">
              <h4 className="text-xl font-bold" style={{ color: '#FFD47D' }}>Eligibility Criteria</h4>
              <ul className="text-xs space-y-3 leading-relaxed" style={{ color: '#ECECEC' }}>
                {c.eligibility.map((e, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span style={{ color: '#F04424' }} className="font-bold mt-0.5">•</span>
                    <span><strong>{e.grade}:</strong> {e.rule}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 rounded-2xl space-y-3" style={{ background: 'rgba(240,68,36,0.05)', border: '1px solid rgba(240,68,36,0.15)' }}>
              <h4 className="text-lg font-bold flex items-center gap-2" style={{ color: '#111111' }}>
                <HelpCircle size={20} style={{ color: '#F04424' }} /> Have Admission Queries?
              </h4>
              <p className="text-xs leading-relaxed" style={{ color: '#555555' }}>{c.contact.helpText}</p>
              <div className="pt-1 text-xs font-semibold space-y-1" style={{ color: '#F04424' }}>
                <p>Direct Admissions Desk: {c.contact.phone}</p>
                <p>Email: {c.contact.email}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
