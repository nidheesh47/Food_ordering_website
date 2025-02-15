import React from "react";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

const MenuCard = ({ menucard }) => {
  const onSubmit = async () => {
    try {
      const response = await axiosInstance.post("cart/add-to-cart", {
        foodId: menucard._id,
        restaurantId: menucard.restaurant,
        quantity: 1,
      });
      toast.success("Item added to cart");
      console.log("response===", response);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="bg-white border  border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="">
        <figure className="overflow-hidden rounded-t-lg h-48 bg-gray-100">
          <img
            className="w-full h-full object-cover"
            src={menucard.image}
            alt={menucard.name}
          />
        </figure>
        <div className="p-4 flex flex-col justify-between h-full">
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-2">
              {menucard.name}
            </h2>
            <div className="flex items-center mb-2">
              <div className="rating rating-sm">
                <input
                  type="radio"
                  name={`rating-${menucard._id}`}
                  className="mask mask-star-2 bg-yellow-400"
                />
                <input
                  type="radio"
                  name={`rating-${menucard._id}`}
                  className="mask mask-star-2 bg-yellow-400"
                  defaultChecked
                />
                <input
                  type="radio"
                  name={`rating-${menucard._id}`}
                  className="mask mask-star-2 bg-yellow-400"
                />
                <input
                  type="radio"
                  name={`rating-${menucard._id}`}
                  className="mask mask-star-2 bg-yellow-400"
                />
                <input
                  type="radio"
                  name={`rating-${menucard._id}`}
                  className="mask mask-star-2 bg-yellow-400"
                />
              </div>
            </div>
            <p className="text-gray-600 text-sm">{menucard.description}</p>
          </div>

          <div className="flex justify-between items-center mt-4">
            <p className="text-lg font-semibold text-gray-800">₹ {menucard.price}</p>
            <button
              className="btn bg-orange-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
              onClick={onSubmit}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
