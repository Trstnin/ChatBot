import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <div
      style={{
        display: "flex",
        marginRight: "auto",
        alignItems: "center",
        gap: "15px",
      }}
    >
      <Link to={"/"}>
        <img
          src="prajna.png"
          alt="sorad-ai"
          className="image-inverted"
          height={"80px"}
          width={"80px"}
        />

      </Link>
        <Typography
          sx={{
            display: { md: "block", sm: "none", xm: "none" },
            mr: "auto",
            fontWeight: "800",
            textShadow: "2px 2px 20px #000",
          }}
        ><span style={{fontSize:'20px'}}>Prajna</span>-AI</Typography>
    </div>
  );
}

export default Logo;
