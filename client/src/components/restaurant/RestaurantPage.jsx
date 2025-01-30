import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../config/axioInstance"; // Ensure correct import path
import { Rating } from "@material-tailwind/react";

const RestaurantPage = () => {
  const { restaurantId } = useParams(); // Get restaurantId from URL params
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the restaurant data
  const fetchRestaurant = async () => {
    try {
      const response = await axiosInstance({
        url: `/restaurant/${restaurantId}`,
      });
      setRestaurant(response.data.restaurant); // Assuming the restaurant data is inside 'restaurant'
    } catch (error) {
      setError("Failed to fetch restaurant details");
    } finally {
      setLoading(false);
    }
  };

  // Fetch the restaurant data when the component mounts or the restaurantId changes
  useEffect(() => {
    fetchRestaurant();
  }, [restaurantId]);

  // Loading and error states
  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  return (
    // Restaurant
    <div className="roboto">
      <div className="container mx-auto p-6 bg-gray-50">
        {/* Hero Section */}
        <div
          className="relative bg-cover bg-center h-96"
          style={{ backgroundImage: `url(${restaurant.image})` }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="container mx-auto text-center text-white relative z-10 py-24">
            <h1 className="text-5xl font-bold mb-4">{restaurant.name}</h1>
            <p className="text-xl mb-6">{restaurant.tagline}</p>
            <a href="#menu">
              <button className="bg-yellow-900 text-white py-3 px-8 rounded-full text-xl ">
                Explore Menu
              </button>
            </a>
          </div>
        </div>

        {/* About Section */}
        <div className="container mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                About Us
              </h2>
              <p className="text-lg text-gray-700">
                {restaurant.description ||
                  "At our restaurant, we offer a dining experience that combines the best of local ingredients, innovative recipes, and warm hospitality. Visit us for a memorable culinary journey."}
              </p>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Menu Highlights Section */}
        <div id="menu" className="bg-gray-100 py-16">
          <div className="container mx-auto text-center mb-8">
            <h2 className="text-3xl font-semibold text-gray-800">
              Our Popular Dishes
            </h2>
            <p className="text-lg text-gray-600 mt-2">
              Taste the best dishes our kitchen has to offer!
            </p>
          </div>
          <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
            {restaurant.menu && restaurant.menu.length > 0 ? (
              restaurant.menu.map((item) => (
                <div
                  key={item._id}
                  className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="font-semibold text-xl text-gray-800">
                      {item.title}
                    </h3>
                    <div className="flex items-center mt-2">
                      <Rating
                        value={item.rating}
                        readonly
                        className="text-gray-500"
                      />
                    </div>
                    <div className="flex justify-between">
                      <p className="text-lg font-bold text-gray-700 mt-2">
                        ₹{item.price}
                      </p>
                      <button className="bg-yellow-900 text-white py-2 px-8 rounded-full text-sm   ">
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No menu items available</p>
            )}
          </div>
        </div>

        <div className="bg-gray-50 text-gray-800 roboto py-8">
          <div className="container mx-auto text-center">
            <p className="text-lg">Contact us at: {restaurant.phone}</p>
            <p className="mt-2">Visit us at: {restaurant.location}</p>
            <div className="mt-4">
              <a href="#" className="text-white mx-4">
                Facebook
              </a>
              <a href="#" className="text-white mx-4">
                Instagram
              </a>
              <a href="#" className="text-white mx-4">
                Twitter
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantPage;
