import { useState, useEffect } from 'react';

import { useResource } from 'contexts/resourceContext';
import useApi from 'hooks/useApi';
import Requests from 'models/Requests';
import { IRequest } from 'types/Request';

/*
 * Get Requests
 *
 * Returns
 * data: requests response object
 * refresh: function retrieve user's requests
 * loading: boolean
 * errors: string[]
 *
 */

type ParamType = {
  page: number;
};

const useGetMyRequests = () => {
  //const [params, setParams] = useState<ParamType>();
  const [data, setData] = useState<IRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const { dispatch } = useResource();
  const { api } = useApi();

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const res = await api.get('requests/me');
        const requests = new Requests(res.data.payload);
        dispatch({ type: 'SET_REQUESTS', requests: requests.items });
        console.log({ requests: requests.items });
        setData(requests.items);
        setLoading(false);
      } catch (err: any) {
        console.log({ err });
        /* Because api returns a firebase related error message, set a friendly message instead. */
        setError(err!.response.data.payload.messages[0] as string);
        setLoading(false);
      }
    };

    fetchRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const refresh = async () => {
    setLoading(true);
    try {
      const res = await api.get('requests/me?page=1');
      const requests = new Requests(res.data.payload);
      dispatch({ type: 'SET_REQUESTS', requests: requests.items });
      console.log({ requests: requests.items });
      setData(requests.items);
      setLoading(false);
    } catch (err: any) {
      console.log({ err });
      /* Because api returns a firebase related error message, set a friendly message instead. */
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

export default useGetMyRequests;
