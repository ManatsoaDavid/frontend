import { AnimatePresence, motion } from "framer-motion";
import { fetchAllPractitioners } from "practitioner/redux.toolkit/reducer";
import { selectAllPractitioners, selectPractitionerError, selectPractitionerLoading } from "practitioner/redux.toolkit/selector";
import React, { useEffect, useState } from "react";
import { FaSearch, FaSpinner, FaUserMd } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { IPractitionerWithUser } from "shared/models/practitioner.model";
const ListePraticiens: React.FC = () => {
  const dispatch = useDispatch();
  const practitioners = useSelector(selectAllPractitioners);
  const loading = useSelector(selectPractitionerLoading);
  const error = useSelector(selectPractitionerError);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    dispatch(fetchAllPractitioners() as any);// Check what data is coming through
  }, [dispatch]);


  const filteredPractitioners = Array.isArray(practitioners)
    ? practitioners.filter((practitioner: IPractitionerWithUser) =>
    (practitioner.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      practitioner.user.firstName.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    : [];
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
        className="text-center text-red-500 p-4 bg-red-100 rounded-lg"
      >
        {error}
      </motion.div>
    );
  }

  return (
    <motion.div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-center">
        <h2 className="text-3xl font-bold text-prim font-poppins flex items-center mb-4 md:mb-0">
          <FaUserMd className="mr-3" />
          Liste des Praticiens
        </h2>

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
      </div>

      <AnimatePresence>
        <motion.div className="bg-white rounded-xl shadow-[3px_3px_6px_#d1d9e6,-3px_-3px_6px_#ffffff] overflow-hidden">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full">
              {/* Mobile View */}
              <div className="md:hidden">
                {filteredPractitioners.map((practitioner: IPractitionerWithUser) => (
                  <motion.div
                    key={practitioner.practitionerId}
                    className="bg-white p-4 rounded-lg shadow-[2px_2px_4px_#d1d9e6,-2px_-2px_4px_#ffffff] mb-4"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center mb-3">
                      <div className="font-medium text-prim">
                        Dr. {practitioner.user.name} {practitioner.user.firstName}
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div><span className="font-semibold">Spécialité:</span> {practitioner.specialty}</div>
                      <div><span className="font-semibold">Catégorie:</span> {practitioner.category}</div>
                      <div><span className="font-semibold">Email:</span> {practitioner.user.email}</div>
                      <div><span className="font-semibold">Contact:</span> {practitioner.user.contact}</div>
                      <div><span className="font-semibold">Adresse Cabinet:</span> {practitioner.officeAddress}</div>
                      <div><span className="font-semibold">Numéro National:</span> {practitioner.nationalIdNumber}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Desktop View */}
              <div className="hidden md:block">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom & Prénom</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Spécialité</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catégorie</th>
                      <th className="hidden md:table-cell px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                      <th className="hidden xl:table-cell px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Adresse Cabinet</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredPractitioners.map((practitioner: IPractitionerWithUser) => (
                      <motion.tr
                        key={practitioner.practitionerId}
                        whileHover={{ backgroundColor: "#f9fafb" }}
                        className="hover:shadow-[inset_2px_2px_4px_#d1d9e6,inset_-2px_-2px_4px_#ffffff] transition-all duration-300"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">Dr. {practitioner.user.name} {practitioner.user.firstName}</div>
                          <div className="text-sm text-gray-500">{practitioner.user.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{practitioner.specialty}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{practitioner.category}</td>
                        <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-900">{practitioner.user.contact}</td>
                        <td className="hidden xl:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-900">{practitioner.officeAddress}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default ListePraticiens;
