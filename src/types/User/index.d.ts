import { RoleStatus, UserStatus } from 'models/User';
import { IUserTeams } from 'types/Team';
export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  photoUrl: string | null;
  status: UserStatus;
  role: RoleStatus;
  createdAt: string;
  companyConfiguration: ICompanyConfiguration;
  teams: IUserTeams;
  token: string;
  firebaseToken: string;
}
export interface ICompanyConfiguration {
  id: string;
  currency: string;
  plan: string;
  pricePerUser: string | null;
  freePlan: string | null;
  monthlySupport: string | null;
  pricePerMonthSupport: string;
  invoiceContact: string;
  invoiceCompany: string;
  invoiceAddress: string;
  companyId: string;
  countryCode: string;
  spendingLimit: number;
  perPurchaseLimit: number;
  //token: string;
  //firebaseToken: string;
}

export interface IUserCompany {
  id: string;
  name: string;
  address?: string;
  companyPhoto: string | null;
  createdAt: string;
}

export interface IUserTask {
  code: string;
  description: string;
  visible: boolean;
  completed: boolean;
}
