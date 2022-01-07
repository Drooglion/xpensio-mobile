export type Payment = {
  image: string | null;
  merchantName?: string;
  status?: string;
  attachments?: string[];
  createdAt: string;
  createdAtFormatted: string;
  amountTotal: number;
  originalAmount: number;
  originalCurrency: string;
}