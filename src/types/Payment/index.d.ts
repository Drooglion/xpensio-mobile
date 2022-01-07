import { PaymentStatus } from 'models/Payment';
export interface IPayment {
  id: string;
  image: string | null;
  merchantName: string;
  status: PaymentStatus;
  attachments: string[];
  createdAt: string;
  createdAtFormatted: string;
  amountTotal: number;
  originalAmount: number;
  originalCurrency: string;
}
