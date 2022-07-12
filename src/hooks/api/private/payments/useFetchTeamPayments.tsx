import Payments from 'models/Payments';
import useApi from 'hooks/useApi';
import { useMutation } from 'react-query';

export type ParamsType = {
  id?: string;
};

const useFetchTeamPayments = () => {
  const { api } = useApi();

  const fetchTeamPayments = async ({ id }: ParamsType) => {
    try {
      const res = await api.get(
        id ? `teams/${id}/payments?page=-1` : 'payments?page=-1',
      );
      const paymentsResponse = new Payments(res.data.payload);
      return paymentsResponse.items;
    } catch (err: any) {
      throw new Error(err);
    }
  };

  //return useQuery('teamPayments', fetchTeamPayments);

  return useMutation('teamPayments', fetchTeamPayments);
};

export default useFetchTeamPayments;
