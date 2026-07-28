import React, { useState } from 'react';
import type { ApplicationItem } from '../../services/erpApi';
import { User, Key, CheckCircle2, Clock, LogOut, BookOpen, School, Calendar, Award } from 'lucide-react';

interface StudentProfileViewProps {
  applications: ApplicationItem[];
}

export const StudentProfileView: React.FC<StudentProfileViewProps> = ({ applications }) => {
  const [nameInput, setNameInput] = useState('Rahul Deshmukh');
  const [passwordInput, setPasswordInput] = useState('pass123');
  const [loggedInStudent, setLoggedInStudent] = useState<ApplicationItem | null>(() => applications[0] || null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const found = applications.find(
      a => a.studentName.toLowerCase().trim() === nameInput.toLowerCase().trim() &&
           (a.password || 'pass123') === passwordInput
    );

    if (found) {
      setLoggedInStudent(found);
    } else {
      setErrorMsg('Invalid credentials! Please enter your applied student name & password (pass123).');
    }
  };

  const activeApp = applications.find(a => a.studentName === loggedInStudent?.studentName) || loggedInStudent;
  const isActive = activeApp?.activationStatus === 'Active';

  return (
    <div className="max-w-3xl mx-auto">
      {!loggedInStudent ? (
        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl text-center">
          <h2 className="text-2xl font-black text-slate-100 mb-2">Student Portal Sign In</h2>
          <p className="text-xs text-slate-400 mb-6">Enter your registered name & password (Default: <code className="text-indigo-400">pass123</code>)</p>

          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Student Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Deshmukh or Priya Nair"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Password</label>
              <div className="relative">
                <Key size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="password"
                  required
                  placeholder="pass123"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition-all text-sm"
            >
              Log In to My Application Profile
            </button>
          </form>
        </div>
      ) : (
        <div>
          {/* Quick context switch bar for testing */}
          <div className="flex justify-between items-center mb-4">
            <div className="text-xs text-slate-400">Quick switch student account:</div>
            <div className="flex gap-2">
              {applications.map((app, idx) => (
                <button
                  key={app._id || app.id || idx}
                  onClick={() => setLoggedInStudent(app)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    activeApp?.studentName === app.studentName
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {app.studentName.split(' ')[0]}
                </button>
              ))}
              <button
                onClick={() => setLoggedInStudent(null)}
                className="px-3 py-1 bg-slate-800 text-slate-300 hover:bg-slate-700 rounded-lg text-xs flex items-center gap-1"
              >
                <LogOut size={12} /> Logout
              </button>
            </div>
          </div>

          {/* Student Information Profile Card */}
          <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-3xl font-black text-white shadow-xl shadow-indigo-500/30">
              {activeApp.studentName.charAt(0)}
            </div>

            <h2 className="text-2xl font-black text-slate-100">{activeApp.studentName}</h2>
            <p className="text-xs text-slate-400 mb-6">{activeApp.email}</p>

            {/* Live Activation Status Alert */}
            <div className={`p-4 rounded-2xl border text-left flex items-center gap-3 mb-6 ${
              isActive 
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' 
                : 'bg-amber-950/40 border-amber-500/40 text-amber-300'
            }`}>
              {isActive ? <CheckCircle2 size={24} className="shrink-0" /> : <Clock size={24} className="shrink-0" />}
              <div>
                <div className="font-bold text-sm">
                  {isActive ? 'STATUS: ACTIVATED BY ADMIN' : 'STATUS: PENDING ADMIN ACTIVATION'}
                </div>
                <div className="text-xs opacity-90 mt-0.5">
                  {isActive 
                    ? 'Your online application has been reviewed and activated by Administrator.' 
                    : 'Your application has been logged and is awaiting administrator status activation.'}
                </div>
              </div>
            </div>

            {/* Application Information Details Table */}
            <div className="text-left bg-slate-950/70 border border-slate-800/80 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-indigo-400 mb-4 flex items-center gap-2">
                <BookOpen size={16} />
                My Applied Application Record
              </h3>

              <div className="space-y-3 divide-y divide-slate-800/50">
                <div className="flex justify-between items-center pt-2">
                  <span className="text-xs text-slate-400">Student Name</span>
                  <span className="text-xs font-semibold text-slate-200">{activeApp.studentName}</span>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-xs text-slate-400">Parent / Guardian Name</span>
                  <span className="text-xs font-semibold text-slate-200">{activeApp.parentName || 'N/A'}</span>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-xs text-slate-400">Grade / Class Applied</span>
                  <span className="text-xs font-semibold text-cyan-300">{activeApp.grade || 'Class X'}</span>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-xs text-slate-400">Previous School</span>
                  <span className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                    <School size={12} /> {activeApp.previousSchool || 'N/A'}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-xs text-slate-400">Application Date</span>
                  <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                    <Calendar size={12} /> {activeApp.createdAt ? new Date(activeApp.createdAt).toLocaleDateString() : 'Recent'}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-xs text-slate-400">Portal Credentials</span>
                  <span className="text-xs font-mono text-indigo-300">
                    User: {activeApp.studentName} | Password: <code>{activeApp.password || 'pass123'}</code>
                  </span>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-xs text-slate-400">Admin Activation Status</span>
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                    isActive 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                  }`}>
                    {isActive ? 'ACTIVE' : 'PENDING'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
