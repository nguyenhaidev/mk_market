import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

import PropTypes from "prop-types";

import Item from "../../UI/Item/Item";

function Swipers(props) {
  const slide = props.data.map((item, index) => {
    return (
      <SwiperSlide key={index}>
        <Item data={item} rowStyle={false}/>
      </SwiperSlide>
    );
  });

  const [width, setWidth] = useState(window.innerWidth);

  const handleResize = (e) => {
    const windowSize = window.innerWidth;
    setWidth(windowSize);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);

  return (
    <div className="w-100" style={{ overflow: "hidden" }}>
      <Swiper
        slidesPerView={width >= 1300 ? 3 : 2}
        spaceBetween={30}
        autoplay={true}
        className="mySwiper"
      >
        {slide}
      </Swiper>
    </div>
  );
}

Swipers.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Swipers;
