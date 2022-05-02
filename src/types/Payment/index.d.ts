import { CardStatus } from 'models/Card';
import { PaymentStatus } from 'models/Payment';

export interface IPaymentsResponse {
  result: IPayment[];
  page: number;
  total: number;
}

export interface IPayment {
  id: string;
  referenceId: string;
  orNumber: string | null;
  merchantLogo?: string | null;
  merchantName: string;
  merchantTin: string | null;
  merchantAddress: string | null;
  cardLast4: string;
  cardExpiryMonth: number;
  cardExpiryYear: number;
  amountTaxable: string | number | null;
  amountTax: string | number | null;
  amountTotal: number;
  currency: string;
  originalAmount: string;
  originalCurrency: string;
  status: PaymentStatus;
  note: string | null;
  createdAt: string;
  reason: string | null;
  request: string | null;
  team: string | null;
  category: string | null;
  project: string | null;
  card: IPaymentCard;
  attachments: IPaymentAttachment[];
  user: IPaymentUser;
}

export interface IPaymentSection extends IPayment {
  createdAtFormatted: string;
}

export interface IPaymentCard {
  id: string;
  userId: string;
  cardReferenceId: string;
  brand: string;
  cardType: string;
  currency: string;
  last4: string;
  expiryMonth: number;
  expiryYear: number;
  status: CardStatus;
  createdAt: string;
  updatedAt: string;
  activated: boolean | null;
  activationCode: string | null;
  companyId: string;
}

export interface IPaymentUser {
  id: string;
  email: string;
  firebaseUid: string | null;
  firstName: string;
  middleName?: string | null;
  lastName: string;
  mobileNumber: string;
  photoUrl: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}


export interface IPaymentAttachment {
  createdAt: string;
  updatedAt: string;
  filename: string;
  id: string;
  paymentId: string;
  url: string;
}
