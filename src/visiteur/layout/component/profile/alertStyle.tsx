import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import React from 'react';

interface StyledAlertProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const StyledAlert: React.FC<StyledAlertProps> = ({ message, type, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg ${type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white`}
    >
      <div className="flex items-center">
        <FontAwesomeIcon
          icon={type === 'success' ? faCheckCircle : faTimesCircle}
          className="mr-2"
        />
        <span>{message}</span>
      </div>
      <button
        onClick={onClose}
        className="absolute top-1 right-1 text-white hover:text-gray-200"
      >
        ×
      </button>
    </motion.div>
  );
};

export default StyledAlert;
