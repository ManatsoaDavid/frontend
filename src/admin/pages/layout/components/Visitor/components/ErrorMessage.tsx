import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div className="text-center text-red-500 p-4">
    {message}
  </div>
);

export default ErrorMessage;
