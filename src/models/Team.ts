import { ITeam } from 'types/Team';

class Team {
  readonly id: string;
  readonly name: string;
  readonly memberCount: number;

  constructor({ id, name, memberCount }: ITeam) {
    this.id = id;
    this.name = name;
    this.memberCount = memberCount;
  }
}
export default Team;
