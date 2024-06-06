import React, { useMemo } from 'react';
import Slider from 'react-slick';
import '../styles/Carousel.css';

interface CarouselProps {
  children: React.ReactNode;
}

const Carousel: React.FC<CarouselProps> = ({ children }) => {
  const settings = useMemo(() => ({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  }), []);

  return (
    <Slider {...settings}>
      {children}
    </Slider>
  );
};

export default React.memo(Carousel);
