import React from 'react';
import { FaCheck, FaClock, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface ModalButtonsProps {
  onStatusChange: (newStatus: string) => void;
  currentStatus: string;
}

const ModalButtons: React.FC<ModalButtonsProps> = ({ onStatusChange }) => {
  return (
    <div className="flex flex-wrap justify-end gap-4">
      <motion.button
        whileHover={{ scale: 1.05, backgroundColor: "#eab308" }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onStatusChange('attente')}
        className="flex items-center gap-2 bg-yellow-500 text-white px-6 py-3 rounded-lg
          shadow-[3px_3px_6px_#d1d9e6,-3px_-3px_6px_#ffffff]
          hover:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.1)]
          transition-all duration-300"
      >
        <FaClock className="text-lg" />
        <span className="font-medium">En attente</span>
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05, backgroundColor: "#22c55e" }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onStatusChange('accepter')}
        className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg
          shadow-[3px_3px_6px_#d1d9e6,-3px_-3px_6px_#ffffff]
          hover:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.1)]
          transition-all duration-300"
      >
        <FaCheck className="text-lg" />
        <span className="font-medium">Accepter</span>
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05, backgroundColor: "#ef4444" }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onStatusChange('refuser')}
        className="flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-lg
          shadow-[3px_3px_6px_#d1d9e6,-3px_-3px_6px_#ffffff]
          hover:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.1)]
          transition-all duration-300"
      >
        <FaTimes className="text-lg" />
        <span className="font-medium">Refuser</span>
      </motion.button>
    </div>
  );
};


export default ModalButtons;
