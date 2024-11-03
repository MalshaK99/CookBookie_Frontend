import React, { useState, useEffect } from "react";
import axios from "axios"; 
import { toast } from "react-toastify";

export default function ProfilePage() {
    const [userData, setUserData] = useState({
        fname: '',
        lname: '',
        email: '',
        currentPassword: '',
        newPassword: ''
    });

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = localStorage.getItem('token'); 

                if (token) {
                    const response = await axios.get('http://localhost:5000/api/users/me', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    setUserData({
                        fname: response.data.fname,
                        lname: response.data.lname,
                        email: response.data.email,
                        currentPassword: '',
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        console.log(token)

        if (!token) {
            toast.error("No authorization token found. Please log in.");
            return;
        }
        const payload = {
            fname: userData.fname,
            lname: userData.lname,
            email: userData.email,
        };
        if (userData.currentPassword) {
            payload.currentPassword = userData.currentPassword;
        }
        if (userData.newPassword) {
            payload.newPassword = userData.newPassword;
        }
        try {
            const response = await axios.put('http://localhost:5000/api/users/update', userData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("Response data:", response.data); // Check response data
            toast.success("User details updated successfully!");
        } catch (error) {
            console.error("Error:", error.response?.data);
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
                                id="fname"
                                name="fname"
                                type="text"
                                value={userData.fname}
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
                                id="lname"
                                name="lname"
                                type="text"
                                value={userData.lname}
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
