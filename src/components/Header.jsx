// src/components/Header.jsx
import React from 'react';

const Header = () => {
  return (
    <header className="flex items-center p-4 bg-clubRed">
      <img src="/logo.png" alt="Football Club Logo" className="h-12 w-12 mr-4" />
      <h1 className="text-white text-3xl font-bold">Football Club</h1>
    </header>
  );
};

export default Header;
