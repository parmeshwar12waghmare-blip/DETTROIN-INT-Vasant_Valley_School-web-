import React, { useState } from 'react';
import { X, Lock, LogIn, Key, Sparkles } from 'lucide-react';
import { loginERP } from '../../services/api';
import type { ERPUser } from '../../types';

interface PortalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessLogin: (user: ERPUser) => void;
}

export const PortalModal: React.FC<PortalProps> = ({ isOpen, onClose, onSuccessLogin }) => {
  const [role, setRole] = useState<'parent' | 'student' | 'teacher'>('student');
  const [username, setUsername] = useState('VVS-2026-981');
  const [password, setPassword] = useState('password123');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;
    
    setIsLoading(true);
    setErrorMessage('');
    try {
      const res = await loginERP(username, password, role);
      if (res && res.success && res.user) {
        onSuccessLogin(res.user);
        onClose();
      } else {
        setErrorMessage(res?.message || 'Login failed. Check your Portal ID and password.');
      }
    } catch (err) {
      setErrorMessage('Unable to connect to ERP server. Trying client cache...');
    } finally {
      setIsLoading(false);
    }
  };

  const autofillDemo = (r: 'student' | 'parent' | 'teacher') => {
    setRole(r);
    if (r === 'student') setUsername('VVS-2026-981');
    if (r === 'parent') setUsername('VVS-PARENT-402');
    if (r === 'teacher') setUsername('VVS-TCH-108');
    setPassword('password123');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(11,15,25,0.82)', backdropFilter: 'blur(12px)' }}
    >
      <div
        className="w-full max-w-md rounded-3xl p-7 sm:p-8 relative overflow-hidden"
        style={{ background: '#FFFFFF', border: '1px solid #ECECEC', boxShadow: '0 20px 80px rgba(0,0,0,0.25)' }}
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
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto shadow-md"
            style={{ background: '#F04424' }}
          >
            <Lock size={22} color="#fff" />
          </div>
          <h3 className="text-2xl font-bold" style={{ color: '#111111' }}>School ERP Login</h3>
          <p className="text-xs" style={{ color: '#777777' }}>
            Access live student records, fee receipts & database queries
          </p>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs text-center font-medium">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Role Switcher */}
          <div
            className="flex p-1 rounded-xl gap-1"
            style={{ background: '#FBF8F6', border: '1px solid #ECECEC' }}
          >
            {(['student', 'parent', 'teacher'] as const).map((r) => (
              <button
                type="button"
                key={r}
                onClick={() => autofillDemo(r)}
                className="flex-1 py-2 rounded-lg text-xs font-semibold capitalize transition cursor-pointer"
                style={{
                  background: role === r ? '#F04424' : 'transparent',
                  color: role === r ? '#FFFFFF' : '#777777',
                  boxShadow: role === r ? '0 2px 8px rgba(240,68,36,0.25)' : 'none',
                }}
              >
                {r}
              </button>
            ))}
          </div>

          <div>
            <label className="ent-label flex justify-between">
              <span>Portal Admission ID / Roll No</span>
              <span className="text-[10px] text-red-500 font-normal">Required</span>
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. VVS-2026-981"
              className="ent-input font-mono text-sm"
            />
          </div>

          <div>
            <label className="ent-label">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="ent-input font-mono text-sm"
            />
          </div>

          {/* Quick Demo Autofill Banner */}
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1">
            <div className="flex items-center gap-1 font-bold">
              <Sparkles size={13} className="text-amber-600" /> Demo Credentials Pre-filled:
            </div>
            <p className="text-[11px] text-amber-800">
              User ID: <code className="font-bold bg-amber-100 px-1 rounded">{username}</code> | Pass:{' '}
              <code className="font-bold bg-amber-100 px-1 rounded">password123</code>
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full justify-center py-3.5 text-sm uppercase tracking-wider font-bold shadow-lg"
          >
            {isLoading ? 'Authenticating ERP...' : 'Sign In To ERP Dashboard'} <LogIn size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};
