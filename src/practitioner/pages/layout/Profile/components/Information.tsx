import { faBirthdayCake, faGenderless, faHome, faPencilAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { updatePractitioner } from 'practitioner/redux.toolkit/reducer';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { usePractitionerData } from 'shared/hooks/fetchPractitioner';
import { IPractitionerWithUser } from 'shared/models/practitioner.model';
import { localStorageService } from 'utils/localStorageService';
import StyledAlert from './alertStyle';
import AvatarSection from './avatarSection';
import EditPractitionerModal from './editPractitionerModal';
import InfoItem from './infoPraticien';

const PractitionerInformation: React.FC = () => {
  const practitionerId = parseInt(localStorageService.getItem('practitionerId') || '0', 10);
  const { practitionerData: fetchedPractitionerData, loading, error } = usePractitionerData(practitionerId);
  const dispatch = useDispatch();
  const [practitionerData, setPractitionerData] = useState<IPractitionerWithUser | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertInfo, setAlertInfo] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isEditing, setIsEditing] = useState(false);


  useEffect(() => {
    if (fetchedPractitionerData) {
      setPractitionerData(fetchedPractitionerData);
    }
  }, [fetchedPractitionerData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (practitionerData) {
      if (name.startsWith('user.')) {
        const userField = name.split('.')[1];
        setPractitionerData(prevData => ({
          ...prevData!,
          user: {
            ...prevData!.user,
            [userField]: userField === 'birthDate' ? new Date(value).getTime() : value
          }
        }));
      } else {
        setPractitionerData(prevData => ({
          ...prevData!,
          [name]: value
        }));
      }
    }
  };

  const handleSubmit = () => {
    if (practitionerData) {
      dispatch(updatePractitioner(practitionerData) as any)
        .then(() => {
          setAlertInfo({ message: 'Modification enregistrees!', type: 'success' });
          setIsEditing(false);
          setIsModalOpen(false);
        })
        .catch((error: any) => {
          setAlertInfo({ message: 'impossible de mettre a jours , veillez reessayer.', type: 'error' });
          console.error('Update error:', error);
        });
    }
  };


  const handleAvatarUpdate = (updatedpraticien: IPractitionerWithUser) => {
    setPractitionerData(updatedpraticien);
    dispatch(updatePractitioner(updatedpraticien) as any)
      .then(() => {
        setAlertInfo({ message: 'Votre photo est bien a jour!', type: 'success' });
      })
      .catch((error: any) => {
        setAlertInfo({ message: 'Failed to update avatar. Please try again.', type: 'error' });
        console.error('Avatar update error:', error);
      });
  };



  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!practitionerData) return <div>pas de praticien disponible</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.2, ease: 'easeIn', duration: 0.8 }
      }}
    >
      {alertInfo && (
        <StyledAlert
          message={alertInfo.message}
          type={alertInfo.type}
          onClose={() => setAlertInfo(null)}
        />
      )}
      <div className="bg-light  rounded-xl p-6 sm:p-8 lg:p-10 border border-sec">
        <h2 className="text-lg font-bold mb-8 text-dark font-mono text-center">Profile</h2>
        <div className="flex flex-col md:flex-row gap-10">
          <div className="md:w-1/3 flex flex-col items-center">
            <AvatarSection praticien={practitionerData} onAvatarUpdate={handleAvatarUpdate} />
            <h3 className="text-2xl font-bold text-prim mb-2">{`${practitionerData?.user.firstName}`}</h3>
            <h5 className="text-base  font-bold text-sec mb-2">@{practitionerData?.user.email}</h5>
          </div>
          <div className="md:w-2/3 bg-white rounded-xl shadow-md p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InfoItem icon={faPhone} label="Contact" value={practitionerData?.user.contact} />
              <InfoItem icon={faGenderless} label="Genre" value={practitionerData?.user.gender} />
              <InfoItem icon={faHome} label="Adresse" value={practitionerData?.officeAddress} />
              <InfoItem icon={faBirthdayCake} label="Date de naissance" value={new Date(practitionerData?.user.birthDate || '').toLocaleDateString()} />
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-prim text-white p-3 rounded-full hover:bg-prim-dark transition duration-300 mt-4"
            >    <FontAwesomeIcon icon={faPencilAlt} /> modifier les informations</button>
          </div>
        </div>

        {practitionerData && (
          <EditPractitionerModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            practitionerData={practitionerData}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
          />
        )}
      </div>

    </motion.div>
  );
};

export default PractitionerInformation;
