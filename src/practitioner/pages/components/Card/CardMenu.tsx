import React from 'react';

interface CardMenuProps {
  title: string;
  content: string;
  onClick?: () => void;
}

const CardMenu: React.FC<CardMenuProps> = ({ title, content, onClick }) => {
  return (
    <>
      <div className="card-header">
        <h3 className="dark:text-white">{title}</h3>
      </div>
      <div className="card-body">
        <p className="dark:text-gray-300">{content}</p>
      </div>
    </>
  );
};

export default CardMenu;
