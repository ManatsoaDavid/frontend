import moment from 'moment';
import 'moment/locale/fr';
import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { localStorageService } from 'utils/localStorageService';
import { fetchAgendaData, handleManualSubmit } from './agendaFonction';
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

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-dark mb-6 text-center">Agenda du Praticien</h2>

      {/*************************
       * Formulaire pour ajouter manuellement une disponibilité
       **************************/}
      <form onSubmit={onManualSubmit} className="flex flex-col items-center mb-8 space-y-4">
        <label htmlFor="debut" >Heure et date de debut </label>
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="border border-sec rounded-md px-4 py-2 text-dark w-full md:w-1/2"
          required
          name='debut'
        />

        <label htmlFor="fin" >Heure et date de fin </label>
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="border border-sec rounded-md px-4 py-2 text-dark w-full md:w-1/2"
          required
          name='fin'
        />
        <button
          type="submit"
          className="bg-prim text-white rounded-md px-6 py-2 hover:bg-opacity-90 transition-all"
        >
          Ajouter disponibilité
        </button>
      </form>

      {/*************************
       * Composant Calendar de react-big-calendar pour afficher l'agenda
       **************************/}
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable={true}
        onSelectSlot={(slotInfo) => handleSelectSlot(slotInfo, practitionerId, setEvents as React.Dispatch<React.SetStateAction<any[]>>)}
        messages={messages}
        className="bg-calendar-header text-calendar-text border border-calendar-cell"
      />
    </div>
  );
}

export default AgendaDisplay;
