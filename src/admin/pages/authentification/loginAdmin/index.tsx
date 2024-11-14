import axiosInstance from 'api/axiosInstance';
import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaSignInAlt, FaUserShield } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'store/store';
import { localStorageService } from 'utils/localStorageService';
import { motion } from 'framer-motion';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [mdp, setMdp] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.admin);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    if (!email || !mdp) {
      setMessage('Veuillez remplir tous les champs');
      return;
    }
    try {
      const response = await axiosInstance.post('/login', { email, mdp });
      const { token } = response.data;
      localStorageService.setItem('adminToken', token);
      navigate('/homeAdmin/accueil');
    } catch (error: any) {
      setMessage("Une erreur est survenue lors de la connexion: " + error.response.data.message);
    }
  };
  return (
    <div className="min-h-screen bg-[#eef1f7] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-[#e6e9ef] to-[#eef1f7] z-0" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <div className="relative bg-[#eef1f7] rounded-3xl p-10 shadow-[12px_12px_24px_#c4c7cc,-12px_-12px_24px_#ffffff] border border-white/30">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/5 rounded-3xl" />

          <div className="relative">
            <div className="text-center mb-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-20 h-20 bg-[#eef1f7] rounded-2xl mx-auto flex items-center justify-center mb-8 shadow-[6px_6px_12px_#c4c7cc,-6px_-6px_12px_#ffffff] border border-white/50"
              >
                <FaUserShield className="text-prim text-3xl" />
              </motion.div>
              <h1 className="text-3xl font-bold text-gray-800 mb-3">
                Administration
              </h1>
              <p className="text-gray-600">Accès sécurisé à votre espace</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-5"
              >
                <div className="relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <FaEnvelope className="h-5 w-5 text-gray-400 group-hover:text-prim transition-colors duration-300" />
                  </div>
                  <input
                    type="email"
                    required
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[#eef1f7] border border-white/50 outline-none shadow-[inset_6px_6px_12px_#c4c7cc,inset_-6px_-6px_12px_#ffffff] focus:shadow-[inset_8px_8px_16px_#c4c7cc,inset_-8px_-8px_16px_#ffffff] transition-all duration-300"
                    placeholder="Adresse email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400 group-hover:text-prim transition-colors duration-300" />
                  </div>
                  <input
                    type="password"
                    required
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[#eef1f7] border border-white/50 outline-none shadow-[inset_6px_6px_12px_#c4c7cc,inset_-6px_-6px_12px_#ffffff] focus:shadow-[inset_8px_8px_16px_#c4c7cc,inset_-8px_-8px_16px_#ffffff] transition-all duration-300"
                    placeholder="Mot de passe"
                    value={mdp}
                    onChange={(e) => setMdp(e.target.value)}
                  />
                </div>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 rounded-2xl bg-prim text-white font-medium shadow-[6px_6px_12px_#c4c7cc,-6px_-6px_12px_#ffffff] hover:shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] transition-all duration-300 flex items-center justify-center space-x-3"
              >
                <FaSignInAlt className="h-5 w-5" />
                <span>{loading ? 'Connexion...' : 'Se connecter'}</span>
              </motion.button>
            </form>

            {message && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-6 p-4 rounded-2xl text-sm border border-white/50 shadow-[inset_6px_6px_12px_#c4c7cc,inset_-6px_-6px_12px_#ffffff] ${
                  error ? 'text-red-600' : 'text-green-600'
                }`}
              >
                {message}
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
