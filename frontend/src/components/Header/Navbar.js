import { useState } from "react";
import { Link, Link as RouterLink } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import { HomeOutlined } from "@material-ui/icons";
import PropTypes from "prop-types";

import { AppBar, Box, Hidden, IconButton, Toolbar } from "@material-ui/core";
import InputIcon from "@material-ui/icons/Input";

import Logo from "./Logo";

const Navbar = ({ onMobileNavOpen, Logout, ...rest }) => {
  return (
    <AppBar elevation={0} {...rest}>
      <Toolbar>
        <IconButton color="inherit" size="large" component={Link} to="/">
          <HomeOutlined />
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />
        <Hidden xlDown>
          <IconButton color="inherit" size="large" onClick={Logout}>
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen} size="large">
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
