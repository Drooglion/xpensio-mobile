import { useMutation } from 'react-query';

import useApi from 'hooks/useApi';
import _capitalize from 'lodash/capitalize';

const useRequestOtpPassword = () => {
  const { api } = useApi();

  const requestOtpPassword = async () => {
    try {
      const res = await api.post('account/otp_password');
      return res;
    } catch (err: any) {
      const message = _capitalize(err!.response.data.messages[0]);
      throw new Error(message, { cause: err });
    }
  };

  return useMutation('requestOtpPassword', requestOtpPassword);
};

export default useRequestOtpPassword;
