import { format } from 'date-fns';
import React from 'react';
import { IAppointment } from 'shared/models/appointment.model';
import AppointmentRow from './appointmentcolonne';

interface AppointmentsTableProps {
  appointments: IAppointment[];
}

const AppointmentsTable: React.FC<AppointmentsTableProps> = ({ appointments }) => {
  const formatTime = (timestamp: number) => format(new Date(timestamp), 'HH:mm');
  const formatDate = (timestamp: number) => format(new Date(timestamp), 'dd/MM/yyyy');

  return (
    <div className="w-full h-[300px] overflow-hidden rounded-lg shadow">
      <div className="overflow-x-auto">
        <div className="overflow-y-auto h-[300px]">
          <table className="min-w-full divide-y divide-gray-200 ">
            <thead className="bg-gray-50 sticky top-0 z-10 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="truncate max-w-[200px] dark:text-wh">Nom</div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-wh">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-wh">Heure</th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-wh">
                  status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-wh">
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {appointments.map((appointment, index) => (
                <AppointmentRow key={index} appointment={appointment} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsTable;
