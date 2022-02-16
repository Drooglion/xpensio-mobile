import { useState, useEffect } from 'react';

import isEmpty from 'lodash/isEmpty';
import User from 'models/User';
import axios from 'axios';
import { useResource } from 'contexts/resourceContext';
import { useAuth } from 'contexts/authContext';

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

  useEffect(() => {
    const submit = async () => {
      if (!isEmpty(params)) {
        setIsSubmitting(true);
        try {
          const response = await axios({
            method: 'post',
            url: 'https://backend.xpens.io/api/v1/account/login',
            data: params,
          });

          const user = new User(response.data.payload);
          dispatch({ type: 'SET_USER', user });
          console.log({ token: user.token, user: user });
          signIn({ token: user.token, user: user });
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
