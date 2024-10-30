import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar'
export const ReviewRatings = () => {
 const [currentPage, setCurrentPage] = useState(0);
 const [userRating, setUserRating] = useState(0);
 const [name, setName] = useState('');
 const [reviewText, setReviewText] = useState('');
 const [reviews, setReviews] = useState([]);
 const location = useLocation();
 useEffect(() => {
 const fetchReviews = async () => {
try {
 const response = await axios.get('http://localhost:5000/api/reviews/review');
setReviews(response.data);
} catch (error) {
 console.error('Error fetching reviews:', error);
 }
 };

 fetchReviews();
 }, []);

const handleRatingSelect = (rating) => setUserRating(rating);
 const handleNameChange = (e) => setName(e.target.value);
 const handleReviewTextChange = (e) => setReviewText(e.target.value);

 const handleSubmit = async (e) => {
 e.preventDefault();
 const Review_ratings = { review: reviewText, name, rating: userRating };

 try {
 await axios.post('http://localhost:5000/api/reviews/review', Review_ratings);
 toast.success('Review submitted successfully!');
 setName(''); setReviewText(''); setUserRating(0);
 const response = await axios.get('http://localhost:5000/api/reviews/review');
 setReviews(response.data);
 } catch (error) {
  console.error('Error submitting review:', error);
 toast.error('Failed to submit review');
 }
 };

 const reviewsPerPage = 2;
 const totalPages = Math.ceil(reviews.length / reviewsPerPage);
 const startIndex = currentPage * reviewsPerPage;
 const visibleReviews = reviews.slice(startIndex, startIndex + reviewsPerPage);

 return (
 <div>
 <ToastContainer />

 <div className="my-10">
 <div className="my-10 p-6 max-w-6xl mx-auto">
    <div className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg shadow-lg p-1">
        <div className="bg-white rounded-lg p-5 shadow-md">
            <Navbar />
        </div>
    </div>
</div>

 <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">
 Share Your Thoughts: Submit your <span className="text-yellow-500">Review and Ratings</span>
 </h1>
 <section className="max-w-4xl p-6 mx-auto mt-6 bg-gray-100 rounded-lg shadow-md dark:bg-gray-800">
 <form onSubmit={handleSubmit}>
 <div className="grid grid-cols-1 gap-6">
 <div>
 <label className="text-gray-700 dark:text-gray-200" htmlFor="name">Your Name</label>
 <input
 id="name"
 name="name"
 type="text"
 value={name}
 onChange={handleNameChange}
 className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 focus:border-yellow-400 focus:ring-yellow-300 focus:ring-opacity-40"
 required
 />
 </div>

 <div>
 <label className="text-gray-700 dark:text-gray-200" htmlFor="review">Your Review</label>
 <textarea
 id="review"
 name="review"
 rows="4"
 value={reviewText}
 onChange={handleReviewTextChange}
 className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 focus:border-yellow-400 focus:ring-blue-300 focus:ring-opacity-40"
 required
 ></textarea>
 </div>

 <div>
 <label className="text-gray-700 dark:text-gray-200">Your Rating</label>
 <div className="flex items-center mt-2">
 {[1, 2, 3, 4, 5].map((star) => (
 <svg
 key={star}
 className={`w-6 h-6 cursor-pointer ${star <= userRating ? 'text-yellow-400' : 'text-gray-300'}`}
 viewBox="0 0 20 20"
 fill="currentColor"
 onClick={() => handleRatingSelect(star)}
 >
 <path fillRule="evenodd" d="M10 1l2.5 6.5H18l-5 4.25 1.5 6L10 13.5 5.5 17l1.5-6-5-4.25h5.5L10 1z" clipRule="evenodd" />
 </svg>
 ))}
 </div>
 </div>
 </div>

 <div className="flex justify-end mt-6">
 <button type="submit" className="px-8 py-2.5 text-white bg-yellow-500 rounded-md hover:bg-yellow-600">Submit</button>
 </div>
 </form>
 </section>
 </div>

 <section className="bg-gray-50 dark:bg-gray-900 mt-20 pt-10 pb-20">
 <div className="container px-6 py-10 mx-auto">
 <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">
 What our <span className="text-yellow-500">clients</span> say
 </h1>
 <p className="max-w-2xl mx-auto mt-6 text-center text-gray-500 dark:text-gray-300">
 "Whispers of Trust: Discover the Stories Behind Experiences."
 </p>

 <div className="grid grid-cols-1 gap-8 mx-auto mt-8 lg:grid-cols-2 xl:mt-10 max-w-7xl">
 {visibleReviews.map((review, index) => (
 <div key={index} className="p-6 bg-white shadow-md rounded-lg dark:bg-gray-800">
 <p className="leading-loose text-gray-500 dark:text-gray-300">{review.review}</p>
 <div className="flex items-center mt-6">
 <div className="mx-4">
 <h1 className="font-semibold text-yellow-500">{review.name}</h1>
 <div className="flex items-center mt-2">
 <span className="text-sm text-gray-500 dark:text-gray-300 mr-1">Rating:</span>
 {Array.from({ length: review.rating }, (_, i) => (
 <svg key={i} className="w-5 h-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
 <path fillRule="evenodd" d="M10 1l2.5 6.5H18l-5 4.25 1.5 6L10 13.5 5.5 17l1.5-6-5-4.25h5.5L10 1z" clipRule="evenodd" />
 </svg>
 ))}
 </div>
 </div>
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>
 </div>
 );
};

export default ReviewRatings;
