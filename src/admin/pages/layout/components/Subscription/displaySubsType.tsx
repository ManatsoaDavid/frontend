import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ISubscriptionType } from 'shared/models/subscriptionType.model';

interface SubscriptionTypeListProps {
  subscriptionTypes: ISubscriptionType[];
  onEdit: (st: ISubscriptionType) => void;
  onDelete: (id: number | undefined) => void;
}

const SubscriptionTypeList: React.FC<SubscriptionTypeListProps> = ({ subscriptionTypes, onEdit, onDelete }) => {
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
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Prix</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <AnimatePresence>
              {subscriptionTypes.map((st: ISubscriptionType) => (
                <motion.tr
                  key={st.subscriptionTypeId}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  whileHover={{ backgroundColor: "#f9fafb" }}
                  className="transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full ${st.type === 'TRIAL' ? 'bg-yellow-400' :
                          st.type === 'LITE' ? 'bg-blue-400' :
                            st.type === 'PREMIUM' ? 'bg-purple-400' :
                              'bg-green-400'
                        } mr-3`} />
                      <span className="text-sm font-medium text-gray-900">{st.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">{st.price} Ar</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{st.description}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex justify-end space-x-3">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onEdit(st)}
                        className="p-2 text-primary-600 hover:text-primary-900 rounded-full hover:bg-primary-50"
                      >
                        <FaEdit className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onDelete(st.subscriptionTypeId)}
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

export default SubscriptionTypeList;
