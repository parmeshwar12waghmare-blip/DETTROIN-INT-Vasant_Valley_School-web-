// ─── PORTAL MODAL — Firebase Auth ─────────────────────────────────────────────
// ERP Login dialog powered by Firebase Authentication.
// Supports email/password + Google OAuth sign-in.
// Falls back to mock session if Firebase is not yet configured.

import React, { useState } from 'react';
import { X, Lock, LogIn, Sparkles, Chrome, Mail, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { signInWithEmail, signInWithGoogle, getAuthErrorMessage } from '../../firebase/authService';
import { loginERP } from '../../services/api';
import type { ERPUser } from '../../types';

interface PortalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessLogin: (user: ERPUser) => void;
}

export const PortalModal: React.FC<PortalProps> = ({ isOpen, onClose, onSuccessLogin }) => {
  const [tab,          setTab]          = useState<'firebase' | 'portal'>('firebase');
  const [role,         setRole]         = useState<'parent' | 'student' | 'teacher'>('student');
  const [email,        setEmail]        = useState('aarav.sharma@vasantvalley.edu.in');
  const [password,     setPassword]     = useState('');
  const [showPass,     setShowPass]     = useState(false);
  const [portalId,     setPortalId]     = useState('VVS-2026-981');
  const [portalPass,   setPortalPass]   = useState('password123');
  const [isLoading,    setIsLoading]    = useState(false);
  const [googleLoading,setGoogleLoading]= useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  // ── Build ERPUser from Firebase profile data ────────────────────────────────
  const buildERPUser = (fbUser: any, profile: any): ERPUser => ({
    portalId:     profile?.portalId  || fbUser.uid.slice(0, 10),
    name:         profile?.name      || fbUser.displayName || 'ERP User',
    email:        profile?.email     || fbUser.email || '',
    role:         profile?.role      || 'student',
    grade:        profile?.grade     || 'Class X-A',
    rollNo:       profile?.rollNo    || '2026-001',
    parentName:   profile?.parentName|| 'Parent',
    attendanceRate: 96.5,
    feeStatus:    'Paid',
    dueAmount:    0,
    grades: [
      { subject: 'Mathematics (Advanced)', score: 95, grade: 'A1', teacher: 'Dr. R. K. Gupta' },
      { subject: 'Physics & STEM', score: 92, grade: 'A1', teacher: 'Mrs. S. Verma' },
      { subject: 'Computer Science & AI', score: 98, grade: 'A1', teacher: 'Mr. V. Anand' },
    ],
    schedule: [
      { day: 'Monday', period: '08:30 – 09:30 AM', subject: 'Mathematics', room: 'Room 302', teacher: 'Dr. R. K. Gupta' },
    ],
    notices: [
      { id: 'n1', title: 'Term 1 Results Published', date: 'July 25, 2026', category: 'Academic', content: 'Your performance report is available.' },
    ],
  });

  // ── Firebase Email/Password Login ───────────────────────────────────────────
  const handleFirebaseLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setErrorMessage('Email and password are required.'); return; }
    setIsLoading(true);
    setErrorMessage('');
    try {
      const { user, profile } = await signInWithEmail(email, password);
      onSuccessLogin(buildERPUser(user, profile));
      onClose();
    } catch (err: any) {
      const code = err.code || '';
      // If Firebase not configured, fall through to legacy mock
      if (code.includes('network') || code.includes('internal') || !code) {
        try {
          const res = await loginERP(email, password, 'student');
          if (res?.success && res.user) { onSuccessLogin(res.user); onClose(); return; }
        } catch {}
      }
      setErrorMessage(getAuthErrorMessage(code) || err.message || 'Login failed.');
    } finally {
      setIsLoading(false);
    }
  };

  // ── Google Sign-In ──────────────────────────────────────────────────────────
  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setErrorMessage('');
    try {
      const { user, profile } = await signInWithGoogle();
      onSuccessLogin(buildERPUser(user, profile));
      onClose();
    } catch (err: any) {
      setErrorMessage(getAuthErrorMessage(err.code) || 'Google sign-in failed.');
    } finally {
      setGoogleLoading(false);
    }
  };

  // ── Portal ID (Legacy) Login ────────────────────────────────────────────────
  const handlePortalLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!portalId || !portalPass) return;
    setIsLoading(true);
    setErrorMessage('');
    try {
      const res = await loginERP(portalId, portalPass, role);
      if (res?.success && res.user) {
        onSuccessLogin(res.user);
        onClose();
      } else {
        setErrorMessage(res?.message || 'Login failed. Check your Portal ID and password.');
      }
    } catch {
      setErrorMessage('Unable to connect. Using offline mode.');
    } finally {
      setIsLoading(false);
    }
  };

  const autofillDemo = (r: 'student' | 'parent' | 'teacher') => {
    setRole(r);
    if (r === 'student') setPortalId('VVS-2026-981');
    if (r === 'parent')  setPortalId('VVS-PARENT-402');
    if (r === 'teacher') setPortalId('VVS-TCH-108');
    setPortalPass('password123');
  };

  const inputCls = `w-full rounded-xl px-4 py-3 text-sm outline-none transition-all
    border focus:border-red-500 focus:ring-2 focus:ring-red-500/20`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(11,15,25,0.85)', backdropFilter: 'blur(14px)' }}
    >
      <div
        className="w-full max-w-md rounded-3xl p-7 sm:p-8 relative overflow-hidden"
        style={{ background: '#FFFFFF', border: '1px solid #ECECEC', boxShadow: '0 20px 80px rgba(0,0,0,0.30)' }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl transition cursor-pointer"
          style={{ background: '#FBF8F6', color: '#777777', border: '1px solid #ECECEC' }}
        >
          <X size={17} />
        </button>

        {/* Header */}
        <div className="text-center space-y-2 mb-5">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto shadow-md" style={{ background: '#F04424' }}>
            <Lock size={22} color="#fff" />
          </div>
          <h3 className="text-2xl font-bold" style={{ color: '#111111' }}>School ERP Login</h3>
          <p className="text-xs" style={{ color: '#777777' }}>
            Firebase-powered secure access · Student · Parent · Teacher · Admin
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1 rounded-xl gap-1 mb-5" style={{ background: '#FBF8F6', border: '1px solid #ECECEC' }}>
          {[
            { id: 'firebase', label: '🔥 Firebase Auth' },
            { id: 'portal',   label: '🆔 Portal ID'     },
          ].map(t => (
            <button
              key={t.id}
              type="button"
              onClick={() => { setTab(t.id as any); setErrorMessage(''); }}
              className="flex-1 py-2 rounded-lg text-xs font-semibold transition cursor-pointer"
              style={{
                background: tab === t.id ? '#F04424' : 'transparent',
                color:      tab === t.id ? '#FFFFFF'  : '#777777',
                boxShadow:  tab === t.id ? '0 2px 8px rgba(240,68,36,0.25)' : 'none',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Error */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs text-center font-medium flex items-center justify-center gap-2">
            <AlertCircle size={13} /> {errorMessage}
          </div>
        )}

        {/* ── FIREBASE AUTH TAB ─────────────────────────────────── */}
        {tab === 'firebase' && (
          <div className="space-y-4">
            {/* Google Sign-In */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border text-sm font-semibold transition-all hover:bg-gray-50 disabled:opacity-60 cursor-pointer"
              style={{ borderColor: '#DEDEDE', color: '#111111' }}
            >
              {googleLoading ? (
                <span className="w-4 h-4 border-2 border-gray-300 border-t-red-500 rounded-full animate-spin" />
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 48 48">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                  <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                  <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                  <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                </svg>
              )}
              {googleLoading ? 'Signing in with Google...' : 'Continue with Google'}
            </button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px" style={{ background: '#ECECEC' }} />
              <span className="text-xs" style={{ color: '#AAAAAA' }}>or email</span>
              <div className="flex-1 h-px" style={{ background: '#ECECEC' }} />
            </div>

            <form onSubmit={handleFirebaseLogin} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: '#444444' }}>
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@vasantvalley.edu.in"
                    className={inputCls + ' pl-9'}
                    style={{ borderColor: '#DEDEDE', background: '#FAFAFA', color: '#111111' }}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: '#444444' }}>Password</label>
                <div className="relative">
                  <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={inputCls + ' pl-9 pr-10'}
                    style={{ borderColor: '#DEDEDE', background: '#FAFAFA', color: '#111111' }}
                  />
                  <button type="button" onClick={() => setShowPass(s => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full justify-center py-3 text-sm uppercase tracking-wider font-bold shadow-lg"
              >
                {isLoading ? 'Authenticating...' : 'Sign In with Firebase'} <LogIn size={15} />
              </button>
            </form>

            {/* Demo hint */}
            <div className="p-3 rounded-xl text-xs space-y-1" style={{ background: '#FFF8F0', border: '1px solid #FFE0C0' }}>
              <div className="font-bold flex items-center gap-1" style={{ color: '#9A5A00' }}>
                <Sparkles size={12} /> Firebase Demo Accounts (after seeding):
              </div>
              <p style={{ color: '#7A4A00' }}>
                <code className="font-bold bg-amber-100 px-1 rounded">aarav.sharma@vasantvalley.edu.in</code> — Student
              </p>
              <p style={{ color: '#7A4A00' }}>
                <code className="font-bold bg-amber-100 px-1 rounded">admin@vasantvalley.edu.in</code> — Admin
              </p>
            </div>
          </div>
        )}

        {/* ── PORTAL ID TAB ─────────────────────────────────────── */}
        {tab === 'portal' && (
          <form onSubmit={handlePortalLogin} className="space-y-4">
            {/* Role Switcher */}
            <div className="flex p-1 rounded-xl gap-1" style={{ background: '#FBF8F6', border: '1px solid #ECECEC' }}>
              {(['student', 'parent', 'teacher'] as const).map((r) => (
                <button
                  type="button" key={r}
                  onClick={() => autofillDemo(r)}
                  className="flex-1 py-2 rounded-lg text-xs font-semibold capitalize transition cursor-pointer"
                  style={{
                    background: role === r ? '#F04424' : 'transparent',
                    color:      role === r ? '#FFFFFF' : '#777777',
                    boxShadow:  role === r ? '0 2px 8px rgba(240,68,36,0.25)' : 'none',
                  }}
                >
                  {r}
                </button>
              ))}
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: '#444444' }}>
                Portal Admission ID / Roll No
              </label>
              <input
                type="text" required value={portalId}
                onChange={e => setPortalId(e.target.value)}
                placeholder="e.g. VVS-2026-981"
                className={inputCls + ' font-mono'}
                style={{ borderColor: '#DEDEDE', background: '#FAFAFA', color: '#111111' }}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: '#444444' }}>Password</label>
              <input
                type="password" required value={portalPass}
                onChange={e => setPortalPass(e.target.value)}
                placeholder="••••••••"
                className={inputCls + ' font-mono'}
                style={{ borderColor: '#DEDEDE', background: '#FAFAFA', color: '#111111' }}
              />
            </div>

            <div className="p-3 rounded-xl text-xs space-y-1" style={{ background: '#FFF8F0', border: '1px solid #FFE0C0' }}>
              <div className="font-bold flex items-center gap-1" style={{ color: '#9A5A00' }}>
                <Sparkles size={12} /> Demo credentials pre-filled:
              </div>
              <p style={{ color: '#7A4A00' }}>
                ID: <code className="font-bold bg-amber-100 px-1 rounded">{portalId}</code> | Pass: <code className="font-bold bg-amber-100 px-1 rounded">password123</code>
              </p>
            </div>

            <button
              type="submit" disabled={isLoading}
              className="btn-primary w-full justify-center py-3 text-sm uppercase tracking-wider font-bold shadow-lg"
            >
              {isLoading ? 'Authenticating ERP...' : 'Sign In To ERP Dashboard'} <LogIn size={16} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
