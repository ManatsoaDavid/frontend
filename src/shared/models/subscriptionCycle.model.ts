import { ESubscriptionCycle } from './enums';

export interface ISubscriptionCycle {
  subscriptionCycleId?: number;
  cycle: ESubscriptionCycle;
  duration: number;
  createdAt?: Date;
  updatedAt?: Date;
}
