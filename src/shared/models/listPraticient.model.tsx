export interface User {
  userId: number;
  name: string;
  firstName: string;
  email: string;
  contact: string;
  birthDate: string | null;
  userType: string;
  avatar: string | null;
  practitioner?: Practitioner[];
}

export interface Practitioner extends Omit<User, 'practitioner'> {
  praticienModerne: any;
  praticienTradition: any;
  practitionerId: number;
  nationalIdNumber: string;
  idCardImage: string;
  residenceCertificate: string;
  officeAddress: string;
  status: string;
  practitionerType: string;
  speciality: string;
  category: string;
}

export interface IPractitionerModern extends Practitioner {
  modernPractitionerId?: number;
  category: string;
  specialty: string;
  diploma: string;
  nationalOrder: string;
  registrationNumber: string;
}

export interface IPractitionerTraditional extends Practitioner {
  traditionalPractitionerId?: number;
  competence: string;
}
