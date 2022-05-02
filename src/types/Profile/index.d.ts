export type AdminVerificationStatus = {
  name: string;
  emailAddress: string;
  mobileNumber: string;
  address: string;
  birthday: string;
  gender: string;
  nationality: string;
  comments: string | null | undefined;
}

export type UserVerificationStatus =
  | 'pending'
  | 'request_for_verification'
  | 'in_progress'
  | 'verified';

export interface IProfileType  {
  id: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  email: string;
  birthday: string;
  mobileNumber: string;
  gender: number;
  nationality: string;
  addressLine1: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  userId: string;
  emailVerified: boolean;
  mobileNumberVerified: boolean;
  verificationStatus: UserVerificationStatus;
  title: string;
  addressLine2: string;
  proofOfBilling: string | null;
  isCitizen: boolean;
  createdAt: string;
  updatedAt: string;
  cardName: string;
  sssGsisNumber: string;
  tinNumber: string;
  motherFirstName: string;
  motherLastName: string;
  birthPlace: string;
  civilStatus: string;
  landline: string | null;
  suffixName: string | null;
  adminVerificationStatus: AdminVerificationStatus;
}

export interface IIdentification {
  id: string;
  type: string;
  number: string;
  expirationDate: string;
  photoFront: string;
  photoBack: string;
  userId: string;
  country: string;
  photoFrontUrl: string | null;
  photoBackUrl: string | null;
}


export interface IProfile {
  id: string;
  userId: string;
  companyId: string;
  cardholderReferenceId: string;
  role: number;
  root: boolean;
  activationCode: string;
  activated: boolean;
  default: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null | undefined;
  walletReferenceId: string | null | undefined;
  emailVerificationCode: string | null | undefined;
  identificationReferenceId: string | null | undefined;
  resetPasswordCode: string | null | undefined;
  profile: IProfileType;
  identification: IIdentification;
}
