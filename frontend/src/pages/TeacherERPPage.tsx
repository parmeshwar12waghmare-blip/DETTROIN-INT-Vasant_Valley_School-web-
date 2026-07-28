import React from 'react';
import type { StudentUser } from '../services/erpApi';
import { StudentManager } from '../components/erp/StudentManager';
import { ShieldAlert } from 'lucide-react';

interface TeacherERPPageProps {
  students: StudentUser[];
  onAddStudent: (formData: Partial<StudentUser>) => void;
}

export const TeacherERPPage: React.FC<TeacherERPPageProps> = ({ students, onAddStudent }) => {
  return (
    <div>
      <div className="mb-6 p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-300 text-xs flex items-center gap-3">
        <ShieldAlert size={20} className="shrink-0 text-indigo-400" />
        <div>
          <span className="font-bold">Faculty Access Level:</span> Teachers can view student directory rosters and enroll new students into the system database. (Student deletion privilege is restricted to Admin).
        </div>
      </div>

      <StudentManager
        students={students}
        onAddStudent={onAddStudent}
        onRemoveStudent={null}
        userRole="teacher"
      />
    </div>
  );
};
