import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { FaEdit, FaTrash, FaClock } from 'react-icons/fa';
import { ISubscriptionCycle } from 'shared/models/subscriptionCycle.model';

interface Props {
  subscriptionCycles: ISubscriptionCycle[];
  onUpdateClick: (cycle: ISubscriptionCycle) => void;
  onDelete: (id: number) => void;
}

const SubscriptionCycleList: React.FC<Props> = ({ subscriptionCycles, onUpdateClick, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-[5px_5px_15px_#d1d9e6,-5px_-5px_15px_#ffffff] overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Cycle</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Durée</th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <AnimatePresence>
              {subscriptionCycles.map((cycle) => (
                <motion.tr
                  key={cycle.subscriptionCycleId}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  whileHover={{ backgroundColor: "#f9fafb" }}
                  className="transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FaClock className="text-primary-500 mr-2" />
                      <span className="text-sm font-medium text-gray-900">{cycle.cycle}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">
                      {cycle.duration} jours
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex justify-end space-x-3">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onUpdateClick(cycle)}
                        className="p-2 text-primary-600 hover:text-primary-900 rounded-full hover:bg-primary-50"
                      >
                        <FaEdit className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => cycle.subscriptionCycleId !== undefined && onDelete(cycle.subscriptionCycleId)}
                        className="p-2 text-red-600 hover:text-red-900 rounded-full hover:bg-red-50"
                      >
                        <FaTrash className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default SubscriptionCycleList;
