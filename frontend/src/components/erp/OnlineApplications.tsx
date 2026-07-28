import React, { useState } from 'react';
import type { ApplicationItem } from '../../services/erpApi';
import { FileText, CheckCircle, ShieldAlert, Power, UserCheck } from 'lucide-react';

interface OnlineApplicationsProps {
  applications: ApplicationItem[];
  onToggleActivation: (app: ApplicationItem) => void;
}

export const OnlineApplications: React.FC<OnlineApplicationsProps> = ({ applications, onToggleActivation }) => {
  const [filter, setFilter] = useState<'All' | 'Active' | 'Pending'>('All');

  const filtered = applications.filter(app => {
    const isActive = app.activationStatus === 'Active';
    if (filter === 'Active') return isActive;
    if (filter === 'Pending') return !isActive;
    return true;
  });

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-2xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2 text-slate-100">
            <FileText className="text-indigo-400" size={22} />
            Student Online Applications ({applications.length})
          </h2>
          <p className="text-xs text-slate-400">Review submitted online applications and toggle Admin status activation</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setFilter('All')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filter === 'All' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            All Apps ({applications.length})
          </button>
          <button
            onClick={() => setFilter('Active')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filter === 'Active' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('Pending')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filter === 'Pending' ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Pending Activation
          </button>
        </div>
      </div>

      <div className="mb-6 p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs flex items-center gap-3">
        <UserCheck size={20} className="shrink-0" />
        <div>
          <span className="font-bold">Admin Activation Privilege:</span> When you activate a student application, the status updates live across the system and enables the student's ERP portal activation badge.
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full text-left text-sm text-slate-300 border-collapse">
          <thead className="bg-slate-950/80 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
            <tr>
              <th className="p-4">Student Credentials</th>
              <th className="p-4">Parent / Guardian</th>
              <th className="p-4">Grade Applied</th>
              <th className="p-4">Previous School</th>
              <th className="p-4">Activation Status</th>
              <th className="p-4">Admin Control</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {filtered.map((app, idx) => {
              const isActive = app.activationStatus === 'Active';
              return (
                <tr key={app._id || app.id || idx} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4">
                    <div className="font-semibold text-slate-100">{app.studentName}</div>
                    <div className="text-xs text-slate-400">{app.email}</div>
                    <div className="text-xs text-indigo-400 mt-1 font-mono">
                      Password: <code>{app.password || 'pass123'}</code>
                    </div>
                  </td>
                  <td className="p-4 text-xs">
                    <div className="text-slate-200">{app.parentName || 'N/A'}</div>
                    <div className="text-slate-400">{app.phone || 'N/A'}</div>
                  </td>
                  <td className="p-4 text-xs font-semibold text-cyan-300">{app.grade || 'Class X'}</td>
                  <td className="p-4 text-xs text-slate-400">{app.previousSchool || 'N/A'}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                      isActive 
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm shadow-emerald-500/20' 
                        : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                    }`}>
                      {isActive ? <CheckCircle size={12} /> : <ShieldAlert size={12} />}
                      {isActive ? 'Active' : 'Pending Activation'}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => onToggleActivation(app)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-600 hover:text-white'
                          : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-md shadow-emerald-600/30'
                      }`}
                    >
                      <Power size={14} />
                      {isActive ? 'Deactivate Status' : 'Activate Status'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
