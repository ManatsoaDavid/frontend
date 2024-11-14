import axiosInstance from 'api/axiosInstance';
import { useEffect, useState } from 'react';
import { IPractitionerWithUser } from 'shared/models/practitioner.model';
import { localStorageService } from 'utils/localStorageService';

export const usePractitionerData = (Id: number) => {
  const [practitionerData, setUserData] = useState<IPractitionerWithUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const userId = parseInt(localStorageService.getItem('practitionerId') || '0', 10);
        const response = await axiosInstance.get(`/practitioners/${userId}`);
        setUserData(response.data.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch user data');
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [Id]);

  return { practitionerData, loading, error };
};
