const express=require('express');
require('dotenv').config();
const app= express();
const dbConnect=require('./config/database')
app.use(express.json());
const router=require('./routes/url')
dbConnect();
app.use('/api/v1',router)
const PORT = process.env.PORT ||4000;
app.listen(PORT,()=>console.log("Server started"))