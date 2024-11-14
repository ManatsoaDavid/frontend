import moment from 'moment';
import 'moment/locale/fr';
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

moment.locale('fr');
const localizer = momentLocalizer(moment);

interface PractitionerAgendaProps {
  events: any[];
  handleBooking: (event: any) => void;
}


const PractitionerAgenda: React.FC<PractitionerAgendaProps> = ({ events, handleBooking }) => {
  const EventComponent = ({ event }: { event: any }) => (

    <div>
      <span>{event.title}</span>
      <button
        className={`ml-2 px-2 py-1 rounded text-sm ${event.title === 'INDISPONIBLE'
          ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
          : 'bg-prim text-white'
          }`}
        onClick={() => event.title !== 'INDISPONIBLE' && handleBooking(event)}
        disabled={event.title === 'INDISPONIBLE'}
      >
        {event.title === 'INDISPONIBLE' ? 'Indisponible' : 'Réserver'}
      </button>
    </div>
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-dark font-mono">Disponibilités</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        components={{
          event: EventComponent
        }}
        messages={{
          allDay: 'Journée',
          previous: 'Précédent',
          next: 'Suivant',
          today: "Aujourd'hui",
          month: 'Mois',
          week: 'Semaine',
          day: 'Jour',
          agenda: 'faire un rendez-vous',
          date: 'Date',
          time: 'Heure',
          event: 'Événement',
          noEventsInRange: 'Aucun événement dans cette plage.',
          showMore: (total: number) => `+ ${total} événement(s) supplémentaire(s)`
        }}
      />
    </div>
  );
};

export default PractitionerAgenda;
