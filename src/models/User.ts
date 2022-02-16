import { IUser, ICompanyConfiguration } from 'types/User';
import { IUserTeams } from 'types/Team';
import R from 'res/R';

class User {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly photoUrl: string | null;
  readonly status: UserStatus;
  readonly role: RoleStatus;
  readonly createdAt: string;
  readonly companyConfiguration: ICompanyConfiguration;
  readonly teams: IUserTeams;
  readonly token: string;
  readonly firebaseToken: string;

  constructor({
    id,
    firstName,
    lastName,
    email,
    photoUrl,
    status,
    role,
    createdAt,
    companyConfiguration,
    teams,
    token,
    firebaseToken,
  }: IUser) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.status = status;
    /* Defaults to our profile photo if user has no photo */
    this.photoUrl = photoUrl || R.images.profile_photo;
    this.role = role;
    this.createdAt = createdAt;
    this.companyConfiguration = companyConfiguration;
    this.teams = teams;
    this.token = token;
    this.firebaseToken = firebaseToken;
  }

  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  verificationStatusColor() {
    switch (this.status) {
      case 'pending':
      case 'in_progress':
        return R.colors.pending;
      case 'verified':
        return R.colors.success;
      case 'request_for_verification':
        return R.colors.error;
      default:
        return '';
    }
  }

  formattedVerificationStatus() {
    const list = {
      pending: 'Pending',
      request_for_verification: 'Not Verified',
      in_progress: 'In progress',
      verified: 'Verified',
    };

    return list[this.status];
  }
}
export default User;

export type UserStatus =
  | 'pending'
  | 'request_for_verification'
  | 'in_progress'
  | 'verified';

export enum RoleStatus {
  'USER' = 0,
  'ADMIN' = 1,
  'BOOKKEEPER' = 2,
}
