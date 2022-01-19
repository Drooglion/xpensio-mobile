import { IPayment } from 'types/Payment';
import StringUtils from 'library/utils/StringUtils';
import NumberUtils from 'library/utils/NumberUtils';

class Payment {
  readonly id: string;
  readonly image: string | null;
  readonly merchantName: string;
  readonly status: PaymentStatus;
  readonly attachments: Record<string, string>[];
  readonly createdAt: string;
  readonly createdAtFormatted: string;
  readonly amountTotal: number;
  readonly originalAmount: number;
  readonly originalCurrency: string;

  constructor({
    id,
    image,
    merchantName,
    status,
    attachments,
    createdAt,
    createdAtFormatted,
    amountTotal,
    originalAmount,
    originalCurrency,
  }: IPayment) {
    this.id = id;
    this.image = image;
    this.merchantName = merchantName;
    this.status = status;
    this.attachments = attachments;
    this.createdAt = createdAt;
    this.createdAtFormatted = createdAtFormatted;
    this.amountTotal = amountTotal;
    this.originalAmount = originalAmount;
    this.originalCurrency = originalCurrency;
  }

  isApproved() {
    return PaymentStatus[this.status] === 'APPROVED';
  }

  isDenied() {
    return PaymentStatus[this.status] === 'DENIED';
  }

  isDisapproved() {
    return PaymentStatus[this.status] === 'DISAPPROVED';
  }

  merchantNameInitials() {
    return StringUtils.getInitials(this.merchantName);
  }

  amountFormatted(currency?: string) {
    return NumberUtils.formatCurrency(
      currency || this.originalCurrency,
      this.amountTotal,
    );
  }
}

export enum PaymentStatus {
  'DISAPPROVED' = 0,
  'APPROVED' = 1,
  'DENIED' = -1,
}

export default Payment;