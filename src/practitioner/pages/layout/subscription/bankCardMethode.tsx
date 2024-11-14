import React, { useState } from 'react';
import { FaCreditCard } from 'react-icons/fa';
import { ISubscriptionCycle } from 'shared/models/subscriptionCycle.model';
import { ISubscriptionType } from 'shared/models/subscriptionType.model';
import SubscriptionFeatures from './subscriptionFeatures';

interface BankCardPaymentProps {
  onConfirm: (paymentDetails: any) => void;
  onBack: () => void;
  amount: number;
  selectedType: ISubscriptionType;
  selectedCycle: ISubscriptionCycle;
}

const BankCardPayment: React.FC<BankCardPaymentProps> = ({ onConfirm, onBack, amount, selectedType, selectedCycle }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolder, setCardHolder] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm({ cardNumber, expiryDate, cvv, cardHolder });
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
          <FaCreditCard />
          Paiement par Carte Bancaire
        </h2>
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          Montant: {amount.toLocaleString()} Ar
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Titulaire de la carte</label>
            <input
              type="text"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              placeholder="Nom du titulaire"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Numéro de carte</label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              placeholder="XXXX XXXX XXXX XXXX"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Date d'expiration</label>
              <input
                type="text"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                placeholder="MM/YY"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">CVV</label>
              <input
                type="text"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                placeholder="XXX"
                required
              />
            </div>
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

export default BankCardPayment;
