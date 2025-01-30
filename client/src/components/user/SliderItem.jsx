import React from "react";

function SliderItem({ img, name }) {
  return (
    <div className="flex flex-col justify-center items-center p-6 bg-white rounded-lg shadow-lg hover:scale-105 transform transition duration-300 ease-in-out max-w-xs sm:max-w-sm md:max-w-md w-full">
      <img
        src={img}
        alt={name}
        className="w-[8rem] h-[8rem] sm:w-[12rem] sm:h-[12rem] md:w-[14rem] md:h-[14rem] rounded-full object-cover border-4 border-white shadow-lg transform hover:rotate-3 transition-transform duration-300 ease-in-out"
      />
      <span className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mt-4 roboto tracking-wide">
        {name}
      </span>
    </div>
  );
}

export default SliderItem;
