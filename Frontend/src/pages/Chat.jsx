import React, { useRef, useState } from "react";
import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import red from "@mui/material/colors/red";
import { useAuth } from "../context/Auth_context";
import ChatsItems from "../components/chats/ChatsItems";
import {IoMdSend} from'react-icons/io'
import { clearChats, sendMesssageRequest } from "../helpers/api-comunicator";
import toast from "react-hot-toast";


function Chat() {


  const inputRef = useRef(null) 
  const auth = useAuth();
  const[chatMessages, setChatMessage] = useState([])
  const handleSubmit = async ()=> {
    const content = inputRef.current?.value 
    if(inputRef && inputRef.current){
      inputRef.current.value = '';
    }
    const newMessage ={role:'user', content}
    setChatMessage((prev) => [...prev, newMessage])
    const chatData =await sendMesssageRequest(content)
    setChatMessage([...chatData.chats])
  }

  const handleClearChats = async () => {
    try {
      toast.loading("Deleting Chats", { id: "deletechats" });
      await clearChats();
      setChatMessage([]);
      toast.success("Deleted Chats Successfully", { id: "deletechats" });
    } catch (error) {
      console.log(error);
      toast.error("Deleting chats failed", { id: "deletechats" });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: {
            md: "flex",
            xs: "none",
            sm: "none",
            flex: 0.2,
            flexDirection: "column",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "60vh",
            bgcolor: "rgb(17 ,29 ,39)",
            borderRadius: 5,
            flexDirection: "column",
            mx: 3,
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: 700,
            }}
          >
            {auth?.user?.name[0]}{" "}
            {auth?.user?.name.split(" ")[1][0].toUpperCase()}
          </Avatar>
          <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
            Increase Your Prajna with Prajna-AI
          </Typography>

          <Typography sx={{ mx: "auto", fontFamily: "work sans", my: 3, p: 3 }}>
            You can ask some questions related to Knowledge, Business, Advices,
            Education, etc. But avoid sharing personal information
          </Typography>

          <Button
          onClick={handleClearChats}
            sx={{
              width: "200px",
              my: "auto",
              color: "white",
              fontWeight: "700",
              borderRadius: 3,
              mx: "auto",
              bgcolor: red[300],
              ":hover": {
                bgcolor: red.A400,
              },
            }}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: "column",
          px: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: "40px",
            color: "white",
            mb: 2,
            mx: "auto",
            fontWeight: "600",
          }}
        >
          PRAJNA - V1.O
        </Typography>

        <Box
          sx={{
            width: "100%",
            height: "60vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
        >{chatMessages.map((chat,index) => (<ChatsItems content={chat.content} role={chat.role} key={index}/>))}</Box>
        <div
          style={{
            width: "100%",
            borderRadius: 8,
            backgroundColor: "rgb(17,27,39)",
            display: "flex",
            margin: "auto",
          }}
     
         >
          {" "}
          <input
           ref={inputRef}
            type="text"
            style={{
              width: "100%",
              backgroundColor: "transparent",
              padding: "30px",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: "20px",
            }}
          />
          <IconButton onClick={handleSubmit} sx={{ color: "white", mx: 1 }}>
             <IoMdSend/>
          </IconButton>
        </div>
        
      </Box>
      
    </Box>
  );
}

export default Chat;
