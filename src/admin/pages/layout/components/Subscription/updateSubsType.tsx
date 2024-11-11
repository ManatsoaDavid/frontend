import React, { useEffect, useState } from 'react';
import { FaEdit, FaTimes, FaSpinner } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { ESubscriptionType } from 'shared/models/enums';
import { ISubscriptionType } from 'shared/models/subscriptionType.model';

/**************************INTERFACE DU COMPOSANT*************************/
interface UpdateSubscriptionTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (id: number, type: ESubscriptionType, price: number, description: string) => void;
  subscriptionType: ISubscriptionType | null;
}

/**************************COMPOSANT PRINCIPAL*************************/
const UpdateSubscriptionTypeModal: React.FC<UpdateSubscriptionTypeModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  subscriptionType
}) => {
  /**************************ÉTATS LOCAUX*************************/
  const [type, setType] = useState<ESubscriptionType>(ESubscriptionType.LITE);
  const [price, setPrice] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  /**************************EFFET DE MISE À JOUR DES ÉTATS*************************/
  useEffect(() => {
    if (subscriptionType) {
      setType(subscriptionType.type);
      setPrice(subscriptionType.price.toString());
      setDescription(subscriptionType.description);
    }
  }, [subscriptionType]);

  /**************************VALIDATION DU FORMULAIRE*************************/
  const validateForm = (): boolean => {
    if (!price || parseFloat(price) <= 0) {
      setError('Le prix doit être supérieur à 0');
      return false;
    }
    setError('');
    return true;
  };

  /**************************GESTION DU PRIX*************************/
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setPrice(value);
      setError('');
    }
  };

  /**************************SOUMISSION DU FORMULAIRE*************************/
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !subscriptionType?.subscriptionTypeId) return;

    try {
      setIsSubmitting(true);
      await onSubmit(subscriptionType.subscriptionTypeId, type, parseFloat(price), description);
      onClose();
    } catch (err) {
      setError('Une erreur est survenue lors de la mise à jour');
    } finally {
      setIsSubmitting(false);
    }
  };

  /**************************ANIMATIONS*************************/
  const modalVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 }
  };

  if (!isOpen || !subscriptionType) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <AnimatePresence>
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: "spring", damping: 25, stiffness: 500 }}
          className="relative top-20 mx-auto p-8 border w-96 shadow-[3px_3px_6px_#d1d9e6,-3px_-3px_6px_#ffffff] rounded-xl bg-white"
        >
          {/**************************EN-TÊTE*************************/}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Modifier l'abonnement</h3>
            <motion.button
              whileHover={{ rotate: 90 }}
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <FaTimes size={24} />
            </motion.button>
          </div>

          {/**************************FORMULAIRE*************************/}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="type" className="block text-gray-700 text-sm font-semibold mb-2">
                Type d'abonnement
              </label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value as ESubscriptionType)}
                className="w-full px-4 py-2 rounded-lg shadow-[inset_2px_2px_4px_#d1d9e6,inset_-2px_-2px_4px_#ffffff] bg-white focus:outline-none focus:ring-2 focus:ring-prim transition-all duration-300"
                disabled={isSubmitting}
              >
                {Object.values(ESubscriptionType).map((t) => (
                  <option key={t} value={t}>{t}</option>
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
                value={price}
                onChange={handlePriceChange}
                className="w-full px-4 py-2 rounded-lg shadow-[inset_2px_2px_4px_#d1d9e6,inset_-2px_-2px_4px_#ffffff] bg-white focus:outline-none focus:ring-2 focus:ring-prim transition-all duration-300"
                placeholder="0.00"
                disabled={isSubmitting}
              />
              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {error}
                </motion.p>
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
                className="w-full px-4 py-2 rounded-lg shadow-[inset_2px_2px_4px_#d1d9e6,inset_-2px_-2px_4px_#ffffff] bg-white focus:outline-none focus:ring-2 focus:ring-prim transition-all duration-300"
                placeholder="Description de l'abonnement"
                rows={3}
                disabled={isSubmitting}
              />
            </div>

            {/**************************BOUTONS*************************/}
            <div className="flex justify-end space-x-4 pt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isSubmitting}
                className="flex items-center px-6 py-2 bg-prim text-white rounded-lg shadow-[2px_2px_4px_#d1d9e6,-2px_-2px_4px_#ffffff] hover:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1)] transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <FaSpinner className="animate-spin mr-2" />
                ) : (
                  <FaEdit className="mr-2" />
                )}
                Modifier
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-[2px_2px_4px_#d1d9e6,-2px_-2px_4px_#ffffff] hover:shadow-[inset_2px_2px_4px_#d1d9e6,inset_-2px_-2px_4px_#ffffff] transition-all duration-300 disabled:opacity-50"
              >
                Annuler
              </motion.button>
            </div>
          </form>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default UpdateSubscriptionTypeModal;
