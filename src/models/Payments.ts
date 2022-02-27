import { IPaymentsResponse } from 'types/Payment';
import Payment from './Payment';

class Payments {
  readonly items: Payment[];
  readonly page: number;
  readonly total: number;

  constructor({ result, page, total }: IPaymentsResponse) {
    this.items = [];
    this.page = page;
    this.total = total;

    result.forEach(i => this.items.push(new Payment(i)));
  }
}

export default Payments;
