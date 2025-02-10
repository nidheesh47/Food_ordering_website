import React from "react";

const RestaurantCard = ({ name, image, rating, isOpen }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-yellow-500">⭐ {rating}</span>
          <span
            className={`px-2 py-1 rounded-full text-sm font-semibold ${
              isOpen ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {isOpen ? "Open Now" : "Closed"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
