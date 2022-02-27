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
 * unlock: setParams that triggers to unlock
 * loading: boolean
 * errors: string[]
 *
 */

type ParamsType = {
  cardId: string;
  pin: string;
};

const useUnlockCard = () => {
  const [params, setParams] = useState<ParamsType>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const { dispatch } = useResource();
  const { api } = useApi();

  useEffect(() => {
    const unlock = async () => {
      if (params) {
        setLoading(true);
        try {
          const response = await api.put(`cards/${params.cardId}/unlock`, {
            pin: params.pin,
          });
          console.log('unlock response', response.data.payload);
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

    unlock();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, dispatch]);

  return {
    unlock: setParams,
    loading,
    error,
  };
};

export default useUnlockCard;
