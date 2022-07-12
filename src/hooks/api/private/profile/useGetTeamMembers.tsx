import { useMutation } from 'react-query';

import useApi from 'hooks/useApi';
import TeamMember from 'models/TeamMember';
import { ITeamMembersResponse } from 'types/TeamMember';

export type ParamsType = {
  id: string;
};

const useGetTeamMembers = () => {
  const { api } = useApi();

  const fetchTeamMembers = async ({ id }: ParamsType) => {
    try {
      const res = await api.get(`teams/${id}/members?page=-1`);
      let members: TeamMember[] = [];
      const response = res.data as ITeamMembersResponse;
      response.payload.forEach(i => {
        members.push(new TeamMember(i));
      });
      return members;
    } catch (err: any) {
      throw new Error(err);
    }
  };

  return useMutation('teamMembers', fetchTeamMembers);
};

export default useGetTeamMembers;
