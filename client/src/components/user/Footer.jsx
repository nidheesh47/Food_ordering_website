import React from "react";
import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom"; // Import Link for navigation

function Footer() {
  const LINKS = [
    {
      title: "Menu",
      items: ["Browse Menu", "Today's Specials", "Popular Dishes"],
    },
    {
      title: "Company",
      items: ["About Us", "Careers"], // "About Us" link here
    },
    {
      title: "Resources",
      items: ["Blog", "Help Center"],
    },
    {
      title: "Legal",
      items: ["Privacy Policy", "Terms & Conditions"],
    },
  ];

  const currentYear = new Date().getFullYear();
  return (
    <div>
      <footer className="relative w-full pt-10 bg-gray-800 text-white">
        <div className="mx-auto w-full max-w-7xl px-8">
          <div className="grid grid-cols-1 justify-between gap-4 md:grid-cols-2">
            <Typography variant="h5" className="mb-6 text-teal-400">
              Fryomi
            </Typography>
            <div className="grid grid-cols-3 justify-between gap-4">
              {LINKS.map(({ title, items }) => (
                <ul key={title}>
                  <Typography
                    variant="small"
                    color="white"
                    className="mb-3 font-bold"
                  >
                    {title}
                  </Typography>
                  {items.map((link) => (
                    <li key={link}>
                      <Typography
                        as={link === "About Us" ? Link : "a"} // Use Link for About Us
                        to={link === "About Us" ? "/about" : "#"} // Link to /about
                        color="teal"
                        className="py-1.5 font-normal hover:text-teal-300"
                      >
                        {link}
                      </Typography>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
          <div className="mt-12 flex w-full flex-col items-center justify-center border-t py-4 md:flex-row md:justify-between">
            <Typography
              variant="small"
              className="mb-4 text-center font-medium text-white md:mb-0"
            >
              &copy; {currentYear}{" "}
              <a
                href="https://material-tailwind.com/"
                className="text-teal-400"
              >
                Fryomi
              </a>
              . All Rights Reserved.
            </Typography>
            <div className="flex gap-4 text-white sm:justify-center">
              {/* Social Icons */}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
