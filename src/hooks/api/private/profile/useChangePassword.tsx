import { useState, useEffect } from 'react';

import { useResource } from 'contexts/resourceContext';
import useApi from 'hooks/useApi';

/*
 * Change Password
 *
 * Parameters
 * currentPassword: string
 * password: string
 * confirmPassword: string
 *

 * Returns
 * lock: setParams that triggers to lock
 * loading: boolean
 * errors: string[]
 *
 */

type ParamsType = {
  currentPassword: string;
  password: string;
  confirmPassword: string;
};

const useChangePassword = () => {
  const [params, setParams] = useState<ParamsType>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const { dispatch } = useResource();
  const { api } = useApi();

  useEffect(() => {
    const changePassword = async () => {
      if (params) {
        setLoading(true);
        try {
          const response = await api.post('profile/change_password', {
            ...params,
          });
          console.log('SUCCESS CHANGEPASSWORD: ', response);
          setLoading(false);
        } catch (err: any) {
          console.log({ err });

          setError(err!.response.data.payload.messages[0] as string);
          setLoading(false);
        }
      }
    };

    changePassword();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, dispatch]);

  return {
    changePassword: setParams,
    loading,
    error,
  };
};

export default useChangePassword;
