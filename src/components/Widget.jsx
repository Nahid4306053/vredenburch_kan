// src/components/Widget.jsx
import React from 'react';

const Widget = ({ title, image, content }) => {
  return (
    <div className="mb-6 p-8 bg-clubBlue rounded-lg border-2 border-red-500 shadow-xl cursor-pointer transition-colors duration-300">
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-40 object-cover rounded-md mb-4"
        />
      )}
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-md">{content}</p>
    </div>
  );
};

export default Widget;
