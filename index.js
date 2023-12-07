const express=require('express');
const connectDb = require('./config/dbConnection');
const errorHandler = require('./middleware/errorHandler');
const dotenv=require('dotenv').config()


connectDb();
const app=express();

const port=process.env.port || 5000;


app.use(express.json())
app.use('/api/contacts',require("./routes/contactRoutes"))
app.use('/api/users',require("./routes/userRoute"))

app.use(errorHandler)





app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})