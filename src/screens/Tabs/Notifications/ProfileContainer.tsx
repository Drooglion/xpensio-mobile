import React, { FC, useEffect, useState } from 'react';
import { useResource } from 'contexts/resourceContext';
import useApi from 'hooks/useApi';
import Account from 'models/Account';
import _isNil from 'lodash/isNil';

/* Check and Fetches account/me
 * and set it to global state
 * then render the children
 * */

const AccountContainer: FC = ({ children }) => {
  const { state, dispatch } = useResource();
  const { api } = useApi();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const submit = async () => {
      if (_isNil(state.account)) {
        setIsLoading(true);
        try {
          const acctRes = await api.get('account/me/');
          const account = new Account(acctRes.data.payload);
          dispatch({ type: 'SET_ACCOUNT', account });
          setIsLoading(false);
        } catch (err: any) {
          setIsLoading(false);
          console.log({ err });
        }
      }
    };

    submit();
  }, [dispatch, state.account]);

  if (isLoading || _isNil(state.account)) {
    return null;
  }

  return <>{children}</>;
};

export default AccountContainer;
