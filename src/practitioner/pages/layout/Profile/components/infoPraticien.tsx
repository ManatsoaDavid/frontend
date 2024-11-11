import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface InfoItemProps {
  icon: IconDefinition;
  label: string;
  value?: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ icon, label, value }) => (
  <div className="flex items-center space-x-3">
    <FontAwesomeIcon icon={icon} className="text-xl text-prim" />
    <div>
      <p className="text-sm font-sans font-semibold text-gray-500 overflow-hidden">{label}</p>
      <p className="text-base font-sans text-dark">{value || 'N/A'}</p>
    </div>
  </div>
);

export default InfoItem;
