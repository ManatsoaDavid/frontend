import axios from 'axios';
import { fetchAgendaData } from './agendaFonction';

export const handleSelectSlot = async (slotInfo: { start: Date; end: Date }, practitionerId: number, setEvents: React.Dispatch<React.SetStateAction<any[]>>) => {
  const { start, end } = slotInfo;
  const API = process.env.REACT_APP_API_URL;

  try {
    const agendaData = {
      practitionerId: practitionerId,
      category: 'Default Category'
    };

    const agendaResponse = await axios.post(`${API}/agenda`, agendaData);
    const newAgendaId = agendaResponse.data.data.agendaId;

    const availabilityData = {
      agendaId: newAgendaId,
      startTime: start.toISOString(),
      endTime: end.toISOString(),
      status: 'DISPONIBLE'
    };

    await axios.post(`${API}/availability`, availabilityData);

    const updatedEvents = await fetchAgendaData(practitionerId.toString());
    setEvents(updatedEvents);
  } catch (error) {
    console.error('Error creating agenda and availability:', error);
  }
};

export const messages = {
  allDay: 'Journée',
  previous: 'Précédent',
  next: 'Suivant',
  today: "Aujourd'hui",
  month: 'Mois',
  week: 'Semaine',
  day: 'Jour',
  agenda: 'Agenda',
  date: 'Date',
  time: 'Heure',
  event: 'Événement',
  noEventsInRange: 'Aucun événement dans cette plage.',
  showMore: (total: number) => `+ ${total} événement(s) supplémentaire(s)`,
  // Adding dark mode specific styles for calendar messages
  dayHeaderFormat: (date: Date) => date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric' }),
  timeGutterFormat: (date: Date) => date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
  eventTimeRangeFormat: ({ start, end }: { start: Date; end: Date }) => {
    return `${start.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })} - ${end.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`;
  }
};

// Add custom styles for dark mode calendar events
export const eventStyleGetter = () => {
  return {
    style: {
      backgroundColor: 'var(--event-bg-color, #3174ad)',
      color: 'var(--event-text-color, white)',
      border: 'var(--event-border, none)',
      borderRadius: '4px',
      opacity: 0.8,
      display: 'block',
      padding: '2px 5px'
    }
  };
};
