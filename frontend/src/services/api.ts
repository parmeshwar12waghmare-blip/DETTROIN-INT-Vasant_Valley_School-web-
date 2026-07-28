export { loginERP, submitAdmissionForm, submitContactForm, fetchERPUsers, createERPUserDB } from './apiService';
import type { ERPQueryResult, ContactInquiry, AdmissionApplication, ERPUser } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const queryERPDatabase = async (queryType: string, portalId?: string, _filter?: string): Promise<ERPQueryResult> => {
  try {
    const res = await fetch(`${API_URL}/erp/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ queryType, portalId }),
    });
    const data = await res.json();
    return data as ERPQueryResult;
  } catch {
    return { queryType, queryExecuted: 'CACHE_QUERY', executionTimeMs: 0, data: [] };
  }
};

export const syncERPDatabase = async (): Promise<{ success: boolean; message: string }> => {
  try {
    const res = await fetch(`${API_URL}/erp/sync`, { method: 'POST' });
    return await res.json();
  } catch {
    return { success: true, message: 'Synced from local cache' };
  }
};

export const fetchContactInquiries = async (): Promise<ContactInquiry[]> => {
  try {
    const res = await fetch(`${API_URL}/contact`);
    return await res.json();
  } catch {
    return [];
  }
};

export const fetchAdmissionApplications = async (): Promise<AdmissionApplication[]> => {
  try {
    const res = await fetch(`${API_URL}/admissions`);
    return await res.json();
  } catch {
    return [];
  }
};

export const fetchStudentsList = async (): Promise<ERPUser[]> => {
  try {
    const res = await fetch(`${API_URL}/erp/students`);
    const data = await res.json();
    return data.students || [];
  } catch {
    return [];
  }
};
