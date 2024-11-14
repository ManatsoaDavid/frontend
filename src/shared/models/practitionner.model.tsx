

export enum EUserType {
  VISITEUR = "VISITEUR",
  PRATICIEN = "PRATICIEN",
}

export enum EPractitionerType {
  TRADITIONNEL = "TRADITIONNEL",
  MODERNE = "MODERNE",
}

export interface IPractitioner {
  userId: number;
  practitionerId?: number;
  name: string;
  firstName: string;
  email: string;
  contact: string;
  birthDate: number;
  userType: EUserType;
  avatar: string;
  password: string;
  createdAt?: number;
  updatedAt?: number;
  idCardImage: string;
  residenceCertificate: string;
  officeAddress: string;
  status: string;
  practitionerType: EPractitionerType;
}

export class Practitioner implements IPractitioner {
  userId: number;
  practitionerId?: number;
  name: string;
  firstName: string;
  email: string;
  contact: string;
  birthDate: number;
  userType: EUserType;
  avatar: string;
  password: string;
  createdAt?: number;
  updatedAt?: number;
  idCardImage: string;
  residenceCertificate: string;
  officeAddress: string;
  status: string;
  practitionerType: EPractitionerType;

  constructor(data: IPractitioner) {
    this.userId = data.userId;
    this.practitionerId = data.practitionerId;
    this.name = data.name;
    this.firstName = data.firstName;
    this.email = data.email;
    this.contact = data.contact;
    this.birthDate = data.birthDate;
    this.userType = data.userType;
    this.avatar = data.avatar;
    this.password = data.password;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.idCardImage = data.idCardImage;
    this.residenceCertificate = data.residenceCertificate;
    this.officeAddress = data.officeAddress;
    this.status = data.status;
    this.practitionerType = data.practitionerType;
  }
}
