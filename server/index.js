const express = require('express')
const mongoose = require("mongoose")
const authRouter = require('./routes/auth')
const cors = require('cors')

const PORT = process.env.PORT | 3001
const app = express()
const DB = "mongodb+srv://aldodevv:Berikuluka01@docs.j3kh09u.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(DB).then(() => {
    console.log("success");
}).catch((err) => {
    console.log(err);
})
app.use(cors())
app.use(express.json())
app.use(authRouter)

app.listen(PORT, '0.0.0.0', () => {
    console.log(`connected to ${PORT}`);
})
