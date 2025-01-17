const mongoose = require('mongoose');

async function connectToDataBase(){
    try {
        
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("database connected sucessfully")
    } catch (error) {
        console.log(error)
        throw new Error('Couldnot connect to database')
       
    }
}


async function disconnectToDatabase(){
    try {
       await mongoose.disconnect()
    
    } catch (error) {
        console.log(error);
        throw new Error('couldnot disconnect to database')
    }
}

module.exports = {connectToDataBase , disconnectToDatabase}