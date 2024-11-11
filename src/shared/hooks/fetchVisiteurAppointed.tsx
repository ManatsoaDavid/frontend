import axiosInstance from 'api/axiosInstance';
import { useEffect, useState } from 'react';
import { IAppointment } from 'shared/models/appointment.model';
import { IvisitorWithUser } from 'shared/models/visitor.model';

export const useAppointmentVisitorData = (appointment: IAppointment | null) => {
  const [visitorData, setVisitorData] = useState<IvisitorWithUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVisitorData = async () => {
      if (!appointment) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axiosInstance.get(`/visitor/${appointment.visitorId}`);
        setVisitorData(response.data.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching visitor data:', err);
        setError('Failed to fetch visitor data');
        setVisitorData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchVisitorData();
  }, [appointment]);

  return { visitorData, loading, error };
};
