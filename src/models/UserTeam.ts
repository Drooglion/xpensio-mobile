import { IUserTeams, TeamRole } from 'types/Team';
import Team from 'models/Team'

class UserTeam {
  readonly teamUserId: string;
  readonly userId: string;
  readonly teamId: string;
  readonly role: TeamRole;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt: string | null;
  readonly team: Team;

  constructor({
    teamUserId,
    userId,
    teamId,
    role,
    createdAt,
    updatedAt,
    deletedAt,
    team,
  }: IUserTeams) {
    this.teamUserId = teamUserId;
    this.userId = userId;
    this.teamId = teamId;
    this.role = role;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
    this.team = team;
  }
}
export default UserTeam;
