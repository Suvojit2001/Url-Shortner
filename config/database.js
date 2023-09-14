const mongoose= require('mongoose')
require('dotenv').config();
const dbConnect= ()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>console.log("db connected"))
    .catch((error)=>{
        console.log(error.message);
        console.log("db connection failed")
        process.exit(1)
    })
}
module.exports=dbConnect;