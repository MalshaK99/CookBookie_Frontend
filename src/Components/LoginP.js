import React, { useState, useContext } from "react";  
import { useNavigate } from 'react-router-dom';   
import { AuthContext } from '../context/AuthContext';   
import loginpage from '../Assets/loginpage.jpg';  
import Logo from '../Assets/Logo.png';  
import axios from 'axios';  
import { ToastContainer, toast } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css'; 
import Navbar from './Navbar' 

const LoginP = () => {
    const { login } = useContext(AuthContext); 
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    // Handle input field changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/login', formData);

            console.log(response); 
            if (response.status === 200) {
                const { token, user } = response.data;

                localStorage.setItem('token', token);
                localStorage.setItem('fname', user.fname);
                localStorage.setItem('phone', user.lname);
                localStorage.setItem('email', user.email);

                login();

                toast.success('Login Successful!');

                navigate('/');
            } else {
                toast.error("Unexpected response from server!");
            }
        } catch (error) {
            console.error(error);

            toast.error(error.response?.data?.message || "Login failed!");
        }
    };
       

    return (  <>
            <Navbar/><ToastContainer/>
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900"> 
            <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">  
                <div className="hidden bg-cover lg:block lg:w-1/2" style={{ backgroundImage: `url(${loginpage})` }}></div>  
                <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">  
                    <div className="flex justify-center mx-auto">  
                        <img className="w-18 h-18 sm:w-20 sm:h-20" src={Logo} alt="logo" />  
                    </div>  
                    <div className="flex items-center justify-between mt-4">  
                        <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>  
                        <a href="#" className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">WELCOME BACK!!!</a>  
                        <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>  
                    </div>  
                    <form onSubmit={handleSubmit}>  
                        <div className="mt-4">  
                            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="email">Email Address</label>  
                            <input  
                                id="email"  
                                value={formData.email}  
                                onChange={handleChange}  
                                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"  
                                type="email"  
                            />  
                        </div>  
                        <div className="mt-4">  
                            <div className="flex justify-between">  
                                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="password">Password</label>                              </div>  
                            <input  
                                id="password"  
                                value={formData.password}  
                                onChange={handleChange}  
                                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"  
                                type="password"  
                            />  
                        </div>  
                        <div className="mt-6">  
                            <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">  
                                Login  
                            </button>  
                        </div>  
                    </form>  
                    <div className="flex items-center justify-between mt-4">  
                        <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>  
                        <a href="/signup" className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline">or sign up</a>  
                        <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>  
                    </div>  
                </div>  
            </div>            
            <ToastContainer   
                position="top-right"   
                autoClose={5000}   
                hideProgressBar={false}   
                newestOnTop={false}   
                closeOnClick   
                rtl={false}   
                pauseOnFocusLoss   
                draggable   
                pauseOnHover   
            />  
        </div>  </>
    );  
};  

export default LoginP;