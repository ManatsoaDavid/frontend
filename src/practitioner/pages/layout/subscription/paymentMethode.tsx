import React, { useState } from 'react';
import { FaCreditCard, FaMobileAlt } from 'react-icons/fa';
import { ISubscriptionCycle } from 'shared/models/subscriptionCycle.model';
import { ISubscriptionType } from 'shared/models/subscriptionType.model';
import BankCardPayment from './bankCardMethode';
import MobileMoneyPayment from './mobilMoneyMethode';
import SubscriptionFeatures from './subscriptionFeatures';



interface PaymentMethodProps {
  onConfirm: (paymentDetails: any) => void;
  onCancel: () => void;
  amount: number;
  selectedType: ISubscriptionType;
  selectedCycle: ISubscriptionCycle;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({ onConfirm, onCancel, amount, selectedType, selectedCycle }) => {
  const [paymentType, setPaymentType] = useState<'initial' | 'mobile' | 'card'>('initial');

  const handleBack = () => {
    setPaymentType('initial');
  };

  if (paymentType === 'mobile') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <MobileMoneyPayment
          amount={amount}
          onConfirm={onConfirm}
          onBack={handleBack}
          selectedType={selectedType}
          selectedCycle={selectedCycle}
        />
      </div>
    );
  }

  if (paymentType === 'card') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <BankCardPayment
          amount={amount}
          onConfirm={onConfirm}
          onBack={handleBack}
          selectedType={selectedType}
          selectedCycle={selectedCycle}

        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

      <div className="grid md:grid-cols-2 gap-8">

        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-4 dark:text-wh">Récapitulatif du plan</h3>
          <div className="space-y-4">
            <div>
              <p className="text-lg font-semibold dark:text-wh">{selectedType.type}</p>
              <p className="text-primary-500 text-2xl font-bold">{selectedType.price.toLocaleString()} Ar/mois</p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400">Durée: {selectedCycle.cycle}</p>
              <p className="text-gray-600 dark:text-gray-400">Total: {amount.toLocaleString()} Ar</p>
            </div>
            <SubscriptionFeatures type={selectedType.type} />
          </div>
        </div>

        <div className="bg-wh dark:bg-gray-800 rounded-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 dark:text-wh">Choisir le mode de paiement</h2>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            Montant total: {amount.toLocaleString()} Ar
          </p>

          <div className="space-y-4">
            <button
              onClick={() => setPaymentType('mobile')}
              className="w-full bg-primary-500 text-wh py-4 px-6 rounded-lg
                     hover:bg-primary-600 transition-colors duration-200
                     flex items-center justify-center gap-3"
            >
              <FaMobileAlt />
              Mobile Money
            </button>

            <button
              onClick={() => setPaymentType('card')}
              className="w-full bg-primary-500 text-wh py-4 px-6 rounded-lg
                     hover:bg-primary-600 transition-colors duration-200
                     flex items-center justify-center gap-3"
            >
              <FaCreditCard />
              Carte bancaire
            </button>

            <button
              onClick={onCancel}
              className="w-full border border-gray-300 text-gray-700 dark:text-gray-300
                     py-4 px-6 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700
                     transition-colors duration-200"
            >
              Annuler
            </button>
          </div>
        </div>

      </div>



    </div>
  );
};

export default PaymentMethod;
