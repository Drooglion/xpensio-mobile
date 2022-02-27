import { useState, useEffect } from 'react';

import { useResource } from 'contexts/resourceContext';
import useApi from 'hooks/useApi';

/*
 * Lock Card
 *
 * Parameters
 * cardId: string
 * pin: string
 *

 * Returns
 * lock: setParams that triggers to lock
 * loading: boolean
 * errors: string[]
 *
 */

type ParamsType = {
  cardId: string;
  pin: string;
};

const useLockCard = () => {
  const [params, setParams] = useState<ParamsType>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const { dispatch } = useResource();
  const { api } = useApi();

  useEffect(() => {
    const lock = async () => {
      if (params) {
        setLoading(true);
        try {
          const response = await api.put(`cards/${params.cardId}/lock`, {
            pin: params.pin,
          });
          console.log('lock response', response.data.payload);
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

    lock();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, dispatch]);

  return {
    lock: setParams,
    loading,
    error,
  };
};

export default useLockCard;
