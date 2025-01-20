import { AppBar, Toolbar } from "@mui/material";
import React from "react";
import Logo from "./shared/Logo";
import NavigationLink from "./shared/NavigationLink";
import { useAuth } from "../context/Auth_context";

function Headers() {
  const auth = useAuth();
  return (
    <AppBar
      sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}
    >
      <Toolbar sx={{ display: "flex" }}>
        <Logo />
        <div>
          {auth?.isLoggedIn ? (
            <>
              <NavigationLink
                bg="#00fffc"
                to="/chat"
                text="Go To Chat"
                textcolor="Black"
              />
              <NavigationLink
                bg="#51538f"
                textcolor="white"
                to="/"
                text="Logout"
                onClick={auth.logout}
              />
            </>
          ) : (
            <>
              <NavigationLink
                bg="#00fffc"
                to="/login"
                text="Login"
                textcolor="Black"
              />
              <NavigationLink
                bg="#51538f"
                textcolor="white"
                to="/signup"
                text="Sign Up"
              />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Headers;
