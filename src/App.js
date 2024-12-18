import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import About from "./Components/About";
import Recipes from "./Components/Recipes";
import Reviews from "./Components/Reviews";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import LoginP from "./Components/LoginP";
import SignUp from "./Components/Signup";
 import ProfilePage from "./Pages/ProfilePage";
 import PublishPage from "./Pages/PubishPage";
 import HistoryPage from "./Pages/HistoryPage";
 import Review_ratings from './Components/ReviewRatings'
 import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <Router>
      <div className="App">
<ToastContainer/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reviews" element={<Reviews/>} />
          <Route path="/login" element={<LoginP/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/profile" element={<ProfilePage />} /> 
          <Route path="/publish" element={<PublishPage/>}/>
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/review_rating" element={<Review_ratings/>}/>

        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

