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
  code: string;
};

const useActivateCard = () => {
  const [params, setParams] = useState<ParamsType>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const { dispatch } = useResource();
  const { api } = useApi();

  useEffect(() => {
    const activate = async () => {
      if (params) {
        setLoading(true);
        try {
          const response = await api.post(`cards/${params.cardId}/activate`, {
            code: params.code,
          });
          console.log('activate response', response.data.payload);
          //const card = new Card(response.data.payload);
          setLoading(false);
        } catch (err: any) {
          console.log({ err });
          setError(err!.response.data.payload.messages[0] as string);
          setLoading(false);
        }
      }
    };

    activate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, dispatch]);

  return {
    activate: setParams,
    loading,
    error,
  };
};

export default useActivateCard;
