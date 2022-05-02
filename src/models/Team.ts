import { ITeam } from 'types/Team';

class Team {
  readonly id: string;
  readonly name: string;
  readonly memberCount: number;
  readonly companyId: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt: string | null;
  readonly defaultTeam: boolean;
  readonly monthlyLimit?: number;

  constructor({
    id,
    name,
    memberCount,
    companyId,
    createdAt,
    updatedAt,
    deletedAt,
    defaultTeam,
    monthlyLimit,
  }: ITeam) {
    this.id = id;
    this.name = name;
    this.memberCount = memberCount;
    this.companyId = companyId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
    this.defaultTeam = defaultTeam;
    this.monthlyLimit = monthlyLimit;
  }
}
export default Team;
