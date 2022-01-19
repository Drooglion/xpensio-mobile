import { UserStatus } from 'models/User';
export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  photoUrl: string | null;
  status: UserStatus;
}
