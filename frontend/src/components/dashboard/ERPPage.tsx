import React, { useState, useEffect } from 'react';
import { erpApi } from '../../services/erpApi';
import type { InquiryItem, ApplicationItem, StudentUser } from '../../services/erpApi';
import { AdminERPPage } from './AdminERPPage';
import { TeacherERPPage } from './TeacherERPPage';
import { StudentPortalPage } from './StudentPortalPage';
import { 
  Building2, 
  ShieldCheck, 
  UserCheck, 
  GraduationCap, 
  Mail, 
  FileText, 
  Users,
  CheckCircle2
} from 'lucide-react';

export const ERPPage: React.FC = () => {
  const [role, setRole] = useState<'admin' | 'teacher' | 'student'>('admin');
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [applications, setApplications] = useState<ApplicationItem[]>([]);
  const [students, setStudents] = useState<StudentUser[]>([]);
  const [toastMsg, setToastMsg] = useState('');

  // Fetch real data from backend API
  useEffect(() => {
    const loadBackendData = async () => {
      const inqData = await erpApi.getInquiries();
      const appData = await erpApi.getApplications();
      const stuData = await erpApi.getStudents();

      setInquiries(inqData);
      setApplications(appData);
      setStudents(stuData);
    };
    loadBackendData();
  }, []);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 4000);
  };

  const handleDeleteInquiry = async (id: string) => {
    await erpApi.deleteInquiry(id);
    setInquiries(prev => prev.filter(i => (i._id || i.id) !== id));
    triggerToast('Inquiry deleted from backend database');
  };

  const handleToggleActivation = async (app: ApplicationItem) => {
    const nextStatus = app.activationStatus === 'Active' ? 'Pending Activation' : 'Active';
    
    // Update local state for immediate feedback
    setApplications(prev => prev.map(a => 
      (a._id === app._id || a.id === app.id) ? { ...a, activationStatus: nextStatus } : a
    ));

    await erpApi.toggleApplicationActivation(app);

    // If activating, add student record to student directory if not present
    if (nextStatus === 'Active') {
      const updatedStudents = await erpApi.addStudent({
        name: app.studentName,
        email: app.email,
        grade: app.grade || 'Class X',
        rollNo: `2026-${Math.floor(100 + Math.random() * 900)}`
      }, 'Admin Activation');
      setStudents(updatedStudents);
    }

    triggerToast(`Student ${app.studentName} is now ${nextStatus.toUpperCase()}`);
  };

  const handleAddStudent = async (formData: Partial<StudentUser>) => {
    const updatedStudents = await erpApi.addStudent(formData, role);
    setStudents(updatedStudents);
    triggerToast(`Student record for ${formData.name} added successfully!`);
  };

  const handleRemoveStudent = async (id: string) => {
    await erpApi.removeStudent(id);
    setStudents(prev => prev.filter(s => (s._id || s.id) !== id));
    triggerToast('Student record removed from ERP system');
  };

  const pendingInquiriesCount = inquiries.filter(i => (i.status || 'Pending') === 'Pending').length;
  const pendingAppsCount = applications.filter(a => a.activationStatus !== 'Active').length;

  return (
    <div id="erp" className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 selection:bg-indigo-500 selection:text-white">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Toast Alert */}
        {toastMsg && (
          <div className="fixed top-6 right-6 z-50 p-4 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-sm flex items-center gap-3 shadow-2xl shadow-emerald-500/20">
            <CheckCircle2 size={20} />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* Glass Header & Role Switcher */}
        <header className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
              <Building2 size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                Vasant Valley ERP Portal
              </h1>
              <p className="text-xs text-slate-400">Read Backend Database • Enquiries • Applications Activation • Student Portal</p>
            </div>
          </div>

          <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-slate-800 gap-1 w-full md:w-auto">
            <button
              onClick={() => setRole('admin')}
              className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                role === 'admin' 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <ShieldCheck size={16} /> Admin ERP
            </button>

            <button
              onClick={() => setRole('teacher')}
              className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                role === 'teacher' 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <UserCheck size={16} /> Teacher ERP
            </button>

            <button
              onClick={() => setRole('student')}
              className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                role === 'student' 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <GraduationCap size={16} /> Student Portal
            </button>
          </div>
        </header>

        {/* Top ERP Database Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <Mail size={24} />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-100">{pendingInquiriesCount}</div>
              <div className="text-xs text-slate-400">Pending Admission Enquiries</div>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <FileText size={24} />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-100">{pendingAppsCount}</div>
              <div className="text-xs text-slate-400">Applications Awaiting Activation</div>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Users size={24} />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-100">{students.length}</div>
              <div className="text-xs text-slate-400">Active Enrolled Students</div>
            </div>
          </div>
        </div>

        {/* Dynamic Page Structure Views */}
        <main className="space-y-6">
          {role === 'admin' && (
            <AdminERPPage
              inquiries={inquiries}
              applications={applications}
              students={students}
              onDeleteInquiry={handleDeleteInquiry}
              onToggleActivation={handleToggleActivation}
              onAddStudent={handleAddStudent}
              onRemoveStudent={handleRemoveStudent}
            />
          )}

          {role === 'teacher' && (
            <TeacherERPPage
              students={students}
              onAddStudent={handleAddStudent}
            />
          )}

          {role === 'student' && (
            <StudentPortalPage
              applications={applications}
            />
          )}
        </main>

      </div>
    </div>
  );
};

export default ERPPage;
