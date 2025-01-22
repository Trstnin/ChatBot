import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { useAuth } from "../../context/Auth_context";

function ChatsItems({ content, role }) {
    const auth = useAuth()
  return role === "assistant" ? (
    <Box
      sx={{ display: "flex", p: 2, bgcolor: "#004d5612", my: 2, gap: 2 }}
    >
        <Avatar sx={{ml:0}}>
            <img src="openai.png" alt="prajna" width={"30px"}/>
        </Avatar>
        <Box><Typography fontSize={"20px"}>{content}</Typography></Box>
    </Box>
  ) : (
    <Box
    sx={{ display: "flex", p: 2, bgcolor: "#004d56", my: 2, gap: 2 }}
  >
      <Avatar sx={{ml:0}}>
      {auth?.user?.name[0]}{" "}
      {auth?.user?.name.split(" ")[1][0].toUpperCase()}
      </Avatar>
      <Box><Typography fontSize={"20px"}>{content}</Typography></Box>
      
  </Box>
  );
}

export default ChatsItems;
