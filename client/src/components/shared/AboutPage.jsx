import React from "react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="bg-gray-100 py-12 px-6 sm:px-16">
      <div className="max-w-7xl mx-auto text-center">
        {/* Title Section */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-yellow-900 mb-6">
          About Our Food Ordering Service
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 mb-12">
          Enjoy a seamless and convenient way to order your favorite dishes
          online. Whether it's pizza, sushi, or burgers, we've got you covered.
        </p>

        {/* Main Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
          {/* Section 1: Why Choose Us */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl sm:text-3xl font-semibold text-yellow-900 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-gray-600">
              We prioritize convenience, speed, and quality. Browse through a
              variety of restaurants, track orders in real-time, and enjoy
              exclusive offers.
            </p>
          </div>

          {/* Section 2: Our Benefits */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl sm:text-3xl font-semibold text-yellow-900 mb-4">
              Our Benefits
            </h2>
            <ul className="text-gray-600 list-disc pl-6 space-y-2">
              <li>Real-time order tracking</li>
              <li>Wide selection of restaurants</li>
              <li>Exclusive deals and discounts</li>
              <li>Fast and secure payment options</li>
            </ul>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="mt-16">
          <h2 className="text-2xl sm:text-3xl font-semibold text-yellow-900 mb-4">
            Get Started Today!
          </h2>
          <p className="text-gray-700 mb-6">
            Sign up now and start enjoying your favorite meals from our
            platform. It's quick, easy, and secure!
          </p>
          <Link
            to="/signup"
            className="inline-block bg-yellow-900 text-white py-2 px-6 rounded-lg shadow-md"
          >
            Sign Up Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
