import { useQuery } from 'react-query';

import Profile from 'models/Profile';
import useApi from 'hooks/useApi';

/*
 * Get Payments
 *
 * Returns
 * data: profile object
 * refresh: function refetches profile
 * loading: boolean
 * errors: string[]
 *
 */

const useGetProfile = () => {
  const { api } = useApi();

  const fetchProfile = async () => {
    try {
      const res = await api.get('profile');
      const profile = new Profile(res.data.payload);
      return profile;
    } catch (err: any) {
      throw new Error(err);
    }
  };

  return useQuery('profile', fetchProfile);
};

export default useGetProfile;
