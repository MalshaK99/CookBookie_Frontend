import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import chef from "../Assets/chef-uniform.png";

export default function ProfilePage() {
  const [userData, setUserData] = useState({
    fname: "",
    phone: "",
    email: "",
    currentPassword: "",
    newPassword: "",
  });

  const [profileImage, setProfileImage] = useState(chef);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get("http://localhost:5000/api/users/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUserData({
            fname: response.data.fname,
            phone: response.data.phone,
            email: response.data.email,
            currentPassword: "",
            newPassword: "",
          });
        } else {
          toast.error("Token not found. Please log in.");
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to fetch user details."
        );
      }
    };

    fetchUserDetails();
  }, []);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      // Optionally upload the file here
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleDetailsSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("No authorization token found. Please log in.");
      return;
    }

    const payload = {
      fname: userData.fname,
      phone: userData.phone,
      email: userData.email,
    };

    try {
      await axios.put("http://localhost:5000/api/users/update", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("User details updated successfully!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update user details."
      );
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("No authorization token found. Please log in.");
      return;
    }

    const payload = {
      currentPassword: userData.currentPassword,
      newPassword: userData.newPassword,
    };

    try {
      await axios.put("http://localhost:5000/api/users/update-password", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Password updated successfully!");
      setUserData((prevData) => ({ ...prevData, currentPassword: "", newPassword: "" }));
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update password."
      );
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      {/* Personal Details Form */}
      <form onSubmit={handleDetailsSubmit} className="border-b border-gray-300 pb-8">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg shadow-lg p-1">
              <div className="bg-white rounded-lg p-5 shadow-md">Personal Information</div>
            </div>
          </h1>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="flex items-center gap-x-6">
            <img
              className="object-cover w-16 h-16 rounded-full ring ring-yellow-600 cursor-pointer"
              src={profileImage}
              alt="Profile Avatar"
              onClick={handleImageClick}
            />
            <div>Change Profile Picture</div>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="fname" className="block text-sm font-medium text-gray-900">Full Name</label>
            <input
              id="fname"
              name="fname"
              type="text"
              value={userData.fname}
              onChange={handleInputChange}
              className="mt-2 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-yellow-600 placeholder:text-gray-400 focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-900">Phone Number</label>
            <input
              id="phone"
              name="phone"
              type="text"
              value={userData.phone}
              onChange={handleInputChange}
              className="mt-2 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-yellow-600 placeholder:text-gray-400 focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              value={userData.email}
              onChange={handleInputChange}
              className="mt-2 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-yellow-600 placeholder:text-gray-400 focus:ring-2 focus:ring-yellow-500"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button type="submit" className="rounded-md bg-yellow-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus:ring-2 focus:ring-yellow-500">
            Update Details
          </button>
        </div>
      </form>

      {/* Password Change Form */}
      <form onSubmit={handlePasswordSubmit} className="border-b border-gray-300 pb-8">
        <h2 className="text-lg font-semibold leading-7 text-gray-900">Password Change</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-900">Current Password</label>
            <input
              id="currentPassword"
              name="currentPassword"
              type="password"
              value={userData.currentPassword}
              onChange={handleInputChange}
              className="mt-2 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-yellow-600 placeholder:text-gray-400 focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-900">New Password</label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              value={userData.newPassword}
              onChange={handleInputChange}
              className="mt-2 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-yellow-600 placeholder:text-gray-400 focus:ring-2 focus:ring-yellow-500"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button type="submit" className="rounded-md bg-yellow-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus:ring-2 focus:ring-yellow-500">
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
}
