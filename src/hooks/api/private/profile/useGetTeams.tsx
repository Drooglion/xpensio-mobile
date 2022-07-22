import { useQuery } from 'react-query';

import Team from 'models/Team';
import useApi from 'hooks/useApi';
import { ITeamsResponse } from 'types/Team';

const useGetTeams = () => {
  const { api } = useApi();

  const fetchTeams = async () => {
    try {
      const res = await api.get('teams');
      let teams: Team[] = [];
      const response = res.data as ITeamsResponse;
      response.payload.forEach(i => {
        teams.push(new Team(i));
      });
      return teams.sort((a, b) => a.name.localeCompare(b.name));
    } catch (err: any) {
      throw new Error(err);
    }
  };

  return useQuery('teams', fetchTeams);
};

export default useGetTeams;
