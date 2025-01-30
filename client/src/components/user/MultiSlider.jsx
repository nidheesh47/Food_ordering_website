import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
function MultiSlider({ data, settings, items }) {
  return (
    <div>
      <Slider {...settings}>{data.map((item) => items(item))}</Slider>
    </div>
  );
}

export default MultiSlider;
