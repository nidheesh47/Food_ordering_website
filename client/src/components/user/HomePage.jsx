import React from "react";
import RestaurantCard from "../restaurant/RestaurantCard";
import { Carousel } from "@material-tailwind/react";
import SliderItem from "./SliderItem";
import MultiSlider from "./MultiSlider";

function HomePage() {
  const data = [
    {
      name: "PizzaHut",
      image: "/pizza.png",
      rating: 4,
    },
    {
      name: "Moonlight",
      image: "/pizza.png",
      rating: 4,
    },
    {
      name: "Domino's",
      image: "/pizza.png",
      rating: 4,
    },
    {
      name: "Rainbow",
      image: "/pizza.png",
      rating: 4,
    },
    {
      name: "Salt&pepper",
      image: "/pizza.png",
      rating: 4,
    },
  ];
  const carouselData = [
    {
      image: "/pizza.png",
      name: "Pizza",
    },
    {
      image: "/pizza.png",
      name: "Pasta",
    },
    {
      image: "/pizza.png",
      name: "Burger",
    },
    {
      image: "/pizza.png",
      name: "Salad",
    },
    {
      image: "/pizza.png",
      name: "Sushi",
    },
    {
      image: "/pizza.png",
      name: "Steak",
    },
    {
      image: "/pizza.png",
      name: "Tacos",
    },
  ];

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    navigation: true,
  };

  return (
    <>
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
            {/* Search */}
            <input
              id="search-bar"
              placeholder="your keyword here"
              className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white"
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

      <h1 className="roboto text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-4 max-w-screen-xl mx-auto">
        Taste the first bite
      </h1>

      {/* MultiSlider Carousel */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 lg:py-12 max-w-screen-xl mx-auto">
        <MultiSlider
          data={carouselData}
          settings={settings}
          items={(item) => (
            <SliderItem key={item.name} img={item.image} name={item.name} />
          )}
        />
      </div>

      {/* Restaurant Cards */}
      <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {data.map((restaurant) => (
            <RestaurantCard
              key={restaurant.name} // Use a unique key (like the restaurant name)
              name={restaurant.name}
              image={restaurant.image}
              rating={restaurant.rating}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default HomePage;
