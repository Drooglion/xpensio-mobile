import Payments from 'models/Payments';
import useApi from 'hooks/useApi';
import { useQuery } from 'react-query';

const useFetchMyPayments = () => {
  const { api } = useApi();

  const fetchPayments = async () => {
    try {
      const res = await api.get('payments/mine?page=-1');
      const paymentsResponse = new Payments(res.data.payload);
      return paymentsResponse;
    } catch (err: any) {
      throw new Error(err);
    }
  };

  return useQuery('myPayments', fetchPayments);
};

export default useFetchMyPayments;
