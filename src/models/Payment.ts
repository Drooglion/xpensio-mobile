import { IPayment, IPaymentCard, IPaymentUser } from 'types/Payment';
import StringUtils from 'library/utils/StringUtils';
import NumberUtils from 'library/utils/NumberUtils';

class Payment {
  readonly id: string;
  readonly referenceId: string;
  readonly orNumber: string | null;
  readonly merchantLogo?: string | null;
  readonly merchantName: string;
  readonly merchantTin: string | null;
  readonly merchantAddress: string | null;
  readonly cardLast4: string;
  readonly cardExpiryMonth: number;
  readonly cardExpiryYear: number;
  readonly amountTaxable: string | number | null;
  readonly amountTax: string | number | null;
  readonly amountTotal: number;
  readonly currency: string;
  readonly originalAmount: string;
  readonly originalCurrency: string;
  readonly status: PaymentStatus;
  readonly note: string | null;
  readonly createdAt: string;
  readonly reason: string | null;
  readonly request: string | null;
  readonly team: string | null;
  readonly category: string | null;
  readonly project: string | null;
  readonly card: IPaymentCard;
  readonly attachments: any[];
  readonly user: IPaymentUser;

  constructor({
    id,
    referenceId,
    orNumber,
    merchantLogo,
    merchantName,
    merchantTin,
    merchantAddress,
    cardLast4,
    cardExpiryMonth,
    cardExpiryYear,
    amountTaxable,
    amountTax,
    amountTotal,
    currency,
    originalAmount,
    originalCurrency,
    status,
    note,
    createdAt,
    reason,
    request,
    team,
    category,
    project,
    card,
    attachments,
    user,
  }: IPayment) {
    this.id = id;
    this.referenceId = referenceId;
    this.orNumber = orNumber;
    this.merchantLogo = merchantLogo;
    this.merchantName = merchantName;
    this.merchantTin = merchantTin;
    this.merchantAddress = merchantAddress;
    this.cardLast4 = cardLast4;
    this.cardExpiryMonth = cardExpiryMonth;
    this.cardExpiryYear = cardExpiryYear;
    this.amountTaxable = amountTaxable;
    this.amountTax = amountTax;
    this.amountTotal = amountTotal;
    this.currency = currency;
    this.originalAmount = originalAmount;
    this.originalCurrency = originalCurrency;
    this.status = status;
    this.note = note;
    this.createdAt = createdAt;
    this.reason = reason;
    this.request = request;
    this.team = team;
    this.category = category;
    this.project = project;
    this.card = card;
    this.attachments = attachments;
    this.user = user;
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
