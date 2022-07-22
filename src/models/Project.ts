import { IProject } from 'types/Project';

class Project {
  readonly id: string;
  readonly name: string;
  readonly description: string | null;
  readonly companyId: string;
  readonly createdAt: string;
  readonly updatedAt: string;

  constructor({
    id,
    name,
    description,
    companyId,
    createdAt,
    updatedAt,
  }: IProject) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.companyId = companyId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export default Project;
