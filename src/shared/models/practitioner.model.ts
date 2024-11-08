import { IPractitioner, IUser } from '../../user/models/register.model';

export interface IPractitionerWithUser extends Omit<IPractitioner, 'name' | 'firstName' | 'email' | 'contact' | 'birthDate' | 'userType' | 'avatar' | 'createdAt' | 'updatedAt'> {
  user: IUser;
}
