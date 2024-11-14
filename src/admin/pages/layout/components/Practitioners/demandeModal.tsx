import { fetchPraticiens } from 'admin/redux.toolkit/praticient/reducer';
import axios from 'axios';
import { motion } from 'framer-motion';
import React from 'react';
import ReactDOM from 'react-dom';
import { FaCertificate, FaEnvelope, FaTimes, FaUser } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { IPractitionerWithUser } from 'shared/models/practitioner.model';
import { AppDispatch } from 'store/store';
import ModalButtons from './modalButtons';

interface DemandeModalProps {
  practitioner: IPractitionerWithUser;
  onClose: () => void;
}

const DemandeModal: React.FC<DemandeModalProps> = ({ practitioner, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const API = process.env.REACT_APP_API_URL;
  const IMAGE_API = `${API?.replace('/api', '')}/uploads`;

  const handleStatusChange = async (newStatus: string) => {
    try {
      // Update status in backend
      await axios.put(`${API}/update/${practitioner.userId}`, {
        status: newStatus,
      });

      // Send email notification
      await axios.post(`${API}/envoyer-email`, {
        userId: practitioner.userId,
        status: newStatus,
        email: practitioner.user.email,
        name: practitioner.user.name
      });

      // Show success notification
      toast.success(`Statut mis à jour avec succès: ${newStatus}`);

      // Refresh practitioners list
      dispatch(fetchPraticiens());
      onClose();
    } catch (error) {
      toast.error("Erreur lors de la mise à jour du statut");
      console.error("Error updating practitioner status:", error);
    }
  };

  return ReactDOM.createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white p-8 rounded-xl max-w-2xl w-full m-4 shadow-2xl"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-prim">Détails de la demande</h2>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 transition-colors"
          >
            <FaTimes size={24} />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {[
            { icon: FaUser, label: "Nom", value: practitioner.user.name },
            { icon: FaUser, label: "Prénom", value: practitioner.user.firstName },
            { icon: FaEnvelope, label: "Email", value: practitioner.user.email },
          ].map((item, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
              <item.icon className="text-prim" size={20} />
              <div>
                <span className="font-semibold text-gray-600">{item.label}:</span>
                <span className="ml-2 text-gray-800">{item.value}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { title: 'Certificat', image: practitioner.residenceCertificate },
            { title: 'CIN', image: practitioner.idCardImage },
            { title: 'Diplome', image: practitioner.diploma }
          ].map((doc) => (
            <motion.div
              key={doc.title}
              whileHover={{ scale: 1.02 }}
              className="flex flex-col items-center bg-gray-50 p-4 rounded-lg"
            >
              <div className="flex items-center space-x-2 mb-3">
                <FaCertificate className="text-prim" size={20} />
                <p className="font-semibold text-gray-700">{doc.title}</p>
              </div>
              {doc.image ? (
                <img
                  src={`${IMAGE_API}/${doc.image}`}
                  alt={doc.title}
                  className="w-full h-40 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow"
                />
              ) : (
                <p className="text-gray-500 italic">Non disponible</p>
              )}
            </motion.div>
          ))}
        </div>

        <ModalButtons
          onStatusChange={handleStatusChange}
          currentStatus={practitioner.status}
        />
      </motion.div>
    </motion.div>,
    document.body
  );
};

export default DemandeModal;
