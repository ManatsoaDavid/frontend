import { format } from 'date-fns';
import { fetchAppointments } from 'practitioner/redux.toolkit/appointment/reducer';
import React, { useEffect } from 'react';
import { FaCalendar, FaClock, FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { localStorageService } from 'utils/localStorageService';
import AppointmentsTable from './appointmentTable';
import DashboardCard from './dashboardCard';
import AppointmentsGraph from './dashboardGraph';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { appointments, loading, error } = useSelector((state: RootState) => state.appointment);

  useEffect(() => {
    const practitionerId = parseInt(localStorageService.getItem('practitionerId') || '0');
    dispatch(fetchAppointments(practitionerId) as any);
  }, [dispatch]);

  const formatTime = (timestamp: number) => format(new Date(timestamp), 'HH:mm');
  const formatDate = (timestamp: number) => format(new Date(timestamp), 'dd/MM/yyyy');


  return (
    <div className="container mx-auto p-6">
      <section className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard
          title="Total rendez-vous"
          value={appointments.length}
          icon={<FaCalendar />}
        />
        <DashboardCard
          title="praticien"
          value={new Set(appointments.map(a => a.practitionerId)).size}
          icon={<FaUser />}
        />
        <DashboardCard
          title="prochain rendez-vous"
          value={appointments[0] ? formatTime(appointments[0].dateAppointment) : 'N/A'}
          icon={<FaClock />}
        />
      </section>

      <div className="flex flex-col lg:flex-row gap-8">
        <section className="bg-white rounded-lg shadow-md overflow-hidden lg:w-2/3">
          <h2 className="text-base font-mono font-semibold p-6 bg-gray-50 border-b border-gray-200">Tous les rendez-vous</h2>
          <AppointmentsTable appointments={appointments} />
        </section>

        <section className="bg-white rounded-lg shadow-md overflow-hidden lg:w-1/3">
          <h2 className="text-base font-mono font-semibold p-6 bg-gray-50 border-b border-gray-200">graphique du rendez-vous</h2>
          <div className="p-6">
            <AppointmentsGraph appointments={appointments} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
