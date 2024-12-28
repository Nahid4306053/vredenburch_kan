// src/components/UpcomingContent.jsx
import React, { useEffect, useState } from 'react';

export default function UpcomingContent({ currentItemId }) {
  const [slidesData, setSlidesData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSlidesData = async () => {
      try {
        const response = await fetch('./data/matches.json');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setSlidesData(data);
        console.log(data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Unable to fetch data. Please try again later.');
      }
    };

    fetchSlidesData();
  }, []);
  // Find the item corresponding to the provided currentItemId
  const currentItem = slidesData.find((item) => item.id === currentItemId);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Upcoming Contents</h1>

      <div className="p-4 border-2 rounded-md bg-clubBlue border-red-400">
        {/* Show the current item’s title at the top */}
        <h1 className="text-xl font-bold mb-5">
          {currentItem
            ? `Current: ${currentItem.title}`
            : 'No matching item found'}
        </h1>

        {/* Display error message if fetching fails */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Scrollable container displaying all items */}
        <div className="max-h-56 overflow-y-auto space-y-2 custom-scrollbar">
          {slidesData.map((slide) => {
            const isActive = slide.id === currentItemId;
            return (
              <div
                key={slide.id}
                className={`p-3 mr-2 rounded-md cursor-pointer shadow-xl border transition-colors ${
                  isActive
                    ? 'bg-clubRed text-white'
                    : 'bg-gray-200 bg-opacity-75 hover:bg-gray-300 text-black'
                }`}
              >
                <h2 className="font-semibold text-md">{slide.title}</h2>
                <p className="text-sm">{slide.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
