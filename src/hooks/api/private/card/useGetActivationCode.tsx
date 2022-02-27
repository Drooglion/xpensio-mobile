import { useState, useEffect } from 'react';

import { useResource } from 'contexts/resourceContext';
import useApi from 'hooks/useApi';

/*
 * Activate Card
 *
 * Parameters
 * cardId: string
 * code: string
 *

 * Returns
 * activate: setParams that triggers activateCard
 * loading: boolean
 * errors: string[]
 *
 */

type ParamsType = {
  cardId: string;
  last4: string;
};

const useGetActivationCode = () => {
  const [params, setParams] = useState<ParamsType>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const { dispatch } = useResource();
  const { api } = useApi();

  useEffect(() => {
    const requestActivationCode = async () => {
      if (params) {
        setLoading(true);
        try {
          const response = await api.post(
            `cards/${params.cardId}/get_activation_code`,
            {
              last4: params.last4,
            },
          );
          console.log('code response', response.data.payload);
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

    requestActivationCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, dispatch]);

  return {
    requestActivationCode: setParams,
    loading,
    error,
  };
};

export default useGetActivationCode;
