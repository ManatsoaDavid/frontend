import React from 'react';
import { FaGraduationCap, FaStethoscope } from 'react-icons/fa';
import { IPractitionerWithUser } from 'shared/models/practitioner.model';

interface PractitionerDetailsProps {
  practitioner: IPractitionerWithUser;
}
const PractitionerDetails: React.FC<PractitionerDetailsProps> = ({ practitioner }) => {
  if (practitioner) {

    return (
      <>
        <p><FaGraduationCap className="mr-2" /> <strong>Catégorie:</strong> {practitioner.category}</p>
        <p><FaStethoscope className="mr-2" /> <strong>Spécialité:</strong> {practitioner.specialty}</p>
      </>
    );
  }
  return <p>Aucune donnée disponible pour ce praticien moderne.</p>;
}


export default PractitionerDetails;
