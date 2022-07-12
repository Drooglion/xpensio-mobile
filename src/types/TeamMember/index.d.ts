import { ICard } from 'types/Card';

export interface ITeamMember {
  id: string;
  key: string;
  employee: ITeamMemberEmployee;
  teamRole: TeamRole;
  cards: ICard[];
  expenses: number;
}

export enum TeamRole {
  'MEMBER' = 0,
  'MANAGER' = 1,
  'APPROVER' = 2,
}

export interface ITeamMemberEmployee {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  root: boolean;
  photoUrl: string;
  activated: boolean;
  createdAt: string;
}

export interface ITeamMembersResponse {
  payload: ITeamMember[];
  code: string;
}

export interface ITeamManagerUser {
  email: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  photoUrl: string | null;
}

export interface ITeamManager {
  id: string;
  activated: boolean;
  role: TeamRole;
  root: boolean;
  user: ITeamManagerUser;
}
