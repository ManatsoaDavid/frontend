import moment from 'moment';
import 'moment/locale/fr';
import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { localStorageService } from 'utils/localStorageService';
import { deleteAvailability, fetchAgendaData, handleManualSubmit, updateAvailability } from './agendaFonction';
import { handleSelectSlot, messages } from './agendaSelectSlot';

/**************************
 * Configuration du localisateur pour le calendrier
 * Utilisation de moment.js pour gérer les dates et heures
 **************************/
const localizer = momentLocalizer(moment);

moment.locale('fr');

const AgendaDisplay: React.FC = () => {
  /**************************
   * États pour gérer les heures de début et de fin,
   * ainsi que les événements du calendrier
   **************************/
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [events, setEvents] = useState([]);
  const practitionerId = parseInt(localStorageService.getItem('practitionerId'));
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  /**************************
   * Effet pour charger les données de l'agenda au chargement du composant
   **************************/
  useEffect(() => {
    const loadAgendaData = async () => {
      const agendaEvents = await fetchAgendaData(practitionerId.toString());
      setEvents(agendaEvents);
    };
    loadAgendaData();
  }, [practitionerId]);

  /**************************
   * Gestion de la soumission manuelle d'un nouvel événement
   **************************/
  const onManualSubmit = async (e: React.FormEvent) => {
    const success = await handleManualSubmit(e, practitionerId, startTime, endTime);
    if (success) {
      const updatedEvents = await fetchAgendaData(practitionerId.toString());
      setEvents(updatedEvents);
      setStartTime('');
      setEndTime('');
    }
  };


  const handleEventSelect = (event: any) => {
    setSelectedEvent(event);
    setStartTime(moment(event.start).format('YYYY-MM-DDTHH:mm'));
    setEndTime(moment(event.end).format('YYYY-MM-DDTHH:mm'));
    setIsEditing(true);
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedEvent) {
      const success = await updateAvailability(selectedEvent.id, startTime, endTime);
      if (success) {
        const updatedEvents = await fetchAgendaData(practitionerId.toString());
        setEvents(updatedEvents);
        setIsEditing(false);
        setSelectedEvent(null);
        setStartTime('');
        setEndTime('');
      }
    }
  };

  const handleDeleteEvent = async (event: any) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette disponibilité ?')) {
      const success = await deleteAvailability(event.id);
      if (success) {
        const updatedEvents = await fetchAgendaData(practitionerId.toString());
        setEvents(updatedEvents);
        setSelectedEvent(null);
        setIsEditing(false);
      }
    }
  };


  return (
    <div className="container mx-auto p-6 dark:bg-gray-800">
      <h2 className="text-3xl font-bold text-dark dark:text-white mb-6 text-center">Agenda du Praticien</h2>

      <form onSubmit={isEditing ? handleUpdateSubmit : onManualSubmit} className="flex flex-col items-center mb-8 space-y-4">
        <label htmlFor="debut" className="dark:text-white">Heure et date de debut </label>
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="border border-sec rounded-md px-4 py-2 text-dark dark:text-white dark:bg-gray-700 w-full md:w-1/2"
          required
          name='debut'
        />

        <label htmlFor="fin" className="dark:text-white">Heure et date de fin </label>
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="border border-sec rounded-md px-4 py-2 text-dark dark:text-white dark:bg-gray-700 w-full md:w-1/2"
          required
          name='fin'
        />
        <button
          type="submit"
          className="bg-prim text-white rounded-md px-6 py-2 hover:bg-opacity-90 transition-all"
        >
          {isEditing ? 'Modifier disponibilité' : 'Ajouter disponibilité'}
        </button>
        {isEditing && (
          <>
            <button
              type="button"
              onClick={() => handleDeleteEvent(selectedEvent)}
              className="bg-red-500 text-white rounded-md px-6 py-2 hover:bg-opacity-90 transition-all"
            >
              Supprimer
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setSelectedEvent(null);
                setStartTime('');
                setEndTime('');
              }}
              className="bg-gray-500 text-white rounded-md px-6 py-2 hover:bg-opacity-90 transition-all"
            >
              Annuler
            </button>
          </>
        )}

      </form>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable={true}
        onSelectSlot={(slotInfo) => handleSelectSlot(slotInfo, practitionerId, setEvents as React.Dispatch<React.SetStateAction<any[]>>)}
        messages={messages}
        onSelectEvent={handleEventSelect}

        className="bg-calendar-header text-calendar-text border border-calendar-cell dark:bg-gray-700 dark:text-white dark:border-gray-600"
      />
    </div>
  );
}

export default AgendaDisplay;
