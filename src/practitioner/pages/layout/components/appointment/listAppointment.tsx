import { fetchAppointments, updateAppointmentStatus } from 'practitioner/redux.toolkit/appointment/reducer';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { localStorageService } from 'utils/localStorageService';
import AppointmentCard from './appointmentCard';

/*****************COMPOSANT PRINCIPAL***********************/
const ListAppointment: React.FC = () => {
  const dispatch = useDispatch();
  const { appointments, loading, error } = useSelector((state: RootState) => state.appointment);
  const [activeTab, setActiveTab] = useState('EN ATTENTE');
  const [activeDateFilter, setActiveDateFilter] = useState('Tous');

  /*****************CHARGEMENT INITIAL DES RENDEZ-VOUS***********************/
  useEffect(() => {
    const practitionerId = parseInt(localStorageService.getItem('practitionerId') || '0');
    dispatch(fetchAppointments(practitionerId) as any);
  }, [dispatch]);

  /*****************GESTION DE LA MISE À JOUR DU STATUT***********************/
  const handleStatusUpdate = (id: number, status: string, reason?: string) => {
    dispatch(updateAppointmentStatus({ id, status, reason }) as any);
  };

  /*****************AFFICHAGE PENDANT LE CHARGEMENT***********************/
  if (loading) {
    return <div className="text-center text-xl">Loading appointments...</div>;
  }

  /*****************AFFICHAGE EN CAS D'ERREUR***********************/
  if (error) {
    return <div className="text-center text-xl text-red-500">{error}</div>;
  }

  /*****************RÉCUPÉRATION DES DATES UNIQUES***********************/
  const getUniqueDates = () => {
    const dates = appointments.map(app => new Date(app.dateAppointment).toLocaleDateString());
    return ['Tous', ...Array.from(new Set(dates))];
  };

  /*****************DÉFINITION DES ONGLETS DE STATUT***********************/
  const statusTabs = ['EN ATTENTE', 'CONFIRME', 'REPORTE', 'ANNULE'];

  /*****************FILTRAGE DES RENDEZ-VOUS***********************/
  const filteredAppointments = appointments.filter(app =>
    app.status === activeTab &&
    (activeDateFilter === 'Tous' || new Date(app.dateAppointment).toLocaleDateString() === activeDateFilter)
  );

  /*****************RENDU DU COMPOSANT***********************/
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-prim">Appointments</h2>
      {/*****************ONGLETS DE STATUT***********************/}
      <div className="mb-4">
        <div className="flex flex-wrap -mb-px">
          {statusTabs.map((status) => (
            <button
              key={status}
              onClick={() => setActiveTab(status)}
              className={`inline-block p-4 rounded-t-lg ${activeTab === status
                ? 'text-prim border-b-2 border-prim'
                : 'text-sec hover:text-prim hover:border-prim'
                }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>
      {/*****************FILTRES DE DATE***********************/}
      <div className="mb-4">
        <div className="flex flex-wrap -mb-px">
          {getUniqueDates().map((date) => (
            <button
              key={date}
              onClick={() => setActiveDateFilter(date)}
              className={`inline-block p-2 rounded-t-lg ${activeDateFilter === date
                ? 'text-prim border-b-2 border-prim'
                : 'text-sec hover:text-prim hover:border-prim'
                }`}
            >
              {date === 'Tous' ? 'Tous les rendez-vous' : date}
            </button>
          ))}
        </div>
      </div>
      {/*****************AFFICHAGE DES RENDEZ-VOUS FILTRÉS***********************/}
      {filteredAppointments.length === 0 ? (
        <p className="text-lg text-sec">pas de rendez-vous disponible.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAppointments.map((appointment) => (
            <AppointmentCard
              key={appointment.appointmentId}
              appointment={appointment}
              activeTab={activeTab}
              activeDateFilter={activeDateFilter}
              onStatusUpdate={handleStatusUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ListAppointment;
