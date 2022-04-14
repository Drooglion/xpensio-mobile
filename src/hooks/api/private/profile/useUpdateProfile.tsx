import { useMutation, useQueryClient } from 'react-query';

import Profile from 'models/Profile';
import useApi from 'hooks/useApi';
import _capitalize from 'lodash/capitalize';

/*
 * Edit Profile
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

const useUpdateProfile = () => {
  const { api } = useApi();
  const queryClient = useQueryClient();

  const updateProfile = async (params: ParamsType) => {
    try {
      const res = await api.put('profile', params);
      const profile = new Profile(res.data.payload);
      return profile;
    } catch (err: any) {
      const message = _capitalize(err!.response.data.messages[0]);
      throw new Error(message, { cause: err });
    }
  };

  return useMutation('updateProfile', updateProfile, {
    onSuccess: () => {
      /* Refetch Profile and Account */
      queryClient.invalidateQueries('profile');
      queryClient.invalidateQueries('account');
    },
  });
};

export default useUpdateProfile;
