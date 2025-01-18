const app = require('./src/app.js')
const { connectToDataBase } = require('./src/db/connect.js')
require('dotenv').config()
const port = process.env.port || 3000

//console.log(process.env.MONGODB_URL)

connectToDataBase()
.then(() => {
    app.listen(port, () => {
        console.log(`App listening at ${port} and connected to database`)
    })
}).catch((err) => console.log(err))


