import React from 'react';
import { FaEnvelope, FaHeartbeat, FaQuestionCircle, FaStethoscope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface LeftPanelProps {
  onLoginClick: () => void;
}

const LeftPanel: React.FC<LeftPanelProps> = ({ onLoginClick }) => {
  return (
    <div className="w-full lg:w-1/2 p-6 lg:p-10 left-4 flex flex-col justify-center items-start bg-prim to-sec  rounded-lg space-y-6 ">
      <div className="flex items-center justify-between w-full">
        <h3 className=" lg:text-3xl sm:text-2xl font-bold text-white mb-4 font-mono">
          <FaHeartbeat className="inline mr-2 font-mono" /> Insription sur <br></br>  E. Dokotera
        </h3>

      </div>

      <p className="text-lg lg:text-xl text-grey mb-6">
        <FaStethoscope className="inline mr-2" /> Votre plateforme de santé innovante
      </p>

      {/* Informations de contact */}
      <div className="space-y-3 mt-6">
        <p className="text-grey flex items-center">
          <FaEnvelope className="text-xl mr-3" /> contact@flashdoc.com
        </p>
        <p className="text-grey flex items-center">
          <FaQuestionCircle className="text-xl mr-3" /> Centre d'aide
        </p>
      </div>

      <Link
        to="/login"
        onClick={onLoginClick}
        className="text-prim hover:underline  font-bold mt-6 bg-white"

      >
        Déjà un compte ? se connecter ici
      </Link>
    </div>
  );
};

export default LeftPanel;
