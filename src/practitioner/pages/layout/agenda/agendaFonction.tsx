import axios from 'axios';

/**************************
 * Fonction asynchrone pour récupérer les données de l'agenda d'un praticien
 * @param id - L'identifiant du praticien
 * @returns Un tableau d'événements d'agenda formatés
 **************************/

const API = process.env.REACT_APP_API_URL;
export const fetchAgendaData = async (id: string) => {
  try {
    const response = await axios.get(`${API}/agenda/practitioner/${id}`);
    const agendaEvents = response.data.data.flatMap((agenda: any) =>
      agenda.availabilities.map((availability: any) => ({
        id: availability.availabilityId,
        title: "disponible",
        start: new Date(availability.startTime),
        end: new Date(availability.endTime)
      }))
    );
    return agendaEvents;
  } catch (error) {
    console.error('Error fetching agenda data:', error);
    return [];
  }
};

/**************************
 * Fonction asynchrone pour gérer la soumission manuelle d'un créneau d'agenda
 * @param e - L'événement de soumission du formulaire
 * @param practitionerId - L'identifiant du praticien
 * @param startTime - L'heure de début du créneau
 * @param endTime - L'heure de fin du créneau
 * @returns true si la création a réussi, false sinon
 **************************/
export const handleManualSubmit = async (
  e: React.FormEvent,
  practitionerId: number,
  startTime: string,
  endTime: string
) => {
  e.preventDefault();
  try {
    {/*************************
     * Création de l'agenda
     **************************/}
    const agendaData = {
      practitionerId: practitionerId,
      category: 'Default Category'
    };

    const agendaResponse = await axios.post(`${API}/agenda`, agendaData);
    const newAgendaId = agendaResponse.data.data.agendaId;

    {/*************************
     * Création de la disponibilité
     **************************/}
    const availabilityData = {
      agendaId: newAgendaId,
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString(),
      status: 'DISPONIBLE'
    };

    await axios.post(`${API}/availability`, availabilityData);

    return true;
  } catch (error) {
    console.error('Error creating manual agenda and availability:', error);
    return false;
  }
};

export const updateAvailability = async (
  availabilityId: number,
  startTime: string,
  endTime: string
) => {
  try {
    const updatedData = {
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString(),
      status: 'DISPONIBLE'
    };

    await axios.put(`${API}/availability/availability/${availabilityId}`, updatedData);
    console.log("reussi");

    return true;
  } catch (error) {
    console.error('Error updating availability:', error);
    return false;
  }
};


export const deleteAvailability = async (availabilityId: number) => {
  try {
    await axios.delete(`${API}/availability/availability/${availabilityId}`);
    return true;
  } catch (error) {
    console.error('Error deleting availability:', error);
    return false;
  }
};
