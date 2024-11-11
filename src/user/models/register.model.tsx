export enum EUserType {
  PRATICIEN = 'PRATICIEN',
  VISITEUR = 'VISITEUR'
}

export enum EPractitionerType {
  MODERNE = 'MODERNE',
  TRADITIONNEL = 'TRADITIONNEL'
}

export interface IUser {
  userId?: number;
  name: string;
  firstName: string;
  email: string;
  contact: string;
  birthDate: number;
  userType: EUserType;
  avatar: string;
  password: string;
  gender: string;
  createdAt?: number;
  updatedAt?: number;
}

export interface IPractitioner extends IUser {
  practitionerId?: number;
  idCardImage: string;
  residenceCertificate: string;
  officeAddress: string;
  status: string;
  category: string;
  specialty: string;
  diploma: string;
  nationalOrder: string;
  registrationNumber: string;
}



export interface IVisitor extends IUser {
  visitorId?: number;
  address: string;
}

export type UserModel = IUser | IPractitioner | IVisitor;
