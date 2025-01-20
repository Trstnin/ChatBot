import { TextField } from "@mui/material";
import React from "react";

function CustomizedInput(props) {
  return (
    <TextField
      InputLabelProps={{ style: { color: "white" } }}
      name={props.name}
      label={props.label}
      type={props.type}
      inputProps={{
        style: {
          color: "white",
          width: "500px",
          border: "none",
          borderRadius: 10,
          fontSize: 20,
          marginTop: "4px",
          height:'50px'
          
        },
      }}
    ></TextField>
  );
}

export default CustomizedInput;
