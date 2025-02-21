import axios from 'axios';

export const  loginUser = async (email,password) => {
    const res = await axios.post('/user/login', {email,password});
    console.log(res.data)
  try {
      if(res.status !== 200){
          throw new Error('Unable to login')
      }
      const data = await res.data
      return data; 
  } catch (error) {
     console.log('request data:',res.data)
     console.log('Full error:', error.response)
  }
}

export const  checkAuthStatus = async () => {
    const res = await axios.get('/user/auth-status');
  try {
      if(res.status !== 200){
          throw new Error('Unable to authentication')
      }
      const data = await res.data
      return data; 
  } catch (error) {
     console.log('request data:',res.data)
     console.log('Full error:', error.response)
  }
}


export const  sendMesssageRequest = async (message) => {
    const res = await axios.post('/chat/new', {message});
    
  try {
      if(res.status !== 200){
          throw new Error('Unable to send chat')
      }
      const data = await res.data
      return data; 
  } catch (error) {
     console.log('request data:',res.data)
     console.log('Full error:', error.response)
  }
}


export const  clearChats = async () => {
    const res = await axios.get('/chat/clear');
    
  try {
      if(res.status !== 200){
          throw new Error('Unable to clear chat')
      }
      const data = await res.data
      return data; 
  } catch (error) {
     console.log('request data:',res.data)
     console.log('Full error:', error.response)
  }
}
