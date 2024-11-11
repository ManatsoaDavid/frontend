import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { fetchAgendaData } from './availibilityFonction';

interface AvailabilityProps {
  practitionerId: string | number;
  maxDisplay?: number;
}

interface TimeSlot {
  start: Date;
  end: Date;
}

const PractitionerAvailability: React.FC<AvailabilityProps> = ({ practitionerId, maxDisplay = 3 }) => {
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);

  useEffect(() => {
    const loadAvailabilities = async () => {
      const events = await fetchAgendaData(practitionerId.toString());
      const slots = events
        .filter((event: { title: string }) => event.title === "disponible")
        .map((event: { start: string, end: string }) => ({
          start: event.start,
          end: event.end
        }));
      setAvailableSlots(slots);
    };

    loadAvailabilities();
  }, [practitionerId]);

  const formatSlot = (slot: TimeSlot) => {
    const today = moment().startOf('day');
    const startTime = moment(new Date(slot.start));
    const endTime = moment(new Date(slot.end));

    if (startTime.isSame(today, 'day')) {
      return `Aujourd'hui ${startTime.format('HH:mm')}-${endTime.format('HH:mm')}`;
    } else if (startTime.isSame(today.clone().add(1, 'day'), 'day')) {
      return `Demain ${startTime.format('HH:mm')}-${endTime.format('HH:mm')}`;
    }
    return `${startTime.format('DD/MM')} ${startTime.format('HH:mm')}-${endTime.format('HH:mm')}`;
  };

  const sortedSlots = [...availableSlots].sort((a, b) =>
    moment(new Date(a.start)).valueOf() - moment(new Date(b.start)).valueOf()
  );

  if (!sortedSlots.length) {
    return (
      <div className="text-gray-500 text-sm">
        Aucun créneau disponible
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {sortedSlots.slice(0, maxDisplay).map((slot, index) => (
        <span
          key={`slot-${index}`}
          className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm hover:bg-blue-100 cursor-pointer transition-colors"
        >
          {formatSlot(slot)}
        </span>
      ))}
    </div>
  );
};

export default PractitionerAvailability;
