import React, { useEffect, useState } from "react";
import ProfilePic from "../Assets/chef-uniform.png";
import { AiFillStar } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import "./Testimonial.css"; // Create this CSS file for styling

const Testimonial = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/reviews/review"
        );
        if (response.data) {
          setReviews(response.data);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
        toast.error("Error fetching reviews");
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className="testimonial-section">
      <ToastContainer />
      <div className="testimonial-header">
        <p className="subheading">REVIEWS</p>
        <h1 className="heading">What They Are Saying</h1>
        <p className="description">
          Discover what our community of food lovers has to say!!! From
          tried-and-true family favorites to exciting new culinary creations,
          our users share their experiences, tips, and delicious results.
        </p>
      </div>
      <Swiper
        modules={[Pagination]}
        spaceBetween={30}
        pagination={{ clickable: true }}
        className="testimonial-swiper"
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="testimonial-card">
              <img src={ProfilePic} alt={review.name} className="profile-pic" />
              <p className="review-text">"{review.review}"</p>
              <div className="stars-container">
                {[...Array(review.rating)].map((_, i) => (
                  <AiFillStar key={i} />
                ))}
              </div>
              <h2 className="reviewer-name">{review.name}</h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonial;
