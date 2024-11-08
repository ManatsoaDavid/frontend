import { fetchPraticient } from 'public/redux.toolkit/praticient/reducer';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import PractitionerCard from './info-praticient/listPratitiensCard';

const PractitionerSection: React.FC = () => {
  const dispatch = useDispatch();
  const { praticient, loading, error } = useSelector((state: RootState) => state.publicPraticiens);
  const [activeTab, setActiveTab] = useState<string>('All');

  useEffect(() => {
    dispatch(fetchPraticient() as any);
  }, [dispatch]);

  if (loading) return <div className="text-center text-xl">Loading...</div>;
  if (error) return <div className="text-center text-xl text-red-500">Error: {error}</div>;

  const specialties = ['All', ...Array.from(new Set(praticient.map(p => p.specialty).filter(Boolean)))];

  const filteredPractitioners = activeTab === 'All'
    ? praticient
    : praticient.filter(p => p.specialty === activeTab);

  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-dark mb-6 text-center">Nos praticiens</h2>
      <div className="flex justify-center mb-6">
        {specialties.map((specialty) => (
          <button
            key={specialty}
            className={`mx-2 px-4 py-2 rounded ${activeTab === specialty ? 'bg-prim text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab(specialty)}
          >
            {specialty}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPractitioners.map((practitioner) => (
          <PractitionerCard key={practitioner.user.userId} user={practitioner} />
        ))}
      </div>
    </section>
  );
};

export default PractitionerSection;
