import { IAccounting, ICategory } from 'types/Category';

class Category {
  readonly id: string;
  readonly name: string;
  readonly companyId: string;
  readonly accountingId: string | null;
  readonly accounting: IAccounting | null;
  readonly createdAt: string;
  readonly updatedAt: string;

  constructor({
    id,
    name,
    companyId,
    accountingId,
    accounting,
    createdAt,
    updatedAt,
  }: ICategory) {
    this.id = id;
    this.name = name;
    this.companyId = companyId;
    this.accounting = accounting;
    this.accountingId = accountingId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export default Category;
