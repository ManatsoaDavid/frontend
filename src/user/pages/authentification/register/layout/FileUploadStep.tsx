
import { motion } from 'framer-motion';
import React from 'react';
import { FaArrowLeft, FaCertificate, FaFileAlt, FaSave } from 'react-icons/fa';
import { FcDiploma1 } from "react-icons/fc";



const API = process.env.REACT_APP_API_URL;

const handleFileUpload = async (file: File, fieldName: string) => {
  if (file) {
    const formData = new FormData();
    formData.append('file', file);

    // Requête pour envoyer le fichier au serveur
    const response = await fetch(`${API}/upload`, {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    // Le backend renvoie le chemin du fichier
    return { [fieldName]: result.filePath };
  }
  return {};
};

const FileUploadStep: React.FC<{
  formData: any;
  updateFormData: (data: any) => void;
  nextStep: () => void;
  prevStep: () => void;
}> = ({ formData, updateFormData, nextStep, prevStep }) => {
  return (

    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.2, ease: 'easeIn', duration: 0.8 }
      }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-prim text-center">Téléchargement des documents</h2>
        <form className="space-y-6">
          <div className="flex items-center space-x-4">
            <FaFileAlt className="text-2xl text-prim" />
            <div className="flex-grow">
              <label htmlFor="idCardImage" className="block mb-1 font-medium">Image de la carte d'identité</label>
              <input
                type="file"
                id="idCardImage"
                onChange={async (e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    const data = await handleFileUpload(file, 'idCardImage')
                    updateFormData(data)
                  }
                }}
                className="w-full p-2 border rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-prim file:text-white hover:file:bg-prim-dark"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <FaCertificate className="text-2xl text-prim" />
            <div className="flex-grow">
              <label htmlFor="residenceCertificate" className="block mb-1 font-semibold">Certificat de résidence</label>
              <input
                type="file"
                id="residenceCertificate"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const data = await handleFileUpload(file, 'residenceCertificate');
                    updateFormData(data);
                  }
                }}
                className="w-full p-2 border rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-prim file:text-white hover:file:bg-prim-dark"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <FcDiploma1 className="text-2xl text-prim" />
            <div className="flex-grow">
              <label htmlFor="diploma" className="block mb-1 font-semibold">Diplome</label>
              <input
                type="file"
                id="diploma"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const data = await handleFileUpload(file, 'diploma');
                    updateFormData(data);
                  }
                }}
                className="w-full p-2 border rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-prim file:text-white hover:file:bg-prim-dark"
              />
            </div>
          </div>

        </form>
        <div className="mt-8 flex justify-between">
          <button className="bg-secondary text-white px-6 py-3 rounded-lg hover:bg-secondary-dark transition duration-300" onClick={prevStep}>
            <FaArrowLeft />
          </button>
          <button className="bg-prim text-white px-6 py-3 rounded-lg hover:bg-prim-dark transition duration-300" onClick={nextStep}>
            <FaSave />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default FileUploadStep;
