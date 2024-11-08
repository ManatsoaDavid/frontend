import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FaSearch, FaSpinner, FaUserMd } from "react-icons/fa";
import { User } from "shared/models/listPraticient.model";

/**************************COMPOSANT PRINCIPAL*************************/
const ListePraticiens: React.FC = () => {
  /**************************ÉTATS LOCAUX*************************/
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  /**************************EFFET DE CHARGEMENT*************************/
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>("http://localhost:5000/api/praticien");
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        setError("Erreur lors de la récupération des données");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  /**************************FILTRAGE DES PRATICIENS*************************/
  // Update the filtering logic to include status check
  const filteredUsers = users.filter(user =>
    user.practitioner?.some(p => p.status === 'accepter') && // Add status filter
    (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()))
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
    );
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
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      {/**************************EN-TÊTE*************************/}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-center">
        <h2 className="text-3xl font-bold text-prim font-poppins flex items-center mb-4 md:mb-0">
          <FaUserMd className="mr-3" />
          Liste des Praticiens
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
      </div>

      {/**************************TABLEAU DES PRATICIENS*************************/}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-white rounded-xl shadow-[3px_3px_6px_#d1d9e6,-3px_-3px_6px_#ffffff] overflow-hidden"
        >
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full">
              <div className="md:hidden">
                {/* Vue mobile */}
                {filteredUsers.map((user) =>
                  user.practitioner?.map((praticien) => (
                    <motion.div
                      key={praticien.userId}
                      className="bg-white p-4 rounded-lg shadow-[2px_2px_4px_#d1d9e6,-2px_-2px_4px_#ffffff] mb-4"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center mb-3">
                        <div className="font-medium text-prim">{user.name} {user.firstName}</div>
                      </div>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div><span className="font-semibold">Email:</span> {user.email}</div>
                        <div><span className="font-semibold">Contact:</span> {user.contact}</div>
                        <div><span className="font-semibold">Adresse:</span> {praticien.officeAddress}</div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Vue desktop */}
              <div className="hidden md:block">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prénom</th>
                      <th className="hidden md:table-cell px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                      <th className="hidden xl:table-cell px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Adresse Cabinet</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user) =>
                      user.practitioner?.map((praticien) => (
                        <motion.tr
                          key={praticien.userId}
                          whileHover={{ backgroundColor: "#f9fafb" }}
                          className="hover:shadow-[inset_2px_2px_4px_#d1d9e6,inset_-2px_-2px_4px_#ffffff] transition-all duration-300"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{user.firstName}</td>
                          <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">{user.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{user.contact}</td>
                          <td className="hidden xl:table-cell px-6 py-4 whitespace-nowrap">{praticien.officeAddress}</td>
                        </motion.tr>
                      ))
                    )}
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
