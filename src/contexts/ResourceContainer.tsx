/* A container that fetches all data and make it available
 * in the global state so that children can access it readily
 */
import React, { FC, useEffect, useState } from 'react';
import { useResource } from 'contexts/resourceContext';
import useApi from 'hooks/useApi';
import Account from 'models/Account';
import Card from 'models/Card';
import Profile from 'models/Profile';
import _isNil from 'lodash/isNil';
import { useAuth } from 'contexts/authContext';

const AccountContainer: FC = ({ children }) => {
  const { state: authState } = useAuth();
  const { state, dispatch } = useResource();
  const { api } = useApi();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const submit = async () => {
      if (authState.token) {
        setIsLoading(true);
        try {
          /* Account */
          let response;
          response = await api.get('account/me/');
          const account = new Account(response.data.payload);
          dispatch({ type: 'SET_ACCOUNT', account });

          /* Profile */
          response = await api.get('profile');
          const profile = new Profile(response.data.payload);
          dispatch({ type: 'SET_PROFILE', profile });

          /* Card */
          response = await api.get('account/me/cards');
          const card = new Card(response.data.payload);
          dispatch({ type: 'SET_CARD', card });

          setIsLoading(false);
        } catch (err: any) {
          setIsLoading(false);
          console.log({ err });
        }
      }
    };

    submit();
  }, [dispatch, authState.token]);

  return <>{children}</>;
};

export default AccountContainer;
