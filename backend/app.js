const express=require('express');
const{dbConn}=require('./config/db');
const propertyRoute = require('./routes/Property')
const userRoute=require('./routes/User')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

const app= express()

const port= 5000;
app.use(express.json())
app.use(cors())
app.use('/user',userRoute);
app.use('/property',propertyRoute)


dbConn();

app.listen(port,()=>{
    console.log(`Server started at port ${port}`);
})

