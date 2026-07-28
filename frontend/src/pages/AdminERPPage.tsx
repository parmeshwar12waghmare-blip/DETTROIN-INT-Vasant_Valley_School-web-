import React, { useState } from 'react';
import type { InquiryItem, ApplicationItem, StudentUser } from '../services/erpApi';
import { EnquiriesList } from '../components/erp/EnquiriesList';
import { OnlineApplications } from '../components/erp/OnlineApplications';
import { StudentManager } from '../components/erp/StudentManager';
import { Mail, FileText, Users } from 'lucide-react';

interface AdminERPPageProps {
  inquiries: InquiryItem[];
  applications: ApplicationItem[];
  students: StudentUser[];
  onDeleteInquiry: (id: string) => void;
  onToggleActivation: (app: ApplicationItem) => void;
  onAddStudent: (formData: Partial<StudentUser>) => void;
  onRemoveStudent: (id: string) => void;
}

export const AdminERPPage: React.FC<AdminERPPageProps> = ({
  inquiries,
  applications,
  students,
  onDeleteInquiry,
  onToggleActivation,
  onAddStudent,
  onRemoveStudent
}) => {
  const [activeTab, setActiveTab] = useState<'enquiries' | 'applications' | 'students'>('enquiries');

  const pendingInquiriesCount = inquiries.filter(i => (i.status || 'Pending') === 'Pending').length;
  const pendingAppsCount = applications.filter(a => a.activationStatus !== 'Active').length;

  return (
    <div>
      {/* Navigation Tabs */}
      <div className="flex gap-2 border-b border-slate-800 pb-3 mb-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab('enquiries')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'enquiries'
              ? 'bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 shadow-md shadow-indigo-500/10'
              : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Mail size={16} /> Check Admission Enquiries ({pendingInquiriesCount} Pending)
        </button>

        <button
          onClick={() => setActiveTab('applications')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'applications'
              ? 'bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 shadow-md shadow-indigo-500/10'
              : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileText size={16} /> Online Applications & Activation ({pendingAppsCount} Pending)
        </button>

        <button
          onClick={() => setActiveTab('students')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'students'
              ? 'bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 shadow-md shadow-indigo-500/10'
              : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Users size={16} /> Manage Student Directory ({students.length})
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'enquiries' && (
        <EnquiriesList inquiries={inquiries} onDeleteInquiry={onDeleteInquiry} />
      )}

      {activeTab === 'applications' && (
        <OnlineApplications applications={applications} onToggleActivation={onToggleActivation} />
      )}

      {activeTab === 'students' && (
        <StudentManager
          students={students}
          onAddStudent={onAddStudent}
          onRemoveStudent={onRemoveStudent}
          userRole="admin"
        />
      )}
    </div>
  );
};
