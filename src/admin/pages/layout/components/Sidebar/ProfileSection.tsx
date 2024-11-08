import React from 'react';
import { motion } from 'framer-motion';
import avatar from '../../../../../utils/man.png';

interface ProfileSectionProps {
  userName: string;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ userName }) => {
  return (
    <div className="p-6 flex flex-col items-center">
      <div className="w-24 h-24 rounded-full overflow-hidden shadow-[5px_5px_10px_#d1d9e6,-5px_-5px_10px_#ffffff] mb-4">
        <img src={avatar} alt="User Avatar" className="w-full h-full object-cover" />
      </div>
      <h6 className="text-xl font-semibold text-gray-800">{userName}</h6>
    </div>
  );
};

export default ProfileSection;
