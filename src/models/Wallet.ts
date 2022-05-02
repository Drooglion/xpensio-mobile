import { IWalletBalance } from 'types/Wallet';

export class UserWalletBalance {
  readonly value: number;
  readonly currency: string;

  constructor({ value, currency }: IWalletBalance) {
    this.value = value;
    this.currency = currency;
  }
}
