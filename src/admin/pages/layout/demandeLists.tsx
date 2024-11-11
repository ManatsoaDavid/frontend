import { fetchAllPractitioners } from 'practitioner/redux.toolkit/reducer';
import { selectAllPractitioners, selectPractitionerLoading, selectPractitionerError } from 'practitioner/redux.toolkit/selector';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { FaEye, FaSearch, FaSpinner, FaUserMd } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { IPractitionerWithUser } from 'shared/models/practitioner.model';
import { AppDispatch } from 'store/store';
import DemandeModal from './components/Practitioners/demandeModal';
import DemandeTabs from './components/Practitioners/demandeTabs';

const DemandeLists: React.FC = () => {
  const [activeTab, setActiveTab] = useState('new');
  const [selectedUser, setSelectedUser] = useState<IPractitionerWithUser | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const practitioners = useSelector(selectAllPractitioners);
  const loading = useSelector(selectPractitionerLoading);
  const error = useSelector(selectPractitionerError);

  useEffect(() => {
    dispatch(fetchAllPractitioners());
  }, [dispatch]);

  const filteredPractitioners = Array.isArray(practitioners) ? practitioners.filter((practitioner: IPractitionerWithUser) =>
    practitioner.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    practitioner.user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  const newRequests = filteredPractitioners.filter((practitioner: IPractitionerWithUser) =>
    practitioner.status === 'nouveau'
  );

  const pendingRequests = filteredPractitioners.filter((practitioner: IPractitionerWithUser) =>
    practitioner.status === 'attente'
  );

  const historyRequests = filteredPractitioners.filter((practitioner: IPractitionerWithUser) =>
    practitioner.status === 'accepter' || practitioner.status === 'refuser'
  );



  /**************************GESTION DU CHARGEMENT*************************/
  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center items-center h-screen"
      >
        <FaSpinner className="animate-spin text-4xl text-prim" />
      </motion.div>
    )
  }

  /**************************GESTION DES ERREURS*************************/
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-red-500 p-4 bg-red-100 rounded-lg"
      >
        {error}
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      {/**************************EN-TÊTE*************************/}
      <div className="mb-8 flex flex-col items-center space-y-6">
        <h2 className="text-3xl font-bold text-prim font-poppins flex items-center">
          <FaUserMd className="mr-3" />
          Demandes de Praticiens
        </h2>

        {/**************************BARRE DE RECHERCHE*************************/}
        <div className="relative w-full md:w-96">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un praticien..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg shadow-[inset_2px_2px_4px_#d1d9e6,inset_-2px_-2px_4px_#ffffff] bg-white focus:outline-none focus:ring-2 focus:ring-prim transition-all duration-300"
          />
        </div>

        {/**************************ONGLETS*************************/}
        <div className="flex flex-wrap justify-center gap-4">
          {['new', 'pending', 'history'].map((tab) => (
            <motion.button
              key={tab}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold rounded-lg transition-all duration-300
                ${activeTab === tab
                  ? 'bg-prim text-white shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1)]'
                  : 'bg-white text-gray-700 shadow-[2px_2px_4px_#d1d9e6,-2px_-2px_4px_#ffffff] hover:shadow-[inset_2px_2px_4px_#d1d9e6,inset_-2px_-2px_4px_#ffffff]'
                }`}
            >
              {tab === 'new' ? 'Nouvelles' : tab === 'pending' ? 'En attente' : 'Historique'}
            </motion.button>
          ))}
        </div>
      </div>
      {/**************************CONTENU DES ONGLETS*************************/}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-[3px_3px_6px_#d1d9e6,-3px_-3px_6px_#ffffff]"
        >
          {/* Vue Mobile */}
          <div className="block md:hidden">
            {activeTab === 'new' && newRequests.map((practitioner: IPractitionerWithUser) => (
              <motion.div
                key={practitioner.userId}
                className="p-4 mb-4 bg-white rounded-lg shadow-[2px_2px_4px_#d1d9e6,-2px_-2px_4px_#ffffff]"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center space-x-3 mb-3">
                  {practitioner.user.avatar && (
                    <img
                      src={`http://localhost:5000/uploads/${practitioner.user.avatar}`}
                      alt="Avatar"
                      className="w-12 h-12 rounded-full border-2 border-prim"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold text-prim">
                      {practitioner.user.name} {practitioner.user.firstName}
                    </h3>
                    <p className="text-sm text-gray-600">{practitioner.user.email}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Contact:</span> {practitioner.user.contact}</p>
                  <div className="flex justify-between items-center mt-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold
          ${practitioner.status === 'nouveau' ? 'bg-blue-100 text-blue-800' :
                        practitioner.status === 'attente' ? 'bg-yellow-100 text-yellow-800' :
                          practitioner.status === 'accepter' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'}`}
                    >
                      {practitioner.status}
                    </span>
                    <button
                      onClick={() => setSelectedUser(practitioner)}
                      className="text-prim hover:text-blue-700 transition-colors"
                    >
                      <FaEye size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
            {/* Similar blocks for pendingRequests and historyRequests */}
          </div>

          {/* Vue Desktop */}
          <div className="hidden md:block">
            <DemandeTabs
              activeTab={activeTab}
              newRequests={newRequests}
              pendingRequests={pendingRequests}
              historyRequests={historyRequests}
              onViewDetails={setSelectedUser}
            />
          </div>
        </motion.div>
      </AnimatePresence>
      {/**************************MODAL DE DÉTAILS*************************/}
      <AnimatePresence>
        {selectedUser && (
          <DemandeModal
            practitioner={selectedUser}
            onClose={() => setSelectedUser(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default DemandeLists
