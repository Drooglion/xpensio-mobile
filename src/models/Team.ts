import { ITeam } from 'types/Team';
import { ITeamManager } from 'types/TeamMember';

class Team {
  readonly id: string;
  readonly name: string;
  readonly memberCount?: number;
  readonly manager?: ITeamManager | null;
  readonly companyId?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly deletedAt?: string | null;
  readonly defaultTeam?: boolean;
  readonly monthlyLimit?: number;
  readonly currentExpense?: number;

  constructor({
    id,
    name,
    memberCount,
    manager,
    companyId,
    createdAt,
    updatedAt,
    deletedAt,
    defaultTeam,
    monthlyLimit,
    currentExpense,
  }: ITeam) {
    this.id = id;
    this.name = name;
    this.memberCount = memberCount;
    this.manager = manager;
    this.companyId = companyId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
    this.defaultTeam = defaultTeam;
    this.monthlyLimit = monthlyLimit;
    this.currentExpense = currentExpense;
  }
}

export default Team;
