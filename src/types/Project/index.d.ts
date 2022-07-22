export interface IProject {
  id: string;
  companyId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  description: string | null;
}

export interface IProjectsResponse {
  payload: IProject[];
  code: string;
}
