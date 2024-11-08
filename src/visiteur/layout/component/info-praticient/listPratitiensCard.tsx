import React, { useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import { usePractitionerData } from 'shared/hooks/fetchPractitioner';
import { IPractitionerWithUser } from 'shared/models/practitioner.model';
import avatar from '../../../..//image/avatar4.png';
import PractitionerModal from './pratitienModal';

interface PractitionerCardProps {
  user: IPractitionerWithUser;
}

const PractitionerCard: React.FC<PractitionerCardProps> = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { practitionerData, loading, error } = usePractitionerData(user.practitionerId || 0);
  const specialties = practitionerData?.specialty;

  const getPractitionerInfo = () => {
    if (user.practitionerId) {
      return (
        <>
          <span className='font-bold'>{user.user.name} {user.user.firstName}</span><br />
          <span className='font-sans text-sec'>{user.officeAddress}</span><br />
          <span className='font-sans text-prim'>{user.specialty}</span>
        </>
      );
    }
    return `${user.user.name} ${user.user.firstName}`;
  };

  const IMAGE_API = `${process.env.REACT_APP_API_URL?.replace('/api', '') || ''}/uploads`;

  return (
    <div className="bg-light rounded-lg shadow-md p-6 m-4 relative">
      <img
        src={user.user.avatar ? `${IMAGE_API}/${user.user.avatar}` : avatar}
        alt={`${user.user.name} ${user.user.firstName}`}
        className="mx-auto mb-4 object-cover rounded-full w-24 h-24"
      />
      <div className="text-lg text-center text-dark mb-2 overflow-hidden text-ellipsis whitespace-nowrap">
        {getPractitionerInfo()}
      </div>
      <FaInfoCircle
        onClick={() => setIsModalOpen(true)}
        className="absolute top-2 right-2 text-prim text-2xl cursor-pointer transition-colors hover:text-opacity-80"
        title="Plus d'infos"
      />
      <PractitionerModal
        User={user}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default PractitionerCard;
