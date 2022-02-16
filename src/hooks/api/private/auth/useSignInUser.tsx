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
 *
 */

type ParamsType = {
  email: string;
  password: string;
};

const useSigninUser = () => {
  const [params, setParams] = useState<ParamsType | {}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
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
        } catch (error) {
          console.log({ error });
          setIsSubmitting(false);
        }
      }
    };

    submit();
  }, [params]);

  return {
    isSubmitting,
    submit: setParams,
  };
};

export default useSigninUser;
