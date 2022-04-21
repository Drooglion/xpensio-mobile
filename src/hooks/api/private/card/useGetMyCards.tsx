import Card from 'models/Card';
import useApi from 'hooks/useApi';
import { useQuery } from 'react-query';

type Params = {
  onSuccess?: (card: Card) => void;
  onError?: (err: any) => void;
};

const useGetMyCards = ({ onSuccess, onError }: Params) => {
  const { api } = useApi();

  const getMycards = async () => {
    try {
      const response = await api.get('account/me/cards');
      const card = new Card(response.data.payload);
      onSuccess && onSuccess(card);
      return card;
    } catch (err: any) {
      onError && onError(err);
      throw new Error(err);
    }
  };

  return useQuery('myCards', getMycards);
};

export default useGetMyCards;
