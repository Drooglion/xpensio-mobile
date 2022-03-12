import { IProfile, IProfileType, IIdentification } from 'types/Profile';
import R from 'res/R';

class Profile {
  readonly id: string;
  readonly userId: string;
  readonly cardholderReferenceId: string;
  readonly role: number;
  readonly root: boolean;
  readonly activationCode: string;
  readonly activated: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt: string | null | undefined;
  readonly walletReferenceId: string | null | undefined;
  readonly emailVerificationCode: string | null | undefined;
  readonly identificationReferenceId: string | null | undefined;
  readonly resetPasswordCode: string | null | undefined;
  readonly profile: IProfileType;
  readonly identification: IIdentification;

  constructor({
    id,
    userId,
    cardholderReferenceId,
    role,
    root,
    activationCode,
    activated,
    createdAt,
    updatedAt,
    deletedAt,
    walletReferenceId,
    emailVerificationCode,
    identificationReferenceId,
    resetPasswordCode,
    profile,
    identification,
  }: IProfile) {
    this.id = id;
    this.userId = userId;
    this.cardholderReferenceId = cardholderReferenceId;
    this.role = role;
    this.root = root;
    this.activationCode = activationCode;
    this.activated = activated;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
    this.walletReferenceId = walletReferenceId;
    this.emailVerificationCode = emailVerificationCode;
    this.identificationReferenceId = identificationReferenceId;
    this.resetPasswordCode = resetPasswordCode;
    this.profile = profile;
    this.identification = identification;
  }
  verificationStatusColor() {
    switch (this.profile.verificationStatus) {
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

  formatVerificationStatus() {
    const list = {
      pending: 'Pending',
      request_for_verification: 'Not Verified',
      in_progress: 'In progress',
      verified: 'Verified',
    };
    return list[this.profile.verificationStatus];
  };


}

export default Profile;
