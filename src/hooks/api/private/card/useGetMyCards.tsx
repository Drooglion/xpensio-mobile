import { useState, useEffect } from 'react';

import Card from 'models/Card';
import { useResource } from 'contexts/resourceContext';
import useApi from 'hooks/useApi';
import { ICardResponse } from 'types/Card';

/*
 * Get Cards
 *
 * Returns
 * cards: array of Card
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
        const response = await api.get('account/me/cards', {
          headers: {
            Authorization:
              'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOiI0ODU4ZTQ3Yi1kMmNhLTQzYjYtYmE3ZC0wYmQwYzI0MjVmNjAiLCJ1c2VyX2lkIjoiMTc3OTVkMzktYmNlMS00MTg2LTgwZmYtMjY4YWM2ZTg3NjRjIiwiY29tcGFueV9pZCI6IjFmYjY1YzRmLTI3YzYtNGI4ZC1iOGVjLWRmOTZlZTExY2UxYiIsImRlZmF1bHQiOmZhbHNlLCJhY3RpdmF0ZWQiOnRydWV9LCJpYXQiOjE2NDUxNzk3NjksImV4cCI6MTY0NTc4NDU2OX0.Fqx3VIARycQ3q-aYTYCo5fw-DoBqy9GuFdzoW7MBaDQ',
          },
        });

        console.log({ response });

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
  }, [dispatch]);

  return {
    data,
    loading,
    error,
  };
};

export default useGetMyCards;
