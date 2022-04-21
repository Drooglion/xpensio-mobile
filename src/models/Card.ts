import { ICard, ICardRequest, ICardResponse, ICardUser } from 'types/Card';
import { IUserTeams } from 'types/Team';
import { ICompanyConfiguration, IUserCompany, IUserTask } from 'types/User';
import { RoleStatus } from './User';

class Card {
  readonly id: string;
  readonly companyId: string;
  readonly company: IUserCompany;
  readonly user: ICardUser;
  readonly roleName: string;
  readonly role: RoleStatus;
  readonly root: boolean;
  readonly isDefault: boolean;
  readonly cards: ICard[];
  readonly cardRequests: ICardRequest[];
  readonly companyConfiguration: ICompanyConfiguration;
  readonly teams: IUserTeams;
  readonly userTasks: IUserTask[];

  constructor({
    id,
    companyId,
    company,
    user,
    roleName,
    role,
    root,
    isDefault,
    cards,
    cardRequests,
    companyConfiguration,
    teams,
    userTasks,
  }: ICardResponse) {
    this.id = id;
    this.companyId = companyId;
    this.company = company;
    this.user = user;
    this.roleName = roleName;
    this.role = role;
    this.root = root;
    this.isDefault = isDefault;
    this.cards = cards;
    this.cardRequests = cardRequests;
    this.companyConfiguration = companyConfiguration;
    this.teams = teams;
    this.userTasks = userTasks;
  }

  getVirtualCards() {
    return this.cards.filter(c => c.cardType === 'virtual');
  }

  getPhysicalCards() {
    return this.cards.filter(c => c.cardType === 'physical');
  }
}

export default Card;

export enum CardStatus {
  'INACTIVE' = 0,
  'ACTIVE' = 1,
  'LOCKED' = 2,
}
