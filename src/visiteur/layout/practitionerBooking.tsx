import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IPractitionerWithUser } from 'shared/models/practitioner.model';
import PractitionerAgenda from './component/agenda-rendez-vous/agendaPractitioner';
import BookAppointmentModal from './component/agenda-rendez-vous/appointment';
import PractitionerInfo from './component/info-praticient/infoPractitionner';

/**************************
 * Composant principal pour la réservation avec un praticien
 * Gère l'affichage des informations du praticien, son agenda et la modal de réservation
 **************************/
const PractitionerBooking: React.FC = () => {
  const [practitionerData, setPractitionerData] = useState<IPractitionerWithUser | null>(null);
  const [events, setEvents] = useState([]);
  const { practitionerId } = useParams<{ practitionerId: string }>();
  const [bookingEvent, setBookingEvent] = useState<any | null>(null);

  const API = process.env.REACT_APP_API_URL;

  /**************************
   * Effet pour charger les données du praticien et son agenda au chargement du composant
   **************************/
  useEffect(() => {
    if (practitionerId) {
      fetchPractitionerData();
      fetchAgendaData();
    }
  }, [practitionerId]);

  /**************************
   * Fonction pour récupérer les données du praticien depuis l'API
   **************************/
  const fetchPractitionerData = async () => {
    try {
      const response = await axios.get<{ data: IPractitionerWithUser }>(`${API}/practitioners/${practitionerId}`);
      setPractitionerData(response.data.data);
    } catch (error) {
      console.error('Error fetching practitioner data:', error);
    }
  };

  /**************************
   * Fonction pour récupérer les données de l'agenda du praticien depuis l'API
   **************************/
  const fetchAgendaData = async () => {
    try {
      const response = await axios.get(`${API}/agenda/practitioner/${practitionerId}`);
      const agendaEvents = response.data.data.flatMap((agenda: any) =>
        agenda.availabilities.map((availability: any) => ({
          availabilityId: availability.availabilityId,
          title: availability.status,
          start: new Date(availability.startTime),
          end: new Date(availability.endTime)
        }))
      );
      setEvents(agendaEvents);
    } catch (error) {
      console.error('Error fetching agenda data:', error);
    }
  };

  /**************************
   * Fonction pour gérer la sélection d'un créneau de réservation
   **************************/
  const handleBooking = (event: any) => {
    setBookingEvent({
      ...event,
      availabilityId: event.availabilityId
    });
  };

  /**************************
   * Fonction pour fermer la modal de réservation
   **************************/
  const closeBookingModal = () => {
    setBookingEvent(null);
  };

  {/*************************
   * Affichage d'un message de chargement si les données du praticien ne sont pas encore disponibles
   **************************/}
  if (!practitionerData || !practitionerData.user) return <div>Loading...</div>;

  return (
    <div className="bg-light shadow-md rounded-lg p-4 sm:p-6 lg:p-8 border border-sec max-w-4xl mx-auto">
      {/*************************
       * Affichage des informations du praticien
       **************************/}
      <PractitionerInfo practitionerData={practitionerData} />
      {/*************************
       * Affichage de l'agenda du praticien
       **************************/}
      <PractitionerAgenda events={events} handleBooking={handleBooking} />
      {/*************************
       * Affichage de la modal de réservation si un créneau est sélectionné
       **************************/}
      {bookingEvent && practitionerData && (
        <BookAppointmentModal
          event={bookingEvent}
          practitionerData={practitionerData}
          onClose={closeBookingModal}
        />
      )}
    </div>
  );
};

export default PractitionerBooking;
