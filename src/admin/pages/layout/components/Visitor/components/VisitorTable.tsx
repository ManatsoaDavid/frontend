import React from 'react';
import { IvisitorWithUser } from 'shared/models/visitor.model';
import VisitorTableRow from './VisitorTableRow';

interface VisitorTableProps {
  visitors: IvisitorWithUser[];
}

const VisitorTable: React.FC<VisitorTableProps> = ({ visitors }) => (
  <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {visitors.map((visitor) => (
        <VisitorTableRow key={visitor.visitorId} visitor={visitor} />
      ))}
    </tbody>
  </table>
);


export default VisitorTable;
