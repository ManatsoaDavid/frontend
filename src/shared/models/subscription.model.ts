import { ISubscriptionCycle } from './subscriptionCycle.model';
import { ISubscriptionType } from './subscriptionType.model';

export interface ISubscription {
  subscriptionId?: number;
  practitionerId: number;
  subscriptionCycleId: number;
  subscriptionTypeId: number;
  startDate: number;
  endDate: number;
  status: string;
  amount: number;
  type?: ISubscriptionType;
  cycle?: ISubscriptionCycle;
  practitioner?: {
    userId: number;
    name: string;
    firstName: string;
    email: string;
    contact: string;
  };
}


export default class Subscription implements ISubscription {
  public subscriptionId!: number;
  public practitionerId!: number;
  public subscriptionCycleId!: number;
  public subscriptionTypeId!: number;
  public startDate!: number;
  public endDate!: number;
  public status!: string;
  public amount!: number;
  public type?: ISubscriptionType;
  public cycle?: ISubscriptionCycle;
}
