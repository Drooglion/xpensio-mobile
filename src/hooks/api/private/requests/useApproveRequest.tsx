import { useState, useEffect } from 'react';

import { useResource } from 'contexts/resourceContext';
import useApi from 'hooks/useApi';
import Request from 'models/Request';

/*
 * Approve Request
 *
 * Parameters
 * requestId: string
 *
 *
 * Returns
 * approve: setParams that triggers to approve request
 * approvedRequest: updated request object
 * loading: boolean
 * errors: string[]
 *
 */

type ParamsType = {
  requestId: string;
};

const useApproveRequest = () => {
  const [params, setParams] = useState<ParamsType>();
  const [approvedRequest, setApprovedRequest] = useState<Request>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const { dispatch } = useResource();
  const { api } = useApi();

  useEffect(() => {
    const approve = async () => {
      if (params) {
        setLoading(true);
        try {
          const response = await api.put(
            `requests/${params.requestId}/approve`,
          );
          console.log('approve', response.data.payload);
          setApprovedRequest(new Request(response.data.payload));
          setLoading(false);
        } catch (err: any) {
          console.log({ err });

          setError(err!.response.data.payload.messages[0] as string);
          setLoading(false);
        }
      }
    };

    approve();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, dispatch]);

  return {
    approve: setParams,
    approvedRequest,
    loading,
    error,
  };
};

export default useApproveRequest;
