import _isEmpty from 'lodash/isEmpty'

import {
  IUser,
  ICompanyConfiguration,
  IUserCompany,
  IUserTask,
  IUserAccount,
} from 'types/User';
import UserTeam from 'models/UserTeam';
import { ICard, ICardRequest } from 'types/Card';

class Account {
  readonly id: string;
  readonly companyId: string;
  readonly company: IUserCompany;
  readonly user: IUser;
  readonly roleName: string;
  readonly role: number;
  readonly root: boolean;
  readonly cards: ICard[];
  readonly cardRequests: ICardRequest[];
  readonly companyConfiguration: ICompanyConfiguration;
  readonly teams: UserTeam[];
  readonly userTasks: IUserTask[];

  constructor({
    id,
    companyId,
    company,
    user,
    roleName,
    role,
    root,
    cards,
    cardRequests,
    companyConfiguration,
    teams,
    userTasks,
  }: IUserAccount) {
    this.id = id;
    this.companyId = companyId;
    this.company = company;
    this.user = user;
    this.roleName = roleName;
    this.role = role;
    this.root = root;
    this.cards = cards;
    this.cardRequests = cardRequests;
    this.companyConfiguration = companyConfiguration;
    this.teams = teams;
    this.userTasks = userTasks;
  }

  getCurrency() {
    return this.companyConfiguration.currency;
  }

  getActAsAdmin() {
    const teamsActingAsAdmin = this.teams.filter(team => team.role !== 0);
    const actAsAdmin = this.role !== 0 || !_isEmpty(teamsActingAsAdmin);
    return actAsAdmin;
  }
}

export default Account;
