import { useState, useEffect } from 'react';

import Profile from 'models/Profile';
import { useResource } from 'contexts/resourceContext';
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
  const [data, setData] = useState<Profile>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const { dispatch } = useResource();
  const { api } = useApi();

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await api.get('profile');
      const profile = new Profile(res.data.payload);
      dispatch({ type: 'SET_PROFILE', profile });
      setData(profile);
      setLoading(false);
    } catch (err: any) {
      console.log({ err });
      /* Because api returns a firebase related error message, set a friendly message instead. */
      setError(err!.response.data.payload.messages[0] as string);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return {
    data,
    refresh: fetchProfile,
    loading,
    error,
  };
};

export default useGetProfile;
