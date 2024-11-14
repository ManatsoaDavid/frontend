import { IUser, IVisitor } from "user/models/register.model";

export interface IvisitorWithUser extends Omit<IVisitor, 'name' | 'firstName' | 'email' | 'contact' | 'birthDate' | 'userType' | 'avatar' | 'createdAt' | 'updatedAt'> {
  user: IUser;
}
