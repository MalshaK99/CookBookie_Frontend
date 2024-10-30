import React, { useState, useEffect } from "react";
import axios from "axios"; 
import { toast } from "react-toastify";

export default function ProfilePage() {
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        currentPassword: '',
        newPassword: ''
    });

    // Fetch user details when the component mounts
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = localStorage.getItem('token'); // Retrieve token from localStorage

                if (token) {
                    const response = await axios.get('http://localhost:5000/api/users/me', {
                        headers: {
                            'Authorization': `Bearer ${token}`  // Send token in Authorization header
                        }
                    });

                    // Map API response to state
                    setUserData({
                        firstName: response.data.fname,  // Adjust key names based on the API response
                        lastName: response.data.lname,
                        email: response.data.email,
                        currentPassword: '',  // These should be reset
                        newPassword: ''
                    });
                } else {
                    toast.error("Token not found. Please log in.");
                }
            } catch (error) {
                toast.error(error.response?.data?.message || "Failed to fetch user details.");
            }
        };

        fetchUserDetails();
    }, []);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    // Submit the form to update user details
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); // Retrieve the token

        if (!token) {
            toast.error("No authorization token found. Please log in.");
            return;
        }

        try {
            await axios.put('http://localhost:5000/api/users/update', userData, {
                headers: {
                    Authorization: `Bearer ${token}`  // Include token in update request
                }
            });
            toast.success("User details updated successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update user details.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                            First name
                        </label>
                        <div className="mt-2">
                            <input
                                id="first-name"
                                name="firstName"
                                type="text"
                                value={userData.firstName}
                                onChange={handleInputChange}
                                className="block w-full rounded-md border-0 py-1.5 text-yellow-900 shadow-sm ring-1 ring-inset ring-yellow-300 placeholder:text-yellow-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                            Last name
                        </label>
                        <div className="mt-2">
                            <input
                                id="last-name"
                                name="lastName"
                                type="text"
                                value={userData.lastName}
                                onChange={handleInputChange}
                                className="block w-full rounded-md border-0 py-1.5 text-yellow-900 shadow-sm ring-1 ring-inset ring-yellow-300 placeholder:text-yellow-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-4">
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={userData.email}
                                onChange={handleInputChange}
                                className="block w-full rounded-md border-0 py-1.5 text-yellow-900 shadow-sm ring-1 ring-inset ring-yellow-300 placeholder:text-yellow-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">Password Change</h2>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <label htmlFor="cpw" className="block text-sm font-medium leading-6 text-gray-900">
                            Current Password
                        </label>
                        <div className="mt-2">
                            <input
                                id="cpw"
                                name="currentPassword"
                                type="password"
                                value={userData.currentPassword}
                                onChange={handleInputChange}
                                className="block w-full rounded-md border-0 py-1.5 text-yellow-900 shadow-sm ring-1 ring-inset ring-yellow-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="npw" className="block text-sm font-medium leading-6 text-gray-900">
                            New Password
                        </label>
                        <div className="mt-2">
                            <input
                                id="npw"
                                name="newPassword"
                                type="password"
                                value={userData.newPassword}
                                onChange={handleInputChange}
                                className="block w-full rounded-md border-0 py-1.5 text-yellow-900 shadow-sm ring-1 ring-inset ring-yellow-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-yellow-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
                    >
                        Update
                    </button>
                </div>
            </div>
        </form>
    );
}
