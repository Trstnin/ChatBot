const { GoogleGenerativeAI } = require("@google/generative-ai");
const User = require("../models/user.model")


const generateChatCompletion = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({
      success: false,
      message: "Message is required"
    });
  }

  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not registered"
      });
    }

    // Get existing chats
    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    })) 
    chats.push({ content: message, role: "user" });
    user.chats.push({ content: message, role: "user" });

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_SECRET);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const result = await model.generateContent(message);
    const aiResponse = result.response.text()


const aichats = user.chats.map(({ role, content }) => ({ role, content }));
aichats.push({ content: aiResponse, role: 'assistant' });
user.chats.push({ content: aiResponse, role: "assistant" });

await user.save()

    return res.status(200).json({
      success: true,
      chats: user.chats
    });

  } catch (error) {
    console.error('Chat error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

const clearChats = async (req,res) => {
  const user = await User.findById(res.locals.jwtData.id);
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "User not registered"
    });
  }
try {
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
  
    user.chats = [];
    await user.save()
    return res.status(200).json({ message: "Chats deleted succesfully" });
} catch (error) {
  console.log(error);
  return res.status(200).json({ message: "ERROR", cause: error.message });

}
}

module.exports = {generateChatCompletion,clearChats}