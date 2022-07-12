import { ICard } from 'types/Card';
import { ITeamMember, ITeamMemberEmployee, TeamRole } from 'types/TeamMember';

class TeamMember {
  readonly id: string;
  readonly key: string;
  readonly employee: ITeamMemberEmployee;
  readonly teamRole: TeamRole;
  readonly cards: ICard[];
  readonly expenses: number;

  constructor({ id, key, employee, teamRole, cards, expenses }: ITeamMember) {
    this.id = id;
    this.key = key;
    this.employee = employee;
    this.teamRole = teamRole;
    this.cards = cards;
    this.expenses = expenses;
  }
}

export default TeamMember;
