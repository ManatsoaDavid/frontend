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
