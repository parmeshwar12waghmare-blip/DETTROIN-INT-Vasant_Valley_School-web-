import React, { useState } from 'react';
import { X, Lock, LogIn, UserCheck } from 'lucide-react';

interface PortalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PortalModal: React.FC<PortalProps> = ({ isOpen, onClose }) => {
  const [role, setRole] = useState<'parent' | 'student' | 'teacher'>('parent');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      setIsLoggedIn(true);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(17,17,17,0.75)', backdropFilter: 'blur(8px)' }}
    >
      <div
        className="w-full max-w-md rounded-2xl p-7 sm:p-9 relative overflow-hidden"
        style={{ background: '#FFFFFF', border: '1px solid #ECECEC', boxShadow: '0 16px 60px rgba(0,0,0,0.18)' }}
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
        <div className="text-center space-y-2 mb-7">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto"
            style={{ background: '#F04424' }}
          >
            <Lock size={22} color="#fff" />
          </div>
          <h3 className="text-2xl font-bold" style={{ color: '#111111' }}>School ERP Portal</h3>
          <p className="text-xs" style={{ color: '#777777' }}>Access grades, attendance, fee vouchers & circulars</p>
        </div>

        {isLoggedIn ? (
          <div className="text-center space-y-4 py-4">
            <div
              className="p-3 rounded-full w-14 h-14 mx-auto flex items-center justify-center"
              style={{ background: 'rgba(240,68,36,0.1)' }}
            >
              <UserCheck size={30} style={{ color: '#F04424' }} />
            </div>
            <h4 className="text-lg font-bold" style={{ color: '#111111' }}>Welcome back, {username}!</h4>
            <p className="text-xs" style={{ color: '#777777' }}>
              Logged in as <strong style={{ color: '#F04424', textTransform: 'uppercase' }}>{role}</strong>
            </p>
            <div
              className="p-4 rounded-xl text-left text-xs space-y-1"
              style={{ background: '#FBF8F6', border: '1px solid #ECECEC', color: '#555555' }}
            >
              <p>• Recent Fee Receipt: Downloaded</p>
              <p>• Term 1 Report Card: Available</p>
              <p>• Next Parent Teacher Meeting: Aug 12</p>
            </div>
            <button
              onClick={() => setIsLoggedIn(false)}
              className="w-full py-2.5 rounded-xl text-xs font-bold transition cursor-pointer"
              style={{ background: '#FBF8F6', color: '#555555', border: '1px solid #ECECEC' }}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Role Switcher */}
            <div
              className="flex p-1 rounded-xl gap-1"
              style={{ background: '#FBF8F6', border: '1px solid #ECECEC' }}
            >
              {(['parent', 'student', 'teacher'] as const).map((r) => (
                <button
                  type="button"
                  key={r}
                  onClick={() => setRole(r)}
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
              <label className="ent-label">Portal Admission ID / Roll No</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. VVS-2026-981"
                className="ent-input"
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
                className="ent-input"
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full justify-center py-3.5 text-sm uppercase tracking-wider"
            >
              Sign In To Portal <LogIn size={16} />
            </button>

            <div className="text-center">
              <span
                className="text-[11px] cursor-pointer"
                style={{ color: '#777777' }}
              >
                Forgot your password or Portal ID?
              </span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
