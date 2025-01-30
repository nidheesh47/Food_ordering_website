import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Use Link for navigation
import { axiosInstance } from "../../config/axioInstance";
import RestaurantCard from "./RestaurantCard";

const AllRestaurantsPage = () => {
  const [restaurants, setRestaurants] = useState([]);

  const fetchRestaurants = async () => {
    try {
      const response = await axiosInstance({
        url: "/restaurant/all",
      });
      setRestaurants(response.data.allRestaurants);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <h1
        className="text-3xl font-semibold text-center mb-8"
        style={{ color: "rgb(0, 0, 0, 0.8)" }}
      >
        All Restaurants
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {restaurants.map((restaurant) => (
          <Link
            key={restaurant._id} // Use unique key for each restaurant
            to={`/restaurant/${restaurant._id}`} // Link to restaurant details page
          >
            <RestaurantCard
              name={restaurant.name}
              image={restaurant.image}
              rating={restaurant.rating}
              style={{ color: "rgb(0, 0, 0, 0.8)" }} // Apply the same color to the text inside RestaurantCard
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllRestaurantsPage;
