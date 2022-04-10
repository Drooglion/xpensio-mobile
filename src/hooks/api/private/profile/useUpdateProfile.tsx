import { useState } from 'react';

import { useResource } from 'contexts/resourceContext';
import useApi from 'hooks/useApi';
import _capitalize from 'lodash/capitalize';

/*
 * Edit Profile
 *
 *

 * Returns
 * lock: setParams that triggers to lock
 * loading: boolean
 * errors: string[]
 *
 */

export type ParamsType = {
  title: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  birthday: string;
  gender: number;
  nationality: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  sssGsisNumber: string;
  tinNumber: string;
  motherFirstName: string;
  motherLastName: string;
  birthPlace: string;
  civilStatus: string;
};

type TupleResult = [any, boolean];

const useUpdateProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const { dispatch } = useResource();
  const { api } = useApi();

  const updateProfile = async (
    params: ParamsType,
  ): Promise<TupleResult | undefined> => {
    setLoading(true);
    try {
      await api.put('profile', params);
      setLoading(false);
      return ['Profile Updated', true];
    } catch (err: any) {
      const message = err!.response.data.messages[0] as string;
      setError(message);
      setLoading(false);
      return [_capitalize(message), false];
    }
  };

  return {
    updateProfile,
    loading,
    error,
  };
};

export default useUpdateProfile;
