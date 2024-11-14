import React, { useEffect, useState } from 'react';
import { usePractitionerData } from 'shared/hooks/fetchPractitioner';
import { IPractitionerWithUser } from 'shared/models/practitioner.model';
import { localStorageService } from 'utils/localStorageService';

interface PractitionerGalleryProps {
  practitioner: IPractitionerWithUser;
}

const PractitionerGallery: React.FC = () => {
  const practitionerId = parseInt(localStorageService.getItem('practitionerId') || '0', 10);
  const { practitionerData: fetchedPractitionerData, loading, error } = usePractitionerData(practitionerId);
  const [practitionerData, setPractitionerData] = useState<IPractitionerWithUser | null>(null);

  useEffect(() => {
    if (fetchedPractitionerData) {
      setPractitionerData(fetchedPractitionerData);
    }
  }, [fetchedPractitionerData]);

  const IMAGE_API = `${process.env.REACT_APP_API_URL?.replace('/api', '') || ''}/uploads`;

  return (
    <div className="bg-light rounded-xl p-6 sm:p-8 lg:p-10 border border-sec mt-8">
      <h2 className="text-lg font-bold mb-8 text-dark font-mono text-center">Documents</h2>
      <p>{practitionerData?.specialty}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* License Image */}
        <div className="flex flex-col items-center">
          <div className="w-full h-48 rounded-lg overflow-hidden shadow-md">
            <img
              src={`${IMAGE_API}/${practitionerData?.idCardImage}`}
              alt="cin"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <p className="mt-3 text-sec font-semibold">CIN</p>
        </div>

        {/* Diploma Image */}
        <div className="flex flex-col items-center">
          <div className="w-full h-48 rounded-lg overflow-hidden shadow-md">
            <img
              src={`${IMAGE_API}/${practitionerData?.diploma}`}
              alt="Diplome"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <p className="mt-3 text-sec font-semibold">Diplôme</p>
        </div>

        {/* Office Image */}
        <div className="flex flex-col items-center">
          <div className="w-full h-48 rounded-lg overflow-hidden shadow-md">
            <img
              src={`${IMAGE_API}/${practitionerData?.residenceCertificate}`}
              alt="certificat"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <p className="mt-3 text-sec font-semibold">Certificat de residence</p>
        </div>
      </div>
    </div>
  );
};

export default PractitionerGallery;
