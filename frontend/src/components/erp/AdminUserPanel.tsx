// ─── ADMIN USER MANAGEMENT PANEL ──────────────────────────────────────────────
// Database-backed user management: list, create, filter, and manage accounts.
// Only accessible to authorized admin role users.

import React, { useState, useEffect, useCallback } from 'react';
import {
  Users, UserPlus, ShieldCheck, RefreshCw,
  CheckCircle, AlertTriangle, Search
} from 'lucide-react';
import { fetchERPUsers, createERPUserDB } from '../../services/api';

const RoleBadge: React.FC<{ role: string }> = ({ role }) => {
  const colors: Record<string, string> = {
    admin:   'bg-red-500/20 text-red-300 border-red-500/40',
    teacher: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    parent:  'bg-amber-500/20 text-amber-300 border-amber-500/40',
    student: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${colors[role] || colors.student}`}>
      {role.charAt(0).toUpperCase() + role.slice(1)}
    </span>
  );
};

// ─── CREATE USER FORM ─────────────────────────────────────────────────────────
const CreateUserForm: React.FC<{ onCreated: (msg: string) => void }> = ({ onCreated }) => {
  const [form, setForm] = useState({
    name: '', email: '', password: '', portalId: '',
    role: 'student' as 'student' | 'parent' | 'teacher' | 'admin',
    grade: '', parentName: '',
  });
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  const handleChange = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password || !form.name || !form.portalId) {
      setError('Name, Email, Portal ID, and Password are required.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await createERPUserDB(form);
      if (res?.success) {
        onCreated(`✅ Account created for "${form.name}" (${form.role}).`);
        setForm({ name: '', email: '', password: '', portalId: '', role: 'student', grade: '', parentName: '' });
      } else {
        setError(res?.message || 'Failed to create user.');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to connect to database.');
    } finally {
      setLoading(false);
    }
  };

  const inputCls = 'w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500 transition-colors';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-slate-400 mb-1">Full Name *</label>
          <input className={inputCls} placeholder="e.g. Aarav Sharma" value={form.name} onChange={handleChange('name')} />
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-1">Portal ID *</label>
          <input className={inputCls} placeholder="e.g. VVS-2026-001" value={form.portalId} onChange={handleChange('portalId')} />
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-1">Email Address *</label>
          <input type="email" className={inputCls} placeholder="user@vasantvalley.edu.in" value={form.email} onChange={handleChange('email')} />
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-1">Password *</label>
          <input type="password" className={inputCls} placeholder="Min. 6 characters" value={form.password} onChange={handleChange('password')} />
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-1">Role *</label>
          <select className={inputCls} value={form.role} onChange={handleChange('role')}>
            <option value="student">Student</option>
            <option value="parent">Parent</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        {form.role === 'student' && (
          <div>
            <label className="block text-xs text-slate-400 mb-1">Grade / Class</label>
            <input className={inputCls} placeholder="e.g. Class X-A" value={form.grade} onChange={handleChange('grade')} />
          </div>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
          <AlertTriangle size={14} /> {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-700 rounded-xl text-sm font-semibold text-white hover:from-red-500 hover:to-red-600 transition-all disabled:opacity-50 cursor-pointer"
      >
        {loading ? <RefreshCw size={14} className="animate-spin" /> : <UserPlus size={14} />}
        {loading ? 'Saving to DB...' : 'Create ERP User Account'}
      </button>
    </form>
  );
};

// ─── MAIN ADMIN USER PANEL ────────────────────────────────────────────────────
export const AdminUserPanel: React.FC = () => {
  const [users,     setUsers]     = useState<any[]>([]);
  const [filtered,  setFiltered]  = useState<any[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [tab,       setTab]       = useState<'list' | 'create'>('list');
  const [search,    setSearch]    = useState('');
  const [roleFilter,setRoleFilter]= useState('all');
  const [toast,     setToast]     = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 4000);
  };

  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchERPUsers();
      setUsers(data.users || []);
    } catch {
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadUsers(); }, [loadUsers]);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      users.filter(u =>
        (roleFilter === 'all' || u.role === roleFilter) &&
        (u.name?.toLowerCase().includes(q) ||
         u.email?.toLowerCase().includes(q) ||
         u.portalId?.toLowerCase().includes(q))
      )
    );
  }, [users, search, roleFilter]);

  const tabs = [
    { id: 'list',   label: 'All Database Users', icon: <Users size={14} /> },
    { id: 'create', label: 'Create New Account', icon: <UserPlus size={14} /> },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-slate-800 border border-slate-600 text-white text-sm px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-pulse">
          <CheckCircle size={14} className="text-emerald-400" /> {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <ShieldCheck size={20} className="text-red-400" /> System User Management (Database)
          </h3>
          <p className="text-sm text-slate-400 mt-0.5">Manage student, teacher, parent, and admin accounts in MongoDB</p>
        </div>
        <button onClick={loadUsers} className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-lg transition-colors cursor-pointer">
          <RefreshCw size={12} /> Refresh DB
        </button>
      </div>

      {/* Tab Bar */}
      <div className="flex gap-2">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
              tab === t.id
                ? 'bg-red-600 text-white shadow-lg'
                : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
            }`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* ── TAB: USER LIST ─────────────────────────────────────── */}
      {tab === 'list' && (
        <div className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-8 pr-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                placeholder="Search by name, email, or portal ID..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <select
              className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500"
              value={roleFilter}
              onChange={e => setRoleFilter(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="student">Students</option>
              <option value="parent">Parents</option>
              <option value="teacher">Teachers</option>
              <option value="admin">Admins</option>
            </select>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {['student','parent','teacher','admin'].map(r => (
              <div key={r} className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-3 text-center">
                <div className="text-xl font-bold text-white">{users.filter(u=>u.role===r).length}</div>
                <RoleBadge role={r} />
              </div>
            ))}
          </div>

          {/* User Table */}
          {loading ? (
            <div className="flex justify-center py-12 text-slate-400">
              <RefreshCw size={20} className="animate-spin mr-2" /> Querying users from database...
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <Users size={32} className="mx-auto mb-3 opacity-30" />
              <p>No user records found matching your filter criteria.</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-slate-700">
              <table className="w-full text-sm">
                <thead className="bg-slate-800/80">
                  <tr>
                    {['Name / Portal ID','Role','Grade / Roll','Email'].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {filtered.map((u, i) => (
                    <tr key={u.portalId || i} className="hover:bg-slate-800/40 transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-medium text-white">{u.name}</div>
                        <div className="text-xs text-slate-500 font-mono">{u.portalId}</div>
                      </td>
                      <td className="px-4 py-3"><RoleBadge role={u.role} /></td>
                      <td className="px-4 py-3 text-xs text-slate-300">{u.grade || 'N/A'} • {u.rollNo || 'N/A'}</td>
                      <td className="px-4 py-3 text-slate-400 text-xs font-mono">{u.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ── TAB: CREATE USER ───────────────────────────────────── */}
      {tab === 'create' && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
          <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
            <UserPlus size={16} className="text-red-400" /> Create New ERP Account
          </h4>
          <CreateUserForm onCreated={msg => { showToast(msg); setTab('list'); loadUsers(); }} />
        </div>
      )}
    </div>
  );
};
