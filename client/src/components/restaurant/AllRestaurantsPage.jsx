import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Use Link for navigation
import { axiosInstance } from "../../config/axioInstance";
import RestaurantCard from "./RestaurantCard";

const AllRestaurantsPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRestaurants = async () => {
    try {
      const response = await axiosInstance({
        url: "/restaurant/all",
      });
      setRestaurants(response.data.allRestaurants);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 text-center">
        All Restaurants
      </h1>

      {restaurants.length === 0 ? (
        <p className="text-center text-gray-500">No restaurants available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {restaurants.map((restaurant) => (
            <Link
              key={restaurant._id} // Use unique key for each restaurant
              to={`/restaurant/${restaurant._id}`} // Link to restaurant details page
            >
              <RestaurantCard
                name={restaurant.name}
                image={restaurant.image}
                rating={restaurant.rating}
                isOpen={restaurant.isOpen} // Pass isOpen prop
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllRestaurantsPage;
