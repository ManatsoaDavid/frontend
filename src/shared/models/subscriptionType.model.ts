import { ESubscriptionType } from "./enums";

export interface ISubscriptionType {
  subscriptionTypeId?: number;
  type: ESubscriptionType;
  description: string;
  price: number;
}

export class SubscriptionType implements ISubscriptionType {
  public subscriptionTypeId!: number;
  public type!: ESubscriptionType;
  public description!: string;
  public price!: number;

  constructor(data: ISubscriptionType) {
    Object.assign(this, data);
  }
}
