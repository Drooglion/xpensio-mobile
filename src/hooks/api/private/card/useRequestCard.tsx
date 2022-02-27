import { useState, useEffect } from 'react';

import { useResource } from 'contexts/resourceContext';
import useApi from 'hooks/useApi';

/*
 * Request Card
 *
 * Parameters
 * cardType: string
 * pin: string
 *

 * Returns
 * lock: setParams that triggers to lock
 * loading: boolean
 * errors: string[]
 *
 */

type ParamsType = {
  cardType: 'virtual' | 'physical';
  pin: string;
};

const useRequestCard = () => {
  const [params, setParams] = useState<ParamsType>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const { dispatch } = useResource();
  const { api } = useApi();

  useEffect(() => {
    const request = async () => {
      if (params) {
        setLoading(true);
        try {
          const response = await api.post('cards/requests', params);
          console.log('request response', response.data.payload);
          //const card = new Card(response.data.payload);
          //dispatch({ type: 'SET_CARD', card });
          setLoading(false);
        } catch (err: any) {
          console.log({ err });

          setError(err!.response.data.payload.messages[0] as string);
          setLoading(false);
        }
      }
    };

    request();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, dispatch]);

  return {
    request: setParams,
    loading,
    error,
  };
};

export default useRequestCard;
