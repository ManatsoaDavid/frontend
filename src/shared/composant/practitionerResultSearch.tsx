import Navbar from 'public/pages/layout/navbar';
import { selectAllPublicPraticient, selectPublicPraticientError, selectPublicPraticientLoading } from 'public/redux.toolkit/praticient/selector';
import React, { useMemo } from 'react';
import { FaArrowRight, FaCalendarAlt, FaLock, FaMapMarkerAlt, FaPhone, FaSignInAlt, FaUserMd } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { IPractitionerWithUser } from 'shared/models/practitioner.model';
import { useAppSelector } from 'store/hooks';
import { localStorageService } from 'utils/localStorageService';
// import NavbarVisitor from 'visiteur/layout/navbar';
import PractitionerAvailability from './practitionerAvailability';
import SearchBarInResult from './searchBarInResult';

const PractitionerResults: React.FC = () => {
  const practitioners = useAppSelector(selectAllPublicPraticient);
  const loading = useAppSelector(selectPublicPraticientLoading);
  const error = useAppSelector(selectPublicPraticientError);
  const token = localStorageService.getItem('visitorToken');
  const navigate = useNavigate();
  const location = useLocation();
  const searchCriteria = location.state;

  const IMAGE_API = `${process.env.REACT_APP_API_URL?.replace('/api', '') || ''}/uploads`;


  const filteredPractitioners = useMemo(() => {
    return practitioners.filter((practitioner: IPractitionerWithUser) => {
      if (!searchCriteria) return true;

      const { specialty, officeAddress, name } = searchCriteria;
      const searchTerms = {
        specialty: specialty?.toLowerCase() || '',
        address: officeAddress?.toLowerCase() || '',
        name: name?.toLowerCase() || ''
      };

      return (!searchTerms.specialty || practitioner.specialty.toLowerCase().includes(searchTerms.specialty)) &&
        (!searchTerms.address || practitioner.officeAddress.toLowerCase().includes(searchTerms.address)) &&
        (!searchTerms.name || practitioner.user.name.toLowerCase().includes(searchTerms.name));
    });
  }, [practitioners, searchCriteria]);

  const handleGotoPractitioner = (practitioner: IPractitionerWithUser) => {
    navigate(`/visitor/info-pratitient/${practitioner.practitionerId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-prim"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto my-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-md">
        <p className="text-red-700">Une erreur est survenue: {error}</p>
      </div>
    );
  }

  return (

    <div>
      {/* {token ? <NavbarVisitor /> : <Navbar />} */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SearchBarInResult />
        <div className="mb-8">
          <h2 className="text-lg font-mono font-semibold text-gray-800">
            {filteredPractitioners.length} praticiens{filteredPractitioners.length !== 1 ? 's' : ''} trouvé{filteredPractitioners.length !== 1 ? 's' : ''}
          </h2>

          <div className="h-1 w-20 bg-prim mt-2"></div>
        </div>

        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {filteredPractitioners.map((practitioner: IPractitionerWithUser) => (
            <div
              key={practitioner.practitionerId}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200"
            >
              <div className="flex items-start space-x-4">
                <div className="bg-gray-200 p-0 rounded-full">
                  {practitioner.user.avatar ? <img src={`${IMAGE_API}/${practitioner.user.avatar}`} alt="avatar" className="w-16 h-16 rounded-full  border-1 border-prim " />
                    : <FaUserMd className="w-8 h-8 text-prim" />}
                </div>

                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 hover:text-prim transition-colors">
                      Dr. {practitioner.user.name}
                    </h3>
                    <p className="text-prim font-medium mt-1">
                      {practitioner.specialty}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <FaMapMarkerAlt className="mr-2 text-prim" />
                      <span className="text-sm">{practitioner.officeAddress}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FaPhone className="mr-2 text-prim" />
                      <span className="text-sm">{practitioner.user.contact}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="text-gray-800 font-medium mb-3">Prochaines disponibilités:</h4>
                    <PractitionerAvailability
                      practitionerId={practitioner.practitionerId || ''}
                      maxDisplay={3}
                    />
                  </div>

                  <button
                    className="w-full mt-4 bg-prim hover:bg-prim text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center space-x-2 shadow-sm hover:shadow-md"
                    onClick={() => token ? handleGotoPractitioner(practitioner) : navigate('/login')}
                  >
                    {token ? (
                      <>
                        <FaCalendarAlt className="w-5 h-5" />
                        <span>Prendre rendez-vous</span>
                        <FaArrowRight className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        <FaLock className="w-5 h-5" />
                        <span>Connectez-vous pour prendre RDV</span>
                        <FaSignInAlt className="w-4 h-4" />
                      </>
                    )}
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  );
};

export default PractitionerResults;
