export interface VirtualCardType {
  last4: string;
  cardNumber?: string;
  expiryMonth: string;
  expiryYear: string;
  cvv?: string;
  cardholder: string;
  status: number;
}

export interface PlasticCardType {
  last4: string;
  cardholder: string;
  status: number;
}

export interface VirtualCardRequests {
  id: string;
  dateRequested: string;
  status: string;
}
