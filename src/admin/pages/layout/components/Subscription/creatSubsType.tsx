import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { FaPlus, FaSpinner, FaTimes } from 'react-icons/fa';
import { ESubscriptionType } from 'shared/models/enums';

interface CreateSubscriptionTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (type: ESubscriptionType, price: number, description: string) => void;
}

const CreateSubscriptionTypeModal: React.FC<CreateSubscriptionTypeModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [newType, setNewType] = useState<ESubscriptionType>(ESubscriptionType.LITE);
  const [newPrice, setNewPrice] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');

  const validateForm = (): boolean => {
    if (!newPrice || parseFloat(newPrice) <= 0) {
      setError('Le prix doit être supérieur à 0');
      return false;
    }
    setError('');
    return true;
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setNewPrice(value);
      setError('');
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      // Ensure the type is properly set from the enum
      const subscriptionType = ESubscriptionType[newType as keyof typeof ESubscriptionType];
      await onSubmit(subscriptionType, parseFloat(newPrice), description);
      setNewPrice('');
      setError('');
      onClose();
    } catch (err) {
      setError('Une erreur est survenue lors de la création');
    } finally {
      setIsSubmitting(false);
    }
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-8 border w-96 shadow-lg rounded-xl bg-white">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">Nouveau type d'abonnement</h3>
          <motion.button
            whileHover={{ rotate: 90 }}
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={24} />
          </motion.button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="type" className="block text-gray-700 text-sm font-semibold mb-2">
              Type d'abonnement
            </label>
            <select
              id="type"
              value={newType}
              onChange={(e) => setNewType(e.target.value as ESubscriptionType)}
              className="w-full px-4 py-2 rounded-lg shadow-[inset_3px_3px_6px_#d1d9e6,inset_-3px_-3px_6px_#ffffff] focus:outline-none focus:ring-2 focus:ring-prim"
            >
              {Object.values(ESubscriptionType).map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="price" className="block text-gray-700 text-sm font-semibold mb-2">
              Prix (Ar)
            </label>
            <input
              id="price"
              type="text"
              value={newPrice}
              onChange={handlePriceChange}
              className="w-full px-4 py-2 rounded-lg shadow-[inset_3px_3px_6px_#d1d9e6,inset_-3px_-3px_6px_#ffffff] focus:outline-none focus:ring-2 focus:ring-prim"
              placeholder="0.00"
            />
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-gray-700 text-sm font-semibold mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 rounded-lg shadow-[inset_3px_3px_6px_#d1d9e6,inset_-3px_-3px_6px_#ffffff] focus:outline-none focus:ring-2 focus:ring-prim"
              placeholder="Description de l'abonnement"
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isSubmitting}
              className="flex items-center px-6 py-2 bg-prim text-white rounded-lg shadow-[3px_3px_6px_#d1d9e6,-3px_-3px_6px_#ffffff] hover:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.1)]"
            >
              {isSubmitting ? <FaSpinner className="animate-spin mr-2" /> : <FaPlus className="mr-2" />}
              Créer
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-[3px_3px_6px_#d1d9e6,-3px_-3px_6px_#ffffff] hover:shadow-[inset_3px_3px_6px_#d1d9e6,inset_-3px_-3px_6px_#ffffff]"
            >
              Annuler
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSubscriptionTypeModal;
