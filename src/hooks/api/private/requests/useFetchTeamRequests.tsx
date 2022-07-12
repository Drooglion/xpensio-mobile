import useApi from 'hooks/useApi';
import { useMutation } from 'react-query';
import Requests from 'models/Requests';

export type ParamsType = {
  id: string;
};

const useFetchTeamRequests = () => {
  const { api } = useApi();

  const fetchTeamRequests = async ({ id }: ParamsType) => {
    try {
      const res = await api.get(`requests/team/${id}?page=-1`);
      const requests = new Requests(res.data.payload);
      return requests.items;
    } catch (err: any) {
      console.error(err);
      throw new Error(err);
    }
  };

  return useMutation('teamRequests', fetchTeamRequests);
};

export default useFetchTeamRequests;
