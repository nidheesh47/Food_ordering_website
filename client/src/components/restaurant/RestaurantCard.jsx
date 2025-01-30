import React from "react";
import { Rating } from "@material-tailwind/react";

function RestaurantCard({ name, image, rating }) {
  return (
    <div className="rounded overflow-hidden shadow-lg max-w-xs mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg">
      <div className="relative">
        <img
          className="w-full h-56 object-cover sm:h-64 md:h-40 lg:h-40"
          src={image}
          alt={name}
        />
        <div className="hover:bg-transparent transition duration-300 absolute inset-0 bg-gray-900 opacity-25"></div>
      </div>
      <div className="px-4 py-3">
        <Rating value={rating} readonly />
        <h3 className="font-semibold text-base md:text-lg lg:text-xl">
          {name}
        </h3>
      </div>
    </div>
  );
}

export default RestaurantCard;
