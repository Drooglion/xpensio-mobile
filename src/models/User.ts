import { IUser } from 'types/User';
import R from 'res/R';

class User {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly photoUrl: string | null;
  readonly status: UserStatus;

  constructor({ id, firstName, lastName, email, photoUrl, status }: IUser) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.status = status;
    /* Defaults to our profile photo if user has no photo */
    this.photoUrl = photoUrl || R.images.profile_photo;
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
  };
}
export default User;

export type UserStatus =
  | 'pending'
  | 'request_for_verification'
  | 'in_progress'
  | 'verified';
