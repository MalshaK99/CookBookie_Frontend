import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";

const History = () => {
  const [recipes, setRecipes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [formData, setFormData] = useState({
    recipeName: "",
    description: "",
    image: null,
  });

  // Fetch the recipes on mount
  useEffect(() => {
    const fetchUserRecipes = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No token found. Please log in.");
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/recipes/my-recipes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data) {
          setRecipes(response.data);
        }
      } catch (error) {
        console.error("Error fetching user recipes:", error);
        toast.error("Error fetching recipes. Please try again.");
      }
    };

    fetchUserRecipes();
  }, []); // Empty dependency array to run only once

  // Open modal for updating a recipe
  const openUpdateModal = (recipe) => {
    setCurrentRecipe(recipe);
    setFormData({
      recipeName: recipe.recipeName,
      description: recipe.description,
      image: null, // Reset the image when opening the modal
    });
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentRecipe(null);
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  // Handle recipe update
  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("No token found. Please log in.");
      return;
    }

    try {
      const form = new FormData();
      form.append("recipeName", formData.recipeName);
      form.append("description", formData.description);
      if (formData.image) {
        form.append("image", formData.image); // Append the image file if it's selected
      }

      const response = await axios.put(
        `http://localhost:5000/api/recipes/update/${currentRecipe._id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      

      if (response.data) {
        toast.success("Recipe updated successfully");
        setRecipes((prevRecipes) =>
          prevRecipes.map((recipe) =>
            recipe._id === currentRecipe._id ? response.data.recipe : recipe
          )
        );
        closeModal();
      }
    } catch (error) {
      console.error("Error updating recipe:", error);
      toast.error("Error updating recipe");
    }
  };

  // Handle recipe deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/recipes/recipe/${id}`);
      setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe._id !== id));
      toast.success("Successfully deleted the recipe");
    } catch (error) {
      console.error("Error deleting recipe:", error);
      toast.error("Error deleting recipe");
    }
  };

  // Show a confirmation before deleting
  const showDeleteConfirmation = (id) => {
    confirmAlert({
      title: "Confirm to Delete",
      message: "Are you sure you want to delete this recipe?",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleDelete(id),
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <section className="dark:bg-gray-900">
      <ToastContainer />
      <div className="container px-6 py-10 mx-auto">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg shadow-lg p-1">
              <div className="bg-white rounded-lg p-5 shadow-md">Your Recipes</div>
            </div>
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2 xl:grid-cols-3">
          {recipes.map((recipe) => (
            <div key={recipe._id}>
              <div className="relative">
                <img
                  className="object-cover object-center w-full h-64 rounded-lg lg:h-80"
                  src={`http://localhost:5000/${recipe.imagePath}`}
                  alt={recipe.recipeName}
                />
              </div>
              <p className="text-sm text-gray-800 dark:text-gray-600">{recipe.recipeName}</p>
              <hr className="w-32 my-6 text-blue-500" />
              <p className="text-sm text-gray-500 dark:text-gray-400">{recipe.description}</p>

              <div className="mt-4 flex space-x-4">
                <button
                  onClick={() => openUpdateModal(recipe)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Update
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => showDeleteConfirmation(recipe._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50">
            <div className="relative px-4 pt-5 pb-4 bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:w-full sm:max-w-md sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white">
                Update Recipe
              </h3>
              <form className="mt-4" onSubmit={handleUpdate}>
                <label className="text-sm text-yellow-700 dark:text-gray-200" htmlFor="recipe-name">
                  Recipe Name
                </label>
                <input
                  type="text"
                  id="recipe-name"
                  name="recipeName"
                  value={formData.recipeName}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-3 mt-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-md dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300"
                />

                <label className="text-sm text-yellow-700 dark:text-gray-200" htmlFor="recipe-image">
                  Image
                </label>
                <input
                  type="file"
                  id="recipe-image"
                  name="image"
                  onChange={handleFileChange}
                  className="block w-full px-4 py-3 mt-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-md dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300"
                />

                <label className="text-sm text-yellow-700 dark:text-gray-200" htmlFor="recipe-description">
                  Description
                </label>
                <input
                  type="text"
                  id="recipe-description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-3 mt-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-md dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300"
                />

                <div className="mt-4 flex space-x-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="w-full px-4 py-2 text-sm font-medium text-gray-700 capitalize transition-colors duration-300 transform border rounded-md dark:text-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full px-4 py-2 text-sm font-medium text-white capitalize bg-yellow-600 rounded-md hover:bg-yellow-500 focus:outline-none"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default History;
