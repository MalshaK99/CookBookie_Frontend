import { Link, useNavigate } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import Logo from "../Assets/Logo.png";
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

import { AuthContext } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const { logout } = useContext(AuthContext); 
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const [openMenu, setOpenMenu] = useState(false); // Corrected to setOpenMenu
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); 
  }, []);

  const handleLogout = () => {
    logout(); 
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("fname");
    localStorage.removeItem("phone"); 
    setIsAuthenticated(false); 
    toast.success("Logout successful!");
    navigate('/'); 
  };

  // Corrected the toggleDrawer function to use setOpenMenu
  const toggleDrawer = (open) => () => setOpenMenu(open);

  const menuOptions = [
    { text: "Home", icon: <HomeIcon />, link: "/" },
    {text: "Recipes",icon: <HomeIcon/>,link: "/recipes"},
    { text: "About", icon: <InfoIcon />, link: "/about" },
    { text: "Profile", icon: <CommentRoundedIcon />, link: "/profile" },
    { text: "Contact", icon: <PhoneRoundedIcon />, link: "/contact" },
  ];

  return (
    <nav>
      <div className="nav-logo-container">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="navbar-links-container">
        {menuOptions.map((item) => (
          <Link to={item.link} key={item.text}>{item.text}</Link>
        ))}
        {isAuthenticated ? (
          <button className="primary-button" onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/login">
            <button className="primary-button">Login</button>
          </Link>
        )}
      </div>
      <div className="navbar-menu-container">
        <HiOutlineBars3 onClick={toggleDrawer(true)} />
      </div>
      <Drawer open={openMenu} onClose={toggleDrawer(false)} anchor="right">
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
          <List>
            {menuOptions.map((item) => (
              <ListItem key={item.text} disablePadding>
                <Link to={item.link} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <ListItemButton>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
      <ToastContainer />
    </nav>
  );
};

export default Navbar;
