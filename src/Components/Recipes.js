import React, { useState, useEffect } from "react";  
import Navbar from "./Navbar";  
import RecipeBg2 from "../Assets/loginpage.jpg"; // Assuming you might use this somewhere  
import FormElementsSearchRoundedBaseBasic from "./SearchBar";  

const About = () => {  
  const [recipes, setRecipes] = useState([]);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);  

  useEffect(() => {  
    const fetchRecipes = async () => {  
      try {  
        const response = await fetch("http://localhost:5000/api/recipes/all-recipes");  
        if (!response.ok) {  
          throw new Error("Failed to fetch recipes");  
        }  
        const data = await response.json();  
        setRecipes(data);  
      } catch (error) {  
        console.error("Error fetching recipes:", error);  
        setError("Failed to load recipes. Please try again later.");  
      } finally {  
        setLoading(false);  
      }  
    };  

    fetchRecipes();  
  }, []);  

  return (  
    <div>  
      <Navbar />  
      <div className="search-bar-container flex justify-end mt-6 mb-4"> {/* Reduced margin-bottom */}  
        <FormElementsSearchRoundedBaseBasic className="search-input" />  
      </div>  

      <section className="recipes-section py-12 bg-gray-100 dark:bg-gray-800">  
        <div className="px-4 mx-auto">  
          <h2 className="text-3xl font-semibold text-center text-yellow-800 dark:text-white mb-8">  
            All Recipes  
          </h2>  

          {loading ? (  
            <div className="text-center">  
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>  
              <p className="text-gray-500">Loading recipes...</p>  
            </div>  
          ) : error ? (  
            <p className="text-center text-red-500">{error}</p>  
          ) : recipes.length === 0 ? (  
            <p className="text-center text-gray-500">No recipes available.</p>  
          ) : (  
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"> {/* Reduced gap */}  
              {recipes.map((recipe) => (  
                <div key={recipe._id} className="recipe-card bg-white dark:bg-gray-700 p-4 rounded-lg shadow-lg overflow-hidden"> {/* Adjusted padding */}  
                  <img  
                    src={`http://localhost:5000/${recipe.imagePath}`}  
                    alt={recipe.recipeName}  
                    className="w-full h-48 object-cover rounded-lg"  
                  />  
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-4">{recipe.recipeName}</h3>  
                  <p className="text-gray-600 dark:text-gray-300 mt-2 line-clamp-3">  
                    {recipe.description}  
                  </p>  
                </div>  
              ))}  
            </div>  
          )}  
        </div>  
      </section>  
    </div>  
  );  
};  

export default About;