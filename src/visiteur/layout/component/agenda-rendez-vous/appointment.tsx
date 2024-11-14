import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { localStorageService } from 'utils/localStorageService';

/*****************INTERFACE POUR LES PROPS DU COMPOSANT***********************/
interface BookAppointmentModalProps {
  event: any;
  practitionerData: any;
  onClose: () => void;
}

/*****************COMPOSANT PRINCIPAL DE RÉSERVATION DE RENDEZ-VOUS***********************/
const BookAppointmentModal: React.FC<BookAppointmentModalProps> = ({ event, practitionerData, onClose }) => {
  /*****************DÉCLARATION DES ÉTATS***********************/
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reason, setReason] = useState('');
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [existingAppointments, setExistingAppointments] = useState<number[]>([]);

  const API = process.env.REACT_APP_API_URL;

  /*****************EFFET POUR RÉCUPÉRER LES RENDEZ-VOUS EXISTANTS***********************/
  useEffect(() => {
    const fetchExistingAppointments = async () => {
      try {
        const response = await axios.get(`${API}/appointment/existing/${event.availabilityId}`);
        setExistingAppointments(response.data.data);
        console.log('Existing appointments:', response.data.data);
      } catch (error) {
        console.error('Error fetching existing appointments:', error);
      }
    };

    fetchExistingAppointments();
  }, [event.availabilityId]);

  /*****************FONCTION POUR GÉNÉRER LES CRÉNEAUX HORAIRES***********************/
  const generateTimeSlots = (start: Date, end: Date) => {
    const slots = [];
    let current = new Date(start);
    while (current < end) {
      const slotTime = current.getTime();
      const isDisabled = existingAppointments.includes(slotTime);
      slots.push({ time: new Date(current), isDisabled });
      current.setMinutes(current.getMinutes() + 15);
    }
    return slots;
  };

  /*****************RÉCUPÉRATION DE L'ID DU VISITEUR***********************/
  const Id = parseInt(localStorageService.getItem('visitorId'));

  /*****************FONCTION POUR GÉRER LA RÉSERVATION***********************/
  const handleBooking = async () => {
    setLoading(true);
    setError(null);

    if (!selectedTime) {
      setError('Veuillez sélectionner une heure de rendez-vous');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API}/appointment`, {
        visitorId: Id,
        availabilityId: event.availabilityId,
        reason: reason,
        dateAppointment: (new Date(selectedTime).getTime()),
      });

      if (response.data.success) {
        onClose();
        localStorageService.setItem('Idvisitor', Id);
      } else {
        setError('Failed to book appointment');
      }
    } catch (err) {
      setError('An error occurred while booking the appointment');
    } finally {
      setLoading(false);
    }
  };

  /*****************RENDU DU COMPOSANT***********************/
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-5 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-prim">Confirmer le rendez-vous</h2>
        {/*****************DÉTAILS DU PRATICIEN***********************/}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2 text-sec">Detail du praticien</h3>
          <p><span className="font-medium">Nom:</span> {practitionerData.user.name} {practitionerData.user.firstName}</p>
          <p><span className="font-medium">Specialté:</span> {practitionerData.specialty}</p>
          <p><span className="font-medium">Addresse:</span> {practitionerData.officeAddress}</p>
        </div>
        {/*****************SÉLECTION DE L'HEURE***********************/}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2 text-sec">Choisir l'heure:</h3>
          <select
            className="w-full p-2 border rounded"
            value={selectedTime ? selectedTime.toISOString() : ''}
            onChange={(e) => setSelectedTime(new Date(e.target.value))}
          >
            <option value="">Sélectionnez une heure</option>
            {generateTimeSlots(event.start, event.end).map((slot) => (
              <option
                key={slot.time.toISOString()}
                value={slot.time.toISOString()}
                disabled={slot.isDisabled}
              >
                {slot.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                {slot.isDisabled ? ' (Indisponible)' : ''}
              </option>
            ))}
          </select>
        </div>
        {/*****************RAISON DU RENDEZ-VOUS***********************/}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2 text-sec">Raison du rendez-vous:</h3>
          <textarea
            className="w-full p-2 border rounded"
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Entrez la raison de votre rendez-vous"
          />
        </div>
        {/*****************AFFICHAGE DES ERREURS***********************/}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {/*****************BOUTONS D'ACTION***********************/}
        <div className="flex justify-end">
          <button
            className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded"
            onClick={onClose}
            disabled={loading}
          >
            annuler
          </button>
          <button
            className="px-4 py-2 bg-prim text-white rounded"
            onClick={handleBooking}
            disabled={loading}
          >
            {loading ? 'Envoie...' : 'Envoyer'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookAppointmentModal;
