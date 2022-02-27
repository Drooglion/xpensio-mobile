import { IRequestsResponse } from 'types/Request';
import Request from './Request';

class Requests {
  readonly items: Request[];
  readonly page: number;
  readonly total: number;

  constructor({ result, page, total }: IRequestsResponse) {
    this.items = [];
    this.page = page;
    this.total = total;

    result.forEach(i => this.items.push(new Request(i)));
  }
}

export default Requests;
