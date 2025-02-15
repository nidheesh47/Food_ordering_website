import React, { useEffect, useState } from "react";
import Data from "../../data/data";
import MenuCard from "../../components/user/MenuCard";
import { Link, useParams } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { ProductSkelton } from "../../components/shared/Skelton";



const RestaurantPage = () => {

  const[restaurantDetails, setRestaurantDetails] = useState({})
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const {id} = useParams();
  
  const fetchRestaurantDetails = async()=>{
    try{
      setLoading(true);
      const response = await axiosInstance({
        url:`/restaurant/${id}`
      });

      setRestaurantDetails(response?.data)
      setMenuItems(response.data.menuItems)
      setLoading(false);
    }catch(error){
      console.log(error)
    }
  };
  console.log('restaurantDetails=========',restaurantDetails)
  console.log('menuItems======',menuItems)
  useEffect(()=>{
    fetchRestaurantDetails();
  },[id]);

  if(loading){
    return <ProductSkelton  />
  }

  return (
    <div className="mt-20 container mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={restaurantDetails.image} 
          alt={restaurantDetails.name}
          className="w-full md:w-60 rounded-lg"
        />
        <div>
          <h1 className="text-4xl font-light">{restaurantDetails.name}</h1>
          <p className="text-gray-600 mt-4">
            {/* {restaurantDetails.description} */}
          </p>
        <p  className="text-gray-600 ">{restaurantDetails.cuisine}</p>
        {/* <p  className="text-gray-600 ">{restaurantDetails.location}</p> */}
        <p className="text-gray-600 ">Status: {restaurantDetails.status}</p>
        <div className="rating mt-2">
        <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-400" />
        <input
          type="radio"
          name="rating-2"
          className="mask mask-star-2 bg-yellow-400"
          defaultChecked />
        <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-400" />
        <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-400" />
        <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-400" />
      </div>

          <div className="mt-6">
            <Link to={``}>
            <button className="bg-orange-600 text-white px-6 py-2 rounded-lg">
              Order Online
            </button>
            </Link>
            {/* <Link to={`/review/${id}`}>
            <button className="bg-orange-600 text-white ms-3 px-6 py-2 rounded-lg">
              Review
            </button>
            </Link> */}
          </div>
        </div>
      </div>
      <hr className="mt-[30px] text-gray-900 " />
      <h2 className="mt-3 font-semibold text-xl ">Recommended</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3  gap-3  mt-3">
        {menuItems.length > 0 ? (
          menuItems.map((item, index) => <MenuCard menucard={item} key={index} />)
        ) : (
          <p className="text-gray-500">No menu items available.</p>
        )}
        </div>
    </div>
  );
};

export default RestaurantPage;
