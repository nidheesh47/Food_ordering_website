import React, { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { axiosInstance } from "../../config/axioInstance";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    profilePic: "",
  });

  const [loading, setLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // State for password visibility
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Fetch user profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get("/user/profile");
        setUser(response.data.data); // Access the `data` field in the response
      } catch (error) {
        toast.error("Failed to load profile.");
        console.error("Profile fetch error:", error);
      }
    };
    fetchProfile();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Handle profile update
  const handleProfileUpdate = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("email", user.email);
      formData.append("mobile", user.mobile);
      if (user.profilePic instanceof File) {
        formData.append("profilePic", user.profilePic);
      }

      const response = await axiosInstance.put(
        "/user/profile/update",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Profile updated successfully!");

      // Force a re-fetch of the profile data
      const updatedProfile = await axiosInstance.get("/user/profile");
      setUser(updatedProfile.data.data); // Update the state with the latest data
    } catch (error) {
      toast.error("Failed to update profile.");
      console.error("Update error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle password update
  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    try {
      setLoading(true);
      await axiosInstance.put("/user/update-password", {
        currentPassword,
        newPassword,
        confirmNewPassword: confirmPassword,
      });
      toast.success("Password updated successfully!");
      setNewPassword("");
      setConfirmPassword("");
      setCurrentPassword("");
    } catch (error) {
      toast.error("Failed to update password.");
      console.error("Password update error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <Toaster />
      {/* Profile Section */}
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-xl p-8 mb-10 flex flex-col items-center text-center">
        <img
          src={
            user.profilePic instanceof File
              ? URL.createObjectURL(user.profilePic)
              : user.profilePic || "https://via.placeholder.com/120"
          }
          alt="Profile"
          className="rounded-full border-4 border-yellow-600 mb-6 w-32 h-32 object-cover"
        />
        <h2 className="text-3xl font-semibold text-gray-800">{user.name}</h2>
        <p className="text-sm text-gray-500 mb-4">{user.email}</p>
      </div>

      {/* Profile Settings */}
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg p-8 mb-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Profile Settings
        </h3>
        <div className="space-y-6">
          <div>
            <label className="text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="p-3 border rounded-lg w-full"
            />
          </div>

          <div>
            <label className="text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="p-3 border rounded-lg w-full"
            />
          </div>

          <div>
            <label className="text-gray-700">Mobile Number</label>
            <input
              type="text"
              name="mobile"
              value={user.mobile}
              onChange={handleChange}
              className="p-3 border rounded-lg w-full"
            />
          </div>

          <div>
            <label className="text-gray-700">Profile Picture</label>
            <input
              type="file"
              onChange={(e) =>
                setUser({ ...user, profilePic: e.target.files[0] })
              }
              className="p-3 border rounded-lg w-full"
            />
          </div>

          <button
            onClick={handleProfileUpdate}
            disabled={loading}
            className="bg-yellow-800 text-white py-3 px-8 rounded-lg w-full mt-4"
          >
            {loading ? "Updating..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Password Change */}
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg p-8 mb-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Change Password
        </h3>
        <div className="space-y-6">
          {/* Current Password */}
          <div>
            <label className="text-gray-700">Current Password</label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="p-3 border rounded-lg w-full"
              />
              <button
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="text-gray-700">New Password</label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="p-3 border rounded-lg w-full"
              />
              <button
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-gray-700">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="p-3 border rounded-lg w-full"
              />
              <button
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            onClick={handlePasswordChange}
            disabled={loading}
            className="bg-yellow-800 text-white py-3 px-8 rounded-lg w-full mt-4"
          >
            {loading ? "Updating..." : "Change Password"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
