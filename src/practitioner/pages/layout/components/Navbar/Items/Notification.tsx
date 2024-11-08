import React, { useState } from 'react';
import { FaBell } from 'react-icons/fa';

const Notification: React.FC = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);

  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const markAsRead = () => {
    setUnreadCount(0);
    setIsNotificationOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="text-gray-600 hover:text-gray-800 focus:outline-none"
        onClick={toggleNotification}
      >
        <FaBell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
            {unreadCount}
          </span>
        )}
      </button>
      {isNotificationOpen && (
        <div className="absolute top-10 right-0 bg-white dark:bg-gray-800 rounded-md shadow-lg w-64 z-10 p-4">
          <h3 className="text-lg font-medium mb-2">Notifications</h3>
          <ul className="space-y-2">
            <li
              className="p-2 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 font-medium"
              onClick={markAsRead}
            >
              Nouvelle commande
            </li>
            <li
              className="p-2 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500"
              onClick={markAsRead}
            >
              Mise à jour du profil
            </li>
            <li
              className="p-2 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 font-medium"
              onClick={markAsRead}
            >
              Rappel de rendez-vous
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Notification;
