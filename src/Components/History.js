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

  useEffect(() => {
    const fetchUserRecipes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/recipes/my-recipes",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching user recipes:", error);
      }
    };
    fetchUserRecipes();
  }, []);

  const openUpdateModal = (recipe) => {
    setCurrentRecipe(recipe);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentRecipe(null);
  };
  useEffect(() => {
    const fetchUserRecipes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/recipes/my-recipes",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching user recipes:", error);
      }
    };
    fetchUserRecipes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/recipes/recipe/${id}`);
      setRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe._id !== id)
      );
      toast.success("Successfully deleted the recipe");
    } catch (error) {
      console.error("Error deleting recipe:", error);
      toast.error("Error deleting recipe");
    }
  };

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
          onClick: () => {},
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
              <div className="bg-white rounded-lg p-5 shadow-md">
                Your Recipes
              </div>{" "}
            </div>{" "}
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2 xl:grid-cols-3">
          {recipes.map((recipe) => (
            <div key={recipe._id}>
              <div className="relative">
                <img
                  className="object-cover object-center w-full h-64 rounded-lg lg:h-80"
                  src={`http://localhost:5000/${recipe.imagePath}`}
                  alt={recipe.name}
                />
                <div className="absolute bottom-0 flex p-3 bg-white dark:bg-gray-900">
                  <div className="mx-4">
                    <h1 className="text-sm text-gray-700 dark:text-gray-200">
                      {recipe.name}
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {recipe.email}
                    </p>
                  </div>
                </div>
              </div>
              <hr className="w-32 my-6 text-blue-500" />

              <p className="text-sm text-gray-500 dark:text-gray-400">
                {recipe.description}
              </p>

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
              <form className="mt-4">
                <label
                  className="text-sm text-yellow-700 dark:text-gray-200"
                  htmlFor="recipe-name"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="recipe-name"
                  defaultValue={currentRecipe?.name}
                  className="block w-full px-4 py-3 mt-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-md dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300"
                />
                <label
                  className="text-sm text-yellow-700 dark:text-gray-200"
                  htmlFor="recipe-name"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="recipe-email"
                  defaultValue={currentRecipe?.email}
                  className="block w-full px-4 py-3 mt-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-md dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300"
                />
                <label
                  className="text-sm text-yellow-700 dark:text-gray-200"
                  htmlFor="recipe-name"
                >
                  Image
                </label>
                <input
                  type="file"
                  id="recipe-image"
                  defaultValue={currentRecipe?.imagepath}
                  className="block w-full px-4 py-3 mt-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-md dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300"
                />
                <label
                  className="text-sm text-yellow-700 dark:text-gray-200"
                  htmlFor="recipe-name"
                >
                  Description
                </label>
                <input
                  type="text"
                  id="recipe-description"
                  defaultValue={currentRecipe?.description}
                  className="block w-full px-4 py-3 mt-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-md dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300"
                />
                {/* Additional fields can go here */}

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
                    className="w-full px-4 py-2  text-sm font-medium text-white capitalize bg-yellow-600 rounded-md hover:bg-yellow-500 focus:outline-none"
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
