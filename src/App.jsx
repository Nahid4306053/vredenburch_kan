// src/App.jsx
import { useState } from 'react';
import Header from './components/Header';
import MediaCarousel from './components/MediaCarousel';
import Widget from './components/Widget';
import SocialIcons from './components/SocialIcons'; // New Component
import NewsWidget from './components/NewsWidget';
import UpcomingContent from './components/UpcomingContent';

const App = () => {
  const [currentItemId, setCurrentItemId] = useState(1);

  return (
    <div

      className="flex flex-col min-h-screen"
    >
      <Header />
      <main className="flex flex-col lg:flex-row flex-1">
        {/* Left Section: Media Carousel */}
        <div className="w-full lg:w-2/3 p-4 bg-opacity-15">
          <MediaCarousel setCurrentID={setCurrentItemId} />
        </div>
        {/* Right Section: Widgets */}
        <div className="w-full lg:w-1/3  p-4  rounded-lg text-white flex flex-col">
          {/* Widget 1: Upcoming Matches */}
           <UpcomingContent currentItemId={currentItemId}/>
          {/* Widget 2: Latest News */}
           <NewsWidget/>
          {/* Social Media Icons */}
          <div className="mt-auto">
            <SocialIcons />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
