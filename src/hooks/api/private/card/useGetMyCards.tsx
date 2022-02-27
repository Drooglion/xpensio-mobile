import { useState, useEffect } from 'react';

import Card from 'models/Card';
import { useResource } from 'contexts/resourceContext';
import useApi from 'hooks/useApi';
import { ICardResponse } from 'types/Card';

/*
 * Get Cards
 *
 * Returns
 * data: cards response object
 * refresh: function retrieve user's cards
 * loading: boolean
 * errors: string[]
 *
 */

const useGetMyCards = () => {
  const [data, setData] = useState<ICardResponse>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const { dispatch } = useResource();
  const { api } = useApi();

  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      try {
        const response = await api.get('account/me/cards');
        const card = new Card(response.data.payload);
        dispatch({ type: 'SET_CARD', card });
        console.log({ card: card });
        setData(card);
        setLoading(false);
      } catch (err: any) {
        console.log({ err });
        /* Because api returns a firebase related error message, set a friendly message instead. */
        setError(err!.response.data.payload.messages[0] as string);
        setLoading(false);
      }
    };

    fetchCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const refresh = async () => {
    setLoading(true);
    try {
      const response = await api.get('account/me/cards');
      const card = new Card(response.data.payload);
      dispatch({ type: 'SET_CARD', card });
      console.log({ card: card });
      setData(card);
      setLoading(false);
    } catch (err: any) {
      console.log({ err });
      setError(err!.response.data.payload.messages[0] as string);
      setLoading(false);
    }
  };

  return {
    data,
    refresh,
    loading,
    error,
  };
};

export default useGetMyCards;
