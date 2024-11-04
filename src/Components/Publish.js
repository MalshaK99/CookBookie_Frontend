import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Publish = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // Append form fields to FormData
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("description", formData.description);

    // Append the image file
    if (file) {
      data.append("image", file); 
    }

    try {
      // Get token from local storage
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No authentication token found");
        return;
      }

      await axios.post("http://localhost:5000/api/recipes/recipe", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Recipe successfully uploaded!");

      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        description: "",
      });
      setFile(null); // Reset file input
      document.getElementById("image").value = ""; // Clear file input in DOM
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error uploading recipe");
      }
      console.error("There was an error uploading the recipe!", error);
    }
  };

  return (
    <div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
          <div className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg shadow-lg p-1">
            <div className="bg-white rounded-lg p-5 shadow-md">
              Upload Recipe{" "}
            </div>{" "}
          </div>{" "}
        </h1>
      </div>
      <ToastContainer />
      <div className="bg-white rounded-xl shadow p-7 m-4 sm:p-7 dark:bg-neutral-900 ">
        <form onSubmit={handleSubmit}>
          <div className="grid sm:grid-cols-12 gap-2 sm:gap-4 py-8 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-neutral-700 dark:first:border-transparent">
            <div className="sm:col-span-12"></div>
            <div className="sm:col-span-3">
              <label
                htmlFor="name"
                className="inline-block text-sm font-medium text-gray-500 mt-2.5 dark:text-neutral-500"
              >
                Full name
              </label>
            </div>
            <div className="sm:col-span-9">
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="py-2 px-3 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                required
              />
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="email"
                className="inline-block text-sm font-medium text-gray-500 mt-2.5 dark:text-neutral-500"
              >
                Email
              </label>
            </div>
            <div className="sm:col-span-9">
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="py-2 px-3 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                required
              />
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="phone"
                className="inline-block text-sm font-medium text-gray-500 mt-2.5 dark:text-neutral-500"
              >
                Phone
              </label>
            </div>
            <div className="sm:col-span-9">
              <input
                id="phone"
                name="phone"
                type="text"
                value={formData.phone}
                onChange={handleChange}
                className="py-2 px-3 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                required
              />
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="image"
                className="inline-block text-sm font-medium text-gray-500 mt-2.5 dark:text-neutral-500"
              >
                Attach your recipe
              </label>
            </div>
            <div className="sm:col-span-9">
              <input
                type="file"
                name="image" 
                id="image"
                onChange={handleFileChange}
                className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 file:bg-gray-50 file:border-0 file:bg-gray-100 file:py-2 file:px-4 dark:file:bg-neutral-700 dark:file:text-neutral-400"
                required
              />
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="description"
                className="inline-block text-sm font-medium text-gray-500 mt-2.5 dark:text-neutral-500"
              >
                Description
              </label>
            </div>
            <div className="sm:col-span-9">
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="py-2 px-3 block w-full border-gray-200 rounded-lg text-sm focus:border-yellow-500 focus:ring-yellow-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                rows="6"
                placeholder="Add anything else you want to share."
                required
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-yellow-600 text-white hover:bg-yellow-700 disabled:opacity-50 disabled:pointer-events-none"
          >
            Submit Advertisement
          </button>
        </form>
      </div>
    </div>
  );
};

export default Publish;
