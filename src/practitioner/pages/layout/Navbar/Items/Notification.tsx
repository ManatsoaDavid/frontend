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
        className="relative p-2 text-gray-600 transition-colors duration-200 rounded-full hover:text-prim  focus:outline-none focus:text-prim"
        onClick={toggleNotification}
      >
        <FaBell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>
      {isNotificationOpen && (
        <div className="absolute top-12 right-0 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h3>
            <button
              onClick={markAsRead}
              className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Marquer comme tous lu
            </button>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {/* Contenu des notifications ici */}
            <div className="p-4 text-sm text-gray-500 dark:text-gray-400">
              Pas de nouvelles notifications
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
