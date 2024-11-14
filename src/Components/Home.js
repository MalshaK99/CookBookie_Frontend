import React from "react";  
import BannerBackground from "../Assets/home-banner-background.png";  
import BannerImage from "../Assets/home-banner-image.png";  
import Navbar from "./Navbar";  
import Reviews from "./Reviews";  
import { FiArrowRight } from "react-icons/fi";  
import { Link } from 'react-router-dom';  
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {  
  return (  
    <div className="home-container">  
      <Navbar />  
      <div className="home-banner-container">  
        <div className="home-bannerImage-container">  
          <img src={BannerBackground} alt="Banner Background" />  
          <div className="overlay"></div> {/* Added overlay here */}  
        </div>  
        <div className="home-text-section">  
          <h1 className="primary-heading">  
           Bring joy to your kitchen !!  
          </h1>  
          <p className="primary-text">  
            Welcome to a place where every recipe tells a story, and every meal brings us closer.  
            Let’s cook, share, and savor the joy of food together!  
          </p>  
          <Link to='/publish'>  
            <button className="secondary-button">  
              Share Now <FiArrowRight />{" "}  
            </button>  
          </Link>  
        </div>  
        <div className="home-image-section">  
          <img src={BannerImage} alt="Banner Image" />  
        </div>  
      </div>  
      <Reviews />  
    </div>  
  );  
};  

export default Home;