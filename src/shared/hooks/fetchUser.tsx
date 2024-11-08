import axiosInstance from 'api/axiosInstance';
import { useEffect, useState } from 'react';
import { IUser } from 'user/models/register.model';
import { localStorageService } from 'utils/localStorageService';

export const useUserData = (Id: number) => {
  const [userData, setUserData] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const userId = parseInt(localStorageService.getItem('userId') || '0', 10);
        const response = await axiosInstance.get(`/users/${userId}`);
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

  return { userData, loading, error };
};
