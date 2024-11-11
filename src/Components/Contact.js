import React, { useState } from "react";  
import Navbar from "./Navbar";  
import RecipeBg from "../Assets/recipe_bg.png";  
import { ToastContainer, toast } from "react-toastify";  
import "react-toastify/dist/ReactToastify.css";  

const Contact = () => {  
  const [question, setQuestion] = useState(""); // State variable for question  

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!question) {
    toast.error("Please enter a question!");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: question, // Send the question in the request body
      }),
    });

    if (response.ok) {
      toast.success("Question sent successfully!");
      setTimeout(() => {
        window.location.reload(); 
      }, 6000); 
    } else {
      toast.error("Failed to send question. Please try again.");
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error("An error occurred while sending the question.");
  }
};


  return (  
    <div>  
      <Navbar />  
      <div className="home-bannerImage-container">  
        <img src={RecipeBg} alt="Recipe Background" />  
      </div>  
      <div className="contact-page-wrapper">  
        <h1 className="primary-heading">Have a Question In Mind?</h1>  
        <h1 className="primary-heading">Let Us Help You</h1>  
        <div className="contact-form-container">  
          <input  
            type="text"  
            placeholder="Enter your question"  
            value={question}  
            onChange={(e) => setQuestion(e.target.value)}  
          />  
          <button className="secondary-button" onClick={handleSubmit}>  
            Submit  
          </button>  
        </div>  
      </div>  
      <ToastContainer position="top-right" />  
    </div>  
  );  
};  

export default Contact;
