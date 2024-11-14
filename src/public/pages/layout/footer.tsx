import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-side text-light py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h3 className="text-2xl font-bold mb-4">Rapide-Docteur</h3>
            <p className="text-sec">Votre plateforme de santé en ligne</p>
          </div>
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h4 className="text-xl font-semibold mb-4">Liens rapides</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-prim transition-colors duration-300">Accueil</a></li>
              <li><a href="#" className="hover:text-prim transition-colors duration-300">Celebres</a></li>
              <li><a href="#" className="hover:text-prim transition-colors duration-300">Praticiens</a></li>
              <li><a href="#" className="hover:text-prim transition-colors duration-300">Contact</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h4 className="text-xl font-semibold mb-4">Contact</h4>
            <p className="mb-2">Natik-Corp Ambalapaiso</p>
            <p className="mb-2">Fianarantsoa, Madagascar</p>
            <p className="mb-2">Tél: +261 34 80 693 26</p>
            <p>Email: contact@flashdoc.com</p>
          </div>
          <div className="w-full md:w-1/4">
            <h4 className="text-xl font-semibold mb-4">Suivez-nous</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-light hover:text-prim transition-colors duration-300">
                <FaFacebookF size={24} />
              </a>
              <a href="#" className="text-light hover:text-prim transition-colors duration-300">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-light hover:text-prim transition-colors duration-300">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-light hover:text-prim transition-colors duration-300">
                <FaLinkedinIn size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-sec mt-8 pt-8 text-center">
          <p>&copy; 2024 R-Docteur. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
