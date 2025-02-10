import React, { useEffect, useState } from "react";
import RestaurantCard from "../restaurant/RestaurantCard";
import { Carousel } from "@material-tailwind/react";
import SliderItem from "./SliderItem";
import MultiSlider from "./MultiSlider";
import { axiosInstance } from "../../config/axioInstance";
import { Link } from "react-router-dom";

function HomePage() {
  const [carouselData, setCarouselData] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [menuResponse, restaurantResponse] = await Promise.all([
          axiosInstance({ url: "menu-item/get/all/menu-items" }),
          axiosInstance({ url: "/restaurant/all" }),
        ]);

        // Map menu items to include restaurantId
        const menuItems = menuResponse.data.menu.map((item) => ({
          image: item.image,
          name: item.title,
          restaurantId: item.restaurant, // Assuming the menu item has a restaurant field
        }));
        setCarouselData(menuItems);

        setRestaurants(restaurantResponse.data.allRestaurants);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    navigation: true,
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <>
      {/* Search Bar Section */}
      <div className="searchbar-img justify-center flex items-center relative">
        <div className="flex flex-col items-center">
          <div className="text-center text-white">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium">
              Fryomi
            </h1>
            <p className="text-2xl sm:text-3xl py-4">
              Discover the best food & drinks
            </p>
          </div>

          <div
            className="mx-auto relative bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300"
            htmlFor="search-bar"
          >
            <input
              id="search-bar"
              placeholder="your keyword here"
              className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search for restaurants or dishes"
            />
            <button className="w-full md:w-auto px-6 py-3 bg-yellow-900 text-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all disabled:opacity-70">
              <div className="relative">
                <div className="flex items-center justify-center h-3 w-3 absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 transition-all">
                  <svg
                    className="opacity-0 animate-spin w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx={12}
                      cy={12}
                      r={10}
                      stroke="currentColor"
                      strokeWidth={4}
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </div>
                <div className="flex items-center opacity-1">
                  <span className="text-sm font-semibold whitespace-nowrap truncate mx-auto">
                    Search
                  </span>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Carousel Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8">
          Popular Dishes
        </h2>
        <div className="px-4 sm:px-6 lg:px-8">
          {carouselData.length === 0 ? (
            <p className="text-center text-gray-500">
              No menu items available.
            </p>
          ) : (
            <MultiSlider
              data={carouselData}
              settings={settings}
              items={(item) => (
                <Link
                  key={item.name}
                  to={`/restaurant/${item.restaurantId}`} // Navigate to the restaurant page
                >
                  <SliderItem
                    img={item.image}
                    name={item.name}
                    alt={`Image of ${item.name}`}
                  />
                </Link>
              )}
            />
          )}
        </div>
      </div>

      {/* Restaurant Cards Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8">
          Top Restaurants
        </h2>
        {filteredRestaurants.length === 0 ? (
          <p className="text-center text-gray-500">No restaurants available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <Link key={restaurant._id} to={`/restaurant/${restaurant._id}`}>
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
    </>
  );
}

export default HomePage;
