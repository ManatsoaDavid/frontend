import { format } from 'date-fns';
import { useAppointmentVisitorData } from "shared/hooks/fetchAllvisiteurAppoint";
import { IAppointment } from "shared/models/appointment.model";

const AppointmentRow: React.FC<{ appointment: IAppointment }> = ({ appointment }) => {
  const { visitorData, loading, error } = useAppointmentVisitorData(appointment);

  const formatTime = (timestamp: number) => format(new Date(timestamp), 'HH:mm');
  const formatDate = (timestamp: number) => format(new Date(timestamp), 'dd/MM/yyyy');

  const API = `${process.env.REACT_APP_API_URL?.replace('/api', '') || ''}/uploads`;


  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex-shrink-0 h-10 w-10 bg-secondary rounded-full flex items-center justify-center text-side text-lg font-bold">
          {visitorData?.user.avatar && (
            <div className="">
              <img src={`${API}/${visitorData.user.avatar}`} alt="User Avatar" className="w-10 h-10 rounded-full mr-2 border-2 border-prim " />
            </div>
          )}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {loading ? 'Loading...' : error ? 'Error' : visitorData?.user.name}
      </td>
      <td className="px-6 py-2 whitespace-nowrap font-sans text-base">{formatDate(appointment.dateAppointment)}</td>
      <td className="px-6 py-4 whitespace-nowrap font-sans text-base">{formatTime(appointment.dateAppointment)}</td>
      <td className="px-6 py-4 whitespace-nowrap font-sans text-base">{appointment.reason}</td>
    </tr>
  );
}; export default AppointmentRow;
