import { ITeamManager, ITeamManagerUser, TeamRole } from 'types/TeamMember';

class TeamMember {
  readonly id: string;
  readonly activated: boolean;
  readonly role: TeamRole;
  readonly root: boolean;
  readonly user: ITeamManagerUser;

  constructor({ id, activated, role, root, user }: ITeamManager) {
    this.id = id;
    this.activated = activated;
    this.role = role;
    this.root = root;
    this.user = user;
  }
}

export default TeamMember;
