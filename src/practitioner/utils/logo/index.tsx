import React from 'react';
import './logo.css';
import logo from './logo.png'

const Logo: React.FC = () => {
  return (
    <div className="logo">

       <img src={logo} alt="Logo" className="logo-image" /> 
      
    </div>
  );
};

export default Logo;
