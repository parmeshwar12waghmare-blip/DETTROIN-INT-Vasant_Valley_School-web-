import React, { useState } from 'react';
import type { StudentUser } from '../../services/erpApi';
import { UserPlus, Trash2, Users, Shield, GraduationCap } from 'lucide-react';

interface StudentManagerProps {
  students: StudentUser[];
  onAddStudent: (formData: Partial<StudentUser>) => void;
  onRemoveStudent: ((id: string) => void) | null;
  userRole: 'admin' | 'teacher';
}

export const StudentManager: React.FC<StudentManagerProps> = ({
  students,
  onAddStudent,
  onRemoveStudent,
  userRole
}) => {
  const isAdmin = userRole === 'admin';
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rollNo: '',
    grade: 'Class X-A'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    onAddStudent(formData);
    setFormData({ name: '', email: '', rollNo: '', grade: 'Class X-A' });
    setShowAddModal(false);
  };

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-2xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2 text-slate-100">
            <Users className="text-indigo-400" size={22} />
            Student Database Directory ({students.length})
          </h2>
          <p className="text-xs text-slate-400">
            {isAdmin 
              ? 'Admin Privileges: Add new student records or remove existing active profiles' 
              : 'Teacher Privileges: Add new student records to department roster'}
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(!showAddModal)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-indigo-600/30 transition-all"
        >
          <UserPlus size={16} />
          Add Student Record
        </button>
      </div>

      {showAddModal && (
        <form onSubmit={handleSubmit} className="mb-6 p-6 rounded-xl bg-slate-950/80 border border-indigo-500/30">
          <h3 className="text-sm font-bold text-slate-100 mb-4 flex items-center gap-2">
            <GraduationCap className="text-indigo-400" size={18} />
            Register New Student Profile (Added by {userRole.toUpperCase()})
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Student Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Sanya Kapoor"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Email Address *</label>
              <input
                type="email"
                required
                placeholder="e.g. sanya@vasantvalley.edu.in"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Roll Number</label>
              <input
                type="text"
                placeholder="e.g. 2026-110"
                value={formData.rollNo}
                onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Grade / Class</label>
              <select
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 outline-none focus:border-indigo-500"
              >
                <option value="Class X-A">Class X-A</option>
                <option value="Class X-B">Class X-B</option>
                <option value="Class XI Science">Class XI Science</option>
                <option value="Class XII Commerce">Class XII Commerce</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-md shadow-emerald-600/30"
            >
              Save Student Record
            </button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full text-left text-sm text-slate-300 border-collapse">
          <thead className="bg-slate-950/80 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
            <tr>
              <th className="p-4">Roll No & ID</th>
              <th className="p-4">Student Name</th>
              <th className="p-4">Email Address</th>
              <th className="p-4">Grade / Class</th>
              <th className="p-4">Added By</th>
              {isAdmin && <th className="p-4">Admin Action</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {students.map((student, idx) => (
              <tr key={student._id || student.id || idx} className="hover:bg-slate-800/30 transition-colors">
                <td className="p-4">
                  <div className="font-bold text-indigo-400">{student.rollNo || '2026-100'}</div>
                  <div className="text-xs text-slate-500">{student.portalId || student._id}</div>
                </td>
                <td className="p-4 font-semibold text-slate-100">{student.name}</td>
                <td className="p-4 text-xs text-slate-300">{student.email}</td>
                <td className="p-4 text-xs font-medium text-cyan-300">{student.grade || 'Class X'}</td>
                <td className="p-4 text-xs text-slate-400">
                  <span className="inline-flex items-center gap-1">
                    <Shield size={12} className="text-indigo-400" />
                    {student.addedBy || 'System'}
                  </span>
                </td>
                {isAdmin && (
                  <td className="p-4">
                    <button
                      onClick={() => onRemoveStudent && onRemoveStudent(student._id || student.id || '')}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-rose-500/10 text-rose-400 border border-rose-500/30 hover:bg-rose-600 hover:text-white rounded-lg text-xs font-medium transition-all"
                      title="Remove Student Record (Admin Privilege)"
                    >
                      <Trash2 size={14} /> Remove
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
