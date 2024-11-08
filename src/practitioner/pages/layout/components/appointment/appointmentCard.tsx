import { format } from 'date-fns';
import React, { useState } from 'react';
import { FaCheck, FaEye, FaTimes } from 'react-icons/fa';
import { useAppointmentVisitorData } from 'shared/hooks/fetchVisiteurAppointed';
import { IAppointment } from 'shared/models/appointment.model';
import AppointmentDetails from './appointmentDetail';

/******************DÉFINITION DES PROPS DU COMPOSANT***************/
interface AppointmentCardProps {
  appointment: IAppointment;
  activeTab: string;
  activeDateFilter: string;
  onStatusUpdate: (id: number, status: string, reason?: string) => void;
}

/******************COMPOSANT PRINCIPAL APPOINTMENTCARD***************/
const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment, activeTab, activeDateFilter, onStatusUpdate }) => {
  const { visitorData, loading, error } = useAppointmentVisitorData(appointment);
  const [showDetails, setShowDetails] = useState(false);

  /******************GESTION DU CHARGEMENT ET DES ERREURS***************/
  if (loading) return <div className="text-sec">Loading visitor data...</div>;
  if (error) return <div className="text-red-500">Error loading visitor data: {error}</div>;

  /******************FONCTION POUR FORMATER L'HEURE***************/
  const formatTime = (timestamp: number) => format(new Date(timestamp), 'HH:mm');
  const IMAGE_API = `${process.env.REACT_APP_API_URL?.replace('/api', '') || ''}/uploads`;

  return (
    <>
      {/******************CARTE DE RENDEZ-VOUS***************/}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 h-full flex flex-col justify-between relative">
        <div>
          {/******************INFORMATIONS DU VISITEUR***************/}
          <div className="flex items-center mb-4">
            {visitorData?.user.avatar && (
              <img src={`${IMAGE_API}/${visitorData.user.avatar}`} alt="User Avatar" className="w-16 h-16 rounded-full object-cover mr-4" />
            )}
            <div>
              <h3 className="text-lg font-semibold text-dark">{visitorData?.user.firstName} {visitorData?.user.name}</h3>
              <p className="text-sec text-sm">{visitorData?.user.email}</p>
              <p className="text-sec text-sm">{visitorData?.user.contact}</p>
            </div>
          </div>

          {/******************INFORMATIONS DU RENDEZ-VOUS***************/}
          <div className="mb-4">
            <p className="text-prim font-medium">
              {new Date(appointment.dateAppointment).toLocaleDateString()} | {formatTime(appointment.dateAppointment)}
            </p>
            <p className="text-sec text-sm mt-1">Status: <span className="font-medium">{appointment.status}</span></p>
          </div>
        </div>

        {/******************BOUTONS D'ACTION***************/}
        <div className="flex justify-between items-center mt-4">
          <div className="flex space-x-2">
            {activeTab === 'EN ATTENTE' && (
              <>
                {/******************BOUTON CONFIRMER***************/}
                <button
                  onClick={() => onStatusUpdate(appointment.appointmentId, 'CONFIRME')}
                  className="bg-green-500 text-white p-2 rounded-full shadow-sm hover:bg-green-600 transition-all duration-200 flex items-center justify-center"
                  aria-label="Confirmer"
                >
                  <FaCheck className="text-xl" />
                </button>
                {/******************BOUTON REFUSER***************/}
                <button
                  onClick={() => onStatusUpdate(appointment.appointmentId, 'REPORTE', 'Désolé, la date n\'est plus disponible')}
                  className="bg-red-500 text-white p-2 rounded-full shadow-sm hover:bg-red-600 transition-all duration-200 flex items-center justify-center"
                  aria-label="Refuser"
                >
                  <FaTimes className="text-xl" />
                </button>
              </>
            )}
          </div>

          {/******************BOUTON DÉTAILS***************/}
          <button
            onClick={() => setShowDetails(true)}
            className="bg-transparent text-prim p-2 rounded-full shadow-md hover:shadow-prim transition-all duration-200 flex items-center justify-center absolute top-2 right-2"
            aria-label="Détail"
          >
            <FaEye className="text-xl" />
          </button>
        </div>
      </div>

      {/******************MODAL DES DÉTAILS DU RENDEZ-VOUS***************/}
      {showDetails && (
        <AppointmentDetails
          appointment={appointment}
          visitorData={visitorData}
          onClose={() => setShowDetails(false)}
        />
      )}
    </>
  );
};

export default AppointmentCard;
