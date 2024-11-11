import { AnimatePresence, motion } from "framer-motion";
import { fetchPractitionerSubscriptions } from "practitioner/redux.toolkit/subscription/reducer";
import React, { useEffect, useState } from "react";
import { FaSearch, FaSpinner } from "react-icons/fa";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { ESubscriptionType } from "shared/models/enums";
import { AppDispatch, RootState } from "store/store";

const SubscriptionsList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { subscriptions, loading } = useSelector((state: RootState) => state.subscription);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    dispatch(fetchPractitionerSubscriptions());
  }, [dispatch]);

  const filteredAndSortedSubscriptions = subscriptions
    .filter(sub => {
      if (!sub?.practitioner?.name || !sub?.practitioner?.firstName) return false;
      const fullName = `${sub.practitioner.firstName} ${sub.practitioner.name}`.toLowerCase();
      const matchesSearch = fullName.includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" ? true : sub.status === statusFilter;
      const matchesType = typeFilter === "all" ? true : sub.type?.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "name":
          comparison = `${a.practitioner?.firstName} ${a.practitioner?.name}`.localeCompare(
            `${b.practitioner?.firstName} ${b.practitioner?.name}`
          );
          break;
        case "amount":
          comparison = a.amount - b.amount;
          break;
        case "date":
          comparison = new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
          break;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="mb-8 flex flex-col md:flex-row justify-between items-center">
        <h2 className="text-3xl font-bold text-prim font-poppins flex items-center mb-4 md:mb-0">
          <RiMoneyDollarCircleLine className="mr-3" />
          Abonnements des Praticiens
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

      <div className="mb-6 flex flex-wrap gap-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 rounded-lg shadow-[2px_2px_4px_#d1d9e6,-2px_-2px_4px_#ffffff]"
        >
          <option value="all">Tous les statuts</option>
          <option value="active">Actif</option>
          <option value="inactive">Inactif</option>
        </select>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-4 py-2 rounded-lg shadow-[2px_2px_4px_#d1d9e6,-2px_-2px_4px_#ffffff]"
        >
          <option value="all">Tous les types</option>
          <option value={ESubscriptionType.LITE}>{ESubscriptionType.LITE}</option>
          <option value={ESubscriptionType.PREMIUM}>{ESubscriptionType.PREMIUM}</option>
          <option value={ESubscriptionType.GOLD}>{ESubscriptionType.GOLD}</option>
        </select>


        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 rounded-lg shadow-[2px_2px_4px_#d1d9e6,-2px_-2px_4px_#ffffff]"
        >
          <option value="name">Trier par nom</option>
          <option value="amount">Trier par montant</option>
          <option value="date">Trier par date</option>
        </select>

        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="px-4 py-2 rounded-lg shadow-[2px_2px_4px_#d1d9e6,-2px_-2px_4px_#ffffff]"
        >
          {sortOrder === "asc" ? "↑" : "↓"}
        </button>
      </div>

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-white rounded-xl shadow-[3px_3px_6px_#d1d9e6,-3px_-3px_6px_#ffffff] overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Praticien</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Montant</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Expiration</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAndSortedSubscriptions.map((subscription) => (
                  <motion.tr
                    key={subscription.subscriptionId}
                    whileHover={{ backgroundColor: "#f9fafb" }}
                    className="hover:shadow-[inset_2px_2px_4px_#d1d9e6,inset_-2px_-2px_4px_#ffffff] transition-all duration-300"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      {subscription.practitioner?.firstName} {subscription.practitioner?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{subscription.type?.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${subscription.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                        {subscription.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{subscription.amount} Ar</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(subscription.endDate).toLocaleDateString()}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default SubscriptionsList;
