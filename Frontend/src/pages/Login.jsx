import{useEffect }from "react";
import { Box, Typography, Button } from "@mui/material";
import { RiLoginBoxLine } from "react-icons/ri";
import CustomizedInput from "../components/shared/CustomizedInput";
import { useAuth } from "../context/Auth_context";
import {toast} from "react-hot-toast";
import { useNavigate } from "react-router-dom";


function Login() {
  const navigate = useNavigate();
const auth = useAuth()

  
  const handleSubmit = async (e) => {
    e.preventDefault()   
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')
    if (!email || !password) {
      return toast.error('Please fill all fields');
    }
    try {
      toast.loading('Signing In', {id: "login"})
     await auth?.login(email , password)
      
       toast.success('Signed In Successfully', {id:'login'})
    } catch (error) {
      console.log('fail signing in')
      toast.error('Fail Signing In', {id:'login'})
      
    }

  }
  useEffect(() => {
    if (auth?.user) {
      return navigate("/chat");
    }
  }, [auth]);
  return (
     

    <Box height={"100%"} width={"100%"} display={"flex"} flex={1}>
      <Box padding={8} mt={8} display={{ md: "flex", sm: "none", xs: "none" }}>
        <img
          src="airobot.png"
          alt="Robot"
          style={{ width: "400px", height: "500px" }}
        />
      </Box>
      <Box
        display={"flex"}
        flex={{ md: 0.5, xs: 1 }}
        justifyContent={"center"}
        alignItems={"center"}
        padding={2}
        ml={"auto"}
        mt={16}
      >
        <form
         onSubmit={(handleSubmit)}

          style={{
            margin: "80px",
            padding: "30px",
            boxShadow: "10px 10px  blue",
            borderRadius: "10px",
            border: "none",

          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h4"
              textAlign={"center"}
              padding={2}
              fontWeight={600}
            >
              Login
            </Typography>

            <CustomizedInput type="email" label="Email" name="email" />
            <CustomizedInput type="password" label="Password" name="password" />
            <Button
              type="submit"
              sx={{
                px: 2,
                py: 1,
                mt: 2,
                width: "400px",
                borderRadius: 2,
                bgcolor: "#00fffc",
                ":hover":{
                  bgcolor:'white',
                  color:'black'
                },
              }}
              endIcon={<RiLoginBoxLine />}
            >
              Login
           
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default Login;
