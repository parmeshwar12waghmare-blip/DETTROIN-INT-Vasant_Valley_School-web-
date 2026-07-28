import React, { useState } from 'react';
import type { InquiryItem } from '../../services/erpApi';
import { Mail, Search, Trash2, Calendar, Phone, CheckCircle, Clock } from 'lucide-react';

interface EnquiriesListProps {
  inquiries: InquiryItem[];
  onDeleteInquiry: (id: string) => void;
}

export const EnquiriesList: React.FC<EnquiriesListProps> = ({ inquiries, onDeleteInquiry }) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = inquiries.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
                          item.email.toLowerCase().includes(search.toLowerCase()) ||
                          (item.subject && item.subject.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus = statusFilter === 'All' || (item.status || 'Pending') === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-2xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2 text-slate-100">
            <Mail className="text-indigo-400" size={22} />
            Admission Enquiries ({filtered.length})
          </h2>
          <p className="text-xs text-slate-400">Read prospective student and parent enquiries from contact backend</p>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input
              type="text"
              placeholder="Search enquiries..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 outline-none focus:border-indigo-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 outline-none focus:border-indigo-500"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Responded">Responded</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full text-left text-sm text-slate-300 border-collapse">
          <thead className="bg-slate-950/80 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
            <tr>
              <th className="p-4">Applicant Name</th>
              <th className="p-4">Contact Detail</th>
              <th className="p-4">Subject</th>
              <th className="p-4">Inquiry Message</th>
              <th className="p-4">Submitted Date</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center p-8 text-slate-500">
                  No admission enquiries found in database.
                </td>
              </tr>
            ) : (
              filtered.map((item, idx) => (
                <tr key={item._id || item.id || idx} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-semibold text-slate-100">{item.name}</td>
                  <td className="p-4">
                    <div className="text-xs">{item.email}</div>
                    <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <Phone size={12} /> {item.phone}
                    </div>
                  </td>
                  <td className="p-4 text-xs font-medium text-indigo-300">{item.subject || 'General Inquiry'}</td>
                  <td className="p-4 text-xs text-slate-400 max-w-xs truncate">{item.message}</td>
                  <td className="p-4 text-xs text-slate-400 flex items-center gap-1">
                    <Calendar size={12} /> {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Recent'}
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                      item.status === 'Responded' 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    }`}>
                      {item.status === 'Responded' ? <CheckCircle size={12} /> : <Clock size={12} />}
                      {item.status || 'Pending'}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => onDeleteInquiry(item._id || item.id || '')}
                      className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-md transition-colors"
                      title="Delete Inquiry"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
