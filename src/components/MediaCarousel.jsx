// src/components/MediaCarousel.jsx
import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { FiVolume2, FiVolumeX } from 'react-icons/fi';
import 'tailwindcss/tailwind.css';



const MediaCarousel = ({ setCurrentID }) => {
  const swiperRef = useRef(null);
  const [videoPlayingIndex, setVideoPlayingIndex] = useState(null);
  const [isMuted, setIsMuted] = useState(true);
  const [slidesData, setSlidesData] = useState([]);
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
      }
    };

    fetchSlidesData();
  }, []);
  const handleSlideChange = () => {
    const swiper = swiperRef.current?.swiper;
    if (!swiper) return;

    const activeIndex = swiper.realIndex; 
    // 1. Pause all videos in all slides
    swiper.slides.forEach((slide) => {
      const vid = slide.querySelector('video');
      if (vid) {
        vid.pause();
        vid.currentTime = 0;
      }
    });

    // 2. Update the title for the newly active slide
    const currentSlide = slidesData[activeIndex];
    setCurrentID(currentSlide.id);

    // 3. Check if the active slide has a video
    const activeSlide = swiper.slides[activeIndex];
    const video = activeSlide.querySelector('video');
    if (video) {
      // Pause the autoplay to watch video
      swiper.autoplay.stop();
      setVideoPlayingIndex(activeIndex);

      // Ensure the video’s mute state matches the component state
      video.muted = isMuted;

      // Play the current video
      video.play().catch((error) => {
        console.error('Error playing video:', error);
      });

      // When video ends, resume autoplay
      video.onended = () => {
        swiper.slideNext();
      };
    } else {
      // If it’s not a video slide, resume autoplay
      swiper.autoplay.start();
      setVideoPlayingIndex(null);
      setIsMuted(true);
    }
  };

  const toggleMute = (index) => {
    const swiper = swiperRef.current?.swiper;
    if (!swiper) return;

    const slide = swiper.slides[index];
    const video = slide.querySelector('video');
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  // Initialize the current title on mount
  useEffect(() => {
    if (slidesData.length > 0) {
      setCurrentID(slidesData[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <Swiper
      ref={swiperRef}
      modules={[Pagination, Autoplay, Navigation, Keyboard]}
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000, disableOnInteraction: false , pauseOnMouseEnter: true }}
      spaceBetween={30}
      slidesPerView={1}
      onSlideChange={handleSlideChange}
      navigation
      keyboard={{ enabled: true }}
      className="w-full h-full lg:max-h-[87vh]"
    >
      {slidesData.map((slide, index) => (
        <SwiperSlide key={index} className="relative">
          {slide.type === 'image' ? (
            <img
              src={slide.src}
              alt={slide.alt || `Slide ${index + 1}`}
              loading="lazy"
              onError={(e) => {
                e.target.src =
                  'https://via.placeholder.com/800x600?text=Image+Not+Available';
              }}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <>
              <video
                className="w-full h-full object-cover rounded-lg"
                controls={false}
                muted={videoPlayingIndex === index ? isMuted : true}
                preload="metadata"
                onError={(e) => {
                  console.error('Video failed to load:', e);
                }}
              >
                <source src={slide.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {videoPlayingIndex === index && (
                <button
                  onClick={() => toggleMute(index)}
                  className="absolute bottom-4 right-4 p-3 z-[666] text-2xl text-white bg-black bg-opacity-50 rounded-full hover:bg-opacity-75 transition duration-300 focus:outline-none focus:ring-2 focus:ring-white"
                  aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                >
                  {isMuted ? <FiVolumeX /> : <FiVolume2 />}
                </button>
              )}
            </>
          )}

          {/* Title and Description Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 rounded-b-lg">
            <h2 className="text-xl md:text-2xl font-semibold text-white">
              {slide.title}
            </h2>
            <p className="text-md md:text-lg text-gray-200">
              {slide.description}
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MediaCarousel;
