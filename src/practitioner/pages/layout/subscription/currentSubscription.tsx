import React from 'react';
import { ISubscription } from 'shared/models/subscription.model';

interface CurrentSubscriptionProps {
  currentSubscription: ISubscription;
  subscriptionTypes: any[];
  subscriptionCycles: any[];
}

const CurrentSubscription: React.FC<CurrentSubscriptionProps> = ({
  currentSubscription,
  subscriptionTypes,
  subscriptionCycles,
}) => {
  const subscriptionType = subscriptionTypes.find(
    type => type.subscriptionTypeId === currentSubscription.subscriptionTypeId
  );
  const subscriptionCycle = subscriptionCycles.find(
    cycle => cycle.subscriptionCycleId === currentSubscription.subscriptionCycleId
  );

  return (
    <div className="bg-wh dark:bg-side dark:text-wh  rounded-lg p-6 mb-8">
      <h2 className="text-lg font-bold mb-4 font-mono">Abonnement en cours</h2>
      <div className="space-y-2">
        <p>Type: {subscriptionType?.type}</p>
        <p>Cycle: {subscriptionCycle?.cycle}</p>
        <p>Montant: {currentSubscription.amount} Ar</p>
        <p>Status: {currentSubscription.status}</p>
        <p>Date début: {new Date(currentSubscription.startDate).toLocaleDateString()}</p>
        <p>Date fin: {new Date(currentSubscription.endDate).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default CurrentSubscription;
