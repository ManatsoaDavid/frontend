import axiosInstance from 'api/axiosInstance';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { FaEnvelope, FaGoogle, FaLock, FaSignInAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { localStorageService } from 'utils/localStorageService';


const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/auth/userlogin', { email, password });
      const { userType, token, userId, practitionerId, visitorId } = response.data;
      localStorageService.setItem('userId', userId);

      if (userType === 'VISITEUR') {
        localStorageService.setItem('visitorToken', token);
        localStorageService.setItem('visitorId', visitorId);
        navigate('/visitor/visitor-home');
      } else if (userType === 'PRATICIEN') {
        localStorageService.setItem('practitionerToken', token);
        localStorageService.setItem('practitionerId', practitionerId);
        navigate('/practitioner/dashboard');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Type d\'utilisateur invalide',
        });
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur de connexion',
        text: 'Email ou mot de passe incorrect',

      });
    }
  };

  const handleGoogleLogin = () => {

  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.2, ease: 'easeIn', duration: 0.8 }
      }}
      className="min-h-screen bg-light relative"
    >
      <div className="absolute top-4 left-4">
        <p>logo</p>
      </div>

      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-3xl font-bold font-mono mb-6 text-center text-prim">se connecter</h2>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-mono text-dark mb-2">
                Email
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sec" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-sec rounded-md focus:outline-none focus:ring-2 focus:ring-prim"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-mono text-dark mb-2">
                mot de passe
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sec" />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-sec rounded-md focus:outline-none focus:ring-2 focus:ring-prim"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full font-mono bg-prim text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition duration-300 flex items-center justify-center"
            >
              <FaSignInAlt className="mr-2" />
              connexion
            </button>
          </form>
          <div className="mt-6">
            <button
              onClick={handleGoogleLogin}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition duration-300 flex items-center justify-center font-mono"
            >
              <FaGoogle className="mr-2" />
              se connecter avec google
            </button>
          </div>
          <div className="mt-4 text-center">
            <Link to="/forgot-password" className="text-prim hover:underline">
              mot de passe oublié ?
            </Link>
          </div>
          <div className="mt-6 text-center font-mono">
            <p>
              pas encore de compte ? {' '}
              <Link to="/register" className="text-prim font-sans hover:underline font-semibold">
                s'inscrir
              </Link>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
export default Login;
