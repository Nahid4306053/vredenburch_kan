import React, { useRef, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Swiper core styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import Widget from './Widget';

export default function NewsWidget() {
  // Reference to the Swiper instance
  const swiperRef = useRef(null);

  // State to hold news data
  const [newsData, setNewsData] = useState([]);

  // State for handling errors (if fetching dynamically)
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulating a fetch request for news data
    const fetchNewsData = async () => {
      try {
        const response = await fetch('./data/news.json'); // Replace with actual API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch news data');
        }
        const data = await response.json();
        setNewsData(data);
      } catch (err) {
        console.error('Error fetching news data:', err);
        setError('Unable to load news. Please try again later.');
      }
    };

    // Fetch data on component mount
    fetchNewsData();
  }, []); // Empty dependency array ensures it runs only once on mount

  return (
    <div className="w-full max-w-4xl mx-auto mt-5">
      <h1 className="text-2xl font-bold mb-4">Latest News</h1>

      {/* Error message display */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Render Swiper only if newsData is available */}
      {newsData.length > 0 ? (
        <Swiper
          ref={swiperRef}
          modules={[Autoplay, Pagination, Navigation]}
          slidesPerView={1}
          spaceBetween={20}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{ clickable: true }}
          navigation
          className="unique-news-swiper w-full"
        >
          {newsData.map((item, index) => (
            <SwiperSlide key={index}>
              <Widget
                title={item.title}
                image={item.image}
                content={item.content}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        // Placeholder for when there is no data
        <p>Loading news...</p>
      )}
    </div>
  );
}
