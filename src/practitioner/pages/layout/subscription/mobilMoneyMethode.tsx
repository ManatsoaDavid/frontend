import React, { useState } from 'react';
import { FaMobileAlt } from 'react-icons/fa';
import { ISubscriptionCycle } from 'shared/models/subscriptionCycle.model';
import { ISubscriptionType } from 'shared/models/subscriptionType.model';
import SubscriptionFeatures from './subscriptionFeatures';

interface MobileMoneyPaymentProps {
  onConfirm: (paymentDetails: any) => void;
  onBack: () => void;
  amount: number;
  selectedType: ISubscriptionType;
  selectedCycle: ISubscriptionCycle;

}

const MobileMoneyPayment: React.FC<MobileMoneyPaymentProps> = ({ onConfirm, onBack, amount, selectedType, selectedCycle }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [operator, setOperator] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm({ phoneNumber, operator });
  };

  return (

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
        <h2 className="text-2xl font-bold mb-6 dark:text-wh flex items-center gap-2">
          <FaMobileAlt />
          Paiement Mobile Money
        </h2>
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          Montant: {amount.toLocaleString()} Ar
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Opérateur</label>
            <select
              value={operator}
              onChange={(e) => setOperator(e.target.value)}
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              required
            >
              <option value="">Sélectionner un opérateur</option>
              <option value="mvola">MVola</option>
              <option value="orangemoney">Orange Money</option>
              <option value="airtel">Airtel Money</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Numéro de téléphone</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              placeholder="034 XX XXX XX"
              required
            />
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="submit"
              className="flex-1 bg-primary-500 text-wh py-3 px-6 rounded-lg hover:bg-primary-600"
            >
              Confirmer
            </button>
            <button
              type="button"
              onClick={onBack}
              className="flex-1 border border-gray-300 text-gray-700 dark:text-gray-300 py-3 px-6 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Retour
            </button>
          </div>
        </form>
      </div>


    </div>
  );
};

export default MobileMoneyPayment;
