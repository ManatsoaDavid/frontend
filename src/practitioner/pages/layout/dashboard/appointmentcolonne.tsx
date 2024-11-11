import { format } from 'date-fns';
import { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { useAppointmentVisitorData } from "shared/hooks/fetchAllvisiteurAppoint";
import { IAppointment } from "shared/models/appointment.model";
import AppointmentDetails from '../appointment/appointmentDetail';

const AppointmentRow: React.FC<{ appointment: IAppointment }> = ({ appointment }) => {

  const [showDetails, setShowDetails] = useState(false);
  const { visitorData, loading, error } = useAppointmentVisitorData(appointment);

  const formatTime = (timestamp: number) => format(new Date(timestamp), 'HH:mm');
  const formatDate = (timestamp: number) => format(new Date(timestamp), 'dd/MM/yyyy');

  const API = `${process.env.REACT_APP_API_URL?.replace('/api', '') || ''}/uploads`;


  return (
    <>
      <tr>
        <td className="px-4 py-1 text-gray-500 dark:bg-gray-800">
          <div className="flex-shrink-0 h-10 w-10 bg-secondary rounded-full flex items-center justify-center text-side text-lg font-bold">
            {visitorData?.user.avatar && (
              <div className="">
                <img src={`${API}/${visitorData.user.avatar}`} alt="User Avatar" className="w-10 h-10 rounded-full mr-1 border-1 border-prim " />
              </div>
            )}
          </div>
        </td>
        <td className="px-4 py-1 text-gray-500 dark:bg-gray-800 dark:text-wh font-medium text-sm text-gray">
          {loading ? 'Loading...' : error ? 'Error' : visitorData?.user.name}        {loading ? 'Loading...' : error ? 'Error' : visitorData?.user.firstName}

        </td>
        <td className="px-4 py-1 text-gray-500 font-medium text-gray text-sm dark:bg-gray-800 dark:text-wh">{formatDate(appointment.dateAppointment)}</td>
        <td className="px-4 py-1 text-gray-500 font-medium text-gray text-sm dark:bg-gray-800 dark:text-wh">{formatTime(appointment.dateAppointment)}</td>
        <td className="px-4 py-1 text-gray-500 font-medium text-sm dark:bg-gray-800">
          <span className={`px-3 py-1 rounded-full ${appointment.status.toLowerCase() === 'en attente'
            ? 'bg-orange-100 text-orange-700'
            : appointment.status.toLowerCase() === 'confirme'
              ? 'bg-green-100 text-green-700'
              : appointment.status.toLowerCase() === 'reporte'
                ? 'bg-red-100 text-red-700'
                : 'bg-gray-100 text-gray-700'
            }`}>
            {appointment.status.toLowerCase()}
          </span>
        </td>

        <td className="px-4 py-1 text-gray-500 font-medium text-gray text-sm dark:bg-gray-800 dark:text-wh"> <button
          onClick={() => setShowDetails(true)}
          className="text-prim hover:text-sec focus:outline-none"
          aria-label="Détail"
        >
          <FaEye className="text-xl" />
        </button></td>


      </tr>

      {showDetails && (
        <AppointmentDetails
          appointment={appointment}
          visitorData={visitorData}
          onClose={() => setShowDetails(false)}
        />
      )}
    </>
  );
}; export default AppointmentRow;
