import { createSubscriptionType, deleteSubscriptionType, fetchSubscriptionTypes, updateSubscriptionType } from 'admin/redux.toolkit/abonnementType/reducer';
import { motion } from 'framer-motion';
import React, { useCallback, useEffect, useState } from 'react';
import { FaEdit, FaPlus, FaSpinner, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { ESubscriptionType } from 'shared/models/enums';
import { ISubscriptionType } from 'shared/models/subscriptionType.model';
import { RootState } from 'store/store';

import CreateSubscriptionTypeModal from './components/Subscription/creatSubsType';
import SubscriptionTypeList from './components/Subscription/displaySubsType';
import UpdateSubscriptionTypeModal from './components/Subscription/updateSubsType';

/**************************COMPOSANT PRINCIPAL*************************/
const SubscriptionTypeManager: React.FC = () => {
  const dispatch = useDispatch();
  const { subscriptionTypes, loading, error } = useSelector((state: RootState) => state.subscriptionType);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [editingSubscriptionType, setEditingSubscriptionType] = useState<ISubscriptionType | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  /**************************CHARGEMENT INITIAL DES DONNÉES*************************/
  useEffect(() => {
    dispatch(fetchSubscriptionTypes() as any);
  }, [dispatch]);

  /**************************GESTION DES ACTIONS*************************/
  const handleCreate = useCallback(async (type: ESubscriptionType, price: number, description: string) => {
    try {
      await dispatch(createSubscriptionType({ type, price, description }) as any);
      // Refresh the data immediately after creation
      dispatch(fetchSubscriptionTypes() as any);
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Error creating subscription type:', error);
    }
  }, [dispatch]);

  const handleUpdate = useCallback((id: number, type: ESubscriptionType, price: number) => {
    dispatch(updateSubscriptionType({ id, subscriptionTypeData: { type, price } }) as any);
    setIsUpdateModalOpen(false);
  }, [dispatch]);

  const handleEdit = useCallback((st: ISubscriptionType) => {
    setEditingSubscriptionType(st);
    setIsUpdateModalOpen(true);
  }, []);

  const handleDelete = useCallback((id: number | undefined) => {
    if (id !== undefined) {
      dispatch(deleteSubscriptionType(id) as any);
    }
  }, [dispatch]);

  /**************************FILTRAGE DES TYPES*************************/
  const filteredTypes = subscriptionTypes?.filter(type => {
    if (!type || !searchTerm) return true;
    return type.type?.toString().toLowerCase().includes(searchTerm.toLowerCase());
  }) || [];

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center items-center h-screen"
      >
        <FaSpinner className="animate-spin text-4xl text-prim" />
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-red-500 p-4 rounded-lg bg-red-100"
      >
        {error}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      {/* Responsive Header Section */}
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Types d'abonnement</h2>

        <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Rechercher un type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64 px-4 py-2 rounded-lg shadow-[inset_2px_2px_4px_#d1d9e6,inset_-2px_-2px_4px_#ffffff] focus:outline-none focus:ring-2 focus:ring-prim"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center justify-center px-6 py-2 bg-prim text-white rounded-lg shadow-[2px_2px_4px_#d1d9e6,-2px_-2px_4px_#ffffff] hover:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1)]"
          >
            <FaPlus className="mr-2" />
            <span className="whitespace-nowrap">Ajouter un type</span>
          </motion.button>
        </div>
      </div>

      {/* Mobile View for Cards */}
      <div className="block sm:hidden">
        <div className="space-y-4">
          {filteredTypes.map((type) => (
            <motion.div
              key={type.subscriptionTypeId}
              className="bg-white p-4 rounded-xl shadow-[3px_3px_6px_#d1d9e6,-3px_-3px_6px_#ffffff]"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-lg">{type.type}</h3>
                  <p className="text-primary-600 font-medium">{type.price} Ar</p>
                </div>
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleEdit(type)}
                    className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg"
                  >
                    <FaEdit />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDelete(type.subscriptionTypeId)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <FaTrash />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden sm:block">
        <SubscriptionTypeList
          subscriptionTypes={filteredTypes}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <CreateSubscriptionTypeModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreate}
      />

      <UpdateSubscriptionTypeModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onSubmit={handleUpdate}
        subscriptionType={editingSubscriptionType}
      />
    </motion.div>
  );
};
export default SubscriptionTypeManager;
