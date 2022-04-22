import { CardStatus } from 'models/Card';
import { RoleStatus } from 'models/User';
import { IUserTeams } from 'types/Team';
import { ICompanyConfiguration, IUserCompany, IUserTask } from 'types/User';

export interface ICardResponse {
  id: string;
  companyId: string;
  company: IUserCompany;
  user: ICardUser;
  roleName: string;
  role: RoleStatus;
  root: boolean;
  isDefault: boolean;
  cards: ICard[];
  cardRequests: ICardRequest[];
  companyConfiguration: ICompanyConfiguration;
  teams: IUserTeams;
  userTasks: IUserTask[];
}

export interface ICardUser {
  firstName: string;
  lastName: string;
  email: string;
  photoUrl: string | null;
}

export interface ICard {
  id: string;
  brand: string;
  cardType: CardType;
  currency: string;
  cardNumber?: string;
  last4: string;
  expiryMonth: number;
  expiryYear: number;
  cvv?: string;
  cardReferenceId: string;
  status: CardStatus;
}

export interface ICardRequest {
  id: string;
  userId: string;
  cardType: string;
  status: number;
  processedBy: string | null;
  createdAt: string;
  updatedAt: string;
  companyId: string;
}

export type CardType = 'physical' | 'virtual';
