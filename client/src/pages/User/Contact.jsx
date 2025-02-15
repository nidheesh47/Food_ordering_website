import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ContactPage = () => {
  const navigate = useNavigate();
  const [contactInfo, setContactInfo] = useState({
    name: "name",
    email: "user@example.com",
    phone: "123-456-7890",
    address: "123 Main Street, Anytown, USA",
  });

  const [editMode, setEditMode] = useState({
    name: false,
    email: false,
    phone: false,
    address: false,
  });

  const handleInputChange = (field, value) => {
    setContactInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleEditMode = (field) => {
    setEditMode((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSave = () => {
    console.log("Saved Contact Info:", contactInfo);
    navigate("/profile"); // Redirect to the profile page
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Contact Information
      </h1>

      {/* Name Section */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Name</label>
        {editMode.name ? (
          <input
            type="text"
            value={contactInfo.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
          />
        ) : (
          <p className="mt-1 text-gray-600">{contactInfo.name}</p>
        )}
        <button
          onClick={() => toggleEditMode("name")}
          className="mt-2 text-sm text-blue-600 hover:underline"
        >
          {editMode.name ? "Save" : "Edit"}
        </button>
      </div>

      {/* Email Section */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Email</label>
        {editMode.email ? (
          <input
            type="email"
            value={contactInfo.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
          />
        ) : (
          <p className="mt-1 text-gray-600">{contactInfo.email}</p>
        )}
        <button
          onClick={() => toggleEditMode("email")}
          className="mt-2 text-sm text-blue-600 hover:underline"
        >
          {editMode.email ? "Save" : "Edit"}
        </button>
      </div>

      {/* Phone Section */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Phone</label>
        {editMode.phone ? (
          <input
            type="text"
            value={contactInfo.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
          />
        ) : (
          <p className="mt-1 text-gray-600">{contactInfo.phone}</p>
        )}
        <button
          onClick={() => toggleEditMode("phone")}
          className="mt-2 text-sm text-blue-600 hover:underline"
        >
          {editMode.phone ? "Save" : "Edit"}
        </button>
      </div>

      {/* Address Section */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Address</label>
        {editMode.address ? (
          <textarea
            value={contactInfo.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
          ></textarea>
        ) : (
          <p className="mt-1 text-gray-600">{contactInfo.address}</p>
        )}
        <button
          onClick={() => toggleEditMode("address")}
          className="mt-2 text-sm text-blue-600 hover:underline"
        >
          {editMode.address ? "Save" : "Edit"}
        </button>
      </div>

      {/* Save Button */}
      <div className="mt-6 text-center">
        <Link to="/user-profile">
          <button
            onClick={handleSave}
            className="px-6 py-2 text-white bg-orange-400 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            Save
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ContactPage;
