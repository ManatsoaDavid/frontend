import { deletePraticien } from 'admin/redux.toolkit/praticient/reducer';
import { motion } from 'framer-motion';
import React from 'react';
import { FaEye, FaTrashAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { IPractitionerWithUser } from 'shared/models/practitioner.model';

interface RequestRowProps {
  practitioner: IPractitionerWithUser;
  onViewDetails: (practitioner: IPractitionerWithUser) => void;
}

const RequestRow: React.FC<RequestRowProps> = ({ practitioner, onViewDetails }) => {
  const dispatch = useDispatch();
  const IMAGE_API = `${process.env.REACT_APP_API_URL?.replace('/api', '') || ''}/uploads`;

  const handleDelete = () => {
    if (practitioner.userId) {
      dispatch(deletePraticien(practitioner.userId.toString()) as any);
    }
  };

  return (
    <motion.tr
      whileHover={{ backgroundColor: "#f9fafb" }}
      className="hover:shadow-[inset_3px_3px_6px_#d1d9e6,inset_-3px_-3px_6px_#ffffff] transition-all duration-300"
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            {practitioner.user.avatar ? (
              <img
                src={`http://localhost:5000/uploads/${practitioner.user.avatar}`}
                alt="Avatar"
                className="h-10 w-10 rounded-full object-cover shadow-[3px_3px_6px_#d1d9e6,-3px_-3px_6px_#ffffff]"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-prim text-white flex items-center justify-center shadow-[3px_3px_6px_#d1d9e6,-3px_-3px_6px_#ffffff]">
                {practitioner.user.name.charAt(0)}{practitioner.user.firstName.charAt(0)}
              </div>
            )}
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {practitioner.user.name} {practitioner.user.firstName}
            </div>
            <div className="text-sm text-gray-500">{practitioner.user.contact}</div>
          </div>
        </div>
      </td>
      <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{practitioner.user.email}</div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full shadow-[2px_2px_4px_#d1d9e6,-2px_-2px_4px_#ffffff] ${practitioner.status === 'nouveau' ? 'bg-blue-100 text-blue-800' :
          practitioner.status === 'attente' ? 'bg-yellow-100 text-yellow-800' :
            practitioner.status === 'accepter' ? 'bg-green-100 text-green-800' :
              'bg-red-100 text-red-800'
          }`}>
          {practitioner.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex justify-end space-x-3">
          {practitioner.status !== 'accepter' && practitioner.status !== 'refuser' && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onViewDetails(practitioner)}
              className="p-2 text-indigo-600 hover:text-indigo-900 rounded-full shadow-[3px_3px_6px_#d1d9e6,-3px_-3px_6px_#ffffff] hover:shadow-[inset_3px_3px_6px_#d1d9e6,inset_-3px_-3px_6px_#ffffff] transition-all duration-300"
            >
              <FaEye className="w-5 h-5" />
            </motion.button>
          )}
          {(practitioner.status === 'accepter' || practitioner.status === 'refuser') && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDelete}
              className="p-2 text-red-600 hover:text-red-900 rounded-full shadow-[3px_3px_6px_#d1d9e6,-3px_-3px_6px_#ffffff] hover:shadow-[inset_3px_3px_6px_#d1d9e6,inset_-3px_-3px_6px_#ffffff] transition-all duration-300"
            >
              <FaTrashAlt className="w-5 h-5" />
            </motion.button>
          )}
        </div>
      </td>
    </motion.tr>
  );
};

export default RequestRow;
