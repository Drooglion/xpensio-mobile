export interface ICategory {
  id: string;
  companyId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  accountingId: string | null;
  accounting: IAccounting;
}

export interface IAccounting {
  id: string;
  name: string;
  number: string;
  description: string | null;
  companyId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICategoriesResponse {
  payload: ICategory[];
  code: string;
}
