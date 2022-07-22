import { useQuery } from 'react-query';

import useApi from 'hooks/useApi';
import Project from 'models/Project';
import { IProjectsResponse } from 'types/Project';

const useGetProjects = () => {
  const { api } = useApi();

  const fetchProjects = async () => {
    try {
      const res = await api.get('projects');
      let projects: Project[] = [];
      const response = res.data as IProjectsResponse;
      response.payload.forEach(i => {
        projects.push(new Project(i));
      });
      return projects.sort((a, b) => a.name.localeCompare(b.name));
    } catch (err: any) {
      throw new Error(err);
    }
  };

  return useQuery('projects', fetchProjects);
};

export default useGetProjects;
