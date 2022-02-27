import { useState, useEffect } from 'react';

import isEmpty from 'lodash/isEmpty';
import User from 'models/User';
import { useResource } from 'contexts/resourceContext';
import { useAuth } from 'contexts/authContext';
import useApi from 'hooks/useApi';
import Account from 'models/Account';

/*
 * Signin User
 *
 * Parameters
 * email: string
 * password: string
 *
 * Returns
 * submit: setParams that triggers to submit
 * isSubmitting: boolean
 * errors: string[]
 *
 */

type ParamsType = {
  email: string;
  password: string;
};

const useSigninUser = () => {
  const [params, setParams] = useState<ParamsType | {}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>();
  const { dispatch } = useResource();
  const { signIn } = useAuth();
  const { api } = useApi();

  useEffect(() => {
    const submit = async () => {
      if (!isEmpty(params)) {
        setIsSubmitting(true);
        try {
          const response = await api({
            method: 'post',
            url: 'account/login',
            data: params,
          });

          const user = new User(response.data.payload);
          dispatch({ type: 'SET_USER', user });
          if (user.token) {
            const acctRes = await api.get('account/me/', {
              headers: {
                Authorization: `Token ${user.token}`,
              },
            });
            const account = new Account(acctRes.data.payload);
            console.log('account', account);
            dispatch({ type: 'SET_ACCOUNT', account });
            signIn({ token: user.token, user: account });
          } else {
            signIn({ token: user.token, user: null });
          }
        } catch (err: any) {
          console.log({ err });
          /* Because api returns a firebase related error message, set a friendly message instead. */
          setError(err!.response.data.payload.messages[0] as string);
          setIsSubmitting(false);
        }
      }
    };

    submit();
  }, [params, dispatch, signIn]);

  return {
    isSubmitting,
    submit: setParams,
    error,
  };
};

export default useSigninUser;
