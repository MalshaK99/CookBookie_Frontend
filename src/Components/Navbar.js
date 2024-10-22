/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import Logo from "../Assets/Logo.png";
import { BsCart2 } from "react-icons/bs";
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";

// Import AuthContext and toast
import { AuthContext } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext); // Get auth state and logout function
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate(); // Used to redirect after logout

  const handleLogout = () => {
    logout(); // Call logout from AuthContext
    toast.success("Logout successful!"); // Display toast message
    navigate('/'); // Redirect to home page after logout
  };

  const menuOptions = [
    {
      text: "Home",
      icon: <HomeIcon />,
    },
    {
      text: "About",
      icon: <InfoIcon />,
    },
    {
      text: "Testimonials",
      icon: <CommentRoundedIcon />,
    },
    {
      text: "Contact",
      icon: <PhoneRoundedIcon />,
    },
  ];

  return (
    <nav>
      <div className="nav-logo-container">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="navbar-links-container">
        <a href="/">Home</a>
        <a href="/recipes">Recipes</a>
        <a href="/profile">Profile</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        {/* <a href="">
          <BsCart2 className="navbar-cart-icon" />
        </a> */}
        {isAuthenticated ? (
          <button className="primary-button" onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/login">
            <button className="primary-button">Login</button>
          </Link>
        )}
      </div>
      <div className="navbar-menu-container">
        <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
      </div>
      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <List>
            {menuOptions.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
      {/* Add ToastContainer to display toast messages */}
      <ToastContainer />
    </nav>
  );
};

export default Navbar;
