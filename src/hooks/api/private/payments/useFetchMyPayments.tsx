import Payments from 'models/Payments';
import useApi from 'hooks/useApi';
import { useQuery } from 'react-query';

type Props = {
  onSuccess?: (payments: Payments) => void;
  onError?: (err: any) => void;
};

const useFetchMyPayments = ({ onSuccess, onError }: Partial<Props>) => {
  const { api } = useApi();

  const fetchPayments = async () => {
    try {
      const res = await api.get('payments/mine?page=-1');
      const paymentsResponse = new Payments(res.data.payload);
      onSuccess && onSuccess(paymentsResponse);
      return paymentsResponse;
    } catch (err: any) {
      onError && onError(err);
      throw new Error(err);
    }
  };

  return useQuery('myPayments', fetchPayments);
};

export default useFetchMyPayments;
