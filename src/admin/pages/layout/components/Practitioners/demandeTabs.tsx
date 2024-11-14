import React from 'react';
import { IPractitionerWithUser } from 'shared/models/practitioner.model';
import RequestRow from './tableContent';

interface RequestTabsProps {
  activeTab: string;
  newRequests: IPractitionerWithUser[];
  pendingRequests: IPractitionerWithUser[];
  historyRequests: IPractitionerWithUser[];
  onViewDetails: (practitioner: IPractitionerWithUser) => void;
}

const DemandeTabs: React.FC<RequestTabsProps> = ({
  activeTab,
  newRequests,
  pendingRequests,
  historyRequests,
  onViewDetails
}) => {
  const renderTabContent = (requests: IPractitionerWithUser[], emptyMessage: string) => (
    requests.length > 0 ? (
      requests.map((practitioner: IPractitionerWithUser) => (
        <RequestRow
          key={practitioner.userId}
          practitioner={practitioner}
          onViewDetails={() => onViewDetails(practitioner)}
        />
      ))
    ) : (
      <tr>
        <td colSpan={5} className="px-6 py-4 text-center text-gray-500 italic">
          {emptyMessage}
        </td>
      </tr>
    )
  );

  return (
    <div className="overflow-x-auto rounded-xl shadow-[5px_5px_10px_#d1d9e6,-5px_-5px_10px_#ffffff] bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nom
            </th>
            <th scope="col" className="hidden md:table-cell px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>

            <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Statut
            </th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {activeTab === 'new' && renderTabContent(newRequests, "Aucune nouvelle demande trouvée.")}
          {activeTab === 'pending' && renderTabContent(pendingRequests, "Aucune demande en attente trouvée.")}
          {activeTab === 'history' && renderTabContent(historyRequests, "Aucun historique de demande trouvé.")}
        </tbody>
      </table>
    </div>
  );
};

export default DemandeTabs;
