import React, { useState, useEffect } from 'react';
import {
  User,
  LogOut,
  Database,
  Calendar,
  Award,
  BookOpen,
  CreditCard,
  Bell,
  RefreshCw,
  Search,
  CheckCircle,
  Play,
  Clock,
  ShieldCheck,
  Sparkles,
  Download,
  Users
} from 'lucide-react';
import type { ERPUser, ERPQueryResult } from '../../types';
import { queryERPDatabase, syncERPDatabase } from '../../services/api';
import { AdminUserPanel } from './AdminUserPanel';

interface ERPDashboardProps {
  user: ERPUser;
  onLogout: () => void;
}

export const ERPDashboard: React.FC<ERPDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'queries' | 'academics' | 'fees' | 'timetable' | 'admin'>('overview');
  const [activeRole, setActiveRole] = useState<'student' | 'parent' | 'teacher' | 'admin'>(user.role || 'student');
  
  // Database Query State
  const [selectedQueryType, setSelectedQueryType] = useState<string>('academics');
  const [customQueryFilter, setCustomQueryFilter] = useState<string>('');
  const [queryResult, setQueryResult] = useState<ERPQueryResult | null>(null);
  const [isQuerying, setIsQuerying] = useState<boolean>(false);
  const [syncStatus, setSyncStatus] = useState<string>('Database Connected (MongoDB)');
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  // Run database query
  const handleExecuteQuery = async (type?: string) => {
    const targetType = type || selectedQueryType;
    setIsQuerying(true);
    try {
      const res = await queryERPDatabase(targetType, user.portalId, customQueryFilter);
      setQueryResult(res);
    } catch (err) {
      console.error('Query execution error:', err);
    } finally {
      setIsQuerying(false);
    }
  };

  // Sync database manually
  const handleSyncDatabase = async () => {
    setIsSyncing(true);
    try {
      await syncERPDatabase();
      setSyncStatus('Database Re-synchronized at ' + new Date().toLocaleTimeString());
      await handleExecuteQuery();
    } catch (err) {
      setSyncStatus('Local Storage Sync Active');
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    handleExecuteQuery('academics');
  }, [user.portalId]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* ── Top Bar ──────────────────────────────────────────────────────── */}
      <header className="bg-slate-950/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40 px-4 lg:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-red-500/20">
            V
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-white tracking-wide">Vasant Valley ERP</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live DB Sync
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">ID: {user.portalId} • {user.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Quick Role Switcher for Testing Demo */}
          <div className="hidden sm:flex items-center bg-slate-800/80 p-1 rounded-xl border border-slate-700">
            {(['student', 'parent', 'teacher', 'admin'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setActiveRole(r)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition ${
                  activeRole === r
                    ? 'bg-red-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition cursor-pointer"
          >
            <LogOut size={14} /> Exit ERP
          </button>
        </div>
      </header>

      {/* ── Main Layout Body ────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 bg-slate-950/40 border-r border-slate-800/80 p-4 space-y-1">
          <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Portal Menu
          </div>

          {[
            { id: 'overview',  label: 'Dashboard Overview',       icon: User },
            { id: 'queries',   label: 'Database & Queries',        icon: Database },
            { id: 'academics', label: 'Academic Grades',           icon: Award },
            { id: 'fees',      label: 'Fee Payments & Sync',       icon: CreditCard },
            { id: 'timetable', label: 'Class Timetable',           icon: Calendar },
            ...(user.role === 'admin' ? [{ id: 'admin', label: 'User Management', icon: Users }] : []),
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-red-600/90 to-red-700/80 text-white border border-red-500/40 shadow-lg shadow-red-600/10'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-white' : 'text-slate-400'} />
                {item.label}
              </button>
            );
          })}

          <div className="pt-6">
            <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-700/50 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-300 font-bold">
                <span>Database Sync</span>
                <ShieldCheck size={14} className="text-emerald-400" />
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">{syncStatus}</p>
              <button
                onClick={handleSyncDatabase}
                disabled={isSyncing}
                className="w-full mt-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[11px] font-bold bg-slate-700/60 hover:bg-slate-700 text-slate-200 border border-slate-600 transition cursor-pointer disabled:opacity-50"
              >
                <RefreshCw size={12} className={isSyncing ? 'animate-spin' : ''} />
                {isSyncing ? 'Syncing DB...' : 'Sync Queries'}
              </button>
            </div>
          </div>
        </aside>

        {/* Dynamic Content Panel */}
        <main className="flex-1 p-4 md:p-8 space-y-6 overflow-y-auto">
          {/* ── TAB 1: OVERVIEW ──────────────────────────────────────────────── */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Profile Greeting Banner */}
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-red-950/60 border border-slate-800 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/20">
                      <Sparkles size={12} /> Active ERP Session
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                      Welcome back, {user.name}!
                    </h2>
                    <p className="text-sm text-slate-400">
                      {activeRole === 'student' && `Grade: ${user.grade} • Roll No: ${user.rollNo}`}
                      {activeRole === 'parent' && `Parent Portal Access • Student Ward: Aarav (${user.grade})`}
                      {activeRole === 'teacher' && `Faculty Portal • Department: Senior Mathematics`}
                      {activeRole === 'admin' && `Super Admin Console • Database Query Control Enabled`}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="px-4 py-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-center">
                      <p className="text-xs text-slate-400">Attendance</p>
                      <p className="text-xl font-black text-emerald-400">{user.attendanceRate}%</p>
                    </div>
                    <div className="px-4 py-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-center">
                      <p className="text-xs text-slate-400">Fee Clearance</p>
                      <p className="text-xl font-black text-amber-400">{user.feeStatus}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700/60 space-y-2">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
                    <span>Overall Grade Point</span>
                    <Award size={16} className="text-red-400" />
                  </div>
                  <p className="text-2xl font-bold text-white">93.2% (A1)</p>
                  <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <CheckCircle size={10} /> Verified by CBSE Controller
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700/60 space-y-2">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
                    <span>Library Loans</span>
                    <BookOpen size={16} className="text-amber-400" />
                  </div>
                  <p className="text-2xl font-bold text-white">2 Active Books</p>
                  <p className="text-[11px] text-slate-400">Due Date: Aug 18, 2026</p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700/60 space-y-2">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
                    <span>Database Queries</span>
                    <Database size={16} className="text-sky-400" />
                  </div>
                  <p className="text-2xl font-bold text-white">100% Synced</p>
                  <p className="text-[11px] text-slate-400 font-mono">Latency: 4ms</p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700/60 space-y-2">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
                    <span>Upcoming Event</span>
                    <Calendar size={16} className="text-purple-400" />
                  </div>
                  <p className="text-base font-bold text-white truncate">Science Expo 2026</p>
                  <p className="text-[11px] text-purple-400">Aug 15 • Auditorium</p>
                </div>
              </div>

              {/* Recent Circulars Section */}
              <div className="p-6 rounded-2xl bg-slate-800/30 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Bell size={18} className="text-red-400" /> Official Circulars & Notices
                  </h3>
                  <span className="text-xs text-slate-400">Updated today</span>
                </div>

                <div className="space-y-3">
                  {(user.notices || []).map((notice, idx) => (
                    <div
                      key={notice.id || idx}
                      className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition space-y-1"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-red-400">{notice.category}</span>
                        <span className="text-slate-500">{notice.date}</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-100">{notice.title}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{notice.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── TAB 2: DATABASE & QUERIES ────────────────────────────────────── */}
          {activeTab === 'queries' && (
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <Database size={20} className="text-red-500" /> ERP Database Synchronizer & Query Engine
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Execute structured queries against MongoDB records and synchronize real-time academic datasets.
                    </p>
                  </div>
                  <button
                    onClick={handleSyncDatabase}
                    disabled={isSyncing}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20 transition cursor-pointer"
                  >
                    <RefreshCw size={14} className={isSyncing ? 'animate-spin' : ''} />
                    Synchronize Database
                  </button>
                </div>

                {/* Preset Query Buttons */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {[
                    { id: 'academics', label: 'Query Academic Marks' },
                    { id: 'attendance', label: 'Query Attendance History' },
                    { id: 'fees', label: 'Query Fee Ledgers' },
                    { id: 'users', label: 'Query User Directory' },
                  ].map((q) => (
                    <button
                      key={q.id}
                      onClick={() => {
                        setSelectedQueryType(q.id);
                        handleExecuteQuery(q.id);
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer border ${
                        selectedQueryType === q.id
                          ? 'bg-red-600/90 text-white border-red-500'
                          : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
                      }`}
                    >
                      {q.label}
                    </button>
                  ))}
                </div>

                {/* Custom Query Search Box */}
                <div className="flex gap-2 pt-2">
                  <div className="relative flex-1">
                    <Search size={16} className="absolute left-3.5 top-3 text-slate-500" />
                    <input
                      type="text"
                      value={customQueryFilter}
                      onChange={(e) => setCustomQueryFilter(e.target.value)}
                      placeholder="Add custom query filter (e.g. GRADE = 'A1' or YEAR = 2026)..."
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <button
                    onClick={() => handleExecuteQuery()}
                    disabled={isQuerying}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition cursor-pointer"
                  >
                    <Play size={13} className={isQuerying ? 'animate-pulse' : ''} />
                    Run Query
                  </button>
                </div>
              </div>

              {/* Query Output Display */}
              {queryResult && (
                <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2 pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="font-mono text-slate-300 font-bold">{queryResult.queryExecuted}</span>
                    </div>
                    <span className="text-slate-500 font-mono">
                      Query Execution Time: {queryResult.executionTimeMs} ms
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-900/40">
                          {Object.keys(queryResult.data[0] || {}).map((key) => (
                            <th key={key} className="py-3 px-4 capitalize font-mono text-[11px]">
                              {key}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {queryResult.data.map((row, idx) => (
                          <tr key={idx} className="hover:bg-slate-900/60 transition font-mono text-slate-300">
                            {Object.values(row).map((val: any, vIdx) => (
                              <td key={vIdx} className="py-3 px-4">
                                {typeof val === 'object' ? JSON.stringify(val) : String(val)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── TAB 3: ACADEMICS ────────────────────────────────────────────── */}
          {activeTab === 'academics' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white">Term 1 Report Card & Grade Breakdown</h3>
                  <p className="text-xs text-slate-400">Class X-A • Academic Session 2026</p>
                </div>
                <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition">
                  <Download size={14} /> Download PDF
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(user.grades || []).map((item, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-800/30 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white">{item.subject}</h4>
                      <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/20">
                        {item.grade}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>Score</span>
                        <span className="font-bold text-slate-200">{item.score} / 100</span>
                      </div>
                      <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-red-600 to-amber-500 rounded-full"
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-500">Instructor: {item.teacher}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── TAB 4: FEES ─────────────────────────────────────────────────── */}
          {activeTab === 'fees' && (
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <span className="text-xs font-semibold text-emerald-400">Status: All Clear</span>
                  <h3 className="text-2xl font-bold text-white mt-1">School Fee Management</h3>
                  <p className="text-xs text-slate-400">Session 2026-27 • HDFC Payment Gateway Synced</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400">Total Pending Dues</p>
                  <p className="text-2xl font-extrabold text-white">₹0.00</p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-800/30 border border-slate-800 space-y-4">
                <h4 className="text-sm font-bold text-white">Payment Ledger Receipts</h4>
                <div className="space-y-3">
                  {[
                    { term: 'Term 1 Fee Voucher', amount: '₹45,000', date: 'April 10, 2026', status: 'Paid', receipt: 'REC-2026-8812' },
                    { term: 'Term 2 Fee Voucher', amount: '₹45,000', date: 'July 05, 2026', status: 'Paid', receipt: 'REC-2026-9430' },
                    { term: 'Term 3 Fee Voucher', amount: '₹45,000', date: 'Due Oct 10, 2026', status: 'Upcoming', receipt: 'N/A' },
                  ].map((row, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-bold text-slate-200">{row.term}</p>
                        <p className="text-slate-500 text-[11px]">{row.date} • Receipt #{row.receipt}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-slate-200">{row.amount}</span>
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                          row.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                        }`}>
                          {row.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── TAB 5: TIMETABLE ────────────────────────────────────────────── */}
          {activeTab === 'timetable' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white">Weekly Class Schedule</h3>
                <p className="text-xs text-slate-400">Grade X-A • Room 302 & Laboratories</p>
              </div>

              <div className="space-y-3">
                {(user.schedule || []).map((slot, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-red-600/10 border border-red-500/20 flex items-center justify-center text-red-400 font-bold">
                        <Clock size={16} />
                      </div>
                      <div>
                        <p className="font-bold text-white">{slot.subject}</p>
                        <p className="text-slate-400 text-[11px]">{slot.period} • {slot.room}</p>
                      </div>
                    </div>
                    <span className="text-slate-400 font-medium text-right">{slot.teacher}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── TAB 6: ADMIN USER MANAGEMENT (admin only) ─────────────────── */}
          {activeTab === 'admin' && user.role === 'admin' && (
            <div className="space-y-6">
              <AdminUserPanel />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
