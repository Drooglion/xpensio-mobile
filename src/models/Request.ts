import { ICategory } from 'types/Category';
import { IProject } from 'types/Project';
import { IRequest } from 'types/Request';
import { ITeam } from 'types/Team';
import { IUser } from 'types/User';

class Request {
  readonly id: string;
  readonly description: string;
  readonly title: string;
  readonly typeOfExpense: number;
  readonly typeOfSusbscription: any;
  readonly status: number;
  readonly amount: number;
  readonly cancelledDate: string | null;
  readonly approvedDate: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly team?: ITeam;
  readonly project?: IProject;
  readonly category?: ICategory;
  readonly user: IUser;

  constructor({
    id,
    description,
    title,
    typeOfExpense,
    typeOfSusbscription,
    status,
    amount,
    cancelledDate,
    approvedDate,
    createdAt,
    updatedAt,
    team,
    project,
    category,
    user,
  }: IRequest) {
    this.id = id;
    this.description = description;
    this.title = title;
    this.typeOfExpense = typeOfExpense;
    this.typeOfSusbscription = typeOfSusbscription;
    this.status = status;
    this.amount = amount;
    this.cancelledDate = cancelledDate;
    this.approvedDate = approvedDate;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.team = team;
    this.project = project;
    this.category = category;
    this.user = user;
  }
}

export enum RequestStatus {
  'PENDING' = 0,
  'APPROVED' = 1,
  'DENIED' = 2,
  'EXPIRED' = 3,
  'UNSETTLED' = 4,
  'SETTLED' = 5,
  'CANCELLED' = 1,
}

export default Request;
