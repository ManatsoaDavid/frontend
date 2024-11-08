import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { localStorageService } from 'utils/localStorageService';
import { createSubscription } from '../../../../redux.toolkit/subscription/reducer';

interface SubscriptionType {
  subscriptionTypeId: number;
  type: string;
  price: number;
}

interface SubscriptionCycle {
  subscriptionCycleId: number;
  cycle: string;
  duration: number;
}

const Subscription: React.FC = () => {
  const dispatch = useDispatch();
  const [subscriptionTypes, setSubscriptionTypes] = useState<SubscriptionType[]>([]);
  const [subscriptionCycles, setSubscriptionCycles] = useState<SubscriptionCycle[]>([]);
  const [selectedType, setSelectedType] = useState<number | null>(null);
  const [selectedCycle, setSelectedCycle] = useState<number | null>(null);

  const practitionerId = parseInt(localStorageService.getItem('practitionerId'));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const typesResponse = await axios.get(`${process.env.REACT_APP_API_URL}/subscriptionType`);
        setSubscriptionTypes(typesResponse.data.data);

        const cyclesResponse = await axios.get(`${process.env.REACT_APP_API_URL}/subscriptionCycle`);
        setSubscriptionCycles(cyclesResponse.data.data);
      } catch (error) {
        console.error('Error fetching subscription data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubscribe = (typeId: number, cycleId: number) => {
    setSelectedType(typeId);
    setSelectedCycle(cycleId);

    const selectedTypeObj = subscriptionTypes.find(type => type.subscriptionTypeId === typeId);
    const selectedCycleObj = subscriptionCycles.find(cycle => cycle.subscriptionCycleId === cycleId);
    const price = selectedTypeObj ? selectedTypeObj.price : 0;
    const duration = selectedCycleObj ? selectedCycleObj.duration : 0;
    let amount = price * duration;

    dispatch(createSubscription({
      practitionerId,
      subscriptionTypeId: typeId,
      subscriptionCycleId: cycleId,
      amount: amount
    }) as any);

    console.log("selectedCycle:", cycleId, "selectedType:", typeId, "amount:", amount);
  };

  return (
    <div className="bg-dark min-h-screen text-light">
      <header className="bg-prim py-6">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold font-mono">Abonnement</h1>
        </div>
      </header>

      <main className="container mx-auto mt-16">
        <h2 className="text-lg font-bold mb-8 text-center font-mono">Choisissez votre plan</h2>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {subscriptionTypes.map((type) => (
            <div key={type.subscriptionTypeId} className="bg-side rounded-lg p-6 flex flex-col">
              <h3 className="text-lg font-sans font-bold mb-4">{type.type}</h3>
              <p className="text-lg font-bold font-sans mb-6">{type.price}<span className="text-lg"> Ar/month</span></p>

              {subscriptionCycles.map((cycle) => (
                <button
                  key={cycle.subscriptionCycleId}
                  onClick={() => handleSubscribe(type.subscriptionTypeId, cycle.subscriptionCycleId)}
                  className="bg-prim text-light py-2 px-4 rounded hover:bg-opacity-80 transition-colors mb-2"
                >
                  {cycle.cycle}
                </button>
              ))}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Subscription;
