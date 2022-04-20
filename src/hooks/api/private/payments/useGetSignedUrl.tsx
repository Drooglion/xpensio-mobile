import { useMutation } from 'react-query';

import useApi from 'hooks/useApi';
import _capitalize from 'lodash/capitalize';

export type ParamsType = {
  id: string;
};

const useGetSignedUrl = () => {
  const { api } = useApi();

  const getSignedUrl = async ({ id }: ParamsType) => {
    try {
      const payload = { fileType: 'image/jpeg', fileExt: 'jpg' };
      const url = `payments/${id}/attachments/request_upload_url`;
      const res = await api.post(url, payload);
      return res;
    } catch (err: any) {
      const message = _capitalize(err!.response.data.messages[0]);
      throw new Error(message, { cause: err });
    }
  };

  return useMutation('getSignedUrl', getSignedUrl);
};

export default useGetSignedUrl;
