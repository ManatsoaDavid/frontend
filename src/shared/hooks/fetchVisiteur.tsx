import axiosInstance from 'api/axiosInstance';
import { useEffect, useState } from 'react';
import { IvisitorWithUser } from 'shared/models/visitor.model';
import { localStorageService } from 'utils/localStorageService';

export const useVisitorData = (Id: number) => {
  const [visitorData, setVisitorData] = useState<IvisitorWithUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVisitorData = async () => {
      try {
        setLoading(true);
        const visitorId = parseInt(localStorageService.getItem('visitorId') || '0', 10);
        const response = await axiosInstance.get(`/visitor/${visitorId}`);
        setVisitorData(response.data.data);
        setError(null);
      } catch (err) {
        setError('Une erreur est survenu , le serveur rencontre des probleme');
        setVisitorData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchVisitorData();
  }, [Id]);

  return { visitorData, loading, error };
};
