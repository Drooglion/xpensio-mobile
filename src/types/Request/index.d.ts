import { RequestStatus } from 'models/Request';
import { ICategory } from 'types/Category';
import { IProject } from 'types/Project';
import { ITeam } from 'types/Team';
import { IUser } from 'types/User';

export interface IRequest {
  id: string;
  description: string;
  title: string;
  typeOfExpense: number;
  typeOfSusbscription: RequestSubscriptionType | null;
  status: RequestStatus;
  amount: number;
  cancelledDate: string | null;
  approvedDate: string | null;
  createdAt: string;
  updatedAt: string;
  team?: ITeam;
  project?: IProject;
  category?: ICategory;
  user: IUser;
}

export interface IRequestsSection extends IRequest {
  createdAtFormatted: string;
}

export interface IRequestsResponse {
  result: IRequest[];
  page: number;
  total: number;
}

export enum RequestSubscriptionType {
  'Monthly' = 1,
  'Yearly' = 2,
}
