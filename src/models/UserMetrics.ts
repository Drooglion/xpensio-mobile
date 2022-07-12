import { IUserMetricsResponse } from 'types/Analytics';

class UserMetrics {
  readonly expense: number;
  readonly activeCards: number;
  readonly receiptsMatched: number;
  readonly payments: number;

  constructor({
    expense,
    activeCards,
    receiptsMatched,
    payments,
  }: IUserMetricsResponse) {
    this.expense = expense;
    this.activeCards = activeCards;
    this.receiptsMatched = receiptsMatched;
    this.payments = payments;
  }
}

export default UserMetrics;
