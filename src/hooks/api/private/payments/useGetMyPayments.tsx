import { useState, useEffect } from 'react';

import Payments from 'models/Payments';
import { useResource } from 'contexts/resourceContext';
import useApi from 'hooks/useApi';

/*
 * Get Payments
 *
 * Returns
 * data: payments response object
 * refresh: function retrieve user's payments
 * loading: boolean
 * errors: string[]
 *
 */

const useGetMyPayments = () => {
  const [data, setData] = useState<Payments>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const { dispatch } = useResource();
  const { api } = useApi();

  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      try {
        const res = await api.get('payments/mine?page=-1');
        const paymentsResponse = new Payments(res.data.payload);
        dispatch({ type: 'SET_PAYMENTS', payments: paymentsResponse.items });
        console.log({ payments: paymentsResponse.items });
        setData(paymentsResponse);
        setLoading(false);
      } catch (err: any) {
        console.log({ err });
        /* Because api returns a firebase related error message, set a friendly message instead. */
        setError(err!.response.data.payload.messages[0] as string);
        setLoading(false);
      }
    };

    fetchPayments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const refresh = async () => {
    setLoading(true);
    try {
      const res = await api.get('payments/mine?page=-1');
      const paymentsResponse = new Payments(res.data.payload);
      dispatch({ type: 'SET_PAYMENTS', payments: paymentsResponse.items });
      console.log({ payments: paymentsResponse.items });
      setData(paymentsResponse);
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

export default useGetMyPayments;
