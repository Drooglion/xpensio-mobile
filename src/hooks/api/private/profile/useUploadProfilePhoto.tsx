import { useMutation, useQueryClient } from 'react-query';

import useApi from 'hooks/useApi';
import _capitalize from 'lodash/capitalize';

export type ParamsType = {
  payload: Record<string, any>;
};

export const useUploadProfilePhoto = () => {
  const { api } = useApi();
  const queryClient = useQueryClient();

  const uploadProfilePhoto = async ({ payload }: ParamsType) => {
    try {
      const url = 'profile/upload_profile_photo';
      const res = await api.post(url, payload);
      return res;
    } catch (err: any) {
      const message = _capitalize(err!.response.data.messages[0]);
      throw new Error(message, { cause: err });
    }
  };

  return useMutation('uploadProfilePhoto', uploadProfilePhoto, {
    onSuccess: () => {
      queryClient.invalidateQueries('profile');
      queryClient.invalidateQueries('account');
    },
  });
};
