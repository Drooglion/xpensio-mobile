import { IUser } from 'types/User';
import R from 'res/R';

class User {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly photoUrl: string | null;

  constructor({ id, firstName, lastName, email, photoUrl }: IUser) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    /* Defaults to our profile photo if user has no photo */
    this.photoUrl = photoUrl || R.images.profile_photo;
  }

  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
export default User;
