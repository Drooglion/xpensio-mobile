import { useMutation } from 'react-query';

import useApi from 'hooks/useApi';
import _capitalize from 'lodash/capitalize';

export const useGetSignedUrl = () => {
  const { api } = useApi();

  const getSignedUrl = async ({}) => {
    try {
      const payload = { fileType: 'image/jpeg', fileExt: 'jpg' };
      const url = 'profile/upload_profile_photo/request_upload_url';
      const res = await api.post(url, payload);
      return res;
    } catch (err: any) {
      const message = _capitalize(err!.response.data.messages[0]);
      throw new Error(message, { cause: err });
    }
  };

  return useMutation('getSignedUrl', getSignedUrl);
};
