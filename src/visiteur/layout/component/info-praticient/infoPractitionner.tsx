import { faHome, faPhone, faStethoscope, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { IPractitionerWithUser } from 'shared/models/practitioner.model';

interface PractitionerInfoProps {
  practitionerData: IPractitionerWithUser;
}

const PractitionerInfo: React.FC<PractitionerInfoProps> = ({ practitionerData }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-dark font-mono">Informations du praticien</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <p className='font-sans text-sec'><FontAwesomeIcon icon={faUser} className="mr-2 text-prim" /><span className="font-semibold text-prim">Nom:</span> {practitionerData.user.name}</p>
          <p className='font-sans text-sec'><FontAwesomeIcon icon={faUser} className="mr-2 text-prim" /><span className="font-semibold text-prim font-mono">Prenom:</span> {practitionerData.user.firstName}</p>
          <p className='font-sans text-sec'><FontAwesomeIcon icon={faPhone} className="mr-2 text-prim" /><span className="font-semibold text-prim font-mono">Contact:</span> {practitionerData.user.contact}</p>
          <p className='font-sans text-sec'><FontAwesomeIcon icon={faHome} className="mr-2 text-prim" /><span className="font-semibold text-prim font-mono">Adresse du cabinet:</span> {practitionerData.officeAddress}</p>
        </div>
        <div>
          <p className='font-sans text-sec'><FontAwesomeIcon icon={faStethoscope} className="mr-2 text-prim" /><span className="font-semibold text-prim font-mono">Catégorie:</span> {practitionerData.category}</p>
          <p className='font-sans text-sec'><FontAwesomeIcon icon={faStethoscope} className="mr-2 text-prim" /><span className="font-semibold text-prim font-mono">Spécialité:</span> {practitionerData.specialty}</p>
        </div>
      </div>
    </div>
  );
};

export default PractitionerInfo;
