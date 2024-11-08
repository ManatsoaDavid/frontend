import { EAppointmentStatus } from "./enums";

export interface IAppointment {
  appointmentId: number;
  visitorId: number;
  availabilityId: number;
  createdAt: number;
  updatedAt: number;
  status: string;
  reason: string | null;
  rejectionReason: string | null;
  postponedDate: number | null;
  cancellationReason: string | null;
  dateAppointment: number;
  practitionerId: number | null;
  practitionerAppointments: {
    availabilityId: number;
    agendaId: number;
    status: string;
    date: number | null;
    startTime: number;
    endTime: number;
    agenda: {
      agendaId: number;
      practitionerId: number;
      category: string;
    };
  };
}

export class Appointment implements IAppointment {
  public appointmentId!: number;
  public visitorId!: number;
  public availabilityId!: number;
  public createdAt!: number;
  public updatedAt!: number;
  public status!: EAppointmentStatus;
  public reason!: string | null;
  public rejectionReason!: string | null;
  public postponedDate!: number | null;
  public cancellationReason!: string | null;
  public dateAppointment!: number;
  public practitionerId!: number | null;
  public practitionerAppointments!: {
    availabilityId: number;
    agendaId: number;
    status: string;
    date: number | null;
    startTime: number;
    endTime: number;
    agenda: {
      agendaId: number;
      practitionerId: number;
      category: string;
    };
  };
}
