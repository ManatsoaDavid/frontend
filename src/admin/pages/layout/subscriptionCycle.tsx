import { createSubscriptionCycle, deleteSubscriptionCycle, fetchSubscriptionCycles, updateSubscriptionCycle } from 'admin/redux.toolkit/abonnementCycle/reducer';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useCallback, useEffect, useState } from 'react';
import { FaEdit, FaFilter, FaPlus, FaSearch, FaSpinner, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { ESubscriptionCycle } from 'shared/models/enums';
import { ISubscriptionCycle } from 'shared/models/subscriptionCycle.model';
import { RootState } from 'store/store';
import CreateSubscriptionCycleModal from './components/Subscription/creatSubsCycle';
import SubscriptionCycleList from './components/Subscription/displaySubsCycle';
import UpdateSubscriptionCycleModal from './components/Subscription/updateSubsCycle';

const SubscriptionCycleManager: React.FC = () => {
  const dispatch = useDispatch();
  const { subscriptionCycles, loading, error } = useSelector((state: RootState) => state.subscriptionCycle);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [editingSubscriptionCycle, setEditingSubscriptionCycle] = useState<ISubscriptionCycle | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchSubscriptionCycles() as any);
  }, [dispatch]);

  const handleCreate = useCallback((cycle: ESubscriptionCycle, duration: number) => {
    dispatch(createSubscriptionCycle({ cycle, duration }) as any);
    setIsCreateModalOpen(false);
  }, [dispatch]);

  const handleUpdate = useCallback((id: number, cycle: ESubscriptionCycle, duration: number) => {
    dispatch(updateSubscriptionCycle({ id, subscriptionCycleData: { cycle, duration } }) as any);
    setIsUpdateModalOpen(false);
  }, [dispatch]);

  const handleEdit = useCallback((sc: ISubscriptionCycle) => {
    setEditingSubscriptionCycle(sc);
    setIsUpdateModalOpen(true);
  }, []);

  const handleDelete = useCallback((id: number) => {
    dispatch(deleteSubscriptionCycle(id) as any);
  }, [dispatch]);

  const filteredCycles = subscriptionCycles.filter(cycle =>
    cycle.cycle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-4xl text-primary-500" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Cycles d'abonnement</h2>

        <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un cycle..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-lg shadow-[inset_2px_2px_4px_#d1d9e6,inset_-2px_-2px_4px_#ffffff] focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilterOpen(!filterOpen)}
              className="p-2 rounded-lg bg-white shadow-[2px_2px_4px_#d1d9e6,-2px_-2px_4px_#ffffff] hover:shadow-[inset_2px_2px_4px_#d1d9e6,inset_-2px_-2px_4px_#ffffff]"
            >
              <FaFilter className="text-primary-500" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center justify-center px-6 py-2 bg-primary-500 text-white rounded-lg shadow-[2px_2px_4px_#d1d9e6,-2px_-2px_4px_#ffffff] hover:bg-primary-600"
            >
              <FaPlus className="mr-2" />
              <span className="whitespace-nowrap">Ajouter un cycle</span>
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key="content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {filteredCycles.length > 0 ? (
            <>
              {/* Mobile View */}
              <div className="block sm:hidden space-y-4">
                {filteredCycles.map((cycle) => (
                  <motion.div
                    key={cycle.subscriptionCycleId}
                    className="bg-white p-4 rounded-xl shadow-[3px_3px_6px_#d1d9e6,-3px_-3px_6px_#ffffff]"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-800">{cycle.cycle}</h3>
                        <p className="text-gray-600">{cycle.duration} jours</p>
                      </div>
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleEdit(cycle)}
                          className="p-2 text-primary-500 hover:bg-primary-50 rounded-lg"
                        >
                          <FaEdit />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => cycle.subscriptionCycleId !== undefined && handleDelete(cycle.subscriptionCycleId)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                        >
                          <FaTrash />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Desktop View */}
              <div className="hidden sm:block">
                <SubscriptionCycleList
                  subscriptionCycles={filteredCycles}
                  onUpdateClick={handleEdit}
                  onDelete={handleDelete}
                />
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500 py-8">Aucun cycle d'abonnement trouvé.</p>
          )}
        </motion.div>
      </AnimatePresence>

      <CreateSubscriptionCycleModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreate}
      />

      <UpdateSubscriptionCycleModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onSubmit={handleUpdate}
        subscriptionCycle={editingSubscriptionCycle}
      />
    </motion.div>
  );
};

export default SubscriptionCycleManager;
