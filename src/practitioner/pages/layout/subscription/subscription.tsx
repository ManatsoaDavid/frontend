import axios from 'axios';
import { selectSubscriptions } from 'practitioner/redux.toolkit/subscription/selector';
import React, { useEffect, useState } from 'react';
import { FaCrown, FaRegClock } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import StyledAlert from 'shared/alert/alertStyle';
import { ISubscription } from 'shared/models/subscription.model';
import { ISubscriptionCycle } from 'shared/models/subscriptionCycle.model';
import { ISubscriptionType } from 'shared/models/subscriptionType.model';
import { useAppSelector } from 'store/hooks';
import { localStorageService } from 'utils/localStorageService';
import { createSubscription, fetchSubscriptions } from '../../../redux.toolkit/subscription/reducer';
import CurrentSubscription from './currentSubscription';
import PaymentMethod from './paymentMethode';
import SubscriptionFeatures from './subscriptionFeatures';




const Subscription: React.FC = () => {
  const dispatch = useDispatch();
  const [subscriptionTypes, setSubscriptionTypes] = useState<ISubscriptionType[]>([]);
  const [subscriptionCycles, setSubscriptionCycles] = useState<ISubscriptionCycle[]>([]);


  const [alertInfo, setAlertInfo] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const subscriptions = useAppSelector(selectSubscriptions);

  const practitionerId = parseInt(localStorageService.getItem('practitionerId'));

  // chercher l'abonnement du practitioner
  const currentSubscription = subscriptions.find(
    (sub: ISubscription) => sub.practitionerId === practitionerId
  );


  useEffect(() => {
    const fetchData = async () => {
      try {
        const typesResponse = await axios.get(`${process.env.REACT_APP_API_URL}/subscriptionType`);
        setSubscriptionTypes(typesResponse.data.data);

        const cyclesResponse = await axios.get(`${process.env.REACT_APP_API_URL}/subscriptionCycle`);
        setSubscriptionCycles(cyclesResponse.data.data);

        //fetcher les données de l'abonnement du practitioner
        dispatch(fetchSubscriptions() as any);

      } catch (error) {
        console.error('Error fetching subscription data:', error);
      }
    };

    fetchData();
  }, [dispatch]);




  //////////////paymentMethode/////////////////////
  const [showPaymentMethod, setShowPaymentMethod] = useState(false);
  const [pendingSubscription, setPendingSubscription] = useState<{
    typeId: number;
    cycleId: number;
    amount: number;
    selectedType: ISubscriptionType;
    selectedCycle: ISubscriptionCycle;
  } | null>(null);

  ////modification de handlesubscribe function

  const handleSubscribe = (typeId: number, cycleId: number) => {
    const selectedTypeObj = subscriptionTypes.find(type => type.subscriptionTypeId === typeId);
    const selectedCycleObj = subscriptionCycles.find(cycle => cycle.subscriptionCycleId === cycleId);
    const price = selectedTypeObj ? selectedTypeObj.price : 0;
    const duration = selectedCycleObj ? selectedCycleObj.duration : 0;
    let amount = (price * duration) / 30;

    setPendingSubscription({
      typeId,
      cycleId,
      amount,
      selectedType: selectedTypeObj!,
      selectedCycle: selectedCycleObj!
    });
    setShowPaymentMethod(true);
  };

  ////ajout de nouvelle fonction handleconfirmeSubscription
  const handleConfirmSubscription = () => {
    if (pendingSubscription) {
      dispatch(createSubscription({
        practitionerId,
        subscriptionTypeId: pendingSubscription.typeId,
        subscriptionCycleId: pendingSubscription.cycleId,
        amount: pendingSubscription.amount
      }) as any)
        .then(() => {
          setAlertInfo({ message: 'Votre abonnement est bien enregistré!', type: 'success' });
          setShowPaymentMethod(false);
        })
        .catch((error: any) => {
          setAlertInfo({ message: 'Impossible d\'enregistrer votre abonnement, veuillez réessayer.', type: 'error' });
          console.error('erreur:', error);
        });
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <header className="bg-gradient-to-r from-primary-500 to-primary-600 py-8 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold font-mono text-wh flex items-center gap-3">
            <FaCrown className="text-yellow-300" />
            Plans & Abonnements
          </h1>
        </div>
      </header>

      {alertInfo && (
        <StyledAlert
          message={alertInfo.message}
          type={alertInfo.type}
          onClose={() => setAlertInfo(null)}
        />
      )}

      <main className="container mx-auto mt-16 px-4">
        {currentSubscription && (
          <CurrentSubscription
            currentSubscription={currentSubscription}
            subscriptionTypes={subscriptionTypes}
            subscriptionCycles={subscriptionCycles}
          />
        )}

        {!currentSubscription && (
          <>
            <h2 className="text-2xl font-bold mb-12 text-center font-mono dark:text-wh">
              Sélectionnez votre plan premium
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {subscriptionTypes.map((type) => (
                <div key={type.subscriptionTypeId}
                  className="bg-wh dark:bg-gray-800 rounded-xl p-8 flex flex-col
                            shadow-lg hover:shadow-xl transition-shadow duration-300
                            border border-gray-100 dark:border-gray-700">
                  <h3 className="text-xl font-bold font-sans mb-4 dark:text-wh flex items-center gap-2">
                    <FaCrown className="text-yellow-500" />
                    {type.type}
                  </h3>
                  <p className="text-3xl font-bold font-sans mb-6 dark:text-wh">
                    {type.price.toLocaleString()} Ar
                    <span className="text-sm text-gray-500 dark:text-gray-400">/mois</span>
                  </p>

                  <div className="flex-grow space-y-4 mb-6">
                    <SubscriptionFeatures type={type.type} />
                  </div>

                  <div className="space-y-3">
                    {subscriptionCycles.map((cycle) => (
                      <button
                        key={cycle.subscriptionCycleId}
                        onClick={() => handleSubscribe(type.subscriptionTypeId as any, cycle.subscriptionCycleId as any)}
                        className="w-full bg-primary-500 text-wh py-3 px-6 rounded-lg
                               hover:bg-primary-600 transition-colors duration-200
                               flex items-center justify-center gap-2 font-medium"
                      >
                        <FaRegClock />
                        {cycle.cycle}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {showPaymentMethod && pendingSubscription && (
          <PaymentMethod
            amount={pendingSubscription.amount}
            selectedType={pendingSubscription.selectedType}
            selectedCycle={pendingSubscription.selectedCycle}
            onConfirm={handleConfirmSubscription}
            onCancel={() => setShowPaymentMethod(false)}
          />
        )}
      </main>
    </div>
  );
};

export default Subscription;
