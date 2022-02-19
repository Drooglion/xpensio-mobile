export interface ITeam {
  id: string;
  name: string;
  memberCount: number;
  companyId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  defaultTeam: boolean;
}

export interface IUserTeams {
  teamUserId: string;
  userId: string;
  teamId: string;
  role: TeamRole;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  team: ITeam[];
}

export enum TeamRole {
  'MEMBER' = 0,
  'MANAGER' = 1,
  'APPROVER' = 2,
}
