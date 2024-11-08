import { format } from 'date-fns';
import React from 'react';
import { IAppointment } from 'shared/models/appointment.model';

/*****************DÉFINITION DES PROPS DU COMPOSANT***********************/
interface AppointmentDetailsProps {
  appointment: IAppointment;
  visitorData: any;
  onClose: () => void;
}

/*****************COMPOSANT PRINCIPAL***********************/
const AppointmentDetails: React.FC<AppointmentDetailsProps> = ({ appointment, visitorData, onClose }) => {
  /*****************FONCTION POUR FORMATER L'HEURE***********************/
  const formatTime = (timestamp: number) => format(new Date(timestamp), 'HH:mm');

  return (
    /*****************CONTENEUR PRINCIPAL AVEC FOND SEMI-TRANSPARENT***********************/
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/*****************CARTE DES DÉTAILS DU RENDEZ-VOUS***********************/}
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
        <h2 className="text-2xl font-bold mb-4 text-prim">détail du rendez-vous</h2>
        {/*****************INFORMATIONS DU VISITEUR***********************/}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">{visitorData?.user.firstName} {visitorData?.user.name}</h3>
          <p className="text-sec">{visitorData?.user.email}</p>
          <p className="text-sec">{visitorData?.user.contact}</p>
        </div>
        {/*****************DÉTAILS DU RENDEZ-VOUS***********************/}
        <div className="mb-4">
          <p className="text-prim font-medium">
            {new Date(appointment.dateAppointment).toLocaleDateString()} | {formatTime(appointment.dateAppointment)}
          </p>
          <p className="text-sec mt-2">Status: <span className="font-medium">{appointment.status}</span></p>
          <p className="text-sec mt-2">Motif:</p>
          <p className="font-medium">{appointment.reason}</p>
        </div>
        {/*****************BOUTON POUR FERMER LA FENÊTRE***********************/}
        <button
          onClick={onClose}
          className="bg-prim text-white px-4 py-2 rounded hover:bg-opacity-90 transition-colors duration-200"
        >
          fermer
        </button>
      </div>
    </div>
  );
};

export default AppointmentDetails;
