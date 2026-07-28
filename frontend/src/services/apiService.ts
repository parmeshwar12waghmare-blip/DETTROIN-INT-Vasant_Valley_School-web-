// src/services/apiService.ts
import type { ERPUser, AdmissionApplication, ContactInquiry } from '../types/types';

/**
 * Service layer for handling all external API calls.
 * NOTE: This uses mock data structures to resolve compilation errors. 
 * Real implementation should use Axios/fetch with correct endpoints and authentication.
 */

// Mock function for loginERP (used in PortalModal.tsx)
export const loginERP = async (portalId: string, _password?: string, _role?: string): Promise<{ success: boolean; message: string; user?: ERPUser }> => {
    console.log("Simulating API call: Logging into ERP...");
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    
    // Mock successful login response structure
    const mockUser: ERPUser = {
        id: 'mock-user-123',
        name: 'Mock User Name',
        email: 'mock@school.edu',
        portalId: portalId,
        role: 'Admin',
        phone: '9876543210',
        department: 'IT',
        notices: [],
        grades: [{ subject: 'Math', score: 90, grade: 'A', teacher: 'Mr. Smith' }],
        schedule: [{ day: 'Mon', period: '1', subject: 'Math', room: '101', teacher: 'Mr. Smith' }]
    };

    return { success: true, message: 'Login successful', user: mockUser };
};

// Mock function for admission submission (used in AdmissionsSection.tsx)
export const submitAdmissionForm = async (application: AdmissionApplication): Promise<{ success: boolean; message: string }> => {
    console.log("Simulating API call: Submitting admission form:", application);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

    // Mock success response
    return { success: true, message: 'Admission application submitted successfully for processing.' };
};

// Mock function for contact form submission (used in ContactSection.tsx)
export const submitContactForm = async (inquiry: ContactInquiry): Promise<{ success: boolean; message: string }> => {
    console.log("Simulating API call: Submitting contact inquiry:", inquiry);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

    // Mock success response
    return { success: true, message: 'Thank you for your inquiry. We will contact you shortly.' };
};

// Mock functions for ERP Dashboard (used in ERPDashboard.tsx)
export const fetchERPUsers = async (): Promise<{ users: ERPUser[] }> => {
    console.log("Simulating API call: Fetching all ERP Users...");
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

    // Mock user list response
    const mockUsers: ERPUser[] = [
        { id: 'u1', name: 'John Doe', email: 'john@school.edu', role: 'Staff', notices: [], grades: [], schedule: [] },
        { id: 'u2', name: 'Jane Smith', email: 'jane@school.edu', role: 'Student', notices: [], grades: [{ subject: 'Science', score: 85, grade: 'B', teacher: 'Mrs. Davis' }], schedule: [] }
    ];

    return { users: mockUsers };
};

export const createERPUserDB = async (formData: any): Promise<{ success: boolean; message: string }> => {
    console.log("Simulating API call: Creating new ERP User:", formData);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

    return { success: true, message: 'User profile created successfully.' };
};