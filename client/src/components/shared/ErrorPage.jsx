import React from "react";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-200 py-12 px-6 sm:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto text-center">
        {/* Error Header */}
        <h2 className="text-6xl font-extrabold text-yellow-900 mb-4">404</h2>
        <p className="text-3xl font-semibold text-gray-900 mb-6">
          Page Not Found
        </p>
        <p className="text-lg text-gray-700 mb-12">
          Sorry, we couldn't find the page you're looking for.
        </p>

        {/* Back to Home Button */}
        <div className="mt-8">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center px-6 py-3 bg-yellow-900 text-white text-lg font-medium rounded-lg shadow-md "
          >
            <svg
              className="mr-2 -ml-1 h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12h18m-9-9l9 9-9 9"
              />
            </svg>
            Go Back Home
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="mt-16 w-full max-w-2xl mx-auto">
        <div className="relative">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center">
            <span className="px-2  text-sm text-gray-700">
              If you think this is a mistake, please contact support.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
