import patient from "image/icone/patient.png";
import React from 'react';
import { FaHeartbeat } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface LeftPanelProps {
  onLoginClick: () => void;
}

const LeftPanel: React.FC<LeftPanelProps> = ({ onLoginClick }) => {
  return (
    <div className="w-full lg:w-1/2 p-6 lg:p-10 left-4 flex flex-col justify-center items-start bg-prim to-sec rounded-lg space-y-6">
      <div className="flex items-center justify-between w-full">
        <h3 className="lg:text-3xl sm:text-2xl font-bold text-white mb-4 font-mono">
          <FaHeartbeat className="inline mr-2 font-mono" /> Inscription sur <br /> Ma. Doc
        </h3>
      </div>

      <div className=" w-full">
        <div className="flex justify-center gap-4">
          {/*  <img
            src={doctor}
            alt="First medical image"
            className="w-1/2 h-40 object-cover rounded-lg "
            transform -rotate-6
  />*/}
          <img
            src={patient}
            alt="Second medical image"
            className="w-1/2 h-56 object-containt rounded-lg "
          />
        </div>
      </div>

      <Link
        to="/login"
        onClick={onLoginClick}
        className="text-prim hover:underline font-bold mt-6 bg-white"
      >
        Déjà un compte ? se connecter ici
      </Link>
    </div>
  );
};

export default LeftPanel;
