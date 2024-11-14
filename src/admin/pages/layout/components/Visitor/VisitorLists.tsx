import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { fetchVisitors } from 'visiteur/redux-toolkit/reducer';
import ErrorMessage from './components/ErrorMessage';
import LoadingSpinner from './components/LoadingSpinner';
import SearchBar from './components/SearchBar';
import VisitorTable from './components/VisitorTable';

const VisitorLists: React.FC = () => {
  const dispatch = useDispatch();
  const { visitors, loading, error } = useSelector((state: RootState) => state.visitor);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    dispatch(fetchVisitors() as any);
  }, [dispatch]);

  const filteredVisitors = Array.isArray(visitors) ? visitors.filter(visitor =>
    visitor.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visitor.user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="mb-8 flex flex-col md:flex-row justify-between items-center">
        <h2 className="text-3xl font-bold text-prim font-poppins flex items-center mb-4 md:mb-0">
          <FaUser className="mr-3" />
          Liste des Visiteurs
        </h2>
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      </div>

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="container mx-auto px-4 py-8"
        >
          <div className="inline-block min-w-full">
            {/* Mobile View */}
            <div className="md:hidden">
              {filteredVisitors.map((visitor) => (
                <motion.div
                  key={visitor.visitorId}
                  className="bg-white p-4 rounded-lg shadow-[2px_2px_4px_#d1d9e6,-2px_-2px_4px_#ffffff] mb-4"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center mb-3">
                    <div className="font-medium text-prim">{visitor.user.name} {visitor.user.firstName}</div>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div><span className="font-semibold">Email:</span> {visitor.user.email}</div>
                    <div><span className="font-semibold">Contact:</span> {visitor.user.contact}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Desktop View */}
            <div className="hidden md:block">
              <VisitorTable visitors={filteredVisitors} />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default VisitorLists;
