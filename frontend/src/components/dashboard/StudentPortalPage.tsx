import React from 'react';
import type { ApplicationItem } from '../../services/erpApi';
import { StudentProfileView } from '../../components/erp/StudentProfileView';

interface StudentPortalPageProps {
  applications: ApplicationItem[];
}

export const StudentPortalPage: React.FC<StudentPortalPageProps> = ({ applications }) => {
  return (
    <div>
      <StudentProfileView applications={applications} />
    </div>
  );
};
