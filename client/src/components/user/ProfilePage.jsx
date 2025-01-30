import React, { useState } from "react";

const ProfilePage = () => {
  // State for handling profile and settings
  const [name, setName] = useState("Nidheesh SN");
  const [email, setEmail] = useState("nidheesh@.com");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
    } else {
      // Password update logic goes here
      alert("Password updated successfully!");
      setPassword(newPassword); // Update the password state
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      {/* Profile Hero Section */}
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-xl p-8 mb-10 flex flex-col items-center text-center">
        <img
          src="https://via.placeholder.com/120"
          alt="Profile"
          className="rounded-full border-4 border-yellow-600 mb-6"
        />
        <h2 className="text-3xl font-semibold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-500 mb-4">{email}</p>
        <button className="bg-yellow-800 text-white py-2 px-6 rounded-full hover:bg-yellow-700 focus:outline-none">
          Edit Profile
        </button>
      </div>

      {/* Profile Info Card */}
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg p-8 mb-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Profile Settings
        </h3>
        <div className="space-y-6">
          {/* Name Field */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="name" className="text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="email" className="text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <button className="bg-yellow-800 text-white py-3 px-8 rounded-lg w-full mt-4 hover:bg-yellow-700 focus:outline-none">
            Save Changes
          </button>
        </div>
      </div>

      {/* Password Change Card */}
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg p-8 mb-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Change Password
        </h3>
        <div className="space-y-6">
          {/* Current Password Field */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="password" className="text-gray-700">
              Current Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* New Password Field */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="newPassword" className="text-gray-700">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Confirm New Password Field */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="confirmPassword" className="text-gray-700">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <button
            onClick={handlePasswordChange}
            className="bg-yellow-800 text-white py-3 px-8 rounded-lg w-full mt-4 hover:bg-yellow-700 focus:outline-none"
          >
            Change Password
          </button>
        </div>
      </div>

      {/* Saved Addresses Card */}
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg p-8 mb-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Saved Addresses
        </h3>
        <div className="space-y-4">
          {/* Address 1 */}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg font-medium text-gray-800">Home</p>
              <p className="text-sm text-gray-500">
                Nirmal bhavan, Alappuzh, kerala
              </p>
            </div>
            <button className="text-yellow-800 hover:text-yellow-700">
              Edit
            </button>
          </div>

          {/* Address 2 */}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg font-medium text-gray-800">Office</p>
              <p className="text-sm text-gray-500">
                Cherumuka, Alappuzh, India
              </p>
            </div>
            <button className="text-yellow-800 hover:text-yellow-700">
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
