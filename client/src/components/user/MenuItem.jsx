import React from "react";
import { Rating } from "@material-tailwind/react";

function MenuItem() {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg bg-white max-w-xs sm:max-w-sm md:max-w-md mx-auto">
      <div className="relative">
        <img
          className="w-full h-48 object-cover sm:h-56 md:h-64"
          src="/pizza.png"
          alt="Pizza"
        />
        <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
      </div>
      <div className="px-4 py-3 sm:px-6 sm:py-4">
        <Rating value={3} readonly />
        <h3 className="font-semibold text-lg sm:text-xl">
          {/* Adjust font size */} Moonlight
        </h3>
        <p className="text-gray-500 text-sm sm:text-base">
          {/* Adjust text size */} Chicken Biriyani
        </p>
      </div>
      <div className="px-4 py-2 flex flex-row items-center justify-between sm:py-4">
        {/* You can add any other buttons or content here */}
      </div>
    </div>
  );
}

export default MenuItem;
