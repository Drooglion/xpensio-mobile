import { useState, useEffect } from 'react';

import { useResource } from 'contexts/resourceContext';
import useApi from 'hooks/useApi';
import Request from 'models/Request';

/*
 * Get Request Details
 *
 * Parameters
 * requestId: string
 *
 *
 * Returns
 * fetch: setParams that triggers to retrieve details
 * request: request object
 * loading: boolean
 * errors: string[]
 *
 */

type ParamsType = {
  requestId: string;
};

const useGetRequestDetails = () => {
  const [params, setParams] = useState<ParamsType>();
  const [request, setRequest] = useState<Request>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const { dispatch } = useResource();
  const { api } = useApi();

  useEffect(() => {
    const fetch = async () => {
      if (params) {
        setLoading(true);
        try {
          const response = await api.get(`requests/${params.requestId}`);
          console.log('request', response.data.payload);
          setRequest(new Request(response.data.payload));
          setLoading(false);
        } catch (err: any) {
          console.log({ err });

          setError(err!.response.data.payload.messages[0] as string);
          setLoading(false);
        }
      }
    };

    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, dispatch]);

  return {
    fetch: setParams,
    request,
    loading,
    error,
  };
};

export default useGetRequestDetails;
