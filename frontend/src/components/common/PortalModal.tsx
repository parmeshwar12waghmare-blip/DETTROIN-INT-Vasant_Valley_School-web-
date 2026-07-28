// ─── PORTAL MODAL — Database Auth ─────────────────────────────────────────────
// ERP Login dialog powered by MongoDB / Node.js Backend API.
// Supports Student, Parent, Teacher, and Admin logins.

import React, { useState } from 'react';
import { X, Lock, LogIn, Sparkles, AlertCircle } from 'lucide-react';
import { loginERP } from '../../services/api';
import type { ERPUser } from '../../types';

interface PortalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessLogin: (user: ERPUser) => void;
}

export const PortalModal: React.FC<PortalProps> = ({ isOpen, onClose, onSuccessLogin }) => {
  const [role,         setRole]         = useState<'student' | 'parent' | 'teacher' | 'admin'>('student');
  const [portalId,     setPortalId]     = useState('VVS-2026-981');
  const [portalPass,   setPortalPass]   = useState('password123');
  const [isLoading,    setIsLoading]    = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handlePortalLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!portalId || !portalPass) {
      setErrorMessage('Please provide your Portal ID and Password.');
      return;
    }
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
      setErrorMessage('Unable to connect to database server.');
    } finally {
      setIsLoading(false);
    }
  };

  const autofillDemo = (r: 'student' | 'parent' | 'teacher' | 'admin') => {
    setRole(r);
    if (r === 'student') setPortalId('VVS-2026-981');
    if (r === 'parent')  setPortalId('VVS-PARENT-402');
    if (r === 'teacher') setPortalId('VVS-TCH-108');
    if (r === 'admin')   setPortalId('VVS-ADMIN-001');
    setPortalPass('password123');
  };

  const inputCls = `w-full rounded-xl px-4 py-3 text-sm outline-none transition-all
    border focus:border-red-500 focus:ring-2 focus:ring-red-500/20 font-mono`;

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
        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto shadow-md" style={{ background: '#F04424' }}>
            <Lock size={22} color="#fff" />
          </div>
          <h3 className="text-2xl font-bold" style={{ color: '#111111' }}>School ERP Database Portal</h3>
          <p className="text-xs" style={{ color: '#777777' }}>
            Secure Database Access · Student · Parent · Teacher · Admin
          </p>
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs text-center font-medium flex items-center justify-center gap-2">
            <AlertCircle size={13} /> {errorMessage}
          </div>
        )}

        {/* Role Switcher */}
        <form onSubmit={handlePortalLogin} className="space-y-4">
          <div className="flex p-1 rounded-xl gap-1" style={{ background: '#FBF8F6', border: '1px solid #ECECEC' }}>
            {(['student', 'parent', 'teacher', 'admin'] as const).map((r) => (
              <button
                type="button"
                key={r}
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
              Portal Admission ID / User ID
            </label>
            <input
              type="text" required value={portalId}
              onChange={e => setPortalId(e.target.value)}
              placeholder="e.g. VVS-2026-981"
              className={inputCls}
              style={{ borderColor: '#DEDEDE', background: '#FAFAFA', color: '#111111' }}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1" style={{ color: '#444444' }}>Password</label>
            <input
              type="password" required value={portalPass}
              onChange={e => setPortalPass(e.target.value)}
              placeholder="••••••••"
              className={inputCls}
              style={{ borderColor: '#DEDEDE', background: '#FAFAFA', color: '#111111' }}
            />
          </div>

          <div className="p-3 rounded-xl text-xs space-y-1" style={{ background: '#FFF8F0', border: '1px solid #FFE0C0' }}>
            <div className="font-bold flex items-center gap-1" style={{ color: '#9A5A00' }}>
              <Sparkles size={12} /> Database Account Credentials:
            </div>
            <p style={{ color: '#7A4A00' }}>
              Selected Role: <span className="font-bold capitalize">{role}</span> | ID: <code className="font-bold bg-amber-100 px-1 rounded">{portalId}</code>
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full justify-center py-3 text-sm uppercase tracking-wider font-bold shadow-lg cursor-pointer"
          >
            {isLoading ? 'Connecting to Database...' : 'Sign In To ERP Dashboard'} <LogIn size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};
