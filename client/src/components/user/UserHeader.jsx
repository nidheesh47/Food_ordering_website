import React, { useContext, useEffect, useState } from "react";
import {
  Disclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { axiosInstance } from "../../config/axioInstance";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function UserHeader() {
  const { setIsUserAuth } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axiosInstance.get("/user/profile");
        setUser(response.data.data); // Access the `data` field in the response
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsUserAuth(false);
  };

  return (
    <Disclosure as="nav" className="bg-yellow-900">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Logo */}
          <div>
            <Link to="/">
              <h1 className="roboto-medium text-white text-3xl sm:text-4xl md:text-5xl">
                Fryomi
              </h1>
            </Link>
          </div>

          {/* Cart and Profile Menu */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-3">
            {/* Cart Icon */}
            <Link to="/cart">
              <FaShoppingCart className="text-white text-3xl" />
            </Link>

            {/* Profile Dropdown Menu */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  {loading ? (
                    <div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse sm:w-10 sm:h-10" />
                  ) : (
                    <img
                      alt=""
                      src={
                        user?.profilePic || "https://via.placeholder.com/256"
                      }
                      className="w-8 h-8 rounded-full sm:w-10 sm:h-10"
                    />
                  )}
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <MenuItem>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                  >
                    Your Profile
                  </Link>
                </MenuItem>

                <MenuItem>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                  >
                    Sign out
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>
    </Disclosure>
  );
}
