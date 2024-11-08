
import React from 'react';

interface CardMenuProps {
  title: string;
  content: string;
  onClick?: () => void;
}

const CardMenu: React.FC<CardMenuProps> = ({ title, content, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <div className="card-header">
        <h3>{title}</h3>
      </div>
      <div className="card-body">
        <p>{content}</p>
      </div>
    </div>
  );
};

export default CardMenu;
